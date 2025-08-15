#pragma once

#include <memory>
#include <string>
#include <vector>

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {
class MeshData;

// Abstract base class for initial conditions
class InitialCondition {
   public:
    InitialCondition(std::shared_ptr<aperi::MeshData> mesh_data,
                     const std::string& field_name,
                     const std::vector<std::string>& set_names)
        : m_mesh_data(mesh_data),
          m_field_name(field_name),
          m_set_names(set_names) {}

    virtual ~InitialCondition() = default;

    // Apply the initial condition to the mesh data using stored configuration.
    virtual void Apply() = 0;

   protected:
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::string m_field_name;
    std::vector<std::string> m_set_names;
    // Derived classes can add more members as needed
};

// Factory function to create InitialCondition instance from YAML node
std::unique_ptr<InitialCondition> CreateInitialCondition(const YAML::Node& initial_condition, std::shared_ptr<aperi::MeshData> mesh_data);

}  // namespace aperi