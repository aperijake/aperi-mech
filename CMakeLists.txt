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

# Print the CMAKE_BINARY_DIR
message(STATUS "CMAKE_BINARY_DIR: ${CMAKE_BINARY_DIR}")