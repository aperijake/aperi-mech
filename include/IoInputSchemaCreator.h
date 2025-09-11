#pragma once

#include <yaml-cpp/yaml.h>

#include <iostream>
#include <vector>

/**
 * @class InputSchemaCreator
 * @brief Class for creating input schemas in YAML format.
 *
 * This class provides methods for creating input schemas in YAML format.
 */
class InputSchemaCreator {
   public:
    /**
     * @brief Constructs an InputSchemaCreator object.
     *
     * @param name The name of the input.
     * @param type The type of the input.
     * @param description The description of the input.
     */
    InputSchemaCreator(std::string name, std::string type, std::string description)
        : m_name(name), m_type(type), m_description(description) {
        m_subitems = YAML::Node(YAML::NodeType::Null);
    }

    ~InputSchemaCreator() = default;

    /**
     * @brief Adds a condition to the input schema.
     *
     * @param condition_name The name of the condition.
     * @param condition_nodes The vector of YAML nodes representing the condition set.
     */
    void AddCondition(const std::string& condition_name, const std::vector<YAML::Node>& condition_nodes) {
        // Ensure m_subitems has a sequence for condition_name
        if (!m_subitems[condition_name]) {
            m_subitems[condition_name] = YAML::Node(YAML::NodeType::Sequence);
        }
        // Create a new set and add all nodes to it
        YAML::Node set(YAML::NodeType::Map);
        set["set"] = YAML::Node(YAML::NodeType::Sequence);
        for (const auto& node : condition_nodes) {
            set["set"].push_back(node);
        }
        m_subitems[condition_name].push_back(set);
    }

    /**
     * @brief Adds an all_of condition to the input schema.
     *
     * @param all_of_node The YAML node representing the all_of condition.
     */
    void AddAllOf(const YAML::Node& all_of_node) {
        if (!m_subitems["all_of"]) {
            m_subitems["all_of"] = YAML::Node(YAML::NodeType::Sequence);
        }
        YAML::Node set(YAML::NodeType::Map);
        set["set"] = YAML::Node(YAML::NodeType::Sequence);
        set["set"].push_back(all_of_node);
        m_subitems["all_of"].push_back(set);
    }

    /**
     * @brief Adds an one_of condition to the input schema.
     *
     * @param one_of_nodes The vector of YAML nodes representing the one_of condition set.
     */
    void AddOneOf(const std::vector<YAML::Node>& one_of_nodes) {
        AddCondition("one_of", one_of_nodes);
    }

    /**
     * @brief Adds a two_of condition to the input schema.
     *
     * @param two_of_nodes The vector of YAML nodes representing the two_of condition set.
     */
    void AddTwoOf(const std::vector<YAML::Node>& two_of_nodes) {
        AddCondition("two_of", two_of_nodes);
    }

    /**
     * @brief Adds an optional condition to the input schema.
     *
     * @param optional_node The YAML node representing the optional condition.
     */
    void AddOptional(const YAML::Node& optional_node) {
        if (!m_subitems["optional"]) {
            m_subitems["optional"] = YAML::Node(YAML::NodeType::Sequence);
        }
        YAML::Node set(YAML::NodeType::Map);
        set["set"] = YAML::Node(YAML::NodeType::Sequence);
        set["set"].push_back(optional_node);
        m_subitems["optional"].push_back(set);
    }

    /**
     * @brief Adds a one_or_more_of condition to the input schema.
     *
     * @param one_or_more_of_nodes The vector of YAML nodes representing the one_or_more_of condition set.
     */
    void AddOneOrMoreOf(const std::vector<YAML::Node>& one_or_more_of_nodes) {
        AddCondition("one_or_more_of", one_or_more_of_nodes);
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