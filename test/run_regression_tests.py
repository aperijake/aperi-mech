#!/usr/bin/env python3

import argparse
import glob
import os
import sys
import time

import yaml
from utils.regression_test import (
    ExodiffCheck,
    PeakMemoryCheck,
    RegressionTest,
    RunTimeCheck,
)


def get_build(yaml_node):
    """
    Gets the build from the yaml node.
    """

    # Default to Release
    build = "Release"

    # If a build is specified in the yaml file, use that instead
    if "build" in yaml_node:
        # Make sure it is Release or Debug, handle upper and lower case
        if yaml_node["build"].lower() not in ["release", "debug"]:
            raise ValueError(
                f"Invalid build type {yaml_node['build']}. Must be Release or Debug."
            )

        if yaml_node["build"].lower() == "release":
            build = "Release"
        else:
            build = "Debug"

    if "hardware" in yaml_node:
        build += "_gpu" if yaml_node["hardware"] == "gpu" else ""

    return build


def set_exe_path(build_dir, build):
    """
    Sets the executable path based on the build and hardware.
    """
    # Set the executable path
    executable_path = os.path.join(build_dir, build, "aperi-mech")

    return executable_path


def get_inputs_from_yaml_node(yaml_node, test_name_prefix, build_dir):
    """
    Extracts test inputs from a YAML node.
    """

    # Set the inputs
    inputs = {
        "test_name": f"{test_name_prefix}_{yaml_node['hardware']}_np_{yaml_node['num_processors']}",
        "input_file": yaml_node["input_file"],
        "peak_memory": yaml_node.get("peak_memory_check", {}).get("value"),
        "peak_memory_percent_tolerance": yaml_node.get("peak_memory_check", {}).get(
            "percent_tolerance"
        ),
        "run_time": yaml_node.get("run_time_check", {}).get("value"),
        "run_time_percent_tolerance": yaml_node.get("run_time_check", {}).get(
            "percent_tolerance"
        ),
        "exodiff": [],
        "executable_path": None,
        "num_processors": yaml_node["num_processors"],
        "args": yaml_node.get("args", []),
    }

    # Set the executable path
    inputs["executable_path"] = set_exe_path(build_dir, get_build(yaml_node))

    # Set the exodiff inputs
    if "exodiff" in yaml_node:
        for exodiff in yaml_node["exodiff"]:
            # if exodiff has 'args' key, add it to the exodiff check
            inputs["exodiff"].append(
                {
                    "compare_file": exodiff["compare_file"],
                    "results_file": exodiff["results_file"],
                    "gold_file": exodiff["gold_file"],
                    "args": exodiff.get("args", []),
                }
            )

    return inputs


def expand_wildcards(file_patterns):
    """
    Expands wildcard patterns to a list of matching files.
    """
    expanded_files = []
    for pattern in file_patterns:
        expanded_files.extend(glob.glob(pattern))
    return expanded_files


def should_run_test(
    test_config,
    cpu_only,
    serial_only,
    parallel_only,
    gpu_only,
    release_only,
    debug_only,
):
    """
    Determines if a test should be run based on the provided flags.
    """
    build = get_build(test_config).split("_")[0]
    if (
        (cpu_only and test_config["hardware"] != "cpu")
        or (serial_only and test_config["num_processors"] != 1)
        or (parallel_only and test_config["num_processors"] == 1)
        or (release_only and build != "Release")
        or (debug_only and build != "Debug")
        or (gpu_only and test_config["hardware"] != "gpu")
    ):
        return False
    return True


def execute_test(test_config, dirpath, build_dir, keep_results, write_json):
    """
    Executes a single test and returns whether it passed.
    """
    inputs = get_inputs_from_yaml_node(
        test_config, os.path.basename(dirpath), build_dir
    )
    print(
        f"  Running test {test_config['hardware']}_{test_config['num_processors']}, executable: {inputs['executable_path']}"
    )
    regression_test = RegressionTest(
        inputs["test_name"],
        inputs["executable_path"],
        inputs["num_processors"],
        [inputs["input_file"]] + inputs["args"],
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
            exodiff["args"],
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
            write_json,
        )
        memcheck_passed = peak_memory_check.run() == 0

    runtimecheck_passed = True
    if inputs["run_time"] is not None:
        runtime_check = RunTimeCheck(
            f"{inputs['test_name']}_run_time",
            stats["run_time"],
            inputs["run_time"],
            inputs["run_time_percent_tolerance"],
            write_json,
        )
        runtimecheck_passed = runtime_check.run() == 0

    if all_exodiff_passed and memcheck_passed and runtimecheck_passed:
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
    release_only=False,
    debug_only=False,
    keep_results=False,
    write_json=False,
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
                        test_config,
                        cpu_only,
                        serial_only,
                        parallel_only,
                        gpu_only,
                        release_only,
                        debug_only,
                    ):
                        continue

                    if execute_test(
                        test_config, dirpath, build_dir, keep_results, write_json
                    ):
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


