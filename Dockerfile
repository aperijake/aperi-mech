# Dockerfile for building a CPU-only environment for the aperi-mech project
# Base Image: Ubuntu 22.04
# This Dockerfile sets up a python and spack environment with necessary packages, clones the aperi-mech project, and builds the project

# Base image
FROM ubuntu:22.04

# Avoid prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Install necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    cmake \
    build-essential \
    wget \
    ca-certificates \
    coreutils \
    curl \
    openssl \
    libcurl4-openssl-dev \
    environment-modules \
    gfortran \
    gpg \
    lsb-release \
    python3 \
    python3-distutils \
    python3-venv \
    python3-pip \
    unzip \
    zip \
    vim \
    libgl1 \
    libglu1-mesa \
    xorg \
    && rm -rf /var/lib/apt/lists/*
    # openmpi-bin \
    # openmpi-common \
    # libopenmpi-dev \

# Create a non-root user
RUN useradd -m aperi-mech_developer

# Change to the new user
USER aperi-mech_developer

# Make the working directory
WORKDIR /home/aperi-mech_developer

# Set the HOME environment variable
ENV HOME=/home/aperi-mech_developer

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
    && rm -rf ~/.cache/pip

# Add environment to Jupyter
RUN python3 -m ipykernel install --user --name aperi-mech --display-name "aperi-mech"

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

# Create a new Spack environment, for seacas. Want seacas without mpi, which causes conflicts with trilinos
RUN spack env create seacas

# Add packages to the Spack environment, aperi-mech
# Requires a Trilinos commit from 04/19/2024, so >trilinos@15.1.1
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e aperi-mech add cmake && \
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

# Add packages to the Spack environment, seacas
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e seacas add seacas ~mpi ~tests ~x11

# Install Packages, seacas
RUN . $SPACK_ROOT/share/spack/setup-env.sh && \
    spack -e seacas install --fresh

# Clone aperi-mech
RUN git clone https://github.com/aperijake/aperi-mech.git ${HOME}/aperi-mech

# Change to the aperi-mech directory
WORKDIR ${HOME}/aperi-mech

# Checkout the cicd branch
RUN git checkout cicd

# Configure the project, release build
RUN /bin/bash -c 'source ${SPACK_ROOT}/share/spack/setup-env.sh && ./do_configure'

# Change to the build directory
WORKDIR ${HOME}/aperi-mech/build/Release

# Build the project
RUN make -j 4

# Run the test
RUN /bin/bash -c "source activate aperi-mech && make run_all_unit_tests"

# Add the build directory to the PATH
ENV PATH="${HOME}/aperi-mech/build/Release:$PATH"

# Add the spack source command to the bashrc
RUN echo "source ${SPACK_ROOT}/share/spack/setup-env.sh" >> ${HOME}/.bashrc

# Add HEALTHCHECK instruction
HEALTHCHECK --interval=1m --timeout=10s --start-period=5s --retries=3 CMD /bin/bash -c "source activate aperi-mech && unit_tests --gtest_filter=ApplicationTest* || exit 1"
