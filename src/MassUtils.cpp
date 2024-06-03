#include "MassUtils.h"

#include <array>

#include "ElementProcessor.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"

namespace aperi {

// Functor for computing the mass of an element
// TODO(jake): this is hard-coded for 4-node tetrahedra
template <size_t NumNodes>
struct ComputeMassFunctor {
    KOKKOS_FUNCTION
    ComputeMassFunctor(double density) : m_density(density) {}

    KOKKOS_INLINE_FUNCTION
    bool CheckNumNodes(size_t num_nodes) const {
        if (num_nodes != NumNodes) {
            Kokkos::printf("Error: ComputeMassFunctor requires %lu nodes, but %lu were provided.\n", NumNodes, num_nodes);
            return false;
        }
        return true;
    }

    // Compute the mass of en element and scatter it to the nodes
    KOKKOS_INLINE_FUNCTION
    void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 1> &field_data_to_gather, Eigen::Matrix<double, NumNodes, 3> &results_to_scatter, size_t num_nodes) const {
        KOKKOS_ASSERT(CheckNumNodes(num_nodes));
        double mass = m_density * TetVolume(field_data_to_gather[0]) / NumNodes;
        for (size_t i = 0; i < NumNodes; ++i) {
            results_to_scatter.row(i) = Eigen::Vector3d::Constant(mass);
        }
    }

    private:
      double m_density;
};

bool CheckMassSumsAreEqual(double mass_1, double mass_2) {
    double tol = 1.0e-10 * mass_1;
    if (std::abs(mass_1 - mass_2) > tol) {
        Kokkos::printf("Error: Mass sums are not equal: %f != %f\n", mass_1, mass_2);
        return false;
    }
    return true;
}

// Compute the diagonal mass matrix
double ComputeMassMatrix(const std::shared_ptr<aperi::MeshData> &mesh_data, const std::string &part_name, double density) {
    std::array<FieldQueryData, 1> field_query_data_gather_vec = {FieldQueryData{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None}};
    std::string mass_from_elements_name = "mass_from_elements";
    std::string mass_name = "mass";
    FieldQueryData field_query_data_scatter = {mass_from_elements_name, FieldQueryState::None};

    ElementGatherScatterProcessor<1> element_processor(field_query_data_gather_vec, field_query_data_scatter, mesh_data);

    // Create the mass functor on device
    size_t compute_mass_functor_size = sizeof(ComputeMassFunctor<4>);
    auto compute_mass_functor = (ComputeMassFunctor<4> *)Kokkos::kokkos_malloc(compute_mass_functor_size);
    assert(compute_mass_functor != nullptr);
    Kokkos::parallel_for("CreateComputeMassFunctor", 1, KOKKOS_LAMBDA(const int &) {
        new ((ComputeMassFunctor<4>*)compute_mass_functor) ComputeMassFunctor<4>(density);
    });
    Kokkos::fence();

    // Compute the mass of each element
    element_processor.for_each_element_gather_scatter_nodal_data<4>(*compute_mass_functor);
    Kokkos::fence();

    // Destroy the mass functor
    Kokkos::parallel_for(
        "DestroyComputeMassFunctor", 1, KOKKOS_LAMBDA(const int &) {
            compute_mass_functor->~ComputeMassFunctor();
        });
    Kokkos::kokkos_free(compute_mass_functor);

    // Pass mass_from_elements through the approximation functions to get mass
    std::array<aperi::FieldQueryData, 1> src_field_query_data;
    src_field_query_data[0] = {mass_from_elements_name, FieldQueryState::None};

    std::array<aperi::FieldQueryData, 1> dest_field_query_data;
    dest_field_query_data[0] = {mass_name, FieldQueryState::None};

    std::shared_ptr<aperi::ValueFromGeneralizedFieldProcessor<1>> value_from_generalized_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<1>>(src_field_query_data, dest_field_query_data, mesh_data);
    value_from_generalized_field_processor->compute_value_from_generalized_field();
    value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();

    // Sum the mass at the nodes
    std::array<aperi::FieldQueryData, 2> mass_field_query_data;
    mass_field_query_data[0] = {mass_name, FieldQueryState::None};
    mass_field_query_data[1] = {mass_from_elements_name, FieldQueryState::None};
    NodeProcessor<2> node_processor(mass_field_query_data, mesh_data);
    node_processor.MarkAllFieldsModifiedOnDevice();
    node_processor.SyncAllFieldsDeviceToHost();
    node_processor.ParallelSumAllFieldData();

    // Parallel sum
    double mass_sum_global = node_processor.GetFieldSumHost(0) / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
    assert(CheckMassSumsAreEqual(mass_sum_global, node_processor.GetFieldSumHost(1) / 3.0));
    aperi::CoutP0() << "Total Mass for Part " << part_name << ": " << mass_sum_global << std::endl;
    return mass_sum_global;
}

}  // namespace aperi
