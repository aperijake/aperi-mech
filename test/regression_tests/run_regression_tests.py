#!/usr/bin/env python3

import argparse
import glob
import os
import sys
import time

import yaml

# Add the parent directory to the system path to import custom modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from utils.regression_test import ExodiffCheck, PeakMemoryCheck, RegressionTest


def get_inputs_from_yaml_node(yaml_node, test_name_prefix, build_dir):
    """
    Extracts test inputs from a YAML node.
    """
    inputs = {
        "test_name": f"{test_name_prefix}_{yaml_node['hardware']}_np_{yaml_node['num_processors']}",
        "input_file": yaml_node["input_file"],
        "peak_memory": yaml_node.get("peak_memory_check", {}).get("value"),
        "peak_memory_percent_tolerance": yaml_node.get("peak_memory_check", {}).get(
            "percent_tolerance"
        ),
        "exodiff": [
            {
                "compare_file": exodiff["compare_file"],
                "results_file": exodiff["results_file"],
                "gold_file": exodiff["gold_file"],
            }
            for exodiff in yaml_node["exodiff"]
        ],
        "executable_path": os.path.join(
            build_dir,
            "Release_gpu" if yaml_node["hardware"] == "gpu" else "Release",
            "aperi-mech",
        ),
        "num_processors": yaml_node["num_processors"],
    }
    return inputs


def expand_wildcards(file_patterns):
    """
    Expands wildcard patterns to a list of matching files.
    """
    expanded_files = []
    for pattern in file_patterns:
        expanded_files.extend(glob.glob(pattern))
    return expanded_files


def should_run_test(test_config, cpu_only, serial_only, parallel_only, gpu_only):
    """
    Determines if a test should be run based on the provided flags.
    """
    if (
        (cpu_only and test_config["hardware"] != "cpu")
        or (serial_only and test_config["num_processors"] != 1)
        or (parallel_only and test_config["num_processors"] == 1)
        or (gpu_only and test_config["hardware"] != "gpu")
    ):
        return False
    return True


def execute_test(test_config, dirpath, build_dir, keep_results):
    """
    Executes a single test and returns whether it passed.
    """
    print(f"  Running test {test_config['hardware']}_{test_config['num_processors']}")
    inputs = get_inputs_from_yaml_node(
        test_config, os.path.basename(dirpath), build_dir
    )
    regression_test = RegressionTest(
        inputs["test_name"],
        inputs["executable_path"],
        inputs["num_processors"],
        [inputs["input_file"]],
    )
    return_code, stats = regression_test.run()

    if return_code != 0:
        print("\033[91m  FAIL\033[0m")
        return False

    all_exodiff_passed = all(
        ExodiffCheck(
            f"{inputs['test_name']}_exodiff_{i}",
            "exodiff",
            exodiff["compare_file"],
            exodiff["results_file"],
            exodiff["gold_file"],
            [],
        ).run()
        == 0
        for i, exodiff in enumerate(inputs["exodiff"])
    )

    memcheck_passed = True
    if inputs["peak_memory"] is not None:
        peak_memory_check = PeakMemoryCheck(
            f"{inputs['test_name']}_peak_memory",
            stats["peak_memory"],
            inputs["peak_memory"],
            inputs["peak_memory_percent_tolerance"],
        )
        memcheck_passed = peak_memory_check.run() == 0

    if all_exodiff_passed and memcheck_passed:
        print("\033[92m  PASS\033[0m")
        if (
            not keep_results
            and "cleanup" in test_config
            and "remove" in test_config["cleanup"]
        ):
            cleanup_test_results(test_config)
        return True
    else:
        print("\033[91m  FAIL\033[0m")
        return False


def cleanup_test_results(test_config):
    """
    Cleans up test results based on the cleanup configuration.
    """
    for item in test_config["cleanup"]["remove"]:
        for file in expand_wildcards([item]):
            os.remove(file)


