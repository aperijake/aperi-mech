cmake_minimum_required(VERSION 3.10)

# Needed to stop shared library warnings.  If Trilinos
# was compiled with shared libraries and cmake thinks the system
# only works with static libraries then there could be an issue
SET_PROPERTY(GLOBAL PROPERTY TARGET_SUPPORTS_SHARED_LIBS TRUE)

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

set(SOURCES
    src/IoMesh.cpp;
    src/main.cpp;
   )

include_directories("${CMAKE_SOURCE_DIR}/include/")
include_directories(${Trilinos_TPL_INCLUDE_DIRS})
include_directories(${Trilinos_INCLUDE_DIRS})

link_directories(${Trilinos_LIBRARY_DIRS})
link_directories(${Trilinos_TPL_LIBRARY_DIRS})

add_executable(stk-crk.out ${SOURCES})
target_link_libraries( stk-crk.out ${EXTRA_LIBS} )

set_property( TARGET stk-crk.out PROPERTY CXX_STANDARD 11 )
set_property( TARGET stk-crk.out PROPERTY CXX_STANDARD_REQUIRED ON )

target_link_libraries(stk-crk.out
			${Trilinos_LIBRARIES}
			${Trilinos_TPL_LIBRARIES}
			)

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
    ${Trilinos_LIBRARIES}
    ${Trilinos_TPL_LIBRARIES}
    GTest::gtest_main
)

gtest_discover_tests(unit_tests)

# Optionally, configure code coverage with tools like gcov/lcov
# This is useful for tracking code coverage in your tests
#if (CODE_COVERAGE)
#    include(CodeCoverage)
#    append_coverage_compiler_flags()
#    setup_target_for_coverage(NAME coverage EXECUTABLE unit_tests DEPENDENCIES unit_tests)
#endif ()

# # CTest unit tester
# add_subdirectory( unit_test )
# 
# enable_testing()
# include(CTest)
# add_test("elastic/tension_gauss_fem" rkpm_test -p -d ../test/regression/elastic/tension_gauss_fem)
