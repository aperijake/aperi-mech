cmake_minimum_required(VERSION 3.10)

# Needed to stop shared library warnings.  If Trilinos
# was compiled with shared libraries and cmake thinks the system
# only works with static libraries then there could be an issue
SET_PROPERTY(GLOBAL PROPERTY TARGET_SUPPORTS_SHARED_LIBS TRUE)

# Set the path to project-specific custom modules
list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

### TRILINOS ###
MESSAGE("   TRILINOS_PATH = ${TRILINOS_PATH}")

FIND_PACKAGE(Trilinos PATHS ${TRILINOS_PATH}/lib/cmake/Trilinos ${TRILINOS_PATH} NO_DEFAULT_PATH)

IF(Trilinos_FOUND)
	MESSAGE("\nFound Trilinos!  Here are the details: ")
	MESSAGE("   Trilinos_DIR = ${Trilinos_DIR}")
	MESSAGE("   Trilinos_VERSION = ${Trilinos_VERSION}")
	MESSAGE("   Trilinos_PACKAGE_LIST = ${Trilinos_PACKAGE_LIST}")
	MESSAGE("   Trilinos_LIBRARIES = ${Trilinos_LIBRARIES}")
	MESSAGE("   Trilinos_INCLUDE_DIRS = ${Trilinos_INCLUDE_DIRS}")
	MESSAGE("   Trilinos_TPL_LIST = ${Trilinos_TPL_LIST}")
	MESSAGE("   Trilinos_TPL_INCLUDE_DIRS = ${Trilinos_TPL_INCLUDE_DIRS}")
	MESSAGE("   Trilinos_TPL_LIBRARIES = ${Trilinos_TPL_LIBRARIES}")
	MESSAGE("   Trilinos_BUILD_SHARED_LIBS = ${Trilinos_BUILD_SHARED_LIBS}")
	MESSAGE("   Trilinos_CXX_COMPILER = ${Trilinos_CXX_COMPILER}")
	MESSAGE("   Trilinos_C_COMPILER = ${Trilinos_C_COMPILER}")
	MESSAGE("   Trilinos_Fortran_COMPILER = ${Trilinos_Fortran_COMPILER}")
	MESSAGE("   Trilinos_CXX_COMPILER_FLAGS = ${Trilinos_CXX_COMPILER_FLAGS}")
	MESSAGE("   Trilinos_C_COMPILER_FLAGS = ${Trilinos_C_COMPILER_FLAGS}")
	MESSAGE("   Trilinos_Fortran_COMPILER_FLAGS = ${Trilinos_Fortran_COMPILER_FLAGS}")
	MESSAGE("   Trilinos_LINKER = ${Trilinos_LINKER}")
	MESSAGE("   Trilinos_EXTRA_LD_FLAGS = ${Trilinos_EXTRA_LD_FLAGS}")
	MESSAGE("   Trilinos_AR = ${Trilinos_AR}")
	MESSAGE("End of Trilinos details\n")
ELSE()
	MESSAGE(FATAL_ERROR "Could not find Trilinos!")
ENDIF()

IF(NOT CMAKE_CXX_COMPILER)
	MESSAGE("Setting CXX compiler.")
SET(CMAKE_CXX_COMPILER ${Trilinos_CXX_COMPILER})
ENDIF()

IF(NOT CMAKE_C_COMPILER)
	MESSAGE("Setting C compiler.")
SET(CMAKE_C_COMPILER ${Trilinos_C_COMPILER})
ENDIF()

project(aperi-mech)

### MFEM ###
MESSAGE("   MFEM_PATH = ${MFEM_PATH}")

# Find the MFEM include directory
find_path(MFEM_INCLUDE_DIR NAMES mfem.hpp PATHS ${MFEM_PATH}/include)
if(NOT MFEM_INCLUDE_DIR)
    message(FATAL_ERROR "Could not find the MFEM include directory")
endif()

# Find the MFEM library
find_library(MFEM_LIBRARY NAMES mfem PATHS ${MFEM_PATH}/lib)
if(NOT MFEM_LIBRARY)
    message(FATAL_ERROR "Could not find the MFEM library")
endif()

# Add the MFEM include directory to the include paths
include_directories(${MFEM_INCLUDE_DIR})

### HYPER ###
MESSAGE("   HYPER_PATH = ${HYPER_PATH}")

# Find the HYPRE include directory
find_path(HYPRE_INCLUDE_DIR NAMES HYPRE.h PATHS ${HYPRE_PATH}/include)
if(NOT HYPRE_INCLUDE_DIR)
    message(FATAL_ERROR "Could not find the HYPRE include directory")
endif()

# Find the HYPRE library
find_library(HYPRE_LIBRARY NAMES HYPRE PATHS ${HYPRE_PATH}/lib)
if(NOT HYPRE_LIBRARY)
    message(FATAL_ERROR "Could not find the HYPRE library")
endif()

# Add the HYPRE include directory to the include paths
include_directories(${HYPRE_INCLUDE_DIR})

MESSAGE("   YAML-CPP_PATH = ${YAML-CPP_PATH}")
find_package(yaml-cpp REQUIRED PATHS ${YAML-CPP_PATH}/lib/cmake/yaml-cpp ${YAML-CPP_PATH} NO_DEFAULT_PATH)

