#include <gtest/gtest.h>
#include <mpi.h>

#include "AperiStkUtils.h"
#include "EntityProcessor.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldTestFixture.h"
#include "FieldUtils.h"
#include "ForEachEntity.h"
#include "MeshData.h"
#include "UnitTestFieldUtils.h"

// Test node field access using raw pointers
TEST_F(FieldTestFixture, NodalFieldAccessRawPointer) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_node_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    SubtractFieldValuesFromRawPointer<3, 1>(field_query_data);

    // Get the norm
    double new_norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test element field access using raw pointers
TEST_F(FieldTestFixture, ElementFieldAccessRawPointer) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_element_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    SubtractFieldValuesFromRawPointer<3, 3>(field_query_data);

    // Get the norm
    double new_norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test node field access using Eigen maps
TEST_F(FieldTestFixture, NodalFieldAccessEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_node_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    SubtractFieldValuesFromEigenMap<3, 1>(field_query_data);

    // Get the norm
    double new_norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test element field access using Eigen maps
TEST_F(FieldTestFixture, ElementFieldAccessEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_element_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    SubtractFieldValuesFromEigenMap<3, 3>(field_query_data);

    // Get the norm
    double new_norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test Field operations
template <typename Operation, size_t Rows = 3, size_t Columns = 1>
struct TestFieldOperationsFunctor {
    TestFieldOperationsFunctor(aperi::Field<double> &field, const Eigen::Matrix<double, Rows, Columns> &data, Operation op)
        : m_field(field), m_data(data), m_op(op), m_result_device("result_device", 1), m_result(Kokkos::create_mirror_view(m_result_device)) {}

    KOKKOS_INLINE_FUNCTION void operator()(const int /*i*/) const {
        aperi::Index index(stk::mesh::FastMeshIndex{0, 0});
        m_op(m_field, index, m_data);
        m_result_device() = m_field.GetEigenMatrix<Rows, Columns>(index);
    }

    Eigen::Matrix<double, Rows, Columns> GetHostResult() const {
        Kokkos::deep_copy(m_result, m_result_device);
        return m_result();
    }

    mutable aperi::Field<double> m_field;
    Eigen::Matrix<double, Rows, Columns> m_data;
    Operation m_op;
    Kokkos::View<Eigen::Matrix<double, Rows, Columns>> m_result_device;
    typename Kokkos::View<Eigen::Matrix<double, Rows, Columns>>::HostMirror m_result;
};

// Test AtomicAdd method
template <size_t Rows, size_t Columns>
struct AtomicAddOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Matrix<double, Rows, Columns> &data) const {
        field.AtomicAdd(index, data);
    }
};

TEST_F(FieldTestFixture, AtomicAddVector) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AtomicAddOperation<3, 1>> functor(field, data, AtomicAddOperation<3, 1>());
    Kokkos::parallel_for("AtomicAdd", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

TEST_F(FieldTestFixture, AtomicAddMatrix) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Matrix<double, 3, 3> data;
    data << 1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0;
    TestFieldOperationsFunctor<AtomicAddOperation<3, 3>, 3, 3> functor(field, data, AtomicAddOperation<3, 3>());
    Kokkos::parallel_for("AtomicAdd", 1, functor);

    Eigen::Matrix<double, 3, 3> result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test Add method
template <size_t Rows, size_t Columns>
struct AddOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Matrix<double, Rows, Columns> &data) const {
        field.Add(index, data);
    }
};

TEST_F(FieldTestFixture, AddVector) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AddOperation<3, 1>> functor(field, data, AddOperation<3, 1>());
    Kokkos::parallel_for("Add", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

TEST_F(FieldTestFixture, AddMatrix) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Matrix<double, 3, 3> data;
    data << 1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0;
    TestFieldOperationsFunctor<AddOperation<3, 3>, 3, 3> functor(field, data, AddOperation<3, 3>());
    Kokkos::parallel_for("Add", 1, functor);

    Eigen::Matrix<double, 3, 3> result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test AtomicAssign method
template <size_t Rows, size_t Columns>
struct AtomicAssignOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Matrix<double, Rows, Columns> &data) const {
        field.AtomicAssign(index, data);
    }
};

TEST_F(FieldTestFixture, AtomicAssignVector) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AtomicAssignOperation<3, 1>> functor(field, data, AtomicAssignOperation<3, 1>());
    Kokkos::parallel_for("AtomicAssign", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

TEST_F(FieldTestFixture, AtomicAssignMatrix) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Matrix<double, 3, 3> data;
    data << 1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0;
    TestFieldOperationsFunctor<AtomicAssignOperation<3, 3>, 3, 3> functor(field, data, AtomicAssignOperation<3, 3>());
    Kokkos::parallel_for("AtomicAssign", 1, functor);

    Eigen::Matrix<double, 3, 3> result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test Assign method
template <size_t Rows, size_t Columns>
struct AssignOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Matrix<double, Rows, Columns> &data) const {
        field.Assign(index, data);
    }
};

