#pragma once

#include <yaml-cpp/yaml.h>

#include <iostream>

namespace aperi {

/**
 * @class InputSchema
 * @brief Class for creating input schemas in YAML format.
 *
 * This class provides methods for creating input schemas in YAML format.
 */
class InputSchema {
   public:
    /**
     * @brief Constructs an InputSchema object.
     *
     * @param name The name of the input.
     * @param type The type of the input.
     * @param description The description of the input.
     */
    InputSchema(std::string name, std::string type, std::string description)
        : m_name(name), m_type(type), m_description(description) {
        m_subitems = YAML::Node(YAML::NodeType::Null);
    }

    ~InputSchema() = default;

    /**
     * @brief Adds a condition to the input schema.
     *
     * @param condition_name The name of the condition.
     * @param condition_node The YAML node representing the condition.
     */
    void AddCondition(const std::string& condition_name, const YAML::Node& condition_node) {
        // Check if m_subitems has a key condition_name
        if (m_subitems[condition_name]) {
            // If it does, append the new node to the sequence
            m_subitems[condition_name].push_back(condition_node);
        } else {
            // If it doesn't, create a new sequence and add the new node
            m_subitems[condition_name] = YAML::Node(YAML::NodeType::Sequence);
            m_subitems[condition_name].push_back(condition_node);
        }
    }

    /**
     * @brief Adds an all_of condition to the input schema.
     *
     * @param all_of_node The YAML node representing the all_of condition.
     */
    void AddAllOf(const YAML::Node& all_of_node) {
        AddCondition("all_of", all_of_node);
    }

    /**
     * @brief Adds an any_of condition to the input schema.
     *
     * @param any_of_node The YAML node representing the any_of condition.
     */
    void AddOneOf(const YAML::Node& one_of_node) {
        AddCondition("one_of", one_of_node);
    }

    /**
     * @brief Adds an optional condition to the input schema.
     *
     * @param optional_node The YAML node representing the optional condition.
     */
    void AddOptional(const YAML::Node& optional_node) {
        AddCondition("optional", optional_node);
    }

    /**
     * @brief Adds a one_or_more_of condition to the input schema.
     *
     * @param one_or_more_of_node The YAML node representing the one_or_more_of condition.
     */
    void AddOneOrMoreOf(const YAML::Node& one_or_more_of_node) {
        AddCondition("one_or_more_of", one_or_more_of_node);
    }

    /**
     * @brief Creates the input schema as a YAML node.
     * @return The YAML node representing the input schema.
     */
    YAML::Node GetInputSchema() {
        YAML::Node node;
        node["type"] = m_type;
        node["description"] = m_description;
        node["subitems"] = m_subitems;
        YAML::Node wrapper_node;
        wrapper_node[m_name] = node;
        return wrapper_node;
    }

