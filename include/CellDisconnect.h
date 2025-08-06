#pragma once

#include <memory>
#include <string>
#include <vector>

#include "Field.h"
#include "FieldData.h"
#include "FlattenedRaggedArrayData.h"
#include "Index.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

struct SetNodeDisconnectIdsFunctor {
    SetNodeDisconnectIdsFunctor(const std::shared_ptr<aperi::MeshData> &mesh_data)
        : m_node_disconnect_id(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"node_disconnect_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}),
          m_id_counter("id_counter", 1) {
        Kokkos::deep_copy(m_id_counter, 0);
    }

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &node_index) const {
        // Atomic fetch-and-add to ensure unique IDs
        aperi::Unsigned current_id = Kokkos::atomic_fetch_add(&m_id_counter(0), 1);
        // Set the node disconnect ID
        m_node_disconnect_id(node_index, 0) = current_id;
    }

   private:
    aperi::Field<aperi::Unsigned> m_node_disconnect_id;  ///< The node disconnect id field
    Kokkos::View<size_t *> m_id_counter;                 ///< Counter for unique IDs
};

struct SetParentCellFunctor {
    SetParentCellFunctor(const std::shared_ptr<aperi::MeshData> &mesh_data)
        : m_ngp_mesh(mesh_data->GetUpdatedNgpMesh()),
          m_parent_cell_id(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"parent_cell", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}),
          m_cell_id(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"cell_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT}) {
    }

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &node_index) const {
        // Get the connected elements for the node
        const auto connected_elements = m_ngp_mesh.GetNodeElements(node_index);
        if (connected_elements.size() == 0) {
            // If no connected elements, we cannot set a parent cell ID. Must be an extra node and should be set elsewhere.
            return;
        }

        // Get the first connected element ID
        aperi::Index first_element_index = m_ngp_mesh.GetEntityIndex(connected_elements[0]);
        aperi::Unsigned cell_id = m_cell_id(first_element_index, 0);

        // Loop through all connected elements to ensure the cell ID is consistent
        for (const auto &element : connected_elements) {
            aperi::Index element_index = m_ngp_mesh.GetEntityIndex(element);
            aperi::Unsigned current_cell_id = m_cell_id(element_index, 0);
            if (current_cell_id != cell_id) {
                Kokkos::abort("Inconsistent cell IDs found for connected elements.");
            }
        }

        // Set the parent cell ID
        m_parent_cell_id(node_index, 0) = cell_id;
    }

   private:
    aperi::NgpMeshData m_ngp_mesh;
    aperi::Field<aperi::Unsigned> m_parent_cell_id;  ///< The parent cell id field
    aperi::Field<aperi::Unsigned> m_cell_id;         ///< The cell id field
};

struct SetNumConnectedElementsForNodeFunctor {
    SetNumConnectedElementsForNodeFunctor(const std::shared_ptr<aperi::MeshData> &mesh_data, aperi::FlattenedRaggedArray::AddNumItemsFunctor &add_num_items_functor)
        : m_ngp_mesh(mesh_data->GetUpdatedNgpMesh()),
          m_node_disconnect_id(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"node_disconnect_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}),
          m_add_num_connected_element_functor(add_num_items_functor) {
    }

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &node_index) const {
        size_t num_connected = m_ngp_mesh.GetNodeElements(node_index).size();
        // If no connected elements, set to 1 as this is an extra node
        if (num_connected == 0) {
            num_connected = 1;
        }
        const aperi::Unsigned node_disconnect_id = m_node_disconnect_id(node_index, 0);
        m_add_num_connected_element_functor(node_disconnect_id, num_connected);
    }

   private:
    aperi::NgpMeshData m_ngp_mesh;
    const aperi::Field<aperi::Unsigned> m_node_disconnect_id;  ///< The node disconnect id field
    aperi::FlattenedRaggedArray::AddNumItemsFunctor m_add_num_connected_element_functor;
};

