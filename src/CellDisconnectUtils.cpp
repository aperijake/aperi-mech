#include "CellDisconnectUtils.h"

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

}  // namespace aperi
