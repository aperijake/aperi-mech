#!/bin/bash

# Function to clean up the output files

run_and_cleanup() {
	current_dir=$(pwd)
	echo "Running in folder $1"
	echo "Running: ./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 $1"
	./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 "$1"
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
run_and_cleanup taylor_bar_6e5_tets/rkpm_nodal

run_and_cleanup taylor_bar_1e6_hexes/rkpm
run_and_cleanup taylor_bar_1e6_hexes/rkpm_nodal

run_and_cleanup taylor_bar_5e6_tets/fem
run_and_cleanup taylor_bar_5e6_tets/rkpm
run_and_cleanup taylor_bar_5e6_tets/rkpm_nodal

run_and_cleanup taylor_bar_1e7_hexes/rkpm

run_and_cleanup taylor_bar_4e7_tets/fem
run_and_cleanup taylor_bar_4e7_tets/rkpm
