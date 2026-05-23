#!/usr/bin/env bash
#
# Combine architecture-specific Docker images into multi-arch manifests
#
# This script takes separately-built amd64 and arm64 images and combines them
# into a single multi-architecture manifest that Docker can pull from any platform.
#
# Usage:
#   ./combine_multiarch_images.sh --distro ubuntu24.04
#   ./combine_multiarch_images.sh --distro rocky9 --gpu
#   ./combine_multiarch_images.sh --distro ubuntu24.04 --gpu --cuda-arch 90
#   ./combine_multiarch_images.sh --distro ubuntu24.04 --git-sha a1b2c3d
#

set -e

# Ensure Docker is in PATH (macOS with Docker Desktop)
export PATH="/usr/local/bin:$PATH"

#################### Configuration ####################

DISTRO="ubuntu24.04"
USE_GPU=false
GHCR_REGISTRY="ghcr.io/aperijake"
DRY_RUN=false
CUDA_VERSION="12.6"
CUDA_ARCH=""
CUDA_ARCH_EXPLICIT=false
GIT_SHA=""       # Optional: combine git SHA tagged images
TAG_LATEST=false # Also tag as 'latest'

# Supported distro configurations
declare -A DISTRO_CONFIG
DISTRO_CONFIG["ubuntu22.04"]="Ubuntu2204|ubuntu22.04"
DISTRO_CONFIG["ubuntu24.04"]="Ubuntu2404|ubuntu24.04"
DISTRO_CONFIG["rocky9"]="RockyLinux9|rocky9"
DISTRO_CONFIG["rocky10"]="RockyLinux10|rocky10"

#################### Parse Arguments ####################

while [[ $# -gt 0 ]]; do
    case "$1" in
    --distro)
        DISTRO="$2"
        shift 2
        ;;
    --gpu)
        USE_GPU=true
        shift
        ;;
    --cuda-arch)
        CUDA_ARCH="$2"
        CUDA_ARCH_EXPLICIT=true
        shift 2
        ;;
    --registry)
        GHCR_REGISTRY="$2"
        shift 2
        ;;
    --dry-run)
        DRY_RUN=true
        shift
        ;;
    --git-sha)
        GIT_SHA="$2"
        shift 2
        ;;
    --tag-latest)
        TAG_LATEST=true
        shift
        ;;
    --help | -h)
        echo "Usage: combine_multiarch_images.sh [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --distro DISTRO       Specify the distribution (default: ubuntu24.04)"
        echo "                        Supported: ubuntu22.04, ubuntu24.04, rocky9, rocky10"
        echo "  --gpu                 Combine GPU images (default: CPU images)"
        echo "  --cuda-arch ARCH      CUDA compute capability (75, 80, 90, etc.)"
        echo "  --registry REGISTRY   Specify the registry (default: ghcr.io/aperijake)"
        echo "  --git-sha SHA         Also combine git SHA tagged images (7-char SHA)"
        echo "  --tag-latest          Also tag the combined manifest as 'latest'"
        echo "  --dry-run             Show what would be combined without actually combining"
        echo "  --help, -h            Show this help message"
        echo ""
        echo "Examples:"
        echo "  # Combine CPU images"
        echo "  ./combine_multiarch_images.sh --distro ubuntu24.04"
        echo ""
        echo "  # Combine GPU images (default sm75)"
        echo "  ./combine_multiarch_images.sh --distro rocky9 --gpu"
        echo ""
        echo "  # Combine GPU images for specific architecture"
        echo "  ./combine_multiarch_images.sh --distro ubuntu24.04 --gpu --cuda-arch 90"
        echo ""
        echo "  # Combine git SHA tagged images"
        echo "  ./combine_multiarch_images.sh --distro ubuntu24.04 --git-sha a1b2c3d"
        echo ""
        echo "  # Combine and tag as 'latest' (recommended for ubuntu24.04 CPU)"
        echo "  ./combine_multiarch_images.sh --distro ubuntu24.04 --tag-latest"
        echo ""
        echo "  # Dry run to see what would be combined"
        echo "  ./combine_multiarch_images.sh --distro rocky10 --dry-run"
        echo ""
        exit 0
        ;;
    *)
        echo "Unknown option: $1"
        echo "Use --help for usage information"
        exit 1
        ;;
    esac
done

#################### Validation ####################

# Validate distro
if [[ -z ${DISTRO_CONFIG[$DISTRO]} ]]; then
    echo "Error: Invalid distro '${DISTRO}'"
    echo "Supported distros: ${!DISTRO_CONFIG[@]}"
    exit 1
fi

# Parse distro configuration
IFS='|' read -r DOCKERFILE_SUFFIX DISTRO_TAG <<<"${DISTRO_CONFIG[$DISTRO]}"

# Set default CUDA arch if GPU enabled but not explicitly set
if "${USE_GPU}" && [[ -z ${CUDA_ARCH} ]]; then
    CUDA_ARCH="75"
fi

#################### Build Image Tags ####################

# Base tag pattern (without architecture suffix)
if "${USE_GPU}"; then
    if [[ ${CUDA_ARCH_EXPLICIT} == "true" ]]; then
        BASE_TAG="${DISTRO_TAG}-cuda${CUDA_VERSION}-sm${CUDA_ARCH}"
    else
        BASE_TAG="${DISTRO_TAG}-cuda${CUDA_VERSION}"
    fi
