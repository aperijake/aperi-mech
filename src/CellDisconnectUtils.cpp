#include "CellDisconnectUtils.h"

#include <Eigen/Dense>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_tools/mesh_tools/EntityDisconnectTool.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "MeshData.h"
#include "Selector.h"

namespace aperi {

void DisconnectCells(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::vector<std::string>& part_names) {
    auto* p_bulk = mesh_data->GetBulkData();
    aperi::Selector selector(part_names, mesh_data.get(), aperi::SelectorOwnership::OWNED);

    // Get the cell boundary faces
    aperi::EntityVector interior_faces = GetCellBoundaryFaces(mesh_data, part_names);

    // Create the disconnect tool
    stk::experimental::EntityDisconnectTool disconnecter(*p_bulk, interior_faces);
    disconnecter.determine_new_nodes();
    disconnecter.modify_mesh();
}

aperi::EntityVector GetCellBoundaryFaces(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::vector<std::string>& part_names) {
    auto* p_bulk = mesh_data->GetBulkData();
    aperi::EntityVector boundary_faces;

    aperi::FieldQueryData<aperi::Unsigned> cell_id_query_data({"cell_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT});
    // Throw an error if the cell_id field does not exist
    if (!aperi::StkFieldExists(cell_id_query_data, mesh_data->GetMetaData())) {
        throw std::runtime_error("The cell_id field must exist for this test to run.");
    }

    // Get the cell_id field
    stk::mesh::Field<aperi::Unsigned>* p_cell_id_field = aperi::StkGetField(cell_id_query_data, mesh_data->GetMetaData());

    // Get the selector for the parts
    aperi::Selector selector(part_names, mesh_data.get(), aperi::SelectorOwnership::OWNED);

    // Loop over all the faces and check if they are connected to two elements
    for (stk::mesh::Bucket* p_bucket : selector().get_buckets(stk::topology::FACE_RANK)) {
        for (stk::mesh::Entity face : *p_bucket) {
            stk::mesh::ConnectedEntities connected_elements = p_bulk->get_connected_entities(face, stk::topology::ELEMENT_RANK);
            KOKKOS_ASSERT(connected_elements.size() <= 2U);
            if (connected_elements.size() == 2U) {
                // Check if the two elements have different cell_ids
                aperi::Unsigned cell_id_1 = stk::mesh::field_data(*p_cell_id_field, connected_elements[0])[0];
                aperi::Unsigned cell_id_2 = stk::mesh::field_data(*p_cell_id_field, connected_elements[1])[0];
                if (cell_id_1 != cell_id_2) {
                    // If the cell_ids are different, add the face to the interior_faces
                    boundary_faces.push_back(face);
                }
            }
        }
    }
    return boundary_faces;
}

void MakeDisconnectedViewForDebugging(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::vector<std::string>& part_names, double shrink_factor) {
    auto* p_bulk = mesh_data->GetBulkData();

    // Query for the coordinates field
    aperi::FieldQueryData<double> coordinates_query_data({mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    // Check if the coordinates field exists
    if (!aperi::StkFieldExists(coordinates_query_data, mesh_data->GetMetaData())) {
        throw std::runtime_error("The coordinates field must exist for this test to run.");
    }

    // Get the coordinates field
    stk::mesh::Field<double>* p_coordinates_field = aperi::StkGetField(coordinates_query_data, mesh_data->GetMetaData());

    // Add a late field for displacement
    std::vector<double> initial_displacement = {0.0, 0.0, 0.0};
    aperi::FieldData displacement_field_data({"disconnect_displacement", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, 1, initial_displacement, true});
    mesh_data->DeclareLateField(displacement_field_data, part_names);  // Declare the field for the specified parts

    // Query for the displacement field
    aperi::FieldQueryData<double> displacement_query_data({"disconnect_displacement", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    // Get the displacement field
    stk::mesh::Field<double>* p_displacement_field = aperi::StkGetField(displacement_query_data, mesh_data->GetMetaData());

    // Get the selector for the parts
    aperi::Selector selector(part_names, mesh_data.get(), aperi::SelectorOwnership::OWNED);

    // Loop over all the nodes in the selected parts
    for (stk::mesh::Bucket* p_bucket : selector().get_buckets(stk::topology::NODE_RANK)) {
        for (stk::mesh::Entity node : *p_bucket) {
            // Get the coordinates of the node
            double* p_node_coords = stk::mesh::field_data(*p_coordinates_field, node);

            // Loop over all the elements connected to this node
            stk::mesh::ConnectedEntities connected_elements = p_bulk->get_connected_entities(node, stk::topology::ELEMENT_RANK);

            size_t num_connected_elements = connected_elements.size();

            // Loop over the connected elements to find the centroid
            for (stk::mesh::Entity element : connected_elements) {
                // Get the nodes of the element
                const stk::mesh::Entity* p_connected_nodes = p_bulk->begin_nodes(element);
                size_t num_connected_nodes = p_bulk->num_nodes(element);

                // Calculate the centroid of the element
                Eigen::Vector3d centroid(0.0, 0.0, 0.0);
                for (size_t i = 0; i < num_connected_nodes; ++i) {
                    double* p_this_node_coords = stk::mesh::field_data(*p_coordinates_field, p_connected_nodes[i]);
                    centroid += Eigen::Vector3d(p_this_node_coords[0], p_this_node_coords[1], p_this_node_coords[2]);
                }
                centroid /= num_connected_nodes;  // Average the coordinates to get the centroid

                // Shrink the distance, component-wise, towards the centroid
                double* p_displacement_data = stk::mesh::field_data(*p_displacement_field, node);
                p_displacement_data[0] -= (p_node_coords[0] - centroid(0)) * shrink_factor / num_connected_elements;
                p_displacement_data[1] -= (p_node_coords[1] - centroid(1)) * shrink_factor / num_connected_elements;
                p_displacement_data[2] -= (p_node_coords[2] - centroid(2)) * shrink_factor / num_connected_elements;
            }
        }
    }

    // Loop over all the nodes in the selected parts again to update the coordinates
    for (stk::mesh::Bucket* p_bucket : selector().get_buckets(stk::topology::NODE_RANK)) {
        for (stk::mesh::Entity node : *p_bucket) {
            // Get the coordinates of the node
            double* p_node_coords = stk::mesh::field_data(*p_coordinates_field, node);
            // Get the displacement for this node
            double* p_displacement_data = stk::mesh::field_data(*p_displacement_field, node);

            // Update the node coordinates
            p_node_coords[0] += p_displacement_data[0];
            p_node_coords[1] += p_displacement_data[1];
            p_node_coords[2] += p_displacement_data[2];
        }
    }
}

}  // namespace aperi
