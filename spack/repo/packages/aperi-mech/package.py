from spack.package import CMakePackage
from spack.package import CudaPackage
from spack.package import depends_on
from spack.package import variant
from spack.package import version


class AperiMech(CMakePackage, CudaPackage):
    version("master")

    variant("cov", default=False)
    variant("protego", default=False)

    depends_on("mpi")
    depends_on("lcov", when="+cov")
    depends_on("compadre ~tests")
    depends_on("trilinos@16.0.0 ~amesos ~amesos2 ~anasazi ~aztec ~belos ~cuda ~epetra ~epetraext ~ifpack ~ifpack2 ~ml ~muelu ~sacado ~shared +exodus +gtest +hdf5 +mpi +stk +zoltan +zoltan2 cxxstd=17")
    depends_on("googletest")
    depends_on("yaml-cpp")
    depends_on("eigen")

    depends_on("kokkos@4.3.01 ~shared cxxstd=17")
    depends_on("kokkos-kernels@4.3.01 ~shared")
    for cuda_arch in CudaPackage.cuda_arch_values:
        depends_on(
            "kokkos@4.3.01~shared+cuda cuda_arch=%s" % cuda_arch,
            when="^kokkos +cuda cuda_arch=%s" % cuda_arch,
        )
        depends_on(
            "kokkos-kernels@4.3.01~shared+cuda cuda_arch=%s" % cuda_arch,
            when="^kokkos-kernels +cuda cuda_arch=%s" % cuda_arch,
        )

    def cmake_args(self):
        args = [
            self.define("USE_PROTEGO_MECH", self.spec.satisfies("+protego")),
            self.define("TRILINOS_PATH", self.spec["trilinos"].prefix),
            self.define("Kokkos_ROOT", self.spec["kokkos"].prefix),
            self.define("EIGEN_PATH", self.spec["eigen"].prefix),
            self.define("GTEST_PATH", self.spec["googletest"].prefix),
            self.define("YAML-CPP_PATH", self.spec["yaml-cpp"].prefix),
            self.define("OPENMPI_PATH", self.spec["mpi"].prefix),
            self.define("COMPADRE_PATH", self.spec["compadre"].prefix),
            self.define("CMAKE_CXX_COMPILER", self.compiler.cxx),
            self.define("CMAKE_C_COMPILER", self.compiler.cc),
            self.define("CMAKE_EXPORT_COMPILE_COMMANDS", True),
            self.define("CMAKE_CXX_EXTENSIONS", False),
        ]
        if self.spec.satisfies("+cov"):
            args.append(self.define("CHECK_CODE_COVERAGE", True))
            args.append(self.define("LCOV_BIN_DIR", self.spec["lcov"].prefix.bin))
        if self.spec.satisfies("^kokkos+cuda"):
            args.append(self.define("USE_GPU", True))
            args.append(self.define("CMAKE_CUDA_COMPILER", self.spec["cuda"].prefix.bin.nvcc))
            cuda_arch = self.spec["kokkos"].variants["cuda_arch"].value
            args.append(self.define("CMAKE_CUDA_FLAGS", "-arch sm_{0}".format(cuda_arch[0])))

        return args

    def flag_handler(self, name, flags):
        cmake_flags = []
        if name == "cxxflags":
            cmake_flags.extend(
                ["-Wall", "-pedantic", "-Wno-long-long", "-ftrapv", "-Wno-deprecated", "-Wno-unknown-pragmas"]
            )
        return None, None, cmake_flags or None