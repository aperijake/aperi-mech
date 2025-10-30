#!/usr/bin/env bash
#
# Enhanced build script for aperi-mech Docker images
# - Builds Docker images (with or without GPU support)
# - Validates that no protego source code is in the image
# - Optionally pushes to GitHub Container Registry (GHCR)
#
# Usage:
#   ./build_and_push_images.sh [OPTIONS]
#
# Examples:
#   ./build_and_push_images.sh                    # Build CPU image locally
#   ./build_and_push_images.sh --gpu              # Build GPU image locally
#   ./build_and_push_images.sh --push             # Build and push CPU image to GHCR
#   ./build_and_push_images.sh --gpu --push       # Build and push GPU image to GHCR
#

set -e # Exit on error

# Default values
WITH_PROTEGO=false
USE_CACHE=true
USE_GPU=false
SRC_BRANCH="main"
PLATFORM="amd64"
DISTRO="ubuntu"
USE_AZURE_MIRROR=false
PUSH_TO_GHCR=false
GHCR_REGISTRY="ghcr.io/aperijake"
DRY_RUN=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
	case "$1" in
	--protego)
		WITH_PROTEGO=true
		shift
		;;
	--no-cache)
		USE_CACHE=false
		shift
		;;
	--gpu)
		USE_GPU=true
		shift
		;;
	--branch)
		SRC_BRANCH="$2"
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
	--help | -h)
		echo "Usage: build_and_push_images.sh [OPTIONS]"
		echo ""
		echo "Options:"
		echo "  --protego           Enable Protego support (NOT RECOMMENDED FOR PUSH)"
		echo "  --no-cache          Disable build cache"
		echo "  --gpu               Build GPU-enabled image"
		echo "  --branch BRANCH     Specify the source branch (default: main)"
		echo "  --platform PLATFORM Specify the platform (default: amd64)"
		echo "  --distro DISTRO     Specify the distribution: ubuntu or rocky (default: ubuntu)"
		echo "  --azure-mirror      Use Azure mirror for apt sources (Ubuntu only)"
		echo "  --push              Push image to GHCR after successful build and validation"
		echo "  --registry REGISTRY Specify the registry (default: ghcr.io/aperijake)"
		echo "  --dry-run           Show what would be pushed without actually pushing"
		echo "  --help, -h          Show this help message"
		echo ""
		echo "Examples:"
		echo "  ./build_and_push_images.sh                # Build CPU image locally"
		echo "  ./build_and_push_images.sh --gpu          # Build GPU image locally"
		echo "  ./build_and_push_images.sh --push         # Build and push CPU image"
		echo "  ./build_and_push_images.sh --gpu --push   # Build and push GPU image"
		echo ""
		echo "Security Note:"
		echo "  Images built with --protego contain closed-source code and should NOT be pushed"
		echo "  to public registries. The script will warn and require confirmation."
		exit 0
		;;
	*)
		shift
		;;
	esac
done

# Configure build based on options
if "${WITH_PROTEGO}"; then
	export DOCKER_BUILDKIT=1
	SSH_FLAG="--ssh default"
	PROTEGO_ARG="--build-arg PROTEGO=1"
else
	unset DOCKER_BUILDKIT
	SSH_FLAG=""
	PROTEGO_ARG=""
fi

if "${USE_CACHE}"; then
	CACHE_FLAG=""
else
	CACHE_FLAG="--no-cache"
fi

if "${USE_GPU}"; then
	if [[ ${DISTRO} == "rocky" ]]; then
		echo "Error: GPU build not yet supported for ${DISTRO}"
		exit 1
	fi
	DOCKERFILE="Dockerfile_AperiMech_Ubuntu2404_Nvidia"
	IMAGE_TAG="aperi-mech:cuda-t4"
	GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:cuda-t4"
else
	if [[ ${DISTRO} == "rocky" ]]; then
		DOCKERFILE="Dockerfile_AperiMech_RockyLinux9"
		IMAGE_TAG="aperi-mech:rocky9"
		GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:rocky9"
	else
		DOCKERFILE="Dockerfile_AperiMech_Ubuntu2404"
		IMAGE_TAG="aperi-mech:latest"
		GHCR_TAG="${GHCR_REGISTRY}/aperi-mech:latest"
	fi
