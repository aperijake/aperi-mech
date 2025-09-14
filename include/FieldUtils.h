#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stk_mesh/base/NgpFieldBLAS.hpp>
#include <stk_mesh/base/NgpReductions.hpp>
#include <vector>

#include "Field.h"
#include "ForEachEntity.h"
#include "MeshData.h"
#include "Selector.h"
#include "Types.h"

namespace aperi {

/**
 * @brief Compute the average of a field (e.g., coordinates or displacement) over the nodes of an element.
 * @param ngp_mesh The mesh data.
 * @param field The field to average (must support GetEigenVectorMap).
 * @param connected_nodes The indices of the nodes connected to the element.
 * @param num_nodes The number of connected nodes.
 * @tparam dim The spatial dimension (e.g., 3).
 * @return Eigen::Vector<T, 3> The average vector.
 */
template <typename FieldType, typename T, size_t dim>
KOKKOS_INLINE_FUNCTION
    Eigen::Vector<T, dim>
    AverageFieldOverElementNodes(const NgpMeshData &ngp_mesh, const FieldType &field, const Kokkos::Array<aperi::Index, aperi::MAX_ELEMENT_NUM_NODES> &connected_nodes, size_t num_nodes) {
    Eigen::Vector<T, dim> avg = Eigen::Vector<T, dim>::Zero();
    for (size_t i = 0; i < num_nodes; ++i) {
        avg += field.GetEigenVectorMap(connected_nodes[i], dim);
    }
    avg /= static_cast<T>(num_nodes);
    return avg;
}

/**
 * @brief Compute the average of a field (e.g., coordinates or displacement) over the nodes of an element.
 * @param ngp_mesh The mesh data.
 * @param field The field to average (must support GetEigenVectorMap).
 * @param element_index The index of the element.
 * @tparam dim The spatial dimension (e.g., 3).
 * @return Eigen::Vector<T, 3> The average vector.
 */
template <typename FieldType, typename T, size_t dim>
KOKKOS_INLINE_FUNCTION
    Eigen::Vector<T, dim>
    AverageFieldOverElementNodes(const NgpMeshData &ngp_mesh, const FieldType &field, aperi::Index element_index) {
    size_t num_nodes;
    Kokkos::Array<aperi::Index, aperi::MAX_ELEMENT_NUM_NODES> connected_nodes = ngp_mesh.GetElementNodeIndices<aperi::MAX_ELEMENT_NUM_NODES>(element_index, num_nodes);
    KOKKOS_ASSERT(num_nodes > 0 && num_nodes <= aperi::MAX_ELEMENT_NUM_NODES);
    return AverageFieldOverElementNodes<FieldType, T, dim>(ngp_mesh, field, connected_nodes, num_nodes);
}

/**
 * @brief Copy a field from one field to another.
 * @param src The source field.
 * @param dest The destination field.
 * @param selector The selector for the field.
 */
template <typename T>
void CopyField(const Field<T> &src, Field<T> &dest, const aperi::Selector &selector) {
    stk::mesh::field_copy(*src.GetField(), *dest.GetField(), selector(), stk::ngp::ExecSpace());
}

/**
 * @brief Copy a field from one field to another.
 * @param src The source field.
 * @param dest The destination field.
 * @param sets The sets used to get the selector.
 */
template <typename T>
void CopyField(const Field<T> &src, Field<T> &dest, std::vector<std::string> sets = {}) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = src.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Copy the field
    CopyField(src, dest, selector);
}

/**
 * @brief Compute z = ax + by for fields.
 * @param a The scalar a.
 * @param x The field x.
 * @param b The scalar b.
 * @param y The field y.
 * @param z The field z.
 * @param selector The selector for the field.
 */
template <typename T>
void AXPBYZField(const T &a, const Field<T> &x, const T &b, const Field<T> &y, Field<T> &z, const aperi::Selector &selector) {
    // Fields cannot be the same
    assert(x != y && x != z && y != z);
    // Get the bulk data
    const stk::mesh::BulkData &bulk_data = *x.GetMeshData()->GetBulkData();
    stk::mesh::field_axpbyz(bulk_data, a, *x.GetField(), b, *y.GetField(), *z.GetField(), selector(), stk::ngp::ExecSpace());
}

/**
 * @brief Compute z = ax + by for fields.
 * @param a The scalar a.
 * @param x The field x.
 * @param b The scalar b.
 * @param y The field y.
 * @param z The field z.
 * @param sets The sets used to get the selector.
 */
