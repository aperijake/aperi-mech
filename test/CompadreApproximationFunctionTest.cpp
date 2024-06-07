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

    template <typename ViewType>
    void TransferFieldToKokkosView(const aperi::FieldQueryData &field_query_data, const aperi::MeshData &mesh_data, const std::vector<std::string> &sets, Kokkos::View<ViewType, Kokkos::DefaultExecutionSpace> &field_view) {
        using DataType = typename Kokkos::View<ViewType, Kokkos::DefaultExecutionSpace>::value_type;
        stk::mesh::BulkData *bulk_data = mesh_data.GetBulkData();
        stk::mesh::MetaData &meta_data = bulk_data->mesh_meta_data();
        stk::mesh::Selector selector = aperi::StkGetSelector(sets, &meta_data);
        stk::topology::rank_t rank = field_query_data.rank == aperi::FieldDataRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK;
        // Slow host operation
        FastMeshIndicesViewType entity_indices = m_search_processor->GetLocalEntityIndices(rank, selector);
        const unsigned num_entities = entity_indices.extent(0);
        assert(stk::mesh::count_entities(*m_bulk_data, rank, selector) == num_entities);
        assert(field_view.extent(0) == num_entities);

        stk::mesh::Field<DataType> *field = aperi::StkGetField(field_query_data, &meta_data);
        stk::mesh::NgpField<DataType> ngp_field = stk::mesh::get_updated_ngp_field<DataType>(*field);

        if constexpr (std::is_same<ViewType, DataType *>::value) {
            Kokkos::parallel_for(
                stk::ngp::DeviceRangePolicy(0, entity_indices.extent(0)), KOKKOS_LAMBDA(const unsigned &i) {
                    assert(ngp_field.get_num_components_per_entity(entity_indices(i)) == 1);
                    field_view(i) = ngp_field(entity_indices(i), 0);
                });
        } else if constexpr (std::is_same<ViewType, DataType **>::value) {
            size_t num_components = field_view.extent(1);
            Kokkos::parallel_for(
                stk::ngp::DeviceRangePolicy(0, entity_indices.extent(0)), KOKKOS_LAMBDA(const unsigned &i) {
                    assert(ngp_field.get_num_components_per_entity(entity_indices(i)) == num_components);
                    for (size_t j = 0; j < num_components; ++j) {
                        field_view(i, j) = ngp_field(entity_indices(i), j);
                    }
                });
        } else {
            throw std::runtime_error("Unsupported view type");
        }
    }

   protected:
    void SetUp() override {
        NeighborSearchProcessorTestFixture::SetUp();
    }

    void TearDown() override {
        NeighborSearchProcessorTestFixture::TearDown();
    }

};

TEST_F(CompadreApproximationFunctionTest, TransferFieldsToKokkosView) {
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

    // ---------------------
    // Node Coordinates
    Kokkos::View<double **, Kokkos::DefaultExecutionSpace> coordinates_view_device("compadre node coordinates", num_nodes, 3);
    aperi::FieldQueryData field_query_data = {m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataRank::NODE};
    TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, coordinates_view_device);

    // Check coordinates
    Kokkos::View<double **>::HostMirror coordinates_view = Kokkos::create_mirror_view(coordinates_view_device);
    Kokkos::deep_copy(coordinates_view, coordinates_view_device);
    for (int i = 0; i < num_nodes; ++i) {
        EXPECT_TRUE(coordinates_view(i, 0) >= 0.0 && coordinates_view(i, 0) <= m_num_elements_x);
        EXPECT_TRUE(coordinates_view(i, 1) >= 0.0 && coordinates_view(i, 1) <= m_num_elements_y);
        EXPECT_TRUE(coordinates_view(i, 2) >= 0.0 && coordinates_view(i, 2) <= m_num_elements_z);
    }
    EXPECT_TRUE(coordinates_view(num_nodes - 1, 0) ==  m_num_elements_x);
    EXPECT_TRUE(coordinates_view(num_nodes - 1, 1) ==  m_num_elements_y);
    EXPECT_TRUE(coordinates_view(num_nodes - 1, 2) ==  m_num_elements_z);

    double diagonal_length = std::sqrt(m_num_elements_x * m_num_elements_x + m_num_elements_y * m_num_elements_y + m_num_elements_z * m_num_elements_z);
    double kernel_radius = 1.01 * diagonal_length;  // Large ball radius, all nodes are neighbors
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);

    // ---------------------
    // Kernel Radius
    Kokkos::View<double *, Kokkos::DefaultExecutionSpace> kernel_radius_view_device("kernel radius", num_nodes);
    field_query_data = {"kernel_radius", aperi::FieldQueryState::None, aperi::FieldDataRank::NODE};
    TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, kernel_radius_view_device);

    // Check kernel radius
    Kokkos::View<double *>::HostMirror kernel_radius_view = Kokkos::create_mirror_view(kernel_radius_view_device);
    Kokkos::deep_copy(kernel_radius_view, kernel_radius_view_device);
    for (int i = 0; i < num_nodes; ++i) {
        std::cout << "Node " << i << ": " << kernel_radius_view(i) << std::endl;
        EXPECT_DOUBLE_EQ(kernel_radius_view(i), kernel_radius);
    }

    // ---------------------
    // Number of Neighbors
    Kokkos::View<double *, Kokkos::DefaultExecutionSpace> num_neighbors_view_device("number of neighbor", num_nodes);
    field_query_data = {"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataRank::NODE};
    TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, num_neighbors_view_device);

    // Check number of neighbors
    Kokkos::View<double *>::HostMirror num_neighbors_view = Kokkos::create_mirror_view(num_neighbors_view_device);
    Kokkos::deep_copy(num_neighbors_view, num_neighbors_view_device);
    for (int i = 0; i < num_nodes; ++i) {
        std::cout << "Node " << i << ": " << num_neighbors_view(i) << std::endl;
        EXPECT_EQ(num_neighbors_view(i), num_nodes);
    }

    // Kokkos::View<int*> neighbor_lists_device("neighbor lists", 0);
}