def run_regression_tests_from_directory(
    root_dir,
    build_dir,
    cpu_only=False,
    serial_only=False,
    parallel_only=False,
    gpu_only=False,
    keep_results=False,
):
    """
    Runs regression tests from the specified directory.
    """
    passing_tests = 0
    total_tests = 0
    current_dir = os.getcwd()

    for dirpath, _, filenames in os.walk(root_dir):
        if "test.yaml" in filenames:
            os.chdir(dirpath)
            print("-----------------------------------")
            print(f"Running tests in {dirpath}")

            with open("test.yaml", "r") as file:
                yaml_node = yaml.safe_load(file)
                test_configs = yaml_node["tests"]

                for test_config in test_configs:
                    if not should_run_test(
                        test_config, cpu_only, serial_only, parallel_only, gpu_only
                    ):
                        continue

                    if execute_test(test_config, dirpath, build_dir, keep_results):
                        passing_tests += 1
                    total_tests += 1

            print("-----------------------------------\n")
            os.chdir(current_dir)

    return passing_tests, total_tests


def clean_logs(root_dir):
    """
    Cleans log files from the specified directory.
    """
    for dirpath, _, filenames in os.walk(root_dir):
        if "test.yaml" in filenames:
            print("-----------------------------------")
            print(f"Cleaning logs in {dirpath}")
            for log_file in glob.glob(f"{dirpath}/*.log"):
                os.remove(log_file)
            print("-----------------------------------\n")


def clean_results(root_dir):
    """
    Cleans result files from the specified directory.
    """
    for dirpath, _, filenames in os.walk(root_dir):
        if "test.yaml" in filenames:
            print("-----------------------------------")
            print(f"Cleaning results in {dirpath}")
            yaml_file = os.path.join(dirpath, "test.yaml")
            with open(yaml_file, "r") as file:
                yaml_node = yaml.safe_load(file)
                test_configs = yaml_node["tests"]
                for test_config in test_configs:
                    if "cleanup" in test_config and "remove" in test_config["cleanup"]:
                        for item in test_config["cleanup"]["remove"]:
                            for file in expand_wildcards([item]):
                                os.remove(os.path.join(dirpath, file))
            print("-----------------------------------\n")


def parse_arguments():
    """
    Parses command-line arguments.
    """
    parser = argparse.ArgumentParser(description="Run regression tests.")
    parser.add_argument(
        "--directory",
        help="Directory root containing the tests. Will recursively search for test.yaml files.",
        default=".",
    )
    parser.add_argument(
        "--build_dir",
        help="Directory containing the build",
        default="/home/azureuser/projects/aperi-mech/build/",
    )
    parser.add_argument(
        "--clean_logs",
        help="Clean the log files from the tests and exit",
        action="store_true",
    )
    parser.add_argument(
        "--clean_results",
        help="Clean the results files from the tests and exit",
        action="store_true",
    )
    parser.add_argument(
        "--keep_results",
        help="Keep the results files even if the test passes. (results files are always kept if the test fails)",
        action="store_true",
    )
    parser.add_argument(
        "--no_preclean",
        help="Do not clean the logs and results before running the tests",
        action="store_true",
    )
    parser.add_argument("--cpu", help="Only run CPU tests", action="store_true")
    parser.add_argument("--serial", help="Only run serial tests", action="store_true")
    parser.add_argument(
        "--parallel", help="Only run parallel tests", action="store_true"
    )
    parser.add_argument("--gpu", help="Only run GPU tests", action="store_true")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_arguments()
    build_dir = os.path.abspath(args.build_dir)
    directory = os.path.abspath(args.directory)

    # Clean logs and/or results if specified
    if args.clean_logs or args.clean_results:
        if args.clean_logs:
            clean_logs(directory)
        if args.clean_results:
            clean_results(directory)
        sys.exit(0)

    # Pre-clean logs and results unless specified otherwise
    if not args.no_preclean:
        print("Cleaning logs and results before running the tests")
        clean_logs(directory)
        clean_results(directory)

    # Run regression tests and measure time
    start_time = time.perf_counter()
    passing_tests, total_tests = run_regression_tests_from_directory(
        directory,
        build_dir,
        args.cpu,
        args.serial,
        args.parallel,
        args.gpu,
        args.keep_results,
    )
    end_time = time.perf_counter()
    print(f"Total time: {end_time - start_time:.4e} seconds")

    failing_tests = total_tests - passing_tests
    if failing_tests > 0:
        print(f"{failing_tests} tests failed.")
        print(f"{passing_tests} tests passed.")
        sys.exit(1)
    else:
        print(f"All {passing_tests} tests passed.")
        sys.exit(0)
