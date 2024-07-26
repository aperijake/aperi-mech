# Dockerfile for building a CPU-only environment for the aperi-mech project
# Base Image: Ubuntu 22.04
# This Dockerfile sets up a python and spack environment with necessary packages
# After building the image, the user can run the container and start working on the aperi-mech project.
# Building the project:
#    1. This assume the user has the aperi-mech project cloned in the same directory as the Dockerfile
#    2. Build the docker image using the following command:
#        docker build -t aperi-mech:latest .
#    3. Run the docker container using the following command (uses the docker-compose.yml file in the aperi-mech project):
#        docker-compose run --service-ports aperi-mech-development /bin/bash
#    4. Start working on the aperi-mech project
#       - Configure the project
#          ./do_configure
#       - Build the project:
#          cd build/Release
#          make -j 4
#       - Run the project unit tests:
#          make run_all_unit_tests
#       - Run the project regression tests:
#          TODO(jake) implement: make run_all_regression_tests
#       - Run the project performance tests:
#          TODO(jake) implement: make run_all_performance_tests

# Base image
FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

#################### System Packages from apt ####################
# Install necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    coreutils \
    curl \
    environment-modules \
    file \
    gfortran \
    git \
    gpg \
    libcurl4-openssl-dev \
    libgl1 \
    libglu1-mesa \
    libssl-dev \
    lsb-release \
    openssl \
    python3 \
    python3-distutils \
    python3-venv \
    python3-pip \
    unzip \
    vim \
    xorg \
    zip \
    && rm -rf /var/lib/apt/lists/*

#################### User Setup ####################
# Create a non-root user
RUN useradd -m aperi-mech_docker

# Change to the new user
USER aperi-mech_docker

# Make the working directory
WORKDIR /home/aperi-mech_docker

# Set the HOME environment variable
ENV HOME=/home/aperi-mech_docker

#################### Python Packages ####################
# Install python packages using pip
RUN pip3 install --no-input \
    pytest \
    testbook \
    jupyter \
    jupyterlab \
    numpy \
    scipy \
    matplotlib \
    ipykernel \
    meshio \
    gmsh \
    netCDF4 \
    && rm -rf ~/.cache/pip

# Add environment to Jupyter
RUN python3 -m ipykernel install --user --name aperi-mech --display-name "aperi-mech"

# Add .local/bin to the PATH
ENV PATH="${HOME}/.local/bin:$PATH"

#################### Spack Installation and Setup ####################
# Clone Spack repo
RUN git clone -c feature.manyFiles=true https://github.com/spack/spack.git ${HOME}/spack

# Set up Spack environment
ENV SPACK_ROOT=${HOME}/spack
ENV PATH="$SPACK_ROOT/bin:$PATH"
RUN . $SPACK_ROOT/share/spack/setup-env.sh

# Find compilers and externals for Spack
RUN spack compiler find && \
    spack external find

# Create a new Spack environment, cpu build
RUN spack env create aperi-mech

# Add packages to the Spack environment, aperi-mech
# Requires a Trilinos commit from 04/19/2024, so >trilinos@15.1.1
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e aperi-mech add compadre@master ~tests && \
    spack -e aperi-mech add kokkos-kernels ~cuda ~shared && \
    spack -e aperi-mech add kokkos ~cuda ~shared cxxstd=17 && \
    spack -e aperi-mech add trilinos@develop ~amesos ~amesos2 ~anasazi ~aztec ~belos ~cuda ~epetra ~epetraext ~ifpack ~ifpack2 ~ml ~muelu ~sacado ~shared +exodus +gtest +hdf5 +mpi +stk +zoltan +zoltan2 cxxstd=17 && \
    spack -e aperi-mech add googletest && \
    spack -e aperi-mech add lcov && \
    spack -e aperi-mech add yaml-cpp && \
    spack -e aperi-mech add eigen

# Install Packages, aperi-mech
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e aperi-mech install --fresh

# Create a new Spack environment, for seacas. Want seacas without mpi, which causes conflicts with trilinos
RUN spack env create seacas

# Add packages to the Spack environment, seacas
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e seacas add openmpi && \
    spack -e seacas add seacas ~mpi ~tests ~x11

# Install Packages, seacas
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e seacas install --fresh

# Add the spack source command to the bashrc
RUN echo "source ${SPACK_ROOT}/share/spack/setup-env.sh" >> ${HOME}/.bashrc

# HEALTHCHECK to verify Spack and Python availability
HEALTHCHECK --interval=1m --timeout=10s --start-period=5s --retries=3 CMD /bin/bash -c "source ${SPACK_ROOT}/share/spack/setup-env.sh && python3 --version || exit 1"