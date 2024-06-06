#include <gtest/gtest.h>
#include <mpi.h>

#include <Compadre_GMLS.hpp>
#include <Kokkos_Core.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <cstdlib>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "NeighborSearchProcessorTestFixture.h"

// Compadre fixture
class CompadreApproximationFunctionTest : public NeighborSearchProcessorTestFixture {
   using ExecSpace = stk::ngp::ExecSpace;
   using FastMeshIndicesViewType = Kokkos::View<stk::mesh::FastMeshIndex *, ExecSpace>;

   public:

    void TransferStkCoordinatesToKokkosView(Kokkos::View<double**, Kokkos::DefaultExecutionSpace> &coordinates_device) {
        stk::mesh::MetaData &meta_data = m_bulk_data->mesh_meta_data();
        stk::mesh::Selector selector = aperi::StkGetSelector({}, &meta_data);
        // Slow host operation
        FastMeshIndicesViewType node_indices = m_search_processor->GetLocalEntityIndices(stk::topology::NODE_RANK, selector);
        const unsigned num_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, selector);

        stk::mesh::Field<double> *coordinates_field = aperi::StkGetField(aperi::FieldQueryData{m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataRank::NODE}, &meta_data);
        stk::mesh::NgpField<double> ngp_coordinates_field = stk::mesh::get_updated_ngp_field<double>(*coordinates_field);

        Kokkos::parallel_for(
            stk::ngp::DeviceRangePolicy(0, num_nodes), KOKKOS_LAMBDA(const unsigned &i) {
                stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_indices(i));
                for (size_t j = 0; j < 3; ++j) {
                    coordinates_device(i, j) = ngp_coordinates_field(node_indices(i), j);
                }
            });
    }

   protected:
    void SetUp() override {
        NeighborSearchProcessorTestFixture::SetUp();
    }

    void TearDown() override {
        NeighborSearchProcessorTestFixture::TearDown();
    }

};

TEST_F(CompadreApproximationFunctionTest, TransferStkCoordinatesToKokkosView) {

    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    const int num_nodes = m_search_processor->GetNumNodes();

    // coordinates of source sites
    Kokkos::View<double **, Kokkos::DefaultExecutionSpace> compadre_coords_device("compadre node coordinates", num_nodes, 3);
    TransferStkCoordinatesToKokkosView(compadre_coords_device);

    // Print coordinates
    Kokkos::View<double **>::HostMirror compadre_coords = Kokkos::create_mirror_view(compadre_coords_device);
    Kokkos::deep_copy(compadre_coords, compadre_coords_device);
    for (int i = 0; i < num_nodes; ++i) {
        // std::cout << "Node " << i << ": " << compadre_coords(i, 0) << ", " << compadre_coords(i, 1) << ", " << compadre_coords(i, 2) << std::endl;
        EXPECT_TRUE(compadre_coords(i, 0) >= 0.0 && compadre_coords(i, 0) <= m_num_elements_x);
        EXPECT_TRUE(compadre_coords(i, 1) >= 0.0 && compadre_coords(i, 1) <= m_num_elements_y);
        EXPECT_TRUE(compadre_coords(i, 2) >= 0.0 && compadre_coords(i, 2) <= m_num_elements_z);
    }
    EXPECT_TRUE(compadre_coords(num_nodes - 1, 0) ==  m_num_elements_x);
    EXPECT_TRUE(compadre_coords(num_nodes - 1, 1) ==  m_num_elements_y);
    EXPECT_TRUE(compadre_coords(num_nodes - 1, 2) ==  m_num_elements_z);

}
