#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementProcessor.h"
#include "Kokkos_Core.hpp"
#include "Material.h"

namespace aperi {

static constexpr int tet4_num_nodes = 4;

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

// Functor for computing the internal force of an element with NumNodes nodes.
// IntegrationFunctor is a functor that computes the B matrix and integration weight for a given gauss point.
// StressFunctor is a functor that computes the stress of the material.
template <size_t NumNodes, typename FunctionDerivativesFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeInternalForceFunctor {
    ComputeInternalForceFunctor(FunctionDerivativesFunctor &function_derivatives_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor)
        : m_function_derivatives_functor(function_derivatives_functor), m_integration_functor(integration_functor), m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 3> &field_data_to_gather, Eigen::Matrix<double, NumNodes, 3> &force) const {
        const Eigen::Matrix<double, NumNodes, 3> &node_coordinates = field_data_to_gather[0];
        const Eigen::Matrix<double, NumNodes, 3> &node_displacements = field_data_to_gather[1];
        // const Eigen::Matrix<double, NumNodes, 3> &node_velocities = field_data_to_gather[2];

        force.fill(0.0);

        // Loop over all gauss points
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Get the gauss point
            const Eigen::Matrix<double, 1, 3> gauss_point = m_integration_functor.GetGaussPoint(gauss_id);

            // Get the shape function derivatives for the given gauss point
            const Eigen::Matrix<double, NumNodes, 3> shape_function_derivatives = m_function_derivatives_functor(gauss_point(0), gauss_point(1), gauss_point(2));

            // Compute the B matrix and integration weight for a given gauss point
            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, shape_function_derivatives, gauss_id);

            // Compute displacement gradient
            const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix_and_weight.first;

            // Compute the Green Lagrange strain tensor. TODO: Get rid of this and go straight to voigt notation
            // E = 0.5 * (H + H^T + H^T * H)
            const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (displacement_gradient + displacement_gradient.transpose() + displacement_gradient.transpose() * displacement_gradient);

            // Green Lagrange strain tensor in voigt notation
            Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
            green_lagrange_strain_tensor_voigt << green_lagrange_strain_tensor(0, 0), green_lagrange_strain_tensor(1, 1), green_lagrange_strain_tensor(2, 2), green_lagrange_strain_tensor(1, 2), green_lagrange_strain_tensor(0, 2), green_lagrange_strain_tensor(0, 1);

            // Compute the stress and internal force of the element.
            const Eigen::Matrix<double, 6, 1> stress = m_stress_functor(green_lagrange_strain_tensor_voigt);

            for (size_t i = 0; i < NumNodes; ++i) {
                // Compute (B_I F)^T
                const Eigen::Matrix<double, 3, 6> bF_IT = ComputeBFTranspose(b_matrix_and_weight.first.row(i), displacement_gradient);

                force.row(i) -= (bF_IT * stress).transpose() * b_matrix_and_weight.second;
            }
        }
    }

    FunctionDerivativesFunctor &m_function_derivatives_functor;  ///< Functor for computing the shape function derivatives
    IntegrationFunctor &m_integration_functor;                   ///< Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;                             ///< Functor for computing the stress of the material
};

// Functor for 1-pt gauss quadrature on a tetrahedron
template <size_t NumNodes>
struct TetOnePointGaussQuadrature {
    KOKKOS_INLINE_FUNCTION TetOnePointGaussQuadrature() {}

    // Get the ith gauss point
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 1, 3> GetGaussPoint(int gauss_id) const {
        assert(gauss_id <= m_num_gauss_points);
        return m_gauss_points.row(gauss_id);
    }

