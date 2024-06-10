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
#include "MeshData.h"
#include "MathUtils.h"
#include "NeighborSearchProcessor.h"
#include "NeighborSearchProcessorTestFixture.h"

template <typename ViewType>
ViewType SumKokkosView(const Kokkos::View<ViewType *, Kokkos::DefaultExecutionSpace> &view) {
    auto sum_function = KOKKOS_LAMBDA(const int i, ViewType &lsum ) {
        lsum += view(i);
    };
    ViewType total = 0;
    Kokkos::parallel_reduce("Sum View", view.extent(0), sum_function, total);
    return total;
}

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
            throw std::runtime_error("Unsupported view type. Only 1D and 2D views are supported.");
        }
    }

    template <typename InputDataType, typename OutputDataType>
    void TransferFieldToCompressedRowKokkosView(const aperi::FieldQueryData &field_query_data, const aperi::MeshData &mesh_data, const std::vector<std::string> &sets, const Kokkos::View<InputDataType *, Kokkos::DefaultExecutionSpace> &row_length_field, Kokkos::View<OutputDataType *, Kokkos::DefaultExecutionSpace> &field_view) {
        stk::mesh::BulkData *bulk_data = mesh_data.GetBulkData();
        stk::mesh::MetaData &meta_data = bulk_data->mesh_meta_data();
        stk::mesh::Selector selector = aperi::StkGetSelector(sets, &meta_data);
        stk::topology::rank_t rank = field_query_data.rank == aperi::FieldDataRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK;
        // Slow host operation
        FastMeshIndicesViewType entity_indices = m_search_processor->GetLocalEntityIndices(rank, selector);
        const unsigned num_entities = entity_indices.extent(0);
        assert(stk::mesh::count_entities(*m_bulk_data, rank, selector) == num_entities);

        stk::mesh::Field<OutputDataType> *field = aperi::StkGetField(field_query_data, &meta_data);
        stk::mesh::NgpField<OutputDataType> ngp_field = stk::mesh::get_updated_ngp_field<OutputDataType>(*field);

        // Calculate row starts
        Kokkos::View<int *, Kokkos::DefaultExecutionSpace> row_starts("row_starts", row_length_field.extent(0));
        Kokkos::parallel_scan("calculate row lengths", Kokkos::RangePolicy<Kokkos::DefaultExecutionSpace>(0, row_length_field.extent(0)), KOKKOS_LAMBDA(int i, int &running_sum, bool final) {
            if (final) {
                row_starts(i) = running_sum;
            }
            running_sum += row_length_field(i);
            });
        Kokkos::fence();

        // Flatten the field
        // field_view is a 1D view that should be already sized to the total number of entries in the compressed row field
#ifndef NDEBUG
        Kokkos::parallel_for("check field size", Kokkos::RangePolicy<Kokkos::DefaultExecutionSpace>(0, 1), KOKKOS_LAMBDA(int) {
            assert(field_view.extent(0) == row_starts(row_length_field.extent(0) - 1) + row_length_field(row_length_field.extent(0) - 1));
        });
#endif
        Kokkos::parallel_for("compressed row field", stk::ngp::DeviceRangePolicy(0, row_length_field.extent(0)), KOKKOS_LAMBDA(int i) {
            for (int j = 0; j < row_length_field(i); ++j) {
                field_view(row_starts(i) + j) = ngp_field(entity_indices(i), j);
            }
        });
    }

    void SetupAndCheckFieldToViewTransfer(){
        CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
        const int num_nodes = m_search_processor->GetNumNodes();

        // Setup Kokkos views
        m_coordinates_view_device = Kokkos::View<double **, Kokkos::DefaultExecutionSpace>("compadre node coordinates", num_nodes, 3);
        m_coordinates_view_host = Kokkos::create_mirror_view(m_coordinates_view_device);

        m_kernel_radius_view_device = Kokkos::View<double *, Kokkos::DefaultExecutionSpace>("kernel radius", num_nodes);
        m_kernel_radius_view_host = Kokkos::create_mirror_view(m_kernel_radius_view_device);

        m_num_neighbors_view_device = Kokkos::View<double *, Kokkos::DefaultExecutionSpace>("number of neighbor", num_nodes);
        m_num_neighbors_view_host = Kokkos::create_mirror_view(m_num_neighbors_view_device);

        m_neighbor_lists_device = Kokkos::View<double *, Kokkos::DefaultExecutionSpace>("neighbors", num_nodes * num_nodes);
        m_neighbor_lists_host = Kokkos::create_mirror_view(m_neighbor_lists_device);

        // ---------------------
        // Node Coordinates
        //Kokkos::View<double **, Kokkos::DefaultExecutionSpace> coordinates_view_device("compadre node coordinates", num_nodes, 3);
        aperi::FieldQueryData field_query_data = {m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataRank::NODE};
        TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, m_coordinates_view_device);

        // Check coordinates
        Kokkos::deep_copy(m_coordinates_view_host, m_coordinates_view_device);
        for (int i = 0; i < num_nodes; ++i) {
            EXPECT_TRUE(m_coordinates_view_host(i, 0) >= 0.0 && m_coordinates_view_host(i, 0) <= m_num_elements_x);
            EXPECT_TRUE(m_coordinates_view_host(i, 1) >= 0.0 && m_coordinates_view_host(i, 1) <= m_num_elements_y);
            EXPECT_TRUE(m_coordinates_view_host(i, 2) >= 0.0 && m_coordinates_view_host(i, 2) <= m_num_elements_z);
        }
        EXPECT_TRUE(m_coordinates_view_host(num_nodes - 1, 0) ==  m_num_elements_x);
        EXPECT_TRUE(m_coordinates_view_host(num_nodes - 1, 1) ==  m_num_elements_y);
        EXPECT_TRUE(m_coordinates_view_host(num_nodes - 1, 2) ==  m_num_elements_z);

        double diagonal_length = std::sqrt(m_num_elements_x * m_num_elements_x + m_num_elements_y * m_num_elements_y + m_num_elements_z * m_num_elements_z);
        double kernel_radius = 1.01 * diagonal_length;  // Large ball radius, all nodes are neighbors
        m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);

        // ---------------------
        // Kernel Radius
        field_query_data = {"kernel_radius", aperi::FieldQueryState::None, aperi::FieldDataRank::NODE};
        TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, m_kernel_radius_view_device);

        // Check kernel radius
        Kokkos::deep_copy(m_kernel_radius_view_host, m_kernel_radius_view_device);
        for (int i = 0; i < num_nodes; ++i) {
            EXPECT_DOUBLE_EQ(m_kernel_radius_view_host(i), kernel_radius);
        }

        // ---------------------
        // Number of Neighbors
        field_query_data = {"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataRank::NODE};
        TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, m_num_neighbors_view_device);

        // Check number of neighbors
        Kokkos::deep_copy(m_num_neighbors_view_host, m_num_neighbors_view_device);
        for (int i = 0; i < num_nodes; ++i) {
            EXPECT_EQ(m_num_neighbors_view_host(i), num_nodes);
        }

        // Total number of neighbors
        double total_num_neighbors = SumKokkosView(m_num_neighbors_view_device);
        EXPECT_DOUBLE_EQ(total_num_neighbors, num_nodes * num_nodes);

        // ---------------------
        // Neighbors
        field_query_data = {"neighbors", aperi::FieldQueryState::None, aperi::FieldDataRank::NODE};
        TransferFieldToCompressedRowKokkosView(field_query_data, *m_mesh_data, {"block_1"},  m_num_neighbors_view_device, m_neighbor_lists_device);

        // Check neighbors
        Kokkos::sort(m_neighbor_lists_device);
        Kokkos::deep_copy(m_neighbor_lists_host, m_neighbor_lists_device);
        for (int i = 0; i < num_nodes; ++i) {
            for (int j = 0; j < num_nodes; ++j) {
                EXPECT_EQ(m_neighbor_lists_host(i * num_nodes + j), i + 1);
            }
        }

    }

   protected:
    void SetUp() override {
        NeighborSearchProcessorTestFixture::SetUp();
    }

    void TearDown() override {
        NeighborSearchProcessorTestFixture::TearDown();
    }

    Kokkos::View<double **, Kokkos::DefaultExecutionSpace> m_coordinates_view_device;
    Kokkos::View<double **>::HostMirror m_coordinates_view_host;
    Kokkos::View<double *, Kokkos::DefaultExecutionSpace> m_kernel_radius_view_device;
    Kokkos::View<double *>::HostMirror m_kernel_radius_view_host;
    Kokkos::View<double *, Kokkos::DefaultExecutionSpace> m_num_neighbors_view_device;
    Kokkos::View<double *>::HostMirror m_num_neighbors_view_host;
    Kokkos::View<double *, Kokkos::DefaultExecutionSpace> m_neighbor_lists_device;
    Kokkos::View<double *>::HostMirror m_neighbor_lists_host;

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

    SetupAndCheckFieldToViewTransfer();
}

