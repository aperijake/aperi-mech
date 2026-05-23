# amech Tooling

## Quick Start (Linux)

> **For subsequent sessions**, just run:
>
> ```bash
> source ./activate_env.sh
> ./do_configure -p release-pro && cd amech-pro/build/Release && make -j
> ```

### Prerequisites

- Python 3.11+
- Git
- GCC/Gfortran (or Clang)
- CMake 3.20+ (CMake 4.x may cause issues with Spack dependency builds)
- Make

### Dependencies

Library dependencies (Trilinos, Kokkos, Eigen, Compadre, yaml-cpp, GoogleTest, MPI) are managed via [Spack](https://spack.io/). The setup below clones a specific Spack version and installs our `spackx` extension, which defines the amech package and pins dependency versions. You cannot use an existing Spack installation.

### First-Time Setup

1. **Clone and initialize submodules:**

   ```bash
   cd /path/to/amech
   git submodule update --init
   export amech=$(pwd)
   ```

2. **Create Python virtual environment and install tooling:**

   ```bash
   python3 -m venv venv
   source ./venv/bin/activate
   echo "export amech=$amech" >> $amech/venv/bin/activate
   pip install -e $amech/tools/python/amech -e $amech/tools/python/spackx
   ```

3. **Install and configure Spack:**

   ```bash
   mkdir -p $amech/venv/src
   git clone https://github.com/spack/spack.git $amech/venv/src/spack
   git -C $amech/venv/src/spack checkout releases/v1.1
   source $amech/venv/src/spack/share/spack/setup-env.sh
   echo "source $amech/venv/src/spack/share/spack/setup-env.sh" >> $amech/venv/bin/activate
   ```

4. **Configure Spack and patch Trilinos:**

   ```bash
   spack compiler find
   spack external find
   spack external find cmake hwloc libxml2 pkgconf bzip2 lz4 snappy zstd libaec ncurses openblas autoconf automake libtool
   spack patch-trilinos
   ```

5. **Install dependencies** (1-2 hours on first run):

   ```bash
   spack env create amech
   spacktivate amech
   spack develop --path $amech amech
   spack add amech +pro
   spack concretize
   spack install
   ```

6. **Verify setup:**

   ```bash
   spack find trilinos kokkos eigen
   ```

   You should see all three packages listed with version info.

### Building amech-pro

```bash
./do_configure -p release-pro
cd amech-pro/build/Release
make -j
```

### Building amech (without pro)

To build just the core amech library without the pro extensions:

```bash
./do_configure -p release
cd build/Release
make -j
```

See [README-CMAKE.md](../README-CMAKE.md) for build presets, GPU builds, and troubleshooting.

---

## Optional: macOS-Specific Setup

<details>
<summary>Click to expand macOS instructions</summary>

### Python via Homebrew

If your system Python is older than 3.11:

```bash
brew install python@3.11
ln -s /opt/homebrew/opt/python@3.11/bin/python3.11 /opt/homebrew/opt/python@3.11/bin/python3
```

Add to `~/.zshrc` or `~/.bash_profile`:

```bash
export PATH="/opt/homebrew/opt/python@3.11/bin:$PATH"
alias python=python3
```

### HDF5 and NetCDF Dependencies

The Python venv needs these installed first:

```bash
brew install hdf5 netcdf
```

### SSL Certificate Fix

If Spack fails with SSL certificate errors when downloading packages:

```bash
export SSL_CERT_FILE=$(brew --prefix)/etc/ca-certificates/cert.pem
export REQUESTS_CA_BUNDLE=$SSL_CERT_FILE
echo 'export SSL_CERT_FILE=$(brew --prefix)/etc/ca-certificates/cert.pem' >> $amech/venv/bin/activate
echo 'export REQUESTS_CA_BUNDLE=$SSL_CERT_FILE' >> $amech/venv/bin/activate
```

### Custom OpenMPI Build (for deployment)

When building for macOS deployment, custom OpenMPI avoids hwloc/OpenGL issues with `MPI_Init`:

```bash
export MACOSX_DEPLOYMENT_TARGET=12
spack env create openmpi_dependencies
spacktivate openmpi_dependencies
spack add hwloc libevent pmix@5:5
spack concretize --force --fresh
spack install

cd $amech/tools/openmpi
rm -rf openmpi-5.0.10                      # clean old build
rm -rf ~/local/openmpi-5.0.10-with-hwloc   # clean old install
./download_and_build.sh
```

After building, declare the installed OpenMPI as external in `~/.spack/packages.yaml` or the relevant environment file.

### Deployment Target

For macOS deployment builds, set before any Spack operations:

```bash
export MACOSX_DEPLOYMENT_TARGET=12
```

</details>

---

## Optional: AMD GPU (ROCm/HIP) Setup

<details>
<summary>Click to expand AMD GPU instructions</summary>

### Prerequisites

- ROCm 7.x installed (e.g., via the [AMD ROCm apt repository](https://rocm.docs.amd.com/en/latest/deploy/linux/installer/install.html))
- `hipcc --version` works
- Know your GPU architecture target (e.g., `gfx942` for MI300X, `gfx90a` for MI250X)

### Additional System Packages

Install the same dev libraries needed for the CPU build, plus ROCm:

```bash
sudo apt install build-essential gfortran cmake git git-lfs \
  libaec-dev libbz2-dev libcurl4-openssl-dev libhwloc-dev liblz4-dev \
  libncurses-dev libopenblas-dev libsnappy-dev libssl-dev libtool \
  libxml2-dev libzstd-dev autoconf automake pkgconf
```

### Register ROCm Externals in Spack

After completing steps 1-4 of the [First-Time Setup](#first-time-setup), register ROCm packages as Spack externals. `spack external find` does not reliably detect all ROCm components, so add them manually to `~/.spack/packages.yaml`:

```bash
ROCM_VER=$(cat /opt/rocm/.info/version 2>/dev/null || echo "7.1.0")

cat >> ~/.spack/packages.yaml << EOF
  hip:
    externals:
    - spec: hip@${ROCM_VER}
      prefix: /opt/rocm
    buildable: false
  hsa-rocr-dev:
    externals:
    - spec: hsa-rocr-dev@${ROCM_VER}
      prefix: /opt/rocm
    buildable: false
  rocblas:
    externals:
    - spec: rocblas@${ROCM_VER}
      prefix: /opt/rocm
    buildable: false
  rocthrust:
    externals:
    - spec: rocthrust@${ROCM_VER}
      prefix: /opt/rocm
    buildable: false
  rocprim:
    externals:
    - spec: rocprim@${ROCM_VER}
      prefix: /opt/rocm
    buildable: false
  comgr:
    externals:
    - spec: comgr@${ROCM_VER}
      prefix: /opt/rocm
    buildable: false
EOF
```

**Important:** Check that `spack external find` didn't already add `llvm-amdgpu` to `packages.yaml`. If it did, update its prefix to `/opt/rocm` and add `buildable: false` rather than appending a duplicate entry. If it wasn't detected, add it:

```yaml
llvm-amdgpu:
  externals:
    - spec: llvm-amdgpu@7.1.0
      prefix: /opt/rocm
      extra_attributes:
        compilers:
          c: /usr/bin/amdclang
          cxx: /usr/bin/amdclang++
          fortran: /usr/bin/amdflang
  buildable: false
```

### Install Dependencies with ROCm (Step 5)

Replace step 5 of the First-Time Setup with the ROCm variant. Substitute your GPU architecture for `gfx942`:

```bash
spack env create amech
spacktivate amech
spack develop --path $amech amech
spack add amech ~openmp +rocm amdgpu_target=gfx942
spack concretize -f
spack install
```

### Building amech with ROCm

```bash
./do_configure -p release
cd build/Release
make -j
```

### Docker Images

AMD GPU Docker images are available. See [docker/README.md](../docker/README.md) for details.

```bash
cd docker/
./build_and_push_images.sh --distro ubuntu24.04 --amd --amd-arch gfx942
```

Run containers with AMD GPU device access:

```bash
docker run --device /dev/kfd --device /dev/dri -it aperi-mech:ubuntu24.04-rocm7.1
```

### Known Issues

- **Spack version:** Using Spack `releases/v1.1` branch. ROCm package recipes are up-to-date in this version.
- **kokkos-kernels:** Does not have `+rocm` or `amdgpu_target` variants — it picks up ROCm support through its dependency on `kokkos`.

</details>

---

## Optional: Updating Dependencies (CI/CD Maintainers)

<details>
<summary>Click to expand dependency update workflow</summary>

This section documents how to update major Spack-managed dependencies (Trilinos, Kokkos, Eigen, Compadre, etc.) across all development and CI/CD environments.

### Overview: What Needs Updates

| Environment       | Update Required? | Reason                              |
| ----------------- | ---------------- | ----------------------------------- |
| Local Development | YES              | Spack environment needs rebuild     |
| Docker Images     | YES              | Dependencies pre-compiled in images |
| macOS Build VM    | YES              | Uses same Spack environment         |
| Azure CI/CD VMs   | NO               | Pull Docker images automatically    |

### Dependency Configuration

All Spack-managed dependencies are defined in:

```
tools/python/spackx/src/spackx/repos/amech/packages/amech/dependencies.json
```

Example entry (Trilinos):

```json
{
  "name": "trilinos",
  "spec": "trilinos@develop git_commit=a79795b... ~amesos ~amesos2 ... +stk +zoltan +zoltan2 cxxstd=17"
}
```

**Common dependencies you might update:**

- `trilinos` - Core solver library with STK mesh
- `kokkos` / `kokkos-kernels` - Performance portability layer
- `eigen` - Linear algebra
- `compadre` - Meshless methods
- `yaml-cpp` - Configuration parsing
- `googletest` - Testing framework

### Step 1: Update dependencies.json

Edit the dependency specification in `dependencies.json`. For version updates:

```json
// Update commit hash
"spec": "trilinos@develop git_commit=NEW_COMMIT_HASH ..."

// Or update version tag
"spec": "kokkos@4.8.00 cxxstd=17"
```

### Step 2: Rebuild Local Development Environment

```bash
source $amech/venv/bin/activate
spack env activate amech

# Force re-concretization to pick up new dependency versions
spack concretize --force

# Rebuild affected packages
spack install

# Verify installation
spack find trilinos kokkos eigen
```

**Note:** For major version changes, you may need to also update the Trilinos spack patch. See [Updating the Trilinos Spack Patch](#updating-the-trilinos-spack-patch) below.

### Step 3: Commit and Push to a Branch

Before rebuilding Docker images on a remote machine, commit and push your changes to a branch (not `main`) so they can be pulled without triggering the full CI/CD pipeline:

```bash
git checkout -b update_trilinos
git add tools/python/spackx/src/spackx/repos/amech/packages/amech/dependencies.json
git commit -m "Update Trilinos to commit XXXXXXX"
git push -u origin update_trilinos
```

### Step 4: Rebuild Docker Images

After verifying locally and pushing changes, rebuild the Docker images used by CI/CD.

#### Priority Images (Required for CI/CD)

These images are actively used in the CI/CD pipeline and must be rebuilt.

**Note:** Verify current priority images by reviewing `.github/workflows/ci-cd-pipeline.yaml` and `.github/actions/common/docker_runner.py` as these may change over time.

| Image                             | Used By                  | Architecture |
| --------------------------------- | ------------------------ | ------------ |
| `ubuntu22.04-amd64`               | CPU tests, code coverage | AMD64        |
| `rocky9-amd64`                    | CPU tests (Rocky)        | AMD64        |
| `ubuntu24.04-cuda12.6-sm75-amd64` | GPU tests on Azure VMs   | AMD64        |

#### Building AMD64 Images (on Azure VM)

AMD64 images must be built on an AMD64 machine. Use the `AperiAzureGPU2` Azure VM:

```bash
# SSH to the Azure VM
ssh -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@<VM_IP>

# Navigate to the amech directory and pull your branch
cd ~/amech
git fetch origin
git checkout update_trilinos

# Build and push priority CPU images
cd docker/
./build_and_push_images.sh --distro ubuntu22.04 --branch update_trilinos --push
./build_and_push_images.sh --distro rocky9 --branch update_trilinos --push

# Build and push GPU image (used by Azure CI/CD VMs)
./build_and_push_images.sh --distro ubuntu24.04 --gpu --cuda-arch 75 --branch update_trilinos --push
```

#### Building ARM64 Images (on Apple Silicon Mac)

ARM64 images can be built locally on Apple Silicon Macs:

```bash
cd docker/

# ARM64 is only supported for ubuntu24.04 and rocky10
./build_and_push_images.sh --distro ubuntu24.04 --branch update_trilinos --platform arm64 --push
./build_and_push_images.sh --distro rocky10 --branch update_trilinos --platform arm64 --push
```

**Note:** ARM64 builds are NOT supported for ubuntu22.04 or rocky9 due to PyQt6 wheel availability.

#### Full Image Matrix

| Distro      | CPU (AMD64) | CPU (ARM64)   | GPU (AMD64) |
| ----------- | ----------- | ------------- | ----------- |
| ubuntu22.04 | Priority    | Not supported | Optional    |
| ubuntu24.04 | Optional    | Optional      | Priority    |
| rocky9      | Priority    | Not supported | Optional    |
| rocky10     | Optional    | Optional      | Optional    |

**Estimated time:** 2-4 hours per image (Trilinos compilation is slow)

#### Build Options

- `--no-cache` - Force clean rebuild (use if build cache is stale)
- `--tag-git-sha` - Create frozen snapshot tag with git SHA
- `--cuda-arch 80` - Build for specific GPU architecture (default: 75 for T4)

### Step 5: Update macOS Build Environment

On the macOS Build VM (`AMech-Build`):

**CRITICAL:** Set `MACOSX_DEPLOYMENT_TARGET=12` before any Spack operations. This ensures all libraries are built targeting the same minimum macOS version. Failing to set this consistently can cause runtime crashes due to ABI incompatibilities between libraries.

**CRITICAL:** Remove old Spack package builds before rebuilding. Spack may pick up stale cached builds of Trilinos or other packages, causing hard-to-debug runtime errors (e.g., "Different mesh_meta_data" STK crashes). Use `spack gc` to garbage collect unused packages, or for a clean slate, remove and recreate the environment entirely.

```bash
cd ~/amech
git fetch origin
git checkout update_trilinos

source venv/bin/activate

# CRITICAL: Set deployment target before rebuilding
export MACOSX_DEPLOYMENT_TARGET=12

# CRITICAL: Remove old package builds to avoid stale cache issues
spack env activate amech
spack gc  # Garbage collect unused packages

# For a completely clean rebuild, consider removing and recreating the environment:
# spack env deactivate
# spack env remove amech
# spack gc  # Garbage collect unused packages
# spack env create amech
# spacktivate amech
# spack develop --path $amech amech
# spack add amech

# Force re-concretization and rebuild
spack concretize --force --fresh
spack install

# Verify correct versions are installed
spack find trilinos kokkos
```

**Estimated time:** 1-2 hours for major dependency rebuild

### Step 6: Create PR and Verify CI/CD Pipeline

After Docker images are rebuilt and pushed, create a pull request to merge your branch to `main`:

```bash
gh pr create --title "Update Trilinos to commit XXXXXXX" --body "Updated Trilinos dependency and rebuilt Docker images."
```

Merge the PR to trigger the full CI/CD pipeline. Verify in GitHub Actions:

- [ ] CPU tests pass (Ubuntu, Rocky)
- [ ] GPU tests pass (Azure VMs)
- [ ] Package builds succeed (DEB, RPM)
- [ ] Deployment tests pass

### Azure VMs: No Update Required

The Azure CI/CD VMs (`CICD-NCasT4v3`, etc.) **do not need updates** when dependencies change:

1. VMs only provide Docker runtime + NVIDIA GPU drivers
2. All dependencies live inside Docker images
3. VMs automatically pull fresh images from GHCR on each workflow run
4. VM temp storage is wiped on deallocation

**Exception:** Update `scripts/setup-new-vm.sh` only if:

- New CUDA version required -> Update Dockerfiles first
- New NVIDIA driver version required (rare)

### Troubleshooting

**Spack concretization fails:**

```bash
# Check for conflicts
spack spec amech

# View detailed error
spack concretize --force 2>&1 | less
```

**Docker build fails on Trilinos:**

- Check if Spack patches need updating: `tools/python/spackx/src/spackx/patches/`
- Verify Kokkos version compatibility with Trilinos

**API changes break amech build:**

- Check Trilinos release notes for breaking changes
- Update amech source code as needed
- Run unit tests locally before pushing

### Version Compatibility Matrix

Keep these packages in sync:

| Package        | Tested With    | Notes                            |
| -------------- | -------------- | -------------------------------- |
| Trilinos       | develop branch | Pin to specific commit           |
| Kokkos         | 4.7.x          | Must match Trilinos requirements |
| Kokkos-Kernels | 4.7.x          | Same version as Kokkos           |
| Eigen          | master         | Pin to specific commit           |
| Compadre       | master         | Pin to specific commit           |

### Updating the Trilinos Spack Patch

The builtin Spack Trilinos package may not support all features needed by amech (e.g., newer C++ standards, updated Kokkos version requirements). We maintain a patch file to extend the builtin package.

**Patch file location:** `tools/python/spackx/src/spackx/patches/releases-v1.1.patch`

Patch files are named after the spack branch: `{branch-with-slashes-replaced-by-dashes}.patch`. For tag checkouts (e.g., `v1.1.1`), the patch system maps to the corresponding release branch (e.g., `releases/v1.1`).

**When to update the patch:**

- Adding support for new C++ standards (e.g., `cxxstd=20`)
- Updating Kokkos/Kokkos-Kernels version requirements for Trilinos master
- Fixing other Trilinos package issues not yet upstream

**How to update the patch:**

1. **Identify what needs changing** in the builtin Trilinos package:

   ```bash
   # Find and view the builtin package (location varies by spack version)
   spack location -p trilinos
   cat $(spack location -p trilinos)/package.py
   ```

2. **Edit the patch file** at `tools/python/spackx/src/spackx/patches/releases-v1.1.patch`. The patch uses unified diff format with paths relative to the builtin repo root (e.g., `packages/trilinos/package.py`).

3. **Reset and re-apply the patch:**

   ```bash
   # Remove the breadcrumb file that tracks patch status
   rm $(spack location -p trilinos)/.amech-patched

   # Re-apply the updated patch
   spack patch-trilinos
   ```

4. **Verify the patch was applied:**

   ```bash
   # Check that your changes are in the package
   grep -A2 "cxxstd" $(spack location -p trilinos)/package.py | head -5
   ```

5. **Re-concretize and rebuild:**

   ```bash
   spack concretize --force
   spack install
   ```

**Patch file format tips:**

- Each hunk starts with `@@` showing line numbers
- Include 3 lines of context before and after changes
- Lines starting with `-` are removed, `+` are added
- Ensure the patch applies cleanly to the current spack version

</details>

---

## Related Documentation

- [README-CMAKE.md](../README-CMAKE.md) - CMake build system, presets, and options
- [docker/README.md](../docker/README.md) - Docker image building and testing
- [AGENTS.md](../AGENTS.md) - Build commands and project structure
