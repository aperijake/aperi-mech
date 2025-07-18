#pragma once

#include <gtest/gtest.h>

#include <string>

#include "MeshLabelerTestFixture.h"
#include "UnitTestNodalMeshUtils.h"

class GenerateNodalDomainTestFixture : public MeshLabelerTestFixture {
   protected:
    void SetUp() override {
        // Run MeshLabelerTestFixture::SetUp first
        MeshLabelerTestFixture::SetUp();
    }

    void TearDown() override {
        // Run MeshLabelerTestFixture::TearDown last
        MeshLabelerTestFixture::TearDown();
    }

    void ResetGenerateNodalDomainTestFixture() {
        ResetMeshLabelerTestFixture();
    }

    void CreateAndReadNodalMesh() {
        std::vector<size_t> num_elements = GetNumElementForNodalMesh(m_num_nodes_x, m_num_nodes_y, m_num_nodes_z);
        m_num_elements_x = num_elements[0];
        m_num_elements_y = num_elements[1];
        m_num_elements_z = num_elements[2];

        // Create a nodal mesh string
        std::string mesh_string = std::to_string(m_num_elements_x) + "x" + std::to_string(m_num_elements_y) + "x" + std::to_string(m_num_elements_z);

        // Create the mesh
        CreateIoMeshGenerated();
        m_io_mesh->ReadMesh(mesh_string, {"block_1"});
    }

    size_t m_num_nodes_x = 2;
    size_t m_num_nodes_y = 2;
    size_t m_num_nodes_z = 5;     // 4 was causing issues with 4 procs as 1 proc was getting cells
    size_t m_num_elements_x = 2;  // Will be adjusted in CreateNodalMeshString
    size_t m_num_elements_y = 2;
    size_t m_num_elements_z = 8;
    size_t m_num_subcells = 1;
    bool m_activate_center_node = false;
};