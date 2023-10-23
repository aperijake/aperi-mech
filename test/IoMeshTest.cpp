#include <gtest/gtest.h>

#include "IoMesh.h"

TEST(IoMesh, Ptest) {
    int result = 7;
    EXPECT_EQ(result, 7);
}

TEST(IoMesh, Ptest2) {
    stk::ParallelMachine comm = MPI_COMM_WORLD;
    IoMeshParameters io_mesh_parameters;  // Default parameters
    IoMesh io_mesh(comm, io_mesh_parameters);
}