TEST_F(FieldTestFixture, AssignVector) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AssignOperation<3, 1>> functor(field, data, AssignOperation<3, 1>());
    Kokkos::parallel_for("Assign", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

TEST_F(FieldTestFixture, AssignMatrix) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Matrix<double, 3, 3> data;
    data << 1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0;
    TestFieldOperationsFunctor<AssignOperation<3, 3>, 3, 3> functor(field, data, AssignOperation<3, 3>());
    Kokkos::parallel_for("Assign", 1, functor);

    Eigen::Matrix<double, 3, 3> result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test data method
template <size_t Rows, size_t Columns>
struct DataOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Matrix<double, Rows, Columns> &data) const {
        double *p_data_ptr = field.data(index);
        KOKKOS_ASSERT(p_data_ptr != nullptr);

        unsigned stride = field.GetStride(index);

        size_t ptr_index = 0;
        for (size_t i = 0; i < Rows; i++) {
            for (size_t j = 0; j < Columns; j++) {
                p_data_ptr[ptr_index] = data(i, j);
                ptr_index += stride;
            }
        }
    }
};

TEST_F(FieldTestFixture, DataMethodVector) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<DataOperation<3, 1>> functor(field, data, DataOperation<3, 1>());
    Kokkos::parallel_for("Data", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

TEST_F(FieldTestFixture, DataMethodMatrix) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Matrix<double, 3, 3> data;
    data << 1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0;
    TestFieldOperationsFunctor<DataOperation<3, 3>, 3, 3> functor(field, data, DataOperation<3, 3>());
    Kokkos::parallel_for("Data", 1, functor);

    Eigen::Matrix<double, 3, 3> result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test operator() method
template <size_t Rows, size_t Columns>
struct OperatorOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Matrix<double, Rows, Columns> &data) const {
        for (size_t i = 0; i < Rows; i++) {
            for (size_t j = 0; j < Columns; j++) {
                field(index, i * Columns + j) = data(i, j);
            }
        }
    }
};

TEST_F(FieldTestFixture, OperatorMethodVector) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<OperatorOperation<3, 1>> functor(field, data, OperatorOperation<3, 1>());
    Kokkos::parallel_for("Operator", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

TEST_F(FieldTestFixture, OperatorMethodMatrix) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Matrix<double, 3, 3> data;
    data << 1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0;
    TestFieldOperationsFunctor<OperatorOperation<3, 3>, 3, 3> functor(field, data, OperatorOperation<3, 3>());
    Kokkos::parallel_for("Operator", 1, functor);

    Eigen::Matrix<double, 3, 3> result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test GetEigenVectorMap method
struct GetEigenVectorMapOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        auto eigen_map = field.GetEigenVectorMap(index, 3);
        eigen_map(0) = data(0);
        eigen_map(1) = data(1);
        eigen_map(2) = data(2);
    }
};

TEST_F(FieldTestFixture, GetEigenVectorMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<GetEigenVectorMapOperation> functor(field, data, GetEigenVectorMapOperation());
    Kokkos::parallel_for("GetEigenVectorMap", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test GetEigenMatrixMap method
template <size_t Rows, size_t Columns>
struct GetEigenMatrixMapOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Matrix<double, Rows, Columns> &data) const {
        auto eigen_map = field.GetEigenMatrixMap<Rows, Columns>(index);
        for (size_t i = 0; i < Rows; i++) {
            for (size_t j = 0; j < Columns; j++) {
                eigen_map(i, j) = data(i, j);
            }
        }
    }
};

TEST_F(FieldTestFixture, GetEigenMatrixMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Matrix<double, 3, 3> data;
    data << 1.0, 2.0, 3.0,
        4.0, 5.0, 6.0,
        7.0, 8.0, 9.0;
    TestFieldOperationsFunctor<GetEigenMatrixMapOperation<3, 3>, 3, 3> functor(field, data, GetEigenMatrixMapOperation<3, 3>());
    Kokkos::parallel_for("GetEigenMatrixMap", 1, functor);

    Eigen::Matrix<double, 3, 3> result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}
struct CheckVectorMapAddressesFunctor {
    CheckVectorMapAddressesFunctor(aperi::Field<double> &field, Kokkos::View<int> error_flag, Kokkos::View<size_t> component_counter)
        : m_field(field), m_error_flag(error_flag), m_component_counter(component_counter) {}

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Get number of components
        int num_components = m_field.GetNumComponentsPerEntity(index);

