#include <gtest/gtest.h>
#include <mpi.h>

#include <Kokkos_Core.hpp>

#include "SimpleTimerFactory.h"

class MPIKokkosEnvironment : public ::testing::Environment {
   public:
    void SetUp() override {
        int argc = 0;
        char** p_argv = nullptr;
        MPI_Init(&argc, &p_argv);
        Kokkos::initialize(argc, p_argv);
    }
    void TearDown() override {
        Kokkos::finalize();
        MPI_Finalize();
    }
};

class StreamResetter : public ::testing::EmptyTestEventListener {
   public:
    void OnTestEnd(const ::testing::TestInfo&) override {
        // Reset cout and cerr between tests
        std::cout.clear();
        std::cerr.clear();
    }
};

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    ::testing::UnitTest::GetInstance()->listeners().Append(new StreamResetter);
    ::testing::AddGlobalTestEnvironment(new MPIKokkosEnvironment);

    // Disable timer logging globally for all tests by default
    aperi::SimpleTimerFactory::SetEnabled(false);

    return RUN_ALL_TESTS();
}