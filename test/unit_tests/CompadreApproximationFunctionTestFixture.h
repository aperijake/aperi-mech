#pragma once
#include <gtest/gtest.h>
#include <mpi.h>

#include <Compadre_GMLS.hpp>
#include <Kokkos_Core.hpp>
#include <chrono>
#include <cstdlib>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "FunctionValueStorageProcessorTestFixture.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "UnitTestUtils.h"

template <typename ViewType>
ViewType SumKokkosView(const Kokkos::View<ViewType *, Kokkos::DefaultExecutionSpace> &view) {
    auto sum_function = KOKKOS_LAMBDA(const int i, ViewType &lsum) {
        lsum += view(i);
    };
    ViewType total = 0;
    Kokkos::parallel_reduce("Sum View", view.extent(0), sum_function, total);
    return total;
}

// Compadre fixture
class CompadreApproximationFunctionTest : public FunctionValueStorageProcessorTestFixture {
    using ExecSpace = stk::ngp::ExecSpace;
    using FastMeshIndicesViewType = Kokkos::View<stk::mesh::FastMeshIndex *, ExecSpace>;

   public:
    template <typename ViewType, typename DataType>
    void TransferFieldToKokkosView(const aperi::FieldQueryData<DataType> &field_query_data, const aperi::MeshData &mesh_data, const std::vector<std::string> &sets, Kokkos::View<ViewType, Kokkos::DefaultExecutionSpace> &field_view) {
        stk::mesh::BulkData *bulk_data = mesh_data.GetBulkData();
        stk::mesh::MetaData &meta_data = bulk_data->mesh_meta_data();
        stk::mesh::Selector selector = aperi::StkGetSelector(sets, &meta_data);
        stk::topology::rank_t topology_rank = field_query_data.topology_rank == aperi::FieldDataTopologyRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK;
        // Slow host operation
        FastMeshIndicesViewType entity_indices = aperi::GetLocalEntityIndices(topology_rank, selector, bulk_data);
        const unsigned num_entities = entity_indices.extent(0);
        assert(stk::mesh::count_entities(*m_bulk_data, topology_rank, selector) == num_entities);
        assert(field_view.extent(0) == num_entities);

        stk::mesh::Field<DataType> *field = aperi::StkGetField(field_query_data, &meta_data);
        stk::mesh::NgpField<DataType> ngp_field = stk::mesh::get_updated_ngp_field<DataType>(*field);

        if constexpr (std::is_same<ViewType, DataType *>::value) {
            Kokkos::parallel_for(
                stk::ngp::DeviceRangePolicy(0, num_entities), KOKKOS_LAMBDA(const unsigned &i) {
                    assert(ngp_field.get_num_components_per_entity(entity_indices(i)) == 1);
                    field_view(i) = ngp_field(entity_indices(i), 0);
                });
        } else if constexpr (std::is_same<ViewType, DataType **>::value) {
            size_t num_components = field_view.extent(1);
            Kokkos::parallel_for(
                stk::ngp::DeviceRangePolicy(0, num_entities), KOKKOS_LAMBDA(const unsigned &i) {
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
    void TransferFieldToCompressedRowKokkosView(const aperi::FieldQueryData<OutputDataType> &field_query_data, const aperi::MeshData &mesh_data, const std::vector<std::string> &sets, const Kokkos::View<InputDataType *, Kokkos::DefaultExecutionSpace> &row_length_field, Kokkos::View<OutputDataType *, Kokkos::DefaultExecutionSpace> &field_view) {
        stk::mesh::BulkData *bulk_data = mesh_data.GetBulkData();
        stk::mesh::MetaData &meta_data = bulk_data->mesh_meta_data();
        stk::mesh::Selector selector = aperi::StkGetSelector(sets, &meta_data);
        stk::topology::rank_t topology_rank = field_query_data.topology_rank == aperi::FieldDataTopologyRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK;
        // Slow host operation
        FastMeshIndicesViewType entity_indices = aperi::GetLocalEntityIndices(topology_rank, selector, bulk_data);
        assert(stk::mesh::count_entities(*m_bulk_data, topology_rank, selector) == entity_indices.extent(0));

        stk::mesh::Field<OutputDataType> *field = aperi::StkGetField(field_query_data, &meta_data);
        stk::mesh::NgpField<OutputDataType> ngp_field = stk::mesh::get_updated_ngp_field<OutputDataType>(*field);

        // Calculate row starts
        Kokkos::View<int *, Kokkos::DefaultExecutionSpace> row_starts("row_starts", row_length_field.extent(0));
        Kokkos::parallel_scan(
            "calculate row lengths", Kokkos::RangePolicy<Kokkos::DefaultExecutionSpace>(0, row_length_field.extent(0)), KOKKOS_LAMBDA(int i, int &running_sum, bool final) {
                if (final) {
                    row_starts(i) = running_sum;
                }
                running_sum += row_length_field(i);
            });
        Kokkos::fence();

        // int proc_rank;
        // MPI_Comm_rank(MPI_COMM_WORLD, &proc_rank);
        // Flatten the field
        // field_view is a 1D view that should be already sized to the total number of entries in the compressed row field
#ifndef NDEBUG
        Kokkos::parallel_for(
            "check field size", Kokkos::RangePolicy<Kokkos::DefaultExecutionSpace>(0, 1), KOKKOS_LAMBDA(int) {
                assert(field_view.extent(0) == row_starts(row_length_field.extent(0) - 1) + row_length_field(row_length_field.extent(0) - 1));
            });
#endif
        Kokkos::parallel_for(
            "compressed row field", stk::ngp::DeviceRangePolicy(0, row_length_field.extent(0)), KOKKOS_LAMBDA(int i) {
                for (InputDataType j = 0; j < row_length_field(i); ++j) {
                    field_view(row_starts(i) + j) = ngp_field(entity_indices(i), j);
                    // std::cout << "proc_rank = " << proc_rank << ", i = " << i << ", entity_indices(i) = " << entity_indices(i).bucket_ord << ", j = " << j << ", field_view = " << field_view(row_starts(i) + j) << "\n";
                }
            });
    }

    // Convert to 0-based index
    template <typename T>
    void ConvertToZeroBasedIndex(Kokkos::View<T *, Kokkos::DefaultExecutionSpace> &view) {
        // int proc_rank;
        // MPI_Comm_rank(MPI_COMM_WORLD, &proc_rank);
        // Convert to 0-based index
        Kokkos::parallel_for(
            "convert to 0-based index", stk::ngp::DeviceRangePolicy(0, view.extent(0)), KOKKOS_LAMBDA(int i) {
                stk::mesh::Entity node_id(view(i));
                view(i) = node_id.local_offset() - 1;
                // std::cout << "proc_rank = " << proc_rank << ", i = " << i << ", view = " << view(i) << "\n";
            });
    }

    void SetupFieldToViewTransfer(const bool check_fields = true) {
        // Testing assumes a uniform kernel radius and all nodes are neighbors of each other
        // Number of local nodes
        const int num_local_nodes = m_search_processor->GetNumNodes();

        // Number of local owned and shared nodes
        const int num_local_owned_and_shared_nodes = m_search_processor->GetNumOwnedAndSharedNodes();

        // Total number of nodes in the mesh
        int total_num_nodes = m_mesh_data->GetNumNodes();

        // Setup Kokkos views
        m_coordinates_view_device = Kokkos::View<double **, Kokkos::DefaultExecutionSpace>("compadre node coordinates", num_local_nodes, 3);
        m_coordinates_view_host = Kokkos::create_mirror_view(m_coordinates_view_device);

        m_kernel_radius_view_device = Kokkos::View<double *, Kokkos::DefaultExecutionSpace>("kernel radius", num_local_nodes);
        m_kernel_radius_view_host = Kokkos::create_mirror_view(m_kernel_radius_view_device);

        m_num_neighbors_view_device = Kokkos::View<uint64_t *, Kokkos::DefaultExecutionSpace>("number of neighbor", num_local_nodes);
        m_num_neighbors_view_host = Kokkos::create_mirror_view(m_num_neighbors_view_device);

        // ---------------------
        // Node Coordinates
        aperi::FieldQueryData<double> field_query_data = {m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, m_coordinates_view_device);
        Kokkos::deep_copy(m_coordinates_view_host, m_coordinates_view_device);

        // Check coordinates
        if (check_fields) {
            std::vector<double> local_minimum_coordinates = {static_cast<double>(m_num_elements_x), static_cast<double>(m_num_elements_y), static_cast<double>(m_num_elements_z)};
            std::vector<double> local_maximum_coordinates = {0.0, 0.0, 0.0};
            std::vector<double> expected_global_minimum_coordinates = {0.0, 0.0, 0.0};
            std::vector<double> expected_global_maximum_coordinates = {static_cast<double>(m_num_elements_x), static_cast<double>(m_num_elements_y), static_cast<double>(m_num_elements_z)};
            for (int i = 0; i < num_local_nodes; ++i) {
                for (int j = 0; j < 3; ++j) {
                    EXPECT_GE(m_coordinates_view_host(i, j), expected_global_minimum_coordinates[j]);
                    EXPECT_LE(m_coordinates_view_host(i, j), expected_global_maximum_coordinates[j]);
                    local_minimum_coordinates[j] = std::min(local_minimum_coordinates[j], m_coordinates_view_host(i, j));
                    local_maximum_coordinates[j] = std::max(local_maximum_coordinates[j], m_coordinates_view_host(i, j));
                }
            }
            // Communicate the minimum and maximum coordinates
            std::vector<double> global_minimum_coordinates(3);
            std::vector<double> global_maximum_coordinates(3);
            MPI_Allreduce(local_minimum_coordinates.data(), global_minimum_coordinates.data(), 3, MPI_DOUBLE, MPI_MIN, MPI_COMM_WORLD);
            MPI_Allreduce(local_maximum_coordinates.data(), global_maximum_coordinates.data(), 3, MPI_DOUBLE, MPI_MAX, MPI_COMM_WORLD);
            for (int j = 0; j < 3; ++j) {
                EXPECT_DOUBLE_EQ(global_minimum_coordinates[j], expected_global_minimum_coordinates[j]);
                EXPECT_DOUBLE_EQ(global_maximum_coordinates[j], expected_global_maximum_coordinates[j]);
            }
        }

        // ---------------------
        // Kernel Radius
        field_query_data = {"kernel_radius", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        TransferFieldToKokkosView(field_query_data, *m_mesh_data, {"block_1"}, m_kernel_radius_view_device);
        Kokkos::deep_copy(m_kernel_radius_view_host, m_kernel_radius_view_device);

        // Check kernel radius
        if (check_fields) {
            for (int i = 0; i < num_local_nodes; ++i) {
                EXPECT_DOUBLE_EQ(m_kernel_radius_view_host(i), m_kernel_factor);
            }
        }

        // ---------------------
        // Number of Neighbors
        aperi::FieldQueryData<uint64_t> field_query_data_uint = {m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        field_query_data_uint = {"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        TransferFieldToKokkosView(field_query_data_uint, *m_mesh_data, {"block_1"}, m_num_neighbors_view_device);
        Kokkos::deep_copy(m_num_neighbors_view_host, m_num_neighbors_view_device);
        m_total_num_neighbors = SumKokkosView(m_num_neighbors_view_device);

        // Check number of neighbors
        if (check_fields) {
            double total_num_neighbors = 0.0;
            for (int i = 0; i < num_local_nodes; ++i) {
                // Num neighbors is not communicated for nodes that are local but not owned or shared so these nodes will look to have 0 neighbors
                if (m_num_neighbors_view_host(i) != 0.0) {
                    EXPECT_EQ(m_num_neighbors_view_host(i), total_num_nodes) << "i = " << i << ", num_neighbors = " << m_num_neighbors_view_host(i) << ", total_num_nodes = " << total_num_nodes;
                }
                total_num_neighbors += m_num_neighbors_view_host(i);
            }

            // Total number of neighbors
            EXPECT_DOUBLE_EQ(total_num_neighbors, total_num_nodes * num_local_owned_and_shared_nodes);
            EXPECT_DOUBLE_EQ(total_num_neighbors, m_total_num_neighbors);
        }

        // ---------------------
        // Neighbors
        m_neighbor_lists_device = Kokkos::View<uint64_t *, Kokkos::DefaultExecutionSpace>("neighbors", m_total_num_neighbors);
        m_neighbor_lists_host = Kokkos::create_mirror_view(m_neighbor_lists_device);

        field_query_data_uint = {"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        TransferFieldToCompressedRowKokkosView(field_query_data_uint, *m_mesh_data, {"block_1"}, m_num_neighbors_view_device, m_neighbor_lists_device);
        // Convert to 0-based index
        ConvertToZeroBasedIndex(m_neighbor_lists_device);
        Kokkos::deep_copy(m_neighbor_lists_host, m_neighbor_lists_device);  // Not used here, but to be consistent

        // Check neighbors
        if (check_fields) {
            // Sort the neighbors to make it easier to check
            Kokkos::View<double *, Kokkos::DefaultExecutionSpace> sorted_neighbors("sorted neighbors", m_total_num_neighbors);
            Kokkos::View<double *, Kokkos::DefaultExecutionSpace>::HostMirror sorted_neighbors_host = Kokkos::create_mirror_view(sorted_neighbors);
            Kokkos::deep_copy(sorted_neighbors, m_neighbor_lists_device);
            Kokkos::sort(sorted_neighbors);
            Kokkos::deep_copy(sorted_neighbors_host, sorted_neighbors);
            for (int i = 0; i < num_local_owned_and_shared_nodes; ++i) {
                for (int j = 0; j < num_local_owned_and_shared_nodes; ++j) {
                    EXPECT_EQ(sorted_neighbors_host(i * num_local_owned_and_shared_nodes + j), i);
                }
                // This handles the case where the neighbor is local but not owned or shared. Won't be relevant for 1 process runs.
                // TODO(jake): This could be a more explicit check, but harder to know the expected value
                for (int j = num_local_owned_and_shared_nodes; j < total_num_nodes; ++j) {
                    EXPECT_GT(sorted_neighbors_host(i * num_local_owned_and_shared_nodes + j), i);
                    EXPECT_LT(sorted_neighbors_host(i * num_local_owned_and_shared_nodes + j), total_num_nodes);
                }
            }
        }
    }

    void DebugPrintViews() {
        // Print coordinates
        Kokkos::deep_copy(m_coordinates_view_host, m_coordinates_view_device);
        for (size_t i = 0; i < m_coordinates_view_host.extent(0); ++i) {
            std::cout << "Node " << i << ": ";
            for (size_t j = 0; j < m_coordinates_view_host.extent(1); ++j) {
                std::cout << m_coordinates_view_host(i, j) << " ";
            }
            std::cout << "\n";
        }

        // Print kernel radius
        Kokkos::deep_copy(m_kernel_radius_view_host, m_kernel_radius_view_device);
        for (size_t i = 0; i < m_kernel_radius_view_host.extent(0); ++i) {
            std::cout << "Kernel radius " << i << ": " << m_kernel_radius_view_host(i) << "\n";
        }

        // Print number of neighbors
        Kokkos::deep_copy(m_num_neighbors_view_host, m_num_neighbors_view_device);
        for (size_t i = 0; i < m_num_neighbors_view_host.extent(0); ++i) {
            std::cout << "Number of neighbors " << i << ": " << m_num_neighbors_view_host(i) << "\n";
        }

        // Print neighbors
        size_t row_start = 0;
        Kokkos::deep_copy(m_neighbor_lists_host, m_neighbor_lists_device);
        for (size_t i = 0; i < m_num_neighbors_view_host.extent(0); ++i) {
            std::cout << "Node " << i << " neighbors: ";
            size_t num_neighbors = (size_t)m_num_neighbors_view_host(i);
            for (size_t j = 0; j < num_neighbors; ++j) {
                std::cout << m_neighbor_lists_host(row_start + j) << " ";
            }
            row_start += num_neighbors;
            std::cout << "\n";
        }
    }

    std::map<std::string, double> TestBuildingApproximationFunctions(bool use_variable_ball = true) {
        std::map<std::string, double> runtimes;

        auto start = std::chrono::high_resolution_clock::now();
        // Perform non-Compadre neighbor search
        auto search_start_time = std::chrono::high_resolution_clock::now();  // benchmark
        if (use_variable_ball) {
            m_search_processor->add_nodes_neighbors_within_variable_ball(m_kernel_factor);
        } else {
            m_search_processor->add_nodes_neighbors_within_constant_ball(m_kernel_factor);
        }
        auto search_end_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> search_runtime = search_end_time - search_start_time;
        runtimes.emplace("neighbor_search", search_runtime.count());

        auto field_to_view_start = std::chrono::high_resolution_clock::now();  // benchmark
        bool check_fields = false;                                             // Checked in test above
        SetupFieldToViewTransfer(check_fields);
        auto field_to_view_end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> field_to_view_runtime = field_to_view_end - field_to_view_start;
        runtimes.emplace("field_to_view_transfer", field_to_view_runtime.count());

        // Compute the function values using the shape functions functor for comparison
        BuildFunctionValueStorageProcessor();
        aperi::BasesLinear bases;
        bool use_target_center_kernel = true;                            // Like Compadre, but search still uses source center kernel so this is not perfect
        auto rk_start_time = std::chrono::high_resolution_clock::now();  // benchmark
        m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel, bases, use_target_center_kernel);
        auto rk_end_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> rk_runtime = rk_end_time - rk_start_time;
        runtimes.emplace("compute_reproducing_kernel", rk_runtime.count());

        // initialize an instance of the GMLS class
        int dimension = 3;
        int order = 1;
        Compadre::GMLS gmls_problem(Compadre::ScalarTaylorPolynomial, Compadre::PointSample, order, dimension);
        gmls_problem.setProblemData(m_neighbor_lists_device, m_num_neighbors_view_device, m_coordinates_view_device, m_coordinates_view_device, m_kernel_radius_view_device);
        // print sizes of the views

        // create a vector of target operations
        std::vector<Compadre::TargetOperation> lro(1);
        lro[0] = Compadre::ScalarPointEvaluation;

        // and then pass them to the GMLS class
        gmls_problem.addTargets(lro);

        // sets the weighting kernel function from WeightingFunctionType
        gmls_problem.setWeightingType(Compadre::WeightingFunctionType::CardinalCubicBSpline);

        // COMPADRE Question: This still seems to go down the QR path?
        // gmls_problem.setDenseSolverType(Compadre::DenseSolverType::LU);

        // generate the alphas that to be combined with data for each target operation requested in lro
        int number_of_batches = 10;
        bool keep_coefficients = false;
        auto compadre_start_time = std::chrono::high_resolution_clock::now();  // benchmark
        gmls_problem.generateAlphas(number_of_batches, keep_coefficients);
        auto compadre_end_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> compadre_runtime = compadre_end_time - compadre_start_time;
        runtimes.emplace("compute_compadre", compadre_runtime.count());

        auto solution = gmls_problem.getSolutionSetHost();
        auto alphas = solution->getAlphas();
        auto alphas_host = Kokkos::create_mirror_view(alphas);

        // Transfer the function values to a Kokkos view
        aperi::FieldQueryData<double> field_query_data = {"function_values", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        Kokkos::View<double *, Kokkos::DefaultExecutionSpace> function_values_device("function values", m_total_num_neighbors);  // All nodes are neighbors
        TransferFieldToCompressedRowKokkosView(field_query_data, *m_mesh_data, {"block_1"}, m_num_neighbors_view_device, function_values_device);
        Kokkos::View<double *, Kokkos::DefaultExecutionSpace>::HostMirror function_values_host = Kokkos::create_mirror_view(function_values_device);
        Kokkos::deep_copy(function_values_host, function_values_device);

        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> elapsed_seconds = end - start;
        runtimes.emplace("total", elapsed_seconds.count());

        // Check the alphas
        double tolerance = 1.0e-6;
        EXPECT_EQ(alphas_host.extent(0), m_total_num_neighbors);
        double num_local_nodes = m_search_processor->GetNumNodes();
        size_t k = 0;
        size_t num_with_value = 0;
        size_t num_with_zero = 0;
        for (size_t i = 0; i < num_local_nodes; ++i) {
            size_t num_neighbors = (size_t)m_num_neighbors_view_host(i);
            double alpha_sum = 0.0;
            for (size_t j = 0; j < num_neighbors; ++j) {
                alpha_sum += alphas_host(k);
                if (std::abs(function_values_host(k)) < 1.0e-6) {
                    EXPECT_NEAR(alphas_host(k), 0.0, tolerance) << "i = " << i << ", j = " << j << ", k = " << k << ", alpha = " << alphas_host(k) << ", function value = " << function_values_host(k);
                    ++num_with_zero;
                } else {
                    // Check the relative difference (absolute difference divided by the function value
                    double relative_difference = std::abs((alphas_host(k) - function_values_host(k)) / function_values_host(k));
                    EXPECT_LT(relative_difference, tolerance) << "i = " << i << ", j = " << j << ", k = " << k << ", alpha = " << alphas_host(k) << ", function value = " << function_values_host(k);
                    ++num_with_value;
                }
                ++k;
            }
            EXPECT_NEAR(alpha_sum, 1.0, 1.e-10);
        }
        EXPECT_GT(num_with_value, num_with_zero);  // Sanity check

        return runtimes;
    }

   protected:
    void SetUp() override {
        FunctionValueStorageProcessorTestFixture::SetUp();
    }

    void TearDown() override {
        FunctionValueStorageProcessorTestFixture::TearDown();
    }

    void ResetCompadreApproximationFunction() {
        // Reset scalar values
        m_total_num_neighbors = 0;
        m_kernel_factor = 1.0;

        // Reset Kokkos views
        m_coordinates_view_device = Kokkos::View<double **, Kokkos::DefaultExecutionSpace>();
        m_coordinates_view_host = Kokkos::View<double **>::HostMirror();
        m_kernel_radius_view_device = Kokkos::View<double *, Kokkos::DefaultExecutionSpace>();
        m_kernel_radius_view_host = Kokkos::View<double *>::HostMirror();
        m_num_neighbors_view_device = Kokkos::View<uint64_t *, Kokkos::DefaultExecutionSpace>();
        m_num_neighbors_view_host = Kokkos::View<uint64_t *>::HostMirror();
        m_neighbor_lists_device = Kokkos::View<uint64_t *, Kokkos::DefaultExecutionSpace>();
        m_neighbor_lists_host = Kokkos::View<uint64_t *>::HostMirror();

        // Call reset for inherited fixture components
        ResetFunctionValueStorageProcessor();
    }

    Kokkos::View<double **, Kokkos::DefaultExecutionSpace> m_coordinates_view_device;
    Kokkos::View<double **>::HostMirror m_coordinates_view_host;
    Kokkos::View<double *, Kokkos::DefaultExecutionSpace> m_kernel_radius_view_device;
    Kokkos::View<double *>::HostMirror m_kernel_radius_view_host;
    Kokkos::View<uint64_t *, Kokkos::DefaultExecutionSpace> m_num_neighbors_view_device;
    Kokkos::View<uint64_t *>::HostMirror m_num_neighbors_view_host;
    Kokkos::View<uint64_t *, Kokkos::DefaultExecutionSpace> m_neighbor_lists_device;
    Kokkos::View<uint64_t *>::HostMirror m_neighbor_lists_host;
    size_t m_total_num_neighbors = 0;
    double m_kernel_factor = 1.0;
};