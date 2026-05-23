from spack.package import conflicts, depends_on, variant
from spack.pkg.amech.git_package import GitPackage
from spack_repo.builtin.packages.trilinos.package import Trilinos as builtin_trilinos


class Trilinos(GitPackage, builtin_trilinos):
    variant("krino", default=False, description="Enable Krino")
    depends_on("yaml-cpp", when="+krino")
    depends_on("googletest", when="+gtest")
    depends_on("cmake@3.27:", type="build")
    conflicts("~boost", when="+krino")
    conflicts("~hdf5", when="+krino")
    conflicts("~intrepid2", when="+krino")
    conflicts("~mpi", when="+krino")
    conflicts("~sacado", when="+krino")

    def cmake_args(self):
        args = super().cmake_args()
        if self.spec.satisfies("+gtest"):
            args.append("-DTPL_ENABLE_gtest:BOOL=ON")
            # Trilinos master uses find_package(GTest) per new FindTPLgtest.cmake
            # Force prefind even if TPL_* variables are set by parent class
            args.append("-Dgtest_FORCE_PRE_FIND_PACKAGE:BOOL=ON")
            # Point to googletest CMake config (handles lib vs lib64 automatically)
            args.append(f"-DGTest_ROOT={self.spec['googletest'].prefix}")
        if self.spec.satisfies("+krino"):
            args.append("-DTPL_ENABLE_yamlcpp:BOOL=ON")
            args.append(
                f"-Dyamlcpp_INCLUDE_DIRS={self.spec['yaml-cpp'].prefix.include}"
            )
            args.append(f"-Dyamlcpp_LIB_DIRS={self.spec['yaml-cpp'].prefix.lib}")
            args.append("-DTrilinos_ENABLE_Krino:BOOL=ON")
            args.append("-DKrino_ENABLE_TESTS:BOOL=OFF")
        return args
