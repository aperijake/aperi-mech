#include "MassUtils.h"

#include <array>

#include "ElementProcessor.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

// Functor for computing the mass of an element
// TODO(jake): this is hard-coded for 4-node tetrahedra
struct ComputeMassFunctor {
    double density;
    size_t nodes_per_element;

    KOKKOS_INLINE_FUNCTION
    void operator()(const Kokkos::Array<Eigen::Matrix<double, 4, 3>, 1> &field_data_to_gather, Eigen::Matrix<double, 4, 3> &results_to_scatter) const {
        double mass = density * TetVolume(field_data_to_gather[0]) / nodes_per_element;
        for (int i = 0; i < field_data_to_gather[0].rows(); ++i) {
            results_to_scatter.row(i) = Eigen::Vector3d::Constant(mass);
        }
    }
};

// Compute the diagonal mass matrix
double ComputeMassMatrix(const std::shared_ptr<aperi::MeshData> mesh_data, const std::string &part_name, double density) {
    size_t nodes_per_element = mesh_data->GetNumNodesPerElement(part_name);
    std::array<FieldQueryData, 1> field_query_data_gather_vec = {FieldQueryData{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None}};
    FieldQueryData field_query_data_scatter = {"mass", FieldQueryState::None};

    ElementProcessor<1> element_processor(field_query_data_gather_vec, field_query_data_scatter, mesh_data);
    ComputeMassFunctor compute_mass_functor{density, nodes_per_element};
    element_processor.for_each_element_host<4>(compute_mass_functor);  // Can be on device as well. Would need to change the summing and printing below

    // Parallel sum
    double mass_sum_global = element_processor.GetFieldToScatterSum() / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
    aperi::CoutP0() << "Total Mass for Part " << part_name << ": " << mass_sum_global << std::endl;
    return mass_sum_global;
}

}  // namespace aperi
