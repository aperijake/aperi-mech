#pragma once

#include <memory>
#include <stdexcept>

#include "Element.h"
#include "ElementProcessor.h"
#include "FieldData.h"
#include "ForceContribution.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Represents an internal force contribution.
 *
 * This class inherits from the base class ForceContribution and provides
 * functionality to compute internal forces.
 */
class InternalForceContribution : public ForceContribution {
   public:
    /**
     * @brief Constructs an InternalForceContribution object.
     *
     * @param material A shared pointer to the Material object associated with the force contribution.
     * @param mesh_data A shared pointer to the MeshData object associated with the force contribution.
     * @param part_name The name of the part associated with the force contribution.
     */
    InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name);

    /**
     * @brief Gets the Material object associated with the force contribution.
     *
     * @return A shared pointer to the Material object.
     */
    std::shared_ptr<Material> GetMaterial() const {
        return m_material;
    }

    /**
     * @brief Gets the part name object associated with the force contribution.
     *
     * @return A string representing the part name.
     */
    std::string GetPartName() const {
        return m_part_name;
    }

    /**
     * @brief Computes the internal forces.
     *
     * This function overrides the ComputeForce function from the base class.
     * It calculates the internal forces for the force contribution.
     */
    void ComputeForce() override;

    /**
     * @brief Computes the internal force for an element.
     *
     * This is a wrapper function for the ComputeInternalForce function of the Element class.
     *
     * @param node_coordinates The coordinates of the nodes of the element.
     * @param node_displacements The displacements of the nodes of the element.
     * @param node_velocities The velocities of the nodes of the element.
     * @param force The internal force of the element.
     * @return The internal force of the element. By reference.
     */
    void ComputeElementInternalForce(const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &node_coordinates, const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &node_displacements, const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 4, 3> &node_velocities, Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &force) const;

    void CreateElementProcessor() {
        std::array<FieldQueryData, 3> field_query_data_gather_vec;
        field_query_data_gather_vec[0] = FieldQueryData{m_mesh_data->GetCoordinatesFieldName(), FieldQueryState::None};
        field_query_data_gather_vec[1] = FieldQueryData{"displacement", FieldQueryState::NP1};
        field_query_data_gather_vec[2] = FieldQueryData{"velocity", FieldQueryState::NP1};
        const FieldQueryData field_query_data_scatter = {"force", FieldQueryState::NP1};
        const std::vector<std::string> part_names = {m_part_name};
        m_element_processor = std::make_shared<ElementProcessor<3>>(field_query_data_gather_vec, field_query_data_scatter, m_num_nodes_per_element, m_mesh_data, part_names);
        m_ngp_element_processor = std::make_shared<ElementProcessorStkNgp<3>>(field_query_data_gather_vec, field_query_data_scatter, m_mesh_data, part_names);
    }

   private:
    std::shared_ptr<aperi::Material> m_material;                      ///< A shared pointer to the Material object.
    std::shared_ptr<aperi::MeshData> m_mesh_data;                     ///< The mesh data associated with the force contribution.
    std::string m_part_name;                                          ///< The name of the part associated with the force contribution.
    size_t m_num_nodes_per_element;                                   ///< The number of nodes per element.
    std::shared_ptr<aperi::Element> m_element;                        ///< The element associated with the force contribution.
    std::shared_ptr<aperi::ElementProcessor<3>> m_element_processor;  ///< The element processor associated with the force contribution.
    std::shared_ptr<aperi::ElementProcessorStkNgp<3>> m_ngp_element_processor;  ///< The element processor associated with the force contribution.
};

/**
 * @brief Creates an internal force contribution object.
 *
 * This function creates and returns a shared pointer to an InternalForceContribution object.
 * The InternalForceContribution object is initialized with the given material and part.
 *
 * @param material A shared pointer to the Material object.
 * @param mesh_data A shared pointer to the MeshData object.
 * @param part_name The name of the part associated with the force contribution.
 * @return A shared pointer to the created InternalForceContribution object.
 */
inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name) {
    return std::make_shared<InternalForceContribution>(material, mesh_data, part_name);
}

}  // namespace aperi