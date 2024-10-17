import argparse
import os

# trunk-ignore(bandit/B404)
import subprocess


def run_performance_tests(num_procs, exec_path, filter, output):
    os.chdir(output)

    for num_proc in num_procs:
        filter_command = ""
        if filter != "":
            filter_command = f"--gtest_filter={filter}"

        command = f"mpirun -n {num_proc} {exec_path} {filter_command} --gtest_also_run_disabled_tests"

        print(f"Running performance tests with {num_proc} processes. Command:")
        print(command)

        # Run the performance tests using subprocess
        # trunk-ignore(bandit/B602)
        result = subprocess.run(command, shell=True, env=os.environ)
        if result.returncode != 0:
            print(f"Command failed with return code {result.returncode}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run performance tests and plot timing data"
    )

    # Create mutually exclusive group for default settings
    default_group = parser.add_mutually_exclusive_group()
    default_group.add_argument(
        "--use_mac_defaults", action="store_true", help="Use default settings for Mac"
    )
    default_group.add_argument(
        "--use_azure_4proc_defaults",
        action="store_true",
        help="Use default settings for Azure system with 4 processes",
    )
    default_group.add_argument(
        "--use_azure_40proc_defaults",
        action="store_true",
        help="Use default settings for Azure system with 40 processes",
    )
    default_group.add_argument(
        "--use_azure_t4_defaults",
        action="store_true",
        help="Use default settings for Azure T4",
    )
    default_group.add_argument(
        "--use_azure_h100_defaults",
        action="store_true",
        help="Use default settings for Azure H100",
    )

    # Create mutually exclusive group for either default settings or custom settings
    settings_group = parser.add_mutually_exclusive_group()
    settings_group.add_argument(
        "--num_procs",
        nargs="+",
        type=int,
        help="Number of processes to use",
        default=[1, 2, 4, 8],
    )
    settings_group.add_argument(
        "--exec",
        help="Path to the executable",
        default="../../../build/Release/performance_tests",
    )
    settings_group.add_argument(
        "--output", help="Output folder", default="performance_results"
    )
    settings_group.add_argument(
        "--filter", help="Filter for the performance tests", default=""
    )

    args = parser.parse_args()

    exe_root = os.path.join(os.path.dirname(__file__), "..", "..", "..", "build")

    # Apply default settings if specified
    if args.use_mac_defaults:
        args.num_procs = [1, 2, 4, 8]
        args.exec = exe_root + "/Release/performance_tests"
        args.output = "mac_performance_results"
        args.filter = ""
    elif args.use_azure_t4_defaults:
        args.num_procs = [1]
        args.exec = exe_root + "/Release_gpu/performance_tests"
        args.output = "azure_t4_performance_results"
        args.filter = ""
    elif args.use_azure_h100_defaults:
        args.num_procs = [1]
        args.exec = exe_root + "/Release_gpu/performance_tests"
        args.output = "azure_h100_performance_results"
        args.filter = ""
    elif args.use_azure_4proc_defaults:
        args.num_procs = [1, 2, 4]
        args.exec = exe_root + "/Release/performance_tests"
        args.output = "azure_4proc_performance_results"
        args.filter = ""
    elif args.use_azure_40proc_defaults:
        args.num_procs = [1, 2, 4, 8, 16, 32]
        args.exec = exe_root + "/Release/performance_tests"
        args.output = "azure_40proc_performance_results"
        args.filter = ""

    print(args)

    # Get the absolute path of the output folder
    args.output = os.path.abspath(args.output)

    # Create the output folder if it does not exist
    os.makedirs(args.output, exist_ok=True)

    # Get the absolute path of the executable
    args.exec = os.path.abspath(args.exec)

    run_performance_tests(args.num_procs, args.exec, args.filter, args.output)
