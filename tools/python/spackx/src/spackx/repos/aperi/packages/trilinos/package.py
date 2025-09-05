from spack.package import conflicts
from spack.package import depends_on
from spack.package import variant
from spack.pkg.aperi.git_package import GitPackage
from spack.pkg.builtin.trilinos import Trilinos as builtin_trilinos


class Trilinos(GitPackage, builtin_trilinos):
    variant("krino", default=True)
    depends_on("yaml-cpp", when="+krino")
    conflicts("~netcdf", when="+krino")
    conflicts("~hdf5", when="+krino")
    conflicts("~mpi", when="+krino")

    def cmake_args(self):
        args = super().cmake_args()
        if self.spec.satisfies("+krino"):
            args.append("-DTPL_ENABLE_yamlcpp:BOOL=ON")
            args.append(f"-Dyamlcpp_INCLUDE_DIRS={self.spec['yaml-cpp'].prefix.include}")
            args.append(f"-Dyamlcpp_LIB_DIRS={self.spec['yaml-cpp'].prefix.lib}")
            args.append("-DTrilinos_ENABLE_Krino:BOOL=ON")
            args.append("-DKrino_ENABLE_TESTS:BOOL=ON")
        return args