template <typename T>
void AXPBYZField(const T &a, const Field<T> &x, const T &b, const Field<T> &y, Field<T> &z, std::vector<std::string> sets = {}) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = x.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Compute the field
    AXPBYZField(a, x, b, y, z, selector);
}

/**
 * @brief Swap the values of two fields.
 * @param x The field x.
 * @param y The field y.
 */
template <typename T>
void SwapFields(const Field<T> &x, const Field<T> &y) {
    // Get the bulk data
    const stk::mesh::BulkData &bulk_data = *x.GetMeshData()->GetBulkData();
    stk::mesh::field_swap(bulk_data, *x.GetField(), *y.GetField(), stk::ngp::ExecSpace());
}

template <typename T>
struct AddValueFunctor {
    double m_value;           // The value to add
    aperi::Field<T> m_field;  // The field to add the value to

    // Constructor to initialize the value and field
    AddValueFunctor(double value, const aperi::Field<T> &field)
        : m_value(value), m_field(field) {}

    // Kokkos functor to add the value to the field
    KOKKOS_FUNCTION void operator()(const aperi::Index &index) const {
        // Get the number of components in the field
        const size_t num_components = m_field.GetNumComponentsPerEntity(index);

        // Add the value to the field
        for (size_t i = 0; i < num_components; ++i) {
            m_field(index, i) += m_value;
        }
    }
};

/**
 * @brief Add the value to the field.
 * @tparam T The type of the field.
 * @param field The field to add the value to.
 * @param value The value to add to the field.
 * @param selector The selector for the field.
 * @return None.
 */
template <typename T>
void AddValue(const Field<T> &field, const double &value, const aperi::Selector &selector) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();
    // Create the functor
    AddValueFunctor<T> add_value_functor(value, field);
    // Loop over the nodes and add the value
    ForEachNode(add_value_functor, *mesh_data, selector);
}

/**
 * @brief Add the value to the field.
 * @tparam T The type of the field.
 * @param field The field to add the value to.
 * @param value The value to add to the field.
 * @param sets The sets used to get the selector.
 * @return None.
 */
template <typename T>
void AddValue(const Field<T> &field, const double &value, const std::vector<std::string> &sets) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Create the functor
    AddValueFunctor<T> add_value_functor(value, field);

    // Loop over the nodes and add the value
    ForEachNode(add_value_functor, *mesh_data, selector);
}

/**
 * @brief Functor for computing the dot product of two fields in a reduction.
 * @tparam T The type of the field (e.g., double).
 */
template <typename T>
struct DotProductFunctor {
    stk::mesh::NgpField<T> field0, field1;

    DotProductFunctor(stk::mesh::NgpField<T> f0, stk::mesh::NgpField<T> f1) : field0(f0), field1(f1) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(const stk::mesh::FastMeshIndex &entity, T &update) const {
        T local_dot_product = 0.0;
        const size_t num_components = field0.get_num_components_per_entity(entity);
        KOKKOS_ASSERT(num_components == field1.get_num_components_per_entity(entity));
        for (size_t i = 0; i < num_components; ++i) {
            local_dot_product += field0(entity, i) * field1(entity, i);
        }
        update += local_dot_product;  // Accumulate into the reduction
    }
};

/**
 * @brief Compute the dot product of two fields
 * @param field_0 The first field.
 * @param field_1 The second field.
 * @param selector The selector defining the subset of entities to include in the dot product.
 * @param Rank The topology rank of the entities to consider (e.g., NODE, ELEMENT).
 * @tparam T The type of the field (e.g., double).
 * @return The dot product of the two fields over the selected entities.
 */
template <typename T>
T Dot(const Field<T> &field_0, const Field<T> &field_1, const aperi::Selector &selector, const aperi::FieldDataTopologyRank &rank) {
    std::shared_ptr<aperi::MeshData> mesh_data = field_0.GetMeshData();
    stk::mesh::BulkData *bulk_data = mesh_data->GetBulkData();
    stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*bulk_data);

    // Use STK's for_each_entity_reduce with a Sum reduction
    stk::mesh::NgpField<T> stk_field_0 = field_0.GetNgpField();
    stk::mesh::NgpField<T> stk_field_1 = field_1.GetNgpField();
    T local_sum = 0.0;
    Kokkos::Sum<T> sum_reduction(local_sum);
    stk::topology::rank_t stk_rank = aperi::GetTopologyRank(rank);
    stk::mesh::for_each_entity_reduce(ngp_mesh, stk_rank, selector(), sum_reduction, DotProductFunctor<T>(stk_field_0, stk_field_1));

    // Perform MPI all-reduce for global sum across processors
    T global_dot_product = 0.0;
    stk::all_reduce_sum(bulk_data->parallel(), &local_sum, &global_dot_product, 1);

    return global_dot_product;
}

