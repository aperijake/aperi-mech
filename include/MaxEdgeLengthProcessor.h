#pragma once

#include <memory>
#include <vector>

#include "ConnectedEntityProcessor.h"
#include "Field.h"
#include "MeshData.h"
#include "Selector.h"
#include "Types.h"

namespace aperi {

class MaxEdgeLengthProcessor {
   public:
    MaxEdgeLengthProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {});
    void ComputeMaxEdgeLength();

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::vector<std::string> m_sets;
    aperi::Selector m_selector;
    aperi::Selector m_active_selector;
    aperi::Field<Real> m_coordinates_field;
    aperi::Field<Unsigned> m_node_active_field;
    aperi::Field<Real> m_max_edge_length_field;
    aperi::ConnectedEntityProcessor m_connectivity;
};

}  // namespace aperi