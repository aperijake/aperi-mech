#pragma once

#include <memory>
#include <string>
#include <vector>

namespace aperi {
class MeshData;

/**
 * @class InitialCondition
 * @brief Abstract base class for initial conditions.
 *
 * This class provides an interface for applying initial conditions
 * to mesh data fields, optionally restricted to specific sets.
 * Derived classes must implement the Apply() method.
 */
class InitialCondition {
   public:
    /**
     * @brief Constructor.
     * @param mesh_data Shared pointer to mesh data object.
     * @param field_name Name of the field to which the initial condition applies.
     * @param set_names Names of the sets where the initial condition should be applied.
     */
    InitialCondition(std::shared_ptr<aperi::MeshData> mesh_data,
                     const std::string& field_name,
                     const std::vector<std::string>& set_names);

    /**
     * @brief Virtual destructor.
     */
    virtual ~InitialCondition() = default;

    /**
     * @brief Apply the initial condition to the mesh data using stored configuration.
     * This method must be implemented by derived classes.
     */
    virtual void Apply() = 0;

    /**
     * @brief Get the name of the field to which the initial condition applies.
     * @return Reference to the field name string.
     */
    const std::string& GetFieldName() const { return m_field_name; }

    /**
     * @brief Get the list of set names where the initial condition should be applied.
     * @return Reference to the vector of set names.
     */
    const std::vector<std::string>& GetSets() const { return m_sets; }

   protected:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  ///< Shared pointer to mesh data object.
    std::string m_field_name;                      ///< Name of the field to which the initial condition applies.
    std::vector<std::string> m_sets;               ///< List of set names where the initial condition should be applied.
};

}  // namespace aperi