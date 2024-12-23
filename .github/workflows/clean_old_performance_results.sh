#!/bin/bash

VM_IP=$1
VM_USERNAME=$2

ssh -T -o ConnectTimeout=10 "${VM_USERNAME}@${VM_IP}" <<'EOF'
  set -e # Exit on error
  cd ~/aperi-mech
  echo "Clean existing gtest performance test results..."
  rm -f build/*/performance_*.json build/performance_*.json

  to_remove=($(find test/performance_tests/aperi-mech -type f -name "performance_*.json"))
  echo "Clean existing aperi-mech performance test results..."
  echo "Removing: "
  for file in "${to_remove[@]}"; do
      echo "$file"
      rm -f "$file"
  done

  echo "Clean existing detailed performance test results..."
  to_remove=($(find test/performance_tests/aperi-mech/ -type f -name "*.csv"))
  for file in "${to_remove[@]}"; do
      echo "Removing: $file"
      rm -f "$file"
  done
EOF
