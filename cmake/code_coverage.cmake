############# CODE COVERAGE #############
if (CODE_COVERAGE)
    list(APPEND CMAKE_PREFIX_PATH "${LCOV_BIN_DIR}")
    include(CodeCoverage)
    append_coverage_compiler_flags()

    set(COVERAGE_EXCLUDES
        "/Applications/*"
        "src/main.cpp"
        "test/performance_tests/gtests/*"
        "/opt/homebrew/*"
        "/usr/*")

    if (KOKKOS_ROOT)
        list(APPEND COVERAGE_EXCLUDES "${KOKKOS_ROOT}/*")
    endif ()

    if (TRILINOS_PATH)
        list(APPEND COVERAGE_EXCLUDES "${TRILINOS_PATH}/*")
    endif ()

    if (YAML-CPP_PATH)
        list(APPEND COVERAGE_EXCLUDES "${YAML-CPP_PATH}/*")
    endif ()

    if (EIGEN_PATH)
        list(APPEND COVERAGE_EXCLUDES "${EIGEN_PATH}/*")
    endif ()

    if (COMPADRE_PATH)
        list(APPEND COVERAGE_EXCLUDES "${COMPADRE_PATH}/*")
    endif ()

    # Print exclude paths
    message(STATUS "Coverage excludes: ${COVERAGE_EXCLUDES}")

    setup_target_for_coverage_lcov(NAME coverage EXECUTABLE unit_tests DEPENDENCIES unit_tests)
endif ()