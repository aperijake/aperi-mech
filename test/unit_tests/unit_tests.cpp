#include <gtest/gtest.h>
#include <mpi.h>

#include <Kokkos_Core.hpp>

int main(int argc, char** argv) {
    Kokkos::initialize(argc, argv);
    MPI_Init(&argc, &argv);

    // Initialize Google Test
    ::testing::InitGoogleTest(&argc, argv);

    // Run all the tests
    int return_code = RUN_ALL_TESTS();

    MPI_Finalize();
    Kokkos::finalize();

    return return_code;
}
