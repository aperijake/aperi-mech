import argparse
import os

import paramiko


def str_to_bool(value):
    return value.lower() in ("true", "1", "t", "y", "yes")


def run_aperi_mech_performance_tests(vm_ip, vm_username, gpu, parallel):
    ssh = paramiko.SSHClient()
    ssh.load_host_keys(os.path.expanduser("~/.ssh/known_hosts"))
    ssh.set_missing_host_key_policy(paramiko.RejectPolicy())
    ssh.connect(vm_ip, username=vm_username)

    # Convert string inputs to boolean
    gpu = str_to_bool(gpu)
    parallel = str_to_bool(parallel)

    # Construct the compose file and service name
    compose_file = "docker/docker-compose.yml"
    service_name = "aperi-mech-development"
    if gpu:
        compose_file = "docker/docker-compose_nvidia.yml"
        service_name = "aperi-mech-gpu-development"

    # Construct the test flags
    test_flags = "--release"
    if gpu:
        test_flags += " --gpu"
    else:
        test_flags += " --cpu"
    if parallel:
        test_flags += " --parallel"
    else:
        test_flags += " --serial"

    # Construct the command to run on the VM
    commands = f"""
    set -e
    cd ~/aperi-mech

    docker-compose -f {compose_file} run --rm {service_name} /bin/bash -c '
        echo "Setting up Spack environment..."
        . ~/spack/share/spack/setup-env.sh
        spack env activate aperi-mech

        echo "Running aperi-mech performance tests..."
        cd ~/aperi-mech/test/
        ./run_regression_tests.py --directory ./performance_tests/aperi-mech --build-dir ~/aperi-mech/build/ {test_flags} --write-json --no-preclean --parse-timings
        ./run_regression_tests.py --directory ./performance_tests/aperi-mech --build-dir ~/aperi-mech/build/ {test_flags} --clean-logs
        ./run_regression_tests.py --directory ./performance_tests/aperi-mech --build-dir ~/aperi-mech/build/ {test_flags} --clean-results
    ' || {{ echo "Performance test step failed"; exit 1; }}
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
    parser = argparse.ArgumentParser(description="Run performance tests on remote VM")
    parser.add_argument("--ip", default="127.0.0.1", help="IP address of the VM")
    parser.add_argument("--username", default="azureuser", help="Username for the VM")
    parser.add_argument("--gpu", default="false", help="GPU flag (true/false)")
    parser.add_argument(
        "--parallel", default="false", help="Parallel flag (true/false)"
    )

    args = parser.parse_args()

    run_aperi_mech_performance_tests(args.ip, args.username, args.gpu, args.parallel)
