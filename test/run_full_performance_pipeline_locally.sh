#!/bin/bash

# This script is used to run the performance pipeline locally. It is used for testing purposes only.

# Clean the old results
echo "Cleaning old results..."
python3 ./run_performance_pipeline_locally.py --clean

# Run, serial, cpu performance tests
echo "Running serial, cpu performance tests..."
python3 ./run_performance_pipeline_locally.py

# Run, serial, gpu performance tests
echo "Running serial, gpu performance tests..."
python3 ./run_performance_pipeline_locally.py --gpu true

# Run, parallel, cpu performance tests
echo "Running parallel, cpu performance tests..."
python3 ./run_performance_pipeline_locally.py --parallel true

# Collect the results and generate the report
echo "Collecting the results and generating the report..."
python3 ./run_performance_pipeline_locally.py --collect --generate-report
