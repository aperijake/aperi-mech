#!/bin/bash

# Function to clean up the output files

run_and_cleanup() {
	current_dir=$(pwd)
	echo "Running in folder $1"
	num_procs="32,16,8,4,2,1"
	# if a second argument is provided, use it as the number of processors
	if [[ -n $2 ]]; then
		num_procs="$2"
	fi
	echo "Running: ./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p ${num_procs} $1"
	./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p "${num_procs}" "$1"
	cd "$1" || exit
	mkdir azuregpu3_results
	mv run_* azuregpu3_results
	rm results.exo
	cd "${current_dir}" || exit
}

run_and_cleanup taylor_bar_1e4_hexes/rkpm
run_and_cleanup taylor_bar_1e4_hexes/rkpm_nodal

run_and_cleanup taylor_bar_8e4_tets/fem
run_and_cleanup taylor_bar_8e4_tets/rkpm
run_and_cleanup taylor_bar_8e4_tets/rkpm_nodal

run_and_cleanup taylor_bar_1e5_hexes/rkpm
run_and_cleanup taylor_bar_1e5_hexes/rkpm_nodal

run_and_cleanup taylor_bar_6e5_tets/fem
run_and_cleanup taylor_bar_6e5_tets/rkpm
run_and_cleanup taylor_bar_6e5_tets/rkpm_nodal 16,8,4,2,1 # 32 procs crashes

run_and_cleanup taylor_bar_1e6_hexes/rkpm
run_and_cleanup taylor_bar_1e6_hexes/rkpm_nodal

run_and_cleanup taylor_bar_5e6_tets/fem 16,8,4,2,1        # 32 procs crashes
run_and_cleanup taylor_bar_5e6_tets/rkpm 16,8,4,2,1       # 32 procs crashes
run_and_cleanup taylor_bar_5e6_tets/rkpm_nodal 16,8,4,2,1 # 32 procs crashes

run_and_cleanup taylor_bar_1e7_hexes/rkpm

run_and_cleanup taylor_bar_4e7_tets/fem
run_and_cleanup taylor_bar_4e7_tets/rkpm
