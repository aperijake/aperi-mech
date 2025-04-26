############# PERFORMANCE TESTING #############
file(GLOB PERFORMANCE_TEST_SOURCES "test/performance_tests/gtests/*.cpp")
file(GLOB UNITTEST_UTILS "test/unit_tests/UnitTest*Utils.cpp")
if(UNITTEST_UTILS)
    list(APPEND PERFORMANCE_TEST_SOURCES ${UNITTEST_UTILS})
endif()

# Add an executable for the unit tests
add_executable(performance_tests
    ${PERFORMANCE_TEST_SOURCES}
)
target_include_directories(performance_tests PRIVATE
    "${CMAKE_SOURCE_DIR}/include/"
    "${CMAKE_SOURCE_DIR}/test/unit_tests/"
    "${CMAKE_SOURCE_DIR}/test/performance_tests/gtests/"
    ${MPI_INCLUDE_PATH}
)
target_link_libraries(performance_tests
    aperimech
    GTest::gtest_main
)
if(USE_PROTEGO_MECH)
    target_compile_definitions(performance_tests PRIVATE USE_PROTEGO_MECH)
endif()
gtest_discover_tests(performance_tests TIMEOUT 3600 DISCOVERY_TIMEOUT 600)