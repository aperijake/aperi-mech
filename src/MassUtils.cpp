#include "MassUtils.h"

#include <array>
#include <stk_mesh/base/NgpMesh.hpp>

#include "Constants.h"
#include "ElementNodeProcessor.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "ValueFromGeneralizedFieldProcessor.h"

namespace aperi {

struct ComputeMassFromElementVolumeKernel {
    ComputeMassFromElementVolumeKernel(const aperi::MeshData &mesh_data, double density) : m_density("density", 1),
                                                                                           m_element_volume_gather_kernel(mesh_data, FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}),
                                                                                           m_node_mass_from_elements_scatter_kernel(mesh_data, FieldQueryData<double>{"mass_from_elements", FieldQueryState::None, FieldDataTopologyRank::NODE}) {
        // Initialize the density
        Kokkos::deep_copy(m_density, density);
    }

    KOKKOS_FUNCTION void operator()(const stk::mesh::FastMeshIndex &elem_index, const Kokkos::Array<stk::mesh::FastMeshIndex, HEX8_NUM_NODES> &nodes, size_t num_nodes) const {
        // Gather the element volume
        Eigen::Vector<double, 1> element_volume;
        m_element_volume_gather_kernel(elem_index, element_volume);

        // Compute the mass of the element and scatter it to the nodes
        auto node_mass_from_elements = Eigen::Vector3d::Constant(element_volume(0) * m_density(0) / num_nodes);
        for (size_t i = 0; i < num_nodes; ++i) {
            m_node_mass_from_elements_scatter_kernel.AtomicAdd(nodes[i], node_mass_from_elements);
        }
    }

   private:
    Kokkos::View<double *> m_density;                                   // The density of the material
    GatherKernel<double, 1> m_element_volume_gather_kernel;             // The gather kernel for the element volume
    ScatterKernel<double, 3> m_node_mass_from_elements_scatter_kernel;  // The scatter kernel for the node mass from elements
};

bool CheckMassSumsAreEqual(double mass_1, double mass_2) {
    double tol = 1.0e-10 * mass_1;
    bool are_equal = std::abs(mass_1 - mass_2) <= tol;
    if (!are_equal) {
        Kokkos::printf("Error: Mass sums are not equal: %f != %f\n", mass_1, mass_2);
    }
    return are_equal;
}

void ComputeMassMatrixForPart(const std::shared_ptr<aperi::MeshData> &mesh_data, const std::string &part_name, double density) {
    // Initialize the mesh data and element node processor
    aperi::ElementNodeProcessor processor(mesh_data, {part_name});

    // Define the action kernel
    ComputeMassFromElementVolumeKernel action_kernel(*mesh_data, density);

    // Call the for_each_element_and_node function
    processor.for_each_element_and_nodes(action_kernel);
}

// Compute the diagonal mass matrix
double FinishComputingMassMatrix(const std::shared_ptr<aperi::MeshData> &mesh_data, bool uses_generalized_fields) {
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

        // Sync the mass field back to the device
        node_processor.MarkFieldModifiedOnHost(1);
        node_processor.SyncFieldHostToDevice(1);
    } else {
        node_processor.CopyFieldData(0, 1);
        node_processor.MarkFieldModifiedOnDevice(1);
        node_processor.SyncFieldDeviceToHost(1);
    }

    // Total mass after the mass from this element block is added
    double mass_sum_global = node_processor.GetFieldSumHost(0) / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
    assert(CheckMassSumsAreEqual(mass_sum_global, node_processor.GetFieldSumHost(1) / 3.0));

    return mass_sum_global;
}

}  // namespace aperi