        // Get Eigen map to data
        auto eigen_map = m_field.GetEigenVectorMap(index, num_components);

        // Get a const Eigen map to data
        auto const_eigen_map = m_field.GetConstEigenVectorMap(index, num_components);

        // Check that the Eigen map points to the same memory as the raw pointer
        for (int i = 0; i < num_components; i++) {
            // Atomic increment of the component counter
            Kokkos::atomic_fetch_add(&m_component_counter(), 1);
            if (&eigen_map.coeff(i) != &m_field(index, i)) {
                // Set the error flag, atomic operation
                Kokkos::atomic_fetch_or(&m_error_flag(), 1);
                // Get the bucket id and ordinal
                unsigned bucket_id = index.bucket_id();
                unsigned bucket_ordinal = index.bucket_ord();
                printf("Error: eigen_map and raw pointer for index %u, %u do not match at %u\n", bucket_id, bucket_ordinal, i);
                printf(
                    "Eigen Addresses:   %p\n"
                    "m_field Addresses: %p\n",
                    static_cast<const void *>(&eigen_map.coeff(i)), static_cast<const void *>(&m_field(index, i)));
            }
            if (&const_eigen_map.coeff(i) != &m_field(index, i)) {
                // Set the error flag, atomic operation
                Kokkos::atomic_fetch_or(&m_error_flag(), 1);
                // Get the bucket id and ordinal
                unsigned bucket_id = index.bucket_id();
                unsigned bucket_ordinal = index.bucket_ord();
                printf("Error: const_eigen_map and raw pointer for index %u, %u do not match at %u\n", bucket_id, bucket_ordinal, i);
                printf(
                    "Eigen Addresses:   %p\n"
                    "m_field Addresses: %p\n",
                    static_cast<const void *>(&const_eigen_map.coeff(i)), static_cast<const void *>(&m_field(index, i)));
            }
        }
    }

    aperi::Field<double> m_field;
    Kokkos::View<int> m_error_flag;
    Kokkos::View<size_t> m_component_counter;
};

TEST_F(FieldTestFixture, CheckVectorMapAddresses) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    // Ensure that the mesh data is initialized
    ASSERT_TRUE(m_mesh_data != nullptr);

    // Get the selector, universal part
    std::vector<std::string> sets = {};
    aperi::Selector selector = aperi::Selector(sets, m_mesh_data.get());

    // Get the nodal field
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    // Create a Kokkos::View to store the error flag
    Kokkos::View<int> error_flag("error_flag");
    Kokkos::deep_copy(error_flag, 0);

    // Create a Kokkos::View for a component counter
    Kokkos::View<size_t> component_counter("component_counter");
    Kokkos::deep_copy(component_counter, 0);

    // Create the check functor
    CheckVectorMapAddressesFunctor check_func(field, error_flag, component_counter);

    // Loop over each entity and check the Eigen map addresses
    ForEachNode(check_func, *m_mesh_data, selector);

    // Copy the error flag back to the host
    int error_flag_host;
    Kokkos::deep_copy(error_flag_host, error_flag);

    // Copy the component counter back to the host
    size_t component_counter_host;
    Kokkos::deep_copy(component_counter_host, component_counter);

    // Check for errors
    if (error_flag_host) {
        FAIL() << "CheckVectorMapAddressesFunctor detected mismatched addresses.";
    }

    // Check that the component counter is correct
    size_t expected_num_components = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1) * 3;
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    EXPECT_GT(component_counter_host, 0);
    if (num_procs == 1) {
        EXPECT_EQ(component_counter_host, expected_num_components);
    }
}

template <size_t Rows, size_t Columns>
struct CheckMatrixMapAddressesFunctor {
    CheckMatrixMapAddressesFunctor(aperi::Field<double> &field, Kokkos::View<int> error_flag)
        : m_field(field), m_error_flag(error_flag) {}

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Get number of components
        size_t num_components = m_field.GetNumComponentsPerEntity(index);
        if (num_components != Rows * Columns) {
            printf("Error: num_components does not match Rows * Columns\n");
            Kokkos::atomic_fetch_or(&m_error_flag(), 1);
        }

        // Get Eigen map to data
        auto eigen_map = m_field.GetEigenMatrixMap<Rows, Columns>(index);

        // Get a const Eigen map to data
        auto const_eigen_map = m_field.GetConstEigenMatrixMap<Rows, Columns>(index);

