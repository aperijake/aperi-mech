#!/bin/bash

VM_IP=$1
VM_USERNAME=$2
GPU=$3
BUILD_TYPE=$4
CODE_COVERAGE=$5
WITH_PROTEGO=$6

echo "gpu: ${GPU}"
echo "build_type: ${BUILD_TYPE}"

# trunk-ignore(shellcheck/SC2087)
ssh -T -o ConnectTimeout=10 "${VM_USERNAME}@${VM_IP}" <<EOF
  set -e # Exit on error
  cd ~/aperi-mech

  GPU=${GPU}
  BUILD_TYPE=${BUILD_TYPE}
  CODE_COVERAGE=${CODE_COVERAGE}
  WITH_PROTEGO=${WITH_PROTEGO}

  # Debugging
  echo "On VM, GPU: ${GPU}, and \GPU: \${GPU}"
  echo "On VM, Build type: ${BUILD_TYPE}, and \BUILD_TYPE: \${BUILD_TYPE}"
  echo "On VM, Code coverage: ${CODE_COVERAGE}, and \CODE_COVERAGE: \${CODE_COVERAGE}"
  echo "On VM, With Protego: ${WITH_PROTEGO}, and \WITH_PROTEGO: \${WITH_PROTEGO}"

  compose_file=docker-compose.yml
  service_name=aperi-mech-development
  # Check if GPU build is enabled and code coverage is not enabled, overriding gpu flag if code coverage is enabled
  if [ \${GPU} == "true" ] && [ \${CODE_COVERAGE} == "false" ]; then
    compose_file=docker-compose_nvidia_t4_gpu.yml
    service_name=aperi-mech-gpu-development
  fi
  # Debugging
  echo "On VM, Compose file: \${compose_file}"
  echo "On VM, Service name: \${service_name}"

  docker-compose -f \${compose_file} run --rm -e GPU=\${GPU} -e BUILD_TYPE=\${BUILD_TYPE} -e CODE_COVERAGE=\${CODE_COVERAGE} -e WITH_PROTEGO=\${WITH_PROTEGO} \${service_name} /bin/bash -c '
    # Debugging
    echo "In container, inputs.build-type: \${BUILD_TYPE}"
    echo "In container, inputs.gpu: \${GPU}"
    echo "In container, inputs.code-coverage: \${CODE_COVERAGE}"
    echo "In container, inputs.with-protego: \${WITH_PROTEGO}"

    configure_flag=""
    build_root=build
    if [ \${WITH_PROTEGO} == "true" ]; then
      build_root=protego-mech/build
      configure_flag=" --protego-mech"
    fi
    build_path="\${build_root}/\${BUILD_TYPE}"
    if [ \${GPU} == "true" ]; then
      configure_flag="\${configure_flag} --gpu"
      build_path="\${build_path}_gpu"
    fi

    # Check if code coverage is enabled, overriding gpu flag if code coverage is enabled
    if [ \${CODE_COVERAGE} == "true" ]; then
      configure_flag="\${configure_flag} --code-coverage"
      build_path="\${build_path}_cov"
    fi
    # Debugging
    echo "In container, configure_flag: \${configure_flag}"
    echo "In container, build_path: \${build_path}"

    cd ~/aperi-mech
    echo "Setting up Spack environment..."
    . ~/spack/share/spack/setup-env.sh
    spack env activate aperi-mech

    echo "Configuring project..."
    # do_configure will set build type to Debug if code coverage is enabled
    ./do_configure --build-type \${BUILD_TYPE} \${configure_flag}

    echo "Building project..."
    cd \${build_path}
    make -j 4
    if [ \${CODE_COVERAGE} == "true" ]; then
      make coverage
    fi
  '  || { echo "Build project step failed"; exit 1; }
EOF
