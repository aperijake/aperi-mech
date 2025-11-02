#!/usr/bin/env python3
"""
Test script generation without SSH connection.

Usage:
    python3 .github/actions/common/test_script_gen.py

This validates that docker_runner.py generates correct bash scripts with:
- Balanced quotes (no nesting issues)
- All commands present and inside the bash -c block
- Proper indentation and structure
"""

import re
import sys

# Import from same directory
from docker_runner import BuildConfig, DockerRunner

# Test configuration
config = BuildConfig(
    build_type="Debug",
    with_protego=False,
    gpu=True,
    code_coverage=False,
)

print("=" * 80)
print("BUILD CONFIGURATION:")
print(f"  build_type: {config.build_type}")
print(f"  with_protego: {config.with_protego}")
print(f"  gpu: {config.gpu}")
print(f"  code_coverage: {config.code_coverage}")
print(f"  build_root: {config.build_root}")
print(f"  build_path: {config.build_path}")
print(f"  configure_flags: {config.configure_flags}")
print("=" * 80)
print()

# Use the actual commands from build.py (with double quotes!)
commands = [
    'echo "Configuring build..."',
    f"./do_configure --build-type Debug {config.configure_flags}",
    'echo "Building..."',
    "cd $BUILD_PATH",
    "make -j4",
    'echo "Build complete!"',
]

# Create a DockerRunner instance (won't connect, just use for script generation)
runner = DockerRunner("127.0.0.1", "azureuser")

# Use the actual _build_docker_run_script method
script = runner._build_docker_run_script(
    config=config,
    commands=commands,
    working_dir=None,
    env_vars={},
)

print("GENERATED SCRIPT:")
print("=" * 80)
print(script)
print("=" * 80)
print()

# Test that quotes are balanced
open_singles = script.count("'")
print(f"Single quote count: {open_singles} (should be even)")
if open_singles % 2 != 0:
    print("❌ WARNING: Unbalanced single quotes!")
    sys.exit(1)
else:
    print("✓ Single quotes are balanced")

# Check for problematic nested single quotes
# Look for patterns like: echo 'something' inside bash -c '...'
bash_c_pattern = r"/bin/bash -c '([^']*(?:'[^']*'[^']*)*)'"
if re.search(r"echo\s+'[^']*'", script):
    # Check if these are inside the bash -c block
    match = re.search(bash_c_pattern, script, re.DOTALL)
    if match:
        inner_content = match.group(1)
        if "echo '" in inner_content:
            print("❌ WARNING: Found single-quoted echo inside bash -c '...'!")
            print("   This will break quote matching. Use double quotes instead.")
            sys.exit(1)

# Check that all commands appear in the script
print()
print("Checking commands are in script:")
all_found = True
for cmd in commands:
    if cmd in script:
        print(f"  ✓ Found: {cmd[:50]}...")
    else:
        print(f"  ❌ MISSING: {cmd[:50]}...")
        all_found = False

if not all_found:
    print("\n❌ Some commands are missing from the script!")
    sys.exit(1)

# Check that commands are inside the bash -c '...' block
docker_run_start = script.find("/bin/bash -c '")
docker_run_end = script.find("' || {", docker_run_start)

if docker_run_start == -1 or docker_run_end == -1:
    print("\n❌ Could not find bash -c '...' block!")
    sys.exit(1)

bash_block = script[docker_run_start:docker_run_end]
print("\nChecking commands are inside bash -c '...' block:")
all_inside = True
for cmd in commands:
    if cmd in bash_block:
        print(f"  ✓ Inside: {cmd[:50]}...")
    else:
        print(f"  ❌ OUTSIDE: {cmd[:50]}...")
        all_inside = False

if not all_inside:
    print("\n❌ Some commands are outside the bash -c block!")
    sys.exit(1)

print("\n" + "=" * 80)
print("✓ All tests passed! Script generation is correct.")
print("=" * 80)
