#include "IoInputFile.h"

#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

#include "AperiInputSchema/AperiInputSchema.h"
#ifdef USE_PROTEGO_MECH
#include "ProtegoInputSchema/ProtegoInputSchema.h"
#endif
#include "LogUtils.h"

namespace aperi {
int IoInputFile::Read() {
    try {
        // Load and the YAML input file
        m_yaml_file = YAML::LoadFile(m_filename);
    } catch (const YAML::Exception& e) {
        aperi::CerrP0() << "Error reading YAML input file: " << e.what() << std::endl;
        return 1;
    }
    return 0;
}

int IoInputFile::Write(const std::string& filename, const YAML::Node& yaml_data) {
    int return_code = 0;
    try {
        // Open a file for writing
        std::ofstream out_file(filename);

        // Check if the file is open
        if (out_file.is_open()) {
            // Write data to the file
            if (!(out_file << yaml_data)) throw YAML::Exception(YAML::Mark::null_mark(), "Error writing YAML file.");
            out_file.close();
            aperi::CoutP0() << "YAML file successfully written." << std::endl;
        } else {
            throw YAML::Exception(YAML::Mark::null_mark(), "Unable to open the file for writing.");
        }
    } catch (const YAML::Exception& e) {
        aperi::CerrP0() << "Error writing YAML file: " << e.what() << std::endl;
        return_code = 1;
    }
    return return_code;
}
// Get the next level down, if the next level is a map or sequence, return the map or sequence for recursive checking. Otherwise, this is the end of the recursion.
std::pair<std::map<std::string, YAML::Node>, int> GetInputNodes(const YAML::Node& input_node, const std::map<std::string, std::string>& names_types, bool verbose = false, bool optional = false) {
    // Loop through one_or_more_of_names_types
    std::map<std::string, YAML::Node> found_names_and_nodes;
    int found_count = 0;
    for (const auto& name_type : names_types) {
        std::string type = name_type.second;
        std::string name = name_type.first;

        // Look for schema info in input file
        if (type == "sequence" || type == "map") {
            std::pair<YAML::Node, int> node_pair = GetNode(input_node, name, verbose, optional);
            if (!node_pair.second) {
                found_names_and_nodes.emplace(name, node_pair.first);
                ++found_count;
            }
            continue;
        }
        if (type == "float") {
            std::pair<double, int> scalar_pair = GetScalarValue<double>(input_node, name, verbose, optional);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "int") {
            std::pair<int, int> scalar_pair = GetScalarValue<int>(input_node, name, verbose, optional);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "bool") {
            std::pair<bool, int> scalar_pair = GetScalarValue<bool>(input_node, name, verbose, optional);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "float_vector") {
            std::pair<std::vector<double>, int> scalar_pair = GetValueSequence<double>(input_node, name, verbose, optional);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "string") {
            std::pair<std::string, int> scalar_pair = GetScalarValue<std::string>(input_node, name, verbose, optional);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "direction_vector") {
            std::pair<std::vector<double>, int> scalar_pair = GetDirectionVector(input_node, name, verbose, optional);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "location_vector") {
            std::pair<std::vector<double>, int> scalar_pair = GetLocationVector(input_node, name, verbose, optional);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else {
            throw std::runtime_error("Schema Error: 'one_or_more_of' subitems must be of type 'int', 'bool', 'node', 'float', 'float_vector', 'string', 'location_vector', 'direction_vector', or 'double_list'. Line: " + std::to_string(__LINE__));
        }
    }
    return std::make_pair(found_names_and_nodes, found_count);
}

// Get the schema info (map from name to data type) for a subitem
std::map<std::string, std::string> ParseSubitemSchema(const YAML::Node& schema_item_node, const std::string& subitem_string, bool verbose = false) {
    // Get the requested subitem
    std::pair<std::vector<YAML::Node>, int> schema_subitems_pair = GetValueSequence<YAML::Node>(schema_item_node, subitem_string, verbose);
    if (schema_subitems_pair.second) {
        auto subitem_name = schema_item_node.begin()->first.as<std::string>();
        throw std::runtime_error("Schema Error: '" + subitem_string + "' node not found in '" + subitem_name + "'. Function: " + __FUNCTION__ + ", Line: " + std::to_string(__LINE__));
    }
    std::vector<YAML::Node> schema_subitems = schema_subitems_pair.first;

    std::map<std::string, std::string> schema_subitems_names_types;  // map from schema_subitem name to type
    for (const auto& schema_item : schema_subitems) {
        // Get schema info
        auto node_name = schema_item.begin()->first.as<std::string>();
        std::pair<YAML::Node, int> node_pair = GetNode(schema_item, node_name);
        if (node_pair.second) {
            throw std::runtime_error("Schema Error: items node '" + node_name + "' not found. Function: " + __FUNCTION__ + ", Line: " + std::to_string(__LINE__));
        }
        std::pair<std::string, int> type_pair = GetScalarValue<std::string>(node_pair.first, "type", verbose);
        if (type_pair.second) {
            throw std::runtime_error("Schema Error: 'type' node not found for item '" + node_name + "'. Function: " + __FUNCTION__ + ", Line: " + std::to_string(__LINE__));
        }
        schema_subitems_names_types.emplace(node_name, type_pair.first);
    }
    // Check schema correctness
    if (schema_subitems_names_types.empty()) {
        throw std::runtime_error("Schema Error: '" + subitem_string + "' node must have at least one item. Schema item: " + schema_item_node.begin()->first.as<std::string>() + ". Function: " + __FUNCTION__ + ", Line: " + std::to_string(__LINE__));
    }
    return schema_subitems_names_types;
}

// Map found nodes to associated schema
void AddFoundNodesToMap(const std::map<std::string, YAML::Node>& found_nodes, const YAML::Node& schema_subitem_node, std::vector<std::pair<YAML::Node, YAML::Node>>& found_nodes_and_associated_schema) {
    for (const auto& found_node : found_nodes) {
        std::string name = found_node.first;
        std::pair<YAML::Node, int> node_pair = GetNode(schema_subitem_node, name);
        if (node_pair.second) {
            throw std::runtime_error("Schema Error: items node '" + name + "' not found. Function: " + __FUNCTION__ + ", Line: " + std::to_string(__LINE__));
        }
        found_nodes_and_associated_schema.emplace_back(found_node.second, node_pair.first);
    }
}

// Parse subitems, check input against schema, and return the found nodes and associated schema
// This is where the subitems (one_of, one_or_more_of, all_of, optional, two_of) are defined and handled
std::pair<std::vector<std::pair<YAML::Node, YAML::Node>>, int> ParseSubitems(const YAML::Node& input_node, const std::vector<YAML::Node>& schema_subitems, bool verbose = false) {
    std::vector<std::pair<YAML::Node, YAML::Node>> found_nodes_and_associated_schema;
    int return_code = 0;
    // Loop over schema_subitems
    for (const auto& schema_subitem : schema_subitems) {
        // Handle one_or_more_of
        if (schema_subitem["one_or_more_of"].IsDefined()) {
            for (const auto& schema_subitem_set : schema_subitem["one_or_more_of"]) {
                // Map from schema_subitem name to type
                std::map<std::string, std::string> one_or_more_of_names_types = ParseSubitemSchema(schema_subitem_set, "set", verbose);

                // Check input_node for the correct subitems / type and return the ones that are nodes for recursive checking. Also return the number of found subitems
                bool optional = true;
                std::pair<std::map<std::string, YAML::Node>, int> found_one_or_more_of_pair = GetInputNodes(input_node, one_or_more_of_names_types, verbose, optional);

                // Make sure at least one schema_subitem is found
                if (found_one_or_more_of_pair.second == 0) {
                    aperi::CerrP0() << "Error: 'one_or_more_of' subitems must have at least one schema_subitem." << std::endl;
                    return_code = 1;
                }

                // Map found nodes to associated schema
                AddFoundNodesToMap(found_one_or_more_of_pair.first, schema_subitem_set["set"], found_nodes_and_associated_schema);
            }
        }

        // Handle one_of
        if (schema_subitem["one_of"].IsDefined()) {
            for (const auto& schema_subitem_set : schema_subitem["one_of"]) {
                // Map from schema_subitem name to type
                std::map<std::string, std::string> one_of_names_types = ParseSubitemSchema(schema_subitem_set, "set", verbose);

                // Check input_node for the correct subitems / type and return the ones that are nodes for recursive checking. Also return the number of found subitems
                bool optional = true;
                std::pair<std::map<std::string, YAML::Node>, int> found_one_of_pair = GetInputNodes(input_node, one_of_names_types, verbose, optional);

                // Make sure only one schema_subitem is found
                if (found_one_of_pair.second != 1) {
                    // TODO(jake): Generalize this style of error messaging and apply elsewhere.
                    // Print error message
                    aperi::CerrP0() << "Error: 'one_of' subitems must have one and only one schema_subitem." << std::endl;
                    // Print what was expected and what was found
                    aperi::CerrP0() << "Expected one of: ";
                    for (const auto& name_type : one_of_names_types) {
                        aperi::CerrP0() << name_type.first << " ";
                    }
                    aperi::CerrP0() << std::endl;
                    aperi::CerrP0() << "Found: ";
                    for (const auto& found_name : found_one_of_pair.first) {
                        aperi::CerrP0() << found_name.first << " ";
                    }
                    aperi::CerrP0() << std::endl;

                    // Print the input node
                    aperi::CerrP0() << "YAML input node:\n"
                                    << input_node << std::endl;

                    return_code = 1;
                }

                // Map found nodes to associated schema
                AddFoundNodesToMap(found_one_of_pair.first, schema_subitem_set["set"], found_nodes_and_associated_schema);
            }
        }

        // Handle all_of
        if (schema_subitem["all_of"].IsDefined()) {
            for (const auto& schema_subitem_set : schema_subitem["all_of"]) {
                // Map from schema_subitem name to type
                std::map<std::string, std::string> all_of_names_types = ParseSubitemSchema(schema_subitem_set, "set", verbose);

                // Check input_node for the correct subitems / type and return the ones that are nodes for recursive checking. Also return the number of found subitems
                bool optional = false;
                std::pair<std::map<std::string, YAML::Node>, int> found_all_of_pair = GetInputNodes(input_node, all_of_names_types, verbose, optional);

                // Make sure all subitems are found
                if (found_all_of_pair.second != static_cast<int>(all_of_names_types.size())) {
                    aperi::CerrP0() << "Error: 'all_of' subitems must have all subitems." << std::endl;
                    return_code = 1;
                }

                // Map found nodes to associated schema
                AddFoundNodesToMap(found_all_of_pair.first, schema_subitem_set["set"], found_nodes_and_associated_schema);
            }
        }

        // Handle optional
        if (schema_subitem["optional"].IsDefined()) {
            for (const auto& schema_subitem_set : schema_subitem["optional"]) {
                // Map from schema_subitem name to type
                std::map<std::string, std::string> optional_names_types = ParseSubitemSchema(schema_subitem_set, "set", verbose);

                // Check input_node for the correct subitems / type and return the ones that are nodes for recursive checking. Also return the number of found subitems
                bool optional = true;
                std::pair<std::map<std::string, YAML::Node>, int> found_optional_pair = GetInputNodes(input_node, optional_names_types, verbose, optional);

                // Map found nodes to associated schema
                AddFoundNodesToMap(found_optional_pair.first, schema_subitem_set["set"], found_nodes_and_associated_schema);
            }
        }

        // Handle two_of
        if (schema_subitem["two_of"].IsDefined()) {
            for (const auto& schema_subitem_set : schema_subitem["two_of"]) {
                // Map from schema_subitem name to type
                std::map<std::string, std::string> two_of_names_types = ParseSubitemSchema(schema_subitem_set, "set", verbose);

                // Check input_node for the correct subitems / type and return the ones that are nodes for recursive checking. Also return the number of found subitems
                bool optional = true;
                std::pair<std::map<std::string, YAML::Node>, int> found_two_of_pair = GetInputNodes(input_node, two_of_names_types, verbose, optional);

                // Make sure exactly two schema_subitems are found
                if (found_two_of_pair.second != 2) {
                    aperi::CerrP0() << "Error: 'two_of' subitems must have exactly two schema_subitems." << std::endl;
                    aperi::CerrP0() << "Expected two of: ";
                    for (const auto& name_type : two_of_names_types) {
                        aperi::CerrP0() << name_type.first << " ";
                    }
                    aperi::CerrP0() << std::endl;
                    aperi::CerrP0() << "Found: ";
                    for (const auto& found_name : found_two_of_pair.first) {
                        aperi::CerrP0() << found_name.first << " ";
                    }
                    aperi::CerrP0() << std::endl;
                    aperi::CerrP0() << "YAML input node:\n"
                                    << input_node << std::endl;
                    return_code = 1;
                }

                // Map found nodes to associated schema
                AddFoundNodesToMap(found_two_of_pair.first, schema_subitem_set["set"], found_nodes_and_associated_schema);
            }
        }
    }
    return std::make_pair(found_nodes_and_associated_schema, return_code);
}

// Recursively check the input file against the schema
// trunk-ignore(clang-tidy/misc-no-recursion): Recursion is necessary to check the input file against the schema.
int RecursiveCheckSubitems(const std::vector<YAML::Node>& input_nodes, const YAML::Node& schema_sub_node, bool verbose) {
    // Get schema subitems
    std::pair<std::vector<YAML::Node>, int> schema_sub_node_subitems_pair = GetValueOrValueSequence(schema_sub_node, "subitems", verbose);
    if (schema_sub_node_subitems_pair.second) {
        auto sub_node_name = schema_sub_node.begin()->first.as<std::string>();
        throw std::runtime_error("Schema Error: 'subitems' node not found in '" + sub_node_name + "'. Function: " + __FUNCTION__ + ", Line: " + std::to_string(__LINE__));
    }
    std::vector<YAML::Node> schema_sub_node_subitems = schema_sub_node_subitems_pair.first;

    int return_code = 0;

    // Loop over input_nodes and check them against the schema
    for (const auto& input_node : input_nodes) {
        // Get nodes in next level of schema, check input on this level
        std::pair<std::vector<std::pair<YAML::Node, YAML::Node>>, int> found_input_nodes_and_associated_schema_pair = ParseSubitems(input_node, schema_sub_node_subitems, verbose);
        if (found_input_nodes_and_associated_schema_pair.second) return_code = 1;
        std::vector<std::pair<YAML::Node, YAML::Node>> found_input_nodes_and_associated_schema = found_input_nodes_and_associated_schema_pair.first;

        // Recursively check the next level, i.e. the found_nodes
        for (const auto& found_input_node_and_associated_schema : found_input_nodes_and_associated_schema) {
            int recursive_return_code = RecursiveCheckSubitems({found_input_node_and_associated_schema.first}, found_input_node_and_associated_schema.second, verbose);
            if (recursive_return_code) return_code = 1;
        }
    }

    return return_code;
}

// Check the input file against the schema
int IoInputFile::CheckInputWithSchema(bool verbose) {
    // As of now, there is one main node in the schema and input files: procedures
    // Want to hand it the procedures node from the schema and the procedures node from the input file
    // Get schema procedures node
#ifdef USE_PROTEGO_MECH
    protego::ProtegoInputSchema protego_schema;
    YAML::Node schema_node = protego_schema.GetInputSchema();
#else
    AperiInputSchema aperi_schema;
    YAML::Node schema_node = aperi_schema.GetInputSchema();
#endif
    std::pair<YAML::Node, int> schema_sub_node_pair = GetNode(schema_node, "procedures");
    if (schema_sub_node_pair.second) {
        aperi::CerrP0() << "Schema Error: 'procedures' node not found." << std::endl;
        throw std::runtime_error("Schema Error: 'procedures' node not found. Line: " + std::to_string(__LINE__));
    }
    YAML::Node schema_sub_node = schema_sub_node_pair.first;

    // Get input procedures node
    std::pair<std::vector<YAML::Node>, int> input_nodes_pair = GetValueOrValueSequence(m_yaml_file, "procedures", verbose);
    if (input_nodes_pair.second) {
        aperi::CerrP0() << "Input Error: 'procedures' node not found." << std::endl;
        throw std::runtime_error("Input Error: 'procedures' node not found. Line: " + std::to_string(__LINE__));
    }
    std::vector<YAML::Node> input_nodes = input_nodes_pair.first;

    return RecursiveCheckSubitems(input_nodes, schema_sub_node, verbose);
}

}  // namespace aperi
