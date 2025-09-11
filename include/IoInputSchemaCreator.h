#pragma once

#include <yaml-cpp/yaml.h>

#include <iostream>

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
     * @param condition_node The YAML node representing the condition.
     * @param index The index of the condition.
     */
    void AddCondition(const std::string& condition_name, const YAML::Node& condition_node, int index) {
        // Check if m_subitems has a key condition_name
        if (m_subitems[condition_name]) {
            // Check the length of the sequence
            int max_index = m_subitems[condition_name].size() - 1;
            if (max_index >= index) {  // If the index already exists, add the new node to the sequence
                m_subitems[condition_name][index]["set"].push_back(condition_node);
            } else if (index > max_index + 1) {  // If the index is out of range (more than 1 above current size), throw an error
                throw std::runtime_error("Condition index out of range. Index: " + std::to_string(index) + ". Max index: " + std::to_string(max_index) + ". File: " + __FILE__ + ". Function: " + __FUNCTION__ + ". Line: " + std::to_string(__LINE__));
            } else {  // If the index is 1 above the current size, create a new sequence and add the new node
                YAML::Node set(YAML::NodeType::Map);
                set["set"] = YAML::Node(YAML::NodeType::Sequence);
                set["set"].push_back(condition_node);
                m_subitems[condition_name].push_back(set);
            }
        } else {
            // If it doesn't, create a new sequence and add the new node
            if (index != 0) {
                throw std::runtime_error("Index must be 0 for non-existing condition. Index: " + std::to_string(index) + ". File: " + __FILE__ + ". Function: " + __FUNCTION__ + ". Line: " + std::to_string(__LINE__));
            }
            m_subitems[condition_name] = YAML::Node(YAML::NodeType::Sequence);
            YAML::Node set(YAML::NodeType::Map);
            set["set"] = YAML::Node(YAML::NodeType::Sequence);
            set["set"].push_back(condition_node);
            m_subitems[condition_name].push_back(set);
        }
    }

    /**
     * @brief Adds an all_of condition to the input schema.
     *
     * @param all_of_node The YAML node representing the all_of condition.
     * @param index The index of the condition.
     */
    void AddAllOf(const YAML::Node& all_of_node, int index = 0) {
        AddCondition("all_of", all_of_node, index);
    }

    /**
     * @brief Adds an one_of condition to the input schema.
     *
     * @param any_of_node The YAML node representing the any_of condition.
     * @param index The index of the condition.
     */
    void AddOneOf(const YAML::Node& one_of_node, int index = 0) {
        AddCondition("one_of", one_of_node, index);
    }

    /**
     * @brief Adds a two_of condition to the input schema.
     *
     * @param two_of_node The YAML node representing the two_of condition.
     * @param index The index of the condition.
     */
    void AddTwoOf(const YAML::Node& two_of_node, int index = 0) {
        AddCondition("two_of", two_of_node, index);
    }

    /**
     * @brief Adds an optional condition to the input schema.
     *
     * @param optional_node The YAML node representing the optional condition.
     * @param index The index of the condition.
     */
    void AddOptional(const YAML::Node& optional_node, int index = 0) {
        AddCondition("optional", optional_node, index);
    }

    /**
     * @brief Adds a one_or_more_of condition to the input schema.
     *
     * @param one_or_more_of_node The YAML node representing the one_or_more_of condition.
     * @param index The index of the condition.
     */
    void AddOneOrMoreOf(const YAML::Node& one_or_more_of_node, int index = 0) {
        AddCondition("one_or_more_of", one_or_more_of_node, index);
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