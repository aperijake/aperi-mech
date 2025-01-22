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
     * @param index The index of the condition.
     */
    void AddCondition(const std::string& condition_name, const YAML::Node& condition_node, int index) {
        // Check if m_subitems has a key condition_name
        if (m_subitems[condition_name]) {
            // Check the length of the sequence
            int max_index = m_subitems[condition_name].size() - 1;
            if (max_index >= index) {  // If the index already exists, add the new node to the sequence
                m_subitems[condition_name][index]["set"].push_back(condition_node);
            } else if (index > max_index + 1) {  // If the index is out of range (more than 1 above current size), throw an error
                throw std::runtime_error("Condition index out of range. Index: " + std::to_string(index) + ". Max index: " + std::to_string(max_index) + ". File: " + __FILE__ + ". Function: " + __FUNCTION__ + ". Line: " + std::to_string(__LINE__));
            } else {  // If the index is 1 above the current size, create a new sequence and add the new node
                YAML::Node set(YAML::NodeType::Map);
                set["set"] = YAML::Node(YAML::NodeType::Sequence);
                set["set"].push_back(condition_node);
                m_subitems[condition_name].push_back(set);
            }
        } else {
            // If it doesn't, create a new sequence and add the new node
            if (index != 0) {
                throw std::runtime_error("Index must be 0 for non-existing condition. Index: " + std::to_string(index) + ". File: " + __FILE__ + ". Function: " + __FUNCTION__ + ". Line: " + std::to_string(__LINE__));
            }
            m_subitems[condition_name] = YAML::Node(YAML::NodeType::Sequence);
            YAML::Node set(YAML::NodeType::Map);
            set["set"] = YAML::Node(YAML::NodeType::Sequence);
            set["set"].push_back(condition_node);
            m_subitems[condition_name].push_back(set);
        }
    }

    /**
     * @brief Adds an all_of condition to the input schema.
     *
     * @param all_of_node The YAML node representing the all_of condition.
     * @param index The index of the condition.
     */
    void AddAllOf(const YAML::Node& all_of_node, int index = 0) {
        AddCondition("all_of", all_of_node, index);
    }

    /**
     * @brief Adds an any_of condition to the input schema.
     *
     * @param any_of_node The YAML node representing the any_of condition.
     * @param index The index of the condition.
     */
    void AddOneOf(const YAML::Node& one_of_node, int index = 0) {
        AddCondition("one_of", one_of_node, index);
    }

    /**
     * @brief Adds an optional condition to the input schema.
     *
     * @param optional_node The YAML node representing the optional condition.
     * @param index The index of the condition.
     */
    void AddOptional(const YAML::Node& optional_node, int index = 0) {
        AddCondition("optional", optional_node, index);
    }

    /**
     * @brief Adds a one_or_more_of condition to the input schema.
     *
     * @param one_or_more_of_node The YAML node representing the one_or_more_of condition.
     * @param index The index of the condition.
     */
    void AddOneOrMoreOf(const YAML::Node& one_or_more_of_node, int index = 0) {
        AddCondition("one_or_more_of", one_or_more_of_node, index);
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
    // File node
    aperi::InputSchema file_schema("file", "string", "the file to write");
    YAML::Node file_node = file_schema.GetInputSchema();

    // Time start node
    aperi::InputSchema time_start_schema("time_start", "float", "the start time");
    YAML::Node time_start_node = time_start_schema.GetInputSchema();

    // Time end node
    aperi::InputSchema time_end_schema("time_end", "float", "the end time");
    YAML::Node time_end_node = time_end_schema.GetInputSchema();

    // Time increment node
    aperi::InputSchema time_increment_schema("time_increment", "float", "the time increment");
    YAML::Node time_increment_node = time_increment_schema.GetInputSchema();

    // Scale factor node
    aperi::InputSchema scale_factor_schema("scale_factor", "float", "the scale factor");
    YAML::Node scale_factor_node = scale_factor_schema.GetInputSchema();

    // Update interval node
    aperi::InputSchema update_interval_schema("update_interval", "int", "the update interval");
    YAML::Node update_interval_node = update_interval_schema.GetInputSchema();

    // Set node
    aperi::InputSchema set_schema("set", "string", "the name of the set");
    YAML::Node set_node = set_schema.GetInputSchema();

    // Sets node
    aperi::InputSchema sets_schema("sets", "sequence", "the name of the sets");
    YAML::Node sets_node = sets_schema.GetInputSchema();

    // Magnitude node
    aperi::InputSchema magnitude_schema("magnitude", "float", "the magnitude of the vector");
    YAML::Node magnitude_node = magnitude_schema.GetInputSchema();

    // Direction node
    aperi::InputSchema direction_schema("direction", "direction_vector", "the direction of the vector");
    YAML::Node direction_node = direction_schema.GetInputSchema();

    // Vector node
    aperi::InputSchema vector_schema("vector", "map", "the vector");
    vector_schema.AddAllOf(magnitude_node);
    vector_schema.AddAllOf(direction_node);
    YAML::Node vector_node = vector_schema.GetInputSchema();

    // X component node
    aperi::InputSchema x_component_schema("X", "float", "the x component value");
    YAML::Node x_component_node = x_component_schema.GetInputSchema();

    // Y component node
    aperi::InputSchema y_component_schema("Y", "float", "the y component value");
    YAML::Node y_component_node = y_component_schema.GetInputSchema();

    // Z component node
    aperi::InputSchema z_component_schema("Z", "float", "the z component value");
    YAML::Node z_component_node = z_component_schema.GetInputSchema();

    // Components node
    aperi::InputSchema components_schema("components", "map", "the components");
    components_schema.AddOneOrMoreOf(x_component_node);
    components_schema.AddOneOrMoreOf(y_component_node);
    components_schema.AddOneOrMoreOf(z_component_node);
    YAML::Node components_node = components_schema.GetInputSchema();

    // Direct time stepper node
    aperi::InputSchema direct_time_stepper_schema("direct_time_stepper", "map", "the direct time stepper");
    direct_time_stepper_schema.AddAllOf(time_increment_node);
    direct_time_stepper_schema.AddAllOf(time_end_node);
    YAML::Node direct_time_stepper_node = direct_time_stepper_schema.GetInputSchema();

    // Power method time stepper node
    aperi::InputSchema power_method_time_stepper_schema("power_method_time_stepper", "map", "the power method time stepper");
    power_method_time_stepper_schema.AddAllOf(time_end_node);
    power_method_time_stepper_schema.AddAllOf(scale_factor_node);
    power_method_time_stepper_schema.AddAllOf(update_interval_node);
    YAML::Node power_method_time_stepper_node = power_method_time_stepper_schema.GetInputSchema();

    // Time stepper node
    aperi::InputSchema time_stepper_schema("time_stepper", "map", "the time stepper");
    time_stepper_schema.AddOneOf(direct_time_stepper_node);
    time_stepper_schema.AddOneOf(power_method_time_stepper_node);
    YAML::Node time_stepper_node = time_stepper_schema.GetInputSchema();

    // Output coefficients
    aperi::InputSchema output_coefficients_schema("output_coefficients", "bool", "indicates whether to output coefficients");
    YAML::Node output_coefficients_node = output_coefficients_schema.GetInputSchema();

    // Output node
    aperi::InputSchema output_schema("output", "map", "the output");
    output_schema.AddAllOf(file_node);
    output_schema.AddAllOf(time_end_node);
    output_schema.AddAllOf(time_increment_node);
    output_schema.AddOptional(time_start_node);
    output_schema.AddOptional(output_coefficients_node);
    YAML::Node output_node = output_schema.GetInputSchema();

    // Gravity load node
    aperi::InputSchema gravity_load_schema("gravity_load", "map", "the gravity load");
    gravity_load_schema.AddAllOf(sets_node);
    gravity_load_schema.AddOneOf(vector_node);
    gravity_load_schema.AddOneOf(components_node);
    YAML::Node gravity_load_node = gravity_load_schema.GetInputSchema();

    // Loads node
    aperi::InputSchema loads_schema("loads", "sequence", "the loads");
    loads_schema.AddOneOrMoreOf(gravity_load_node);
    YAML::Node loads_node = loads_schema.GetInputSchema();

    // Initial velocity node
    aperi::InputSchema initial_velocity_schema("velocity", "map", "the initial velocity");
    initial_velocity_schema.AddAllOf(sets_node);
    initial_velocity_schema.AddOneOf(vector_node);
    initial_velocity_schema.AddOneOf(components_node);
    YAML::Node initial_velocity_node = initial_velocity_schema.GetInputSchema();

    // Initial conditions node
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

    // Smooth step function node
    aperi::InputSchema smooth_step_function_schema("smooth_step_function", "map", "a smooth step function");
    smooth_step_function_schema.AddAllOf(abscissa_values_node);
    smooth_step_function_schema.AddAllOf(ordinate_values_node);
    YAML::Node smooth_step_function_node = smooth_step_function_schema.GetInputSchema();

    // Time function node
    aperi::InputSchema time_function_schema("time_function", "map", "a time function");
    time_function_schema.AddOneOf(ramp_function_node);
    time_function_schema.AddOneOf(smooth_step_function_node);
    YAML::Node time_function_node = time_function_schema.GetInputSchema();

    // Specified velocity node
    aperi::InputSchema specified_velocity_schema("velocity", "map", "a velocity boundary condition");
    specified_velocity_schema.AddAllOf(sets_node);
    specified_velocity_schema.AddOneOf(time_function_node);
    specified_velocity_schema.AddOneOf(vector_node, 1);  // New OneOf set
    specified_velocity_schema.AddOneOf(components_node, 1);
    YAML::Node specified_velocity_node = specified_velocity_schema.GetInputSchema();

    // Specified displacement node
    aperi::InputSchema specified_displacement_schema("displacement", "map", "a displacement boundary condition");
    specified_displacement_schema.AddAllOf(sets_node);
    specified_displacement_schema.AddOneOf(time_function_node);
    specified_displacement_schema.AddOneOf(vector_node, 1);  // New OneOf set
    specified_displacement_schema.AddOneOf(components_node, 1);
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

    // Yield stress node
    aperi::InputSchema yield_stress_schema("yield_stress", "float", "the yield stress");
    YAML::Node yield_stress_node = yield_stress_schema.GetInputSchema();

    // Hardening modulus node
    aperi::InputSchema hardening_modulus_schema("hardening_modulus", "float", "the hardening modulus");
    YAML::Node hardening_modulus_node = hardening_modulus_schema.GetInputSchema();

    // Linear elastic material properties node (small strain)
    aperi::InputSchema linear_elastic_schema("linear_elastic", "map", "the elastic material properties for the small strain model");
    linear_elastic_schema.AddAllOf(density_node);
    linear_elastic_schema.AddAllOf(youngs_modulus_node);
    linear_elastic_schema.AddAllOf(poissons_ratio_node);
    YAML::Node linear_elastic_node = linear_elastic_schema.GetInputSchema();

    // Elastic material properties node (St. Venant-Kirchhoff)
    aperi::InputSchema elastic_schema("elastic", "map", "the elastic material properties for the St. Venant-Kirchhoff model");
    elastic_schema.AddAllOf(density_node);
    elastic_schema.AddAllOf(youngs_modulus_node);
    elastic_schema.AddAllOf(poissons_ratio_node);
    YAML::Node elastic_node = elastic_schema.GetInputSchema();

    // Neo-Hookean material properties node
    aperi::InputSchema neo_hookean_schema("neo_hookean", "map", "the neo-Hookean material properties");
    neo_hookean_schema.AddAllOf(density_node);
    neo_hookean_schema.AddAllOf(youngs_modulus_node);
    neo_hookean_schema.AddAllOf(poissons_ratio_node);
    YAML::Node neo_hookean_node = neo_hookean_schema.GetInputSchema();

    // Plastic material properties node
    aperi::InputSchema plastic_schema("plastic", "map", "the plastic material properties");
    plastic_schema.AddAllOf(density_node);
    plastic_schema.AddAllOf(youngs_modulus_node);
    plastic_schema.AddAllOf(poissons_ratio_node);
    YAML::Node plastic_node = plastic_schema.GetInputSchema();

    // Material node
    aperi::InputSchema material_schema("material", "map", "the material");
    material_schema.AddOneOf(linear_elastic_node);
    material_schema.AddOneOf(elastic_node);
    material_schema.AddOneOf(neo_hookean_node);
    material_schema.AddOneOf(plastic_node);
    YAML::Node material_node = material_schema.GetInputSchema();

    // Integration order node
    aperi::InputSchema integration_order_schema("integration_order", "int", "the integration order");
    YAML::Node integration_order_node = integration_order_schema.GetInputSchema();

    // Gauss quadrature node
    aperi::InputSchema gauss_quadrature_schema("gauss_quadrature", "map", "gauss quadrature");
    gauss_quadrature_schema.AddAllOf(integration_order_node);
    YAML::Node gauss_quadrature_node = gauss_quadrature_schema.GetInputSchema();

    // Subdomains node
    aperi::InputSchema subdomains_schema("subdomains", "int", "the number of smoothing cell subdomains");
    YAML::Node subdomains_node = subdomains_schema.GetInputSchema();

    // Force one pass method node
    aperi::InputSchema force_one_pass_method_schema("force_one_pass_method", "bool", "force the one pass method");
    YAML::Node force_one_pass_method_node = force_one_pass_method_schema.GetInputSchema();

    // Force two pass method node
    aperi::InputSchema force_two_pass_method_schema("force_two_pass_method", "bool", "force the two pass method");
    YAML::Node force_two_pass_method_node = force_two_pass_method_schema.GetInputSchema();

    // Nodal smoothing cell node
    aperi::InputSchema nodal_smoothing_cell_schema("nodal_smoothing_cell", "map", "a nodal smoothing cell");
    nodal_smoothing_cell_schema.AddAllOf(subdomains_node);
    YAML::Node nodal_smoothing_cell_node = nodal_smoothing_cell_schema.GetInputSchema();

    // Element smoothing cell node
    aperi::InputSchema element_smoothing_cell_schema("element_smoothing_cell", "map", "an element smoothing cell");
    element_smoothing_cell_schema.AddAllOf(subdomains_node);
    YAML::Node element_smoothing_cell_node = element_smoothing_cell_schema.GetInputSchema();

    // Strain smoothing node
    aperi::InputSchema strain_smoothing_schema("strain_smoothing", "map", "strain smoothing");
    strain_smoothing_schema.AddOneOf(nodal_smoothing_cell_node);
    strain_smoothing_schema.AddOneOf(element_smoothing_cell_node);
    strain_smoothing_schema.AddOptional(force_one_pass_method_node);
    strain_smoothing_schema.AddOptional(force_two_pass_method_node);
    YAML::Node strain_smoothing_node = strain_smoothing_schema.GetInputSchema();

    // Integration scheme node
    aperi::InputSchema integration_scheme_schema("integration_scheme", "map", "the integration scheme");
    integration_scheme_schema.AddOneOf(gauss_quadrature_node);
    integration_scheme_schema.AddOneOf(strain_smoothing_node);
    YAML::Node integration_scheme_node = integration_scheme_schema.GetInputSchema();

    // Finite element node
    aperi::InputSchema finite_element_schema("finite_element", "map", "finite element approximation");
    YAML::Node finite_element_node = finite_element_schema.GetInputSchema();

    // Kernel radius scale factor node
    aperi::InputSchema kernel_radius_scale_factor_schema("kernel_radius_scale_factor", "float", "the kernel radius scale factor");
    YAML::Node kernel_radius_scale_factor_node = kernel_radius_scale_factor_schema.GetInputSchema();

    // Reproducing kernel node
    aperi::InputSchema reproducing_kernel_schema("reproducing_kernel", "map", "reproducing kernel approximation");
    reproducing_kernel_schema.AddAllOf(kernel_radius_scale_factor_node);
    YAML::Node reproducing_kernel_node = reproducing_kernel_schema.GetInputSchema();

    // Approximation space
    aperi::InputSchema approximation_space_schema("approximation_space", "map", "the approximation space");
    approximation_space_schema.AddOneOf(finite_element_node);
    approximation_space_schema.AddOneOf(reproducing_kernel_node);
    YAML::Node approximation_space_node = approximation_space_schema.GetInputSchema();

    // Formulation node
    aperi::InputSchema formulation_schema("formulation", "map", "the formulation");
    formulation_schema.AddAllOf(integration_scheme_node);
    formulation_schema.AddAllOf(approximation_space_node);
    YAML::Node formulation_node = formulation_schema.GetInputSchema();

    // Part node
    aperi::InputSchema part_schema("part", "map", "a part");
    part_schema.AddAllOf(set_node);
    part_schema.AddAllOf(material_node);
    part_schema.AddOptional(formulation_node);
    YAML::Node part_node = part_schema.GetInputSchema();

    // Parts node
    aperi::InputSchema parts_schema("parts", "sequence", "the list of parts");
    parts_schema.AddOneOrMoreOf(part_node);
    YAML::Node parts_node = parts_schema.GetInputSchema();

    // Mesh node
    aperi::InputSchema mesh_schema("mesh", "string", "the file containing the mesh");
    YAML::Node mesh_node = mesh_schema.GetInputSchema();

    // Mesh search directories node
    aperi::InputSchema mesh_search_directories_schema("mesh_search_directories", "sequence", "the list of directories to search for the mesh");
    YAML::Node mesh_search_directories_node = mesh_search_directories_schema.GetInputSchema();

    // Geometry node
    aperi::InputSchema geometry_schema("geometry", "map", "the section describing the geometry");
    geometry_schema.AddAllOf(mesh_node);
    geometry_schema.AddAllOf(parts_node);
    geometry_schema.AddOptional(mesh_search_directories_node);
    YAML::Node geometry_node = geometry_schema.GetInputSchema();

    // Incremental node
    aperi::InputSchema incremental_schema("incremental_formulation", "bool", "indicates whether to use incremental formulation");
    YAML::Node incremental_node = incremental_schema.GetInputSchema();

    // Explicit dynamics procedure node
    aperi::InputSchema explicit_dynamics_procedure_schema("explicit_dynamics_procedure", "map", "an explicit dynamics procedure");
    explicit_dynamics_procedure_schema.AddAllOf(geometry_node);
    explicit_dynamics_procedure_schema.AddAllOf(time_stepper_node);
    explicit_dynamics_procedure_schema.AddAllOf(output_node);
    explicit_dynamics_procedure_schema.AddOptional(initial_conditions_node);
    explicit_dynamics_procedure_schema.AddOptional(boundary_conditions_node);
    explicit_dynamics_procedure_schema.AddOptional(loads_node);
    explicit_dynamics_procedure_schema.AddOptional(incremental_node);
    YAML::Node explicit_dynamics_procedure_node = explicit_dynamics_procedure_schema.GetInputSchema();

    // Procedures node
    aperi::InputSchema procedures_schema("procedures", "sequence", "the list of procedures");
    procedures_schema.AddOneOrMoreOf(explicit_dynamics_procedure_node);
    YAML::Node procedures_node = procedures_schema.GetInputSchema();

    return procedures_node;
}
}  // namespace aperi
