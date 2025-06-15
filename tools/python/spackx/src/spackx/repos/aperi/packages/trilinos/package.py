from spack.pkg.aperi.git_package import GitPackage
from spack.pkg.builtin.trilinos import Trilinos as builtin_trilinos


class Trilinos(GitPackage, builtin_trilinos): ...
