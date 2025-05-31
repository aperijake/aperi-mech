cmake_minimum_required(VERSION 3.20)
project(aperi-mech)

# Add options
option(CHECK_CODE_COVERAGE "Enable code coverage" OFF)
option(USE_GPU "Enable GPU support" OFF)
option(USE_PROTEGO_MECH "Include protego-mech library" OFF)
option(USE_SANITIZER "Enable sanitizer" OFF)
set(GPU_OPTIMIZE_LEVEL "3" CACHE STRING "GPU optimization level (1-3, default 3)")

# Set the flags for Debug configuration (if you don't have this already)
set(CMAKE_CXX_FLAGS_DEBUG "-O0 -g")
set(CMAKE_C_FLAGS_DEBUG "-O0 -g")

# Set the flags for the RelWithDebInfo configuration
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO "-O3 -g -DNDEBUG")
set(CMAKE_C_FLAGS_RELWITHDEBINFO "-O3 -g -DNDEBUG")

# Set the flags for the Release configuration
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -DNDEBUG")
set(CMAKE_C_FLAGS_RELEASE "-O3 -DNDEBUG")

# Set GPU-specific optimization flags
if(USE_GPU)
  # Use the optimization level from GPU_OPTIMIZE_LEVEL
  set(CMAKE_CUDA_FLAGS_DEBUG "-O0 -g -G")
  set(CMAKE_CUDA_FLAGS_RELEASE "-O${GPU_OPTIMIZE_LEVEL} -DNDEBUG")
  set(CMAKE_CUDA_FLAGS_RELWITHDEBINFO "-O${GPU_OPTIMIZE_LEVEL} -g -lineinfo")
  
  message(STATUS "Using GPU optimization level: -O${GPU_OPTIMIZE_LEVEL}")
endif()

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