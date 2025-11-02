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

        # For VM pool mode, ensure we have current code in /mnt/aperi-mech-ci
        if vm_pool:
            print("Ensuring current repository code on VM...")
            # Get current git ref from environment (set by GitHub Actions)
            git_ref = os.environ.get("GITHUB_SHA", "")
            git_repo = os.environ.get("GITHUB_REPOSITORY", "aperijake/aperi-mech")

            # For local testing, try to get current branch/commit
            if not git_ref:
                import subprocess
                try:
                    result = subprocess.run(["git", "rev-parse", "--abbrev-ref", "HEAD"],
                                          capture_output=True, text=True, check=True,
                                          cwd=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
                    git_ref = result.stdout.strip()
                    if git_ref == "HEAD":  # detached HEAD, get commit
                        result = subprocess.run(["git", "rev-parse", "HEAD"],
                                              capture_output=True, text=True, check=True,
                                              cwd=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
                        git_ref = result.stdout.strip()
                except:
                    git_ref = "main"  # fallback

            # Ensure /mnt/aperi-mech-ci directory exists (may need sudo for /mnt)
            _, stdout, stderr = runner.ssh.exec_command("sudo mkdir -p /mnt/aperi-mech-ci && sudo chown -R $USER:$USER /mnt/aperi-mech-ci")
            stdout.channel.recv_exit_status()

            # Check if repo already exists
            _, stdout, _ = runner.ssh.exec_command("test -d /mnt/aperi-mech-ci/.git && echo 'exists'")
            repo_exists = stdout.read().decode().strip() == "exists"

            if repo_exists:
                print(f"Repository exists, updating to {git_ref}...")
                # Chain commands together so cd persists
                update_cmd = f"cd /mnt/aperi-mech-ci && git fetch origin && git checkout {git_ref} && (git pull origin {git_ref} || true)"
            else:
                print(f"Cloning repository at {git_ref}...")
                # Clone with all branches, then fetch the specific ref (in case it's a PR commit)
                update_cmd = f"git clone --no-single-branch https://github.com/{git_repo}.git /mnt/aperi-mech-ci && cd /mnt/aperi-mech-ci && git fetch origin {git_ref} && git checkout {git_ref}"

            _, stdout, stderr = runner.ssh.exec_command(update_cmd)
            exit_status = stdout.channel.recv_exit_status()
            if exit_status != 0:
                stderr_output = stderr.read().decode()
                # Only fail on critical errors, not on "already up to date" type messages
                if "fatal" in stderr_output.lower() and "already exists" not in stderr_output.lower():
                    print(f"Command failed: {update_cmd}")
                    print(f"Error: {stderr_output}")
                    sys.exit(1)
            print("Repository ready.")

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
                "echo \"Configuring git for protego-mech submodule...\"",
                'git config --global url."https://${CICD_REPO_SECRET}@github.com/".insteadOf "https://github.com/"',
                'git config --global url."https://${CICD_REPO_SECRET}@github.com/".insteadOf "git@github.com:"',
                "echo \"Updating protego-mech submodule...\"",
                # If submodule already initialized, just update; otherwise init and update
                "if [ -d protego-mech/.git ]; then cd protego-mech && git pull && cd ..; else git submodule update --init --recursive protego-mech; fi",
            ])

        # For protego builds in VM pool mode, remove old symlink if it exists
        if vm_pool and with_protego:
            commands.extend([
                "echo \"Removing old build symlink if it exists...\"",
                "if [ -L protego-mech/build ]; then rm protego-mech/build; fi",
            ])

        # Add build commands
        commands.extend([
            "echo \"Configuring build...\"",
            f"./do_configure --build-type {build_type} {config.configure_flags}",
            "echo \"Building...\"",
            "cd $BUILD_PATH",
            f"make -j{num_jobs}",
        ])

        if code_coverage:
            commands.append("make coverage")

        commands.append("echo \"Build complete!\"")

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
