#include <YamlUtils.h>
#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <iostream>
#include <string>
#include <vector>

// Test GetNode
TEST(YamlUtilsTest, GetNode) {
    YAML::Node node;
    node["test"] = "value";

    auto result = acm::GetNode(node, "test");
    EXPECT_EQ(result.second, 0);
    EXPECT_EQ(result.first.as<std::string>(), "value");

    result = acm::GetNode(node, "nonexistent");
    EXPECT_EQ(result.second, 1);
}

// Test GetScalarValue
TEST(YamlUtilsTest, GetScalarValue) {
    YAML::Node node;
    node["test"] = "value";

    auto result = acm::GetScalarValue<std::string>(node, "test");
    EXPECT_EQ(result.second, 0);
    EXPECT_EQ(result.first, "value");

    result = acm::GetScalarValue<std::string>(node, "nonexistent");
    EXPECT_EQ(result.second, 1);
}

// Test GetValueSequence
TEST(YamlUtilsTest, GetValueSequence) {
    YAML::Node node;
    node["test"] = YAML::Load("[1, 2, 3]");

    auto result = acm::GetValueSequence<int>(node, "test");
    EXPECT_EQ(result.second, 0);
    EXPECT_EQ(result.first.size(), 3);
    EXPECT_EQ(result.first[0], 1);
    EXPECT_EQ(result.first[1], 2);
    EXPECT_EQ(result.first[2], 3);

    result = acm::GetValueSequence<int>(node, "nonexistent");
    EXPECT_EQ(result.second, 1);
}