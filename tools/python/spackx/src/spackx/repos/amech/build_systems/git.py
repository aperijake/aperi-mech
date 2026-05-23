import spack.llnl.util.tty as tty
from spack.package import variant
from spack.util.git import git as find_git
from spack_repo.builtin.build_systems.cmake import CMakePackage


class GitPackage(CMakePackage):
    variant(
        "git_commit",
        default="NULL",
        description="Git commit for the package",
        when="@master",
    )

    def do_fetch(self, mirror_only=False):
        if (
            self.spec.variants["git_commit"].value != "NULL"
            and self._fetcher is not None
        ):
            setattr(self._fetcher, "commit", self.spec.variants["git_commit"].value)
            setattr(self._fetcher, "branch", None)
            setattr(self._fetcher, "tag", None)
        super().do_fetch(mirror_only=mirror_only)

    def cmake_args(self):
        self.validate_checkout()
        return super().cmake_args()

    def validate_checkout(self):
        if self.spec.variants["git_commit"].value != "NULL":
            requested = self.spec.variants["git_commit"].value
            staged = self.get_commit(self.stage.source_path)
            if requested != staged:
                tty.die(
                    f"Staged commit {staged} does not match requested commit {requested}"
                )

    @staticmethod
    def get_commit(path):
        """Get latest commit sha"""
        git = find_git()
        output = git(
            "-C",
            path,
            "log",
            "--first-parent",
            "-n",
            "1",
            '--pretty=format:"%H"',
            output=str,
            error=str,
        )
        return output.strip('"')
