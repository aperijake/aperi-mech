#!/bin/bash

# Handle SIGINT (Ctrl-C)
cleanup() {
	# trunk-ignore(shellcheck/SC2317)
	echo "Caught SIGINT signal. Cleaning up ..."
	# Kill all child processes
	# trunk-ignore(shellcheck/SC2317)
	pkill -P $$
	# trunk-ignore(shellcheck/SC2317)
	exit 1
}

# Trap SIGINT and call the cleanup function
trap cleanup SIGINT

# Input flags for running on Mac, AzureGPU2, and AzureGPU3
if [[ $# -eq 0 ]]; then
	echo "Usage: $0 <flags>"
	exit 1
fi

if [[ $1 == "mac" ]]; then
	# Run run_gtest_performance_tests.py
	python3 run_gtest_performance_tests.py --use_mac_defaults
	mkdir -p mac_results_plots
	cd mac_results_plots || exit
	python3 ../plot_shape_function_results.py ../mac_performance_results
	python3 ../plot_solver_results.py ../mac_performance_results
	exit 0
elif [[ $1 == "azuregpu2" ]]; then
	# Run run_gtest_performance_tests.py
	python3 run_gtest_performance_tests.py --use_azure_4proc_defaults
	python3 run_gtest_performance_tests.py --use_azure_t4_defaults
	mkdir -p azuregpu2_results_plots
	cd azuregpu2_results_plots || exit
	python3 ../plot_shape_function_results.py ../azure_t4_performance_results ../azure_4proc_performance_results
	python3 ../plot_solver_results.py ../azure_t4_performance_results ../azure_4proc_performance_results
	exit 0
elif [[ $1 == "azuregpu3" ]]; then
	# Run run_gtest_performance_tests.py
	python3 run_gtest_performance_tests.py --use_azure_40proc_defaults
	python3 run_gtest_performance_tests.py --use_azure_h100_defaults
	mkdir -p azuregpu3_results_plots
	cd azuregpu3_results_plots || exit
	python3 ../plot_shape_function_results.py ../azure_h100_performance_results ../azure_40proc_performance_results
	python3 ../plot_solver_results.py ../azure_h100_performance_results ../azure_40proc_performance_results
	exit 0
else
	echo "Unknown flag: $1"
	echo "Valid flags are: mac, azuregpu2, azuregpu3"
	exit 1
fi
