#!/usr/bin/env bash
#
# Enhanced build script for amech Docker images
# - Builds Docker images (with or without GPU support)
# - Validates that no amech-pro source code is in the image
# - Optionally pushes to GitHub Container Registry (GHCR)
#
# Usage:
#   ./build_and_push_images.sh [OPTIONS]
#
# Examples:
#   ./build_and_push_images.sh                              # Build Ubuntu 24.04 CPU image locally
#   ./build_and_push_images.sh --gpu                        # Build Ubuntu 24.04 GPU image locally
#   ./build_and_push_images.sh --distro ubuntu22.04         # Build Ubuntu 22.04 CPU image
#   ./build_and_push_images.sh --distro rocky9 --gpu        # Build Rocky 9 GPU image
#   ./build_and_push_images.sh --push                       # Build and push Ubuntu 24.04 CPU image to GHCR
#   ./build_and_push_images.sh --distro rocky10 --gpu --push # Build and push Rocky 10 GPU image to GHCR
#

set -e # Exit on error

# Ensure Docker is in PATH (macOS with Docker Desktop)
export PATH="/usr/local/bin:$PATH"

#################### Configuration ####################
# Default values
WITH_PRO=false
USE_CACHE=true
USE_GPU=false
USE_AMD=false
SRC_BRANCH="main"
SPACK_BRANCH="releases/v1.1"
PLATFORM="amd64"
DISTRO="ubuntu24.04" # Default to ubuntu24.04 (was "ubuntu")
USE_AZURE_MIRROR=false
PUSH_TO_GHCR=false
GHCR_REGISTRY="ghcr.io/aperijake"
DRY_RUN=false
CUDA_VERSION="12.6"                                 # Default CUDA version for tagging
CUDA_ARCH=""                                        # CUDA compute capability (e.g., 75, 80, 90) - empty means use default (75)
CUDA_ARCH_EXPLICIT=false                            # Track if user explicitly set CUDA_ARCH
ROCM_VERSION="7.1"                                  # Default ROCm version for tagging
AMD_ARCH=""                                         # AMD GPU architecture (e.g., gfx942) - empty means use default (gfx942)
AMD_ARCH_EXPLICIT=false                             # Track if user explicitly set AMD_ARCH
SKIP_TESTS=false                                    # Skip automated testing (not recommended)
USE_REGISTRY_CACHE=true                             # Use GHCR registry cache (always on unless --no-cache)
CACHE_REGISTRY="ghcr.io/aperijake/aperi-mech-cache" # Registry for build cache
TAG_GIT_SHA=false                                   # Tag image with git SHA for version tracking

