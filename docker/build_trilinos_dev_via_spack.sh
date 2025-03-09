#!/bin/bash

CUDA_ARCH=90
GPU=0
spack_env_name=aperi-mech-trilinos-dev

# Flag for GPU support, -g or --gpu, and flag for the GPU architecture, -a or --arch
while [ "$1" != "" ]; do
	case $1 in
	-g | --gpu)
		shift
		GPU=1
		spack_env_name=aperi-mech-trilinos-dev-gpu
		;;
	-a | --arch)
		shift
		CUDA_ARCH=$1
		;;
	*) echo "Invalid argument" ;;
	esac
	shift
done

# Create the environment
spack env create $spack_env_name
spack env activate $spack_env_name

# Add packages that don't need any special GPU-related flags
spack add compadre@master ~tests &&
	spack add googletest@1.14.0 &&
	spack add yaml-cpp@0.7.0 &&
	spack add eigen@3.4.0

# Use spack develop for Trilinos
spack develop -p /home/aperi-mech_docker/Trilinos trilinos@16.0.0

if [ $GPU -eq 1 ]; then
	# Add flags for GPU support
	spack add kokkos-kernels@4.3.01 +cuda ~shared cuda_arch=${CUDA_ARCH}
	spack add kokkos@4.3.01 +cuda +cuda_lambda +cuda_relocatable_device_code ~cuda_uvm ~shared +wrapper cxxstd=17 cuda_arch=${CUDA_ARCH}
	spack add trilinos@16.0.0 ~amesos ~amesos2 ~anasazi ~aztec ~belos ~epetra ~epetraext ~ifpack ~ifpack2 ~ml ~muelu ~sacado ~shared +cuda +cuda_rdc +exodus +gtest +hdf5 +stk +zoltan +zoltan2 cxxstd=17 cuda_arch=${CUDA_ARCH}
else
	# Add packages as before, but exclude Trilinos for now
	spack add kokkos-kernels@4.3.01 ~cuda ~shared
	spack add kokkos@4.3.01 ~cuda ~shared cxxstd=17
	# Now add Trilinos with the same specs as before
	spack add trilinos@16.0.0 ~amesos ~amesos2 ~anasazi ~aztec ~belos ~cuda ~epetra ~epetraext ~ifpack ~ifpack2 ~ml ~muelu ~sacado ~shared +exodus +gtest +hdf5 +mpi +stk +zoltan +zoltan2 cxxstd=17
fi

# Concretize and install
spack concretize
spack install --fresh
