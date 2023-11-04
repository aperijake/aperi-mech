#pragma once

#include <memory>
#include <stdexcept>

#include "Material.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace acm {
class ForceContribution {
   public:
    ForceContribution() = default;
    ~ForceContribution() = default;
    virtual void ComputeForce() = 0;
};

class InternalForceContribution : public ForceContribution {
   public:
    InternalForceContribution(std::shared_ptr<Material> material) : m_material(material) {}
    std::shared_ptr<Material> GetMaterial() const {
        return m_material;
    }
    void ComputeForce() override {}

   private:
    std::shared_ptr<Material> m_material;
};

class ExternalForceContribution : public ForceContribution {
   public:
    ExternalForceContribution(stk::mesh::MetaData &meta_data, double magnitude, std::array<double, 3> direction) : m_meta_data(meta_data), m_magnitude(magnitude), m_direction(direction) {}
    void ComputeForce() override {}

   protected:
    stk::mesh::MetaData &m_meta_data;
    double m_magnitude;
    std::array<double, 3> m_direction;
};

class ExternalForceContributionTraction : public ExternalForceContribution {
   public:
    ExternalForceContributionTraction(stk::mesh::MetaData &meta_data, double magnitude, std::array<double, 3> direction) : ExternalForceContribution(meta_data, magnitude, direction) {
        // Throw error because this is not implemented yet
        throw std::runtime_error("Error: Traction not implemented yet");
    }
    void ComputeForce() override {}
};

class ExternalForceContributionGravity : public ExternalForceContribution {
   public:
    ExternalForceContributionGravity(stk::mesh::MetaData &meta_data, double magnitude, std::array<double, 3> direction) : ExternalForceContribution(meta_data, magnitude, direction) {}
    void ComputeForce() override {
        typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
        VectorField *force_field = m_meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "force");
        VectorField *mass_field = m_meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "mass");

        VectorField &force_field_n = force_field->field_of_state(stk::mesh::StateN);
        // VectorField &force_field_np1 = force_field->field_of_state(stk::mesh::StateNP1); // TODO(jake): Do we need this? Pass in state?

        VectorField &mass_field_n = mass_field->field_of_state(stk::mesh::StateNone);
        stk::mesh::BulkData &bulk_data = m_meta_data.mesh_bulk_data();

        // Gravity vector
        std::array<double, 3> gravity;
        for (unsigned i = 0; i < 3; ++i) {
            gravity[i] = m_magnitude * m_direction[i];
        }

        // Loop over all the buckets
        // TODO(jake): Do for specific part
        for (stk::mesh::Bucket *bucket : bulk_data.buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            double *force_data_n_for_bucket = stk::mesh::field_data(force_field_n, *bucket);
            double *mass_data_n_for_bucket = stk::mesh::field_data(mass_field_n, *bucket);

            unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*force_field, *bucket);

            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Compute the gravity force
                for (unsigned i = 0; i < num_values_per_node; ++i) {
                    int iI = i_node * num_values_per_node + i;
                    force_data_n_for_bucket[iI] = gravity[i] * mass_data_n_for_bucket[iI];  // TODO: this should be +=, but we need to zero out the force field first
                }
            }
        }
    }
};

inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(std::shared_ptr<Material> material) {
    return std::make_shared<InternalForceContribution>(material);
}

inline std::shared_ptr<ExternalForceContribution> CreateExternalForceContribution(YAML::Node &load, stk::mesh::MetaData &meta_data) {
    std::string type = load["type"].as<std::string>();
    double magnitude = load["magnitude"].as<double>();
    std::array<double, 3> direction = load["direction"].as<std::array<double, 3>>();
    if (type == "traction") {
        return std::make_shared<ExternalForceContributionTraction>(meta_data, magnitude, direction);
    } else if (type == "gravity") {
        return std::make_shared<ExternalForceContributionGravity>(meta_data, magnitude, direction);
    } else {
        return nullptr;
    }
}

}  // namespace acm