# Supported distro configurations
# Format: "distro_key|dockerfile_suffix|display_name"
declare -A DISTRO_CONFIG
DISTRO_CONFIG["ubuntu22.04"]="Ubuntu2204|ubuntu22.04"
DISTRO_CONFIG["ubuntu24.04"]="Ubuntu2404|ubuntu24.04"
DISTRO_CONFIG["rocky9"]="RockyLinux9|rocky9"
DISTRO_CONFIG["rocky10"]="RockyLinux10|rocky10"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
    --pro)
        WITH_PRO=true
        shift
        ;;
    --no-cache)
        USE_CACHE=false
        USE_REGISTRY_CACHE=false
        shift
        ;;
    --gpu)
        USE_GPU=true
        shift
        ;;
    --amd)
        USE_AMD=true
        shift
        ;;
    --branch)
        SRC_BRANCH="$2"
        shift 2
        ;;
    --spack-branch)
        SPACK_BRANCH="$2"
        shift 2
        ;;
    --platform)
        PLATFORM="$2"
        shift 2
        ;;
    --distro)
        DISTRO="$2"
        shift 2
        ;;
    --azure-mirror)
        USE_AZURE_MIRROR=true
        shift
        ;;
    --cuda-arch)
        CUDA_ARCH="$2"
        CUDA_ARCH_EXPLICIT=true
        shift 2
        ;;
    --amd-arch)
        AMD_ARCH="$2"
        AMD_ARCH_EXPLICIT=true
        shift 2
        ;;
    --rocm-version)
        ROCM_VERSION="$2"
        shift 2
        ;;
    --push)
        PUSH_TO_GHCR=true
        shift
        ;;
    --registry)
        GHCR_REGISTRY="$2"
        shift 2
        ;;
    --dry-run)
        DRY_RUN=true
        shift
        ;;
    --skip-tests)
        SKIP_TESTS=true
        shift
        ;;
    --tag-git-sha)
        TAG_GIT_SHA=true
        shift
        ;;
    --help | -h)
        echo "Usage: build_and_push_images.sh [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --pro                 Enable pro support (NOT RECOMMENDED FOR PUSH)"
        echo "  --no-cache            Disable all caching (local + registry) for clean build"
        echo "  --gpu                 Build GPU-enabled image with NVIDIA CUDA support"
        echo "  --cuda-arch ARCH      CUDA compute capability (e.g., 75, 80, 90)"
        echo "                        Adds -smXX suffix to image tag when specified"
        echo "                        Default: 75 (T4/RTX 2080) if not specified"
        echo "  --amd                 Build GPU-enabled image with AMD ROCm/HIP support"
        echo "  --amd-arch ARCH       AMD GPU architecture target (e.g., gfx942, gfx90a, gfx1100)"
        echo "                        Adds -gfxXXX suffix to image tag when specified"
        echo "                        Default: gfx942 (MI300X) if not specified"
        echo "  --rocm-version VER    ROCm version to install (default: 7.1)"
        echo "  --branch BRANCH       Specify the source branch (default: main)"
        echo "  --spack-branch BRANCH Specify the Spack branch/tag (default: releases/v1.1)"
        echo "  --platform PLATFORM   Specify the platform (default: amd64)"
        echo "  --distro DISTRO       Specify the distribution (default: ubuntu24.04)"
        echo "                        Supported: ubuntu22.04, ubuntu24.04, rocky9, rocky10"
        echo "                        Note: AMD ROCm images are only supported on ubuntu24.04"
        echo "  --azure-mirror        Use Azure mirror for apt sources (Ubuntu only)"
        echo "  --push                Push image to GHCR after successful build and validation"
        echo "  --registry REGISTRY   Specify the registry (default: ghcr.io/aperijake)"
        echo "  --dry-run             Show what would be pushed without actually pushing"
        echo "  --skip-tests          Skip automated testing (not recommended)"
        echo "  --tag-git-sha         Create additional image tag with git SHA for version tracking"
        echo "                        Example: ubuntu24.04-a1b2c3d (frozen snapshot)"
        echo "                        Useful for bisecting and quarterly releases"
        echo "  --help, -h            Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./build_and_push_images.sh                              # Build Ubuntu 24.04 CPU image"
        echo "  ./build_and_push_images.sh --gpu                        # Build Ubuntu 24.04 CUDA GPU (default sm75)"
        echo "  ./build_and_push_images.sh --gpu --cuda-arch 90         # Build for H100 (sm90)"
        echo "  ./build_and_push_images.sh --amd                        # Build Ubuntu 24.04 ROCm image (default gfx942)"
        echo "  ./build_and_push_images.sh --amd --amd-arch gfx90a      # Build for MI200 (gfx90a)"
        echo "  ./build_and_push_images.sh --distro ubuntu22.04         # Build Ubuntu 22.04 CPU image"
        echo "  ./build_and_push_images.sh --distro rocky9 --gpu        # Build Rocky 9 GPU image"
        echo "  ./build_and_push_images.sh --push                       # Build and push Ubuntu 24.04 CPU"
        echo "  ./build_and_push_images.sh --gpu --cuda-arch 80 --push  # Build and push A100 image"
        echo "  ./build_and_push_images.sh --amd --push                 # Build and push ROCm MI300X image"
        echo "  ./build_and_push_images.sh --push --tag-git-sha         # Create frozen snapshot with git SHA"
        echo ""
        echo "Image Tags (following standard conventions):"
        echo "  CPU:        aperi-mech:<distro>                   (e.g., aperi-mech:ubuntu24.04)"
        echo "  CUDA GPU:   aperi-mech:<distro>-cuda12.6          (e.g., aperi-mech:rocky9-cuda12.6)"
        echo "  CUDA+arch:  aperi-mech:<distro>-cuda12.6-sm80     (e.g., aperi-mech:ubuntu24.04-cuda12.6-sm90)"
        echo "  ROCm GPU:   aperi-mech:<distro>-rocm7.1           (e.g., aperi-mech:ubuntu24.04-rocm7.1)"
        echo "  ROCm+arch:  aperi-mech:<distro>-rocm7.1-gfx942   (e.g., aperi-mech:ubuntu24.04-rocm7.1-gfx942)"
        echo "  Use combine_multiarch_images.sh --tag-latest to create 'latest' tag"
        echo ""
        echo "Build Cache:"
        echo "  Registry caching is enabled by default, storing cache layers at"
        echo "  ghcr.io/aperijake/aperi-mech-cache to minimize local storage usage."
        echo "  This is FREE for public repositories and dramatically speeds up rebuilds."
        echo "  Use --no-cache to disable all caching for a completely clean build."
        echo ""
        echo "Git Version Tracking:"
        echo "  Git metadata is always embedded in image labels (org.opencontainers.image.*)."
        echo "  Use --tag-git-sha to create an additional frozen snapshot tag with the git SHA:"
        echo "    - Rolling tag: ubuntu24.04 (always updated)"
        echo "    - Frozen tag:  ubuntu24.04-a1b2c3d (specific commit, never changes)"
        echo "  Useful for quarterly releases, bisecting issues, and version tracking."
        echo ""
        echo "Security Note:"
        echo "  Images built with --pro contain closed-source code and should NOT be pushed"
        echo "  to public registries. The script will warn and require confirmation."
        exit 0
        ;;
    *)
        shift
        ;;
    esac
