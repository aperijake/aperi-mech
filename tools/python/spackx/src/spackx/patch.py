import os
import pathlib
import sys
from llnl.util.filesystem import working_dir
from spack.util.executable import which
from spack.util.executable import which_string


def apply_patch(
    patch_path: str,
    level: int = 1,
    abs_path: str = ".",
    rel_path: str = ".",
    reverse: bool = False,
) -> None:
    """Apply the patch at patch_path

    Args:
        patch_path: filesystem location for the patch to apply
        level: patch level
        abs_path: change to this directory to apply patch
        rel_path: relative path *within* the abs_path to change to
        reverse: reverse the patch
    """
    path = os.getenv("PATH", "")
    if sys.platform == "win32":
        git = which_string("git")
        if git:
            git = pathlib.Path(git)
            git_root = git.parent.parent
            git_root = git_root / "usr" / "bin"
            path = os.pathsep.join([str(git_root), path])

    args = ["-s", "-p", str(level), "-i", patch_path, "-d", rel_path]
    if reverse:
        args.append("-R")

    # TODO: Decouple Spack's patch support on Windows from Git
    # for Windows, and instead have Spack directly fetch, install, and
    # utilize that patch.
    # Note for future developers: The GNU port of patch to windows
    # has issues handling CRLF line endings unless the --binary
    # flag is passed.
    patch = which("patch", required=True, path=path)
    with working_dir(abs_path):
        patch(*args)