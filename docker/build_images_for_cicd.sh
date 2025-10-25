#!/usr/bin/env bash

WITH_PROTEGO=false
USE_CACHE=true
USE_GPU=false
SRC_BRANCH="main"
PLATFORM="amd64"
DISTRO="ubuntu"

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
	--help | -h)
		echo "Usage: build_images_for_cicd.sh [OPTIONS]"
		echo "Options:"
		echo "  --protego           Enable Protego support"
		echo "  --no-cache          Disable build cache"
		echo "  --gpu               Build GPU-enabled image"
		echo "  --branch BRANCH     Specify the source branch (default: main)"
		echo "  --platform PLATFORM Specify the platform (default: amd64)"
		echo "  --distro DISTRO     Specify the distribution: ubuntu or rocky (default: ubuntu)"
		exit 0
		;;
	*)
		shift
		;;
	esac
done

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
else
	if [[ ${DISTRO} == "rocky" ]]; then
		DOCKERFILE="Dockerfile_AperiMech_RockyLinux9"
		IMAGE_TAG="aperi-mech:rocky9"
	else
		DOCKERFILE="Dockerfile_AperiMech_Ubuntu2404"
		IMAGE_TAG="aperi-mech:latest"
	fi
fi

BUILD_ARGS=(--build-arg SRC_BRANCH="${SRC_BRANCH}")

LOG_FILE="build_log_$(date +%Y%m%d_%H%M%S).log"

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

"${cmd[@]}" 2>&1 | tee "${LOG_FILE}"
