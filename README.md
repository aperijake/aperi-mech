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

---

### Notes on Specific Installs

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
- `cmake@3.26.4` from Conda
- `lcov@2.0_1` from Homebrew

For code coverage, be sure `gcov` is using from the same version of gcc. I had to:

```bash
ln -s /opt/homebrew/bin/gcov-13 /opt/homebrew/bin/gcov
```

Spack struggled to install `lcov` due to issues installing `perl` so used the homebrew `lcov` instead

Also, had some trouble with `openblas` and `gcc`. Compiled `openblas` with `apple-clang`. The commands are:

```bash
# Add Trilinos, googletest, lcov, yaml-cpp, and eigen
spack add trilinos +boost +exodus +gtest +hdf5 +stk +zoltan +zoltan2 %gcc ^openblas%apple-clang
spack add mfem +netcdf %gcc ^openblas%apple-clang
spack add googletest %gcc
spack add yaml-cpp %gcc
spack add eigen %gcc

# Install Packages
spack install
```