   private:
    std::string m_name;         // The name of the input
    std::string m_type;         // The type of the input
    std::string m_description;  // The description of the input
    YAML::Node m_subitems;      // The subitems of the input
};

/**
 * Retrieves the full input schema as a YAML node.
 *
 * @return The YAML node representing the input schema.
 */
YAML::Node GetInputSchema() {
    aperi::InputSchema file_schema("file", "string", "the file to write");
    YAML::Node file_node = file_schema.GetInputSchema();

    aperi::InputSchema time_start_schema("time_start", "float", "the start time");
    YAML::Node time_start_node = time_start_schema.GetInputSchema();

    aperi::InputSchema time_end_schema("time_end", "float", "the end time");
    YAML::Node time_end_node = time_end_schema.GetInputSchema();

    aperi::InputSchema time_increment_schema("time_increment", "float", "the time increment");
    YAML::Node time_increment_node = time_increment_schema.GetInputSchema();

    aperi::InputSchema set_schema("set", "string", "the name of the set");
    YAML::Node set_node = set_schema.GetInputSchema();

    aperi::InputSchema sets_schema("sets", "sequence", "the name of the sets");
    YAML::Node sets_node = sets_schema.GetInputSchema();

    aperi::InputSchema magnitude_schema("magnitude", "float", "the magnitude of the vector");
    YAML::Node magnitude_node = magnitude_schema.GetInputSchema();

    aperi::InputSchema direction_schema("direction", "direction_vector", "the direction of the vector");
    YAML::Node direction_node = direction_schema.GetInputSchema();

    aperi::InputSchema vector_schema("vector", "map", "the vector");
    vector_schema.AddAllOf(magnitude_node);
    vector_schema.AddAllOf(direction_node);
    YAML::Node vector_node = vector_schema.GetInputSchema();

    aperi::InputSchema x_component_schema("X", "float", "the x component value");
    YAML::Node x_component_node = x_component_schema.GetInputSchema();

    aperi::InputSchema y_component_schema("Y", "float", "the y component value");
    YAML::Node y_component_node = y_component_schema.GetInputSchema();

    aperi::InputSchema z_component_schema("Z", "float", "the z component value");
    YAML::Node z_component_node = z_component_schema.GetInputSchema();

    aperi::InputSchema components_schema("components", "map", "the components");
    components_schema.AddOneOrMoreOf(x_component_node);
    components_schema.AddOneOrMoreOf(y_component_node);
    components_schema.AddOneOrMoreOf(z_component_node);
    YAML::Node components_node = components_schema.GetInputSchema();

    aperi::InputSchema direct_time_stepper_schema("direct_time_stepper", "map", "the direct time stepper");
    direct_time_stepper_schema.AddAllOf(time_increment_node);
    direct_time_stepper_schema.AddAllOf(time_end_node);
    YAML::Node direct_time_stepper_node = direct_time_stepper_schema.GetInputSchema();

    aperi::InputSchema time_stepper_schema("time_stepper", "map", "the time stepper");
    time_stepper_schema.AddOneOf(direct_time_stepper_node);
    YAML::Node time_stepper_node = time_stepper_schema.GetInputSchema();

    aperi::InputSchema output_schema("output", "map", "the output");
    output_schema.AddAllOf(file_node);
    output_schema.AddAllOf(time_end_node);
    output_schema.AddAllOf(time_increment_node);
    output_schema.AddOptional(time_start_node);
    YAML::Node output_node = output_schema.GetInputSchema();

    aperi::InputSchema gravity_load_schema("gravity_load", "map", "the gravity load");
    gravity_load_schema.AddAllOf(sets_node);
    gravity_load_schema.AddOneOf(vector_node);
    gravity_load_schema.AddOneOf(components_node);
    YAML::Node gravity_load_node = gravity_load_schema.GetInputSchema();

    aperi::InputSchema loads_schema("loads", "sequence", "the loads");
    loads_schema.AddOneOrMoreOf(gravity_load_node);
    YAML::Node loads_node = loads_schema.GetInputSchema();

    aperi::InputSchema initial_velocity_schema("velocity", "map", "the initial velocity");
    initial_velocity_schema.AddAllOf(sets_node);
    initial_velocity_schema.AddOneOf(vector_node);
    initial_velocity_schema.AddOneOf(components_node);
    YAML::Node initial_velocity_node = initial_velocity_schema.GetInputSchema();

    aperi::InputSchema initial_conditions_schema("initial_conditions", "sequence", "the initial conditions");
    initial_conditions_schema.AddOptional(initial_velocity_node);
    YAML::Node initial_conditions_node = initial_conditions_schema.GetInputSchema();

    // Abscissa values node
    aperi::InputSchema abscissa_values_schema("abscissa_values", "float_vector", "the abscissa values");
    YAML::Node abscissa_values_node = abscissa_values_schema.GetInputSchema();

    // Ordinate values node
    aperi::InputSchema ordinate_values_schema("ordinate_values", "float_vector", "the ordinate values");
    YAML::Node ordinate_values_node = ordinate_values_schema.GetInputSchema();

    // Ramp function node
    aperi::InputSchema ramp_function_schema("ramp_function", "map", "a piecewise linear function");
    ramp_function_schema.AddAllOf(abscissa_values_node);
    ramp_function_schema.AddAllOf(ordinate_values_node);
    YAML::Node ramp_function_node = ramp_function_schema.GetInputSchema();

    // Time function node
    aperi::InputSchema time_function_schema("time_function", "map", "a time function");
    time_function_schema.AddOneOf(ramp_function_node);
    YAML::Node time_function_node = time_function_schema.GetInputSchema();

    // Specified velocity node
    aperi::InputSchema specified_velocity_schema("velocity", "map", "a velocity boundary condition");
    specified_velocity_schema.AddAllOf(sets_node);
    specified_velocity_schema.AddAllOf(vector_node);
    specified_velocity_schema.AddOneOf(time_function_node);
    YAML::Node specified_velocity_node = specified_velocity_schema.GetInputSchema();

    // Specified displacement node
    aperi::InputSchema specified_displacement_schema("displacement", "map", "a displacement boundary condition");
    specified_displacement_schema.AddAllOf(sets_node);
    specified_displacement_schema.AddAllOf(vector_node);
    specified_displacement_schema.AddOneOf(time_function_node);
    YAML::Node specified_displacement_node = specified_displacement_schema.GetInputSchema();

    // Boundary conditions node
    aperi::InputSchema boundary_conditions_schema("boundary_conditions", "sequence", "the boundary conditions");
    boundary_conditions_schema.AddOneOrMoreOf(specified_velocity_node);
    boundary_conditions_schema.AddOneOrMoreOf(specified_displacement_node);
    YAML::Node boundary_conditions_node = boundary_conditions_schema.GetInputSchema();

    // Density node
    aperi::InputSchema density_schema("density", "float", "the density");
    YAML::Node density_node = density_schema.GetInputSchema();

    // Young's modulus node
    aperi::InputSchema youngs_modulus_schema("youngs_modulus", "float", "the youngs modulus");
    YAML::Node youngs_modulus_node = youngs_modulus_schema.GetInputSchema();

    // Poisson's ratio node
    aperi::InputSchema poissons_ratio_schema("poissons_ratio", "float", "the poissons ratio");
    YAML::Node poissons_ratio_node = poissons_ratio_schema.GetInputSchema();

    // Elastic material properties node
    aperi::InputSchema elastic_schema("elastic", "map", "the elastic material properties");
    elastic_schema.AddAllOf(density_node);
    elastic_schema.AddAllOf(youngs_modulus_node);
    elastic_schema.AddAllOf(poissons_ratio_node);
    YAML::Node elastic_node = elastic_schema.GetInputSchema();

    // Material node
    aperi::InputSchema material_schema("material", "map", "the material");
    material_schema.AddOneOf(elastic_node);
    YAML::Node material_node = material_schema.GetInputSchema();

    // Part node
    aperi::InputSchema part_schema("part", "map", "a part");
    part_schema.AddAllOf(set_node);
    part_schema.AddAllOf(material_node);
    YAML::Node part_node = part_schema.GetInputSchema();

    // Parts node
    aperi::InputSchema parts_schema("parts", "sequence", "the list of parts");
    parts_schema.AddOneOrMoreOf(part_node);
    YAML::Node parts_node = parts_schema.GetInputSchema();

    // Mesh node
    aperi::InputSchema mesh_schema("mesh", "string", "the file containing the mesh");
    YAML::Node mesh_node = mesh_schema.GetInputSchema();

    // Geometry node
    aperi::InputSchema geometry_schema("geometry", "map", "the section describing the geometry");
    geometry_schema.AddAllOf(mesh_node);
    geometry_schema.AddAllOf(parts_node);
    YAML::Node geometry_node = geometry_schema.GetInputSchema();

    // Explicit dynamics procedure node
    aperi::InputSchema explicit_dynamics_procedure_schema("explicit_dynamics_procedure", "map", "an explicit dynamics procedure");
    explicit_dynamics_procedure_schema.AddAllOf(geometry_node);
    explicit_dynamics_procedure_schema.AddAllOf(time_stepper_node);
    explicit_dynamics_procedure_schema.AddAllOf(output_node);
    explicit_dynamics_procedure_schema.AddOptional(initial_conditions_node);
    explicit_dynamics_procedure_schema.AddOptional(boundary_conditions_node);
    explicit_dynamics_procedure_schema.AddOptional(loads_node);
    YAML::Node explicit_dynamics_procedure_node = explicit_dynamics_procedure_schema.GetInputSchema();

    // Procedures node
    aperi::InputSchema procedures_schema("procedures", "sequence", "the list of procedures");
    procedures_schema.AddOneOrMoreOf(explicit_dynamics_procedure_node);
    YAML::Node procedures_node = procedures_schema.GetInputSchema();

    return procedures_node;
}
}  // namespace aperi
