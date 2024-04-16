#include "UnitTestUtils.h"

#include <gtest/gtest.h>

#include <filesystem>
#include <fstream>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/parallel/Parallel.hpp>
#include <string>
#include <system_error>

#include "FieldData.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "NodeProcessor.h"

YAML::Node CreateTestYaml() {
    // This is the yaml file that should be generated by the following input file:
    /*
        procedures:
          - explicit_dynamics_procedure:
                geometry:
                    mesh: one_element.exo
                    parts:
                      - part:
                            set: block_1
                            material:
                                elastic:
                                    density: 7850
                                    youngs_modulus: 2.1e11
                                    poissons_ratio: 0.3
                initial_conditions:
                  - velocity:
                        sets: [block_1]
                        vector:
                            magnitude: 1.23
                            direction: [1.4, -2.5, 2.9]
                loads:
                  - gravity_load:
                        sets: [block_1]
                        vector:
                            magnitude: -9.81
                            direction: [0,0,1]
                time_stepper:
                    direct_time_stepper:
                        time_increment: 0.1
                        time_end: 1.0
                output:
                    file: one_element_out.exo
                    time_start: 0.0
                    time_end: 1.0
                    time_increment: 0.1

    */

    YAML::Node root;
    // Create the procedures list
    YAML::Node procedures(YAML::NodeType::Sequence);

    // Create the first procedure
    YAML::Node explicit_dynamics_procedure;
    explicit_dynamics_procedure["explicit_dynamics_procedure"]["geometry"]["mesh"] = "one_element.exo";

    // Create the parts list
    YAML::Node parts(YAML::NodeType::Sequence);

    // Create the first part
    YAML::Node part;
    part["part"]["set"] = "block_1";

    // Create the material
    YAML::Node material;
    material["elastic"]["density"] = 7850;
    material["elastic"]["youngs_modulus"] = 2.1e11;
    material["elastic"]["poissons_ratio"] = 0.3;

    // Add the material to the part
    part["part"]["material"] = material;

    // Add the part to the parts list
    parts.push_back(part);

    // Add the parts list to the procedure
    explicit_dynamics_procedure["explicit_dynamics_procedure"]["geometry"]["parts"] = parts;

    // Create the initial conditions list
    YAML::Node initial_conditions(YAML::NodeType::Sequence);

    // Create the first initial condition
    YAML::Node velocity;
    velocity["velocity"]["sets"] = std::vector<std::string>{"block_1"};
    YAML::Node vector;
    vector["magnitude"] = 1.23;
    std::vector<double> direction = {1.4, -2.5, 2.9};
    aperi::Normalize(direction);  // The code will normalize the direction, but normalize it here to make the test easier to work with
    vector["direction"] = direction;
    velocity["velocity"]["vector"] = vector;

    // Add the initial condition to the list
    initial_conditions.push_back(velocity);

    explicit_dynamics_procedure["explicit_dynamics_procedure"]["initial_conditions"] = initial_conditions;

    // Create the loads list
    YAML::Node loads(YAML::NodeType::Sequence);

    // Create the first load
    YAML::Node gravity_load;
    gravity_load["gravity_load"]["sets"] = std::vector<std::string>{"block_1"};
    YAML::Node gravity_vector;
    gravity_vector["magnitude"] = -9.81;
    gravity_vector["direction"] = std::vector<double>{0.0, 0.0, 1.0};
    gravity_load["gravity_load"]["vector"] = gravity_vector;

    // Add the load to the list
    loads.push_back(gravity_load);

    explicit_dynamics_procedure["explicit_dynamics_procedure"]["loads"] = loads;

    // Create the time stepper
    YAML::Node time_stepper;
    time_stepper["direct_time_stepper"]["time_increment"] = 0.1;
    time_stepper["direct_time_stepper"]["time_end"] = 1.0;

    explicit_dynamics_procedure["explicit_dynamics_procedure"]["time_stepper"] = time_stepper;

    // Create the output section
    YAML::Node output;
    output["file"] = "one_element_out.exo";
    output["time_start"] = 0.0;
    output["time_end"] = 1.0;
    output["time_increment"] = 0.1;

    explicit_dynamics_procedure["explicit_dynamics_procedure"]["output"] = output;

    // Add the procedure to the procedures list
    procedures.push_back(explicit_dynamics_procedure);

    // Add the procedures list to the root node
    root["procedures"] = procedures;

    return root;
}

