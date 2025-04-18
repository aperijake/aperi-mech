#include "UnitTestNodalMeshUtils.h"

#include <cmath>      // For std::fmod
#include <stdexcept>  // For std::runtime_error
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "MeshData.h"
#include "MeshLabeler.h"

std::vector<size_t> GetNumElementForNodalMesh(size_t num_nodes_x, size_t num_nodes_y, size_t num_nodes_z) {
    // Must have 2 or more nodes in each direction
    if (num_nodes_x < 2 || num_nodes_y < 2 || num_nodes_z < 2) {
        throw std::runtime_error("Nodal mesh must have at least 2 nodes in each direction");
    }

    std::vector<size_t> num_elements;
    num_elements.push_back((num_nodes_x - 1) * 2);
    num_elements.push_back((num_nodes_y - 1) * 2);
    num_elements.push_back((num_nodes_z - 1) * 2);
    return num_elements;
}

void SetActiveFieldOnNodalMesh(const std::shared_ptr<aperi::MeshData> &mesh_data) {
    // Get the mesh data
    stk::mesh::BulkData *bulk_data = mesh_data->GetBulkData();
    stk::mesh::MetaData *meta_data = &bulk_data->mesh_meta_data();
    // Get the selector
    stk::mesh::Selector selector = aperi::StkGetSelector({}, meta_data);
    // Get the owned selector
    stk::mesh::Selector full_owned_selector = bulk_data->mesh_meta_data().locally_owned_part();
    stk::mesh::Selector owned_selector = selector & full_owned_selector;

    // Get the active field
    stk::mesh::Field<unsigned long> *active_field = aperi::StkGetField(aperi::FieldQueryData<unsigned long>{"active", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, meta_data);

    // Get the coordinates field
    stk::mesh::Field<double> *coordinates_field = aperi::StkGetField(aperi::FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, meta_data);

    // Set the active field for nodal integration
    for (stk::mesh::Bucket *bucket : owned_selector.get_buckets(stk::topology::NODE_RANK)) {
        for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
            unsigned long *active_field_data = stk::mesh::field_data(*active_field, (*bucket)[i_node]);
            double *coordinates_data = stk::mesh::field_data(*coordinates_field, (*bucket)[i_node]);
            // If all coordinates are evenly divisible by 2.0, set the active field to 1
            if (std::fmod(coordinates_data[0], 2.0) == 0.0 && std::fmod(coordinates_data[1], 2.0) == 0.0 && std::fmod(coordinates_data[2], 2.0) == 0.0) {
                active_field_data[0] = 1;
            } else {
                // Set the active field to 0
                active_field_data[0] = 0;
            }
        }
    }
}

void LabelGeneratedNodalMesh(const std::shared_ptr<aperi::MeshData> &mesh_data, size_t num_subcells, bool activate_center_node) {
    // Set the active field for nodal integration
    SetActiveFieldOnNodalMesh(mesh_data);

    std::string set = "block_1";

    // Create the mesh labeler parameters
    aperi::MeshLabelerProcessor mesh_labeler_processor(mesh_data, set, num_subcells, activate_center_node);

    // Communicate the field data
    mesh_labeler_processor.CommunicateAllFieldData();

    // After setting the active field, check that the nodal integration mesh is correct
    mesh_labeler_processor.CheckNodalIntegrationOnRefinedMeshHost();

    // Create the active part from the active field, host operation
    mesh_labeler_processor.CreateActivePartFromActiveFieldHost();

    // Label the cell and subcell ids for nodal integration
    mesh_labeler_processor.LabelCellAndSubcellIdsForNodalIntegrationHost(num_subcells);

    // Create the cells part from the cell id field, host operation
    mesh_labeler_processor.CreateCellsPartFromCellIdFieldHost(true);

    // Add the center node part to the active part, if the center node is to be activated
    if (activate_center_node) {
        mesh_labeler_processor.CreateActivePartFromActiveFieldHost(2);
    }
}

void LabelGeneratedElementMesh(const std::shared_ptr<aperi::MeshData> &mesh_data, size_t num_subcells, bool activate_center_node) {
    std::string set = "block_1";

    // Create the mesh labeler parameters
    aperi::MeshLabelerProcessor mesh_labeler_processor(mesh_data, set, num_subcells, activate_center_node);

    // Label the cell and subcell ids for element integration
    mesh_labeler_processor.LabelForElementIntegration();
}
