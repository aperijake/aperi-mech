#include "Selector.h"

#include <cassert>

#include "MeshData.h"

namespace aperi {

/**
 * @brief Default constructor. Initializes members to default/null values.
 */
Selector::Selector()
    : m_selector(),
      m_ownership(SelectorOwnership::ALL),
      m_meta_data(nullptr),
      m_bulk_data(nullptr) {}

/**
 * @brief Construct from an existing stk::mesh::Selector and optional ownership mask.
 *        Sets up meta/bulk pointers and applies ownership mask.
 */
Selector::Selector(const stk::mesh::Selector &selector, SelectorOwnership ownership)
    : m_selector(selector), m_ownership(ownership) {
    SetBulkAndMetaDataFromStkSelector();
    MaskUsingOwnership();
}

/**
 * @brief Construct from a list of part names and a MeshData pointer.
 *        Sets up meta/bulk pointers and applies ownership mask.
 */
Selector::Selector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data, SelectorOwnership ownership)
    : m_ownership(ownership) {
    m_meta_data = mesh_data->GetMetaData();
    m_bulk_data = mesh_data->GetBulkData();
    m_selector = StkGetSelector(sets, m_meta_data);
    MaskUsingOwnership();
}

/**
 * @brief Return the encapsulated stk::mesh::Selector.
 */
stk::mesh::Selector Selector::operator()() const {
    return m_selector;
}

/**
 * @brief Return the ownership mask used by this selector.
 */
SelectorOwnership Selector::GetOwnership() const {
    return m_ownership;
}

/**
 * @brief Get mesh entity counts for all entity ranks using this selector.
 */
std::vector<size_t> Selector::GetCommMeshCounts() const {
    std::vector<size_t> comm_mesh_counts;
    stk::mesh::comm_mesh_counts(*m_bulk_data, comm_mesh_counts, &m_selector);
    return comm_mesh_counts;
}

/**
 * @brief Get the number of nodes selected (global count).
 */
size_t Selector::GetNumNodes() const {
    return GetCommMeshCounts()[stk::topology::NODE_RANK];
}

/**
 * @brief Get the number of nodes selected (local to this rank).
 */
size_t Selector::GetNumLocalNodes() const {
    return GetLocalEntityCount(stk::topology::NODE_RANK);
}

/**
 * @brief Get the number of elements selected (global count).
 */
size_t Selector::GetNumElements() const {
    return GetCommMeshCounts()[stk::topology::ELEMENT_RANK];
}

/**
 * @brief Get the number of elements selected (local to this rank).
 */
size_t Selector::GetNumLocalElements() const {
    return GetLocalEntityCount(stk::topology::ELEMENT_RANK);
}

/**
 * @brief Get the number of faces selected (global count).
 */
size_t Selector::GetNumFaces() const {
    return GetCommMeshCounts()[stk::topology::FACE_RANK];
}

/**
 * @brief Get the number of faces selected (local to this rank).
 */
size_t Selector::GetNumLocalFaces() const {
    return GetLocalEntityCount(stk::topology::FACE_RANK);
}

/**
 * @brief Get the number of entities of a given rank selected (local to this rank).
 */
size_t Selector::GetLocalEntityCount(const stk::topology::rank_t rank) const {
    return stk::mesh::count_entities(*m_bulk_data, rank, m_selector);
}

/**
 * @brief Apply the ownership mask to the selector.
 */
void Selector::MaskUsingOwnership() {
    if (m_ownership == SelectorOwnership::OWNED) {
        m_selector &= m_meta_data->locally_owned_part();
    } else if (m_ownership == SelectorOwnership::SHARED) {
        m_selector &= m_meta_data->globally_shared_part();
    } else if (m_ownership == SelectorOwnership::OWNED_AND_SHARED) {
        m_selector &= m_meta_data->globally_shared_part() & m_meta_data->locally_owned_part();
    } else if (m_ownership == SelectorOwnership::OWNED_OR_SHARED) {
        m_selector &= (m_meta_data->globally_shared_part() | m_meta_data->locally_owned_part());
    }
}

/**
 * @brief Set the meta and bulk data pointers from the selector's parts.
 *        Assumes at least one part is present in the selector.
 */
void Selector::SetBulkAndMetaDataFromStkSelector() {
    stk::mesh::PartVector parts;
    m_selector.get_parts(parts);
    assert(parts.size() > 0);
    m_meta_data = &parts[0]->mesh_meta_data();
    m_bulk_data = &parts[0]->mesh_bulk_data();
}

}  // namespace aperi
