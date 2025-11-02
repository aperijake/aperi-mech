#!/usr/bin/env python3
"""
Unified test runner for all test types.
Replaces run-material-tests, run-unit-tests, run-utils-modules-tests, run-regression-tests.
"""

import argparse
import os
import sys

# Add common directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "common"))

from docker_runner import BuildConfig, DockerRunner, str_to_bool


def run_material_tests(runner: DockerRunner, config: BuildConfig, vm_pool: bool) -> int:
    """Run material tests."""
    commands = [
        "echo 'Running material tests...'",
        "make run_material_tests",
    ]
    return runner.run_in_docker(config, commands, vm_pool=vm_pool)


def run_unit_tests(
    runner: DockerRunner, config: BuildConfig, vm_pool: bool, num_processes: int = 1
) -> int:
    """Run unit tests."""
    commands = [
        f"echo 'Running unit tests with {num_processes} processes...'",
        f"mpirun -n {num_processes} ./unit_tests",
    ]
    return runner.run_in_docker(config, commands, vm_pool=vm_pool)


def run_utils_modules_tests(
    runner: DockerRunner, config: BuildConfig, vm_pool: bool
) -> int:
    """Run utils modules tests."""
    # Need to add build directory to PATH
    path_addition = f"/home/aperi-mech_docker/aperi-mech/{config.build_path}"
    commands = [
        f"export PATH=$PATH:{path_addition}",
        "echo 'Running utils modules tests...'",
        "make run_utils_modules_tests",
    ]
    return runner.run_in_docker(config, commands, vm_pool=vm_pool)


def run_regression_tests(
    runner: DockerRunner,
    config: BuildConfig,
    vm_pool: bool,
    parallel: bool = False,
    cpu_only: bool = False,
) -> int:
    """Run regression tests."""
    # Build test flags
    test_flags = []
    test_flags.append("--release" if config.build_type == "Release" else "--debug")
    test_flags.append("--cpu" if cpu_only else ("--gpu" if config.gpu else "--cpu"))
    test_flags.append("--parallel" if parallel else "--serial")
    flags_str = " ".join(test_flags)

    # Determine test directory and build directory
    if config.with_protego:
        test_dir_file = "/home/aperi-mech_docker/aperi-mech/protego-mech/test/regression_tests/regression_test_paths.yaml"
        build_dir = "/home/aperi-mech_docker/aperi-mech/protego-mech/build/"
        commands = [
            "echo 'Running regression tests...'",
            f"./run_regression_tests.py --directory-file {test_dir_file} --build-dir {build_dir} {flags_str}",
        ]
    else:
        build_dir = "/home/aperi-mech_docker/aperi-mech/build/"
        commands = [
            "echo 'Running regression tests...'",
            f"./run_regression_tests.py --directory ./regression_tests --build-dir {build_dir} {flags_str}",
        ]

    return runner.run_in_docker(
        config,
        commands,
        vm_pool=vm_pool,
        working_dir="/home/aperi-mech_docker/aperi-mech/test",
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run tests on remote VM")
    parser.add_argument("--ip", required=True, help="IP address of the VM")
    parser.add_argument("--username", required=True, help="Username for the VM")
    parser.add_argument(
        "--build-type", required=True, help="Build type (Debug/Release)"
    )
    parser.add_argument("--gpu", default="false", help="GPU build (true/false)")
    parser.add_argument("--protego", default="false", help="Protego build (true/false)")
    parser.add_argument("--vm-pool", default="false", help="VM pool mode (true/false)")
    parser.add_argument(
        "--test-type",
        required=True,
        choices=["material", "unit", "utils", "regression"],
        help="Type of test to run",
    )

    # Test-specific args
    parser.add_argument(
        "--num-processes",
        type=int,
        default=1,
        help="Number of MPI processes (unit tests)",
    )
    parser.add_argument(
        "--parallel", default="false", help="Run parallel tests (regression tests)"
    )
    parser.add_argument(
        "--cpu-only", default="false", help="Force CPU-only tests (regression tests)"
    )

    args = parser.parse_args()

    # Build configuration
    config = BuildConfig(
        build_type=args.build_type,
        with_protego=str_to_bool(args.protego),
        gpu=str_to_bool(args.gpu),
        code_coverage=False,
    )

    # Connect to VM
    runner = DockerRunner(args.ip, args.username)
    try:
        runner.connect()

        # Run appropriate test
        vm_pool = str_to_bool(args.vm_pool)
        if args.test_type == "material":
            exit_code = run_material_tests(runner, config, vm_pool)
        elif args.test_type == "unit":
            exit_code = run_unit_tests(runner, config, vm_pool, args.num_processes)
        elif args.test_type == "utils":
            exit_code = run_utils_modules_tests(runner, config, vm_pool)
        elif args.test_type == "regression":
            exit_code = run_regression_tests(
                runner,
                config,
                vm_pool,
                parallel=str_to_bool(args.parallel),
                cpu_only=str_to_bool(args.cpu_only),
            )
        else:
            print(f"Unknown test type: {args.test_type}")
            exit_code = 1

        sys.exit(exit_code)

    finally:
        runner.close()
