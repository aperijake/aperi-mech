#!/bin/bash

# -----------------------------------------------------------------------------
# Check for required files and folders

# Check if material_tests directory exists
if [[ ! -d ./material_tests ]]; then
    echo "material_tests directory not found. Please run this script from the build directory."
    exit 1
fi

# Check if material_tests/python_test_driver.py exists
if [[ ! -f ./material_tests/python_test_driver.py ]]; then
    echo "python_test_driver.py not found. Please run this script from the build directory."
    exit 1
fi

# Check if material_driver exists
if [[ ! -f ./material_driver ]]; then
    echo "material_driver not found. Please run this script from the build directory."
    exit 1
fi

# Check if unit_tests exists
if [[ ! -f ./unit_tests ]]; then
    echo "unit_tests executable not found. Please build the project first."
    echo "This should be run from the build directory using the command: make run_all_tests"
    exit 1
fi

# Check if pytest is installed
if ! command -v pytest &> /dev/null; then
    echo "pytest is not installed. Please install pytest per the README instructions and be sure to activate the correct conda environment (e.g. conda activate aperi-mech) before running the tests."
    exit 1
fi
# -----------------------------------------------------------------------------

# Run C++ Google Tests
echo "Running C++ Google Tests..."
./unit_tests
gtest_status=$?

# Run Python tests with pytest
echo "Running Python tests with pytest..."
# Set JUPYTER_PLATFORM_DIRS environment variable to use platformdirs, supressing warnings
export JUPYTER_PLATFORM_DIRS=1
# Make a temporary directory for the created files
mkdir -p ./material_tests_temp_files
# Full path to the temporary directory
temp_dir=$(realpath ./material_tests_temp_files)
pytest ./material_tests/python_test_driver.py --material_driver="./material_driver" --path_to_notebooks="./material_tests" --temp_dir="${temp_dir}"
pytest_status=$?

# Check if any tests failed
if [[ ${gtest_status} -ne 0 ]] || [[ ${pytest_status} -ne 0 ]]; then
	echo "Some tests failed."
    echo "Remember to load the correct conda environment (e.g. conda activate aperi-mech) before running the tests."
	exit 1
else
	echo "All tests passed."
	exit 0
fi