template <typename T>
struct lPFunctor {
    stk::mesh::NgpField<T> field;
    double power;

    lPFunctor(stk::mesh::NgpField<T> f, double p) : field(f), power(p) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(const stk::mesh::FastMeshIndex &entity, T &update) const {
        T local_sum = 0.0;
        const size_t num_components = field.get_num_components_per_entity(entity);
        for (size_t i = 0; i < num_components; ++i) {
            local_sum += Kokkos::pow(field(entity, i), power);
        }
        update += local_sum;  // Accumulate into the reduction
    }
};

/**
 * @brief Compute the lp norm of a field
 * @param field The field.
 * @param selector The selector defining the subset of entities to include in the norm computation.
 * @param Rank The topology rank of the entities to consider (e.g., NODE, ELEMENT).
 * @param p The order of the norm.
 * @tparam T The type of the field (e.g., double).
 * @return The lp norm of the field over the selected entities.
 */
template <typename T>
T lPNorm(const Field<T> &field, const aperi::Selector &selector, const aperi::FieldDataTopologyRank &rank, double p = 2.0) {
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();
    stk::mesh::BulkData *bulk_data = mesh_data->GetBulkData();
    stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*bulk_data);

    // Use STK's for_each_entity_reduce with a Sum reduction
    stk::mesh::NgpField<T> stk_field = field.GetNgpField();
    T local_sum = 0.0;
    Kokkos::Sum<T> sum_reduction(local_sum);
    stk::topology::rank_t stk_rank = aperi::GetTopologyRank(rank);
    stk::mesh::for_each_entity_reduce(ngp_mesh, stk_rank, selector(), sum_reduction, lPFunctor<T>(stk_field, p));

    // Perform MPI all-reduce for global sum across processors
    T global_sum = 0.0;
    stk::all_reduce_sum(bulk_data->parallel(), &local_sum, &global_sum, 1);

    return std::pow(global_sum, 1.0 / p);
}

/**
 * @brief Functor for computing the l2 norm (squared sum) of a field in a reduction.
 * @tparam T The type of the field (e.g., double).
 */
template <typename T>
struct l2NormSquaredFunctor {
    stk::mesh::NgpField<T> field;

    l2NormSquaredFunctor(stk::mesh::NgpField<T> f) : field(f) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(const stk::mesh::FastMeshIndex &entity, T &update) const {
        T local_sum = 0.0;
        const size_t num_components = field.get_num_components_per_entity(entity);
        for (size_t i = 0; i < num_components; ++i) {
            T val = field(entity, i);
            local_sum += val * val;  // Direct squaring for efficiency
        }
        update += local_sum;  // Accumulate into the reduction
    }
};

/**
 * @brief Compute the l2 norm of a field (specialized for p=2).
 * @param field The field.
 * @param selector The selector defining the subset of entities to include in the norm computation.
 * @param rank The topology rank of the entities to consider (e.g., NODE, ELEMENT).
 * @tparam T The type of the field (e.g., double).
 * @return The l2 norm of the field over the selected entities.
 */
template <typename T>
T l2Norm(const Field<T> &field, const aperi::Selector &selector, const aperi::FieldDataTopologyRank &rank) {
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();
    stk::mesh::BulkData *bulk_data = mesh_data->GetBulkData();
    stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*bulk_data);

    // Use STK's for_each_entity_reduce with a Sum reduction
    stk::mesh::NgpField<T> stk_field = field.GetNgpField();
    T local_sum = 0.0;
    Kokkos::Sum<T> sum_reduction(local_sum);
    stk::topology::rank_t stk_rank = aperi::GetTopologyRank(rank);
    stk::mesh::for_each_entity_reduce(ngp_mesh, stk_rank, selector(), sum_reduction, l2NormSquaredFunctor<T>(stk_field));

    // Perform MPI all-reduce for global sum across processors
    T global_sum = 0.0;
    stk::all_reduce_sum(bulk_data->parallel(), &local_sum, &global_sum, 1);

    return std::sqrt(global_sum);  // Take square root for the norm
}

}  // namespace aperi