done

#################### Validate Configuration ####################
# Validate distro selection
if [[ -z ${DISTRO_CONFIG[$DISTRO]} ]]; then
    echo "Error: Invalid distro '${DISTRO}'"
    echo "Supported distros: ${!DISTRO_CONFIG[@]}"
    exit 1
fi

# Validate that --gpu and --amd are not used simultaneously
if "${USE_GPU}" && "${USE_AMD}"; then
    echo "❌ Error: Cannot use --gpu (CUDA) and --amd (ROCm) simultaneously"
    echo "Please choose one GPU backend."
    exit 1
fi

# AMD ROCm images are only supported on Ubuntu 24.04
if "${USE_AMD}" && [[ ${DISTRO} != "ubuntu24.04" ]]; then
    echo "❌ Error: AMD ROCm images are only supported on Ubuntu 24.04"
    echo "Current distro: ${DISTRO}"
    echo "Use: --distro ubuntu24.04 --amd"
    exit 1
fi

# Parse distro configuration
IFS='|' read -r DOCKERFILE_SUFFIX DISTRO_TAG <<<"${DISTRO_CONFIG[$DISTRO]}"

# Normalize platform to include linux/ prefix if not present
if [[ ! ${PLATFORM} =~ ^linux/ ]]; then
    PLATFORM="linux/${PLATFORM}"
fi

