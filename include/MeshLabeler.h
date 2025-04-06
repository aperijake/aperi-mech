#pragma once

#include <memory>
#include <vector>

#include "FieldData.h"
#include "MeshData.h"
#include "MeshLabelerParameters.h"
#include "MeshLabelerProcessor.h"

namespace aperi {

class MeshLabeler {
   public:
    MeshLabeler(std::shared_ptr<MeshData> mesh_data) : m_mesh_data(mesh_data) {}

    ~MeshLabeler() = default;

    void LabelPart(const MeshLabelerParameters& mesh_labeler_parameters) {
        MeshLabelerProcessor mesh_labeler_processor(m_mesh_data, mesh_labeler_parameters.set, mesh_labeler_parameters.num_subcells, mesh_labeler_parameters.activate_center_node);
        if (mesh_labeler_parameters.smoothing_cell_type == SmoothingCellType::Nodal) {
            mesh_labeler_processor.LabelForThexNodalIntegration();
        } else if (mesh_labeler_parameters.smoothing_cell_type == SmoothingCellType::Element) {
            mesh_labeler_processor.LabelForElementIntegration();
        } else {
            mesh_labeler_processor.LabelForGaussianIntegration();
        }
    }

    static std::vector<FieldData> GetFieldData() {
        std::vector<FieldData> field_data;

        // Node data
        std::vector<unsigned long> initial_active_values(1, 1);
        field_data.push_back(FieldData("active", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, initial_active_values));  // Active nodes

        // Cell data, cell_id and subcell_id
        field_data.push_back(FieldData("cell_id", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<uint64_t>{}));     // The cell id
        field_data.push_back(FieldData("subcell_id", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<uint64_t>{}));  // The subcell id

        return field_data;
    }

   private:
    std::shared_ptr<MeshData> m_mesh_data;  // The mesh data object
};

inline std::shared_ptr<MeshLabeler> CreateMeshLabeler(std::shared_ptr<MeshData> mesh_data) {
    return std::make_shared<MeshLabeler>(mesh_data);
}

}  // namespace aperi