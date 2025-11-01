#!/usr/bin/env python3

import argparse
import math
import os
import sys

import paramiko


def str_to_bool(value):
    return value.lower() in ("true", "1", "t", "y", "yes")


def run_build(vm_ip, vm_username, gpu, build_type, code_coverage, with_protego, vm_pool=False):
    ssh = paramiko.SSHClient()
    # Load host keys from ~/.ssh/known_hosts (populated by ssh-keyscan in workflow)
    known_hosts_path = os.path.expanduser("~/.ssh/known_hosts")
    if os.path.exists(known_hosts_path):
        ssh.load_host_keys(known_hosts_path)
    # Reject unknown hosts for security (workflow adds keys via ssh-keyscan)
    ssh.set_missing_host_key_policy(paramiko.RejectPolicy())

    # Establish the SSH connection with increased timeout and keepalive options
    ssh.connect(vm_ip, username=vm_username, timeout=60)
    transport = ssh.get_transport()
    transport.set_keepalive(30)  # Send keepalive messages every 30 seconds

    # Determine the number of processors and calculate 75% of them
    stdin, stdout, stderr = ssh.exec_command("nproc")
    num_procs = int(stdout.read().strip())
    num_jobs = math.ceil(num_procs * 0.75)

    # Construct the configure flag and build path
    configure_flag = ""
    build_root = "build"
    if with_protego:
        build_root = "protego-mech/build"
        configure_flag += " --protego-mech"
    build_path = f"{build_root}/{build_type}"
    if gpu:
        configure_flag += " --gpu"
        build_path += "_gpu"

    run_coverage = ""
    if code_coverage:
        configure_flag += " --code-coverage"
        build_path += "_cov"
        run_coverage = "make coverage"

    if vm_pool:
        # VM Pool mode: Use docker run directly, code from Docker image
        docker_image = "ghcr.io/aperijake/aperi-mech:cuda-t4"

        # Setup volume mounts for build directories
        # Mount to /tmp to avoid conflicts with git submodule init, then symlink
        volume_mounts = "-v /mnt/builds:/tmp/aperi-builds"
        if with_protego:
            volume_mounts += " -v /mnt/builds/protego-builds:/tmp/protego-builds"

        # GPU flag
        gpu_flag = "--gpus all" if (gpu and not code_coverage) else ""

        # Pull protego submodule if needed
        protego_setup = ""
        if with_protego:
            protego_setup = """
            echo "Configuring git for protego-mech submodule..."
            git config --global url."https://${CICD_REPO_SECRET}@github.com/".insteadOf "https://github.com/"

            echo "Initializing protego-mech submodule..."
            git submodule update --init --recursive protego-mech

            echo "Setting up symlink for protego-mech build directory..."
            # Create symlink to mounted build directory
            ln -sf /tmp/protego-builds protego-mech/build
            """

        commands = f"""
        set -e

        # Ensure build directories exist
        mkdir -p /mnt/builds /mnt/builds/protego-builds

        # Run build in Docker container
        docker run --rm {gpu_flag} {volume_mounts} \\
          -e CICD_REPO_SECRET="${{CICD_REPO_SECRET}}" \\
          {docker_image} /bin/bash -c '
            set -e
            cd /home/aperi-mech_docker/aperi-mech

            echo "Setting up symlink for main build directory..."
            # Create symlink from build to mounted location
            rm -rf build
            ln -sf /tmp/aperi-builds build

            {protego_setup}

            echo "Activating environment..."
            source /home/aperi-mech_docker/aperi-mech/venv/bin/activate
            spack env activate aperi-mech

            echo "Configuring build..."
            ./do_configure --build-type {build_type} {configure_flag}

            echo "Building..."
            cd {build_path}
            make -j{num_jobs}

            {run_coverage}

            echo "Build complete!"
        ' || {{ echo "Build failed"; exit 1; }}
        """
    else:
        # Old single-VM mode: Use docker-compose, code from VM
        compose_file = "docker/docker-compose.yml"
        service_name = "aperi-mech-development"
        if gpu and not code_coverage:
            compose_file = "docker/docker-compose_nvidia.yml"
            service_name = "aperi-mech-gpu-development"

        commands = f"""
        set -e
        cd ~/aperi-mech

        docker-compose -f {compose_file} run --rm {service_name} /bin/bash -c '
            cd ~/aperi-mech_host
            source $APERI_MECH_ROOT/venv/bin/activate
            spack env activate aperi-mech

            ./do_configure --build-type {build_type} {configure_flag}

            cd {build_path}
            make -j{num_jobs}

            {run_coverage}

        ' || {{ echo "Build project step failed"; exit 1; }}
        """

    print("Executing the following commands on the VM:")
    print(commands)

    stdin, stdout, stderr = ssh.exec_command(commands, get_pty=True)
    exit_status = stdout.channel.recv_exit_status()

    for line in stdout:
        print(line.strip())
    for line in stderr:
        print(line.strip())

    ssh.close()

    if exit_status != 0:
        print("Build failed with exit status", exit_status)
        sys.exit(exit_status)


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
