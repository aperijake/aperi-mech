cmake_minimum_required(VERSION 3.20)
project(aperi-mech)

# Add options
option(CHECK_CODE_COVERAGE "Enable code coverage" OFF)
option(USE_GPU "Enable GPU support" OFF)
option(USE_PROTEGO_MECH "Include protego-mech library" OFF)
option(USE_SANITIZER "Enable sanitizer" OFF)

# Set the flags for the RelWithDebInfo configuration
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO "-O2 -g -pg")
set(CMAKE_C_FLAGS_RELWITHDEBINFO "-O2 -g -pg")

# Set the flags for the Release configuration
set(MAKE_CXX_FLAGS_RELEASE "-O3")
set(CMAKE_C_FLAGS_RELEASE "-O3")

include(cmake/version_info.cmake)
include(cmake/build_settings.cmake)
include(cmake/dependencies.cmake)
include(cmake/targets.cmake)
include(cmake/testing.cmake)
include(cmake/performance_testing.cmake)
include(cmake/code_coverage.cmake)
include(cmake/sanitizer.cmake)

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
