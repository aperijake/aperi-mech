#include "CellDisconnect.h"

#include <Eigen/Dense>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_tools/mesh_tools/EntityDisconnectTool.hpp>

#include "AperiStkUtils.h"
#include "Constants.h"
#include "ForEachEntity.h"
#include "LogUtils.h"
#include "NgpMeshData.h"
#include "Selector.h"

namespace aperi {

CellDisconnect::CellDisconnect(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::vector<std::string>& part_names)
    : m_mesh_data(mesh_data), m_part_names(part_names) {}

void CellDisconnect::BuildOriginalNodeElements() {
    // Initialize the flattened ragged array data for node elements
    size_t num_owned_nodes = m_mesh_data->GetNumOwnedNodes(m_part_names);
    m_node_elements = aperi::FlattenedRaggedArrayData<aperi::Unsigned>(num_owned_nodes, aperi::UNSIGNED_MAX);

    // Build the original node-elements list
    auto add_num_items_functor = m_node_elements.GetAddNumItemsFunctor();
    aperi::SetNumConnectedElementsForNodeFunctor set_num_connected_elements_functor(m_mesh_data, add_num_items_functor);
    aperi::Selector selector(m_part_names, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    aperi::ForEachNode(set_num_connected_elements_functor, *m_mesh_data, selector);
    m_node_elements.CompleteAddingNumItems();

    // Add the connected elements for each node
    aperi::FlattenedRaggedArray::AddItemsFunctor<aperi::Unsigned> add_items_functor = m_node_elements.GetAddItemsFunctor();
    aperi::AddConnectedElementsForNodeFunctor add_connected_elements_functor(m_mesh_data, add_items_functor);
    aperi::ForEachNode(add_connected_elements_functor, *m_mesh_data, selector);
    m_node_elements.CompleteAddingItems();  // Copy the flattened data to the host

    // Set the node elements built flag
    m_node_elements_built = true;
}

void CellDisconnect::SetParentCellField() {
    // Declare the parent_cell field if it does not exist
    aperi::FieldQueryData<aperi::Unsigned> parent_cell_query_data({"parent_cell", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    if (!aperi::StkFieldExists(parent_cell_query_data, m_mesh_data->GetMetaData())) {
        aperi::CoutP0() << "Warning: The parent_cell field does not exist. Skipping setting parent_cell field." << std::endl;
        return;
    }

    aperi::Selector selector(m_part_names, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    SetParentCellFunctor set_parent_cell_functor(m_mesh_data);
    aperi::ForEachNode(set_parent_cell_functor, *m_mesh_data, selector);
}

void CellDisconnect::SetNodeDisconnectIds() {
    // Set the node disconnect ids for each node
    aperi::Selector selector(m_part_names, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    SetNodeDisconnectIdsFunctor set_node_disconnect_ids_functor(m_mesh_data);
    aperi::ForEachNode(set_node_disconnect_ids_functor, *m_mesh_data, selector);
}

void CellDisconnect::DisconnectCells() {
    auto* p_bulk = m_mesh_data->GetBulkData();
    aperi::Selector selector(m_part_names, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

    // Get the cell disconnect ids
    aperi::FieldQueryData<aperi::Unsigned> node_disconnect_id_query_data({"node_disconnect_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    // Warn if the node_disconnect_id field does not exist and exit
    if (aperi::StkFieldExists(node_disconnect_id_query_data, m_mesh_data->GetMetaData())) {
        // Get the node_disconnect_id field
        m_node_disconnect_id = aperi::Field<aperi::Unsigned>(m_mesh_data, node_disconnect_id_query_data);

        // Set the node disconnect ids for each node
        SetNodeDisconnectIds();

        // Build the original node-elements list
        BuildOriginalNodeElements();
    } else {
        aperi::CoutP0() << "Warning: The node_disconnect_id field does not exist. Skipping disconnecting cells." << std::endl;
    }

    // Get the cell boundary faces
    aperi::EntityVector interior_faces = GetCellBoundaryFaces();

    // Create the disconnect tool
    stk::experimental::EntityDisconnectTool disconnecter(*p_bulk, interior_faces);
    disconnecter.determine_new_nodes();
    disconnecter.modify_mesh();

    // Label the disconnected faces with their paired face
    aperi::FieldQueryData<aperi::Unsigned> paired_face_query_data({"paired_face_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::FACE});
    // Warn if the paired_face_id field does not exist and exit
    if (!aperi::StkFieldExists(paired_face_query_data, m_mesh_data->GetMetaData())) {
        aperi::CoutP0() << "Warning: The paired_face_id field does not exist. Skipping labeling of paired faces." << std::endl;
        return;
    }
    // Get the paired_face_id field
    stk::mesh::Field<aperi::Unsigned>* p_paired_face_id_field = aperi::StkGetField(paired_face_query_data, m_mesh_data->GetMetaData());

    // Loop over the face pairs and set the paired face id
    const std::vector<stk::experimental::FacePair>& face_pairs = disconnecter.get_elem_side_pairs();
    for (const auto& pair : face_pairs) {
        stk::mesh::Entity face = pair.faceOrig.face;
        stk::mesh::Entity paired_face = pair.faceNew.face;

        // Set the paired face id on both faces to the local offset of the paired face
        aperi::Unsigned face_id = face.local_offset();
        aperi::Unsigned paired_face_id = paired_face.local_offset();
        stk::mesh::field_data(*p_paired_face_id_field, face)[0] = paired_face_id;
        stk::mesh::field_data(*p_paired_face_id_field, paired_face)[0] = face_id;
    }

    // Set the parent cell field
    SetParentCellField();
}

aperi::EntityVector CellDisconnect::GetCellBoundaryFaces() {
    auto* p_bulk = m_mesh_data->GetBulkData();
    aperi::EntityVector boundary_faces;

    aperi::FieldQueryData<aperi::Unsigned> cell_id_query_data({"cell_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT});
    // Throw an error if the cell_id field does not exist
    if (!aperi::StkFieldExists(cell_id_query_data, m_mesh_data->GetMetaData())) {
        throw std::runtime_error("The cell_id field must exist for this test to run.");
    }

    // Get the cell_id field
    stk::mesh::Field<aperi::Unsigned>* p_cell_id_field = aperi::StkGetField(cell_id_query_data, m_mesh_data->GetMetaData());

    // Get the selector for the parts
    aperi::Selector selector(m_part_names, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

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

void CellDisconnect::MakeDisconnectedViewForDebugging(double shrink_factor) {
    auto* p_bulk = m_mesh_data->GetBulkData();

    // Query for the coordinates field
    aperi::FieldQueryData<double> coordinates_query_data({m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    // Check if the coordinates field exists
    if (!aperi::StkFieldExists(coordinates_query_data, m_mesh_data->GetMetaData())) {
        throw std::runtime_error("The coordinates field must exist for this test to run.");
    }

    // Get the coordinates field
    stk::mesh::Field<double>* p_coordinates_field = aperi::StkGetField(coordinates_query_data, m_mesh_data->GetMetaData());

    // Add a late field for displacement
    std::vector<double> initial_displacement = {0.0, 0.0, 0.0};
    aperi::FieldData displacement_field_data({"disconnect_displacement", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, 1, initial_displacement, true});
    m_mesh_data->DeclareLateField(displacement_field_data, m_part_names);  // Declare the field for the specified parts

    // Query for the displacement field
    aperi::FieldQueryData<double> displacement_query_data({"disconnect_displacement", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    // Get the displacement field
    stk::mesh::Field<double>* p_displacement_field = aperi::StkGetField(displacement_query_data, m_mesh_data->GetMetaData());

    // Get the selector for the parts
    aperi::Selector selector(m_part_names, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

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
