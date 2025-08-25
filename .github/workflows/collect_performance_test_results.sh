#!/bin/bash

VM_IP=$1
VM_USERNAME=$2

ssh -T -o ConnectTimeout=10 "${VM_USERNAME}@${VM_IP}" <<'EOF'
  set -e # Exit on error
  cd ~/aperi-mech

  compose_file=docker/docker-compose.yml
  service_name=aperi-mech-development
  # Debugging
  echo "On VM, Compose file: $compose_file"
  echo "On VM, Service name: $service_name"

  docker-compose -f $compose_file run --rm $service_name /bin/bash -c '
    cd ~/aperi-mech_host/protego-mech/build

    echo "Collecting gtest performance test results..."
    new_results=($(find . -type f -name "performance_gtest_*.json"))
    echo "New results: "
    for file in "${new_results[@]}"; do
        echo "$file"
    done
    echo "Running: python3 ~/aperi-mech_host/test/utils/scripts/join_performance_results.py ${new_results[@]} performance_gtest_all_results.json"
    python3 ~/aperi-mech_host/test/utils/scripts/join_performance_results.py "${new_results[@]}" performance_gtest_all_results.json

    echo "Collecting aperi-mech performance test results..."
    cd ~/aperi-mech_host/test
    new_results=($(find performance_tests/aperi-mech -type f -name "performance_*.json"))
    echo "New results: "
    for file in "${new_results[@]}"; do
        echo "$file"
    done
    echo "Running: python3 ~/aperi-mech_host/test/utils/scripts/join_performance_results.py ${new_results[@]} performance_aperi_mech_all_results.json"
    python3 ~/aperi-mech_host/test/utils/scripts/join_performance_results.py "${new_results[@]}" performance_aperi_mech_all_results.json

    echo "Moving performance test results to protego-mech build directory..."
    echo "Running: mv performance_aperi_mech_all_results.json ~/aperi-mech_host/protego-mech/build/performance_aperi_mech_all_results.json"
    mv performance_aperi_mech_all_results.json ~/aperi-mech_host/protego-mech/build/performance_aperi_mech_all_results.json

    echo "Converting CSV to JSON..."
    # Subdirs are [fem, fem_strain_smoothing, rkpm, rkpm_nodal rkpm_fbar]
    subdirs=(fem fem_strain_smoothing rkpm rkpm_nodal rkpm_fbar)

    # Performance types are [solver]
    types=(solver)

    cd ~/aperi-mech_host/test/performance_tests/aperi-mech/taylor_bar
    for subdir in "${subdirs[@]}"; do
        echo "Converting CSV to JSON for $subdir and copying to protego-mech build directory..."
        cd $subdir
        for type in "${types[@]}"; do
            this_filename=performance_${subdir}_${type}.json
            echo "Running: python3 ~/aperi-mech_host/test/utils/scripts/convert_csv_performance_data_to_json.py ${type}*.csv ${this_filename}"
            python3 ~/aperi-mech_host/test/utils/scripts/convert_csv_performance_data_to_json.py ${type}*.csv ${this_filename}
            echo "Running: mv ${this_filename} ~/aperi-mech_host/protego-mech/build/${this_filename}"
            mv ${this_filename} ~/aperi-mech_host/protego-mech/build/${this_filename}
        done
        cd ..
    done

  '  || { echo "Performance results collection failed"; exit 1; }
EOF
