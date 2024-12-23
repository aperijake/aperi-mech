#!/bin/bash

# This script is used to run the performance pipeline locally. It is used for testing purposes only.

# Path to the performance pipeline scripts
github_path=$(git rev-parse --show-toplevel)'/.github'

# IP address and username of the machine where the performance tests will be executed
machine_ip="127.0.0.1"
machine_username="azureuser"

# Run on the GPU
gpu=true

# Run in parallel
parallel=false

# Clean old performance results
bash "${github_path}/workflows/clean_old_performance_results.sh" ${machine_ip} ${machine_username}

# Build the code (TODO: Add the build script). This assumes that the current state of the code is what we want to test.

# Run the performance tests
bash "${github_path}/actions/run-aperi-mech-performance-tests/run_performance_tests.sh" ${machine_ip} ${machine_username} ${gpu} ${parallel}

# Collect the performance test results
bash "${github_path}/workflows/collect_performance_test_results.sh" ${machine_ip} ${machine_username}

# Generate the performance test report (TODO: Add the report generation script)