# Check for unsupported ARM64 + older distro combinations
if [[ ${PLATFORM} == "linux/arm64" ]]; then
    if [[ ${DISTRO} == "ubuntu22.04" ]] || [[ ${DISTRO} == "rocky9" ]]; then
        echo "❌ Error: ARM64 builds are not supported for ${DISTRO}"
        echo ""
        echo "Reason: PyQt6 lacks ARM64 wheels for older distros and requires Qt6 development"
        echo "        packages that significantly increase image size and build complexity."
        echo ""
        echo "Supported alternatives:"
        echo "  • Use Ubuntu 24.04 or Rocky 10 for ARM64 builds"
        echo "  • Use AMD64 (linux/amd64) for ${DISTRO} builds"
        echo ""
        echo "Supported ARM64 distros: ubuntu24.04, rocky10"
        echo "Supported AMD64 distros: ubuntu22.04, ubuntu24.04, rocky9, rocky10"
        exit 1
    fi
fi

# Registry cache export requires a buildx builder with docker-container driver
if "${USE_REGISTRY_CACHE}"; then
    BUILDER_NAME="multiarch-builder"
    if ! docker buildx inspect "${BUILDER_NAME}" >/dev/null 2>&1; then
        echo ""
        echo "Creating buildx builder (required for registry cache)..."
        echo "Builder name: ${BUILDER_NAME}"
        docker buildx create --name "${BUILDER_NAME}" --driver docker-container --bootstrap --use
        echo "✅ Builder created successfully"
    else
        echo "Using existing buildx builder: ${BUILDER_NAME}"
        docker buildx use "${BUILDER_NAME}"
    fi
    echo ""
fi

#################### Configure Build ####################
# Always enable BuildKit and SSH for private repo access
export DOCKER_BUILDKIT=1

# Check if SSH agent is running
if [[ -z ${SSH_AUTH_SOCK} ]]; then
    echo "ERROR: SSH agent not running. Private repository access requires SSH."
    echo "To set up:"
    # trunk-ignore(shellcheck/SC2016)
    echo '  1. Start the SSH agent: eval $(ssh-agent -s)'
    echo "  2. Add your SSH key: ssh-add ~/.ssh/id_rsa (or your key file)"
    echo "  3. Ensure SSH_AUTH_SOCK is set."
    exit 1
fi

SSH_FLAG="--ssh default"

# PRO is a separate concern for submodules
if "${WITH_PRO}"; then
    PRO_ARG="--build-arg PRO=1"
else
    PRO_ARG=""
fi

if "${USE_CACHE}"; then
    CACHE_FLAG=""
else
    CACHE_FLAG="--no-cache"
fi

# Determine Dockerfile and tags based on distro and GPU settings
if "${USE_GPU}"; then
    # NVIDIA CUDA build
    DOCKERFILE="Dockerfile_AMech_${DOCKERFILE_SUFFIX}_Nvidia"

    # Set default CUDA_ARCH if not specified
    if [[ -z ${CUDA_ARCH} ]]; then
        CUDA_ARCH="75" # Default to sm_75 (T4/RTX 2080 - most common)
    fi

    # Build image tag - add -smXX suffix only if explicitly specified
    if [[ ${CUDA_ARCH_EXPLICIT} == "true" ]]; then
        IMAGE_TAG="aperi-mech:${DISTRO_TAG}-cuda${CUDA_VERSION}-sm${CUDA_ARCH}"
        GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-cuda${CUDA_VERSION}-sm${CUDA_ARCH}"
    else
        IMAGE_TAG="aperi-mech:${DISTRO_TAG}-cuda${CUDA_VERSION}"
        GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-cuda${CUDA_VERSION}"
    fi
elif "${USE_AMD}"; then
    # AMD ROCm build (Ubuntu 24.04 only)
    DOCKERFILE="Dockerfile_AMech_Ubuntu2404_AMD"

    # Set default AMD_ARCH if not specified
    if [[ -z ${AMD_ARCH} ]]; then
        AMD_ARCH="gfx942" # Default to gfx942 (MI300X)
    fi

    # Build image tag - add -gfxXXX suffix only if explicitly specified
    if [[ ${AMD_ARCH_EXPLICIT} == "true" ]]; then
        IMAGE_TAG="aperi-mech:${DISTRO_TAG}-rocm${ROCM_VERSION}-${AMD_ARCH}"
        GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-rocm${ROCM_VERSION}-${AMD_ARCH}"
    else
        IMAGE_TAG="aperi-mech:${DISTRO_TAG}-rocm${ROCM_VERSION}"
        GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-rocm${ROCM_VERSION}"
    fi
