#!/usr/bin/env python3

import argparse
import math
import os
import sys

# Add common directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "common"))

from docker_runner import BuildConfig, DockerRunner, str_to_bool


def run_build(
    vm_ip,
    vm_username,
    gpu,
    build_type,
    code_coverage,
    with_protego,
    vm_pool=False,
):
    """Run build on remote VM using DockerRunner."""
    # Build configuration
    config = BuildConfig(
        build_type=build_type,
        with_protego=with_protego,
        gpu=gpu,
        code_coverage=code_coverage,
    )

    # Get CICD_REPO_SECRET from environment (set by GitHub Actions)
    cicd_repo_secret = os.environ.get("CICD_REPO_SECRET", "")

    # Connect to VM
    runner = DockerRunner(vm_ip, vm_username)
    try:
        runner.connect()

        # Determine the number of processors
        _, stdout, stderr = runner.ssh.exec_command("nproc")
        stderr_output = stderr.read().decode().strip()
        if stderr_output:
            print(f"Warning while getting processor count: {stderr_output}")
        num_procs = int(stdout.read().strip())
        load_factor = 1.0 # Adjust load factor as needed
        num_jobs = math.ceil(num_procs * load_factor)

        # Build commands
        commands = []

        # Add protego setup if needed (for VM pool mode only)
        if vm_pool and with_protego:
            commands.extend([
                "echo 'Configuring git for protego-mech submodule...'",
                'git config --global url."https://${CICD_REPO_SECRET}@github.com/".insteadOf "https://github.com/"',
                'git config --global url."https://${CICD_REPO_SECRET}@github.com/".insteadOf "git@github.com:"',
                "echo 'Initializing protego-mech submodule...'",
                "git submodule update --init --recursive protego-mech",
            ])

        # Add build commands
        commands.extend([
            "echo 'Configuring build...'",
            f"./do_configure --build-type {build_type} {config.configure_flags}",
            "echo 'Building...'",
            f"cd {config.build_path}",
            f"make -j{num_jobs}",
        ])

        if code_coverage:
            commands.append("make coverage")

        commands.append("echo 'Build complete!'")

        # Setup environment variables for VM pool mode with protego
        env_vars = {}
        if vm_pool and with_protego:
            env_vars["CICD_REPO_SECRET"] = cicd_repo_secret

        # Run build
        exit_status = runner.run_in_docker(
            config, commands, vm_pool=vm_pool, env_vars=env_vars
        )

        if exit_status != 0:
            print("Build failed with exit status", exit_status)
            sys.exit(exit_status)

    finally:
        runner.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run build on remote VM")
    parser.add_argument("--ip", default="127.0.0.1", help="IP address of the VM")
    parser.add_argument("--username", default="azureuser", help="Username for the VM")
    parser.add_argument("--gpu", default="false", help="GPU flag (true/false)")
    parser.add_argument(
        "--build_type",
        "--build-type",
        dest="build_type",
        default="Release",
        help="Build type",
    )
    parser.add_argument(
        "--code_coverage",
        "--code-coverage",
        dest="code_coverage",
        default="false",
        help="Code coverage flag (true/false)",
    )
    parser.add_argument(
        "--protego", default="false", help="With Protego flag (true/false)"
    )
    parser.add_argument(
        "--vm-pool",
        "--vm_pool",
        dest="vm_pool",
        default="false",
        help="VM pool mode (true/false) - uses docker run instead of docker-compose",
    )

    args = parser.parse_args()

    run_build(
        args.ip,
        args.username,
        str_to_bool(args.gpu),
        args.build_type,
        str_to_bool(args.code_coverage),
        str_to_bool(args.protego),
        str_to_bool(args.vm_pool),
    )
