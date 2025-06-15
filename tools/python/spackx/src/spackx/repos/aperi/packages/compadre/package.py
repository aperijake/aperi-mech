from spack.pkg.aperi.git_package import GitPackage
from spack.pkg.builtin.compadre import Compadre as builtin_compadre


class Compadre(GitPackage, builtin_compadre): ...
