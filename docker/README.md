# Docker Images for amech

This directory contains Docker configuration and scripts for building and managing amech container images across multiple OS distributions and configurations.

## Available Images

### Image Variants

All images follow the naming convention: `aperi-mech:<distro>[-cuda<version>][-sm<arch>]`

| Distribution | CPU Image | GPU Image (CUDA 12.6) | GPU + Architecture |
|--------------|-----------|----------------------|--------------------|
| Ubuntu 24.04 | `aperi-mech:ubuntu24.04` | `aperi-mech:ubuntu24.04-cuda12.6` | `aperi-mech:ubuntu24.04-cuda12.6-sm90` |
| Ubuntu 22.04 | `aperi-mech:ubuntu22.04` | `aperi-mech:ubuntu22.04-cuda12.6` | `aperi-mech:ubuntu22.04-cuda12.6-sm80` |
| Rocky Linux 9 | `aperi-mech:rocky9` | `aperi-mech:rocky9-cuda12.6` | `aperi-mech:rocky9-cuda12.6-sm75` |
| Rocky Linux 10 | `aperi-mech:rocky10` | `aperi-mech:rocky10-cuda12.6` | `aperi-mech:rocky10-cuda12.6-sm90` |

**Default**: `aperi-mech:latest` → `aperi-mech:ubuntu24.04`

