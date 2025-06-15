#!/bin/bash

# -----------------------------------------------------------------------------
# Helper function to find a file or directory in current or share/aperi-mech
find_in_paths() {
	local name="$1"
	if [[ -e "./${name}" ]]; then
		echo "./${name}"
	elif [[ -e "../share/aperi-mech/${name}" ]]; then
		echo "../share/aperi-mech/${name}"
	else
		echo ""
	fi
}

# Locate material_tests directory
material_tests_dir=$(find_in_paths "material_tests")
if [[ -z ${material_tests_dir} || ! -d ${material_tests_dir} ]]; then
	echo "material_tests directory not found. Please run this script from the build or install directory."
	exit 1
fi

# Locate python_test_driver.py
python_test_driver=$(find_in_paths "material_tests/python_test_driver.py")
if [[ -z ${python_test_driver} || ! -f ${python_test_driver} ]]; then
	echo "material_tests/python_test_driver.py not found. Please run this script from the build or install directory."
	exit 1
fi

# Locate material_driver executable
material_driver_exec=$(find_in_paths "material_driver")
if [[ -z ${material_driver_exec} || ! -f ${material_driver_exec} ]]; then
	echo "material_driver not found. Please run this script from the build or install directory."
	exit 1
fi

# Check if pytest is installed
if ! command -v pytest &>/dev/null; then
	echo "pytest is not installed. Please install pytest per the README instructions and be sure to activate the correct conda environment (e.g. conda activate aperi-mech) before running the tests."
	exit 1
fi
# -----------------------------------------------------------------------------

# Run Python tests with pytest
echo "Running Python tests with pytest..."
export JUPYTER_PLATFORM_DIRS=1
mkdir -p ./material_tests_temp_files
temp_dir=$(realpath ./material_tests_temp_files)
pytest "${python_test_driver}" --material_driver="${material_driver_exec}" --path_to_notebooks="${material_tests_dir}" --temp_dir="${temp_dir}"
