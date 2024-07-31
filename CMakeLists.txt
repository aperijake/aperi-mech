cmake_minimum_required(VERSION 3.20)
project(aperi-mech)

# Set the flags for the RelWithDebInfo configuration
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO "-O2 -g -pg")

include(cmake/version_info.cmake)
include(cmake/build_settings.cmake)
include(cmake/dependencies.cmake)
include(cmake/targets.cmake)
include(cmake/testing.cmake)
include(cmake/performance_testing.cmake)
include(cmake/code_coverage.cmake)

# Create a symbolic link to the compile_commands.json file
# Determine the source of the compile_commands.json file
set(COMPILE_COMMANDS_SRC "${CMAKE_BINARY_DIR}/compile_commands.json")

# Determine the destination of the symbolic link
set(COMPILE_COMMANDS_DEST "${CMAKE_BINARY_DIR}/../compile_commands.json")

# Create the symbolic link
if(EXISTS ${COMPILE_COMMANDS_SRC})
    execute_process(COMMAND ${CMAKE_COMMAND} -E create_symlink ${COMPILE_COMMANDS_SRC} ${COMPILE_COMMANDS_DEST})
endif()

# Print the CMAKE_BINARY_DIR
message(STATUS "CMAKE_BINARY_DIR: ${CMAKE_BINARY_DIR}")