void AddBoundaryCondition(YAML::Node& root, const std::string& type, bool use_components = false) {
    // Create the boundary conditions list
    YAML::Node boundary_conditions(YAML::NodeType::Sequence);

    // Create the first boundary condition
    YAML::Node bc;
    bc[type]["sets"] = std::vector<std::string>{"block_1"};

    if (use_components) {
        // Create the components and values
        YAML::Node components_and_values;
        components_and_values["X"] = 1.23;
        components_and_values["Y"] = -4.56;
        components_and_values["Z"] = 7.89;
        bc[type]["components"] = components_and_values;
    } else {
        // Create the vector
        YAML::Node bc_vector;
        bc_vector["magnitude"] = 4.56;
        bc_vector["direction"] = std::vector<double>{0.0, 0.0, -1.0};
        bc[type]["vector"] = bc_vector;
    }

    // Create the time function
    YAML::Node time_function;

    // Add the ramp function to the boundary condition
    YAML::Node ramp_function;
    ramp_function["abscissa_values"] = std::vector<double>{0.0, 1.0};
    ramp_function["ordinate_values"] = std::vector<double>{0.0, 1.0};
    time_function["ramp_function"] = ramp_function;
    bc[type]["time_function"] = time_function;

    // Add the boundary condition to the list
    boundary_conditions.push_back(bc);

    // Add the boundary conditions list to the root node
    root["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"] = boundary_conditions;
}

void AddDisplacementBoundaryConditions(YAML::Node& root) {
    AddBoundaryCondition(root, "displacement");
}

void AddDisplacementBoundaryConditionsComponents(YAML::Node& root) {
    bool use_components = true;
    AddBoundaryCondition(root, "displacement", use_components);
}

// Add a velocity boundary condition to the input file
void AddVelocityBoundaryConditions(YAML::Node& root) {
    AddBoundaryCondition(root, "velocity");
}

void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::vector<aperi::FieldData>& field_data) {
    // Create a temporary mesh file
    CleanUp(filename);  // Remove any existing file
    // Make sure output doesn't already exist to prevent false positives
    std::ifstream before_write_file(filename);
    EXPECT_FALSE(before_write_file.good());

    // Generate a mesh
    io_mesh.ReadMesh(mesh_string, {"block_1"}, field_data);
    // std::vector<size_t> expected_owned = {8, 0, 0, 1};
    // CheckMeshCounts(*io_mesh.GetMeshData(), expected_owned);

    // Write the generated mesh
    io_mesh.CreateFieldResultsFile(filename);
    io_mesh.WriteFieldResults(0);
    std::ifstream after_write_file(filename);
    EXPECT_TRUE(after_write_file.good());
}

void CleanUp(const std::filesystem::path& filePath) {
    if (std::filesystem::exists(filePath)) {
        std::error_code ec;  // For error handling
        std::filesystem::remove(filePath, ec);
        EXPECT_FALSE(ec);
    }
}

void CheckMeshCounts(const aperi::MeshData& mesh_data, const std::vector<int>& expected_owned) {
    const stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();
    constexpr unsigned k_num_ranks = static_cast<unsigned>(stk::topology::ELEM_RANK + 1);
    std::vector<size_t> global_counts(k_num_ranks, 0);
    std::vector<size_t> min_global_counts(k_num_ranks, 0);
    std::vector<size_t> max_global_counts(k_num_ranks, 0);
    std::vector<size_t> aura_global_counts(k_num_ranks, 0);
    std::vector<size_t> shared_not_owned_counts(k_num_ranks, 0);
    // STK QUESTION: It is not super clear what this is returning.
    stk::mesh::comm_mesh_counts(bulk, global_counts, min_global_counts, max_global_counts);
    stk::mesh::Selector shared_not_owned = bulk.mesh_meta_data().globally_shared_part() & !bulk.mesh_meta_data().locally_owned_part();
    stk::mesh::count_entities(shared_not_owned, bulk, shared_not_owned_counts);
    stk::all_reduce(MPI_COMM_WORLD, stk::ReduceSum<k_num_ranks>(shared_not_owned_counts.data()));
    stk::mesh::Selector aura = bulk.mesh_meta_data().aura_part();
    stk::mesh::count_entities(aura, bulk, aura_global_counts);
    stk::all_reduce(MPI_COMM_WORLD, stk::ReduceSum<k_num_ranks>(aura_global_counts.data()));

    // TODO(jake): test in parallel and add in checks for shared-not-owned and aura
    EXPECT_EQ(global_counts.size(), 4);
    EXPECT_EQ(expected_owned.size(), 4);
    for (int i = 0, e = expected_owned.size(); i < e; ++i) {
        EXPECT_EQ(global_counts[i], expected_owned[i]);
    }
}