else
    # CPU build
    DOCKERFILE="Dockerfile_AMech_${DOCKERFILE_SUFFIX}"
    IMAGE_TAG="aperi-mech:${DISTRO_TAG}"
    GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}"
fi

# Add architecture suffix when pushing
# This prevents overwriting when building same distro on different architectures
if "${PUSH_TO_GHCR}"; then
    ARCH_SUFFIX=$(echo "${PLATFORM}" | sed 's/linux\///')
    IMAGE_TAG="${IMAGE_TAG}-${ARCH_SUFFIX}"
    GHCR_TAG="${GHCR_TAG}-${ARCH_SUFFIX}"
fi

# Build cache reference (includes architecture to prevent conflicts)
# Extract architecture from PLATFORM (handles both "amd64" and "linux/amd64" formats)
CACHE_ARCH=$(echo "${PLATFORM}" | sed 's/linux\///')
CACHE_ARCH_SUFFIX="-${CACHE_ARCH}"

if "${USE_GPU}"; then
    if [[ ${CUDA_ARCH_EXPLICIT} == "true" ]]; then
        CACHE_REF="${CACHE_REGISTRY}:${DISTRO_TAG}-cuda${CUDA_VERSION}-sm${CUDA_ARCH}${CACHE_ARCH_SUFFIX}"
    else
        CACHE_REF="${CACHE_REGISTRY}:${DISTRO_TAG}-cuda${CUDA_VERSION}${CACHE_ARCH_SUFFIX}"
    fi
elif "${USE_AMD}"; then
    if [[ ${AMD_ARCH_EXPLICIT} == "true" ]]; then
        CACHE_REF="${CACHE_REGISTRY}:${DISTRO_TAG}-rocm${ROCM_VERSION}-${AMD_ARCH}${CACHE_ARCH_SUFFIX}"
    else
        CACHE_REF="${CACHE_REGISTRY}:${DISTRO_TAG}-rocm${ROCM_VERSION}${CACHE_ARCH_SUFFIX}"
    fi
else
    CACHE_REF="${CACHE_REGISTRY}:${DISTRO_TAG}${CACHE_ARCH_SUFFIX}"
fi

# Verify Dockerfile exists
if [[ ! -f ${DOCKERFILE} ]]; then
    echo "Error: Dockerfile not found: ${DOCKERFILE}"
    echo "Expected location: $(pwd)/${DOCKERFILE}"
    exit 1
fi

# Get git metadata for image labels
GIT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
GIT_SHA_FULL=$(git rev-parse HEAD 2>/dev/null || echo "unknown")
BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
GIT_REPO_URL="https://github.com/aperijake/amech"

BUILD_ARGS=(--build-arg SRC_BRANCH="${SRC_BRANCH}" --build-arg SPACK_BRANCH="${SPACK_BRANCH}")

if "${USE_AZURE_MIRROR}"; then
    BUILD_ARGS+=(--build-arg USE_AZURE_MIRROR=true)
fi

# Add CUDA_ARCH build arg for CUDA GPU builds
if "${USE_GPU}" && [[ -n ${CUDA_ARCH} ]]; then
    BUILD_ARGS+=(--build-arg CUDA_ARCH="${CUDA_ARCH}")
fi

# Add AMD_ARCH and ROCM_VERSION build args for AMD builds
if "${USE_AMD}"; then
    BUILD_ARGS+=(--build-arg AMD_ARCH="${AMD_ARCH}")
    BUILD_ARGS+=(--build-arg ROCM_VERSION="${ROCM_VERSION}")
fi

LOG_FILE="build_log_$(date +%Y%m%d_%H%M%S).log"

