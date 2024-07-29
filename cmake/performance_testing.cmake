############# PERFORMANCE TESTING #############
file(GLOB PERFORMANCE_TEST_SOURCES "test/*PerformanceTest.cpp")
list(APPEND PERFORMANCE_TEST_SOURCES "test/UnitTestUtils.cpp")
list(FILTER TEST_SOURCES EXCLUDE REGEX "test/unit_tests.cpp")

# Add an executable for the unit tests
add_executable(performance_tests
    test/performance_tests.cpp  # Test runner file
    ${PERFORMANCE_TEST_SOURCES}
)
target_include_directories(performance_tests PRIVATE
    "${CMAKE_SOURCE_DIR}/include/"
    "${CMAKE_SOURCE_DIR}/test/"
    ${MPI_INCLUDE_PATH}
)
target_link_libraries(performance_tests
    aperimech
    GTest::gtest_main
)
gtest_discover_tests(performance_tests TIMEOUT 3600 DISCOVERY_TIMEOUT 600)