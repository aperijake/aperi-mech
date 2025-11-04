#!/usr/bin/env python3
"""
Unified Docker execution framework for CI/CD actions.
Supports both docker-compose (old single-VM) and docker run (new VM pool) modes.

Test script generation locally:
    cd .github/actions/common && python3 test_script_gen.py
"""

import os
from dataclasses import dataclass
from typing import Dict, List, Optional

import paramiko


def str_to_bool(value: str) -> bool:
    """Convert string to boolean."""
    return value.lower() in ("true", "1", "t", "y", "yes")


@dataclass
class BuildConfig:
    """Configuration for build paths and flags."""

    build_type: str  # "Debug" or "Release"
    with_protego: bool
    gpu: bool
    code_coverage: bool = False

    @property
    def build_root(self) -> str:
        """Get the build root directory."""
        return "protego-mech/build" if self.with_protego else "build"

    @property
    def build_path(self) -> str:
        """Get the full build path including type and flags."""
        path = f"{self.build_root}/{self.build_type}"
        if self.gpu:
            path += "_gpu"
        if self.code_coverage:
            path += "_cov"
        return path

    @property
    def configure_flags(self) -> str:
        """Get configure flags as a string."""
        flags = []
        if self.with_protego:
            flags.append("--protego-mech")
        if self.gpu:
            flags.append("--gpu")
        if self.code_coverage:
            flags.append("--code-coverage")
        return " ".join(flags)


