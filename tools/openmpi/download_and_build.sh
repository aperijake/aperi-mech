#!/bin/bash
set -euo pipefail

echo "Make sure to first spacktivate the env containing the desired hwloc, libevent, and pmix"

OPENMPI_VERSION="5.0.8"
OPENMPI_TAR="openmpi-${OPENMPI_VERSION}.tar.gz"
OPENMPI_URL="https://download.open-mpi.org/release/open-mpi/v5.0/${OPENMPI_TAR}"

# Set install prefix for OpenMPI
OPENMPI_INSTALL_PREFIX="${HOME}/local/openmpi-${OPENMPI_VERSION}-with-hwloc"
echo "OpenMPI will be installed to: ${OPENMPI_INSTALL_PREFIX}"

export MACOSX_DEPLOYMENT_TARGET=12
export PATH="/opt/homebrew/Cellar/gcc/15.1.0/bin:$PATH"
export FC="/opt/homebrew/Cellar/gcc/15.1.0/bin/gfortran-15"
export DYLD_LIBRARY_PATH="/opt/homebrew/Cellar/gcc/15.1.0/lib/gcc/15:${DYLD_LIBRARY_PATH-}"
export SDKROOT=$(xcrun --show-sdk-path)
export CFLAGS="-isysroot $SDKROOT"
export CXXFLAGS="-isysroot $SDKROOT"
export LDFLAGS="-isysroot $SDKROOT"

echo "C/CXX/LD Flags= -isysroot $SDKROOT"

echo "Using gfortran at: $(which gfortran)"
otool -L /opt/homebrew/Cellar/gcc/15.1.0/bin/gfortran-15 # check linked dylibs

echo 'program test; print *, "gfortran test worked"; end program test' >test.f90
gfortran-15 test.f90 -o test.out
DYLD_LIBRARY_PATH=$DYLD_LIBRARY_PATH ./test.out

MD5_EXPECTED="499ca9ccf13bc4df7fb45e46debc0040"
SHA1_EXPECTED="34560578f2ba30ef33da5df589cc3cf8f706bc9a"
SHA256_EXPECTED="f891ddf2dab3b604f2521d0569615bc1c07a1ac86a295ac543e059aecb303621"

# Download OpenMPI tarball
if [ ! -f "${OPENMPI_TAR}" ]; then
	echo "Downloading OpenMPI ${OPENMPI_VERSION}..."
	curl -LO "${OPENMPI_URL}"
else
	echo "Tarball ${OPENMPI_TAR} already exists, skipping download."
fi

# Verify checksums
echo "Verifying checksums..."
MD5_ACTUAL=$(md5 -q "${OPENMPI_TAR}")
if [[ ${MD5_ACTUAL} != "${MD5_EXPECTED}" ]]; then
	echo "MD5 checksum mismatch! Expected ${MD5_EXPECTED}, got ${MD5_ACTUAL}"
	exit 1
fi

SHA1_ACTUAL=$(shasum -a 1 "${OPENMPI_TAR}" | awk '{print $1}')
if [[ ${SHA1_ACTUAL} != "${SHA1_EXPECTED}" ]]; then
	echo "SHA1 checksum mismatch! Expected ${SHA1_EXPECTED}, got ${SHA1_ACTUAL}"
	exit 1
fi

SHA256_ACTUAL=$(shasum -a 256 "${OPENMPI_TAR}" | awk '{print $1}')
if [[ ${SHA256_ACTUAL} != "${SHA256_EXPECTED}" ]]; then
	echo "SHA256 checksum mismatch! Expected ${SHA256_EXPECTED}, got ${SHA256_ACTUAL}"
	exit 1
fi
echo "Checksums verified."

# Extract tarball
echo "Extracting OpenMPI tarball..."
tar xf "${OPENMPI_TAR}"

# Get hwloc path from spack env
echo "Locating hwloc install path from Spack environment..."
HWLOC_PREFIX=$(spack location -i hwloc)
if [ -z "${HWLOC_PREFIX}" ]; then
	echo "ERROR: Could not find hwloc installation path from Spack."
	exit 1
fi
echo "Found hwloc at ${HWLOC_PREFIX}"

# Get libevent path from spack env
echo "Locating libevent install path from Spack environment..."
LIBEVENTLOC_PREFIX=$(spack location -i libevent)
if [ -z "${LIBEVENTLOC_PREFIX}" ]; then
	echo "ERROR: Could not find libevent installation path from Spack."
	exit 1
fi
echo "Found libevent at ${LIBEVENTLOC_PREFIX}"

# Get pmix path from spack env
echo "Locating pmix install path from Spack environment..."
PMIXLOC_PREFIX=$(spack location -i pmix)
if [ -z "${PMIXLOC_PREFIX}" ]; then
	echo "ERROR: Could not find pmix installation path from Spack."
	exit 1
fi
echo "Found pmix at ${PMIXLOC_PREFIX}"

# Build OpenMPI
cd "openmpi-${OPENMPI_VERSION}"

echo "Configuring OpenMPI..."
./configure --prefix="${OPENMPI_INSTALL_PREFIX}" --with-hwloc="${HWLOC_PREFIX}" --with-libevent="${LIBEVENTLOC_PREFIX}" --with-pmix="${PMIXLOC_PREFIX}"

echo "Building OpenMPI..."
make -j$(sysctl -n hw.logicalcpu)

echo "Installing OpenMPI..."
make install

echo "OpenMPI ${OPENMPI_VERSION} built and installed successfully with hwloc from Spack environment."
echo "Add ${OPENMPI_INSTALL_PREFIX}/bin to your PATH to use it."
echo "Add as an external in ~/.spack/packages.yaml to use in spack builds."