    // Compute the B matrix and integration weight for a given gauss point
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, NumNodes, 3> &node_coordinates, const Eigen::Matrix<double, NumNodes, 3> &shape_function_derivatives, int gauss_id) const {
        assert(gauss_id <= m_num_gauss_points);

        // Compute Jacobian matrix
        const Eigen::Matrix3d jacobian = node_coordinates.transpose() * shape_function_derivatives;

        // Compute Jacobian determinant
        const double jacobian_determinant = jacobian.determinant();

        // Compute inverse of Jacobian matrix
        const Eigen::Matrix3d inverse_jacobian = jacobian.inverse();

        // Compute B matrix
        const Eigen::Matrix<double, NumNodes, 3> b_matrix = shape_function_derivatives * inverse_jacobian;

        // Compute the integration weight
        const double integration_weight = m_gauss_weights(gauss_id) * jacobian_determinant;

        return Kokkos::make_pair(b_matrix, integration_weight);
    }

    KOKKOS_INLINE_FUNCTION int NumGaussPoints() const {
        return 1;
    }

    const static int m_num_gauss_points = 1;
    Eigen::Matrix<double, 1, 3> m_gauss_points = Eigen::Matrix<double, 1, 3>::Constant(1.0 / 3.0);
    const Eigen::Matrix<double, 1, 1> m_gauss_weights = Eigen::Matrix<double, 1, 1>::Constant(1.0 / 6.0);
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
    Element(size_t num_nodes) : m_num_nodes(num_nodes), m_element_processor(nullptr), m_material(nullptr) {}

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
     * @brief Computes the internal force of the element.
     *
     */
    virtual void ComputeInternalForceAllElements() = 0;

    /**
     * @brief Sets the element processor associated with the force contribution.
     *
     * @param element_processor The element processor associated with the force contribution.
     */
    void SetElementProcessor(std::shared_ptr<aperi::ElementProcessor<3>> element_processor) {
        m_element_processor = element_processor;
    }

    /**
     * @brief Sets the material of the element.
     *
     * @param material The material of the element.
     */
    void SetMaterial(std::shared_ptr<Material> material) {
        m_material = material;
    }

   protected:
    size_t m_num_nodes;                                               ///< The number of nodes in the element.
    std::shared_ptr<aperi::ElementProcessor<3>> m_element_processor;  ///< The element processor associated with the force contribution.
    std::shared_ptr<Material> m_material;                             ///< The material of the element.
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
     */
    Tetrahedron4() : Element(tet4_num_nodes), m_compute_shape_function_derivatives_functor(nullptr), m_integration_functor(nullptr) {
        CreateInternalForceFunctor();
    }

    /**
     * @brief Destroys a Tetrahedron4 object.
     */
    ~Tetrahedron4() {
        DestroyInternalForceFunctor();
    }

    void CreateInternalForceFunctor() {
        // Functor for computing shape function derivatives
        size_t compute_shape_function_derivatives_functor_size = sizeof(ComputeShapeFunctionDerivativesFunctor);
        auto compute_shape_function_derivatives_functor = (ComputeShapeFunctionDerivativesFunctor *)Kokkos::kokkos_malloc(compute_shape_function_derivatives_functor_size);
        assert(compute_shape_function_derivatives_functor != nullptr);

        // Functor for 1-pt gauss quadrature
        size_t integration_functor_size = sizeof(TetOnePointGaussQuadrature<tet4_num_nodes>);
        auto integration_functor = (TetOnePointGaussQuadrature<tet4_num_nodes> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateInternalForceObjects", 1, KOKKOS_LAMBDA(const int &) {
                new ((ComputeShapeFunctionDerivativesFunctor *)compute_shape_function_derivatives_functor) ComputeShapeFunctionDerivativesFunctor();
                new ((TetOnePointGaussQuadrature<tet4_num_nodes> *)integration_functor) TetOnePointGaussQuadrature<tet4_num_nodes>();
            });

        // Set the functors
        m_compute_shape_function_derivatives_functor = compute_shape_function_derivatives_functor;
        m_integration_functor = integration_functor;
    }

    void DestroyInternalForceFunctor() {
        Kokkos::parallel_for(
            "DestroyInternalForceObjects", 1, KOKKOS_LAMBDA(const int &) {
                m_compute_shape_function_derivatives_functor->~ComputeShapeFunctionDerivativesFunctor();
                m_integration_functor->~TetOnePointGaussQuadrature();
            });

        Kokkos::kokkos_free(m_compute_shape_function_derivatives_functor);
        Kokkos::kokkos_free(m_integration_functor);

        m_compute_shape_function_derivatives_functor = nullptr;
        m_integration_functor = nullptr;
    }

    /**
        * @brief Functor for computing the shape function derivatives.
         * @param xi The xi coordinate of the element.
         * @param eta The eta coordinate of the element.
         * @param zeta The zeta coordinate of the element.
         * @return The shape function derivatives of the element.
        * This functor computes the shape function derivatives, dN/dxi, dN/deta, dN/dzeta

    */
    struct ComputeShapeFunctionDerivativesFunctor {
        /**
         * @brief Computes the shape function derivatives of the element.
         */
        KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 3> operator()(double xi, double eta, double zeta) const {
            Eigen::Matrix<double, tet4_num_nodes, 3> shape_function_derivatives;
            shape_function_derivatives << -1.0, -1.0, -1.0,
                1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 0.0, 1.0;
            return shape_function_derivatives;
        }
    };

    /**
     * @brief Calls the ComputeShapeFunctionDerivativesFunctor to compute the shape function derivatives.
     */
    Eigen::Matrix<double, tet4_num_nodes, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const override {
        return ComputeShapeFunctionDerivativesFunctor()(xi, eta, zeta);
    }

    /**
     * @brief Computes the shape functions of the element.
     *
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape functions of the element.
     */
    Eigen::Matrix<double, tet4_num_nodes, 1> ComputeShapeFunctions(double xi, double eta, double zeta) const override {
        Eigen::Matrix<double, tet4_num_nodes, 1> shape_functions;
        shape_functions << 1.0 - xi - eta - zeta,
            xi,
            eta,
            zeta;
        return shape_functions;
    }

    /**
     * @brief Computes the internal force of all elements.
     *
     */
    void ComputeInternalForceAllElements() override;

   private:
    ComputeShapeFunctionDerivativesFunctor *m_compute_shape_function_derivatives_functor;
    TetOnePointGaussQuadrature<tet4_num_nodes> *m_integration_functor;
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