IF(yaml-cpp_FOUND)
	MESSAGE("   yaml-cpp_DIR = ${yaml-cpp_DIR}")
    MESSAGE("    yaml-cpp_INCLUDE_DIR = ${YAML_CPP_INCLUDE_DIR}")
    MESSAGE("    yaml-cpp_LIBRARIES = ${YAML_CPP_LIBRARIES}")
ELSE()
	MESSAGE(FATAL_ERROR "Could not find yaml-cpp!")
ENDIF()

### EIGEN ###
MESSAGE("   EIGEN_PATH = ${EIGEN_PATH}")
find_package(Eigen3 REQUIRED PATHS ${EIGEN_PATH}/lib/cmake/eigen3 ${EIGEN_PATH} NO_DEFAULT_PATH)

IF(Eigen3_FOUND)
    MESSAGE("   Eigen3_DIR = ${Eigen3_DIR}")
    MESSAGE("    Eigen3_INCLUDE_DIR = ${EIGEN3_INCLUDE_DIR}")
    MESSAGE("    Eigen3_LIBRARIES = ${EIGEN3_LIBRARIES}")
ELSE()
    MESSAGE(FATAL_ERROR "Could not find Eigen3!")
ENDIF()

### apperi-mech ###
file(GLOB LIB_SOURCES "src/*.cpp")

add_library(libaperi-mech ${LIB_SOURCES})

set_property( TARGET libaperi-mech PROPERTY CXX_STANDARD 11 )
set_property( TARGET libaperi-mech PROPERTY CXX_STANDARD_REQUIRED ON )

target_link_libraries(libaperi-mech
            yaml-cpp
            ${MFEM_LIBRARY}
            Eigen3::Eigen
			${Trilinos_LIBRARIES}
			${Trilinos_TPL_LIBRARIES}
            ${EXTRA_LIBS}
			)

set(MAIN_SOURCES
    src/main.cpp;
   )

include_directories("${CMAKE_SOURCE_DIR}/include/")
include_directories(${Trilinos_TPL_INCLUDE_DIRS})
include_directories(${Trilinos_INCLUDE_DIRS})

link_directories(${Trilinos_LIBRARY_DIRS})
link_directories(${Trilinos_TPL_LIBRARY_DIRS})

add_executable(aperi-mech ${MAIN_SOURCES})
target_link_libraries( aperi-mech libaperi-mech )

set_property( TARGET aperi-mech PROPERTY CXX_STANDARD 11 )
set_property( TARGET aperi-mech PROPERTY CXX_STANDARD_REQUIRED ON )

# Check the build type and set different executable names
if(CMAKE_BUILD_TYPE STREQUAL "Release")
    set_target_properties(aperi-mech PROPERTIES OUTPUT_NAME "aperi-mech")
    set_target_properties(libaperi-mech PROPERTIES OUTPUT_NAME "libaperi-mech")
elseif(CMAKE_BUILD_TYPE STREQUAL "Debug")
    set_target_properties(aperi-mech PROPERTIES OUTPUT_NAME "aperi-mech_debug")
    set_target_properties(libaperi-mech PROPERTIES OUTPUT_NAME "libaperi-mech_debug")
elseif(CMAKE_BUILD_TYPE STREQUAL "RelWithDebInfo")
    set_target_properties(aperi-mech PROPERTIES OUTPUT_NAME "aperi-mech_relwithdebinfo")
    set_target_properties(libaperi-mech PROPERTIES OUTPUT_NAME "libaperi-mech_relwithdebinfo")
endif()

############# TESTING ############# 

enable_testing()

MESSAGE("   GTEST_PATH = ${GTEST_PATH}")

find_package(GTest REQUIRED PATHS ${GTEST_PATH}/lib/cmake/GTest ${GTEST_PATH} NO_DEFAULT_PATH)

IF(GTest_FOUND)
	MESSAGE("   GTest_DIR = ${GTest_DIR}")
ELSE()
	MESSAGE(FATAL_ERROR "Could not find GTest!")
ENDIF()

include(GoogleTest)

file(GLOB TEST_SOURCES "test/*.cpp")

include_directories("${CMAKE_SOURCE_DIR}/test/")

# Add an executable for the unit tests
add_executable(unit_tests
    test/unit_tests.cpp  # Test runner file
    ${TEST_SOURCES}
)

target_link_libraries(
    unit_tests
    libaperi-mech
    GTest::gtest_main
)

# Check the build type and set different executable names, add code coverage for debug
if(CMAKE_BUILD_TYPE STREQUAL "Release")
    set_target_properties(unit_tests PROPERTIES OUTPUT_NAME "unit_tests")
elseif(CMAKE_BUILD_TYPE STREQUAL "Debug")
    set_target_properties(unit_tests PROPERTIES OUTPUT_NAME "unit_tests_debug")
endif()

gtest_discover_tests(unit_tests)

############# CODE COVERAGE #############
if (CODE_COVERAGE)
    MESSAGE("   LCOV_BIN_DIR = ${LCOV_BIN_DIR}")
    list(APPEND CMAKE_PREFIX_PATH "${LCOV_BIN_DIR}")
    include(CodeCoverage)
    append_coverage_compiler_flags()
    set(COVERAGE_EXCLUDES
            "/Applications/*"
            "src/main.cpp"
            "${KOKKOS_PATH}/*"
            "${TRILINOS_PATH}/*"
            "${YAML-CPP_PATH}/*"
            "${EIGEN_PATH}/*"
            "/opt/homebrew/*")
    setup_target_for_coverage_lcov(NAME coverage EXECUTABLE unit_tests DEPENDENCIES unit_tests)
endif ()
