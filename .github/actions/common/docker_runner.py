#!/usr/bin/env python3
"""
Unified Docker execution framework for CI/CD actions.
Supports both docker-compose (old single-VM) and docker run (new VM pool) modes.
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

        if stream_output:
            print("Executing the following commands on the VM:")
            print(script)
            print("-" * 80)

        stdin, stdout, stderr = self.ssh.exec_command(script, get_pty=True)
        exit_status = stdout.channel.recv_exit_status()

        if stream_output:
            for line in stdout:
                print(line.strip())
            for line in stderr:
                print(line.strip())

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
        volume_mounts = "-v /mnt/builds:/tmp/aperi-builds"
        if config.with_protego:
            volume_mounts += " -v /mnt/builds/protego-builds:/tmp/protego-builds"

        # Build environment variables
        env_flags = []
        env_flags.append(f'-e BUILD_PATH="{config.build_path}"')
        env_flags.append(f'-e WITH_PROTEGO="{str(config.with_protego).lower()}"')
        for key, value in env_vars.items():
            env_flags.append(f'-e {key}="{value}"')
        env_str = " ".join(env_flags)

        # Setup symlinks
        symlink_setup = "ln -sf /tmp/aperi-builds build"
        if config.with_protego:
            symlink_setup += "\nln -sf /tmp/protego-builds protego-mech/build"

        # Setup working directory
        if working_dir:
            workdir_cmd = f"cd {working_dir}"
        else:
            workdir_cmd = f"cd $BUILD_PATH"

        # Build command list
        commands_str = "\n".join(commands)

        return f"""
set -e

mkdir -p /mnt/builds /mnt/builds/protego-builds

docker run --rm {gpu_flag} {volume_mounts} \\
  {env_str} \\
  {docker_image} /bin/bash -c '
    set -e
    cd /home/aperi-mech_docker/aperi-mech

    {symlink_setup}

    echo "Setting up Spack environment..."
    source /home/aperi-mech_docker/aperi-mech/venv/bin/activate
    spack env activate aperi-mech

    {workdir_cmd}

    {commands_str}
  ' || {{ echo "Command failed"; exit 1; }}
"""

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
        build_root_path = f"~/aperi-mech_host/{config.build_root}"
        build_path = f"{build_root_path}/{config.build_type}"
        if config.gpu:
            build_path += "_gpu"
        if config.code_coverage:
            build_path += "_cov"

        workdir_cmd = f"cd {working_dir}" if working_dir else f"cd {build_path}"

        # Build environment variables export
        env_exports = ""
        if env_vars:
            env_exports = "\n".join([f'export {k}="{v}"' for k, v in env_vars.items()])
            env_exports += "\n"

        # Build command list
        commands_str = "\n".join(commands)

        return f"""
set -e
cd ~/aperi-mech

docker-compose -f {compose_file} run --rm {service_name} /bin/bash -c '
    echo "Setting up Spack environment..."
    source $APERI_MECH_ROOT/venv/bin/activate
    spack env activate aperi-mech

    {env_exports}{workdir_cmd}

    {commands_str}
' || {{ echo "Command failed"; exit 1; }}
"""
