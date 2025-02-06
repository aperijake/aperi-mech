#!/usr/bin/env python3

import argparse
import sys

import paramiko


def str_to_bool(value):
    return value.lower() in ("true", "1", "t", "y", "yes")


def run_build(vm_ip, vm_username, gpu, build_type, code_coverage, with_protego):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    # Establish the SSH connection with increased timeout and keepalive options
    ssh.connect(vm_ip, username=vm_username, timeout=60)
    transport = ssh.get_transport()
    transport.set_keepalive(30)  # Send keepalive messages every 30 seconds

    # Construct the compose file and service name
    compose_file = "docker-compose.yml"
    service_name = "aperi-mech-development"
    if gpu and not code_coverage:
        compose_file = "docker-compose_nvidia_t4_gpu.yml"
        service_name = "aperi-mech-gpu-development"

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

    # Construct the command to run on the VM
    commands = f"""
    set -e
    cd ~/aperi-mech

    docker-compose -f {compose_file} run --rm {service_name} /bin/bash -c '
        cd ~/aperi-mech
        . ~/spack/share/spack/setup-env.sh
        spack env activate aperi-mech

        ./do_configure --build-type {build_type} {configure_flag}

        cd {build_path}
        make -j

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

    args = parser.parse_args()

    run_build(
        args.ip,
        args.username,
        str_to_bool(args.gpu),
        args.build_type,
        str_to_bool(args.code_coverage),
        str_to_bool(args.protego),
    )
