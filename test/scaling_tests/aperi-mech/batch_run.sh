#!/bin/bash

# Function to handle SIGINT (Ctrl-C)
cleanup() {
	echo "Caught SIGINT signal. Cleaning up..."
	# Kill all child processes
	pkill -P $$
	exit 1
}

# Trap SIGINT and call the cleanup function
trap cleanup SIGINT

# Set default values
n=5
num_procs="8,6,4,2,1"
exe_root=~/projects/aperi-mech/protego-mech/build
gpu=0

# Parse arguments
while [[ $# -gt 0 ]]; do
	case $1 in
	-n)
		n="$2"
		shift
		;;
	-g)
		gpu=1
		;;
	-e)
		exe_root="$2"
		shift
		;;
	-p)
		num_procs="$2"
		shift
		;;
	*) dir="$1" ;;
	esac
	shift
done

if [[ ${gpu} -eq 1 ]]; then
	exe="${exe_root}/Release_gpu/aperi-mech"
else
	exe="${exe_root}/Release/aperi-mech"
fi

# Check if the directory argument is provided
if [[ -z ${dir} ]]; then
	echo "Usage: $0 [-n <number_of_runs>] [-p <num_procs_list>] [-e <exe_root>] [-g] <directory>"
	exit 1
fi

echo "Running tests in directory: ${dir}"
echo "Executable: ${exe}"
echo "Number of runs: ${n}"
echo "Number of processes list: ${num_procs}"

# Change to the specified directory
cd "${dir}" || exit

# Convert num_procs to an array
IFS=',' read -r -a num_procs_array <<<"${num_procs}"

# Run n times
for j in $(seq 1 "${n}"); do
	echo Running iteration "${j}"
	# Loop over the specified range
	for i in "${num_procs_array[@]}"; do
		# Run the mpirun command with the current value of i
		echo Running case "${i}"
		echo "Command: mpirun -n ${i} ${exe} input.yaml > log_${i}cpu.log"
		mpirun -n "${i}" "${exe}" input.yaml >log_"${i}"cpu.log
	done
	mkdir run_"${j}"
	mv log* run_"${j}"
done
