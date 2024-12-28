#include <gtest/gtest.h>
#include <mpi.h>

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
#include "UnitTestUtils.h"

using DoubleField = stk::mesh::Field<double>;

class StkFieldTestFixture : public ::testing::Test {
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
        // Declare a velocity field, stated field
        DoubleField *p_velocity_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "velocity", 2);
        stk::mesh::put_field_on_entire_mesh(*p_velocity_field, 3);
        stk::io::set_field_output_type(*p_velocity_field, stk::io::FieldOutputType::VECTOR_3D);
        stk::io::set_field_role(*p_velocity_field, Ioss::Field::TRANSIENT);

        // Declare a pk1_stress field, not stated field
        DoubleField *p_pk1_stress_field = &p_meta_data->declare_field<double>(stk::topology::ELEMENT_RANK, "pk1_stress", 1);
        stk::mesh::put_field_on_entire_mesh(*p_pk1_stress_field, 9);
        stk::io::set_field_output_type(*p_pk1_stress_field, stk::io::FieldOutputType::FULL_TENSOR_36);
        stk::io::set_field_role(*p_pk1_stress_field, Ioss::Field::TRANSIENT);

        mesh_reader.populate_bulk_data();

        // Create the mesh data
        m_mesh_data = std::make_shared<aperi::MeshData>(m_bulk_data.get());

        // Create the field query data for the node processor
        std::array<aperi::FieldQueryData<double>, 2> field_query_data_vec;
        field_query_data_vec[0] = {"velocity", aperi::FieldQueryState::NP1};
        field_query_data_vec[1] = {"velocity", aperi::FieldQueryState::N};

        // Create the node processor
        m_node_processor = std::make_shared<aperi::NodeProcessor<2>>(field_query_data_vec, m_mesh_data);

        // Create the field query data for the element processor
        std::array<aperi::FieldQueryData<double>, 1> field_query_data_vec_element;
        field_query_data_vec_element[0] = {"pk1_stress", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};

        // Create the element processor
        m_element_processor = std::make_shared<aperi::ElementProcessor<1>>(field_query_data_vec_element, m_mesh_data);
    }

   public:
    template <stk::mesh::EntityRank Rank, size_t NumRows, size_t NumColumns>
    void SubtractFieldValuesFromRawPointer(stk::mesh::Field<double> *field) {
        // Get the selector
        stk::mesh::Selector selector = m_bulk_data->mesh_meta_data().locally_owned_part();

        // Get the ngp mesh
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Get the ngp field
        stk::mesh::NgpField<double> ngp_field = stk::mesh::get_updated_ngp_field<double>(*field);

        // Loop over all the entities, access values using a pointer and the stk accessor, subtract the values and check that the difference is zero (later)
        stk::mesh::for_each_entity_run(
            ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                KOKKOS_ASSERT(ngp_field.get_num_components_per_entity(entity) == NumRows * NumColumns);
                double *values = &ngp_field(entity, 0);
                const unsigned component_stride = ngp_field.get_component_stride();

                size_t component = 0;
                // Loop over the rows and columns
                for (size_t i = 0; i < NumRows; i++) {
                    for (size_t j = 0; j < NumColumns; j++) {
                        double value = ngp_field(entity, component);
                        values[component * component_stride] -= value;
                        component++;
                    }
                }
            });
    }
    template <stk::mesh::EntityRank Rank, size_t NumRows, size_t NumColumns>
    void SubtractFieldValuesFromEigenMap(stk::mesh::Field<double> *field) {
        // Get the selector
        stk::mesh::Selector selector = m_bulk_data->mesh_meta_data().locally_owned_part();

        // Get the ngp mesh
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Get the ngp field
        stk::mesh::NgpField<double> ngp_field = stk::mesh::get_updated_ngp_field<double>(*field);

        // Loop over all the entities, access values using a pointer and the stk accessor, subtract the values and check that the difference is zero (later)
        stk::mesh::for_each_entity_run(
            ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                KOKKOS_ASSERT(ngp_field.get_num_components_per_entity(entity) == NumRows * NumColumns);
                double *values = &ngp_field(entity, 0);
                const unsigned component_stride = ngp_field.get_component_stride();

                // Create an Eigen::Map to the values
                Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, NumColumns * component_stride);
                Eigen::Map<Eigen::Matrix<double, NumRows, NumColumns>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> eigen_data(values, stride);

                size_t component = 0;
                // Loop over the rows and columns
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
    std::shared_ptr<aperi::NodeProcessor<2>> m_node_processor;
    std::shared_ptr<aperi::ElementProcessor<1>> m_element_processor;
};

// Test node field access using raw pointers
TEST_F(StkFieldTestFixture, NodalFieldAccessRawPointer) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_node_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    stk::mesh::Field<double> *field = StkGetField(aperi::FieldQueryData<double>{"velocity", aperi::FieldQueryState::NP1}, &m_bulk_data->mesh_meta_data());
    SubtractFieldValuesFromRawPointer<stk::topology::NODE_RANK, 3, 1>(field);

    // Get the norm
    double new_norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test element field access using raw pointers
TEST_F(StkFieldTestFixture, ElementFieldAccessRawPointer) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_element_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    stk::mesh::Field<double> *field = StkGetField(aperi::FieldQueryData<double>{"pk1_stress", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT}, &m_bulk_data->mesh_meta_data());
    SubtractFieldValuesFromRawPointer<stk::topology::ELEMENT_RANK, 3, 3>(field);

    // Get the norm
    double new_norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test node field access using Eigen maps
TEST_F(StkFieldTestFixture, NodalFieldAccessEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_node_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    stk::mesh::Field<double> *field = StkGetField(aperi::FieldQueryData<double>{"velocity", aperi::FieldQueryState::NP1}, &m_bulk_data->mesh_meta_data());
    SubtractFieldValuesFromEigenMap<stk::topology::NODE_RANK, 3, 1>(field);

    // Get the norm
    double new_norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test element field access using Eigen maps
TEST_F(StkFieldTestFixture, ElementFieldAccessEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_element_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    stk::mesh::Field<double> *field = StkGetField(aperi::FieldQueryData<double>{"pk1_stress", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT}, &m_bulk_data->mesh_meta_data());
    SubtractFieldValuesFromEigenMap<stk::topology::ELEMENT_RANK, 3, 3>(field);

    // Get the norm
    double new_norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}