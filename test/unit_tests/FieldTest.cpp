#include <gtest/gtest.h>
#include <mpi.h>

#include "AperiStkUtils.h"
#include "EntityProcessor.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldTestFixture.h"
#include "MeshData.h"

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
template <typename Operation>
struct TestFieldOperationsFunctor {
    TestFieldOperationsFunctor(aperi::Field<double> &field, const Eigen::Vector3d &data, Operation op)
        : m_field(field), m_data(data), m_op(op), m_result_device("result_device", 1), m_result(Kokkos::ViewAllocateWithoutInitializing("result")) {}

    KOKKOS_INLINE_FUNCTION void operator()(const int i) const {
        aperi::Index index(stk::mesh::FastMeshIndex{0, 0});
        m_op(m_field, index, m_data);
        m_result_device() = m_field.GetEigenMap<3, 1>(index);
    }

    Eigen::Vector3d GetHostResult() {
        Kokkos::deep_copy(m_result, m_result_device);
        return m_result();
    }

    mutable aperi::Field<double> m_field;
    Eigen::Vector3d m_data;
    Operation m_op;
    Kokkos::View<Eigen::Vector3d> m_result_device;
    Kokkos::View<Eigen::Vector3d>::HostMirror m_result;
};

// Test AtomicAdd method
struct AtomicAddOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        field.AtomicAdd(index, data);
    }
};

TEST_F(FieldTestFixture, AtomicAdd) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AtomicAddOperation> functor(field, data, AtomicAddOperation());
    Kokkos::parallel_for("AtomicAdd", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test Add method
struct AddOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        field.Add(index, data);
    }
};

TEST_F(FieldTestFixture, Add) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AddOperation> functor(field, data, AddOperation());
    Kokkos::parallel_for("Add", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test AtomicAssign method
struct AtomicAssignOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        field.AtomicAssign(index, data);
    }
};

TEST_F(FieldTestFixture, AtomicAssign) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AtomicAssignOperation> functor(field, data, AtomicAssignOperation());
    Kokkos::parallel_for("AtomicAssign", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test Assign method
struct AssignOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        field.Assign(index, data);
    }
};

TEST_F(FieldTestFixture, Assign) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<AssignOperation> functor(field, data, AssignOperation());
    Kokkos::parallel_for("Assign", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test data method
struct DataOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        double *p_data_ptr = field.data(index);
        KOKKOS_ASSERT(p_data_ptr != nullptr);

        unsigned stride = field.GetStride();

        p_data_ptr[0] = data(0);
        p_data_ptr[stride] = data(1);
        p_data_ptr[2 * stride] = data(2);
    }
};

TEST_F(FieldTestFixture, DataMethod) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<DataOperation> functor(field, data, DataOperation());
    Kokkos::parallel_for("Data", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test operator() method
struct OperatorOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        field(index, 0) = data(0);
        field(index, 1) = data(1);
        field(index, 2) = data(2);
    }
};

TEST_F(FieldTestFixture, OperatorMethod) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<OperatorOperation> functor(field, data, OperatorOperation());
    Kokkos::parallel_for("Operator", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}

// Test GetEigenMap method
struct GetEigenMapOperation {
    KOKKOS_INLINE_FUNCTION void operator()(aperi::Field<double> &field, const aperi::Index &index, const Eigen::Vector3d &data) const {
        auto eigen_map = field.GetEigenMap<3, 1>(index);
        eigen_map(0, 0) = data(0);
        eigen_map(1, 0) = data(1);
        eigen_map(2, 0) = data(2);
    }
};

TEST_F(FieldTestFixture, GetEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    TestFieldOperationsFunctor<GetEigenMapOperation> functor(field, data, GetEigenMapOperation());
    Kokkos::parallel_for("GetEigenMap", 1, functor);

    Eigen::Vector3d result = functor.GetHostResult();
    EXPECT_EQ(result, data);
}