#pragma once

#include <memory>
#include <vector>

#include "FieldData.h"
#include "MeshData.h"
#include "MeshLabelerParameters.h"
#include "MeshLabelerProcessor.h"
#include "Types.h"

namespace aperi {

class MeshLabeler {
   public:
    MeshLabeler(std::shared_ptr<MeshData> mesh_data) : m_mesh_data(mesh_data) {}

    ~MeshLabeler() = default;

    void LabelPart(const MeshLabelerParameters& mesh_labeler_parameters) {
        MeshLabelerProcessor mesh_labeler_processor(m_mesh_data, mesh_labeler_parameters.set);
        mesh_labeler_processor.LabelPart(mesh_labeler_parameters);
    }

    static std::vector<FieldData> GetFieldData() {
        std::vector<FieldData> field_data;

        // Node data
        std::vector<Unsigned> initial_active_values(1, 1);
        field_data.push_back(FieldData("active", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, initial_active_values));  // Active nodes

        /* TODO(jake): Remove this field when we can.
           Temporary active field for nodal integration.
           Reason: The parallel_min and parallel_max operations won't work on uint64_t fields, and unsigned long won't output correctly on all platforms.
        */
        std::vector<UnsignedLong> initial_active_temp_values(1, 1);
        field_data.push_back(FieldData("active_temp", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, initial_active_temp_values, false));

        // Cell data, cell_id and subcell_id
        field_data.push_back(FieldData("cell_id", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<Unsigned>{}));     // The cell id
        field_data.push_back(FieldData("subcell_id", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<Unsigned>{}));  // The subcell id

        return field_data;
    }

   private:
    std::shared_ptr<MeshData> m_mesh_data;  // The mesh data object
};

inline std::shared_ptr<MeshLabeler> CreateMeshLabeler(std::shared_ptr<MeshData> mesh_data) {
    return std::make_shared<MeshLabeler>(mesh_data);
}

}  // namespace aperi