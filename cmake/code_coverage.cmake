############# CODE COVERAGE #############
if (CODE_COVERAGE)
    list(APPEND CMAKE_PREFIX_PATH "${LCOV_BIN_DIR}")
    include(CodeCoverage)
    append_coverage_compiler_flags()
    set(COVERAGE_EXCLUDES
        "/Applications/*"
        "src/main.cpp"
        "${KOKKOS_ROOT}/*"
        "${TRILINOS_PATH}/*"
        "${YAML-CPP_PATH}/*"
        "${EIGEN_PATH}/*"
        "/opt/homebrew/*")
    setup_target_for_coverage_lcov(NAME coverage EXECUTABLE unit_tests DEPENDENCIES unit_tests)
endif ()