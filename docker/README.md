# Docker Images for aperi-mech

This directory contains Docker configuration and scripts for building and managing aperi-mech container images.

## Quick Start

### Building and Pushing to GHCR

For CI/CD workflows, build base images and push to GitHub Container Registry (GHCR):

```bash
# First time: Set up GHCR (see GHCR_SETUP.md)

# Build and push CPU image
./build_and_push_images.sh --push

# Build and push GPU image
./build_and_push_images.sh --gpu --push
```

**Security**: The build script automatically verifies that no closed-source code is included before pushing to GHCR.

See [GHCR_SETUP.md](GHCR_SETUP.md) for detailed setup instructions.

## Using Docker Images

### Pulling from GHCR

For public repositories, images can be pulled directly from GitHub Container Registry:

```bash
# Pull CPU image
docker pull ghcr.io/<username>/aperi-mech:latest

# Pull GPU image
docker pull ghcr.io/<username>/aperi-mech:cuda-t4
```

### Loading from File

For shared or archived images:

```bash
# Copy image from shared location
cp /path/to/shared/drive/aperi-mech-image.tar.gz .

# Decompress
gunzip aperi-mech-image.tar.gz

# Load into Docker
docker load -i aperi-mech-image.tar

# Verify loaded
docker images | grep aperi-mech
```

### Running Containers

Start a container and attach a shell:

```bash
# CPU image with host path mounted
docker run -it -v /folder/path:/home/aperi-mech_docker/host_folder aperi-mech:latest

# CPU image without host mount
docker run -it aperi-mech:latest

# GPU image with GPU support and host mount
docker run --gpus all -it -v /folder/path:/home/aperi-mech_docker/host_folder aperi-mech:cuda-t4

# GPU image without host mount
docker run --gpus all -it aperi-mech:cuda-t4
```

### Working with Private Submodules

To access private submodules within containers, GitHub authentication must be configured. This requires SSH keys to be mounted from the host system:

```bash
# Start container with SSH keys mounted and the present directory
docker run -it \
  -v $(pwd):/home/aperi-mech_docker/workspace \
  -v ~/.ssh:/home/aperi-mech_docker/.ssh:ro \
  aperi-mech
```

Inside the container:

```bash
# Set SSH key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Configure Git identity (optional)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize and update submodules
cd /home/aperi-mech_docker/aperi-mech
git submodule update --init --recursive

# Configure build with private submodule
spacktivate aperi-mech
./do_configure --build-type Release --protego-mech

# Build
cd protego-mech/build/Release
make -j 4

# Run unit tests
./unit_tests
```

### Running the Application

```bash
# Run without private submodule
/home/aperi-mech_docker/build/Release/aperi-mech input.yaml

# Run with private submodule
/home/aperi-mech_docker/protego-mech/build/Release/aperi-mech input.yaml
```

## Developer Notes

### Building Docker Images Manually

For local development or custom builds:

```bash
# CPU image for Arm64 (change to amd64 for x86-64)
docker buildx build --platform linux/arm64 --load -t aperi-mech:latest -f Dockerfile . \
  --progress=plain 2>&1 | tee build_log_$(date +%Y%m%d_%H%M%S).log

# GPU image for Tesla T4 (compute capability 7.5)
docker buildx build --platform linux/amd64 --load -t aperi-mech:cuda-t4 \
  --build-arg CUDA_ARCH=75 -f Dockerfile_Nvidia . \
  --progress=plain 2>&1 | tee build_log_$(date +%Y%m%d_%H%M%S).log

# GPU image for H100 (compute capability 9.0)
docker buildx build --platform linux/amd64 --load -t aperi-mech:cuda-h100 \
  --build-arg CUDA_ARCH=90 -f Dockerfile_Nvidia . \
  --progress=plain 2>&1 | tee build_log_$(date +%Y%m%d_%H%M%S).log
```

### Sharing Docker Images

To share images without using a registry:

```bash
# Save image to tar file
docker save -o aperi-mech-image.tar aperi-mech:latest

# Compress (recommended for large images)
gzip -c aperi-mech-image.tar > aperi-mech-image.tar.gz

# Transfer to shared location
cp aperi-mech-image.tar.gz /path/to/shared/drive/
```

## Image Maintenance

### When to Rebuild Images

Rebuild and push updated images when:

- Dependencies are updated (Trilinos, Kokkos, Spack packages)
- Base OS requires security updates
- CUDA versions change for GPU images
- Build tool versions are upgraded

### Maintenance Frequency

**Recommended schedule**:

- Security updates: As needed (monitor security advisories)
- Dependency updates: Every 3-6 months
- Routine rebuilds: Quarterly

### Update Process

1. Update Dockerfile with new versions
2. Build locally and test thoroughly
3. Run security checks (automated in build script)
4. Push to GHCR with appropriate tags
5. Update CI/CD workflows if image names change
6. Monitor first few CI/CD runs with new images
