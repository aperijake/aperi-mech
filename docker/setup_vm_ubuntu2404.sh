#!/bin/bash
#
# VM Setup Script for aperi-mech on Ubuntu 24.04
# Generated from Dockerfile_AperiMech_Ubuntu2404
#
# This script sets up the same development environment as the Docker container
# Run this script as a regular user with sudo privileges
#

set -e # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo_info() {
	echo -e "${GREEN}[INFO]${NC} $1"
}

echo_warn() {
	echo -e "${YELLOW}[WARN]${NC} $1"
}

echo_error() {
	echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration variables
USER_NAME="${USER}"
SRC_BRANCH="${SRC_BRANCH:-main}"
PROTEGO="${PROTEGO:-0}"
APERI_MECH_ROOT="${HOME}/aperi-mech"

echo_info "Starting VM setup for aperi-mech development environment"
echo_info "User: ${USER_NAME}"
echo_info "Source branch: ${SRC_BRANCH}"
echo_info "PROTEGO enabled: ${PROTEGO}"
echo_info "Installation directory: ${APERI_MECH_ROOT}"

# Avoid prompts from apt
export DEBIAN_FRONTEND=noninteractive

#################### System Packages from apt ####################
echo_info "Updating package lists and installing system packages..."
sudo apt-get update
sudo apt-get install -y --no-install-recommends \
	autoconf \
	automake \
	build-essential \
	ca-certificates \
	chrpath \
	cmake \
	coreutils \
	curl \
	desktop-file-utils \
	environment-modules \
	file \
	fuse \
	gfortran \
	git \
	git-lfs \
	gpg \
	htop \
	lcov \
	libaec-dev \
	libbz2-dev \
	libcurl4-openssl-dev \
	libfuse2 \
	libgl1 \
	libglu1-mesa \
	libhwloc-dev \
	liblz4-dev \
	libncurses-dev \
	libopenblas-dev \
	libsnappy-dev \
	libssl-dev \
	libtool \
	libxml2-dev \
	libzstd-dev \
	lsb-release \
	openssh-client \
	openssl \
	patchelf \
	pkgconf \
	python3 \
	python3-dev \
	python3-full \
	python3-venv \
	python3-pip \
	sudo \
	unzip \
	vim \
	xorg \
	zip

echo_info "Cleaning up apt cache..."
sudo rm -rf /var/lib/apt/lists/*

#################### AppImage Tools ####################
echo_info "Installing AppImage tools..."
sudo mkdir -p /opt/appimage-tools
cd /opt/appimage-tools

# Download appimagetool for ARM64
echo_info "Downloading appimagetool..."
sudo curl -L -o appimagetool https://github.com/AppImage/appimagetool/releases/download/continuous/appimagetool-aarch64.AppImage
sudo chmod +x appimagetool

# Download linuxdeploy for ARM64
echo_info "Downloading linuxdeploy..."
sudo curl -L -o linuxdeploy https://github.com/linuxdeploy/linuxdeploy/releases/download/continuous/linuxdeploy-aarch64.AppImage
sudo chmod +x linuxdeploy

# Create symlinks in /usr/local/bin
echo_info "Creating symlinks for AppImage tools..."
sudo ln -sf /opt/appimage-tools/appimagetool /usr/local/bin/appimagetool
sudo ln -sf /opt/appimage-tools/linuxdeploy /usr/local/bin/linuxdeploy

#################### Clone Repository ####################
echo_info "Cloning aperi-mech repository..."
if [ -d "${APERI_MECH_ROOT}" ]; then
	echo_warn "Directory ${APERI_MECH_ROOT} already exists. Skipping clone."
else
	git clone https://github.com/aperijake/aperi-mech.git "${APERI_MECH_ROOT}"
	cd "${APERI_MECH_ROOT}"
	git checkout "${SRC_BRANCH}"
fi

cd "${APERI_MECH_ROOT}"

#################### SSH Setup for PROTEGO ####################
if [ "${PROTEGO}" = "1" ]; then
	echo_info "PROTEGO enabled. Setting up SSH..."

	# Add GitHub to known_hosts
	mkdir -p ~/.ssh
	ssh-keyscan github.com >>~/.ssh/known_hosts

	# Check if SSH agent is available
	if [ -z "$SSH_AUTH_SOCK" ]; then
		echo_error "PROTEGO enabled but no SSH agent detected."
		echo_warn "Please start ssh-agent and add your key before running submodule update:"
		echo_warn '  eval $(ssh-agent -s)'
		echo_warn "  ssh-add ~/.ssh/id_rsa"
		echo_warn "  git submodule update --init --recursive"
	else
		echo_info "Updating submodules with SSH..."
		git submodule update --init --recursive
	fi
else
	echo_info "PROTEGO not enabled. Skipping submodule update."
fi

#################### Environment Variables ####################
echo_info "Setting up environment variables..."
export APERI_MECH_ROOT="${APERI_MECH_ROOT}"
export FC=/usr/bin/gfortran
export F77=/usr/bin/gfortran

#################### Python Virtual Environment ####################
echo_info "Setting up Python virtual environment..."
python3 -m venv "${APERI_MECH_ROOT}/venv"
source "${APERI_MECH_ROOT}/venv/bin/activate"

# Add APERI_MECH_ROOT to venv activation
echo "export APERI_MECH_ROOT=$APERI_MECH_ROOT" >>"${APERI_MECH_ROOT}/venv/bin/activate"

# Install aperi-mech Python tools
echo_info "Installing aperi-mech Python package..."
cd "${APERI_MECH_ROOT}/tools/python/aperi-mech"
python3 -m pip install -e .

echo_info "Installing spackx Python package..."
cd "${APERI_MECH_ROOT}/tools/python/spackx"
python3 -m pip install -e .

#################### Spack Installation ####################
echo_info "Installing Spack..."
mkdir -p "${APERI_MECH_ROOT}/venv/src"
cd "${APERI_MECH_ROOT}/venv/src"

if [ ! -d "spack" ]; then
	git clone https://github.com/spack/spack.git
	git -C "${APERI_MECH_ROOT}/venv/src/spack" checkout prereleases/v1.0.0-alpha.4
fi

# Add Spack to venv activation
echo "source $APERI_MECH_ROOT/venv/src/spack/share/spack/setup-env.sh" >>"${APERI_MECH_ROOT}/venv/bin/activate"

# Re-source to get Spack commands
source "${APERI_MECH_ROOT}/venv/bin/activate"

#################### Spack Configuration ####################
echo_info "Configuring Spack..."
spack compiler find
spack external find
spack external find cmake hwloc libxml2 pkgconf bzip2 lz4 snappy zstd libaec ncurses openblas autoconf automake libtool

#################### Patch Trilinos ####################
echo_info "Patching Spack for Trilinos support..."
spack patch-trilinos

#################### Create Spack Environment ####################
echo_info "Creating Spack environment for aperi-mech..."
cd "${APERI_MECH_ROOT}"

# Check if environment already exists
if spack env list | grep -q "aperi-mech"; then
	echo_warn "Spack environment 'aperi-mech' already exists. Skipping creation."
else
	spack env create aperi-mech
fi

spack -e aperi-mech develop --path "${APERI_MECH_ROOT}" aperi-mech

if [ "${PROTEGO}" = "1" ]; then
	echo_info "Adding aperi-mech with PROTEGO support..."
	spack -e aperi-mech add aperi-mech +protego +openmp build_type=Release
else
	echo_info "Adding aperi-mech without PROTEGO..."
	spack -e aperi-mech add aperi-mech +openmp build_type=Release
fi

spack -e aperi-mech concretize -f

#################### Install Dependencies ####################
echo_info "Installing Spack dependencies (this will take a while)..."

echo_info "Installing eigen, yaml-cpp, googletest..."
spack -e aperi-mech install eigen yaml-cpp googletest

echo_info "Installing kokkos, kokkos-kernels, compadre..."
spack -e aperi-mech install kokkos kokkos-kernels compadre

echo_info "Installing trilinos..."
spack -e aperi-mech install trilinos

echo_info "Installing aperi-mech..."
spack -e aperi-mech install aperi-mech

#################### Register Spack Repository ####################
echo_info "Registering local aperi-mech Spack repository..."
spack -e aperi-mech repo add "${APERI_MECH_ROOT}/tools/python/spackx/src/spackx/repos/aperi/"

#################### Setup bashrc ####################
echo_info "Adding activation to ~/.bashrc..."
if ! grep -q "source ${APERI_MECH_ROOT}/venv/bin/activate" ~/.bashrc; then
	echo "" >>~/.bashrc
	echo "# aperi-mech virtual environment" >>~/.bashrc
	echo "source ${APERI_MECH_ROOT}/venv/bin/activate" >>~/.bashrc
fi

#################### Environment Variables for OpenMP ####################
echo_info "Setting OpenMP environment variables in venv..."
cat >>"${APERI_MECH_ROOT}/venv/bin/activate" <<'EOF'

# OpenMP environment variables
export OMP_NUM_THREADS=1
export OMP_PROC_BIND=spread
export OMP_PLACES=cores
export OMP_DYNAMIC=false

# Spack environment
export APERI_MECH_ENV="aperi-mech"
export APERI_MECH_CPU_ENV="aperi-mech"
EOF

#################### Completion ####################
echo_info "================================"
echo_info "Setup complete!"
echo_info "================================"
echo_info ""
echo_info "To activate the environment, run:"
echo_info "  source ${APERI_MECH_ROOT}/venv/bin/activate"
echo_info ""
echo_info "Or start a new shell (it will auto-activate)"
echo_info ""
echo_info "To activate the Spack environment, run:"
echo_info "  spacktivate aperi-mech"
echo_info ""
echo_info "To get the build location of aperi-mech:"
echo_info "  spacktivate aperi-mech"
echo_info "  spack location -i aperi-mech build_type=Release"
echo_info ""
