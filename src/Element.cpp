#include "Element.h"

#include <Eigen/Dense>
#include <memory>

#include "Material.h"

namespace aperi {

class GetStressFunctor2 {
   public:
    KOKKOS_FUNCTION
    GetStressFunctor2(double lambda, double two_mu) : m_lambda(lambda), m_two_mu(two_mu) {}

    KOKKOS_INLINE_FUNCTION
    Eigen::Matrix<double, 6, 1> operator()(const Eigen::Matrix<double, 6, 1> &green_lagrange_strain) const {
        // printf("ElasticGetStressFunctor2::operator()\n");
        // printf("assigned lambda: %f, two_mu: %f\n", m_lambda, m_two_mu);
        Eigen::Matrix<double, 6, 1> stress;
        const double lambda_trace_strain = m_lambda * (green_lagrange_strain(0) + green_lagrange_strain(1) + green_lagrange_strain(2));
        stress(0) = lambda_trace_strain + m_two_mu * green_lagrange_strain(0);
        stress(1) = lambda_trace_strain + m_two_mu * green_lagrange_strain(1);
        stress(2) = lambda_trace_strain + m_two_mu * green_lagrange_strain(2);
        stress(3) = m_two_mu * green_lagrange_strain(3);
        stress(4) = m_two_mu * green_lagrange_strain(4);
        stress(5) = m_two_mu * green_lagrange_strain(5);
        // printf("stress: %f, %f, %f, %f, %f, %f\n", stress(0), stress(1), stress(2), stress(3), stress(4), stress(5));
        return stress;
    }

   private:
    double m_lambda;
    double m_two_mu;
};

// Compute (B_I F)^T, voigt notation, 3 x 6
KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 3, 6> ComputeBFTranspose(const Eigen::Matrix<double, 1, 3> &bI_vector, const Eigen::Matrix<double, 3, 3> &displacement_gradient) {
    Eigen::Matrix<double, 3, 6> bf_transpose;
    bf_transpose(0, 0) = bI_vector(0, 0) * (displacement_gradient(0, 0) + 1.0);
    bf_transpose(1, 1) = bI_vector(0, 1) * (displacement_gradient(1, 1) + 1.0);
    bf_transpose(2, 2) = bI_vector(0, 2) * (displacement_gradient(2, 2) + 1.0);

    bf_transpose(0, 1) = bI_vector(0, 1) * displacement_gradient(0, 1);
    bf_transpose(0, 2) = bI_vector(0, 2) * displacement_gradient(0, 2);
    bf_transpose(1, 0) = bI_vector(0, 0) * displacement_gradient(1, 0);
    bf_transpose(1, 2) = bI_vector(0, 2) * displacement_gradient(1, 2);
    bf_transpose(2, 0) = bI_vector(0, 0) * displacement_gradient(2, 0);
    bf_transpose(2, 1) = bI_vector(0, 1) * displacement_gradient(2, 1);

    bf_transpose(0, 3) = bI_vector(0, 1) * displacement_gradient(0, 2) + bI_vector(0, 2) * displacement_gradient(0, 1);
    bf_transpose(0, 4) = bI_vector(0, 0) * displacement_gradient(0, 2) + bI_vector(0, 2) * (displacement_gradient(0, 0) + 1.0);
    bf_transpose(0, 5) = bI_vector(0, 0) * displacement_gradient(0, 1) + bI_vector(0, 1) * (displacement_gradient(0, 0) + 1.0);

    bf_transpose(1, 3) = bI_vector(0, 1) * displacement_gradient(1, 2) + bI_vector(0, 2) * (displacement_gradient(1, 1) + 1.0);
    bf_transpose(1, 4) = bI_vector(0, 0) * displacement_gradient(1, 2) + bI_vector(0, 2) * displacement_gradient(1, 0);
    bf_transpose(1, 5) = bI_vector(0, 0) * (displacement_gradient(1, 1) + 1.0) + bI_vector(0, 1) * displacement_gradient(1, 0);

    bf_transpose(2, 3) = bI_vector(0, 1) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 1);
    bf_transpose(2, 4) = bI_vector(0, 0) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 0);
    bf_transpose(2, 5) = bI_vector(0, 0) * displacement_gradient(2, 1) + bI_vector(0, 1) * displacement_gradient(2, 0);

    return bf_transpose;
}

