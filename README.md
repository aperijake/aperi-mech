# aperi-mech

[![CI/CD Pipeline](https://github.com/aperijake/aperi-mech/actions/workflows/ci-cd-pipeline.yaml/badge.svg)](https://github.com/aperijake/aperi-mech/actions/workflows/ci-cd-pipeline.yaml)
[![Performance Pipeline](https://github.com/aperijake/aperi-mech/actions/workflows/performance-pipeline.yaml/badge.svg)](https://github.com/aperijake/aperi-mech/actions/workflows/performance-pipeline.yaml)

An open-source platform for computational mechanics. It uses Kokkos and will run in parallel (MPI) and on the GPU.

## Building

`aperi-mech` depends on:

- Trilinos packages including: `kokkos`, `kokkos-kernels`, `exodus`, `STK`, and more.
- Python packages include: `NumPy`, `SciPy`, `matplotlib`, `jupyter`, and mores.
- And other: `googletest`, `yaml`, `eigen`

### LFS Requirement

`aperi-mech` uses Git Large File Storage (LFS) for managing large files. Ensure you have `git-lfs` installed and configured before cloning the repository.

#### Install Git LFS

Follow the instructions at [https://git-lfs.github.com/](https://git-lfs.github.com/). In short:

```bash
# Install git-lfs
sudo apt-get install git-lfs

# Initialize git-lfs in your repository
git lfs install
```

#### Cloning the repository

When cloning the repository, ensure that LFS files are pulled correctly:

```bash
git clone https://github.com/aperijake/aperi-mech.git
cd aperi-mech
git lfs pull
```

### Docker

Dockerfiles are provided for the easiest way to get up and running. Otherwise, the recommended way to build is using `spack` and `conda` or `pip`.

See [https://www.docker.com/get-started/](https://www.docker.com/get-started/) to install `Docker` on your system. After that, you can build an MPI CPU image:

```bash
docker build -f Dockerfile -t aperi-mech:latest .
```

and start the container interactively using:

```bash
docker run -it aperi-mech:latest
```

For a GPU build, see the other `Dockerfile*` files in this directory. Be sure to change the `CUDA_ARCH` to match your GPU. The `Dockerfile` can also be used to see how the project is built.

### Install Manually

#### Prerequisites

##### Spack

###### Install Spack

Follow the instructions at [https://spack.readthedocs.io/en/latest/getting_started.html](https://spack.readthedocs.io/en/latest/getting_started.html). In short, install the `spack` prerequisites, clone `spack`, and source the script for shell support.

Next find the system tools:

```bash
# Add system compilers. e.g. gcc
spack compiler find

# Use external tools. e.g. cmake
spack external find
```

###### Create a Spack Environment

```bash
# Create and activate a spack environment for the project
spack env create aperi-mech
spacktivate aperi-mech
```

###### Add and Install Required Packages

For a CPU build with MPI:

```bash
# If needed, specify a specific compiler. For example, add `%gcc@10.5.0` at the end of the `spack add` commands
# Requires a Trilinos commit from 04/19/2024, so >trilinos@15.1.1
spack add compadre
spack add kokkos ~cuda ~shared cxxstd=17
spack add kokkos-kernels ~cuda ~shared
spack add trilinos@develop ~amesos ~amesos2 ~anasazi ~aztec ~belos ~cuda ~epetra ~epetraext ~ifpack ~ifpack2 ~ml ~muelu ~sacado ~shared +exodus +gtest +hdf5 +stk +zoltan +zoltan2 cxxstd=17
spack add googletest
spack add lcov
spack add yaml-cpp
spack add eigen

# Install Packages
spack install
```

Or, for a GPU build:

```bash
# Replace cuda_arch according to your GPU.
spack add compadre
spack add kokkos-kernels +cuda ~shared cuda_arch=75
spack add kokkos +cuda +cuda_lambda +cuda_relocatable_device_code ~cuda_uvm ~shared +wrapper cuda_arch=75 cxxstd=17
spack add trilinos@develop ~amesos ~amesos2 ~anasazi ~aztec ~belos ~cuda ~epetra ~epetraext ~ifpack ~ifpack2 ~ml ~muelu ~sacado ~shared +cuda +cuda_rdc +exodus +gtest +hdf5 +stk +zoltan +zoltan2 cuda_arch=75 cxxstd=17
spack add googletest
spack add lcov
spack add yaml-cpp
spack add eigen

# Install Packages
spack install
```

##### Install Required Python Libraries

###### Install Conda

Follow instructions here [https://docs.conda.io/projects/conda/en/stable/user-guide/install/index.html](https://docs.conda.io/projects/conda/en/stable/user-guide/install/index.html). In short:

```bash
# For example, replace with the appropriate system file
wget https://repo.anaconda.com/archive/Anaconda3-2024.06-1-Linux-x86_64.sh # download
bash Anaconda3-2024.06-1-Linux-x86_64.sh # install
# open fresh terminal
conda init bash # initialize, may have to path to conda if it is not found
conda update conda
conda config --add channels conda-forge # add path to conda-forge
```

Create an environment

```bash
conda create -n aperi-mech # change name as desired
conda activate aperi-mech
```

Install required packages

```bash
conda install pytest testbook jupyter jupyterlab numpy scipy matplotlib ipykernel
```

Add the environment as a Jupyter kernel so it can be used to run the notebooks

```bash
python -m ipykernel install --user --name aperi-mech --display-name "Python (aperi-mech)"
```

#### Build aperi-mech

##### Configure

From the project root directory with the `spack` environment activated, configure with `cmake`

```bash
./do_configure
```

note the options in `do_configure` script to enable GPU support (`--gpu`) and switch the build type (e.g. `--build-type Debug`)

##### Build

```bash
cd build/Release # for CPU and release
# cd build/Release_gpu # for GPU and release
# cd build/Debug # for CPU and debug
# cd build/Debug_gpu # for GPU and debug

# Build the project
make -j 4 # change 4 to the number of processors desired
```

---

### Notes on Specific Installs

#### Ubuntu 20.04, x86_64, GPU, CPU, and CPU with OpenMP

Successfully installed on an Azure [NC4as T4 v3](https://learn.microsoft.com/en-us/azure/virtual-machines/nct4-v3-series), Ubuntu 20.04, system using `apt-get` to install prerequisites:

- `gcc@10.5.0`
- `cmake@3.27.19`

The commands for a CPU build with OpenMP are below. There was some trouble building Compadre tests, so the `~tests` flag was important.

```bash
# Add packages
spack add kokkos%gcc@10.5.0 ~cuda ~shared +openmp cxxstd=17
spack add kokkos-kernels%gcc@10.5.0 ~cuda ~shared +openmp
spack add compadre@master%gcc@10.5.0 ~tests
spack add trilinos@master%gcc@10.5.0 +boost ~cuda +exodus +gtest +hdf5 ~muelu +openmp ~sacado ~shared +stk +zoltan +zoltan2 cxxstd=17 # This can probably be trimmed more
spack add googletest%gcc@10.5.0
spack add yaml-cpp%gcc@10.5.0
spack add eigen%gcc@10.5.0
spack add lcov%gcc@10.5.0

# Install
spack install --fresh
```

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
spack add googletest%apple-clang@15.0.0
spack add yaml-cpp%apple-clang@15.0.0
spack add eigen%apple-clang@15.0.0

# Install Packages
spack install
```
