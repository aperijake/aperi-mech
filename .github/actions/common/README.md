# Common CI/CD Libraries

Shared code for GitHub Actions workflows.

## Files

### `docker_runner.py`

Core library for executing commands in Docker containers via SSH.

**Features:**

- Supports both `docker-compose` (old single-VM) and `docker run` (new VM pool) modes
- Handles SSH connections, script generation, and output streaming
- Centralized `BuildConfig` for consistent path computation

**Testing:**

```bash
cd .github/actions/common && python3 test_script_gen.py
```

Run this after making changes to validate script generation.

### `test_script_gen.py`

Development tool to test bash script generation without SSH/VM access.

**Validates:**

- Quote balancing (prevents nested quote bugs)
- All commands are inside the `bash -c` block
- Proper indentation and structure

**Usage:**

```bash
# From repo root:
python3 .github/actions/common/test_script_gen.py

# Should output: "✓ All tests passed!"
```

## Architecture

```text
build.py / run_tests.py
    ↓ (builds command list)
docker_runner.py
    ↓ (generates bash script)
SSH → VM → Docker container
```

The complex logic (script generation, SSH, quoting) is in `docker_runner.py`.
The action scripts (`build.py`, `run_tests.py`) are thin wrappers that just construct command lists.

### Two-Repo Architecture (VM Pool Mode)

For VM pool GPU tests, we use a two-repository architecture:

1. **Container's built-in repo** (`/home/aperi-mech_docker/aperi-mech`):
   - Baked into Docker image
   - Provides: venv, Spack environment, build tools
   - Never modified - used only for environment setup

2. **PR code repo** (`/mnt/aperi-mech-ci` on VM, mounted as `/source` in container):
   - Cloned/updated by `build.py` before building
   - Contains: PR code being tested (including submodules)
   - Ephemeral: Cleared when VM deallocates
   - This is where builds and tests execute

**Workflow**:

```bash
# 1. build.py clones/updates PR code on VM
cd /mnt/aperi-mech-ci && git checkout <PR_SHA>

# 2. docker_runner.py mounts it into container
docker run -v /mnt/aperi-mech-ci:/source ...

# 3. Inside container: source env from built-in, work from mounted
source /home/aperi-mech_docker/aperi-mech/venv/bin/activate
cd /source
./do_configure && make
```

## Debugging Tips

**Script not executing commands?**

1. Run `test_script_gen.py` - check quotes are balanced
2. Verify commands use double quotes (`echo "text"`) not single quotes
3. Check that all commands are shown in "Checking commands are inside bash -c block"

**Path issues (directory not found)?**

1. Check `BuildConfig.build_path` computation
2. Ensure commands use `$BUILD_PATH` environment variable (not hardcoded paths)
3. Verify `/mnt/aperi-mech-ci` exists and has PR code (VM pool mode)

**SSH connection issues?**

1. For local testing: `eval "$(ssh-agent -s)" && ssh-add ~/.ssh/your_key`
2. Check known_hosts: `ssh-keyscan -H VM_IP >> ~/.ssh/known_hosts`
3. Verify paramiko can use ssh-agent: set `allow_agent=True` in `connect()`
