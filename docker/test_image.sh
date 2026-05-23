#!/usr/bin/env bash
#
# Automated test suite for amech Docker images
# Tests Level 2 (post-build) and Level 3 (GPU-specific)
#
# Usage:
#   ./test_image.sh <image_tag> [--gpu]
#
# Examples:
#   ./test_image.sh aperi-mech:ubuntu24.04
#   ./test_image.sh aperi-mech:ubuntu24.04-cuda12.6 --gpu
#

set -e

# Parse arguments
IMAGE_TAG="$1"
TEST_GPU=false
TEST_AMD=false

if [[ -z "${IMAGE_TAG}" ]]; then
    echo "Error: Image tag required"
    echo "Usage: $0 <image_tag> [--gpu] [--amd]"
    exit 1
fi

for arg in "${@:2}"; do
    case "${arg}" in
        --gpu) TEST_GPU=true ;;
        --amd) TEST_AMD=true ;;
    esac
done

# Color output for readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Helper functions
test_start() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "TEST: $1"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    TESTS_RUN=$((TESTS_RUN + 1))
}

test_pass() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    TESTS_PASSED=$((TESTS_PASSED + 1))
}

test_fail() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    TESTS_FAILED=$((TESTS_FAILED + 1))
}

test_skip() {
    echo -e "${YELLOW}⊘ SKIP${NC}: $1"
}

# Print test header
echo "╔════════════════════════════════════════════════════════════╗"
echo "║         amech Docker Image Test Suite                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Image:    ${IMAGE_TAG}"
echo "GPU Test (CUDA):  ${TEST_GPU}"
echo "GPU Test (AMD):   ${TEST_AMD}"
echo ""

#################### Level 2: Post-Build Tests ####################

# Test 1: Container starts
test_start "Container starts successfully"
if docker run --rm "${IMAGE_TAG}" echo "Container started" > /dev/null 2>&1; then
    test_pass "Container starts and runs commands"
else
    test_fail "Container failed to start"
    exit 1
fi

# Test 2: User and home directory exist
test_start "User setup verification"
USER_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    if id amech_docker &>/dev/null && [ -d /home/amech_docker ]; then
        echo 'OK'
    else
        echo 'FAIL'
    fi
" | tail -1)
if [[ "${USER_CHECK}" == "OK" ]]; then
    test_pass "User 'amech_docker' exists with home directory"
else
    test_fail "User setup is incorrect"
fi

# Test 3: Python virtual environment
test_start "Python virtual environment setup"
VENV_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    if [ -f /home/amech_docker/amech/venv/bin/activate ]; then
        source /home/amech_docker/amech/venv/bin/activate
        python3 --version && echo 'OK'
    else
        echo 'FAIL'
    fi
" 2>&1 | tail -1)
if [[ "${VENV_CHECK}" == "OK" ]]; then
    test_pass "Python virtual environment is configured"
else
    test_fail "Python virtual environment is missing or broken"
fi

# Test 4: Python packages (spackx, amech)
test_start "Python packages installation"
PYTHON_PKG_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    source /home/amech_docker/amech/venv/bin/activate
    python3 -c 'import spackx; import amech' 2>/dev/null && echo 'OK' || echo 'FAIL'
" | tail -1)
if [[ "${PYTHON_PKG_CHECK}" == "OK" ]]; then
    test_pass "Python packages (spackx, amech) are importable"
else
    test_fail "Python packages failed to import"
fi

# Test 5: Spack installation
test_start "Spack installation and environment"
SPACK_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    source /home/amech_docker/amech/venv/bin/activate
    spack --version > /dev/null 2>&1 && echo 'OK' || echo 'FAIL'
" | tail -1)
if [[ "${SPACK_CHECK}" == "OK" ]]; then
    test_pass "Spack is installed and accessible"
else
    test_fail "Spack is not properly installed"
fi

# Test 6: Spack environment 'amech' exists
test_start "Spack environment 'amech'"
SPACK_ENV_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    source /home/amech_docker/amech/venv/bin/activate
    spack env list | grep -q amech && echo 'OK' || echo 'FAIL'
" | tail -1)
if [[ "${SPACK_ENV_CHECK}" == "OK" ]]; then
    test_pass "Spack environment 'amech' exists"
else
    test_fail "Spack environment 'amech' not found"
fi

# Test 7: Core dependencies installed
test_start "Core dependencies (Trilinos, Kokkos, Eigen)"
DEPS_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    source /home/amech_docker/amech/venv/bin/activate
    spack -e amech find trilinos kokkos eigen 2>&1 | grep -q 'trilinos' &&
    spack -e amech find kokkos 2>&1 | grep -q 'kokkos' &&
    spack -e amech find eigen 2>&1 | grep -q 'eigen' && echo 'OK' || echo 'FAIL'
" | tail -1)
if [[ "${DEPS_CHECK}" == "OK" ]]; then
    test_pass "Core dependencies (Trilinos, Kokkos, Eigen) are installed"
else
    test_fail "Core dependencies are missing"
fi

# Test 8: System tools availability
test_start "System tools (git, cmake, compilers)"
TOOLS_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    (which git && which cmake && which gcc && which gfortran) > /dev/null 2>&1 && echo 'OK' || echo 'FAIL'
" | tail -1)
if [[ "${TOOLS_CHECK}" == "OK" ]]; then
    test_pass "System tools (git, cmake, gcc, gfortran) are available"
else
    test_fail "System tools are missing"
fi

# Test 9: AppImage tools
test_start "AppImage tools (appimagetool, linuxdeploy)"
APPIMAGE_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
    [ -x /opt/appimage-tools/appimagetool ] && [ -x /opt/appimage-tools/linuxdeploy ] && echo 'OK' || echo 'FAIL'