// Check that the nodal field values match the expected values
// Expects a uniform field, values for every node are the same
void CheckNodeFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values, aperi::FieldQueryState field_query_state) {
    std::array<aperi::FieldQueryData, 1> field_query_data_array = {{field_name, field_query_state}};

    // Make a node processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::NodeProcessor<1> node_processor_stk_ngp(field_query_data_array, mesh_data_ptr, set_names);

    bool found_at_least_one_node = false;

    // Get the sum of the field values
    node_processor_stk_ngp.for_each_node_host([&](size_t i_node_start, std::array<double*, 1>& field_data) {
        for (size_t i = 0; i < 3; i++) {
            found_at_least_one_node = true;
            if (std::abs(expected_values[i]) < 1.0e-12) {
                EXPECT_NEAR(field_data[0][i_node_start + i], expected_values[i], 1.0e-12) << "Field " << field_name << " value at node " << i_node_start << " dof " << i << " is incorrect";
            } else {
                EXPECT_NEAR(field_data[0][i_node_start + i], expected_values[i], std::abs(1.0e-12 * expected_values[i])) << "Field " << field_name << " value at node " << i_node_start << " dof " << i << " is incorrect";
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_node);
}
void CheckNodeFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values) {
    // Field Query Data
    aperi::FieldQueryState field_query_state = field_name == "mass" ? aperi::FieldQueryState::None : aperi::FieldQueryState::N;
    CheckNodeFieldValues(mesh_data, set_names, field_name, expected_values, field_query_state);
}

// Check that the sum of the nodal field values match the expected values
void CheckNodeFieldSum(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values) {
    // Field Query Data
    aperi::FieldQueryState field_query_state = field_name == "mass" ? aperi::FieldQueryState::None : aperi::FieldQueryState::N;
    std::array<aperi::FieldQueryData, 1> field_query_data = {{field_name, field_query_state}};

    // Make a node processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::NodeProcessor<1> node_processor(field_query_data, mesh_data_ptr, set_names);

    // Get the sum of the field values
    std::array<double, 3> sum_values_local = {0.0, 0.0, 0.0};
    node_processor.for_each_owned_node_host([&](size_t i_node_start, std::array<double*, 1>& field_data) {
        for (size_t i = 0; i < 3; i++) {
            sum_values_local[i] += field_data[0][i_node_start + i];
        }
    });

    // Parallel sum
    std::array<double, 3> sum_values_global = {0.0, 0.0, 0.0};
    MPI_Allreduce(sum_values_local.data(), sum_values_global.data(), 3, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

    for (size_t i = 0; i < 3; i++) {
        if (std::abs(expected_values[i]) < 1.0e-12) {
            EXPECT_NEAR(sum_values_global[i], expected_values[i], 1.0e-12) << "Field " << field_name << " sum of values is incorrect for component " << i << std::endl;
        } else {
            EXPECT_NEAR(sum_values_global[i], expected_values[i], std::abs(1.0e-12 * expected_values[i])) << "Field " << field_name << " sum of values is incorrect for component " << i << std::endl;
        }
    }
}

Eigen::Vector3d GetExpectedPatchValues(const Eigen::Vector3d& center_of_mass, const Eigen::Vector3d coordinates, const Eigen::Matrix3d& field_gradients) {
    return field_gradients * (coordinates - center_of_mass);
}

void CheckNodeFieldPatchValues(const aperi::MeshData& mesh_data, const std::string& field_name, const Eigen::Vector3d& center_of_mass, const Eigen::Matrix3d& field_gradients, aperi::FieldQueryState field_query_state) {
    std::array<aperi::FieldQueryData, 2> field_query_data_array;
    field_query_data_array[0] = {field_name, field_query_state};
    field_query_data_array[1] = {mesh_data.GetCoordinatesFieldName(), aperi::FieldQueryState::None};

    // Make a node processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::NodeProcessor<2> node_processor_stk_ngp(field_query_data_array, mesh_data_ptr);

    bool found_at_least_one_node = false;

    // Get the sum of the field values
    node_processor_stk_ngp.for_each_owned_node_host([&](size_t i_node_start, std::array<double*, 2>& field_data) {
        found_at_least_one_node = true;
        Eigen::Vector3d coordinates = {field_data[1][i_node_start], field_data[1][i_node_start + 1], field_data[1][i_node_start + 2]};
        Eigen::Vector3d expected_values = GetExpectedPatchValues(center_of_mass, coordinates, field_gradients);
        for (size_t i = 0; i < 3; i++) {
            if (std::abs(expected_values(i)) < 1.0e-12) {
                EXPECT_NEAR(field_data[0][i_node_start + i], expected_values(i), 1.0e-12) << "Field " << field_name << " value at node " << i_node_start << " dof " << i << " is incorrect";
            } else {
                EXPECT_NEAR(field_data[0][i_node_start + i], expected_values(i), std::abs(1.0e-12 * expected_values(i))) << "Field " << field_name << " value at node " << i_node_start << " dof " << i << " is incorrect";
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_node);
}