else
    BASE_TAG="${DISTRO_TAG}"
fi

# Architecture-specific tags
AMD64_TAG="${GHCR_REGISTRY}/aperi-mech:${BASE_TAG}-amd64"
ARM64_TAG="${GHCR_REGISTRY}/aperi-mech:${BASE_TAG}-arm64"

# Multi-arch manifest tag (no arch suffix)
MULTIARCH_TAG="${GHCR_REGISTRY}/aperi-mech:${BASE_TAG}"

# Git SHA tags (if requested)
if [[ -n ${GIT_SHA} ]]; then
    AMD64_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${BASE_TAG}-amd64-${GIT_SHA}"
    ARM64_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${BASE_TAG}-arm64-${GIT_SHA}"
    MULTIARCH_SHA_TAG="${GHCR_REGISTRY}/aperi-mech:${BASE_TAG}-${GIT_SHA}"
fi

#################### Display Plan ####################

echo "============================================"
echo "Multi-Arch Image Combine"
echo "============================================"
echo "Distribution: ${DISTRO}"
echo "GPU:          ${USE_GPU}"
if "${USE_GPU}"; then
    echo "CUDA arch:    sm_${CUDA_ARCH}"
fi
echo "Dry run:      ${DRY_RUN}"
echo "Tag latest:   ${TAG_LATEST}"
echo ""
echo "Source Images:"
echo "  AMD64:  ${AMD64_TAG}"
echo "  ARM64:  ${ARM64_TAG}"
echo ""
echo "Target Manifest:"
echo "  ${MULTIARCH_TAG}"
if "${TAG_LATEST}"; then
    echo "  ${GHCR_REGISTRY}/aperi-mech:latest"
fi
if [[ -n ${GIT_SHA} ]]; then
    echo ""
    echo "Git SHA Tagged Images:"
    echo "  AMD64:  ${AMD64_SHA_TAG}"
    echo "  ARM64:  ${ARM64_SHA_TAG}"
    echo ""
    echo "Git SHA Manifest:"
    echo "  ${MULTIARCH_SHA_TAG}"
fi
echo "============================================"
echo ""

#################### Combine Images ####################

if "${DRY_RUN}"; then
    echo "DRY RUN: Would execute the following commands:"
    echo ""
    echo 'docker buildx imagetools create \'
    echo "  -t ${MULTIARCH_TAG} \\"
    if "${TAG_LATEST}"; then
        echo "  -t ${GHCR_REGISTRY}/aperi-mech:latest \\"
    fi
    echo "  ${AMD64_TAG} \\"
    echo "  ${ARM64_TAG}"

    if [[ -n ${GIT_SHA} ]]; then
        echo ""
        echo 'docker buildx imagetools create \'
        echo "  -t ${MULTIARCH_SHA_TAG} \\"
        echo "  ${AMD64_SHA_TAG} \\"
        echo "  ${ARM64_SHA_TAG}"
    fi

    echo ""
    echo "Use without --dry-run to actually combine images."
    exit 0
fi

# Combine rolling tag images
echo "Creating multi-arch manifest..."
echo ""

# Build command with optional latest tag
CMD=(docker buildx imagetools create -t "${MULTIARCH_TAG}")
if "${TAG_LATEST}"; then
    CMD+=(-t "${GHCR_REGISTRY}/aperi-mech:latest")
fi
CMD+=("${AMD64_TAG}" "${ARM64_TAG}")

"${CMD[@]}"

echo ""
echo "✅ Multi-arch manifest created: ${MULTIARCH_TAG}"
if "${TAG_LATEST}"; then
    echo "✅ Also tagged as: ${GHCR_REGISTRY}/aperi-mech:latest"
fi

# Combine git SHA tagged images if requested
if [[ -n ${GIT_SHA} ]]; then
    echo ""
    echo "Creating multi-arch manifest for git SHA tags..."
    echo ""

    docker buildx imagetools create \
        -t "${MULTIARCH_SHA_TAG}" \
        "${AMD64_SHA_TAG}" \
        "${ARM64_SHA_TAG}"

    echo ""
    echo "✅ Multi-arch manifest created: ${MULTIARCH_SHA_TAG}"
fi

#################### Summary ####################

echo ""
echo "============================================"
echo "Summary"
echo "============================================"
echo "Multi-arch manifest: ${MULTIARCH_TAG}"
if "${TAG_LATEST}"; then
    echo "Latest tag:          ${GHCR_REGISTRY}/aperi-mech:latest"
fi
if [[ -n ${GIT_SHA} ]]; then
    echo "Git SHA manifest:    ${MULTIARCH_SHA_TAG}"
fi
echo ""
echo "To pull this image:"
if "${TAG_LATEST}"; then
    echo "  docker pull ${GHCR_REGISTRY}/aperi-mech:latest  # or"
fi
echo "  docker pull ${MULTIARCH_TAG}"
echo ""
echo "Docker will automatically select the correct architecture:"
echo "  - AMD64 systems → pulls amd64 variant"
echo "  - ARM64 systems → pulls arm64 variant"
echo ""
echo "To verify:"
echo "  docker image inspect ${MULTIARCH_TAG} | grep Architecture"
echo ""