        // Check that the Eigen map points to the same memory as the raw pointer
        // The Eigen map is row major and m_field is column major
        for (size_t i = 0; i < Rows; i++) {
            for (size_t j = 0; j < Columns; j++) {
                if (&eigen_map.coeff(i, j) != &m_field(index, i * Columns + j)) {
                    // Set the error flag, atomic operation
                    Kokkos::atomic_fetch_or(&m_error_flag(), 1);
                    // Get the bucket id and ordinal
                    unsigned bucket_id = index.bucket_id();
                    unsigned bucket_ordinal = index.bucket_ord();
                    printf("Error: eigen_map and raw pointer for index %u, %u do not match at (%u, %u)\n", bucket_id, bucket_ordinal, static_cast<unsigned>(i), static_cast<unsigned>(j));
                    printf(
                        "Eigen Addresses:   %p\n"
                        "m_field Addresses: %p\n",
                        static_cast<const void *>(&eigen_map.coeff(i, j)), static_cast<const void *>(&m_field(index, i * Columns + j)));
                }
                if (&const_eigen_map.coeff(i, j) != &m_field(index, i * Columns + j)) {
                    // Set the error flag, atomic operation
                    Kokkos::atomic_fetch_or(&m_error_flag(), 1);
                    // Get the bucket id and ordinal
                    unsigned bucket_id = index.bucket_id();
                    unsigned bucket_ordinal = index.bucket_ord();
                    printf("Error: const_eigen_map and raw pointer for index %u, %u do not match at (%u, %u)\n", bucket_id, bucket_ordinal, static_cast<unsigned>(i), static_cast<unsigned>(j));
                    printf(
                        "Eigen Addresses:   %p\n"
                        "m_field Addresses: %p\n",
                        static_cast<const void *>(&const_eigen_map.coeff(i, j)), static_cast<const void *>(&m_field(index, i * Columns + j)));
                }
            }
        }
    }

    aperi::Field<double> m_field;
    Kokkos::View<int> m_error_flag;
};

TEST_F(FieldTestFixture, CheckMatrixMapAddresses) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    // Ensure that the mesh data is initialized
    ASSERT_TRUE(m_mesh_data != nullptr);

    // Get the selector, universal part
    std::vector<std::string> sets = {};
    aperi::Selector selector = aperi::Selector(sets, m_mesh_data.get());

    // Get the nodal field
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    // Create a Kokkos::View to store the error flag
    Kokkos::View<int> error_flag("error_flag");
    Kokkos::deep_copy(error_flag, 0);

    // Create the check functor
    CheckMatrixMapAddressesFunctor<3, 3> check_func(field, error_flag);

    // Loop over each entity and check the Eigen map addresses
    ForEachElement(check_func, *m_mesh_data, selector);

    // Copy the error flag back to the host
    int error_flag_host;
    Kokkos::deep_copy(error_flag_host, error_flag);

    // Check for errors
    if (error_flag_host) {
        FAIL() << "CheckMatrixMapAddressesFunctor detected mismatched addresses.";
    }
}

// Create a functor to verify the results
struct AXPBYZ_TestVerifyFunctor {
    AXPBYZ_TestVerifyFunctor(aperi::Field<double> &x, aperi::Field<double> &y, aperi::Field<double> &z,
                             double a, double b, Kokkos::View<int> error_flag)
        : m_x(x), m_y(y), m_z(z), m_a(a), m_b(b), m_error_flag(error_flag) {}

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // For each component
        for (int i = 0; i < 3; i++) {
            // Compute expected value
            double expected = m_a * m_x(index, i) + m_b * m_y(index, i);

            // Check if the actual value matches the expected value
            if (Kokkos::abs(m_z(index, i) - expected) > 1.0e-10) {
                // Set error flag
                Kokkos::atomic_fetch_or(&m_error_flag(), 1);
                printf("Error at node (%u, %u) component %d: Expected %f, got %f\n",
                       index.bucket_id(), index.bucket_ord(), i, expected, m_z(index, i));
            }
        }
    }

    aperi::Field<double> m_x;
    aperi::Field<double> m_y;
    aperi::Field<double> m_z;
    double m_a;
    double m_b;
    Kokkos::View<int> m_error_flag;
};

