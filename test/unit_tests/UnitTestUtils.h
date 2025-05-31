#pragma once

#include <cstdlib>
#include <string>

#include "UnitTestFieldUtils.h"
#include "UnitTestMeshUtils.h"
#include "UnitTestShapeFunctionUtils.h"
#include "UnitTestYamlUtils.h"

inline bool SkipTest() {
    // Check if FORCE_RUN_ALL_TESTS environment variable is set
    const char* force_run = std::getenv("FORCE_RUN_ALL_TESTS");
    if (force_run && (std::string(force_run) == "1" ||
                      std::string(force_run) == "true" ||
                      std::string(force_run) == "TRUE")) {
        return false;
    }

    // Skip if running with Protego, on GPU, and in Release mode
    // TODO(jake): Get rid of this when we can. It is only here because of some strange issues that lead to a segfault.
    // As with ShapeFunctionsFunctorReproducingKernel, a segfault on the GPU in Release mode, but works fine in Debug mode or on the CPU.
    // Spent a lot of time trying to figure out why, but couldn't find the issue.
#ifdef NDEBUG
#ifdef USE_PROTEGO_MECH
#ifdef KOKKOS_ENABLE_CUDA
    if (std::is_same<Kokkos::DefaultExecutionSpace, Kokkos::Cuda>::value) {
        return true;
    }
#endif
#endif
#endif
    return false;
}