struct AddConnectedElementsForNodeFunctor {
    AddConnectedElementsForNodeFunctor(const std::shared_ptr<aperi::MeshData> &mesh_data, aperi::FlattenedRaggedArray::AddItemsFunctor<aperi::Unsigned> &add_items_functor)
        : m_ngp_mesh(mesh_data->GetUpdatedNgpMesh()), m_node_disconnect_id(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"node_disconnect_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}), m_owning_element(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"owning_element", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}), m_add_items_functor(add_items_functor) {
    }

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &node_index) const {
        const auto connected_entities = m_ngp_mesh.GetNodeElements(node_index);
        const aperi::Unsigned node_disconnect_id = m_node_disconnect_id(node_index, 0);
        for (size_t i = 0; i < connected_entities.size(); ++i) {
            m_add_items_functor(node_disconnect_id, connected_entities[i].local_offset());
        }
        if (connected_entities.size() == 0) {
            // If no connected elements, add the owning element as a connected element
            const aperi::Unsigned owning_element_id = m_owning_element(node_index, 0);
            m_add_items_functor(node_disconnect_id, owning_element_id);
        }
    }

   private:
    aperi::NgpMeshData m_ngp_mesh;
    const aperi::Field<aperi::Unsigned> m_node_disconnect_id;  ///< The node disconnect id field
    const aperi::Field<aperi::Unsigned> m_owning_element;      ///< The owning element field
    aperi::FlattenedRaggedArray::AddItemsFunctor<aperi::Unsigned> m_add_items_functor;
};

/**
 * @brief Utility class for disconnecting cells at their boundary faces.
 *
 *
 */
class CellDisconnect {
   public:
    /**
     * @brief Constructor for CellDisconnect.
     * @param mesh_data The mesh data to operate on.
     * @param part_names The names of the parts to disconnect.
     */
    CellDisconnect(const std::shared_ptr<aperi::MeshData> &mesh_data,
                   const std::vector<std::string> &part_names);

    /**
     * @brief Disconnect cells at their boundary faces.
     */
    void DisconnectCells();

    /**
     * @brief Get the boundary faces of the cells in the mesh.
     * @return A vector of boundary faces.
     */
    aperi::EntityVector GetCellBoundaryFaces();

    /**
     * @brief Make a disconnect view for debugging.
     * @param shrink_factor Factor to shrink cells towards their center.
     */
    void MakeDisconnectedViewForDebugging(double shrink_factor = 0.1);

    KOKKOS_INLINE_FUNCTION
    Kokkos::View<aperi::Unsigned *> GetNodeElements(const aperi::Index &node_index) const {
        KOKKOS_ASSERT(m_node_elements_built);
        aperi::Unsigned node_id = m_node_disconnect_id(node_index, 0);
        return m_node_elements.GetData(node_id);
    }

    Kokkos::View<aperi::Unsigned *>::HostMirror GetNodeElementsHost(const aperi::Index &node_index) const {
        assert(m_node_disconnect_id.IsValid());
        assert(m_node_elements_built);
        aperi::Unsigned node_id = m_node_disconnect_id(node_index, 0);
        return m_node_elements.GetDataHost(node_id);
    }

    /**
     * @brief Check if the node elements have been built.
     * @return True if the node elements have been built, false otherwise.
     */
    bool NodeElementsHaveBeenBuilt() const {
        return m_node_elements_built;
    }

   private:
    /**
     * @brief Set the node disconnect ids for each node.
     * This is used to keep track how orignal node ids map to the m_node_elements structure.
     */
    void SetNodeDisconnectIds();

    /**
     * @brief Build the original node-elements list.
     * This is used to keep track of which elements are connected to which nodes.
     */
    void BuildOriginalNodeElements();

    /**
     * @brief Set the parent cell field for each node.
     * This is used to keep track of which cell a node belongs to.
     */
    void SetParentCellField();

    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::vector<std::string> m_part_names;
    aperi::FlattenedRaggedArrayData<aperi::Unsigned> m_node_elements;  // The original elements connected to nodes
    aperi::Field<aperi::Unsigned> m_node_disconnect_id;                ///< The node disconnect id field
    bool m_node_elements_built;                                        ///< Flag to indicate if node elements have been built
};

}  // namespace aperi
