#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementProcessor.h"
#include "Material.h"
#include "Kokkos_Core.hpp"

namespace aperi {

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

template <size_t NumNodes, typename FuncShapeFunctionDerivatives>
struct ComputeInternalForceFunctor {
    ComputeInternalForceFunctor(FuncShapeFunctionDerivatives &func) : m_func_shape_function_derivatives(func) {}
    KOKKOS_INLINE_FUNCTION void operator()(const Eigen::Matrix<double, NumNodes, 3> &node_coordinates, const Eigen::Matrix<double, NumNodes, 3> &node_displacements, const Eigen::Matrix<double, NumNodes, 3> &node_velocities, Eigen::Matrix<double, NumNodes, 3> &force) const {
        // Compute the shape function derivatives
        printf("Element::ComputeShapeFunctionDerivatives\n");
        Eigen::Matrix<double, NumNodes, 3> shape_function_derivatives =  m_func_shape_function_derivatives(0.0, 0.0, 0.0);
        printf("post ComputeShapeFunctionDerivatives, shape_function_derivatives(0,0): %f\n", shape_function_derivatives(0, 0));
        // Compute the internal force
        printf("Element::ComputeInternalForceTest\n");
        printf("pre fill force(0,0): %f\n", force(0, 0));
        force.fill(1.3);
        printf("post fill force(0,0): %f\n", force(0, 0));

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

        printf("Green Lagrange strain tensor voigt(0): %f\n", green_lagrange_strain_tensor_voigt(0));
        printf("Green Lagrange strain tensor voigt(1): %f\n", green_lagrange_strain_tensor_voigt(1));
        printf("Green Lagrange strain tensor voigt(2): %f\n", green_lagrange_strain_tensor_voigt(2));

        // Compute the stress and internal force of the element.
        Eigen::Matrix<double, 6, 1> stress;// = material->GetStress(green_lagrange_strain_tensor_voigt);
        stress.fill(0.0);

        force.fill(0.0);

        Eigen::Matrix<double, 3, 6> bF_IT;
        for (size_t i = 0; i < NumNodes; ++i) {
            // Compute (B_I F)^T
            bF_IT = ComputeBFTranspose(b_matrix.row(i), displacement_gradient);

            force.row(i) -= (bF_IT * stress).transpose() * jacobian_determinant / 6.0;  // weight = 1/6 for tetrahedron
        }
    }

    FuncShapeFunctionDerivatives &m_func_shape_function_derivatives;
};

template <typename ComputeInternalForceFunc>
struct Tet4ComputeForceFunctor {
    Tet4ComputeForceFunctor(ComputeInternalForceFunc &func) : m_func(func) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, tet4_num_nodes, 3>, 3> &field_data_to_gather, Eigen::Matrix<double, tet4_num_nodes, 3> &force) const {
        // Compute the internal force
        printf("ComputeFunc\n");
        m_func(field_data_to_gather[0], field_data_to_gather[1], field_data_to_gather[2], force);
        printf("post ComputeFunc, force(0,0): %f\n", force(0, 0));
    }
    ComputeInternalForceFunc &m_func;
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

    size_t m_num_nodes;  ///< The number of nodes in the element.
    std::shared_ptr<aperi::ElementProcessorStkNgp<3>> m_ngp_element_processor;  ///< The element processor associated with the force contribution.
    size_t m_temp;
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
        printf("Tetrahedron4::ComputeInternalForceAllElements\n");
        Tet4ComputeShapeFunctionDerivativesFunctor elem_compute_shape_function_derivatives;
        ComputeInternalForceFunctor<tet4_num_nodes, Tet4ComputeShapeFunctionDerivativesFunctor> elem_compute_force(elem_compute_shape_function_derivatives);
        Tet4ComputeForceFunctor<ComputeInternalForceFunctor<tet4_num_nodes, Tet4ComputeShapeFunctionDerivativesFunctor>> compute_force_functor(elem_compute_force);
        m_ngp_element_processor->for_each_element_debug<tet4_num_nodes>(compute_force_functor);
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
