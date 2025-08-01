############# TESTING #############
enable_testing()
include(GoogleTest)
file(GLOB TEST_SOURCES "test/unit_tests/*.cpp")

# Add protego-mech tests
if(USE_PROTEGO_MECH)
    file(GLOB PROTEGO_MECH_TEST_SOURCES "protego-mech/test/unit_tests/*.cpp")
    list(APPEND TEST_SOURCES ${PROTEGO_MECH_TEST_SOURCES})
    # Remove some tests that wont work with protego-mech. TODO(jake): Some of these tests can be fixed to work with protego-mech
    list(REMOVE_ITEM TEST_SOURCES "${CMAKE_SOURCE_DIR}/test/unit_tests/FunctionEvaluationProcessorTest.cpp")
    list(REMOVE_ITEM TEST_SOURCES "${CMAKE_SOURCE_DIR}/test/unit_tests/FunctionCreationProcessorTest.cpp")
    list(REMOVE_ITEM TEST_SOURCES "${CMAKE_SOURCE_DIR}/test/unit_tests/CompadreApproximationFunctionTest.cpp")
endif()

# Add an executable for the unit tests
add_executable(unit_tests
    ${TEST_SOURCES}
)
target_include_directories(unit_tests PRIVATE
    "${CMAKE_SOURCE_DIR}/include/"
    "${CMAKE_SOURCE_DIR}/test/unit_tests/"
    ${MPI_INCLUDE_PATH}
)
target_link_libraries(unit_tests
    aperimech
    GTest::gtest_main
)
if(USE_PROTEGO_MECH)
    target_compile_definitions(unit_tests PRIVATE USE_PROTEGO_MECH)
endif()
gtest_discover_tests(unit_tests TIMEOUT 3600 DISCOVERY_TIMEOUT 600)

# Install unit_tests executable
install(TARGETS unit_tests
    RUNTIME DESTINATION bin
)

#--------------------------------------------------
# Create a symbolic link to the test/unit_tests/test_inputs directory in the build directory so that unit_tests can find it
add_custom_target(create_inputs_symlink ALL
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_CURRENT_BINARY_DIR}/share/aperi-mech
    COMMAND ${CMAKE_COMMAND} -E create_symlink
    ${CMAKE_SOURCE_DIR}/test/unit_tests/test_inputs ${CMAKE_CURRENT_BINARY_DIR}/share/aperi-mech/test_inputs
    COMMENT "Creating symlink to share/aperi-mech/test_inputs directory"
)
#--------------------------------------------------

#--------------------------------------------------
# Add a custom target to run all the material tests, the testbook tests in the python notebooks (e.g. material_tests)
add_custom_target(run_material_tests
    COMMAND ${CMAKE_CURRENT_SOURCE_DIR}/test/run_material_tests.sh
    DEPENDS material_driver
    WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
)

# Create a symbolic link to the material_test directory in the build directory so that the run_all_unit_tests script can find it
add_custom_target(create_material_tests_symlink ALL
    COMMAND ${CMAKE_COMMAND} -E create_symlink
    ${CMAKE_SOURCE_DIR}/test/material_tests ${CMAKE_CURRENT_BINARY_DIR}/material_tests
    COMMENT "Creating symlink to material_tests directory"
)
add_dependencies(run_material_tests create_material_tests_symlink)
#--------------------------------------------------

#--------------------------------------------------
# Add a custom target to run all the utils module tests
add_custom_target(run_utils_modules_tests
    COMMAND ${CMAKE_CURRENT_SOURCE_DIR}/test/run_utils_modules_tests.sh
    DEPENDS aperi-mech
    WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}
)

# Create a symbolic link to the utils directory in the build directory so that the run_all_unit_tests script can find it
add_custom_target(create_utils_symlink ALL
    COMMAND ${CMAKE_COMMAND} -E create_symlink
    ${CMAKE_SOURCE_DIR}/test/utils ${CMAKE_CURRENT_BINARY_DIR}/utils
    COMMENT "Creating symlink to utils directory"
)
add_dependencies(run_utils_modules_tests create_utils_symlink)
#--------------------------------------------------
