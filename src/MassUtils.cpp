#include "MassUtils.h"

#include <array>

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

        // Initialize the ngp mesh object
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*mesh_data.GetBulkData());
    }

    KOKKOS_FUNCTION void operator()(const stk::mesh::FastMeshIndex &elem_index, const stk::mesh::NgpMesh::ConnectedNodes &nodes, size_t num_nodes) const {
        // Gather the element volume
        Eigen::Vector<double, 1> element_volume;
        m_element_volume_gather_kernel(elem_index, element_volume);

        // Compute the mass of the element and scatter it to the nodes
        auto node_mass_from_elements = Eigen::Vector3d::Constant(element_volume(0) * m_density(0) / num_nodes);
        for (size_t i = 0; i < num_nodes; ++i) {
            stk::mesh::FastMeshIndex node_index = m_ngp_mesh.fast_mesh_index(nodes[i]);
            m_node_mass_from_elements_scatter_kernel.AtomicAdd(node_index, node_mass_from_elements);
        }
    }

   private:
    Kokkos::View<double *> m_density;                                   // The density of the material
    GatherKernel<double, 1> m_element_volume_gather_kernel;             // The gather kernel for the element volume
    ScatterKernel<double, 3> m_node_mass_from_elements_scatter_kernel;  // The scatter kernel for the node mass from elements
    stk::mesh::NgpMesh m_ngp_mesh;                                      // The ngp mesh object
};

bool CheckMassSumsAreEqual(double mass_1, double mass_2) {
    double tol = 1.0e-10 * mass_1;
    if (std::abs(mass_1 - mass_2) > tol) {
        Kokkos::printf("Error: Mass sums are not equal: %f != %f\n", mass_1, mass_2);
        return false;
    }
    return true;
}

void ComputeNodeMass(const std::shared_ptr<aperi::MeshData> &mesh_data, const std::string &part_name, double density, bool uses_generalized_fields) {
    // Initialize the mesh data and element node processor
    aperi::ElementNodeProcessor processor(mesh_data, {part_name});

    // Define the action kernel
    ComputeMassFromElementVolumeKernel action_kernel(*mesh_data, density);

    // Call the for_each_element_and_node function
    processor.for_each_element_and_nodes(action_kernel);
}

// Compute the diagonal mass matrix
double ComputeMassMatrixForPart(const std::shared_ptr<aperi::MeshData> &mesh_data, const std::string &part_name, double density, bool uses_generalized_fields) {
    ComputeNodeMass(mesh_data, part_name, density, uses_generalized_fields);

    // Sum the mass at the nodes
    std::string mass_from_elements_name = "mass_from_elements";
    std::string mass_name = "mass";
    std::array<aperi::FieldQueryData<double>, 2> mass_field_query_data;
    mass_field_query_data[0] = {mass_from_elements_name, FieldQueryState::None};
    mass_field_query_data[1] = {mass_name, FieldQueryState::None};
    NodeProcessor<2> node_processor(mass_field_query_data, mesh_data, {part_name});
    node_processor.MarkFieldModifiedOnDevice(0);
    node_processor.SyncFieldDeviceToHost(0);
    node_processor.ParallelSumFieldData(0);
    node_processor.MarkFieldModifiedOnHost(0);
    node_processor.SyncFieldHostToDevice(0);

    // Existing mass before the mass from this element block is added
    double existing_mass = node_processor.GetFieldSumHost(1) / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs

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

    // Total mass after the mass from this element block is added
    double mass_sum_global = node_processor.GetFieldSumHost(0) / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
    assert(CheckMassSumsAreEqual(mass_sum_global, node_processor.GetFieldSumHost(1) / 3.0));

    // node_processor.debug_print_field_with_id_host(1);

    // Subtract the existing mass to get the mass from this element block
    aperi::CoutP0() << "      " << part_name << ", Pre Mass: " << mass_sum_global << std::endl;
    mass_sum_global -= existing_mass;
    aperi::CoutP0() << "      " << part_name << ", Existing Mass: " << existing_mass << std::endl;
    aperi::CoutP0() << "      " << part_name << ", Mass: " << mass_sum_global << std::endl;
    return mass_sum_global;
}

}  // namespace aperi
