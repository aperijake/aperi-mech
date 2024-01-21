#include "UnitTestUtils.h"

#include <gtest/gtest.h>

#include <filesystem>
#include <fstream>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/parallel/Parallel.hpp>
#include <string>
#include <system_error>

#include "IoInputFile.h"
#include "IoMesh.h"

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
                        magnitude: 1.23
                        direction: [1,0,0]
                loads:
                  - gravity_load:
                        sets: [block_1]
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
    velocity["velocity"]["magnitude"] = 1.23;
    velocity["velocity"]["direction"] = std::vector<double>{1.0, 0.0, 0.0};

    // Add the initial condition to the list
    initial_conditions.push_back(velocity);

    explicit_dynamics_procedure["explicit_dynamics_procedure"]["initial_conditions"] = initial_conditions;

    // Create the loads list
    YAML::Node loads(YAML::NodeType::Sequence);

    // Create the first load
    YAML::Node gravity_load;
    gravity_load["gravity_load"]["sets"] = std::vector<std::string>{"block_1"};
    gravity_load["gravity_load"]["magnitude"] = -9.81;
    gravity_load["gravity_load"]["direction"] = std::vector<double>{0.0, 0.0, 1.0};

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

void AddBoundaryConditions(YAML::Node& root) {
    // Create the boundary conditions list
    YAML::Node boundary_conditions(YAML::NodeType::Sequence);

    // Create the first boundary condition
    YAML::Node displacement;
    displacement["displacement"]["sets"] = std::vector<std::string>{"block_1"};
    displacement["displacement"]["direction"] = std::vector<double>{0.0, 0.0, -1.0};
    displacement["displacement"]["magnitude"] = 4.56;

    // Create the time function
    YAML::Node time_function;

    // Add the ramp function to the boundary condition
    YAML::Node ramp_function;
    ramp_function["abscissa_values"] = std::vector<double>{0.0, 1.0};
    ramp_function["ordinate_values"] = std::vector<double>{0.0, 1.0};
    time_function["ramp_function"] = ramp_function;
    displacement["displacement"]["time_function"] = time_function;

    // Add the boundary condition to the list
    boundary_conditions.push_back(displacement);

    // Add the boundary conditions list to the root node
    root["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"] = boundary_conditions;
}

void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::shared_ptr<aperi::FieldManager>& field_manager) {
    // Create a temporary mesh file
    CleanUp(filename);  // Remove any existing file
    // Make sure output doesn't already exist to prevent false positives
    std::ifstream before_write_file(filename);
    EXPECT_FALSE(before_write_file.good());

    // Generate a mesh
    io_mesh.ReadMesh(mesh_string, field_manager);
    // std::vector<size_t> expected_owned = {8, 0, 0, 1};
    // CheckMeshCounts(io_mesh.GetBulkData(), expected_owned);

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

void CheckMeshCounts(const stk::mesh::BulkData& bulk, const std::vector<size_t>& expected_owned) {
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
// Checks either individual values or the sum of the values, depending on the check_sum flag
// For checking individual values, expects a uniform field, values for every node are the same
void CheckFieldValues(const stk::mesh::BulkData& bulk, const stk::mesh::Selector& selector, const std::string& field_name, const std::array<double, 3>& expected_values, bool check_sum = false) {
    double absolute_tolerance = 1e-12;
    double relative_tolerance = 1e-12;
    typedef stk::mesh::Field<double, stk::mesh::Cartesian3d> VectorField;
    // Get the field
    VectorField* p_field = bulk.mesh_meta_data().get_field<VectorField>(stk::topology::NODE_RANK, field_name);
    EXPECT_TRUE(p_field != nullptr) << "Field " << field_name << " not found";

    // Get the field data
    VectorField* p_field_n = p_field;
    if (field_name != "mass") {  // mass is not stated
        p_field_n = &p_field->field_of_state(stk::mesh::StateN);
    }

    // Sum of the values
    std::array<double, 3> sum_values = {0.0, 0.0, 0.0};

    // Loop over all the buckets
    for (stk::mesh::Bucket* bucket : selector.get_buckets(stk::topology::NODE_RANK)) {
        bool owned = bucket->owned();
        // Get the field data for the bucket
        double* p_field_data_n_for_bucket = stk::mesh::field_data(*p_field_n, *bucket);

        unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*p_field, *bucket);
        EXPECT_EQ(num_values_per_node, 3);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                if (owned) {
                    sum_values[i] += p_field_data_n_for_bucket[iI];
                }
                if (!check_sum) {  // Check individual values
                    if (expected_values[i] == 0) {
                        EXPECT_NEAR(p_field_data_n_for_bucket[iI], expected_values[i], absolute_tolerance) << "Field " << field_name << " value at node " << i_node << " dof " << i << " is incorrect";
                    } else {
                        EXPECT_NEAR(p_field_data_n_for_bucket[iI], expected_values[i], std::abs(relative_tolerance * expected_values[i])) << "Field " << field_name << " value at node " << i_node << " dof " << i << " is incorrect";
                    }
                }
            }
        }
    }
    if (check_sum) {  // Check the sum of the values
        std::array<double, 3> sum_values_global = {0.0, 0.0, 0.0};
        stk::all_reduce_sum(bulk.parallel(), sum_values.data(), sum_values_global.data(), 3);
        for (unsigned i = 0; i < 3; i++) {
            if (expected_values[i] == 0) {
                EXPECT_NEAR(sum_values_global[i], expected_values[i], absolute_tolerance) << "Field " << field_name << " sum of values is incorrect";
            } else {
                EXPECT_NEAR(sum_values_global[i], expected_values[i], std::abs(relative_tolerance * expected_values[i])) << "Field " << field_name << " sum of values is incorrect";
            }
        }
    }
}

// Check that the nodal field values match the expected values
// Expects a uniform field, values for every node are the same
void CheckNodeFieldValues(const stk::mesh::BulkData& bulk, const stk::mesh::Selector& selector, const std::string& field_name, const std::array<double, 3>& expected_values) {
    bool check_sum = false;
    CheckFieldValues(bulk, selector, field_name, expected_values, check_sum);
}

// Check that the sum of the nodal field values match the expected values
void CheckNodeFieldSum(const stk::mesh::BulkData& bulk, const stk::mesh::Selector& selector, const std::string& field_name, const std::array<double, 3>& expected_values) {
    bool check_sum = true;
    CheckFieldValues(bulk, selector, field_name, expected_values, check_sum);
}