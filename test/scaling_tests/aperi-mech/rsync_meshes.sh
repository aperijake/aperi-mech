#!/bin/bash

# This script is used to rsync the meshes from the current directory to Azure VMs and result from the VMs to the current directory.

ip_address="$1"

push_or_pull="$2"

results_dir="$3"

results_dirs=(
	azuregpu2_results_gpu
	azuregpu2_results
	azuregpu3_results_gpu
	azuregpu3_results
)

if [[ -z ${ip_address} ]]; then
	echo "Usage: ./rsync_meshes.sh <ip_address> <push_or_pull> <results_dir>"
	exit 1
fi

if [[ -z ${push_or_pull} ]]; then
	echo "Usage: ./rsync_meshes.sh <ip_address> <push_or_pull> <results_dir>"
	exit 1
fi

if [[ -z ${results_dir} ]]; then
	echo "Usage: ./rsync_meshes.sh <ip_address> <push_or_pull> <results_dir>"
	exit 1
fi

# Make sure push_or_pull is either "push" or "pull"
if [[ ${push_or_pull} != "push" ]] && [[ ${push_or_pull} != "pull" ]]; then
	echo "Usage: ./rsync_meshes.sh <ip_address> <push_or_pull> <results_dir>"
	exit 1
fi

# Make sure the results_dir is a valid directory and in the results_dirs array
result_dir_valid=""
for dir in "${results_dirs[@]}"; do
	if [[ ${result_dirs} == "${dir}" ]]; then
		result_dir_valid="true"
	fi
done

if [[ -z ${result_dir_valid} ]]; then
	echo "Usage: ./rsync_meshes.sh <ip_address> <push_or_pull> <result_dirs>"
	exit 1
fi

# Directories to rsync
directories=(
	taylor_bar_1e4_hexes
	taylor_bar_1e5_hexes
	taylor_bar_1e6_hexes
	taylor_bar_1e7_hexes
	taylor_bar_4e7_tets
	taylor_bar_5e6_tets
	taylor_bar_6e5_tets
	taylor_bar_8e4_tets
)

# Push meshes to the Azure VMs
if [[ ${push_or_pull} == "push" ]]; then
	for dir in "${directories[@]}"; do
		echo "Rsyncing ${dir}"
		rsync -avz "${dir}"/mesh/ azureuser@"${ip_address}":~/aperi-mech/test/scaling_tests/aperi-mech/"${dir}"/mesh/
	done
	exit 0
fi

# Pull results from the Azure VMs
if [[ ${push_or_pull} == "pull" ]]; then
	for dir in "${directories[@]}"; do
		echo "Rsyncing in ${dir}"
		# Get all the folders in $dir, excluding the mesh folder
		run_dirs=$(find "${dir}" -mindepth 1 -maxdepth 1 -type d -not -name "mesh")
		echo " Sub-directories: ${run_dirs}"
		for run_dir in ${run_dirs}; do
			echo "  Rsyncing in ${run_dir}"/"${results_dir}"
			mkdir -p "${run_dir}"/"${results_dir}"
			rsync -avz azureuser@"${ip_address}":~/aperi-mech/test/scaling_tests/aperi-mech/"${run_dir}"/"${results_dir}"/ "${run_dir}"/"${results_dir}"/
		done
	done
	exit 0
fi

exit 1
