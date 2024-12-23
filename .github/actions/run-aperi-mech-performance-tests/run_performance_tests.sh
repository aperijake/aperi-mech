#!/bin/bash

VM_IP=$1
VM_USERNAME=$2
GPU=$3
PARALLEL=$4

echo "gpu: ${GPU}"
echo "parallel: ${PARALLEL}"

ssh -T -o ConnectTimeout=10 "${VM_USERNAME}@${VM_IP}" <<'EOF'
  set -e # Exit on error
  cd ~/aperi-mech

  compose_file=docker-compose.yml
  service_name=aperi-mech-development
  if [ "$GPU" == 'true' ]; then
    compose_file=docker-compose_nvidia_t4_gpu.yml
    service_name=aperi-mech-gpu-development
  fi
  # Debugging
  echo "On VM, Compose file: $compose_file"
  echo "On VM, Service name: $service_name"

  docker-compose -f $compose_file run --rm $service_name /bin/bash -c '
    test_flags="--release"
    if [ "$GPU" == "true" ]; then
      test_flags="$test_flags --gpu"
    else
      test_flags="$test_flags --cpu"
    fi
    if [ "$PARALLEL" == "true" ]; then
      test_flags="$test_flags --parallel"
    else
      test_flags="$test_flags --serial"
    fi
    # Debugging
    echo "In container, inputs.gpu: $GPU"
    echo "In container, inputs.parallel: $PARALLEL"
    echo "In container, test_flags: $test_flags"

    echo "Setting up Spack environment..."
    . ~/spack/share/spack/setup-env.sh
    spack env activate aperi-mech

    echo "Running aperi-mech performance tests..."
    cd ~/aperi-mech/test/
    ./run_regression_tests.py --directory ./performance_tests/aperi-mech --build-dir ~/aperi-mech/build/ $test_flags --write-json --no-preclean
    ./run_regression_tests.py --directory ./performance_tests/aperi-mech --build-dir ~/aperi-mech/build/ $test_flags --clean-logs
    ./run_regression_tests.py --directory ./performance_tests/aperi-mech --build-dir ~/aperi-mech/build/ $test_flags --clean-results
  '  || { echo "Performance test step failed"; exit 1; }
EOF
