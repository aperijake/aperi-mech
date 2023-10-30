#include <gtest/gtest.h>
#include <mpi.h>

int main(int argc, char** argv) {
    MPI_Init(&argc, &argv);  // in lieu of: stk::parallel_machine_init(&argc, &argv);

    // Initialize Google Test
    ::testing::InitGoogleTest(&argc, argv);

    // Run all the tests
    int return_code = RUN_ALL_TESTS();

    MPI_Finalize();  // in lieu of stk::parallel_machine_finalize();

    return return_code;
}
