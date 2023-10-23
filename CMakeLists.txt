cmake_minimum_required(VERSION 3.10)

# Needed to stop shared library warnings.  If Trilinos
# was compiled with shared libraries and cmake thinks the system
# only works with static libraries then there could be an issue
SET_PROPERTY(GLOBAL PROPERTY TARGET_SUPPORTS_SHARED_LIBS TRUE)

# Set the path to project-specific custom modules
list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")

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

project(stk-crk)

set(LIB_SOURCES
    src/IoMesh.cpp;
   )

add_library(libstk-crk ${LIB_SOURCES})
target_link_libraries( libstk-crk ${EXTRA_LIBS} )

set_property( TARGET libstk-crk PROPERTY CXX_STANDARD 11 )
set_property( TARGET libstk-crk PROPERTY CXX_STANDARD_REQUIRED ON )

target_link_libraries(libstk-crk
			${Trilinos_LIBRARIES}
			${Trilinos_TPL_LIBRARIES}
			)

set(MAIN_SOURCES
    src/main.cpp;
   )

include_directories("${CMAKE_SOURCE_DIR}/include/")
include_directories(${Trilinos_TPL_INCLUDE_DIRS})
include_directories(${Trilinos_INCLUDE_DIRS})

link_directories(${Trilinos_LIBRARY_DIRS})
link_directories(${Trilinos_TPL_LIBRARY_DIRS})

add_executable(stk-crk ${MAIN_SOURCES})
target_link_libraries( stk-crk libstk-crk ${EXTRA_LIBS} )

set_property( TARGET stk-crk PROPERTY CXX_STANDARD 11 )
set_property( TARGET stk-crk PROPERTY CXX_STANDARD_REQUIRED ON )

target_link_libraries(stk-crk
			${Trilinos_LIBRARIES}
			${Trilinos_TPL_LIBRARIES}
			)

# Check the build type and set different executable names
if(CMAKE_BUILD_TYPE STREQUAL "Release")
    set_target_properties(stk-crk PROPERTIES OUTPUT_NAME "stk-crk")
    set_target_properties(libstk-crk PROPERTIES OUTPUT_NAME "libstk-crk")
elseif(CMAKE_BUILD_TYPE STREQUAL "Debug")
    set_target_properties(stk-crk PROPERTIES OUTPUT_NAME "stk-crk_debug")
    set_target_properties(libstk-crk PROPERTIES OUTPUT_NAME "libstk-crk_debug")
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

# Add an executable for the unit tests
add_executable(unit_tests
    test/unit_tests.cpp  # Test runner file
)

target_link_libraries(
    unit_tests
    libstk-crk
    ${Trilinos_LIBRARIES}
    ${Trilinos_TPL_LIBRARIES}
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
            "${KOKKOS_PATH}/*"
            "${TRILINOS_PATH}/*"
            "/opt/homebrew/*")
    setup_target_for_coverage_lcov(NAME coverage EXECUTABLE unit_tests DEPENDENCIES unit_tests)
endif ()
