# aperi-mech

An open-source platform for computational mechanics.

## Building with Spack

### Install Spack

Follow the instructions at [https://spack.readthedocs.io/en/latest/getting_started.html](https://spack.readthedocs.io/en/latest/getting_started.html). In short, install the `spack` prerequisites, clone `spack`, and source the script for shell support.

### Find System Tools

```bash
# Add system compilers. e.g. gcc
spack compiler find

# Use external tools. e.g. cmake
spack external find
```

### CPU Only Build

#### Create a Spack Environment

```bash
# Create and activate a spack environment for the project
spack env create aperi-mech
spacktivate aperi-mech
```

#### Add and Install Required Packages

```bash
# If needed, specify a specific compiler. For example, add `%gcc@10.5.0` at the end of the `spack add` commands
# Add Trilinos, googletest, lcov, yaml-cpp, and eigen
# Requires a Trilinos commit from 04/19/2024, so >trilinos@15.1.1
spack add kokkos ~cuda ~shared cxxstd=17
spack add trilinos +boost ~cuda +exodus +gtest +hdf5 ~shared +stk +zoltan +zoltan2 cxxstd=17
spack add mfem +netcdf
spack add googletest
spack add lcov
spack add yaml-cpp
spack add eigen

# Install Packages
spack install
```

### GPU Build

#### Create a Spack Environment

```bash
# Create and activate a spack environment for the project
spack env create aperi-mech-gpu
spacktivate aperi-mech-gpu
```

#### Add and Install Required Packages

```bash
# If needed, specify a specific compiler. For example, add `%gcc@10.5.0` at the end of the `spack add` commands
# Add kokkos and Trilinos, adjust cuda_arch as needed for your GPU device
# Requires a Trilinos commit from 04/19/2024, so >trilinos@15.1.1
spack add compadre
spack add kokkos-kernels +cuda ~shared cuda_arch=75
spack add kokkos +cuda +cuda_lambda +cuda_relocatable_device_code ~cuda_uvm ~shared +wrapper cuda_arch=75 cxxstd=17
spack add trilinos +boost +cuda +cuda_rdc +exodus +gtest +hdf5 ~shared +stk ~uvm +wrapper +zoltan +zoltan2 cuda_arch=75 cxxstd=17
spack add mfem +netcdf +cuda cuda_arch=75
spack add googletest
spack add lcov
spack add yaml-cpp
spack add eigen

# Install Packages
spack install
```

### General Notes

Have noticed that if a spack environment was renamed it may cause problems in finding the `nvcc` compiler. The only fix found has been to avoid renaming environments.

---

### Notes on Specific Installs

#### Ubuntu 20.04, x86_64, GPU

Successfully installed on an Azure [NC4as T4 v3](https://learn.microsoft.com/en-us/azure/virtual-machines/nct4-v3-series), Ubuntu 20.04, system using `apt-get` to install prerequisites:

- `gcc@10.5.0`
- `cmake@3.27.19`

The commands for a GPU build are:

```bash
# Add Trilinos, googletest, lcov, yaml-cpp, and eigen
spack add compadre@master%gcc@10.5.0
spack add kokkos-kernels%gcc@10.5.0 +cuda ~shared cuda_arch=75
spack add kokkos%gcc@10.5.0 +cuda +cuda_lambda +cuda_relocatable_device_code ~cuda_uvm ~shared +wrapper cuda_arch=75 cxxstd=17
spack add trilinos@develop%gcc@10.5.0 +boost +cuda +cuda_rdc +exodus +gtest +hdf5 ~muelu ~sacado ~shared +stk ~uvm +wrapper +zoltan +zoltan2 cuda_arch=75 cxxstd=17
spack add mfem%gcc@10.5.0 +netcdf +cuda cuda_arch=75
spack add googletest%gcc@10.5.0
spack add yaml-cpp%gcc@10.5.0
spack add eigen%gcc@10.5.0
spack add lcov%gcc@10.5.0

# Install Packages
spack install --fresh
```

The commands for a CPU build with openmp are below. There was some trouble buidling Compadre tests, so the `~tests` flag was important.

```bash
# If needed, specify a specific compiler. For example, add `%gcc@10.5.0` at the end of the `spack add` commands
# Add Trilinos, googletest, lcov, yaml-cpp, and eigen
spack add kokkos%gcc@10.5.0 ~cuda ~shared +openmp cxxstd=17
spack add kokkos-kernels%gcc@10.5.0 ~cuda ~shared +openmp
spack add compadre@master%gcc@10.5.0 ~tests
spack add trilinos@master%gcc@10.5.0 +boost ~cuda +exodus +gtest +hdf5 ~muelu +openmp ~sacado ~shared +stk +zoltan +zoltan2 cxxstd=17
spack add mfem%gcc@10.5.0 +netcdf
spack add googletest%gcc@10.5.0
spack add yaml-cpp%gcc@10.5.0
spack add eigen%gcc@10.5.0
spack add lcov%gcc@10.5.0

# Install Packages
spack install --fresh
```

And, the commands for a CPU build without openmp or threads are:

```bash
# If needed, specify a specific compiler. For example, add `%gcc@10.5.0` at the end of the `spack add` commands
# Add Trilinos, googletest, lcov, yaml-cpp, and eigen
spack add kokkos%gcc@10.5.0 ~cuda ~shared cxxstd=17
spack add kokkos-kernels%gcc@10.5.0 ~cuda ~shared
spack add compadre@master%gcc@10.5.0 ~tests
spack add trilinos@develop%gcc@10.5.0 +boost ~cuda +exodus +gtest +hdf5 ~muelu ~sacado ~shared +stk +zoltan +zoltan2 cxxstd=17
spack add mfem%gcc@10.5.0 +netcdf
spack add googletest%gcc@10.5.0
spack add yaml-cpp%gcc@10.5.0
spack add eigen%gcc@10.5.0
spack add lcov%gcc@10.5.0

# Install Packages
spack install --fresh
```

#### Ubuntu 22.04, x86_64, CPU Only

Successfully installed on an Ubuntu 22.04 system using `apt-get` to install prerequisites:

- `gcc@11.4.0`
- `cmake@3.22.1`

#### Ubuntu 23.10, x86_64, CPU Only

Successfully installed on an Ubuntu 23.10 system using `apt-get` to install prerequisites:

- `gcc@13.2.0`
- `cmake@3.27.4`

#### M1 Mac, CPU Only

Successfully installed on a M1 Mac with the following:

- `gcc@13.2.0` from Homebrew
- `apple-clang@15.0.0` from Xcode
- `lcov@2.0_1` from Homebrew

For code coverage, be sure `gcov` is using from the same version of gcc. I had to:

```bash
ln -s /opt/homebrew/bin/gcov-13 /opt/homebrew/bin/gcov
```

Also, some homebrew installed tools were not in the path by default and had to be added or some package would fail to install.

Spack struggled to install `lcov` due to issues installing `perl` so used the homebrew `lcov` instead

```bash
# Add packages
spack add compadre@master%apple-clang@15.0.0
spack add kokkos-kernels%apple-clang@15.0.0 -cuda -shared +threads
spack add kokkos%apple-clang@15.0.0 -cuda -shared +threads cxxstd=17
spack add trilinos@master%apple-clang@15.0.0 -cuda +exodus +gtest +hdf5 -shared +stk +zoltan +zoltan2 cxxstd=17
spack add mfem%apple-clang@15.0.0 +netcdf
spack add googletest%apple-clang@15.0.0
spack add yaml-cpp%apple-clang@15.0.0
spack add eigen%apple-clang@15.0.0

# Install Packages
spack install
```
