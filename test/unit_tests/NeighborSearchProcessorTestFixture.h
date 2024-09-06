#pragma once

#include <gtest/gtest.h>
#include <mpi.h>

#include <chrono>
#include <filesystem>
#include <iomanip>
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/Types.hpp>

#include "Constants.h"
#include "FieldData.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"

class NeighborSearchProcessorTestFixture : public ::testing::Test {
    using DoubleField = stk::mesh::Field<double>;
    using UnsignedField = stk::mesh::Field<uint64_t>;

   protected:
    void SetUp() override {
    }

    void CreateMeshAndPopulateFields(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z, std::string extra_mesh_spec = "|tets") {
        MPI_Comm p_communicator = MPI_COMM_WORLD;
        m_bulk_data = stk::mesh::MeshBuilder(p_communicator).create();
        m_bulk_data->mesh_meta_data().use_simple_fields();
        stk::mesh::MetaData *p_meta_data = &m_bulk_data->mesh_meta_data();

        m_mesh_reader = std::make_shared<stk::io::StkMeshIoBroker>();
        m_mesh_reader->set_bulk_data(*m_bulk_data);
        const std::string mesh_spec = "generated:" + std::to_string(num_elements_x) + "x" + std::to_string(num_elements_y) + "x" + std::to_string(num_elements_z) + extra_mesh_spec;
        m_mesh_reader->add_mesh_database(mesh_spec, stk::io::READ_MESH);
        m_mesh_reader->create_input_mesh();
        m_mesh_reader->add_all_mesh_fields_as_input_fields();

        // Create the fields, start with nodes
        m_node_num_neighbors_field = &p_meta_data->declare_field<uint64_t>(stk::topology::NODE_RANK, "num_neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_num_neighbors_field, 1);

        m_node_neighbors_field = &p_meta_data->declare_field<uint64_t>(stk::topology::NODE_RANK, "neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_neighbors_field, aperi::MAX_NODE_NUM_NEIGHBORS);

        m_node_active_field = &p_meta_data->declare_field<uint64_t>(stk::topology::NODE_RANK, "active", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_active_field, 1);

        m_node_neighbors_function_values_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "function_values", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_neighbors_function_values_field, aperi::MAX_NODE_NUM_NEIGHBORS);

        m_kernel_radius_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "kernel_radius", 1);
        stk::mesh::put_field_on_entire_mesh(*m_kernel_radius_field, 1);
    }

    template <typename T>
    void PopulateExtraFields(const std::vector<aperi::FieldQueryData<T>> &extra_fields) {
        stk::mesh::MetaData *p_meta_data = &m_bulk_data->mesh_meta_data();
        // Create the extra fields
        for (const auto &field_query_data : extra_fields) {
            stk::mesh::Field<T> *p_field = &p_meta_data->declare_field<T>(field_query_data.topology_rank == aperi::FieldDataTopologyRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK, field_query_data.name, 1);
            stk::mesh::put_field_on_entire_mesh(*p_field, field_query_data.number_of_components);
        }
    }

    void PopulateBulkDataAndCreateProcessor() {
        // Populate the bulk data
        m_mesh_reader->populate_bulk_data();

        // Create the mesh data
        m_mesh_data = std::make_shared<aperi::MeshData>(m_bulk_data.get());

        // Create the NeighborSearchProcessor
        m_search_processor = std::make_shared<aperi::NeighborSearchProcessor>(m_mesh_data);
    }

    template <typename T>
    double CreateMeshAndProcessors(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z, std::string extra_mesh_spec = "|tets", const std::vector<aperi::FieldQueryData<T>> &extra_fields = {}) {
        auto start = std::chrono::high_resolution_clock::now();
        CreateMeshAndPopulateFields(num_elements_x, num_elements_y, num_elements_z, extra_mesh_spec);
        PopulateExtraFields(extra_fields);
        PopulateBulkDataAndCreateProcessor();
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> elapsed_seconds = end - start;
        return elapsed_seconds.count();
    }

    double CreateMeshAndProcessors(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z, std::string extra_mesh_spec = "|tets") {
        return CreateMeshAndProcessors<double>(num_elements_x, num_elements_y, num_elements_z, extra_mesh_spec, {});
    }

    void ResetNeighborSearchProcessor() {
        m_num_elements_x = 1;
        m_num_elements_y = 1;
        m_num_elements_z = 4;
        m_bulk_data.reset();
        m_mesh_data.reset();
        m_search_processor.reset();

        // Explicitly set field pointers to nullptr
        m_node_num_neighbors_field = nullptr;
        m_node_neighbors_field = nullptr;
        m_node_active_field = nullptr;
        m_node_neighbors_function_values_field = nullptr;
        m_kernel_radius_field = nullptr;

        m_extra_fields.clear();
    }

    size_t m_num_elements_x = 1;
    size_t m_num_elements_y = 1;
    size_t m_num_elements_z = 4;
    std::shared_ptr<stk::mesh::BulkData> m_bulk_data;
    std::shared_ptr<stk::io::StkMeshIoBroker> m_mesh_reader;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    UnsignedField *m_node_num_neighbors_field;
    UnsignedField *m_node_neighbors_field;
    UnsignedField *m_node_active_field;
    DoubleField *m_node_neighbors_function_values_field;
    DoubleField *m_kernel_radius_field;
    std::vector<aperi::FieldQueryData<double>> m_extra_fields;
    std::shared_ptr<aperi::NeighborSearchProcessor> m_search_processor;
};