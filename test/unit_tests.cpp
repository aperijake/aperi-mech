#include <gtest/gtest.h>

// Include test cases
#include "IoMeshTest.cpp"

int main(int argc, char** argv) {
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Initialize Google Test
    ::testing::InitGoogleTest(&argc, argv);

    // Run all the tests
    return RUN_ALL_TESTS();

    stk::parallel_machine_finalize();
}
