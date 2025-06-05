from spack.pkg.aperi.git_package import GitPackage
from spack.pkg.builtin.eigen import Eigen as builtin_eigen


class Eigen(GitPackage, builtin_eigen):
    ...