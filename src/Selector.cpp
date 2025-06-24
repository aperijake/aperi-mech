#include "Selector.h"

#include "MeshData.h"

namespace aperi {

Selector::Selector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data, SelectorOwnership ownership)
    : m_ownership(ownership) {
    m_meta_data = mesh_data->GetMetaData();
    m_bulk_data = mesh_data->GetBulkData();
    m_selector = StkGetSelector(sets, m_meta_data);
    MaskUsingOwnership();
}

}  // namespace aperi
