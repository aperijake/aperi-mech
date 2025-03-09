# Docker images for `aperi-mech`

## Using the images

Grab the docker image and load it on your system

```bash
# Change to your desired directory and copy the image from the shared drive
cp /path/to/shared/drive/aperi-mech-image.tar.gz .
# where `aperi-mech-image` is the specific image

# Decompress the image
gunzip aperi-mech-image.tar.gz

# Load the Docker image
docker load -i aperi-mech-image.tar

# Verify the image is available
docker images | grep aperi-mech
```

Start the image and attach a shell

```bash
# With mounting a path from the host system
docker run -it -v /folder/path/to/mount:/home/aperi-mech_docker/host_folder aperi-mech
```

```bash
# Without mounting the path from the host system
docker run -it aperi-mech
```

### Working with the Private `protego-mech` Submodule

For accessing private submodules, you'll need to set up GitHub authentication within the container. This assumes the host system has credentials set up to access GitHub. If not, follow the instructions on GitHub to do this. After that is done, proceed with:

```bash
# Start container with SSH keys mounted and the present directory
docker run -it \
  -v $(pwd):/home/aperi-mech_docker/workspace \
  -v ~/.ssh:/home/aperi-mech_docker/.ssh:ro \
  aperi-mech
```

Inside the container

```bash
# Set SSH key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Setup Git identity (optional)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize and update submodules
cd /home/aperi-mech_docker/aperi-mech
git submodule update --init --recursive

# Configure to build with protego-mech
spacktivate aperi-mech
./do_configure --build-type Release --protego-mech

# Build protego-mech
cd protego-mech/build/Release
make -j 4

# Run the unit tests
./unit_tests
```

### Running `aperi-mech`

```bash
# Run `input.yaml` without protego-mech
/home/aperi-mech_docker/build/Release/aperi-mech input.yaml

# Run `input.yaml` with protego-mech
/home/aperi-mech_docker/protego-mech/build/Release/aperi-mech input.yaml
```

## Developer notes

### Build a docker image

```bash
# Arm, change `arm64` to `amd64` if that is the target platform
docker buildx build --platform linux/arm64 -t aperi-mech:latest -f Dockerfile . \
  --progress=plain 2>&1 | tee build_log_$(date +%Y%m%d_%H%M%S).log

# For Tesla T4 (compute capability 7.5)
docker buildx build --platform linux/amd64 -t aperi-mech:cuda-t4 --build-arg CUDA_ARCH=75 -f Dockerfile_Nvidia . \
  --progress=plain 2>&1 | tee build_log_$(date +%Y%m%d_%H%M%S).log

# For H100 (compute capability 9.0)
docker buildx build --platform linux/amd64 -t aperi-mech:cuda-h100 --build-arg CUDA_ARCH=90 -f Dockerfile_Nvidia . \
  --progress=plain 2>&1 | tee build_log_$(date +%Y%m%d_%H%M%S).log
```

### Share a docker image

```bash
# Save a Docker image to a tar file
docker save -o aperi-mech-image.tar aperi-mech:latest

# Compress the image (recommended)
gzip -c aperi-mech-image.tar > aperi-mech-image.tar.gz

# Copy to shared drive
cp aperi-mech-image.tar.gz /path/to/shared/drive/
```
