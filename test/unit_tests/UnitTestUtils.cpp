#include "UnitTestUtils.h"

#include <gtest/gtest.h>

#include <filesystem>
#include <fstream>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/parallel/Parallel.hpp>
#include <string>
#include <system_error>

#include "EntityProcessor.h"
#include "FieldData.h"
#include "Index.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "MathUtils.h"
#include "MeshData.h"

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
                            formulation:
                                integration_scheme:
                                  gauss_quadrature:
                                    integration_order: 1
                                approximation_space:
                                  finite_element: ~
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

    // Create the finite element formulation
    YAML::Node finite_element_formulation;

    // Create the gauss quadrature integration scheme
    YAML::Node gauss_quadrature;
    gauss_quadrature["integration_order"] = 1;

    // Create the formulation
    YAML::Node formulation;
    formulation["integration_scheme"]["gauss_quadrature"] = gauss_quadrature;
    formulation["approximation_space"]["finite_element"] = finite_element_formulation;

    // Add the material to the part
    part["part"]["material"] = material;

    // Add the formulation to the part
    part["part"]["formulation"] = formulation;

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

void AddBoundaryCondition(YAML::Node& root, const std::string& type, bool use_components = false, const std::string& ramp_function_type = "ramp_function", bool add_active_range = false) {
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
    time_function[ramp_function_type] = ramp_function;
    bc[type]["time_function"] = time_function;

    // Create the active range
    if (add_active_range) {
        YAML::Node active_range;
        active_range["time_start"] = 0.2;
        active_range["time_end"] = 0.8;
        bc[type]["active_time_range"] = active_range;
    }

    // Add the boundary condition to the list
    boundary_conditions.push_back(bc);

    // Add the boundary conditions list to the root node
    root["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"] = boundary_conditions;
}

void AddDisplacementBoundaryConditions(YAML::Node& root, const std::string& ramp_function_type) {
    bool use_components = false;
    AddBoundaryCondition(root, "displacement", use_components, ramp_function_type);
}

void AddDisplacementBoundaryConditionsComponents(YAML::Node& root, const std::string& ramp_function_type) {
    bool use_components = true;
    AddBoundaryCondition(root, "displacement", use_components, ramp_function_type);
}

// Add a displacement boundary condition with active range to the input file
void AddDisplacementBoundaryConditionsWithActiveRange(YAML::Node& root, const std::string& ramp_function_type) {
    bool use_components = false;
    AddBoundaryCondition(root, "displacement", use_components, ramp_function_type, true);
}

// Add a velocity boundary condition to the input file
void AddVelocityBoundaryConditions(YAML::Node& root, const std::string& ramp_function_type) {
    bool use_components = false;
    AddBoundaryCondition(root, "velocity", use_components, ramp_function_type);
}

// Add a velocity boundary condition with active range to the input file
void AddVelocityBoundaryConditionsWithActiveRange(YAML::Node& root, const std::string& ramp_function_type) {
    bool use_components = false;
    AddBoundaryCondition(root, "velocity", use_components, ramp_function_type, true);
}

void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::vector<aperi::FieldData>& field_data) {
    // Create a temporary mesh file
    CleanUp(filename);  // Remove any existing file
    // Make sure output doesn't already exist to prevent false positives
    std::ifstream before_write_file(filename);
    EXPECT_FALSE(before_write_file.good());

    // Generate a mesh
    io_mesh.ReadMesh(mesh_string, {"block_1"});
    io_mesh.AddFields(field_data);
    io_mesh.CompleteInitialization();
    // std::vector<size_t> expected_owned = {8, 0, 0, 1};
    // CheckMeshCounts(*io_mesh.GetMeshData(), expected_owned);

    // Write the generated mesh
    io_mesh.CreateFieldResultsFile(filename);
    io_mesh.AddFieldResultsOutput(field_data);
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

void CheckMeshCounts(const aperi::MeshData& mesh_data, const std::vector<size_t>& expected_owned) {
    const stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();
    constexpr auto k_num_ranks = static_cast<unsigned>(stk::topology::ELEM_RANK + 1);
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
    EXPECT_EQ(global_counts.size(), 4U);
    EXPECT_EQ(expected_owned.size(), 4U);
    for (int i = 0, e = expected_owned.size(); i < e; ++i) {
        EXPECT_EQ(global_counts[i], expected_owned[i]);
    }
}

void RandomizeCoordinates(const aperi::MeshData& mesh_data, double min_value, double max_value) {
    std::array<aperi::FieldQueryData<double>, 1> field_query_data_array = {{{mesh_data.GetCoordinatesFieldName(), aperi::FieldQueryState::NP1, aperi::FieldDataTopologyRank::NODE}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<aperi::FieldDataTopologyRank::NODE, 1> entity_processor(field_query_data_array, mesh_data_ptr, {});

    // Seed the random number generator
    std::srand(17);

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<double*, 1>& coords) {
        Eigen::Vector3d shift = Eigen::Vector3d::Random() * (max_value - min_value) + Eigen::Vector3d::Constant(min_value);
        for (size_t i = 0; i < num_components[0]; ++i) {
            coords[0][i + i_entity_start[0]] += shift(i);
        }
    });
    entity_processor.CommunicateAllFieldData();
    entity_processor.MarkAllFieldsModifiedOnHost();
    entity_processor.SyncAllFieldsHostToDevice();
}

// Check partition of unity
void CheckPartitionOfUnity(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, double tolerance) {
    // Check the partition of unity
    double sum = shape_functions.sum();
    EXPECT_NEAR(sum, 1.0, tolerance);
}

// Check partition of nullity
void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& shape_function_derivatives, double tolerance) {
    // Check the partition of nullity
    double sum = shape_function_derivatives.sum();
    EXPECT_NEAR(sum, 0.0, tolerance);
}