class DockerRunner:
    """
    Executes commands in Docker containers via SSH.
    Supports both docker-compose and docker run modes.
    """

    def __init__(
        self, vm_ip: str, vm_username: str, ssh_key_path: Optional[str] = None
    ):
        self.vm_ip = vm_ip
        self.vm_username = vm_username
        self.ssh_key_path = ssh_key_path or os.path.expanduser("~/.ssh/id_rsa")
        self.ssh = None

    def connect(self):
        """Establish SSH connection to VM."""
        self.ssh = paramiko.SSHClient()
        known_hosts_path = os.path.expanduser("~/.ssh/known_hosts")
        if os.path.exists(known_hosts_path):
            self.ssh.load_host_keys(known_hosts_path)
        self.ssh.set_missing_host_key_policy(paramiko.RejectPolicy())
        self.ssh.connect(self.vm_ip, username=self.vm_username, timeout=60)
        transport = self.ssh.get_transport()
        transport.set_keepalive(30)

    def close(self):
        """Close SSH connection."""
        if self.ssh:
            self.ssh.close()

    def run_in_docker(
        self,
        config: BuildConfig,
        commands: List[str],
        vm_pool: bool = False,
        working_dir: Optional[str] = None,
        env_vars: Optional[Dict[str, str]] = None,
        stream_output: bool = True,
    ) -> int:
        """
        Execute commands inside Docker container.

        Args:
            config: Build configuration
            commands: List of bash commands to run
            vm_pool: Use docker run (True) or docker-compose (False)
            working_dir: Working directory inside container (relative to /home/aperi-mech_docker/aperi-mech)
            env_vars: Additional environment variables to pass to container
            stream_output: Print output in real-time

        Returns:
            Exit status code
        """
        env_vars = env_vars or {}

        if vm_pool:
            script = self._build_docker_run_script(
                config, commands, working_dir, env_vars
            )
        else:
            script = self._build_docker_compose_script(
                config, commands, working_dir, env_vars
            )

        # if stream_output:
        # print("Executing the following commands on the VM:")
        # Redact sensitive environment variable values before printing the script
        # Redact any env var whose key indicates it may be sensitive
        # redacted_env_vars = dict(env_vars)
        # SENSITIVE_PATTERNS = ("SECRET", "TOKEN", "PASSWORD", "KEY")
        # for key in redacted_env_vars:
        #     if any(pat in key.upper() for pat in SENSITIVE_PATTERNS):
        #         redacted_env_vars[key] = "<hidden>"
        # if vm_pool:
        #     masked_script = self._build_docker_run_script(
        #         config, commands, working_dir, redacted_env_vars
        #     )
        # else:
        #     masked_script = self._build_docker_compose_script(
        #         config, commands, working_dir, redacted_env_vars
        #     )
        # print(masked_script)
        # print("-" * 80)

        _, stdout, stderr = self.ssh.exec_command(script, get_pty=True)

        # Stream output in real-time instead of waiting for exit first
        if stream_output:
            for line in stdout:
                print(line.strip())
            for line in stderr:
                print(line.strip())

        # Now get exit status after reading output
        exit_status = stdout.channel.recv_exit_status()

        return exit_status

    def _build_docker_run_script(
        self,
        config: BuildConfig,
        commands: List[str],
        working_dir: Optional[str],
        env_vars: Dict[str, str],
    ) -> str:
        """Build script for docker run (VM pool mode)."""
        docker_image = "ghcr.io/aperijake/aperi-mech:cuda-t4"
        gpu_flag = "--gpus all" if (config.gpu and not config.code_coverage) else ""

        # Setup volume mounts
        # Mount the PR code from /mnt/aperi-mech-ci to /source in container
        # This preserves the container's /home/aperi-mech_docker/aperi-mech (which has venv)
        volume_mounts = "-v /mnt/aperi-mech-ci:/source"

        # Build environment variables
        env_flags = []
        env_flags.append(f'-e BUILD_PATH="{config.build_path}"')
        env_flags.append(f'-e WITH_PROTEGO="{str(config.with_protego).lower()}"')
        for key, value in env_vars.items():
            env_flags.append(f'-e {key}="{value}"')
        env_str = " ".join(env_flags)

        # Setup working directory - comes AFTER Spack activation, not before
        # If working_dir is specified, use it; otherwise stay at repo root
        # (build directory will be created by configure, then we cd into it)
        if working_dir:
            workdir_cmd = f"cd {working_dir}"
        else:
            # Don't cd to build_path automatically - let the caller's commands do it
            workdir_cmd = ""

        # Build command list with proper indentation
        commands_indented = "\n    ".join(commands)

        # Build the complete script in one go to avoid quote issues
        workdir_section = f"\n    {workdir_cmd}" if workdir_cmd else ""

        script = f"""
set -e

docker run --rm {gpu_flag} {volume_mounts} \\
  {env_str} \\
  {docker_image} /bin/bash -c '
    set -e

    echo "Setting up Spack environment..."
    source /home/aperi-mech_docker/aperi-mech/venv/bin/activate
    spack env activate aperi-mech

    echo "Changing to source directory..."
    cd /source{workdir_section}

    {commands_indented}
  ' || {{ echo "Command failed"; exit 1; }}
"""

        return script

    def _build_docker_compose_script(
        self,
        config: BuildConfig,
        commands: List[str],
        working_dir: Optional[str],
        env_vars: Dict[str, str],
    ) -> str:
        """Build script for docker-compose (old single-VM mode)."""
        compose_file = "docker/docker-compose.yml"
        service_name = "aperi-mech-development"
        if config.gpu and not config.code_coverage:
            compose_file = "docker/docker-compose_nvidia.yml"
            service_name = "aperi-mech-gpu-development"

        # Build working directory
        # The docker-compose working_dir is /home/aperi-mech_docker/aperi-mech_host
        # Use absolute path to avoid tilde expansion issues
        build_root_path = f"/home/aperi-mech_docker/aperi-mech_host/{config.build_root}"
        build_path = f"{build_root_path}/{config.build_type}"
        if config.gpu:
            build_path += "_gpu"
        if config.code_coverage:
            build_path += "_cov"

        # Don't cd to build directory yet - let do_configure create it first
        # Only cd if working_dir is explicitly specified
        workdir_section = f"\n    cd {working_dir}" if working_dir else ""

        # Build environment variables export with proper indentation
        # Always export BUILD_PATH so scripts can use it
        env_exports = f'export BUILD_PATH="{build_path}"'
        if env_vars:
            env_exports += "\n    " + "\n    ".join(
                [f'export {k}="{v}"' for k, v in env_vars.items()]
            )

        # Build command list with proper indentation
        commands_indented = "\n    ".join(commands)

        return f"""
set -e
cd ~/aperi-mech

docker-compose -f {compose_file} run --rm {service_name} /bin/bash -c '
    set -e

    echo "Setting up Spack environment..."
    source $APERI_MECH_ROOT/venv/bin/activate
    spack env activate aperi-mech

    {env_exports}{workdir_section}

    {commands_indented}
' || {{ echo "Command failed"; exit 1; }}
"""
