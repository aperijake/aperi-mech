#pragma once

#include <gtest/gtest.h>
#include <mpi.h>

#include <Eigen/Core>
#include <filesystem>
#include <iomanip>
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/EntityFieldData.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/Types.hpp>

#include "AperiStkUtils.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "MeshData.h"

using DoubleField = stk::mesh::Field<double>;

class FieldTestFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

    void AddMeshDatabase(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z) {
        MPI_Comm p_communicator = MPI_COMM_WORLD;
        m_bulk_data = stk::mesh::MeshBuilder(p_communicator).create();
        m_bulk_data->mesh_meta_data().use_simple_fields();
        stk::mesh::MetaData *p_meta_data = &m_bulk_data->mesh_meta_data();

        stk::io::StkMeshIoBroker mesh_reader;
        mesh_reader.set_bulk_data(*m_bulk_data);
        const std::string mesh_spec = "generated:" + std::to_string(num_elements_x) + "x" + std::to_string(num_elements_y) + "x" + std::to_string(num_elements_z);
        mesh_reader.add_mesh_database(mesh_spec, stk::io::READ_MESH);
        mesh_reader.create_input_mesh();
        mesh_reader.add_all_mesh_fields_as_input_fields();

        // Create the fields
        // Declare a nodal field, stated field
        DoubleField *p_nodal_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "nodal_field", 2);
        stk::mesh::put_field_on_entire_mesh(*p_nodal_field, 3);
        stk::io::set_field_output_type(*p_nodal_field, stk::io::FieldOutputType::VECTOR_3D);
        stk::io::set_field_role(*p_nodal_field, Ioss::Field::TRANSIENT);

        // Declare another nodal field, not stated field
        DoubleField *p_nodal_field_2 = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "nodal_field_2", 1);
        stk::mesh::put_field_on_entire_mesh(*p_nodal_field_2, 3);
        stk::io::set_field_output_type(*p_nodal_field_2, stk::io::FieldOutputType::VECTOR_3D);
        stk::io::set_field_role(*p_nodal_field_2, Ioss::Field::TRANSIENT);

        // Declare a element field, not stated field
        DoubleField *p_element_field = &p_meta_data->declare_field<double>(stk::topology::ELEMENT_RANK, "element_field", 1);
        stk::mesh::put_field_on_entire_mesh(*p_element_field, 9);
        stk::io::set_field_output_type(*p_element_field, stk::io::FieldOutputType::FULL_TENSOR_36);
        stk::io::set_field_role(*p_element_field, Ioss::Field::TRANSIENT);

        mesh_reader.populate_bulk_data();

        // Create the mesh data
        m_mesh_data = std::make_shared<aperi::MeshData>(m_bulk_data.get());

        // Create the field query data for the node processor
        std::array<aperi::FieldQueryData<double>, 3> field_query_data_vec;
        field_query_data_vec[0] = {"nodal_field", aperi::FieldQueryState::NP1};
        field_query_data_vec[1] = {"nodal_field", aperi::FieldQueryState::N};
        field_query_data_vec[2] = {"nodal_field_2", aperi::FieldQueryState::None};

        // Create the node processor
        m_node_processor = std::make_shared<aperi::NodeProcessor<3>>(field_query_data_vec, m_mesh_data);

        // Create the field query data for the element processor
        std::array<aperi::FieldQueryData<double>, 1> field_query_data_vec_element;
        field_query_data_vec_element[0] = {"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};

        // Create the element processor
        m_element_processor = std::make_shared<aperi::ElementProcessor<1>>(field_query_data_vec_element, m_mesh_data);
    }

   public:
    template <size_t NumRows, size_t NumColumns, typename T>
    void SubtractFieldValuesFromRawPointer(const aperi::FieldQueryData<T> &field_query_data) {
        // Get the stk field
        stk::mesh::Field<T> *field = StkGetField(field_query_data, &m_bulk_data->mesh_meta_data());

        // Get the rank
        stk::topology::rank_t rank = GetTopologyRank(field_query_data.topology_rank);

        // Get the selector
        stk::mesh::Selector selector = m_bulk_data->mesh_meta_data().locally_owned_part();

        // Get the ngp mesh
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Get the ngp field
        stk::mesh::NgpField<T> ngp_field = stk::mesh::get_updated_ngp_field<T>(*field);

        // Loop over all the entities, access values using a pointer and the stk accessor, subtract the values and check that the difference is zero (later)
        stk::mesh::for_each_entity_run(
            ngp_mesh, rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                KOKKOS_ASSERT(ngp_field.get_num_components_per_entity(entity) == NumRows * NumColumns);
                T *values = &ngp_field(entity, 0);
                const unsigned component_stride = ngp_field.get_component_stride(entity);

                size_t component = 0;
                // Loop over the rows and columns, row major
                for (size_t i = 0; i < NumRows; i++) {
                    for (size_t j = 0; j < NumColumns; j++) {
                        T value = ngp_field(entity, component);
                        values[component * component_stride] -= value;
                        component++;
                    }
                }
            });
    }

    template <size_t NumRows, size_t NumColumns, typename T>
    void SubtractFieldValuesFromEigenMap(const aperi::FieldQueryData<T> &field_query_data) {
        // Get the stk field
        stk::mesh::Field<T> *field = StkGetField(field_query_data, &m_bulk_data->mesh_meta_data());

        // Get the rank
        stk::topology::rank_t rank = GetTopologyRank(field_query_data.topology_rank);

        // Get the selector
        stk::mesh::Selector selector = m_bulk_data->mesh_meta_data().locally_owned_part();

        // Get the ngp mesh
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Get the ngp field
        stk::mesh::NgpField<double> ngp_field = stk::mesh::get_updated_ngp_field<double>(*field);

        // Loop over all the entities, access values using a pointer and the stk accessor, subtract the values and check that the difference is zero (later)
        stk::mesh::for_each_entity_run(
            ngp_mesh, rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                KOKKOS_ASSERT(ngp_field.get_num_components_per_entity(entity) == NumRows * NumColumns);
                double *values = &ngp_field(entity, 0);
                const unsigned component_stride = ngp_field.get_component_stride(entity);

                // Create an Eigen::Map to the values
                Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, NumColumns * component_stride);
                Eigen::Map<Eigen::Matrix<double, NumRows, NumColumns>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> eigen_data(values, stride);

                size_t component = 0;
                // Loop over the rows and columns, row major
                for (size_t i = 0; i < NumRows; i++) {
                    for (size_t j = 0; j < NumColumns; j++) {
                        double value = ngp_field(entity, component);
                        eigen_data(i, j) -= value;
                        component++;
                    }
                }
            });
    }

    size_t m_num_elements_x = 10;
    size_t m_num_elements_y = 10;
    size_t m_num_elements_z = 10;
    std::shared_ptr<stk::mesh::BulkData> m_bulk_data;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::NodeProcessor<3>> m_node_processor;
    std::shared_ptr<aperi::ElementProcessor<1>> m_element_processor;
};
