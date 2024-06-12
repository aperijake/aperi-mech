cmake_minimum_required(VERSION 3.20)
project(aperi-mech)

# Set the flags for the RelWithDebInfo configuration
set(CMAKE_CXX_FLAGS_RELWITHDEBINFO "-O2 -g -pg")

############# VERSION INFO #############
# Get the latest abbreviated commit hash of the working branch
execute_process(
    COMMAND git rev-parse --short HEAD
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    OUTPUT_VARIABLE GIT_COMMIT_HASH
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

# Check if there are any uncommitted changes or untracked files
execute_process(
    COMMAND git status --porcelain
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    OUTPUT_VARIABLE GIT_STATUS_OUTPUT
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

if ("${GIT_STATUS_OUTPUT}" STREQUAL "")
    set(GIT_DIRTY "clean")
else()
    set(GIT_DIRTY "dirty")
endif()

# Get the current branch name
execute_process(
    COMMAND git rev-parse --abbrev-ref HEAD
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    OUTPUT_VARIABLE GIT_BRANCH
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

# Get the latest tag
execute_process(
    COMMAND git describe --tags --abbrev=0
    WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
    OUTPUT_VARIABLE GIT_TAG
    OUTPUT_STRIP_TRAILING_WHITESPACE
)

# Set the build type and the date and time of the build
set(BUILD_TYPE ${CMAKE_BUILD_TYPE})
string(TIMESTAMP BUILD_DATE "%Y-%m-%d")
string(TIMESTAMP BUILD_TIME "%H:%M:%S")

IF(GPU)
    set(GPU_OR_CPU "GPU")
else()
    set(GPU_OR_CPU "CPU")
endif()

# Generate git_commit.h with the current hash
configure_file(
    ${CMAKE_SOURCE_DIR}/include/git_commit.h.in
    ${CMAKE_BINARY_DIR}/generated/git_commit.h
)

############# BUILD #############
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CUDA_STANDARD 14)

# Set the project languages
enable_language(CXX)

IF(GPU)
	enable_language(CUDA)
	set(CUDA_SEPARABLE_COMPILATION ON)
ENDIF()

# Set the path to project-specific custom modules
list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

# Find package
find_package(Kokkos REQUIRED PATHS ${Kokkos_ROOT} NO_DEFAULT_PATH)
find_package(Trilinos REQUIRED PATHS ${TRILINOS_PATH}/lib/cmake/Trilinos ${TRILINOS_PATH} NO_DEFAULT_PATH)
find_package(Eigen3 REQUIRED PATHS ${EIGEN_PATH}/lib/cmake/eigen3 ${EIGEN_PATH} NO_DEFAULT_PATH)
find_package(GTest REQUIRED PATHS ${GTEST_PATH}/lib/cmake/GTest ${GTEST_PATH} NO_DEFAULT_PATH)
find_package(yaml-cpp REQUIRED PATHS ${YAML-CPP_PATH}/lib/cmake/yaml-cpp ${YAML-CPP_PATH} NO_DEFAULT_PATH)
find_path(MFEM_INCLUDE_DIR NAMES mfem.hpp PATHS ${MFEM_PATH}/include NO_DEFAULT_PATH)
find_library(MFEM_LIBRARY NAMES mfem PATHS ${MFEM_PATH}/lib NO_DEFAULT_PATH)
find_path(HYPRE_INCLUDE_DIR NAMES HYPRE.h PATHS ${HYPRE_PATH}/include NO_DEFAULT_PATH)
find_library(HYPRE_LIBRARY NAMES HYPRE PATHS ${HYPRE_PATH}/lib NO_DEFAULT_PATH)
find_path(MPI_INCLUDE_PATH NAMES mpi.h PATHS ${OPENMPI_PATH}/include NO_DEFAULT_PATH)
find_library(MPI_LIBRARIES NAMES mpi PATHS ${OPENMPI_PATH}/lib NO_DEFAULT_PATH)
find_package(Compadre REQUIRED PATHS ${COMPADRE_PATH}/lib/cmake/Compadre ${COMPADRE_PATH} NO_DEFAULT_PATH)

### aperi-mech ###
file(GLOB LIB_SOURCES "src/*.cpp")
list(REMOVE_ITEM LIB_SOURCES "${CMAKE_SOURCE_DIR}/src/main.cpp")

add_library(aperimech ${LIB_SOURCES})

target_link_libraries(aperimech
    yaml-cpp
    Eigen3::Eigen
    ${MFEM_LIBRARY}
    ${Trilinos_LIBRARIES}
    ${Trilinos_TPL_LIBRARIES}
    ${MPI_LIBRARIES}
    ${EXTRA_LIBS}
    Kokkos::kokkos
    Compadre::compadre
)

target_include_directories(aperimech PRIVATE
	"${CMAKE_SOURCE_DIR}/include/"
	${Trilinos_TPL_INCLUDE_DIRS}
	${Trilinos_INCLUDE_DIRS}
	${Kokkos_INCLUDE_DIRS}
	${MPI_INCLUDE_PATH}
	${MFEM_INCLUDE_DIR}
	${HYPRE_INCLUDE_DIR}
	)

set(MAIN_SOURCES
	src/main.cpp;
	)

add_executable(aperi-mech ${MAIN_SOURCES})

target_link_libraries(aperi-mech
    aperimech
    ${MPI_LIBRARIES}
    )

# Print the CMAKE_BINARY_DIR
message(STATUS "CMAKE_BINARY_DIR: ${CMAKE_BINARY_DIR}")

target_include_directories(aperi-mech PRIVATE
	"${CMAKE_SOURCE_DIR}/include/"
    "${CMAKE_BINARY_DIR}/generated/"
    ${MPI_INCLUDE_PATH}
    ${MFEM_INCLUDE_DIR}
    ${HYPRE_INCLUDE_DIR}
    )

############# TESTING #############

enable_testing()

include(GoogleTest)

file(GLOB TEST_SOURCES "test/*.cpp")

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