template <size_t NumNodes, typename FunctionDerivativesFunctor, typename StressFunctor>
struct ComputeInternalForceFunctor {
    ComputeInternalForceFunctor(FunctionDerivativesFunctor &function_derivatives_functor, StressFunctor &stress_functor) : m_function_derivatives_functor(function_derivatives_functor), m_stress_functor(stress_functor) {}
    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 3> &field_data_to_gather, Eigen::Matrix<double, NumNodes, 3> &force) const {

        const Eigen::Matrix<double, NumNodes, 3> &node_coordinates = field_data_to_gather[0];
        const Eigen::Matrix<double, NumNodes, 3> &node_displacements = field_data_to_gather[1];
        const Eigen::Matrix<double, NumNodes, 3> &node_velocities = field_data_to_gather[2];

        // Compute the shape function derivatives
        Eigen::Matrix<double, NumNodes, 3> shape_function_derivatives =  m_function_derivatives_functor(0.0, 0.0, 0.0);

        // Compute Jacobian matrix
        const Eigen::Matrix3d jacobian = node_coordinates.transpose() * shape_function_derivatives;

        // Compute Jacobian determinant
        const double jacobian_determinant = jacobian.determinant();

        // Compute inverse of Jacobian matrix
        const Eigen::Matrix3d inverse_jacobian = jacobian.inverse();

        // Compute B matrix
        const Eigen::Matrix<double, NumNodes, 3> b_matrix = shape_function_derivatives * inverse_jacobian;

        // Compute displacement gradient
        const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix;

        // Compute the Green Lagrange strain tensor. TODO(jake): Get rid of this and go straight to voigt notation
        // E = 0.5 * (H + H^T + H^T * H)
        const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (displacement_gradient + displacement_gradient.transpose() + displacement_gradient.transpose() * displacement_gradient);

        // Green Lagrange strain tensor in voigt notation
        Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
        green_lagrange_strain_tensor_voigt << green_lagrange_strain_tensor(0, 0), green_lagrange_strain_tensor(1, 1), green_lagrange_strain_tensor(2, 2), green_lagrange_strain_tensor(1, 2), green_lagrange_strain_tensor(0, 2), green_lagrange_strain_tensor(0, 1);

        // printf("Green Lagrange strain tensor voigt: %f, %f, %f, %f, %f, %f\n", green_lagrange_strain_tensor_voigt(0), green_lagrange_strain_tensor_voigt(1), green_lagrange_strain_tensor_voigt(2), green_lagrange_strain_tensor_voigt(3), green_lagrange_strain_tensor_voigt(4), green_lagrange_strain_tensor_voigt(5));

        // Compute the stress and internal force of the element.
        // printf("GetStress\n");
        const Eigen::Matrix<double, 6, 1> stress = m_stress_functor(green_lagrange_strain_tensor_voigt);
        // printf("post GetStress\n");
        // printf("Stress: %f, %f, %f, %f, %f, %f\n", stress(0), stress(1), stress(2), stress(3), stress(4), stress(5));

        force.fill(0.0);

        Eigen::Matrix<double, 3, 6> bF_IT;
        for (size_t i = 0; i < NumNodes; ++i) {
            // Compute (B_I F)^T
            bF_IT = ComputeBFTranspose(b_matrix.row(i), displacement_gradient);

            force.row(i) -= (bF_IT * stress).transpose() * jacobian_determinant / 6.0;  // weight = 1/6 for tetrahedron
        }
    }
    FunctionDerivativesFunctor &m_function_derivatives_functor;
    StressFunctor &m_stress_functor;
};

void Tetrahedron4::ComputeInternalForceAllElements() {
    assert(m_ngp_element_processor != nullptr);

    // Functor for computing shape function derivatives
    ComputeShapeFunctionDerivativesFunctor compute_shape_function_derivatives_functor;

    auto material_properties = m_material->GetMaterialProperties();
    double lambda = material_properties->properties.at("lambda");
    double two_mu = material_properties->properties.at("two_mu");

    GetStressFunctor2 *gsf = (GetStressFunctor2 *)Kokkos::kokkos_malloc(sizeof(GetStressFunctor2));
    Kokkos::parallel_for(
        "CreateObjects", 1, KOKKOS_LAMBDA(const int &) {
            new ((GetStressFunctor2 *)gsf) GetStressFunctor2(lambda, two_mu);
        });

    // Functor for computing the internal force. Kinematic calculations are done in this functor. Common to all elements types.
    ComputeInternalForceFunctor<tet4_num_nodes, ComputeShapeFunctionDerivativesFunctor, GetStressFunctor2> compute_force_functor(compute_shape_function_derivatives_functor, *gsf);

    // Loop over all elements and compute the internal force
    m_ngp_element_processor->for_each_element<tet4_num_nodes>(compute_force_functor);

    Kokkos::parallel_for(
        "DestroyObjects", 1, KOKKOS_LAMBDA(const int &) {
            gsf->~GetStressFunctor2();
        });

    Kokkos::kokkos_free(gsf);
}

}  // namespace aperi