echo "============================================"
echo "Building Docker Image"
echo "============================================"
echo "Dockerfile: ${DOCKERFILE}"
echo "Local tag:  ${IMAGE_TAG}"
echo "GHCR tag:   ${GHCR_TAG}"
echo "Spack:      ${SPACK_BRANCH}"
echo "Pro:        ${WITH_PRO}"
echo "GPU (CUDA): ${USE_GPU}"
if "${USE_GPU}"; then
    echo "CUDA arch:  sm_${CUDA_ARCH}"
fi
echo "GPU (AMD):  ${USE_AMD}"
if "${USE_AMD}"; then
    echo "AMD arch:   ${AMD_ARCH}"
    echo "ROCm ver:   ${ROCM_VERSION}"
fi
echo "Push:       ${PUSH_TO_GHCR}"
echo "Dry run:    ${DRY_RUN}"
if "${USE_REGISTRY_CACHE}"; then
    echo "Cache:      ${CACHE_REF}"
else
    echo "Cache:      disabled (--no-cache)"
fi
echo "Log file:   ${LOG_FILE}"
echo "============================================"
echo ""

# Build the image
cmd=(
    docker buildx build
    ${SSH_FLAG:+${SSH_FLAG}}
    ${CACHE_FLAG:+${CACHE_FLAG}}
    ${PRO_ARG:+${PRO_ARG}}
    "${BUILD_ARGS[@]}"
)

# Add registry cache flags if enabled
if "${USE_REGISTRY_CACHE}"; then
    cmd+=(
        --cache-from "type=registry,ref=${CACHE_REF}"
        --cache-to "type=registry,ref=${CACHE_REF},mode=max"
    )
fi

# Add OCI labels for metadata (always included)
cmd+=(
    --label "org.opencontainers.image.created=${BUILD_DATE}"
    --label "org.opencontainers.image.revision=${GIT_SHA_FULL}"
    --label "org.opencontainers.image.source=${GIT_REPO_URL}"
    --label "org.opencontainers.image.version=${GIT_SHA}"
)

cmd+=(
    --platform "${PLATFORM}"
    --load
    -t "${IMAGE_TAG}"
    -f "${DOCKERFILE}"
    .
    --progress=plain
)

printf '%q ' "${cmd[@]}"
echo "| tee ${LOG_FILE}"
echo ""

if "${DRY_RUN}"; then
    echo "============================================"
    echo "DRY RUN: Build command shown above"
    echo "============================================"
    echo ""
    echo "Skipping actual build. Remove --dry-run to execute."
    echo ""
    echo "Image would be tagged as: ${IMAGE_TAG}"
    if "${PUSH_TO_GHCR}"; then
        echo "Image would be pushed as: ${GHCR_TAG}"
        if "${TAG_GIT_SHA}"; then
            echo "Git SHA tag would be: ${GHCR_TAG_SHA}"
        fi
    fi
    echo ""
    exit 0
fi

# Run build and capture exit code (tee can mask failures)
"${cmd[@]}" 2>&1 | tee "${LOG_FILE}"
BUILD_EXIT_CODE=${PIPESTATUS[0]}

echo ""
if [[ ${BUILD_EXIT_CODE} -ne 0 ]]; then
    echo "============================================"
    echo "❌ Build FAILED with exit code ${BUILD_EXIT_CODE}"
    echo "============================================"
    echo ""
    echo "Check the build log for details: ${LOG_FILE}"
    exit "${BUILD_EXIT_CODE}"
fi

echo "============================================"
echo "✅ Build completed successfully!"
echo "============================================"
echo ""