// Test AXPBYZField
TEST_F(FieldTestFixture, AXPBYZFields) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    // Create field query data for the three fields
    aperi::FieldQueryData<double> x_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::FieldQueryData<double> y_query_data{"nodal_field", aperi::FieldQueryState::N};
    aperi::FieldQueryData<double> z_query_data{"nodal_field_2", aperi::FieldQueryState::None};

    // Create the fields
    aperi::Field<double> x_field(m_mesh_data, x_query_data);
    aperi::Field<double> y_field(m_mesh_data, y_query_data);
    aperi::Field<double> z_field(m_mesh_data, z_query_data);

    // Randomize the x and y fields
    double min = 1.0;
    double max = 2.0;
    size_t seed_x = 42;
    size_t seed_y = 43;

    m_node_processor->RandomizeField(0, min, max, seed_x);  // x field (NP1)
    m_node_processor->RandomizeField(1, min, max, seed_y);  // y field (N)

    // Constants for the operation z = ax + by
    double a = 2.5;
    double b = -1.5;

    // Perform the operation with the AXPBYZField utility
    aperi::AXPBYZField(a, x_field, b, y_field, z_field);

    // Verify the result by manually computing z = ax + by for each node
    std::vector<std::string> sets = {};
    aperi::Selector selector = aperi::Selector(sets, m_mesh_data.get());

    // Create a Kokkos::View to store the error flag
    Kokkos::View<int> error_flag("error_flag");
    Kokkos::deep_copy(error_flag, 0);

    // Create the verify functor
    AXPBYZ_TestVerifyFunctor verify_func(x_field, y_field, z_field, a, b, error_flag);

    // Loop over each node and verify the results
    ForEachNode(verify_func, *m_mesh_data, selector);

    // Copy the error flag back to the host
    int error_flag_host;
    Kokkos::deep_copy(error_flag_host, error_flag);

    // Check for errors
    EXPECT_EQ(error_flag_host, 0) << "AXPBYZ_VerifyFunctor detected errors in AXPBYZField computation.";
}

// Test Dot method
TEST_F(FieldTestFixture, DotFields) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    // Create field query data for the three fields
    aperi::FieldQueryData<double> x_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::FieldQueryData<double> y_query_data{"nodal_field", aperi::FieldQueryState::N};

    // Create the fields
    aperi::Field<double> x_field(m_mesh_data, x_query_data);
    aperi::Field<double> y_field(m_mesh_data, y_query_data);

    // Randomize the x and y fields
    double min = 1.0;
    double max = 2.0;
    size_t seed_x = 42;
    size_t seed_y = 43;

    m_node_processor->RandomizeField(0, min, max, seed_x);  // x field (NP1)
    m_node_processor->RandomizeField(1, min, max, seed_y);  // y field (N)

    // Get the selector, universal part
    std::vector<std::string> sets = {};
    aperi::Selector selector = aperi::Selector(sets, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

    // Perform the operation with the Dot utility
    double dot_product = aperi::Dot(x_field, y_field, selector, aperi::FieldDataTopologyRank::NODE);

    // Verify the result by manually computing the dot product
    std::string field_name = "nodal_field";
    Eigen::MatrixXd x_values = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, sets, field_name, aperi::FieldQueryState::NP1, true);
    Eigen::MatrixXd y_values = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, sets, field_name, aperi::FieldQueryState::N, true);
    double local_expected_dot_product = (x_values.array() * y_values.array()).sum();
    double expected_dot_product = 0.0;
    MPI_Allreduce(&local_expected_dot_product, &expected_dot_product, 1, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

    // Check if the computed dot product matches the expected value
    EXPECT_NEAR(dot_product, expected_dot_product, 1.0e-10) << "Dot product verification failed.";
}

// Test Norm method
TEST_F(FieldTestFixture, NormField) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    // Create field query data for the three fields
    aperi::FieldQueryData<double> x_query_data{"nodal_field", aperi::FieldQueryState::NP1};

    // Create the fields
    aperi::Field<double> x_field(m_mesh_data, x_query_data);

    // Randomize the x and y fields
    double min = 1.0;
    double max = 2.0;
    size_t seed_x = 42;

    m_node_processor->RandomizeField(0, min, max, seed_x);  // x field (NP1)

    // Get the selector, universal part
    std::vector<std::string> sets = {};
    aperi::Selector selector = aperi::Selector(sets, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

    // Perform the operation with the norm utility
    double norm = aperi::Norm(x_field, selector, aperi::FieldDataTopologyRank::NODE);

    // Verify the result by manually computing the dot product
    std::string field_name = "nodal_field";
    Eigen::MatrixXd x_values = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, sets, field_name, aperi::FieldQueryState::NP1, true);
    double local_expected_dot_product = (x_values.array() * x_values.array()).sum();
    double expected_dot_product = 0.0;
    MPI_Allreduce(&local_expected_dot_product, &expected_dot_product, 1, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

    // Check if the computed norm matches the expected value
    double expected_norm = std::sqrt(expected_dot_product);
    EXPECT_NEAR(norm, expected_norm, 1.0e-10) << "Norm verification failed.";
}
