cmake_minimum_required(VERSION 3.20)
project(aperi-mech)

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

# Find package/
find_package(Kokkos REQUIRED PATHS ${Kokkos_ROOT} NO_DEFAULT_PATH)
find_package(Trilinos REQUIRED PATHS ${TRILINOS_PATH}/lib/cmake/Trilinos ${TRILINOS_PATH} NO_DEFAULT_PATH)
find_package(MPI REQUIRED)
find_package(Eigen3 REQUIRED PATHS ${EIGEN_PATH}/lib/cmake/eigen3 ${EIGEN_PATH} NO_DEFAULT_PATH)
find_package(GTest REQUIRED PATHS ${GTEST_PATH}/lib/cmake/GTest ${GTEST_PATH} NO_DEFAULT_PATH)
find_package(yaml-cpp REQUIRED PATHS ${YAML-CPP_PATH}/lib/cmake/yaml-cpp ${YAML-CPP_PATH} NO_DEFAULT_PATH)
find_path(MFEM_INCLUDE_DIR NAMES mfem.hpp PATHS ${MFEM_PATH}/include)
find_library(MFEM_LIBRARY NAMES mfem PATHS ${MFEM_PATH}/lib)
find_path(HYPRE_INCLUDE_DIR NAMES HYPRE.h PATHS ${HYPRE_PATH}/include)
find_library(HYPRE_LIBRARY NAMES HYPRE PATHS ${HYPRE_PATH}/lib)

### aperi-mech ###
file(GLOB LIB_SOURCES "src/*.cpp")
list(REMOVE_ITEM LIB_SOURCES "${CMAKE_SOURCE_DIR}/src/main.cpp")

add_library(libaperi-mech ${LIB_SOURCES})

target_link_libraries(libaperi-mech
	Kokkos::kokkos
	yaml-cpp
	Eigen3::Eigen
	${MFEM_LIBRARY}
	${Trilinos_LIBRARIES}
	${Trilinos_TPL_LIBRARIES}
	${MPI_LIBRARIES}
	${EXTRA_LIBS}
	)

target_include_directories(libaperi-mech PRIVATE
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
    libaperi-mech
    ${MPI_LIBRARIES}
    )

target_include_directories(aperi-mech PRIVATE
	"${CMAKE_SOURCE_DIR}/include/"
    ${MPI_INCLUDE_PATH}
    )

# Check the build type and set different executable names
set_target_properties(libaperi-mech PROPERTIES
    OUTPUT_NAME "libaperi-mech$<$<CONFIG:Debug>:_debug>$<$<CONFIG:RelWithDebInfo>:_relwithdebinfo>"
	)
set_target_properties(aperi-mech PROPERTIES
    OUTPUT_NAME "aperi-mech$<$<CONFIG:Debug>:_debug>$<$<CONFIG:RelWithDebInfo>:_relwithdebinfo>"
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
	libaperi-mech
	GTest::gtest_main
	)

# Check the build type and set different executable names
set_target_properties(unit_tests PROPERTIES
    OUTPUT_NAME "unit_tests$<$<CONFIG:Debug>:_debug>$<$<CONFIG:RelWithDebInfo>:_relwithdebinfo>"
	)

gtest_discover_tests(unit_tests TIMEOUT 10000)

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
