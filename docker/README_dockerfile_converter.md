# Dockerfile to Shell Script Converter

## Overview

`dockerfile_to_shell.py` is a general-purpose Python script that converts any Dockerfile into an equivalent shell script suitable for running on a VM or bare metal system.

## Features

- ✅ **Multi-line command handling** - Properly parses Dockerfile commands with `\` continuations
- ✅ **Inline comment stripping** - Removes comments within RUN commands
- ✅ **Variable preservation** - Keeps ARG variables as runtime shell variables
- ✅ **Smart sudo handling** - Automatically wraps system commands in `sudo bash -c`
- ✅ **All Dockerfile instructions** - Supports FROM, RUN, ENV, ARG, WORKDIR, USER, COPY, ADD, etc.

## Usage

```bash
# Basic usage
./dockerfile_to_shell.py Dockerfile setup.sh

# With your specific Dockerfile
./dockerfile_to_shell.py Dockerfile_AperiMech_Ubuntu2404 setup_vm.sh

# Force overwrite existing file
./dockerfile_to_shell.py Dockerfile setup.sh --force
```

## Example Output

Given this Dockerfile:

```dockerfile
ARG USER_ID=1000
RUN apt-get update && \
    apt-get install -y git
```

Generates this shell script:

```bash
USER_ID="${USER_ID:-1000}"
sudo bash -c 'apt-get update && apt-get install -y git'
```

## Files in this Directory

- **dockerfile_to_shell.py** - General-purpose converter (works with any Dockerfile)
- **setup_vm_ubuntu2404.sh** - Manually crafted setup script with nice UX features
- **setup_vm_ubuntu2404_auto.sh** - Can be auto-generated from Dockerfile for testing

## When to Use Which Script

### Use the **manual script** (setup_vm_ubuntu2404.sh) if:

- You want progress messages and colored output
- You need idempotency (can run multiple times safely)
- You want better error handling
- Setting up a VM interactively

### Use the **converter** (dockerfile_to_shell.py) if:

- You have a new Dockerfile to convert
- You need automated/scripted deployments
- You want the exact Dockerfile commands without additions
- You're working with a different Dockerfile

## Limitations

The converter handles most Dockerfile instructions, but:

- COPY/ADD instructions generate comments (manual file copy needed)
- Multi-stage builds are not fully supported
- Complex ENTRYPOINT/CMD logic may need manual adjustment

## Testing

The converter was tested on Dockerfile_AperiMech_Ubuntu2404 and successfully:

- ✅ Parsed all 25+ RUN commands correctly
- ✅ Preserved \${USER_ID} and \${GROUP_ID} variables
- ✅ Added sudo to all 6 system command chains
- ✅ Stripped inline comments from multi-line commands
- ✅ Generated a functional 211-line setup script
