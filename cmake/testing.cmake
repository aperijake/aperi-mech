############# TESTING #############
enable_testing()
include(GoogleTest)
file(GLOB TEST_SOURCES "test/*.cpp")
list(FILTER TEST_SOURCES EXCLUDE REGEX ".*PerformanceTest.cpp$")
list(FILTER TEST_SOURCES EXCLUDE REGEX "test/performance_tests.cpp")

# Add an executable for the unit tests
add_executable(unit_tests
    test/unit_tests.cpp  # Test runner file
    ${TEST_SOURCES}
)
target_include_directories(unit_tests PRIVATE
    "${CMAKE_SOURCE_DIR}/include/"
    "${CMAKE_SOURCE_DIR}/test/"
    ${MPI_INCLUDE_PATH}
)
target_link_libraries(unit_tests
    aperimech
    GTest::gtest_main
)
gtest_discover_tests(unit_tests TIMEOUT 3600 DISCOVERY_TIMEOUT 600)

# Add a custom target to run all the unit tests, both the googletests in unit_tests and testbook tests in the python notebooks (e.g. material_tests)
add_custom_target(run_all_unit_tests
    COMMAND ${CMAKE_CURRENT_SOURCE_DIR}/test/run_all_unit_tests.sh
    DEPENDS unit_tests
    WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
)

# Create a symbolic link to the material_test directory in the build directory so that the run_all_unit_tests script can find it
add_custom_target(create_material_tests_symlink ALL
    COMMAND ${CMAKE_COMMAND} -E create_symlink
    ${CMAKE_SOURCE_DIR}/test/material_tests ${CMAKE_CURRENT_BINARY_DIR}/material_tests
    COMMENT "Creating symlink to material_tests directory"
)
add_dependencies(run_all_unit_tests create_material_tests_symlink)