**Multi-Architecture**: Images are built natively on each architecture (ARM64 on Mac, AMD64 on Linux) and combined into multi-arch manifests. See [Multi-Architecture Images](#multi-architecture-images) section for details.

**Platform Support**:
- **AMD64 (x86_64)**: All distributions supported
- **ARM64 (aarch64)**: Ubuntu 24.04 and Rocky 10 only
  - Ubuntu 22.04 and Rocky 9 ARM64 builds are not supported due to PyQt6 compatibility issues
  - For older distros on ARM64, use AMD64 images with emulation or native AMD64 hardware

**GPU Images**: Default GPU images (without `-smXX` suffix) are built for sm_75 (T4/RTX 2080). Use `--cuda-arch` flag to build for specific GPU architectures.

## Quick Start

### Building and Pushing to GHCR

For CI/CD workflows, build base images and push to GitHub Container Registry (GHCR):

```bash
# First time: Set up GHCR (see GHCR_SETUP.md)

# Build and push default (Ubuntu 24.04 CPU) image
./build_and_push_images.sh --push

# Build and push Ubuntu 24.04 GPU image (default: sm_75 for T4/RTX 2080)
./build_and_push_images.sh --gpu --push
# → Creates: aperi-mech:ubuntu24.04-cuda12.6

# Build and push GPU image optimized for H100 (sm_90)
./build_and_push_images.sh --gpu --cuda-arch 90 --push
# → Creates: aperi-mech:ubuntu24.04-cuda12.6-sm90

# Build and push GPU image optimized for A100 (sm_80)
./build_and_push_images.sh --gpu --cuda-arch 80 --push
# → Creates: aperi-mech:ubuntu24.04-cuda12.6-sm80

# Build and push Rocky 9 CPU image
./build_and_push_images.sh --distro rocky9 --push

# Build and push Ubuntu 22.04 GPU image for specific architecture
./build_and_push_images.sh --distro ubuntu22.04 --gpu --cuda-arch 75 --push
# → Creates: aperi-mech:ubuntu22.04-cuda12.6-sm75
```

**Security**: The build script automatically verifies that no closed-source code is included before pushing to GHCR.

See [GHCR_SETUP.md](GHCR_SETUP.md) for detailed setup instructions.

## Testing Docker Images

The build process includes **three levels** of automated testing to ensure image quality:

### Test Levels

#### Level 1: Build-Time Smoke Tests
**When**: During `docker build` (embedded in Dockerfiles)
**What**: Basic validation that the image built correctly
- Python environment functionality
- Spack installation and environment
- Core system tools (git, cmake, gcc, gfortran)
- Package imports (spackx, amech)
- Dependency detection (Trilinos, Kokkos, Eigen)
- CUDA toolkit verification (GPU images only)

**Status**: ✅ Always runs (cannot be skipped)

#### Level 2-3: Post-Build Validation Tests
**When**: After `docker build`, before `docker push`
**What**: Comprehensive validation of the built image
- Container startup and user setup
- Directory structure
- Python virtual environment activation
- Python package functionality
- Spack environment activation
- Core dependencies accessibility
- AppImage tools installation
- GPU-specific tests (CUDA libraries, nvidia-smi, Spack CUDA config)

**Status**: ✅ Runs automatically (can be skipped with `--skip-tests`)

### Running Tests

#### Automatic Testing (Recommended)

Tests run automatically during the build process:

```bash
# Build and test Ubuntu 24.04 CPU image
./build_and_push_images.sh
# → Runs Level 1 during build + Level 2-3 after build

# Build and test GPU image
./build_and_push_images.sh --gpu
# → Runs Level 1 + GPU tests during build + Level 2-3 + GPU tests after build

# Build, test, and push to GHCR (tests must pass)
./build_and_push_images.sh --gpu --push
# → Only pushes if all tests pass
```

**Test failures**: If any test fails, the build process exits with an error and does not push to GHCR.

#### Manual Testing

You can run the Level 2-3 test suite manually on any image:

```bash
# Test CPU image
./test_image.sh aperi-mech:ubuntu24.04

# Test GPU image
./test_image.sh aperi-mech:ubuntu24.04-cuda12.6 --gpu

# Test Rocky 9 CPU image
./test_image.sh aperi-mech:rocky9

# Test Ubuntu 22.04 GPU image with specific architecture
./test_image.sh aperi-mech:ubuntu22.04-cuda12.6-sm80 --gpu
```

The test script provides color-coded output and detailed test results.

#### Skipping Tests (Not Recommended)

For advanced users who need to bypass testing:

```bash
# Build without running Level 2-3 tests
./build_and_push_images.sh --skip-tests
```

⚠️ **Warning**: Skipping tests is **not recommended**, especially before pushing to GHCR. Use only when:
- Debugging build issues
- Testing Dockerfile changes iteratively
- You have a specific reason to bypass validation

Note: Level 1 smoke tests **always run** during the build and cannot be skipped.

### Understanding Test Results

**Successful build with tests**:
```
✅ Build completed successfully!
✅ All tests passed!
✅ Push completed successfully!
```

**Build success but test failure**:
```
✅ Build completed successfully!
❌ Tests FAILED with exit code 1
```
The image is built but **not pushed** to GHCR. Review the test output to diagnose the issue.

**Build failure** (before tests run):
```
❌ Build FAILED with exit code 1
```
Fix the Dockerfile or build arguments and retry.

## Multi-Architecture Images

Multi-architecture images support both AMD64 (x86_64) and ARM64 (aarch64) platforms in a single image manifest. Docker automatically selects the correct architecture when pulling.

### Why Native Builds?

These Docker images include Spack package builds which don't work well under QEMU emulation. **Native builds on each architecture are 10x faster** and fully testable.

### Building Multi-Arch Images (Native + Combine)

**Step 1: Build natively on each architecture**

```bash
# On Mac (ARM64)
./build_and_push_images.sh --distro ubuntu24.04 --push
# → Pushes: ghcr.io/aperijake/aperi-mech:ubuntu24.04-arm64

# On Linux/Azure (AMD64)
./build_and_push_images.sh --distro ubuntu24.04 --push
# → Pushes: ghcr.io/aperijake/aperi-mech:ubuntu24.04-amd64
```

**Step 2: Combine into multi-arch manifest**

```bash
# Option A: Use helper script (recommended)
./combine_multiarch_images.sh --distro ubuntu24.04

# Option B: Manual command
docker buildx imagetools create \
  -t ghcr.io/aperijake/aperi-mech:ubuntu24.04 \
  ghcr.io/aperijake/aperi-mech:ubuntu24.04-amd64 \
  ghcr.io/aperijake/aperi-mech:ubuntu24.04-arm64
```

**Helper script features**:
- Automatically constructs correct image tags
- Supports all distros and GPU configurations
- Supports `--git-sha` flag to combine SHA-tagged images
- Supports `--dry-run` to preview before combining
- See `./combine_multiarch_images.sh --help` for full options

### Architecture Detection

When you pull a multi-arch manifest, Docker automatically selects your architecture:

```bash
# Pull multi-arch image (automatically selects your arch)
docker pull ghcr.io/aperijake/aperi-mech:ubuntu24.04

# On AMD64 system → gets amd64 variant
# On ARM64 system → gets arm64 variant

# Verify which architecture you got
docker image inspect ghcr.io/aperijake/aperi-mech:ubuntu24.04 | grep Architecture
```

### Build Performance Comparison

**Native builds (recommended)**:
- Each build: ~1 hour on native hardware
- Total time: ~1 hour (parallel on both machines)
- ✅ Fast, fully testable, production quality

**QEMU emulation (not supported)**:
- Native arch: ~1 hour
- Emulated arch: ~10 hours (10x slower)
- Total time: ~11 hours sequential
- ❌ Extremely slow, Spack incompatible

### Example: Quarterly Release Workflow

```bash
# 1. On Mac (ARM64) - build and push arm64 variant
git checkout v2025.Q1
./build_and_push_images.sh --distro ubuntu24.04 --push --tag-git-sha
# → Pushes: ubuntu24.04-arm64, ubuntu24.04-arm64-a1b2c3d

# 2. On Azure (AMD64) - build and push amd64 variant
git checkout v2025.Q1
./build_and_push_images.sh --distro ubuntu24.04 --push --tag-git-sha
# → Pushes: ubuntu24.04-amd64, ubuntu24.04-amd64-a1b2c3d

# 3. Combine both rolling tags and frozen snapshots into multi-arch manifests
./combine_multiarch_images.sh --distro ubuntu24.04 --git-sha a1b2c3d
# → Creates: ubuntu24.04 (multi-arch rolling tag)
# → Creates: ubuntu24.04-a1b2c3d (multi-arch frozen snapshot)
```

### When to Create Multi-Arch Manifests

**Create multi-arch manifests for**:
- Public releases (users on different hardware)
- Base images for distribution
- Development environments (Mac + Linux developers)

**Use single-arch images for**:
- Local testing and development
- CI/CD pipelines (known architecture)
- Architecture-specific optimizations

## Build Cache Optimization

Registry caching minimizes local storage usage and dramatically speeds up rebuilds by storing build cache layers in GHCR.

### How It Works

**Default behavior**: Registry caching is **always enabled** automatically.

```bash
# Build with registry cache (default)
./build_and_push_images.sh
# → Uses cache from ghcr.io/aperijake/aperi-mech-cache:ubuntu24.04
# → Stores new cache layers after build
# → Minimal local storage usage (~5-10GB during build)

# Build without any cache (clean build)
./build_and_push_images.sh --no-cache
# → Disables local AND registry cache
# → Completely fresh build from scratch
```

### Registry Cache Authentication

Registry cache requires GHCR authentication to export cache layers, **even when building locally without `--push`**.

**One-time setup**:

```bash
# 1. Create a GitHub Personal Access Token
# Go to: https://github.com/settings/tokens
# Click "Generate new token (classic)"
# Select scopes: write:packages, read:packages

# 2. Log in to GHCR
docker login ghcr.io -u <your-github-username>
# Paste your token when prompted

# Expected output:
# Login Succeeded
```

**On macOS**: Docker automatically stores credentials in Keychain. Click "Always Allow" when prompted to save the password.

**Token storage**: Store your token securely in:
- macOS Keychain (automatic after login)
- Password manager (1Password, Bitwarden, etc.)
- GitHub CLI (`gh auth login`)

**Token renewal**: Create tokens with 90-day expiration for security. When expired, generate a new token and re-run `docker login`.

See [GHCR_SETUP.md](GHCR_SETUP.md) for detailed authentication setup and troubleshooting.

### Storage Comparison

**Without registry cache** (local only):
- First build: 15-20 GB local storage
- Second build: 30-40 GB local storage
- Multiple configs: 96 GB fills up quickly ❌

**With registry cache** (default):
- Each build: 5-10 GB local storage during build
- Cache stored on GHCR: FREE (public repo)
- Multiple configs: No local storage accumulation ✅

### Cache Performance

**Scenario 1: Rebuilding after minor code change**
- Without cache: 45-60 minutes (full rebuild)
- With registry cache: 5-10 minutes (reuses most layers)

**Scenario 2: Building on fresh VM**
- Without cache: 45-60 minutes (full build)
- With registry cache: 15-25 minutes (downloads cached layers from GHCR)

**Scenario 3: Building multiple configurations**
- Without cache: Each config builds from scratch
- With registry cache: Shared base layers reused across configs

### Cache Storage Location

Build caches are stored separately from images at:
```
ghcr.io/aperijake/aperi-mech-cache:ubuntu24.04
ghcr.io/aperijake/aperi-mech-cache:ubuntu24.04-cuda12.6
ghcr.io/aperijake/aperi-mech-cache:ubuntu24.04-cuda12.6-sm80
ghcr.io/aperijake/aperi-mech-cache:ubuntu22.04
ghcr.io/aperijake/aperi-mech-cache:rocky9
```

Each cache is specific to the distro and configuration.

### Cost Analysis

**For public repositories** (like `aperijake/aperi-mech`): **FREE**
- GHCR provides unlimited storage for public repos
- No bandwidth charges
- Cache size: ~10-12 GB total for all configs

**For private repositories**:
- Storage: ~$0.10-0.25/month (12 GB × $0.008/GB)
- Bandwidth: ~$2-5/month if rebuilding frequently
- Still cheaper than upgrading VM storage!

### Cache Sharing

Registry cache is shared across:
- ✅ Different machines (your ARM Mac and AMD Ubuntu VM)
- ✅ Different developers on the same project
- ✅ CI/CD pipelines
- ✅ Fresh VM instances

This makes it perfect for your use case with limited VM storage.

### When to Use --no-cache

Use `--no-cache` only when:
- Debugging build issues that might be cache-related
- Testing Dockerfile changes that affect base layers
- You need to verify a completely clean build
- Updating base images or system packages

**Not recommended for normal use** - registry cache is safe and beneficial.

### Technical Details

**Cache mode**: `mode=max`
- Caches ALL intermediate layers (not just final image layers)
- Larger cache size but maximum rebuild speed
- Optimal for limited local storage scenarios

**Cache type**: `type=registry`
- Stores cache as OCI manifest in GHCR
- Works across different machines
- Survives local cleanup (`docker system prune`)

## Git Version Tracking

Docker images automatically include git metadata for traceability and version tracking.

### Always-Included Metadata (OCI Labels)

Every image includes git information in standard OCI labels:

```bash
# Inspect any image to see git metadata
docker image inspect ghcr.io/aperijake/aperi-mech:ubuntu24.04 \
  | grep -A 5 Labels

# Extract specific metadata
docker image inspect ghcr.io/aperijake/aperi-mech:ubuntu24.04 \
  | jq '.[0].Config.Labels'

# Output shows:
# "org.opencontainers.image.created": "2025-01-15T14:30:00Z"
# "org.opencontainers.image.revision": "a1b2c3d4e5f6..."  ← Full git SHA
# "org.opencontainers.image.source": "https://github.com/aperijake/amech"
# "org.opencontainers.image.version": "a1b2c3d"  ← Short git SHA
```

This metadata is **always present** - no extra flags needed.

### Optional Git SHA Tags (--tag-git-sha)

For frozen snapshots that never change, use `--tag-git-sha`:

```bash
# Normal push (rolling tag only)
./build_and_push_images.sh --push
# → Creates: ubuntu24.04 (rolling tag, always updated)

# Push with git SHA snapshot
./build_and_push_images.sh --push --tag-git-sha
# → Creates: ubuntu24.04 (rolling tag)
# → Also creates: ubuntu24.04-a1b2c3d (frozen snapshot)
```

### Tagging Strategy

**Rolling Tags** (created every push):
- `ubuntu24.04` - Always points to latest build
- `ubuntu24.04-cuda12.6` - Latest GPU build
- `latest` - Alias for ubuntu24.04

**Frozen Tags** (created only with `--tag-git-sha`):
- `ubuntu24.04-a1b2c3d` - Specific commit, never changes
- `ubuntu24.04-cuda12.6-e5f6a7b` - GPU image, specific commit
- `ubuntu24.04-cuda12.6-sm80-g7h8i9j` - GPU + arch, specific commit

### When to Use --tag-git-sha

**Use for quarterly releases**:
```bash
# Q1 2025 release
./build_and_push_images.sh --push --tag-git-sha
./build_and_push_images.sh --gpu --push --tag-git-sha
# → Creates frozen snapshots for this release
```

**Result after 1 year** (4 quarterly releases):
```
ubuntu24.04                    ← Rolling (current)
ubuntu24.04-a1b2c3d           ← Q1 2025
ubuntu24.04-c3d4e5f           ← Q2 2025
ubuntu24.04-e5f6a7b           ← Q3 2025
ubuntu24.04-g7h8i9j           ← Q4 2025
```

Clean and manageable! Only 5 tags per config after a full year.

### Bisecting with Git SHA Tags

When you need to track down a regression:

```bash
# Current image is broken
docker run -it ghcr.io/aperijake/aperi-mech:ubuntu24.04
# → Broken behavior

# Pull older frozen snapshots
docker pull ghcr.io/aperijake/aperi-mech:ubuntu24.04-a1b2c3d  # Q1
docker pull ghcr.io/aperijake/aperi-mech:ubuntu24.04-c3d4e5f  # Q2
docker pull ghcr.io/aperijake/aperi-mech:ubuntu24.04-e5f6a7b  # Q3

# Test each one
docker run -it ghcr.io/aperijake/aperi-mech:ubuntu24.04-a1b2c3d  # Good
docker run -it ghcr.io/aperijake/aperi-mech:ubuntu24.04-c3d4e5f  # Good
docker run -it ghcr.io/aperijake/aperi-mech:ubuntu24.04-e5f6a7b  # Bad!

# Regression happened between Q2 and Q3
git log c3d4e5f..e5f6a7b  # Find the problematic commits
```

### Alternative: Using Image Digests

GHCR preserves all pushed images with unique digests, even if tags are overwritten:

```bash
# List all versions (using GitHub API or web UI)
gh api /orgs/aperijake/packages/container/aperi-mech/versions

# Pull by digest (works even without --tag-git-sha)
docker pull ghcr.io/aperijake/aperi-mech@sha256:abc123...

# Inspect to find git SHA
docker image inspect ghcr.io/aperijake/aperi-mech@sha256:abc123... \
  | jq '.[0].Config.Labels["org.opencontainers.image.revision"]'
```

### GHCR Storage Impact

**With --tag-git-sha** (quarterly releases):
- Year 1: 4 extra tags per config × 10 configs = 40 tags
- Year 2: 4 more tags per config = 44 total tags
- **Storage**: FREE (public repository)
- **Management**: Clean and organized

**Without --tag-git-sha**:
- Only rolling tags (3-4 per config)
- Must use digests or labels for versioning
- Slightly more complex bisecting workflow

### Recommendation

For infrequent updates (quarterly):
- ✅ Use `--tag-git-sha` for quarterly releases
- ✅ Clean, simple, easy bisecting
- ✅ Minimal GHCR pollution
- ✅ Human-readable frozen snapshots

For frequent updates (daily/weekly):
- ✅ Skip `--tag-git-sha` (use labels + digests)
- ✅ Avoids tag proliferation
- ✅ Still fully traceable via OCI labels

## Using Docker Images

### Pulling from GHCR

For public repositories, images can be pulled directly from GitHub Container Registry:

```bash
# Pull default (Ubuntu 24.04 CPU) image
docker pull ghcr.io/<username>/aperi-mech:latest
# or explicitly
docker pull ghcr.io/<username>/aperi-mech:ubuntu24.04

# Pull Ubuntu 24.04 GPU image (default sm_75)
docker pull ghcr.io/<username>/aperi-mech:ubuntu24.04-cuda12.6

# Pull Ubuntu 24.04 GPU image optimized for H100
docker pull ghcr.io/<username>/aperi-mech:ubuntu24.04-cuda12.6-sm90

# Pull Ubuntu 24.04 GPU image optimized for A100
docker pull ghcr.io/<username>/aperi-mech:ubuntu24.04-cuda12.6-sm80

# Pull Rocky 9 CPU image
docker pull ghcr.io/<username>/aperi-mech:rocky9

# Pull Ubuntu 22.04 GPU image with specific architecture
docker pull ghcr.io/<username>/aperi-mech:ubuntu22.04-cuda12.6-sm75
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
# Ubuntu 24.04 CPU image with host path mounted
docker run -it -v /folder/path:/home/amech_docker/host_folder aperi-mech:ubuntu24.04

# Ubuntu 24.04 GPU image with GPU support and host mount
docker run --gpus all -it -v /folder/path:/home/amech_docker/host_folder aperi-mech:ubuntu24.04-cuda12.6

# Rocky 9 CPU image
docker run -it aperi-mech:rocky9

# Ubuntu 22.04 GPU image
docker run --gpus all -it aperi-mech:ubuntu22.04-cuda12.6

# Using the default 'latest' tag (Ubuntu 24.04 CPU)
docker run -it aperi-mech:latest
```

### What's Included in Docker Images

The Docker images use **sparse checkout** to include only the development environment tools:

- ✅ `tools/` directory (Python packages, Spack extensions)
- ✅ Pre-built dependencies (Trilinos, Kokkos, Eigen, etc.)
- ✅ Build environment (compilers, CMake, Spack)
- ❌ amech source code (not included)
- ❌ amech-pro source code (not included)

**Note**: The `.git` folder is removed during build for security and to minimize image size.

### Using the Development Environment

The images contain all dependencies needed to build amech. To use them:

```bash
# Start container with your amech source mounted
docker run -it \
  -v $(pwd):/home/amech_docker/workspace \
  aperi-mech:latest

# Inside the container
cd /home/amech_docker/workspace
source /home/amech_docker/amech/venv/bin/activate

# Configure and build your code
./do_configure --p release

# Build
cd build/Release
make -j 4
```

## Developer Notes

### Building Docker Images Manually

**Recommended**: Use the `build_and_push_images.sh` script for consistent builds:

```bash
# Build Ubuntu 24.04 CPU image
./build_and_push_images.sh

# Build Rocky 9 GPU image (default sm_75)
./build_and_push_images.sh --distro rocky9 --gpu

# Build Ubuntu 24.04 GPU image for H100
./build_and_push_images.sh --gpu --cuda-arch 90

# Build Ubuntu 22.04 CPU image
./build_and_push_images.sh --distro ubuntu22.04

# See all options
./build_and_push_images.sh --help
```

For manual builds without the script:

```bash
# Ubuntu 24.04 CPU
docker buildx build --ssh default --platform linux/amd64 --load \
  -t aperi-mech:ubuntu24.04 -f Dockerfile_AMech_Ubuntu2404 . --progress=plain

# Ubuntu 22.04 GPU with T4 (compute capability 7.5)
docker buildx build --ssh default --platform linux/amd64 --load \
  --build-arg CUDA_ARCH=75 -t aperi-mech:ubuntu22.04-cuda12.6 \
  -f Dockerfile_AMech_Ubuntu2204_Nvidia . --progress=plain

# Rocky 9 CPU
docker buildx build --ssh default --platform linux/amd64 --load \
  -t aperi-mech:rocky9 -f Dockerfile_AMech_RockyLinux9 . --progress=plain

# Rocky 10 GPU with H100 (compute capability 9.0)
docker buildx build --ssh default --platform linux/amd64 --load \
  --build-arg CUDA_ARCH=90 -t aperi-mech:rocky10-cuda12.6 \
  -f Dockerfile_AMech_RockyLinux10_Nvidia . --progress=plain
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

## File Organization

### Dockerfile Naming Convention

All Dockerfiles follow the pattern: `Dockerfile_AMech_<OS><Version>[_Nvidia]`

- **CPU images**: `Dockerfile_AMech_<OS><Version>`
  - Example: `Dockerfile_AMech_Ubuntu2404`, `Dockerfile_AMech_RockyLinux9`
- **GPU images**: `Dockerfile_AMech_<OS><Version>_Nvidia`
  - Example: `Dockerfile_AMech_Ubuntu2404_Nvidia`, `Dockerfile_AMech_RockyLinux9_Nvidia`

### Image Tag Convention

Tags follow Docker best practices: `<repository>:<distro>[-cuda<version>][-sm<arch>]`

- **Format**: `aperi-mech:<os><version>[-cuda<cuda_version>][-sm<arch>]`
- **Examples**:
  - `aperi-mech:ubuntu24.04` (CPU)
  - `aperi-mech:ubuntu24.04-cuda12.6` (GPU, default sm_75)
  - `aperi-mech:ubuntu24.04-cuda12.6-sm90` (GPU, H100 optimized)
- **Benefits**:
  - Clear OS and version identification
  - Explicit CUDA version for GPU images
  - Optional architecture suffix for optimized builds
  - Predictable and easy to automate
  - Consistent with industry standards

### Supported Configurations

The build script validates distro selections against supported configurations:
- `ubuntu22.04`, `ubuntu24.04`, `rocky9`, `rocky10`
- Each supports both CPU and GPU (CUDA) variants
- Automatically selects the correct Dockerfile

## Choosing an Image

### By Use Case

- **Development (default)**: `ubuntu24.04` - Latest Ubuntu LTS with broadest compatibility
- **Production stability**: `ubuntu22.04` - Older LTS for conservative environments
- **Enterprise/RHEL compatibility**: `rocky9` or `rocky10` - Compatible with RHEL 9/10
- **GPU acceleration**: Add `-cuda12.6` suffix to any distro

### By GPU Architecture

GPU images can be built and tagged for specific CUDA compute capabilities:

| GPU Model | Compute Capability | Build Command | Resulting Tag |
|-----------|-------------------|---------------|---------------|
| T4, RTX 2080 | sm_75 (default) | `--gpu` | `ubuntu24.04-cuda12.6` |
| A100, RTX 3090 | sm_80 | `--gpu --cuda-arch 80` | `ubuntu24.04-cuda12.6-sm80` |
| H100 | sm_90 | `--gpu --cuda-arch 90` | `ubuntu24.04-cuda12.6-sm90` |

**Default behavior**: GPU images without `--cuda-arch` flag are built for sm_75 and tagged **without** the `-smXX` suffix for simplicity.

**Architecture-specific builds**: Use `--cuda-arch <arch>` to build optimized images that include the `-smXX` suffix in the tag.

**Why this matters**: Code compiled for a specific architecture won't run on older GPUs (e.g., sm_90 won't run on sm_75 hardware), but provides 20-40% better performance on the target architecture.

**Recommendation**:
- Use default (no `--cuda-arch` flag) for general distribution
- Use `--cuda-arch` when you know your target GPU architecture
