import argparse
import os

import paramiko


def str_to_bool(value):
    return value.lower() in ("true", "1", "t", "y", "yes")


def run_gtest_performance_tests(vm_ip, vm_username, gpu, build_type):
    ssh = paramiko.SSHClient()
    ssh.load_host_keys(os.path.expanduser("~/.ssh/known_hosts"))
    ssh.set_missing_host_key_policy(paramiko.RejectPolicy())
    ssh.connect(vm_ip, username=vm_username)

    # Construct the compose file and service name
    compose_file = "docker/docker-compose.yml"
    service_name = "aperi-mech-development"
    if gpu:
        compose_file = "docker/docker-compose_nvidia.yml"
        service_name = "aperi-mech-gpu-development"

    # Construct the build path
    build_path = f"~/aperi-mech_host/build/{build_type}"
    if gpu:
        build_path += "_gpu"

    # Construct the command to run on the VM
    commands = f"""
    set -e
    cd ~/aperi-mech

    docker-compose -f {compose_file} run --rm {service_name} /bin/bash -c '
        cd {build_path}
        echo "Setting up Spack environment..."
        source $aperi_mech/venv/bin/activate
        spack env activate aperi-mech

        echo "Running gtest performance tests..."
        ./performance_tests
    ' || {{ echo "Gtest performance test step failed"; exit 1; }}
    """

    print("Executing the following commands on the VM:")
    print(commands)

    stdin, stdout, stderr = ssh.exec_command(commands)
    for line in stdout:
        print(line.strip())
    for line in stderr:
        print(line.strip())

    ssh.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Run gtest performance tests on remote VM"
    )
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

    args = parser.parse_args()

    run_gtest_performance_tests(
        args.ip, args.username, str_to_bool(args.gpu), args.build_type
    )