// Check linear completeness
void CheckLinearCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the linear completeness
    // x = /sum_i N_i * x_i
    const Eigen::Matrix<double, 1, 3>& calculated_physical_coordinates = shape_functions.transpose() * neighbor_coordinates;
    for (size_t i = 0; i < 3; ++i) {
        EXPECT_NEAR(calculated_physical_coordinates(0, i), evaluation_point_phyiscal_coordinates(0, i), tolerance);
    }
}

// Check quadratic completeness
void CheckQuadraticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the quadratic completeness
    // x_i * x_j = /sum_i N_i * x_i * x_j
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            double calculated_value = 0.0;
            for (size_t k = 0; k < static_cast<size_t>(shape_functions.rows()); ++k) {
                calculated_value += shape_functions(k) * neighbor_coordinates(k, i) * neighbor_coordinates(k, j);
            }
            EXPECT_NEAR(calculated_value, evaluation_point_phyiscal_coordinates(0, i) * evaluation_point_phyiscal_coordinates(0, j), tolerance);
        }
    }
}

// Check cubic completeness
void CheckCubicCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the cubic completeness
    // x_i * x_j * x_k = /sum_i N_i * x_i * x_j * x_k
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            for (size_t k = 0; k < 3; ++k) {
                double calculated_value = 0.0;
                for (size_t l = 0; l < static_cast<size_t>(shape_functions.rows()); ++l) {
                    calculated_value += shape_functions(l) * neighbor_coordinates(l, i) * neighbor_coordinates(l, j) * neighbor_coordinates(l, k);
                }
                EXPECT_NEAR(calculated_value, evaluation_point_phyiscal_coordinates(0, i) * evaluation_point_phyiscal_coordinates(0, j) * evaluation_point_phyiscal_coordinates(0, k), tolerance);
            }
        }
    }
}

// Check quartic completeness
void CheckQuarticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the quartic completeness
    // x_i * x_j * x_k * x_l = /sum_i N_i * x_i * x_j * x_k * x_l
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            for (size_t k = 0; k < 3; ++k) {
                for (size_t l = 0; l < 3; ++l) {
                    double calculated_value = 0.0;
                    for (size_t m = 0; m < static_cast<size_t>(shape_functions.rows()); ++m) {
                        calculated_value += shape_functions(m) * neighbor_coordinates(m, i) * neighbor_coordinates(m, j) * neighbor_coordinates(m, k) * neighbor_coordinates(m, l);
                    }
                    EXPECT_NEAR(calculated_value, evaluation_point_phyiscal_coordinates(0, i) * evaluation_point_phyiscal_coordinates(0, j) * evaluation_point_phyiscal_coordinates(0, k) * evaluation_point_phyiscal_coordinates(0, l), tolerance);
                }
            }
        }
    }
}

