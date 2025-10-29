#!/usr/bin/env python3
"""
Dockerfile to Shell Script Converter

This script parses a Dockerfile and generates an equivalent shell script
that can be run on a fresh VM or system to replicate the Docker environment.

Usage:
    python dockerfile_to_shell.py <dockerfile_path> [output_script_path]

Example:
    python dockerfile_to_shell.py Dockerfile setup.sh
"""

import argparse
import re
import sys
from pathlib import Path
from typing import Dict, List


class DockerfileParser:
    """Parse Dockerfile and convert to shell script"""

    def __init__(self, dockerfile_path: str):
        self.dockerfile_path = Path(dockerfile_path)
        self.script_lines: List[str] = []
        self.env_vars: Dict[str, str] = {}
        self.args: Dict[str, str] = {}
        self.workdir = "~"
        self.user = "${USER}"

    def parse(self) -> str:
        """Parse the Dockerfile and return a shell script"""
        with open(self.dockerfile_path, "r") as f:
            content = f.read()

        # Add shell script header
        self._add_header()

        # Parse multi-line commands (lines ending with \)
        lines = self._parse_multiline_commands(content)

        # Process each Dockerfile instruction
        for line in lines:
            line = line.strip()

            # Skip empty lines and comments
            if not line or line.startswith("#"):
                # Preserve comments
                if line.startswith("#"):
                    self.script_lines.append(line)
                continue

            # Parse the instruction
            self._parse_instruction(line)

        # Add footer
        self._add_footer()

        return "\n".join(self.script_lines)

    def _parse_multiline_commands(self, content: str) -> List[str]:
        """Parse Dockerfile content handling multi-line commands"""
        lines = content.split("\n")
        parsed_lines = []
        current_line = ""
        in_multiline = False

        for line in lines:
            stripped = line.rstrip()

            # Check if this is a continuation line
            continues = stripped.endswith("\\")

            if continues:
                in_multiline = True
                stripped = stripped[:-1].rstrip()  # Remove trailing \

            # If we're in a multiline command and this line is just a comment, skip it
            if in_multiline and stripped.lstrip().startswith("#"):
                continue

            if current_line:
                current_line += " " + stripped.lstrip()
            else:
                current_line = stripped

            # Check if line no longer continues
            if not continues:
                if current_line:
                    parsed_lines.append(current_line)
                current_line = ""
                in_multiline = False

        return parsed_lines

    def _parse_instruction(self, line: str):
        """Parse a single Dockerfile instruction"""
        # Extract instruction and arguments
        match = re.match(r"^(\w+)\s+(.*)$", line)
        if not match:
            return

        instruction = match.group(1).upper()
        args = match.group(2).strip()

        # Route to appropriate handler
        handlers = {
            "FROM": self._handle_from,
            "RUN": self._handle_run,
            "ENV": self._handle_env,
            "ARG": self._handle_arg,
            "WORKDIR": self._handle_workdir,
            "USER": self._handle_user,
            "COPY": self._handle_copy,
            "ADD": self._handle_add,
            "SHELL": self._handle_shell,
            "CMD": self._handle_cmd,
            "ENTRYPOINT": self._handle_entrypoint,
            "EXPOSE": self._handle_expose,
            "VOLUME": self._handle_volume,
            "LABEL": self._handle_label,
            "HEALTHCHECK": self._handle_healthcheck,
        }

        handler = handlers.get(instruction)
        if handler:
            handler(args)
        else:
            self.script_lines.append(f"# Unsupported instruction: {instruction} {args}")

    def _add_header(self):
        """Add shell script header"""
        self.script_lines.extend(
            [
                "#!/bin/bash",
                "#",
                "# Generated from Dockerfile",
                f"# Source: {self.dockerfile_path.name}",
                "#",
                "# This script sets up the same environment as the Docker container",
                "# Run this script as a regular user with sudo privileges",
                "#",
                "",
                "set -e  # Exit on error",
                "",
                "# Colors for output",
                "RED='\\033[0;31m'",
                "GREEN='\\033[0;32m'",
                "YELLOW='\\033[1;33m'",
                "NC='\\033[0m' # No Color",
                "",
                "echo_info() {",
                '    echo -e "${GREEN}[INFO]${NC} $1"',
                "}",
                "",
                "echo_warn() {",
                '    echo -e "${YELLOW}[WARN]${NC} $1"',
                "}",
                "",
                "echo_error() {",
                '    echo -e "${RED}[ERROR]${NC} $1"',
                "}",
                "",
            ]
        )

    def _add_footer(self):
        """Add shell script footer"""
        self.script_lines.extend(
            [
                "",
                'echo_info "Setup complete!"',
            ]
        )

    def _substitute_vars(self, text: str, for_output: bool = False) -> str:
        """Substitute ARG and ENV variables in text

        Args:
            text: The text to substitute variables in
            for_output: If True, convert ARG references to shell variable syntax
                       and substitute ENV values
        """
        if for_output:
            # For RUN commands: ARGs stay as-is (shell variables), substitute ENV values
            # This allows runtime evaluation of ARGs set by the shell script

            # Substitute ENV vars with their actual values
            for var, value in self.env_vars.items():
                # Only substitute ENV vars that don't reference other variables
                if value and not ("$" in value or "{" in value):
                    text = re.sub(rf"\${{{var}}}", value, text)
                    text = re.sub(rf"\${var}\b", value, text)
        else:
            # For internal use (WORKDIR, etc), substitute everything
            for var, value in {**self.args, **self.env_vars}.items():
                text = re.sub(rf"\${{{var}}}", value, text)
                text = re.sub(rf"\${var}\b", value, text)

        return text

    def _handle_from(self, args: str):
        """Handle FROM instruction"""
        # Extract base image
        base_image = args.split()[0]
        self.script_lines.append(f"# Base image: {base_image}")
        self.script_lines.append(
            "# This script assumes you're running on a compatible base system"
        )
        self.script_lines.append("")

    def _handle_run(self, args: str):
        """Handle RUN instruction"""
        # Check for --mount flags (not applicable to shell scripts)
        if args.startswith("--mount="):
            # Extract the actual command after mount flags
            match = re.search(r"--mount=\S+\s+(.*)", args, re.DOTALL)
            if match:
                args = match.group(1)
                self.script_lines.append(
                    "# Note: --mount directives are not applicable in shell scripts"
                )

        # Substitute variables - but keep shell variable references intact
        args = self._substitute_vars(args, for_output=True)

        self.script_lines.append("")
        self.script_lines.append("# RUN command")

        # Smart sudo handling - check if ANY command in the chain needs sudo
        # Check for specific root-requiring patterns
        root_patterns = [
            "apt-get",
            "apt ",
            "dpkg",
            "systemctl",
            "useradd",
            "usermod",
            "groupadd",
            "groupmod",
            "chown",
            "mkdir -p /opt",
            "mkdir -p /usr",
            "ln -s /usr",
            "/etc/sudoers",
            "ssh-keyscan",
            "mkdir -p /root",
        ]
        # Also check for writing to system directories
        needs_sudo = (
            any(cmd in args for cmd in root_patterns)
            or ">> /etc/" in args
            or "> /etc/" in args
            or ">> /root/" in args
        )

        # Check if command already has sudo
        has_sudo = args.strip().startswith("sudo ")
        # In VM context, always use sudo for root commands (ignore Docker USER directive)
        # since the script will be run by a regular user with sudo privileges

        if needs_sudo and not has_sudo:
            # Wrap entire command chain in sudo bash -c to ensure all parts run as root
            # Use single quotes to preserve variable references
            args_escaped = args.replace("'", "'\"'\"'")  # Escape single quotes
            self.script_lines.append(f"sudo bash -c '{args_escaped}'")
        else:
            self.script_lines.append(args)

        self.script_lines.append("")

    def _handle_env(self, args: str):
        """Handle ENV instruction"""
        # Parse ENV instruction (can be key=value or key value)
        match = re.match(r"(\w+)=(.+)", args)
        if match:
            key, value = match.groups()
        else:
            parts = args.split(None, 1)
            if len(parts) == 2:
                key, value = parts
            else:
                return

        # Remove quotes if present
        value = value.strip('"').strip("'")

        # Store for variable substitution
        self.env_vars[key] = value

        # Add export to script
        self.script_lines.append(f'export {key}="{value}"')

    def _handle_arg(self, args: str):
        """Handle ARG instruction"""
        # Parse ARG instruction (key=default_value or just key)
        match = re.match(r"(\w+)=(.+)", args)
        if match:
            key, value = match.groups()
        else:
            key = args.strip()
            value = ""

        # Remove quotes if present
        value = value.strip('"').strip("'")

        # Store for variable substitution
        self.args[key] = value

        # Add to script as variable with default
        if value:
            self.script_lines.append(f'{key}="${{{key}:-{value}}}"')
        else:
            self.script_lines.append(f'{key}="${{{key}}}"')

    def _handle_workdir(self, args: str):
        """Handle WORKDIR instruction"""
        self.workdir = self._substitute_vars(args)
        self.script_lines.append("")
        self.script_lines.append("# Change working directory")
        self.script_lines.append(f"mkdir -p {self.workdir}")
        self.script_lines.append(f"cd {self.workdir}")
        self.script_lines.append("")

    def _handle_user(self, args: str):
        """Handle USER instruction"""
        self.user = self._substitute_vars(args)
        self.script_lines.append("")
        self.script_lines.append(f"# Note: Switching to user {self.user}")
        self.script_lines.append(
            "# In a VM, you should run subsequent commands as this user"
        )
        self.script_lines.append("")

    def _handle_copy(self, args: str):
        """Handle COPY instruction"""
        parts = args.split()
        if len(parts) >= 2:
            src = parts[-2]
            dst = self._substitute_vars(parts[-1])
            self.script_lines.append(f"# COPY {src} {dst}")
            self.script_lines.append("# Note: Manual file copy required")
            self.script_lines.append(f"# cp {src} {dst}")

    def _handle_add(self, args: str):
        """Handle ADD instruction"""
        # ADD is similar to COPY but can handle URLs and tar extraction
        parts = args.split()
        if len(parts) >= 2:
            src = parts[-2]
            dst = self._substitute_vars(parts[-1])
            self.script_lines.append(f"# ADD {src} {dst}")
            if src.startswith("http://") or src.startswith("https://"):
                self.script_lines.append(f"curl -L -o {dst} {src}")
            else:
                self.script_lines.append("# Note: Manual file copy required")
                self.script_lines.append(f"# cp {src} {dst}")

    def _handle_shell(self, args: str):
        """Handle SHELL instruction"""
        self.script_lines.append(f"# SHELL: {args}")
        self.script_lines.append("# Note: Default shell is already bash")

    def _handle_cmd(self, args: str):
        """Handle CMD instruction"""
        self.script_lines.append("")
        self.script_lines.append(f"# Default command: {args}")
        self.script_lines.append("# Note: CMD is not executed in setup script")

    def _handle_entrypoint(self, args: str):
        """Handle ENTRYPOINT instruction"""
        self.script_lines.append("")
        self.script_lines.append(f"# Entrypoint: {args}")
        self.script_lines.append("# Note: ENTRYPOINT is not executed in setup script")

    def _handle_expose(self, args: str):
        """Handle EXPOSE instruction"""
        self.script_lines.append(f"# EXPOSE {args}")
        self.script_lines.append("# Note: No action needed for EXPOSE in VM")

    def _handle_volume(self, args: str):
        """Handle VOLUME instruction"""
        self.script_lines.append(f"# VOLUME {args}")
        self.script_lines.append("# Note: No action needed for VOLUME in VM")

    def _handle_label(self, args: str):
        """Handle LABEL instruction"""
        self.script_lines.append(f"# LABEL: {args}")

    def _handle_healthcheck(self, args: str):
        """Handle HEALTHCHECK instruction"""
        self.script_lines.append(f"# HEALTHCHECK: {args}")
        self.script_lines.append("# Note: HEALTHCHECK is Docker-specific")