" | tail -1)
if [[ "${APPIMAGE_CHECK}" == "OK" ]]; then
    test_pass "AppImage tools are installed"
else
    test_fail "AppImage tools are missing"
fi

#################### Level 3: GPU-Specific Tests ####################

if [[ "${TEST_GPU}" == "true" ]]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "GPU-SPECIFIC TESTS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    # Test 10: CUDA toolkit
    test_start "CUDA toolkit (nvcc)"
    CUDA_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
        nvcc --version > /dev/null 2>&1 && echo 'OK' || echo 'FAIL'
    " | tail -1)
    if [[ "${CUDA_CHECK}" == "OK" ]]; then
        test_pass "CUDA toolkit (nvcc) is installed"
    else
        test_fail "CUDA toolkit is missing"
    fi

    # Test 11: CUDA libraries
    test_start "CUDA libraries"
    CUDA_LIB_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
        [ -d /usr/local/cuda/lib64 ] && [ -f /usr/local/cuda/lib64/libcudart.so ] && echo 'OK' || echo 'FAIL'
    " | tail -1)
    if [[ "${CUDA_LIB_CHECK}" == "OK" ]]; then
        test_pass "CUDA libraries are present"
    else
        test_fail "CUDA libraries are missing"
    fi

    # Test 12: nvidia-smi (requires GPU runtime)
    test_start "nvidia-smi utility"
    if command -v nvidia-smi &> /dev/null; then
        if docker run --rm --gpus all "${IMAGE_TAG}" nvidia-smi > /dev/null 2>&1; then
            test_pass "nvidia-smi works with GPU access"
        else
            test_skip "nvidia-smi failed (GPU may not be available on this host)"
        fi
    else
        test_skip "nvidia-smi not available on host (skipping GPU runtime test)"
    fi

    # Test 13: Spack CUDA configuration
    test_start "Spack CUDA external package"
    SPACK_CUDA_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
        source /home/amech_docker/amech/venv/bin/activate
        spack external find cuda 2>&1 | grep -q 'cuda' && echo 'OK' || echo 'FAIL'
    " | tail -1)
    if [[ "${SPACK_CUDA_CHECK}" == "OK" ]]; then
        test_pass "Spack recognizes external CUDA installation"
    else
        test_fail "Spack CUDA configuration is incorrect"
    fi
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "CUDA GPU tests skipped (use --gpu flag to enable)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

#################### Level 3: AMD ROCm GPU-Specific Tests ####################

if [[ "${TEST_AMD}" == "true" ]]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "AMD ROCm GPU-SPECIFIC TESTS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    # Test 10: hipcc compiler
    test_start "ROCm HIP compiler (hipcc)"
    HIP_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
        hipcc --version > /dev/null 2>&1 && echo 'OK' || echo 'FAIL'
    " | tail -1)
    if [[ "${HIP_CHECK}" == "OK" ]]; then
        test_pass "ROCm HIP compiler (hipcc) is installed"
    else
        test_fail "ROCm HIP compiler (hipcc) is missing"
    fi

    # Test 11: ROCm libraries
    test_start "ROCm libraries"
    ROCM_LIB_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
        [ -f /opt/rocm/lib/libamdhip64.so ] &&
        [ -d /opt/rocm/include/hip ] && echo 'OK' || echo 'FAIL'
    " | tail -1)
    if [[ "${ROCM_LIB_CHECK}" == "OK" ]]; then
        test_pass "ROCm libraries are present"
    else
        test_fail "ROCm libraries are missing"
    fi

    # Test 12: rocm-smi utility (requires GPU device access)
    test_start "rocm-smi utility"
    if [ -e /dev/kfd ]; then
        if docker run --rm --device /dev/kfd --device /dev/dri "${IMAGE_TAG}" \
            bash -c "rocm-smi > /dev/null 2>&1 && echo 'OK' || echo 'FAIL'" | grep -q "OK"; then
            test_pass "rocm-smi works with GPU device access"
        else
            test_skip "rocm-smi failed (GPU may not be accessible inside container)"
        fi
    else
        test_skip "/dev/kfd not found on host (skipping GPU runtime test)"
    fi

    # Test 13: Spack ROCm external configuration
    test_start "Spack ROCm external packages"
    SPACK_ROCM_CHECK=$(docker run --rm "${IMAGE_TAG}" bash -c "
        source /home/amech_docker/amech/venv/bin/activate
        spack -e amech find kokkos 2>&1 | grep -q 'rocm' && echo 'OK' || echo 'FAIL'
    " | tail -1)
    if [[ "${SPACK_ROCM_CHECK}" == "OK" ]]; then
        test_pass "Spack Kokkos is configured with ROCm support"
    else
        test_fail "Spack Kokkos ROCm configuration is incorrect"
    fi
else
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "AMD ROCm GPU tests skipped (use --amd flag to enable)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

#################### Test Summary ####################

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    TEST SUMMARY                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Image:        ${IMAGE_TAG}"
echo "Tests run:    ${TESTS_RUN}"
echo -e "Tests passed: ${GREEN}${TESTS_PASSED}${NC}"
if [[ ${TESTS_FAILED} -gt 0 ]]; then
    echo -e "Tests failed: ${RED}${TESTS_FAILED}${NC}"
else
    echo "Tests failed: 0"
fi
echo ""

if [[ ${TESTS_FAILED} -eq 0 ]]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              ALL TESTS PASSED ✓                            ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║              SOME TESTS FAILED ✗                           ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════════╝${NC}"
    exit 1
fi