fi

BUILD_ARGS=(--build-arg SRC_BRANCH="${SRC_BRANCH}")

if "${USE_AZURE_MIRROR}"; then
	BUILD_ARGS+=(--build-arg USE_AZURE_MIRROR=true)
fi

LOG_FILE="build_log_$(date +%Y%m%d_%H%M%S).log"

echo "============================================"
echo "Building Docker Image"
echo "============================================"
echo "Dockerfile: ${DOCKERFILE}"
echo "Local tag:  ${IMAGE_TAG}"
echo "GHCR tag:   ${GHCR_TAG}"
echo "Protego:    ${WITH_PROTEGO}"
echo "GPU:        ${USE_GPU}"
echo "Push:       ${PUSH_TO_GHCR}"
echo "Dry run:    ${DRY_RUN}"
echo "Log file:   ${LOG_FILE}"
echo "============================================"
echo ""

# Build the image
cmd=(
	docker buildx build
	${SSH_FLAG:+${SSH_FLAG}}
	${CACHE_FLAG:+${CACHE_FLAG}}
	${PROTEGO_ARG:+${PROTEGO_ARG}}
	"${BUILD_ARGS[@]}"
	--platform "linux/${PLATFORM}"
	--load
	-t "${IMAGE_TAG}"
	-f "${DOCKERFILE}"
	.
	--progress=plain
)

printf '%q ' "${cmd[@]}"
echo "| tee ${LOG_FILE}"
echo ""

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

# Security validation before push
if "${PUSH_TO_GHCR}"; then
	echo "============================================"
	echo "Validating Image for Push"
	echo "============================================"

	# Check if protego is enabled
	if "${WITH_PROTEGO}"; then
		echo ""
		echo "⚠️  WARNING: This image was built with PROTEGO=1"
		echo "⚠️  It may contain closed-source protego-mech code."
		echo "⚠️  Pushing to a public registry could expose proprietary code!"
		echo ""
		read -r -p "Are you SURE you want to push this image? (type 'yes' to confirm): " confirm
		if [[ ${confirm} != "yes" ]]; then
			echo "Push cancelled."
			exit 0
		fi
	fi

	# Check for protego-mech source code in the image
	echo ""
	echo "Checking for protego-mech source code in image..."

	# Look for protego-mech source files
	if docker run --rm "${IMAGE_TAG}" bash -c "test -d /home/aperi-mech_docker/aperi-mech/protego-mech/src" 2>/dev/null; then
		echo ""
		echo "❌ ERROR: Found protego-mech source directory in image!"
		echo "❌ This image contains closed-source code and should NOT be pushed."
		echo ""
		echo "To fix this:"
		echo "  1. Rebuild with --protego flag removed (default)"
		echo "  2. Or use a multi-stage Dockerfile that excludes source code"
		echo ""
		exit 1
	fi

	# Check for any .cpp or .h files in protego-mech (count files, not output text)
	# Use wc -l to count files, avoiding false positives from stderr messages
	protego_source_count=$(docker run --rm "${IMAGE_TAG}" bash -c "find /home/aperi-mech_docker/aperi-mech/protego-mech -type f \( -name '*.cpp' -o -name '*.h' \) 2>/dev/null | wc -l" || echo "0")
	protego_source_count=$(echo "${protego_source_count}" | tr -d '[:space:]') # Remove whitespace

	if [[ ${protego_source_count} -gt 0 ]]; then
		# Found files, list them for debugging
		protego_files=$(docker run --rm "${IMAGE_TAG}" bash -c "find /home/aperi-mech_docker/aperi-mech/protego-mech -type f \( -name '*.cpp' -o -name '*.h' \) 2>/dev/null | head -10")
		echo ""
		echo "❌ ERROR: Found ${protego_source_count} protego-mech source files in image:"
		echo "${protego_files}"
		echo ""
		echo "This image contains closed-source code and should NOT be pushed."
		exit 1
	fi

	echo "✅ No protego-mech source code detected in image"
	echo ""

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
fi
echo ""
echo "Build log saved to: ${LOG_FILE}"
echo ""
