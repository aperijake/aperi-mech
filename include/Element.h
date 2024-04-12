#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementProcessor.h"
#include "Material.h"
#include "Kokkos_Core.hpp"

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

static constexpr int tet4_num_nodes = 4;

// dN/dxi, dN/deta, dN/dzeta
struct Tet4ComputeShapeFunctionDerivativesFunctor {
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 3> operator()(double xi, double eta, double zeta) const {
        Eigen::Matrix<double, tet4_num_nodes, 3> shape_function_derivatives;
        shape_function_derivatives << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        return shape_function_derivatives;
    }
};

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

/**
 * @brief Represents an element in a mesh.
 *
 * This class provides a base implementation for elements in a mesh.
 */
class Element {
   public:
    /**
     * @brief Constructs an Element object.
     * @note The object-oriented design cause a low-level virtual function call in the element internal force calculation.
     *       The performance didn't seem to be too affected by this, but it's something to keep in mind.
     *       I did try to replace with a lambda function, but that performed worse.
     *       I also tried to replace with a template function, but that didn't work because the number of nodes is not known at compile time.
     *
     * @param num_nodes The number of nodes in the element.
     */
    Element(size_t num_nodes) : m_num_nodes(num_nodes), m_ngp_element_processor(nullptr) {}

    /**
     * @brief Gets the number of nodes in the element.
     *
     * @return The number of nodes in the element.
     */
    size_t GetNumNodes() const {
        return m_num_nodes;
    }

    /**
     * @brief Computes the shape functions of the element.
     *
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape functions of the element.
     */
    virtual Eigen::Matrix<double, 4, 1> ComputeShapeFunctions(double xi, double eta, double zeta) const = 0;

    /**
     * @brief Computes the shape function derivatives of the element.
     *
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape function derivatives of the element.
     */
    virtual Eigen::Matrix<double, 4, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const = 0;

    /**
     * @brief Computes the internal force of the element. Wraps the actual computation of the internal force.
     *
     * @param node_coordinates The coordinates of the nodes of the element.
     * @param node_displacements The displacements of the nodes of the element.
     * @param node_velocities The velocities of the nodes of the element.
     * @param material The material of the element.
     * @return The internal force of the element.
     */
    Eigen::Matrix<double, 4, 3> ComputeInternalForce(const Eigen::Matrix<double, 4, 3> &node_coordinates, const Eigen::Matrix<double, 4, 3> &node_displacements, const Eigen::Matrix<double, 4, 3> &node_velocities, std::shared_ptr<Material> material) const;

    virtual void ComputeInternalForceAllElements() = 0;

    void SetElementProcessor(std::shared_ptr<aperi::ElementProcessorStkNgp<3>> ngp_element_processor) {
        m_ngp_element_processor = ngp_element_processor;
    }

    void SetMaterial(std::shared_ptr<Material> material) {
        m_material = material;
    }

   protected:
    /**
     * @brief Template function to compute the internal force of the element. Handles the actual computation of the internal force.
     * @note Templating this way prevents the calling function from having to know the number of nodes in the element.
     *       It also was a moderate performance improvement over have Eigen::Dynamic sizes on the matrices.
     *
     * @param shape_function_derivatives The shape function derivatives of the element.
     * @param node_coordinates The coordinates of the nodes of the element.
     * @param node_displacements The displacements of the nodes of the element.
     * @param node_velocities The velocities of the nodes of the element.
     * @param material The material of the element.
     * @return The internal force of the element.
     */
    template <size_t N>
    Eigen::Matrix<double, N, 3> DoInternalForceCalc(const Eigen::Matrix<double, N, 3> &shape_function_derivatives, const Eigen::Matrix<double, N, 3> &node_coordinates, const Eigen::Matrix<double, N, 3> &node_displacements, const Eigen::Matrix<double, N, 3> &node_velocities, std::shared_ptr<Material> material) const;

    size_t m_num_nodes;                                                         ///< The number of nodes in the element.
    std::shared_ptr<aperi::ElementProcessorStkNgp<3>> m_ngp_element_processor;  ///< The element processor associated with the force contribution.
    std::shared_ptr<Material> m_material;                                       ///< The material of the element.
};

/**
 * @brief Represents a 4-node tetrahedron element.
 *
 * This class inherits from the Element base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class Tetrahedron4 : public Element {
   public:
    /**
     * @brief Constructs a Tetrahedron4 object.
     *
     */
    Tetrahedron4() : Element(tet4_num_nodes) {
    }

    Eigen::Matrix<double, tet4_num_nodes, 1> ComputeShapeFunctions(double xi, double eta, double zeta) const override {
        Eigen::Matrix<double, tet4_num_nodes, 1> shape_functions;
        shape_functions << 1.0 - xi - eta - zeta,
            xi,
            eta,
            zeta;
        return shape_functions;
    }

    // dN/dxi, dN/deta, dN/dzeta
    Eigen::Matrix<double, tet4_num_nodes, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const override {
        Eigen::Matrix<double, tet4_num_nodes, 3> shape_function_derivatives;
        shape_function_derivatives << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        return shape_function_derivatives;
    }

    void ComputeInternalForceAllElements() override {
        assert(m_ngp_element_processor != nullptr);
        // printf("Tetrahedron4::ComputeInternalForceAllElements\n");

        // Functor for computing shape function derivatives
        Tet4ComputeShapeFunctionDerivativesFunctor elem_compute_shape_function_derivatives;

        auto material_properties = m_material->GetMaterialProperties();
        double lambda = material_properties->properties.at("lambda");
        double two_mu = material_properties->properties.at("two_mu");

        GetStressFunctor2* gsf = (GetStressFunctor2*)Kokkos::kokkos_malloc(sizeof(GetStressFunctor2));
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int &) {
                new ((GetStressFunctor2*)gsf) GetStressFunctor2(lambda, two_mu);
            });


        // Functor for computing the internal force. Kinematic calculations are done in this functor. Common to all elements types.
        ComputeInternalForceFunctor<tet4_num_nodes, Tet4ComputeShapeFunctionDerivativesFunctor, GetStressFunctor2> compute_force_functor(elem_compute_shape_function_derivatives, *gsf);

        // Loop over all elements and compute the internal force
        m_ngp_element_processor->for_each_element_debug<tet4_num_nodes>(compute_force_functor);

        Kokkos::parallel_for(
            "DestroyObjects", 1, KOKKOS_LAMBDA(const int &) {
                gsf->~GetStressFunctor2();
            });

        Kokkos::kokkos_free(gsf);
    }
};

/**
 * @brief Creates an element object.
 *
 * This function creates and returns a shared pointer to an Element object based on the given
 * parameters. The element is created based on the given topology and is initialized with the
 * given bulk data.
 *
 * @param num_nodes The number of nodes in the element.
 * @return A shared pointer to the created Element object.
 */
inline std::shared_ptr<Element> CreateElement(size_t num_nodes) {
    if (num_nodes == tet4_num_nodes) {
        return std::make_shared<Tetrahedron4>();
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
