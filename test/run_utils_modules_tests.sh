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

# Locate utils directory
utils_dir=$(find_in_paths "utils")
if [[ -z ${utils_dir} || ! -d ${utils_dir} ]]; then
	echo "utils directory not found. Please run this script from the build or install directory."
	exit 1
fi

# Locate unit_test_all_modules.py
unit_test_py=$(find_in_paths "utils/unit_test_all_modules.py")
if [[ -z ${unit_test_py} || ! -f ${unit_test_py} ]]; then
	echo "utils/unit_test_all_modules.py not found. Please run this script from the build or install directory."
	exit 1
fi

# -----------------------------------------------------------------------------

# Run unit tests for all modules
echo "Running unit tests for all utils modules..."
(cd "${utils_dir}" && python3 "$(basename "${unit_test_py}")")