def main():
    parser = argparse.ArgumentParser(
        description="Convert Dockerfile to shell script",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s Dockerfile setup.sh
  %(prog)s Dockerfile_AperiMech_Ubuntu2404
        """,
    )
    parser.add_argument("dockerfile", help="Path to Dockerfile")
    parser.add_argument(
        "output", nargs="?", help="Output shell script path (default: setup.sh)"
    )
    parser.add_argument(
        "-f", "--force", action="store_true", help="Overwrite output file if it exists"
    )

    args = parser.parse_args()

    # Set default output if not provided
    output_path = Path(args.output if args.output else "setup.sh")

    # Check if input file exists
    if not Path(args.dockerfile).exists():
        print(f"Error: Dockerfile '{args.dockerfile}' not found", file=sys.stderr)
        sys.exit(1)

    # Check if output file exists
    if output_path.exists() and not args.force:
        response = input(
            f"Output file '{output_path}' already exists. Overwrite? [y/N] "
        )
        if response.lower() != "y":
            print("Aborted.")
            sys.exit(0)

    # Parse and convert
    print(f"Parsing {args.dockerfile}...")
    converter = DockerfileParser(args.dockerfile)
    script = converter.parse()

    # Write output
    with open(output_path, "w") as f:
        f.write(script)

    # Make executable
    output_path.chmod(0o755)

    print(f"Successfully generated {output_path}")
    print(f"Make it executable with: chmod +x {output_path}")
    print(f"Run with: ./{output_path}")


if __name__ == "__main__":
    main()
