#pragma once

#include <memory>
#include <vector>

#include "FieldData.h"
#include "MeshData.h"
#include "MeshLabelerProcessor.h"

namespace aperi {

enum class SmoothingCellType {
    Nodal,
    Element
};

// TODO(jake): Move to own file, create constructor that takes in a part YAML node
struct MeshLabelerParameters {
    std::shared_ptr<MeshData> mesh_data;    // The mesh data object
    SmoothingCellType smoothing_cell_type;  // The type of smoothing cell
    size_t num_subcells;                    // The number of subcells
    std::string set;                        // The set to process
};

class MeshLabeler {
   public:
    MeshLabeler() {}

    ~MeshLabeler() = default;

    void LabelPart(const MeshLabelerParameters& mesh_labeler_parameters) {
        // TODO(jake): This is hard coded to one scenario, need to generalize
        // Create the mesh labeler processor
        MeshLabelerProcessor mesh_labeler_processor(mesh_labeler_parameters.mesh_data, mesh_labeler_parameters.set);
        mesh_labeler_processor.SetActiveFieldForNodalIntegration();
        mesh_labeler_processor.CreateActivePartFromActiveField();
        mesh_labeler_processor.SyncFieldsToDevice();  // Mesh modification, host operation

        // After setting the active field, check that the nodal integration mesh is correct
        mesh_labeler_processor.CheckNodalIntegrationOnRefinedMesh();
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