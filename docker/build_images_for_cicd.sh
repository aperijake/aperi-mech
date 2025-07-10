#!/usr/bin/env bash

WITH_PROTEGO=false
USE_CACHE=true
USE_GPU=false

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
	*)
		shift
		;;
	esac
done

if $WITH_PROTEGO; then
	export DOCKER_BUILDKIT=1
	SSH_FLAG="--ssh default"
	PROTEGO_ARG="--build-arg PROTEGO=1"
else
	unset DOCKER_BUILDKIT
	SSH_FLAG=""
	PROTEGO_ARG=""
fi

if $USE_CACHE; then
	CACHE_FLAG=""
else
	CACHE_FLAG="--no-cache"
fi

if $USE_GPU; then
	DOCKERFILE="Dockerfile_AperiMech_Ubuntu2404_Nvidia"
	IMAGE_TAG="aperi-mech:cuda-t4"
else
	DOCKERFILE="Dockerfile_AperiMech_Ubuntu2404"
	IMAGE_TAG="aperi-mech:latest"
fi

docker buildx build \
	$SSH_FLAG \
	$CACHE_FLAG \
	$PROTEGO_ARG \
	--platform linux/amd64 \
	--load \
	-t $IMAGE_TAG \
	-f $DOCKERFILE . \
	--progress=plain 2>&1 | tee build_log_$(date +%Y%m%d_%H%M%S).log
