#pragma once

#include <yaml-cpp/yaml.h>

#include <iostream>

namespace aperi {

/**
 * Retrieves the input schema as a YAML node.
 *
 * @return The YAML node representing the input schema.
 */
YAML::Node GetInputSchema() {
    // TODO(jake): Refactor this to be more readable. Maybe create a function for each node type.

    YAML::Node file_node;
    file_node["type"] = "string";
    file_node["description"] = "the file to write";
    file_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node file_wrapper_node;
    file_wrapper_node["file"] = file_node;

    YAML::Node time_start_node;
    time_start_node["type"] = "float";
    time_start_node["description"] = "the start time";
    YAML::Node time_start_subitems_node;
    time_start_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node time_start_wrapper_node;
    time_start_wrapper_node["time_start"] = time_start_node;

    YAML::Node time_end_node;
    time_end_node["type"] = "float";
    time_end_node["description"] = "the end time";
    YAML::Node time_end_subitems_node;
    time_end_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node time_end_wrapper_node;
    time_end_wrapper_node["time_end"] = time_end_node;

    YAML::Node time_increment_node;
    time_increment_node["type"] = "float";
    time_increment_node["description"] = "the time increment";
    YAML::Node time_increment_subitems_node;
    time_increment_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node time_increment_wrapper_node;
    time_increment_wrapper_node["time_increment"] = time_increment_node;

    YAML::Node set_node;
    set_node["type"] = "string";
    set_node["description"] = "the name of the set";
    YAML::Node set_subitems_node;
    set_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node set_wrapper_node;
    set_wrapper_node["set"] = set_node;

    YAML::Node sets_node;
    sets_node["type"] = "sequence";
    sets_node["description"] = "the name of the sets";
    YAML::Node sets_subitems_node;
    sets_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node sets_wrapper_node;
    sets_wrapper_node["sets"] = sets_node;

    YAML::Node magnitude_node;
    magnitude_node["type"] = "float";
    magnitude_node["description"] = "the magnitude of the velocity";
    YAML::Node magnitude_subitems_node;
    magnitude_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node magnitude_wrapper_node;
    magnitude_wrapper_node["magnitude"] = magnitude_node;

    YAML::Node direction_node;
    direction_node["type"] = "direction_vector";
    direction_node["description"] = "the direction of the velocity";
    YAML::Node direction_subitems_node;
    direction_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node direction_wrapper_node;
    direction_wrapper_node["direction"] = direction_node;

    YAML::Node direct_time_stepper_node;
    direct_time_stepper_node["type"] = "map";
    direct_time_stepper_node["description"] = "the direct time stepper";
    YAML::Node direct_time_stepper_subitems_node;
    direct_time_stepper_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    direct_time_stepper_subitems_node["all_of"].push_back(time_increment_wrapper_node);
    direct_time_stepper_subitems_node["all_of"].push_back(time_end_wrapper_node);
    direct_time_stepper_node["subitems"] = direct_time_stepper_subitems_node;
    YAML::Node direct_time_stepper_wrapper_node;
    direct_time_stepper_wrapper_node["direct_time_stepper"] = direct_time_stepper_node;

    YAML::Node time_stepper_node;
    time_stepper_node["type"] = "map";
    time_stepper_node["description"] = "the time stepper";
    YAML::Node time_stepper_subitems_node;
    time_stepper_subitems_node["one_of"] = YAML::Node(YAML::NodeType::Sequence);
    time_stepper_subitems_node["one_of"].push_back(direct_time_stepper_wrapper_node);
    time_stepper_node["subitems"] = time_stepper_subitems_node;
    YAML::Node time_stepper_wrapper_node;
    time_stepper_wrapper_node["time_stepper"] = time_stepper_node;

    YAML::Node output_node;
    output_node["type"] = "map";
    output_node["description"] = "the output";
    YAML::Node output_subitems_node;
    output_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    output_subitems_node["all_of"].push_back(file_wrapper_node);
    output_subitems_node["all_of"].push_back(time_end_wrapper_node);
    output_subitems_node["all_of"].push_back(time_increment_wrapper_node);
    output_subitems_node["optional"] = YAML::Node(YAML::NodeType::Sequence);
    output_subitems_node["optional"].push_back(time_start_wrapper_node);
    output_node["subitems"] = output_subitems_node;
    YAML::Node output_wrapper_node;
    output_wrapper_node["output"] = output_node;

    YAML::Node gravity_load_node;
    gravity_load_node["type"] = "map";
    gravity_load_node["description"] = "the gravity load";
    YAML::Node gravity_load_subitems_node;
    gravity_load_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    gravity_load_subitems_node["all_of"].push_back(sets_wrapper_node);
    gravity_load_subitems_node["all_of"].push_back(magnitude_wrapper_node);
    gravity_load_subitems_node["all_of"].push_back(direction_wrapper_node);
    gravity_load_node["subitems"] = gravity_load_subitems_node;
    YAML::Node gravity_load_wrapper_node;
    gravity_load_wrapper_node["gravity_load"] = gravity_load_node;

    YAML::Node loads_node;
    loads_node["type"] = "sequence";
    loads_node["description"] = "the loads";
    YAML::Node loads_subitems_node;
    loads_subitems_node["optional"] = YAML::Node(YAML::NodeType::Sequence);
    loads_subitems_node["optional"].push_back(gravity_load_wrapper_node);
    loads_node["subitems"] = loads_subitems_node;
    YAML::Node loads_wrapper_node;
    loads_wrapper_node["loads"] = loads_node;

    YAML::Node velocity_node;
    velocity_node["type"] = "map";
    velocity_node["description"] = "the velocity";
    YAML::Node velocity_subitems_node;
    velocity_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    velocity_subitems_node["all_of"].push_back(sets_wrapper_node);
    velocity_subitems_node["all_of"].push_back(magnitude_wrapper_node);
    velocity_subitems_node["all_of"].push_back(direction_wrapper_node);
    velocity_node["subitems"] = velocity_subitems_node;
    YAML::Node velocity_wrapper_node;
    velocity_wrapper_node["velocity"] = velocity_node;

    YAML::Node initial_conditions_node;
    initial_conditions_node["type"] = "sequence";
    initial_conditions_node["description"] = "the initial conditions";
    YAML::Node initial_conditions_subitems_node;
    initial_conditions_subitems_node["optional"] = YAML::Node(YAML::NodeType::Sequence);
    initial_conditions_subitems_node["optional"].push_back(velocity_wrapper_node);
    initial_conditions_node["subitems"] = initial_conditions_subitems_node;
    YAML::Node initial_conditions_wrapper_node;
    initial_conditions_wrapper_node["initial_conditions"] = initial_conditions_node;

    YAML::Node density_node;
    density_node["type"] = "float";
    density_node["description"] = "the density";
    YAML::Node density_subitems_node;
    density_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node density_wrapper_node;
    density_wrapper_node["density"] = density_node;

    YAML::Node youngs_modulus_node;
    youngs_modulus_node["type"] = "float";
    youngs_modulus_node["description"] = "the youngs modulus";
    YAML::Node youngs_modulus_subitems_node;
    youngs_modulus_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node youngs_modulus_wrapper_node;
    youngs_modulus_wrapper_node["youngs_modulus"] = youngs_modulus_node;

    YAML::Node poissons_ratio_node;
    poissons_ratio_node["type"] = "float";
    poissons_ratio_node["description"] = "the poissons ratio";
    YAML::Node poissons_ratio_subitems_node;
    poissons_ratio_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node poissons_ratio_wrapper_node;
    poissons_ratio_wrapper_node["poissons_ratio"] = poissons_ratio_node;

    YAML::Node elastic_node;
    elastic_node["type"] = "map";
    elastic_node["description"] = "the elastic material properties";
    YAML::Node elastic_subitems_node;
    elastic_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    elastic_subitems_node["all_of"].push_back(density_wrapper_node);
    elastic_subitems_node["all_of"].push_back(youngs_modulus_wrapper_node);
    elastic_subitems_node["all_of"].push_back(poissons_ratio_wrapper_node);
    elastic_node["subitems"] = elastic_subitems_node;
    YAML::Node elastic_wrapper_node;
    elastic_wrapper_node["elastic"] = elastic_node;

    YAML::Node material_node;
    material_node["type"] = "map";
    material_node["description"] = "the material";
    YAML::Node material_subitems_node;
    material_subitems_node["one_of"] = YAML::Node(YAML::NodeType::Sequence);
    material_subitems_node["one_of"].push_back(elastic_wrapper_node);
    material_node["subitems"] = material_subitems_node;
    YAML::Node material_wrapper_node;
    material_wrapper_node["material"] = material_node;

    YAML::Node part_node;
    part_node["type"] = "map";
    part_node["description"] = "a part";
    YAML::Node part_subitems_node;
    part_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    part_subitems_node["all_of"].push_back(set_wrapper_node);
    part_subitems_node["all_of"].push_back(material_wrapper_node);
    part_node["subitems"] = part_subitems_node;
    YAML::Node part_wrapper_node;
    part_wrapper_node["part"] = part_node;

    YAML::Node parts_node;
    parts_node["type"] = "sequence";
    parts_node["description"] = "the list of parts";
    YAML::Node parts_subitems_node;
    parts_subitems_node["one_or_more_of"] = YAML::Node(YAML::NodeType::Sequence);
    parts_subitems_node["one_or_more_of"].push_back(part_wrapper_node);
    parts_node["subitems"] = parts_subitems_node;
    YAML::Node parts_wrapper_node;
    parts_wrapper_node["parts"] = parts_node;

    YAML::Node mesh_node;
    mesh_node["type"] = "string";
    mesh_node["description"] = "the file containing the mesh";
    YAML::Node mesh_subitems_node;
    mesh_node["subitems"] = YAML::Node(YAML::NodeType::Null);
    YAML::Node mesh_wrapper_node;
    mesh_wrapper_node["mesh"] = mesh_node;

    YAML::Node geometry_node;
    geometry_node["type"] = "map";
    geometry_node["description"] = "the section describing the geometry";
    YAML::Node geometry_subitems_node;
    geometry_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    geometry_subitems_node["all_of"].push_back(mesh_wrapper_node);
    geometry_subitems_node["all_of"].push_back(parts_wrapper_node);
    geometry_node["subitems"] = geometry_subitems_node;
    YAML::Node geometry_wrapper_node;
    geometry_wrapper_node["geometry"] = geometry_node;

    YAML::Node explicit_dynamics_procedure_node;
    explicit_dynamics_procedure_node["type"] = "map";
    explicit_dynamics_procedure_node["description"] = "an explicit dynamics procedure";
    YAML::Node explicit_dynamics_procedure_subitems_node;
    explicit_dynamics_procedure_subitems_node["all_of"] = YAML::Node(YAML::NodeType::Sequence);
    explicit_dynamics_procedure_subitems_node["all_of"].push_back(geometry_wrapper_node);
    explicit_dynamics_procedure_subitems_node["all_of"].push_back(time_stepper_wrapper_node);
    explicit_dynamics_procedure_subitems_node["all_of"].push_back(output_wrapper_node);
    explicit_dynamics_procedure_subitems_node["optional"] = YAML::Node(YAML::NodeType::Sequence);
    explicit_dynamics_procedure_subitems_node["optional"].push_back(initial_conditions_wrapper_node);
    explicit_dynamics_procedure_subitems_node["optional"].push_back(loads_wrapper_node);
    explicit_dynamics_procedure_node["subitems"] = explicit_dynamics_procedure_subitems_node;
    YAML::Node explicit_dynamics_procedure_wrapper_node;
    explicit_dynamics_procedure_wrapper_node["explicit_dynamics_procedure"] = explicit_dynamics_procedure_node;

    YAML::Node procedures_node;
    procedures_node["type"] = "sequence";
    procedures_node["description"] = "list of procedure to complete in the analysis";
    YAML::Node procedures_subitems_node;
    procedures_subitems_node["one_or_more_of"] = YAML::Node(YAML::NodeType::Sequence);
    procedures_subitems_node["one_or_more_of"].push_back(explicit_dynamics_procedure_wrapper_node);
    procedures_node["subitems"] = procedures_subitems_node;

    YAML::Node root;
    root["procedures"] = procedures_node;

    return root;
}
}  // namespace aperi