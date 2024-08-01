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
    build-essential=12.9ubuntu3 \
    ca-certificates=20230311ubuntu0.22.04.1 \
    coreutils=8.32-4.1ubuntu1.2 \
    curl=7.81.0-1ubuntu1.16 \
    environment-modules=5.0.1-1 \
    file=1:5.41-3ubuntu0.1 \
    gfortran=4:11.2.0-1ubuntu1 \
    git=1:2.34.1-1ubuntu1.11 \
    git-lfs=3.0.2-1ubuntu0.2 \
    gpg=2.2.27-3ubuntu2.1 \
    lcov=1.15-1 \
    libcurl4-openssl-dev=7.81.0-1ubuntu1.16 \
    libgl1=1.4.0-1 \
    libglu1-mesa=9.0.2-1 \
    libssl-dev=3.0.2-0ubuntu1.17 \
    lsb-release=11.1.0ubuntu4 \
    openssl=3.0.2-0ubuntu1.17 \
    python3=3.10.6-1~22.04 \
    python3-distutils=3.10.8-1~22.04 \
    python3-venv=3.10.6-1~22.04 \
    python3-pip=22.0.2+dfsg-1ubuntu0.4 \
    unzip=6.0-26ubuntu3.2 \
    vim=2:8.2.3995-1ubuntu2.17 \
    xorg=1:7.7+23ubuntu2 \
    zip=3.0-12build2 \
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
RUN pip3 install --no-input --no-cache-dir \
    pytest==8.3.2 \
    testbook==0.4.2 \
    jupyter==1.0.0 \
    jupyterlab==4.2.4 \
    numpy==2.0.1 \
    scipy==1.14.0 \
    matplotlib==3.9.1 \
    ipykernel==6.29.5 \
    meshio==5.3.5 \
    gmsh==4.13.1 \
    netCDF4==1.7.1.post1 \
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
# Compadre should be version 1.5.9 (need to update the spack package to get that version as of July 2024)
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e aperi-mech add compadre@master ~tests && \
    spack -e aperi-mech add kokkos-kernels@4.3.01 ~cuda ~shared && \
    spack -e aperi-mech add kokkos@4.3.01 ~cuda ~shared cxxstd=17 && \
    spack -e aperi-mech add trilinos@16.0.0 ~amesos ~amesos2 ~anasazi ~aztec ~belos ~cuda ~epetra ~epetraext ~ifpack ~ifpack2 ~ml ~muelu ~sacado ~shared +exodus +gtest +hdf5 +mpi +stk +zoltan +zoltan2 cxxstd=17 && \
    spack -e aperi-mech add googletest@1.14.0 && \
    spack -e aperi-mech add yaml-cpp@0.7.0 && \
    spack -e aperi-mech add eigen@3.4.0

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