#include "MassUtils.h"

#include <array>

#include "Constants.h"
#include "ElementProcessor.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "ValueFromGeneralizedFieldProcessor.h"

namespace aperi {

// Functor for computing the volume of a node
template <size_t NumNodes>
struct ComputeNodeVolumeFunctor {
    KOKKOS_FUNCTION
    explicit ComputeNodeVolumeFunctor() = default;

    KOKKOS_INLINE_FUNCTION
    bool CheckNumNodes(size_t num_nodes) const {
        if (num_nodes != NumNodes) {
            Kokkos::printf("Error: ComputeElementVolumeFunctor requires %lu nodes, but %lu were provided.\n", NumNodes, num_nodes);
            return false;
        }
        return true;
    }

    // Compute the volume of en element and scatter it to the nodes
    KOKKOS_INLINE_FUNCTION
    void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 1> &field_data_to_gather, Eigen::Matrix<double, NumNodes, 3> &results_to_scatter, size_t num_nodes) const {
        KOKKOS_ASSERT(CheckNumNodes(num_nodes));
        double volume = TetVolume(field_data_to_gather[0]) / num_nodes;
        for (size_t i = 0; i < NumNodes; ++i) {
            results_to_scatter.row(i) = Eigen::Vector3d::Constant(volume);
        }
    }
};

// Functor for computing the volume of a node from precomputed element volumes
template <size_t MaxNumNodes>
struct ComputeNodeVolumeFromPrecomputedElementVolumesFunctor {
    KOKKOS_FUNCTION
    explicit ComputeNodeVolumeFromPrecomputedElementVolumesFunctor() = default;

    // Compute the volume of en element and scatter it to the nodes
    KOKKOS_INLINE_FUNCTION
    void operator()(const Kokkos::Array<Eigen::Matrix<double, 3, 3>, 0> & /*gathered_node_data_gradient*/, Eigen::Matrix<double, MaxNumNodes, 3> &node_volume, const Eigen::Matrix<double, MaxNumNodes, 3> & /*b_matrix*/, double element_volume, size_t num_nodes) const {
        for (size_t i = 0; i < num_nodes; ++i) {
            node_volume.row(i) = Eigen::Vector3d::Constant(element_volume / num_nodes);
        }
    }
};

// Functor for computing the mass of a node from the volume of the node
struct ComputeMassFunctor {
    KOKKOS_FUNCTION
    explicit ComputeMassFunctor(double density) : m_density(density) {}

    // Compute the mass
    KOKKOS_INLINE_FUNCTION
    void operator()(double *mass) const {
        *mass = *mass * m_density;  // Node volume is stored in the mass field
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

void ComputeNodeVolume(const std::shared_ptr<aperi::MeshData> &mesh_data, bool uses_generalized_fields) {
    FieldQueryData<double> field_query_data_scatter = {"mass_from_elements", FieldQueryState::None};  // Store the nodal volume temporarily in the mass field

    if (!uses_generalized_fields) {
        std::vector<FieldQueryData<double>> field_query_data_gather_vec = {FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None}};
        ElementGatherScatterProcessor<1> element_processor(field_query_data_gather_vec, field_query_data_scatter, mesh_data);
        // Create the mass functor
        ComputeNodeVolumeFunctor<4> compute_volume_functor;

        // Compute the mass of each element
        element_processor.for_each_element_gather_scatter_nodal_data<4>(compute_volume_functor);
    } else {
        std::vector<FieldQueryData<double>> field_query_data_gather_vec = {};
        ElementGatherScatterProcessor<0, true> element_processor(field_query_data_gather_vec, field_query_data_scatter, mesh_data);
        // Create the mass functor
        ComputeNodeVolumeFromPrecomputedElementVolumesFunctor<aperi::MAX_CELL_NUM_NODES> compute_volume_functor;

        // Compute the mass of each element
        element_processor.for_each_element_gather_scatter_nodal_data<aperi::MAX_CELL_NUM_NODES>(compute_volume_functor);
    }
}

void ComputeMassFromElements(const std::shared_ptr<aperi::MeshData> &mesh_data, double density) {
    std::string mass_from_elements_name = "mass_from_elements";
    std::array<FieldQueryData<double>, 1> field_query_data_gather_vec;
    field_query_data_gather_vec[0] = FieldQueryData<double>{mass_from_elements_name, FieldQueryState::None};

    NodeProcessor<1> node_mass_from_elements_processor(field_query_data_gather_vec, mesh_data);

    // Create the mass functor
    ComputeMassFunctor compute_mass_functor(density);

    // Compute the mass of each node
    node_mass_from_elements_processor.for_each_component(compute_mass_functor);
}

// Compute the diagonal mass matrix
double ComputeMassMatrix(const std::shared_ptr<aperi::MeshData> &mesh_data, const std::string &part_name, double density, bool uses_generalized_fields) {
    ComputeNodeVolume(mesh_data, uses_generalized_fields);
    ComputeMassFromElements(mesh_data, density);

    // Sum the mass at the nodes
    std::string mass_from_elements_name = "mass_from_elements";
    std::string mass_name = "mass";
    std::array<aperi::FieldQueryData<double>, 2> mass_field_query_data;
    mass_field_query_data[0] = {mass_from_elements_name, FieldQueryState::None};
    mass_field_query_data[1] = {mass_name, FieldQueryState::None};
    NodeProcessor<2> node_processor(mass_field_query_data, mesh_data);
    node_processor.MarkFieldModifiedOnDevice(0);
    node_processor.SyncFieldDeviceToHost(0);
    node_processor.ParallelSumFieldData(0);
    node_processor.MarkFieldModifiedOnHost(0);
    node_processor.SyncFieldHostToDevice(0);

    // Pass mass_from_elements through the approximation functions to get mass
    if (uses_generalized_fields) {
        std::array<aperi::FieldQueryData<double>, 1> src_field_query_data;
        src_field_query_data[0] = {mass_from_elements_name, FieldQueryState::None, FieldDataTopologyRank::NODE};

        std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data;
        dest_field_query_data[0] = {mass_name, FieldQueryState::None, FieldDataTopologyRank::NODE};

        std::shared_ptr<aperi::ValueFromGeneralizedFieldProcessor<1>> value_from_generalized_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<1>>(src_field_query_data, dest_field_query_data, mesh_data);
        value_from_generalized_field_processor->ScatterOwnedLocalValues();
        value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();
        node_processor.ParallelSumFieldData(1);
    } else {
        node_processor.CopyFieldData(0, 1);
    }
    node_processor.MarkFieldModifiedOnDevice(1);
    node_processor.SyncFieldDeviceToHost(1);

    // Parallel sum
    double mass_sum_global = node_processor.GetFieldSumHost(0) / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
    assert(CheckMassSumsAreEqual(mass_sum_global, node_processor.GetFieldSumHost(1) / 3.0));
    aperi::CoutP0() << "      " << part_name << ", Mass: " << mass_sum_global << std::endl;
    return mass_sum_global;
}

}  // namespace aperi
