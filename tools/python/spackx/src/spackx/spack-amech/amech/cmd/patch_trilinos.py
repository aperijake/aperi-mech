import importlib.resources
import os
import re
import subprocess

import spack.llnl.util.tty as tty
import spack.paths
import spack.repo
from spack.llnl.util.filesystem import touchp, working_dir
from spackx.patch import apply_patch

level = "short"
description = "Patch the builtin Trilinos package"


def setup_parser(parser):
    pass


def patch_trilinos(parser, args):
    tty.info("Patching trilinos package")
    builtin = spack.repo.builtin_repo()
    path = builtin.dirname_for_package_name("trilinos")
    breadcrumb = os.path.join(path, ".amech-patched")
    patch = get_version_patch()
    if patch is None:
        tty.info("No patch found for this spack version")
    else:
        if os.path.exists(breadcrumb):
            tty.info("Trilinos package already patched")
        else:
            tty.info(f"Applying patch at {patch}")
            apply_patch(patch, abs_path=builtin.root)
            touchp(breadcrumb)


def get_version_patch() -> str | None:
    patch_dir = os.path.join(get_spackx_dir(), "patches")
    with working_dir(spack.paths.prefix):
        branch = subprocess.check_output(
            ["git", "branch", "--show-current"], encoding="utf-8"
        ).strip()
        if not branch:
            # Detached HEAD — try to derive the release branch from a tag.
            # e.g., tag "v1.1.1" -> "releases/v1.1"
            try:
                tag = subprocess.check_output(
                    ["git", "describe", "--tags", "--exact-match"],
                    encoding="utf-8",
                    stderr=subprocess.DEVNULL,
                ).strip()
                match = re.match(r"v(\d+\.\d+)", tag)
                if match:
                    branch = f"releases/v{match.group(1)}"
            except subprocess.CalledProcessError:
                # Detached at a bare SHA (not a tag). No way to determine
                # which release branch this belongs to.
                tty.warn(
                    "Spack is on a detached HEAD that is not a tagged release. "
                    "Cannot determine which patch to apply. "
                    "Check out a release branch (e.g., releases/v1.1) or tag."
                )
        if branch:
            patch = os.path.join(patch_dir, f"{branch.replace('/', '-')}.patch")
            if os.path.exists(patch):
                return patch
    return None


def get_spackx_dir() -> str | None:
    """Set up the amech spack extensions

    Spack expects the directory name of the configuration path to be returned
    We also set the variable spackx which is used to locate extension resources

    """
    spackx = importlib.resources.files("spackx")
    return str(spackx)
