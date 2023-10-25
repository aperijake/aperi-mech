#include "IoInputFile.h"

#include <yaml-cpp/yaml.h>

#include <fstream>
#include <iostream>

int IoInputFile::Read(const std::string& filename) {
    try {
        // Load and parse the YAML input file
        YAML::Node config = YAML::LoadFile(filename);

        // Access mesh data
        std::string mesh_file = config["mesh"]["file"].as<std::string>();

        // Access output data
        std::string output_file = config["output"]["file"].as<std::string>();

        //// Access material data
        // std::string material_name = config["material"]["name"].as<std::string>();
        // double density = config["material"]["density"].as<double>();
        // double youngs_modulus = config["material"]["youngs_modulus"].as<double>();

        //// Access loads
        // for (const auto& load : config["loads"]) {
        //     std::string load_type = load["type"].as<std::string>();
        //     double load_magnitude = load["magnitude"].as<double>();
        //     if (load_type == "point") {
        //         int node_id = load["node_id"].as<int>();
        //         // Process point load data
        //     } else if (load_type == "distributed") {
        //         // Process distributed load data
        //         std::vector<double> direction = load["direction"].as<std::vector<double>>();
        //         // ...
        //     }
        // }

        //// Access boundary conditions
        // for (const auto& bc : config["boundary_conditions"]) {
        //     std::string bc_type = bc["type"].as<std::string>();
        //     int node_id = bc["node_id"].as<int>();
        //     // Process boundary condition data
        // }

    } catch (const YAML::Exception& e) {
        std::cerr << "Error reading YAML input file: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}

int IoInputFile::Write(const std::string& filename, const YAML::Node& yaml_data) {
    try {
        // Open a file for writing
        std::ofstream out_file(filename);

        // Check if the file is open
        if (out_file.is_open()) {
            // Write data to the file
            out_file << yaml_data;
            out_file.close();
            std::cout << "YAML file successfully written." << std::endl;
        } else {
            std::cerr << "Error: Unable to open the file for writing." << std::endl;
        }
    } catch (const YAML::Exception& e) {
        std::cerr << "Error writing YAML file: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}