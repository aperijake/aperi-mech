#pragma once
#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "IoMesh.h"
#include "IoMeshTestFixture.h"
#include "MeshData.h"
#include "UnitTestUtils.h"

class SkinMeshTestFixture : public IoMeshTestFixture {
   protected:
    void SetUp() override {
        // Run IoMeshTestFixture::SetUp first
        IoMeshTestFixture::SetUp();
        // Create an IoMesh object with default parameters
        CreateIoMeshGenerated();
        m_mesh_data = m_io_mesh->GetMeshData();
    }

    void TearDown() override {
        // Run IoMeshTestFixture::TearDown last
        IoMeshTestFixture::TearDown();
    }

    void CreateGeneratedMesh() {
        GenerateMesh(*m_io_mesh, *m_mesh_data, m_num_elem_x, m_num_elem_y, m_num_elem_z);
    }

    void SplitMesh() {
        // Make sure there is an odd number of elements in the z direction
        EXPECT_TRUE(m_num_elem_z % 2 == 1);

        // Declare the new block part
        m_mesh_data->DeclareElementPart("block_2");
        m_mesh_data->AddPartToOutput("block_2");

        // Remove the midddle plane of elements in the z direction
        Eigen::Vector3d element_to_remove_coordinates(0.5, 0.5, static_cast<double>(m_num_elem_z) / 2.0);
        for (size_t i = 0; i < m_num_elem_x; ++i) {
            for (size_t j = 0; j < m_num_elem_y; ++j) {
                element_to_remove_coordinates[0] = static_cast<double>(i) + 0.5;
                element_to_remove_coordinates[1] = static_cast<double>(j) + 0.5;
                DeleteElementAtCoordinates(*m_mesh_data, "block_1", element_to_remove_coordinates, true);
            }
        }

        // Split the mesh into two blocks
        SplitMeshIntoTwoBlocks(*m_mesh_data, static_cast<double>(m_num_elem_z) / 2.0);

        // Check the number of elements in each block
        size_t expected_num_elements_in_each_block = m_num_elem_x * m_num_elem_y * ((m_num_elem_z - 1) / 2);
        EXPECT_EQ(expected_num_elements_in_each_block, GetNumElementsInPart(*m_mesh_data, "block_1"));
        EXPECT_EQ(expected_num_elements_in_each_block, GetNumElementsInPart(*m_mesh_data, "block_2"));
    }

    size_t m_num_elem_x = 1;
    size_t m_num_elem_y = 1;
    size_t m_num_elem_z = 1;

    std::shared_ptr<aperi::MeshData> m_mesh_data = nullptr;
};