# Run automated tests (Level 2-3)
# Note: Level 1 smoke tests already ran during build
if ! "${SKIP_TESTS}"; then
    echo "============================================"
    echo "Running Automated Tests (Level 2-3)"
    echo "============================================"
    echo ""

    # Determine test flags
    TEST_FLAGS=()
    if "${USE_GPU}"; then
        TEST_FLAGS+=(--gpu)
    fi
    if "${USE_AMD}"; then
        TEST_FLAGS+=(--amd)
    fi

    # Check if test script exists
    TEST_SCRIPT="./test_image.sh"
    if [[ ! -f ${TEST_SCRIPT} ]]; then
        echo "⚠️  WARNING: Test script not found: ${TEST_SCRIPT}"
        echo "⚠️  Skipping automated tests."
        echo ""
    else
        # Make test script executable
        chmod +x "${TEST_SCRIPT}"

        # Run tests
        echo "Running: ${TEST_SCRIPT} ${IMAGE_TAG} ${TEST_FLAGS[*]}"
        echo ""

        if "${TEST_SCRIPT}" "${IMAGE_TAG}" "${TEST_FLAGS[@]}"; then
            echo ""
            echo "============================================"
            echo "✅ All tests passed!"
            echo "============================================"
            echo ""
        else
            TEST_EXIT_CODE=$?
            echo ""
            echo "============================================"
            echo "❌ Tests FAILED with exit code ${TEST_EXIT_CODE}"
            echo "============================================"
            echo ""
            echo "The image was built but failed automated testing."
            echo "Please review the test output above to diagnose the issue."
            echo ""
            echo "Options:"
            echo "  1. Fix the issue and rebuild"
            echo "  2. Use --skip-tests to bypass testing (not recommended)"
            echo ""
            exit "${TEST_EXIT_CODE}"
        fi
    fi
elif "${SKIP_TESTS}"; then
    echo "============================================"
    echo "⚠️  Skipping Automated Tests"
    echo "============================================"
    echo ""
    echo "Tests were skipped via --skip-tests flag."
    echo "This is NOT recommended, especially before pushing to GHCR."
    echo ""
fi