TEST_F(CompadreApproximationFunctionTest, BuildApproximationFunctions) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;

    SetupAndCheckFieldToViewTransfer();

    // initialize an instance of the GMLS class
    int dimension = 3;
    int order = 1;
    Compadre::GMLS gmls_problem(Compadre::VectorOfScalarClonesTaylorPolynomial, Compadre::VectorPointSample, order, dimension);
    gmls_problem.setProblemData(m_neighbor_lists_device, m_num_neighbors_view_device, m_coordinates_view_device, m_coordinates_view_device, m_kernel_radius_view_device);

    // create a vector of target operations
    std::vector<Compadre::TargetOperation> lro(1);
    lro[0] = Compadre::ScalarPointEvaluation;

    // and then pass them to the GMLS class
    gmls_problem.addTargets(lro);

    // sets the weighting kernel function from WeightingFunctionType
    gmls_problem.setWeightingType(Compadre::WeightingFunctionType::CubicSpline);

    // generate the alphas that to be combined with data for each target operation requested in lro
    int number_of_batches = 1;
    bool keep_coefficients = false;
    gmls_problem.generateAlphas(number_of_batches, keep_coefficients);

    auto solution = gmls_problem.getSolutionSetHost();
    auto alphas = solution->getAlphas();

    // Check the alphas
    std::cout << "Number of alphas: " << alphas.size() << "\n";
    double alpha_sum = 0.0;
    for (size_t i = 0; i < alphas.size(); ++i) {
        std::cout << "Alpha " << i << ": " << alphas(i) << "\n";
        alpha_sum += alphas(i);
        // EXPECT_DOUBLE_EQ(alphas[i], 1.0);
    }
    std::cout << "Alpha sum: " << alpha_sum << "\n";
}