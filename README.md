# aperi-mech

An open-source platform for computational mechanics.

## Building with Spack

### Preliminary

Currently, has only been tested on one M1 Mac machine with:

- `gcc@13.2.0` from Homebrew
- `apple-clang@15.0.0` from Xcode
- `cmake@3.26.4` from Conda

For code coverage, be sure `gcov` is using from the same version of gcc. I had to:

```bash
ln -s /opt/homebrew/bin/gcov-13 /opt/homebrew/bin/gcov
```

Then setup with:

```bash
# Add Homebrew compilers
spack compiler find

# Use external CMake (problems building CMake with Spack)
spack external find

# Create and activate a spack environment for the project
spack env create aperi-mech
spacktivate aperi-mech
```

### Add Required Packages

```bash
# Trilinos
spack add trilinos +boost +exodus +gtest +hdf5 +stk +zoltan +zoltan2 %gcc ^openblas%apple-clang

# GTest
spack add googletest@1.12.1%gcc@13.2.0

# LCOV
spack add lcov %gcc@13.2.0

# yaml-cpp
spack add yaml-cpp %gcc@13.2.0
```

### Install Packages

```bash
spack install
```
