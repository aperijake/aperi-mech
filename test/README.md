# aperi-mech Tests

This directory contains tests for the core aperi-mech mechanics engine (open source).

## Directory Structure

```
test/
├── unit_tests/         # C++ unit tests using Google Test
├── regression_tests/   # End-to-end regression tests
├── performance_tests/  # Performance benchmarking tests
├── material_tests/     # Material model validation tests
└── utils/              # Test utilities and helper scripts
```

## Test Types

### Unit Tests (`unit_tests/`)

- **Language**: C++ with Google Test framework
- **Purpose**: Test individual components and functions in isolation
- **Run locally**:
  ```bash
  cd build/Debug  # or build/Release
  mpirun -n 1 ./unit_tests
  mpirun -n 3 ./unit_tests  # parallel
  ```
- **CI/CD**: Runs on every PR and push to main (both serial and parallel)

### Regression Tests (`regression_tests/`)

- **Language**: Python scripts that run aperi-mech simulations
- **Purpose**: End-to-end validation of simulation results against gold standards
- **Run locally**:
  ```bash
  python test/run_regression_tests.py --parallel
  ```
- **CI/CD**: Runs on every PR and push to main (both serial and parallel)

### Performance Tests (`performance_tests/`)

- **Language**: C++ with Google Benchmark
- **Purpose**: Track performance regressions and optimize hot paths
- **Run locally**:
  ```bash
  cd build/Release
  ./performance_tests
  ```
- **CI/CD**: Runs in separate performance pipeline after CI/CD completes on main

### Material Tests (`material_tests/`)

- **Purpose**: Validate material model implementations
- **Run locally**:
  ```bash
  ./test/run_material_tests.sh
  ```
- **CI/CD**: Runs on every PR and push to main

## Running Tests Locally

### Prerequisites

- Built aperi-mech (see main README.md)
- Spack environment activated
- Python virtual environment activated (for regression tests)

### Run All Tests

```bash
# Unit tests
cd build/Debug && mpirun -n 1 ./unit_tests

# Regression tests
python test/run_regression_tests.py

# Material tests
./test/run_material_tests.sh
```

## CI/CD Integration

Tests run automatically via [.github/workflows/ci-cd-pipeline.yaml](../.github/workflows/ci-cd-pipeline.yaml).

Build matrix:

- Build types: Debug, Release
- GPU support: with/without GPU
- Protego: with/without proprietary algorithms

All tests run for each configuration except:

- Parallel tests only run for non-GPU builds (GPU tests run serial only)

## Adding New Tests

### Unit Tests

1. Add new `*Test.cpp` file to `unit_tests/`
2. Use Google Test macros (TEST, TEST_F, etc.)
3. Link against GoogleTest in CMakeLists.txt
4. Tests automatically discovered and run

### Regression Tests

1. Add new test directory to `regression_tests/`
2. Include input files and Python comparison script
3. Update `run_regression_tests.py` if needed
4. Add gold results (expected outputs)

### Performance Tests

1. Add benchmark to `performance_tests/gtests/`
2. Use Google Benchmark macros
3. Results automatically tracked via GitHub Pages
