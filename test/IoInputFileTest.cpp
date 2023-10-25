#include <gtest/gtest.h>

#include <filesystem>
#include <string>
#include <yaml-cpp/yaml.h>

#include "IoInputFile.h"

void WriteTestFile(const std::string& filename) {

    YAML::Node yaml_data;

    // Mesh section
    yaml_data["mesh"]["file"] = "one_element.exo";

    // Output section
    yaml_data["output"]["file"] = "one_element_out.exo";

    // Materials section
    YAML::Node steel_material;
    steel_material["name"] = "steel";
    steel_material["type"] = "elastic";
    steel_material["density"] = 7850;
    steel_material["youngs_modulus"] = 2.1e11;
    yaml_data["materials"].push_back(steel_material);

    // Loads section
    YAML::Node load_node;
    load_node["name"] = "load";
    load_node["type"] = "traction";
    load_node["location"] = "surface_1";
    load_node["magnitude"] = 500;
    load_node["direction"].push_back(1);
    load_node["direction"].push_back(0);
    load_node["direction"].push_back(0);
    yaml_data["loads"].push_back(load_node);

    // Boundary Conditions section
    YAML::Node fixed_bc;
    fixed_bc["name"] = "fixed";
    fixed_bc["type"] = "displacement";
    fixed_bc["location"] = "surface_2";
    fixed_bc["magnitude"] = 0;
    fixed_bc["direction"].push_back(1);
    fixed_bc["direction"].push_back(1);
    fixed_bc["direction"].push_back(1);
    yaml_data["boundary_conditions"].push_back(fixed_bc);

    IoInputFile::Write(filename, yaml_data);
}

TEST(IoInputFile, Read) {
    std::string filename = "test.yaml";
    WriteTestFile(filename);
    EXPECT_TRUE(std::filesystem::exists(filename));
    IoInputFile io_input_file(filename);
}