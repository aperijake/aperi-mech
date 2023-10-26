#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

#include "IoInputFile.h"
#include "IoUtils.h"
#include "UnitTestUtils.h"

TEST(IoInputFile, Read) {
    std::string filename = "test_Read.yaml";
    WriteTestFile(filename);
    EXPECT_TRUE(std::filesystem::exists(filename));
    IoInputFile io_input_file(filename);

    EXPECT_EQ(io_input_file.GetMeshFile(), "one_element.exo");
    EXPECT_EQ(io_input_file.GetOutputFile(), "one_element_out.exo");
    std::remove(filename.c_str());
}