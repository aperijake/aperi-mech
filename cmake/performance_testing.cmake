############# PERFORMANCE TESTING #############
file(GLOB PERFORMANCE_TEST_SOURCES "test/performance_tests/gtests/*.cpp")
list(APPEND PERFORMANCE_TEST_SOURCES "test/unit_tests/UnitTestUtils.cpp")

# Add an executable for the unit tests
add_executable(performance_tests
    ${PERFORMANCE_TEST_SOURCES}
)
target_include_directories(performance_tests PRIVATE
    "${CMAKE_SOURCE_DIR}/include/"
    "${CMAKE_SOURCE_DIR}/test/unit_tests/"
    "${CMAKE_SOURCE_DIR}/test/performance_tests/gtests/"
    ${MPI_INCLUDE_PATH}
)
target_link_libraries(performance_tests
    aperimech
    GTest::gtest_main
)
gtest_discover_tests(performance_tests TIMEOUT 3600 DISCOVERY_TIMEOUT 600)

# Copy the gold values file to the build directory
configure_file(
    "${CMAKE_SOURCE_DIR}/test/performance_tests/gtests/gold_values.csv"
    "${CMAKE_BINARY_DIR}/gold_values.csv"
    COPYONLY
)