from spack.package import depends_on
from spack.pkg.amech.git_package import GitPackage
from spack_repo.builtin.packages.eigen.package import Eigen as builtin_eigen


class Eigen(GitPackage, builtin_eigen):
    # Use the external openblas package. Avoids potential fortran-related build issues.
    depends_on("openblas")

    def cmake_args(self):
        args = super().cmake_args()
        args.append("-DEIGEN_BUILD_BLAS=OFF")
        args.append("-DEIGEN_BUILD_LAPACK=OFF")
        return args