def clean_json_files(root_dir):
    """
    Cleans JSON files from the specified directory.
    """
    for dirpath, _, filenames in os.walk(root_dir):
        if "test.yaml" in filenames:
            print("-----------------------------------")
            print(f"Cleaning JSON files in {dirpath}")
            for json_file in glob.glob(f"{dirpath}/*.json"):
                os.remove(json_file)
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


def read_directories_from_yaml_file(file):
    """
    Reads directories from a YAML file.
    """
    # Absolute path to the directory containing the yaml file
    yaml_dir = os.path.dirname(os.path.abspath(file))
    directories = []
    with open(file, "r") as file:
        yaml_node = yaml.safe_load(file)
        for path in yaml_node["paths"]:
            directory = os.path.abspath(
                os.path.expanduser(os.path.join(yaml_dir, path["path"]))
            )
            for dirpath, _, filenames in os.walk(directory):
                # Check if the directory should be excluded
                exclude_dir = False
                if "exclude" in path and path["exclude"] is not None:
                    for exclude in path["exclude"]:
                        exclude_path = os.path.abspath(
                            os.path.expanduser(os.path.join(directory, exclude))
                        )
                        if exclude_path in dirpath:
                            exclude_dir = True
                            break
                if not exclude_dir and "test.yaml" in filenames:
                    directories.append(dirpath)
    return directories


def parse_arguments():
    """
    Parses command-line arguments.
    """
    parser = argparse.ArgumentParser(description="Run regression tests.")

    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--directory",
        help="Directory root containing the tests. Will recursively search for test.yaml files.",
        default=None,
    )

    group.add_argument(
        "--directory-file",
        help="File containing directories to test",
        default=None,
    )

    parser.add_argument(
        "--build-dir",
        help="Directory containing the build",
        default="~/projects/aperi-mech/build/",
    )
    parser.add_argument(
        "--clean-logs",
        help="Clean the log files from the tests and exit",
        action="store_true",
    )
    parser.add_argument(
        "--clean-json",
        help="Clean the JSON files from the tests and exit",
        action="store_true",
    )
    parser.add_argument(
        "--clean-results",
        help="Clean the results files from the tests and exit",
        action="store_true",
    )
    parser.add_argument(
        "--keep-results",
        help="Keep the results files even if the test passes. (results files are always kept if the test fails)",
        action="store_true",
    )
    parser.add_argument(
        "--no-preclean",
        help="Do not clean the logs and results before running the tests",
        action="store_true",
    )
    parser.add_argument("--cpu", help="Only run CPU tests", action="store_true")
    parser.add_argument("--serial", help="Only run serial tests", action="store_true")
    parser.add_argument(
        "--parallel", help="Only run parallel tests", action="store_true"
    )
    parser.add_argument("--gpu", help="Only run GPU tests", action="store_true")
    parser.add_argument("--release", help="Only run Release tests", action="store_true")
    parser.add_argument("--debug", help="Only run Debug tests", action="store_true")
    parser.add_argument(
        "--write-json", help="Write the results to a JSON file", action="store_true"
    )
    args = parser.parse_args()
    if args.directory is None and args.directory_file is None:
        args.directory = "regression_tests"

    return args


if __name__ == "__main__":
    args = parse_arguments()
    directories = []
    if args.directory_file:
        directories = read_directories_from_yaml_file(args.directory_file)
    else:
        directories = [os.path.abspath(os.path.expanduser(args.directory))]
    build_dir = os.path.abspath(os.path.expanduser(args.build_dir))

    # Clean logs, json files and/or results if specified
    if args.clean_logs or args.clean_results or args.clean_json:
        for directory in directories:
            if args.clean_logs:
                clean_logs(directory)
            if args.clean_json:
                clean_json_files(directory)
            if args.clean_results:
                clean_results(directory)
        sys.exit(0)

    # Pre-clean logs, json files, and results unless specified otherwise
    if not args.no_preclean:
        print("Cleaning logs and results before running the tests")
        for directory in directories:
            clean_logs(directory)
            clean_json_files(directory)
            clean_results(directory)

    # Run regression tests and measure time
    start_time = time.perf_counter()
    passing_tests = 0
    total_tests = 0
    for directory in directories:
        passing_tests_dir, total_tests_dir = run_regression_tests_from_directory(
            directory,
            build_dir,
            args.cpu,
            args.serial,
            args.parallel,
            args.gpu,
            args.release,
            args.debug,
            args.keep_results,
            args.write_json,
        )
        passing_tests += passing_tests_dir
        total_tests += total_tests_dir
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