void SplitMeshIntoTwoBlocks(const aperi::MeshData& mesh_data, double z_plane_offset) {
    // Get the bulk data
    stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();

    // Create a selector for block 1
    stk::mesh::Selector selector = mesh_data.GetMetaData()->locally_owned_part() & mesh_data.GetMetaData()->universal_part();

    // Get the coordinates field
    stk::mesh::Field<double>& coordinates_field = *mesh_data.GetMetaData()->get_field<double>(stk::topology::NODE_RANK, mesh_data.GetCoordinatesFieldName());

    // Elements to move
    stk::mesh::EntityVector elements_to_move;

    // Nodes to move
    stk::mesh::EntityVector nodes_to_move;

    // Topology rank
    stk::topology block_1_topology;

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    // Loop over all the element buckets
    for (stk::mesh::Bucket* bucket : selector.get_buckets(stk::topology::ELEM_RANK)) {
        // Loop over each entity in the bucket
        for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
            // Get the nodes of the element
            stk::mesh::Entity element = (*bucket)[i_entity];
            const stk::mesh::Entity* nodes = bucket->begin_nodes(i_entity);
            size_t num_nodes = bucket->num_nodes(i_entity);

            // Set the topology
            block_1_topology = bulk.bucket(element).topology();

            double z_average = 0.0;

            // Loop over the nodes of the element
            for (size_t i_node = 0; i_node < num_nodes; ++i_node) {
                // Get the node
                stk::mesh::Entity node = nodes[i_node];
                double* node_coords = stk::mesh::field_data(coordinates_field, node);

                // Add nodes to move if they are above the z plane offset with a little bit of tolerance
                if (node_coords[2] >= z_plane_offset - 1.0e-12) {
                    // Only move if owned
                    if (bulk.bucket(node).owned()) {
                        nodes_to_move.push_back(node);
                    }
                }

                // Get the average z value
                z_average += node_coords[2];
            }

            // Get the average z value
            z_average /= num_nodes;

            // Add elements to move
            if (z_average > z_plane_offset) {
                elements_to_move.push_back(element);
            }
        }
    }

    bulk.modification_begin();
    // Create a new part
    stk::mesh::Part& add_part = mesh_data.GetMetaData()->declare_part_with_topology("block_2", block_1_topology);

    // Prepare the parts to add and remove
    stk::mesh::PartVector add_parts = {&add_part};
    stk::mesh::Part& remove_part = *bulk.mesh_meta_data().get_part("block_1");
    stk::mesh::PartVector remove_parts = {&remove_part};
    stk::mesh::PartVector empty_parts;  // No parts to remove for nodes

    // Change entity parts
    bulk.change_entity_parts(elements_to_move, add_parts, remove_parts);
    bulk.change_entity_parts(nodes_to_move, add_parts, empty_parts);

    bulk.modification_end();
}

size_t GetNumEntitiesInPart(const aperi::MeshData& mesh_data, const std::string& part_name, stk::topology::rank_t rank) {
    stk::mesh::Part* p_part = mesh_data.GetMetaData()->get_part(part_name);
    assert(p_part != nullptr);
    stk::mesh::Selector selector(*p_part);
    std::vector<size_t> counts;
    stk::mesh::comm_mesh_counts(*mesh_data.GetBulkData(), counts, &selector);
    return counts[rank];
}

size_t GetNumElementsInPart(const aperi::MeshData& mesh_data, const std::string& part_name) {
    return GetNumEntitiesInPart(mesh_data, part_name, stk::topology::ELEM_RANK);
}

size_t GetNumNodesInPart(const aperi::MeshData& mesh_data, const std::string& part_name) {
    return GetNumEntitiesInPart(mesh_data, part_name, stk::topology::NODE_RANK);
}

aperi::Index GetNodeIndexAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates) {
    // Get the bulk data
    stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();
    stk::mesh::MetaData& meta = *mesh_data.GetMetaData();
    stk::mesh::Part* p_part = meta.get_part(part_name);
    assert(p_part != nullptr);
    stk::mesh::Selector selector(*p_part);

    // Get the coordinates field
    stk::mesh::Field<double>& coordinates_field = *mesh_data.GetMetaData()->get_field<double>(stk::topology::NODE_RANK, mesh_data.GetCoordinatesFieldName());

    bool found = false;
    aperi::Index node_index;

    // Get the ngp::Mesh
    stk::mesh::NgpMesh& ngp_mesh = stk::mesh::get_updated_ngp_mesh(bulk);

    // Loop over the nodes in the part
    for (stk::mesh::Bucket* p_bucket : selector.get_buckets(stk::topology::NODE_RANK)) {
        // Loop over each entity in the bucket
        for (auto node : *p_bucket) {
            // Get the node
            // Get the coordinates of the node
            double* p_node_coords = stk::mesh::field_data(coordinates_field, node);
            Eigen::Vector3d node_coordinates(p_node_coords[0], p_node_coords[1], p_node_coords[2]);

            // Check if the coordinates match
            if ((node_coordinates - coordinates).norm() < 1.0e-12) {
                // If the coordinates match, return the node index
                node_index = aperi::Index(ngp_mesh.fast_mesh_index(node));
                found = true;
                break;
            }
        }
    }

    if (!found) {
        // If no node was found, return an invalid index
        node_index = aperi::Index::Invalid();
        std::cerr << "Node not found at coordinates: " << coordinates.transpose() << std::endl;
    }

    return node_index;
}