#include "MassUtils.h"

#include <array>

#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldUtils.h"
#include "FunctionEvaluationProcessor.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "NgpMeshData.h"

namespace aperi {

struct ComputeMassFromElementVolumeKernel {
    ComputeMassFromElementVolumeKernel(const std::shared_ptr<aperi::MeshData> &mesh_data, double density) : m_density("density", 1),
                                                                                                            m_element_volume(mesh_data, FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}),
                                                                                                            m_node_mass_from_elements(mesh_data, FieldQueryData<double>{"mass_from_elements", FieldQueryState::None, FieldDataTopologyRank::NODE}) {
        // Initialize the density
        Kokkos::deep_copy(m_density, density);
    }

    KOKKOS_FUNCTION void operator()(const aperi::Index &elem_index, const Kokkos::Array<aperi::Index, HEX8_NUM_NODES> &nodes, size_t num_nodes) const {
        // Gather the element volume
        const double element_volume = m_element_volume(elem_index, 0);

        // Compute the mass of the element and scatter it to the nodes
        auto node_mass_from_elements = Eigen::Vector3d::Constant(element_volume * m_density(0) / num_nodes);
        for (size_t i = 0; i < num_nodes; ++i) {
            m_node_mass_from_elements.AtomicAdd(nodes[i], node_mass_from_elements);
        }
    }

   private:
    Kokkos::View<double *> m_density;                        // The density of the material
    aperi::Field<double> m_element_volume;                   // The gather kernel for the element volume
    mutable aperi::Field<double> m_node_mass_from_elements;  // The scatter kernel for the node mass from elements
};

bool CheckMassSumsAreEqual(double mass_1, double mass_2) {
    double tol = 1.0e-8 * mass_1;
    bool are_equal = std::abs(mass_1 - mass_2) <= tol;
    if (!are_equal) {
        Kokkos::printf("Error: Mass sums are not equal within tolerance: %f != %f, tol = %f\n", mass_1, mass_2, tol);
    }
    return are_equal;
}

void ComputeMassMatrixForPart(const std::shared_ptr<aperi::MeshData> &mesh_data, const std::string &part_name, double density) {
    // Initialize the mesh data and element node processor
    aperi::Selector selector({part_name}, mesh_data.get(), aperi::SelectorOwnership::OWNED);
    aperi::NgpMeshData ngp_mesh_data(mesh_data->GetUpdatedNgpMesh());

    // Define the action kernel
    ComputeMassFromElementVolumeKernel action_kernel(mesh_data, density);

    // Call the for_each_element_and_node function
    ngp_mesh_data.ForEachElementAndConnectedNodes<HEX8_NUM_NODES>(action_kernel, selector);

    // Mark the mass_from_elements field as modified
    std::string mass_from_elements_name = "mass_from_elements";
    aperi::Field mass_from_elements = aperi::Field(mesh_data, FieldQueryData<double>{mass_from_elements_name, FieldQueryState::None, FieldDataTopologyRank::NODE});
    mass_from_elements.MarkModifiedOnDevice();
}

// Compute the diagonal mass matrix
double FinishComputingMassMatrix(const std::shared_ptr<aperi::MeshData> &mesh_data, bool uses_generalized_fields) {
    // Sum the mass at the nodes
    std::string mass_from_elements_name = "mass_from_elements";
    std::string mass_name = "mass";
    aperi::Field mass_from_elements = aperi::Field(mesh_data, FieldQueryData<double>{mass_from_elements_name, FieldQueryState::None, FieldDataTopologyRank::NODE});
    aperi::Field mass = aperi::Field(mesh_data, FieldQueryData<double>{mass_name, FieldQueryState::None, FieldDataTopologyRank::NODE});
    mass_from_elements.SyncDeviceToHost();
    mass_from_elements.ParallelSum();

    // Pass mass_from_elements through the approximation functions to get mass
    if (uses_generalized_fields) {
        std::array<aperi::FieldQueryData<double>, 1> src_field_query_data;
        src_field_query_data[0] = {mass_from_elements_name, FieldQueryState::None, FieldDataTopologyRank::NODE};

        std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data;
        dest_field_query_data[0] = {mass_name, FieldQueryState::None, FieldDataTopologyRank::NODE};

        std::shared_ptr<aperi::FunctionEvaluationProcessor<1>> value_from_generalized_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<1>>(src_field_query_data, dest_field_query_data, mesh_data);
        value_from_generalized_field_processor->ScatterValues();
        mass.MarkModifiedOnDevice();
        mass.ParallelSum();
    } else {
        aperi::CopyField(mass_from_elements, mass);
    }
    mass.MarkModifiedOnDevice();
    mass.SyncDeviceToHost();

    // Total mass after the mass from this element block is added
    double mass_sum_global = mass_from_elements.GetSumHost() / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
    KOKKOS_ASSERT(CheckMassSumsAreEqual(mass_sum_global, mass.GetSumHost() / 3.0));

    return mass_sum_global;
}

}  // namespace aperi