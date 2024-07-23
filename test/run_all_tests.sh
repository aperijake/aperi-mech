#!/bin/bash

# Run C++ Google Tests
echo "Running C++ Google Tests..."
./unit_tests
gtest_status=$?

# Run Python tests with pytest
echo "Running Python tests with pytest..."
cd material_tests
pytest python_test_driver.py
pytest_status=$?

# Check if any tests failed
if [ $gtest_status -ne 0 ] || [ $pytest_status -ne 0 ]; then
	echo "Some tests failed."
    echo "Remember to load the correct conda environment before running the tests."
	exit 1
else
	echo "All tests passed."
	exit 0
fi