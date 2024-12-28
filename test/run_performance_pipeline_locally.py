#!/usr/bin/env python3

import argparse
import os

# trunk-ignore(bandit/B404)
import subprocess


def run_command(command):
    print(f"Executing: {' '.join(command)}")
    try:
        # trunk-ignore(bandit/B603)
        result = subprocess.run(
            command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        print(result.stdout.decode())
        if result.stderr:
            print(result.stderr.decode())
    except subprocess.CalledProcessError as e:
        print(f"Command '{e.cmd}' returned non-zero exit status {e.returncode}.")
        print("Standard output:")
        print(e.stdout.decode())
        print("Standard error:")
        print(e.stderr.decode())
        raise


def get_project_root():
    # trunk-ignore(bandit/B603)
    # trunk-ignore(bandit/B607)
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        check=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return result.stdout.decode().strip()


def clean_old_performance_results(project_root, machine_ip, machine_username):
    github_path = os.path.join(project_root, ".github")
    # Clean old performance results
    run_command(
        [
            "bash",
            os.path.join(github_path, "workflows/clean_old_performance_results.sh"),
            machine_ip,
            machine_username,
        ]
    )


def collect_performance_test_results(project_root, machine_ip, machine_username):
    github_path = os.path.join(project_root, ".github")
    # Collect the performance test results
    run_command(
        [
            "bash",
            os.path.join(github_path, "workflows/collect_performance_test_results.sh"),
            machine_ip,
            machine_username,
        ]
    )


def generate_performance_test_report(project_root):
    # Generate the performance test report
    run_command(
        [
            "python3",
            os.path.join(
                project_root, "test/utils/scripts/check_new_performance_data.py"
            ),
        ]
    )


def run_main(project_root, machine_ip, machine_username, gpu, parallel):

    github_path = os.path.join(project_root, ".github")

    # Build the code
    run_command(
        [
            "python3",
            os.path.join(github_path, "actions/build-action/build.py"),
            "--ip",
            machine_ip,
            "--username",
            machine_username,
            "--gpu",
            gpu,
            "--build-type",
            "Release",
            "--code-coverage",
            "false",
            "--protego",
            "false",
        ]
    )

    # Run the performance tests
    run_command(
        [
            "python3",
            os.path.join(
                github_path,
                "actions/run-aperi-mech-performance-tests/run_aperi-mech_performance_tests.py",
            ),
            "--ip",
            machine_ip,
            "--username",
            machine_username,
            "--gpu",
            gpu,
            "--parallel",
            parallel,
        ]
    )

    if parallel == "false":
        run_command(
            [
                "python3",
                os.path.join(
                    github_path,
                    "actions/run-gtest-performance-tests/run_gtest_performance_tests.py",
                ),
                "--ip",
                machine_ip,
                "--username",
                machine_username,
                "--gpu",
                gpu,
                "--build-type",
                "Release",
            ]
        )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run the performance pipeline locally for testing purposes."
    )
    parser.add_argument(
        "--clean",
        action="store_true",
        help="Clean old performance results. Will not run the performance tests.",
    )
    parser.add_argument(
        "--collect",
        action="store_true",
        help="Collect performance test results. Will not run the performance tests.",
    )
    parser.add_argument(
        "--generate_report",
        "--generate-report",
        action="store_true",
        dest="generate_report",
        help="Generate the performance test report. Will not run the performance tests.",
    )
    parser.add_argument("--project_root", default=None, help="Project root directory")
    parser.add_argument(
        "--machine_ip",
        default="127.0.0.1",
        help="IP address of the machine where the performance tests will be executed",
    )
    parser.add_argument(
        "--machine_username",
        default="azureuser",
        help="Username of the machine where the performance tests will be executed",
    )
    parser.add_argument("--gpu", default="false", help="Run on the GPU (true/false)")
    parser.add_argument(
        "--parallel", default="false", help="Run in parallel (true/false)"
    )

    args = parser.parse_args()

    if args.project_root is None:
        args.project_root = get_project_root()

    run_main_command = True

    if args.clean:
        clean_old_performance_results(
            args.project_root, args.machine_ip, args.machine_username
        )
        run_main_command = False

    if args.collect:
        collect_performance_test_results(
            args.project_root, args.machine_ip, args.machine_username
        )
        run_main_command = False

    if args.generate_report:
        generate_performance_test_report(args.project_root)
        run_main_command = False

    if run_main_command:
        run_main(
            args.project_root,
            args.machine_ip,
            args.machine_username,
            args.gpu,
            args.parallel,
        )
