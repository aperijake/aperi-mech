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
    MeshLabeler() {}

    ~MeshLabeler() = default;

    void LabelForThexNodalIntegration(const std::shared_ptr<MeshData>& mesh_data, const std::string& set) {
        // Create the mesh labeler processor
        MeshLabelerProcessor mesh_labeler_processor(mesh_data, set);

        // Set the active field for nodal integration
        mesh_labeler_processor.SetActiveFieldForNodalIntegration();  // Device operation
        mesh_labeler_processor.CommunicateAllFieldData();            // Communicate the field data

        // After setting the active field, check that the nodal integration mesh is correct
        mesh_labeler_processor.CheckNodalIntegrationOnRefinedMesh();

        // Create the active part from the active field, host operation
        mesh_labeler_processor.SyncFieldsToHost();
        mesh_labeler_processor.CreateActivePartFromActiveField();

        // Label the cell ids for nodal integration
        mesh_labeler_processor.LabelCellIdsForNodalIntegrationHost();
        mesh_labeler_processor.SyncFieldsToHost();
    }

    void LabelForElementIntegration(const std::shared_ptr<MeshData>& mesh_data, const std::string& set) {
        // Create the mesh labeler processor
        MeshLabelerProcessor mesh_labeler_processor(mesh_data, set);

        // Create the active part from the active field, host operation
        // Active field should be set to 1 for all nodes in the element already
        mesh_labeler_processor.SyncFieldsToHost();
        mesh_labeler_processor.CreateActivePartFromActiveField();

        // Label the cell ids for element integration
        mesh_labeler_processor.LabelCellIdsForElementIntegration();
        mesh_labeler_processor.SyncFieldsToHost();
    }

    void LabelForGaussianIntegration(const std::shared_ptr<MeshData>& mesh_data, const std::string& set) {
        // Create the mesh labeler processor
        MeshLabelerProcessor mesh_labeler_processor(mesh_data, set);

        // Create the active part from the active field, host operation
        // Active field should be set to 1 for all nodes in the element already
        mesh_labeler_processor.SyncFieldsToHost();
        mesh_labeler_processor.CreateActivePartFromActiveField();

        // Label the cell ids for element integration
        mesh_labeler_processor.LabelCellIdsForElementIntegration();
        mesh_labeler_processor.SyncFieldsToHost();
    }

    void LabelPart(const MeshLabelerParameters& mesh_labeler_parameters) {
        if (mesh_labeler_parameters.smoothing_cell_type == SmoothingCellType::Nodal) {
            LabelForThexNodalIntegration(mesh_labeler_parameters.mesh_data, mesh_labeler_parameters.set);
        } else if (mesh_labeler_parameters.smoothing_cell_type == SmoothingCellType::Element) {
            LabelForElementIntegration(mesh_labeler_parameters.mesh_data, mesh_labeler_parameters.set);
        } else {
            LabelForGaussianIntegration(mesh_labeler_parameters.mesh_data, mesh_labeler_parameters.set);
        }
    }

    std::vector<FieldData> GetFieldData() {
        std::vector<FieldData> field_data;

        // Node data
        std::vector<uint64_t> initial_active_values(1, 1);
        field_data.push_back(FieldData("active", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, initial_active_values));  // Active nodes

        // Cell data, cell_id and subcell_id
        field_data.push_back(FieldData("cell_id", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<uint64_t>{}));     // The cell id
        field_data.push_back(FieldData("subcell_id", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<uint64_t>{}));  // The subcell id

        return field_data;
    }

   private:
    std::shared_ptr<MeshData> m_mesh_data;  // The mesh data object
};

inline std::shared_ptr<MeshLabeler> CreateMeshLabeler() {
    return std::make_shared<MeshLabeler>();
}

}  // namespace aperi