# Security validation before push
if "${PUSH_TO_GHCR}"; then
    echo "============================================"
    echo "Validating Image for Push"
    echo "============================================"

    # Check if prois enabled
    if "${WITH_PRO}"; then
        echo ""
        echo "⚠️  WARNING: This image was built with PRO=1"
        echo "⚠️  It may contain closed-source amech-pro code."
        echo "⚠️  Pushing to a public registry could expose proprietary code!"
        echo ""
        read -r -p "Are you SURE you want to push this image? (type 'yes' to confirm): " confirm
        if [[ ${confirm} != "yes" ]]; then
            echo "Push cancelled."
            exit 0
        fi
    fi

    # Check for amech-pro source code in the image
    echo ""
    echo "Checking for amech-pro source code in image..."

    # Look for amech-pro source files
    if docker run --rm "${IMAGE_TAG}" bash -c "test -d /home/amech_docker/amech/amech-pro/src" 2>/dev/null; then
        echo ""
        echo "❌ ERROR: Found amech-pro source directory in image!"
        echo "❌ This image contains closed-source code and should NOT be pushed."
        echo ""
        echo "To fix this:"
        echo "  1. Rebuild with --pro flag removed (default)"
        echo "  2. Or use a multi-stage Dockerfile that excludes source code"
        echo ""
        exit 1
    fi

    # Check for any .cpp or .h files in amech-pro (count files, not output text)
    # Use wc -l to count files, avoiding false positives from stderr messages
    pro_source_count=$(docker run --rm "${IMAGE_TAG}" bash -c "find /home/amech_docker/amech/amech-pro -type f \( -name '*.cpp' -o -name '*.h' \) 2>/dev/null | wc -l" || echo "0")
    pro_source_count=$(echo "${pro_source_count}" | tr -d '[:space:]') # Remove whitespace

    if [[ ${pro_source_count} -gt 0 ]]; then
        # Found files, list them for debugging
        pro_files=$(docker run --rm "${IMAGE_TAG}" bash -c "find /home/amech_docker/amech/amech-pro -type f \( -name '*.cpp' -o -name '*.h' \) 2>/dev/null | head -10")
        echo ""
        echo "❌ ERROR: Found ${pro_source_count} amech-pro source files in image:"
        echo "${pro_files}"
        echo ""
        echo "This image contains closed-source code and should NOT be pushed."
        exit 1
    fi

    echo "✅ No amech-pro source code detected in image"

    # Tag for GHCR
    echo "============================================"
    echo "Tagging Image for GHCR"
    echo "============================================"
    echo "Tagging ${IMAGE_TAG} as ${GHCR_TAG}"
    docker tag "${IMAGE_TAG}" "${GHCR_TAG}"
    echo "✅ Tagged successfully"
    echo ""

    # Push to GHCR
    if "${DRY_RUN}"; then
        echo "============================================"
        echo "DRY RUN: Would push to GHCR"
        echo "============================================"
        echo "Would execute: docker push ${GHCR_TAG}"
        echo ""
        echo "Image details:"
        docker images "${GHCR_TAG}"
    else
        echo "============================================"
        echo "Pushing to GHCR"
        echo "============================================"

        # Check if logged in to GHCR
        if ! docker info 2>/dev/null | grep -q "ghcr.io"; then
            echo "⚠️  Not logged in to GHCR. Attempting login..."
            echo "If this fails, run: docker login ghcr.io -u <username>"
            echo ""
        fi

        echo "Pushing ${GHCR_TAG}..."
        docker push "${GHCR_TAG}"

        # Create and push git SHA tag if requested
        if "${TAG_GIT_SHA}"; then
            echo ""
            echo "============================================"
            echo "Creating Git SHA Tag"
            echo "============================================"

            # Build git SHA tag name (append -<sha> to the image tag)
            # Include arch suffix in tag
            ARCH_SUFFIX_FOR_TAG="-${ARCH_SUFFIX}"

            if "${USE_GPU}"; then
                if [[ ${CUDA_ARCH_EXPLICIT} == "true" ]]; then
                    GIT_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-cuda${CUDA_VERSION}-sm${CUDA_ARCH}${ARCH_SUFFIX_FOR_TAG}-${GIT_SHA}"
                else
                    GIT_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-cuda${CUDA_VERSION}${ARCH_SUFFIX_FOR_TAG}-${GIT_SHA}"
                fi
            elif "${USE_AMD}"; then
                if [[ ${AMD_ARCH_EXPLICIT} == "true" ]]; then
                    GIT_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-rocm${ROCM_VERSION}-${AMD_ARCH}${ARCH_SUFFIX_FOR_TAG}-${GIT_SHA}"
                else
                    GIT_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}-rocm${ROCM_VERSION}${ARCH_SUFFIX_FOR_TAG}-${GIT_SHA}"
                fi
            else
                GIT_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${DISTRO_TAG}${ARCH_SUFFIX_FOR_TAG}-${GIT_SHA}"
            fi

            echo "Creating frozen snapshot: ${GIT_SHA_TAG}"
            docker tag "${IMAGE_TAG}" "${GIT_SHA_TAG}"

            echo "Pushing git SHA tag..."
            docker push "${GIT_SHA_TAG}"

            echo "✅ Git SHA tag created and pushed"
        fi

        echo ""
        echo "============================================"
        echo "✅ Push completed successfully!"
        echo "============================================"
        echo ""
        echo "Image available at:"
        echo "  ${GHCR_TAG}"
        echo ""
        echo "To pull this image:"
        echo "  docker pull ${GHCR_TAG}"
    fi
fi

echo ""
echo "============================================"
echo "Summary"
echo "============================================"
echo "Local image: ${IMAGE_TAG}"
if "${PUSH_TO_GHCR}"; then
    echo "GHCR image:  ${GHCR_TAG}"
    if "${TAG_GIT_SHA}"; then
        echo "Git SHA tag: ${GIT_SHA_TAG}"
        echo "Git commit:  ${GIT_SHA_FULL}"
    fi
fi
echo ""
echo "Build log saved to: ${LOG_FILE}"
echo ""
