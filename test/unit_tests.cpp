#include <gtest/gtest.h>

// Include test cases
#include "ApplicationTest.cpp"
#include "InitialConditionManagerTest.cpp"
#include "IoInputFileTest.cpp"
#include "IoMeshTest.cpp"

int main(int argc, char** argv) {
    stk::parallel_machine_init(&argc, &argv);

    // Initialize Google Test
    ::testing::InitGoogleTest(&argc, argv);

    // Run all the tests
    return RUN_ALL_TESTS();

    stk::parallel_machine_finalize();
}
