import importlib.resources
import os
import subprocess

import llnl.util.tty as tty
import spack.paths
from llnl.util.filesystem import touchp, working_dir
from spackx.patch import apply_patch

level = "short"
description = "Patch the builtin Trilinos package"


def setup_parser(parser):
    pass


def patch_trilinos(parser, args):
    tty.info("Patching trilinos package")
    path = os.path.join(spack.paths.prefix, "var/spack/repos/builtin/packages/trilinos")
    breadcrumb = os.path.join(path, ".aperi-patched")
    patch = get_version_patch()
    if patch is None:
        tty.info("No patch found")
    else:
        if os.path.exists(breadcrumb):
            tty.info("Trilinos package already patched")
        else:
            tty.info(f"Applying patch at {patch}")
            apply_patch(patch, abs_path=spack.paths.prefix)
            touchp(breadcrumb)


def get_version_patch() -> str | None:
    patch_dir = os.path.join(get_spackx_dir(), "patches")
    with working_dir(spack.paths.prefix):
        branch = subprocess.check_output(
            ["git", "branch", "--show-current"], encoding="utf-8"
        ).strip()
        patch = os.path.join(patch_dir, f"{branch.replace('/', '-')}.patch")
        if os.path.exists(patch):
            return patch
    return None


def get_spackx_dir() -> str | None:
    """Set up the aperi spack extensions

    Spack expects the directory name of the configuration path to be returned
    We also set the variable spackx which is used to locate extension resources

    """
    spackx = importlib.resources.files("spackx")
    return str(spackx)
