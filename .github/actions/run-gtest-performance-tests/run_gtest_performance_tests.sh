#!/bin/bash

VM_IP=$1
VM_USERNAME=$2
GPU=$3
BUILD_TYPE=$4

echo "gpu: ${GPU}"
echo "build_type: ${BUILD_TYPE}"

# trunk-ignore(shellcheck/SC2087)
ssh -T -o ConnectTimeout=10 "${VM_USERNAME}@${VM_IP}" <<EOF
  set -e # Exit on error
  cd ~/aperi-mech

  GPU=${GPU}
  BUILD_TYPE=${BUILD_TYPE}

  # Debugging
  echo "On VM, GPU: ${GPU}, and \GPU: \${GPU}"
  echo "On VM, Build type: ${BUILD_TYPE}, and \BUILD_TYPE: \${BUILD_TYPE}"

  compose_file=docker-compose.yml
  service_name=aperi-mech-development
  if [ "\${GPU}" == "true" ]; then
    compose_file=docker-compose_nvidia_t4_gpu.yml
    service_name=aperi-mech-gpu-development
  fi
  # Debugging
  echo "On VM, Compose file: \${compose_file}"
  echo "On VM, Service name: \${service_name}"

  docker-compose -f \${compose_file} run --rm -e GPU=\${GPU} -e BUILD_TYPE=\${BUILD_TYPE} \${service_name} /bin/bash -c '
    # Debugging
    echo "In container, gpu: \${GPU}"
    echo "In container, build_type: \${BUILD_TYPE}"

    build_path=~/aperi-mech/build/\${BUILD_TYPE}
    if [ "\${GPU}" == "true" ]; then
      build_path=~/aperi-mech/build/\${BUILD_TYPE}_gpu
    fi
    # Debugging
    echo "In container, build_path: \${build_path}"

    cd \${build_path}
    echo "Setting up Spack environment..."
    . ~/spack/share/spack/setup-env.sh
    spack env activate aperi-mech

    echo "Running gtest performance tests..."
    ./performance_tests

  '  || { echo "Gtest performance test step failed"; exit 1; }
EOF
