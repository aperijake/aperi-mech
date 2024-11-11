#include <gtest/gtest.h>
#include <mpi.h>

#include "FieldData.h"
#include "MeshData.h"
#include "NeighborSearchProcessorTestFixture.h"
#include "UnitTestUtils.h"

class MaxEdgeLengthProcessorTestFixture : public NeighborSearchProcessorTestFixture {
   protected:
    void SetUp() override {
        NeighborSearchProcessorTestFixture::SetUp();
    }

    void TearDown() override {
        NeighborSearchProcessorTestFixture::TearDown();
    }
};

TEST_F(MaxEdgeLengthProcessorTestFixture, MaxEdgeLengthProcessor) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // After htet, each hex element has one pair of tets that cut across the diagonal of the hex. The rest cut across the faces.
    std::vector<std::pair<double, size_t>> expected_max_edge_length = {{std::sqrt(2.0), 12}, {std::sqrt(3.0), 8}};
    CheckEntityFieldValueCount<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "max_edge_length", expected_max_edge_length, aperi::FieldQueryState::None);
}
