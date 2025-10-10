import json
import os

from spack.package import CMakePackage, CudaPackage, depends_on, variant, version

dependencies = json.load(
    open(os.path.join(os.path.dirname(__file__), "dependencies.json"))
)


class AperiMech(CMakePackage, CudaPackage):
    git = "https://github.com/aperijake/aperi-mech.git"

    version("master")

    variant("cov", default=False, description="Enable code coverage")
    variant("protego", default=False, description="Enable Protego extensions")
    variant("krino", default=True, description="Enable Krino")
    variant("openmp", default=False, description="Enable OpenMP support")
    variant("shared", default=True, description="Enable building shared libs")
    variant("cuda", default=False, description="Enable CUDA support")
    variant(
        "cuda_arch",
        description="CUDA architecture",
        values=("none",) + CudaPackage.cuda_arch_values,
        default="none",
        multi=False,
        sticky=True,
        when="+cuda",
    )

    # Add static variants for external and Trilinos-related packages when building aperi-mech statically
    # Had problems turning off shared variants for cgns, hdf5, gettext when building aperi-mech statically
    # Trilinos had problems using netcdf-c ~shared
    # Had problems installing openmpi and openblas with spack (fortran issues) so using system openmpi
    depends_on("metis ~shared", when="~shared")
    depends_on("parmetis ~shared", when="~shared")
    depends_on("boost ~shared", when="~shared")
    depends_on("parallel-netcdf ~shared", when="~shared")
    depends_on("yaml-cpp ~shared", when="~shared")

    depends_on("perl ~shared", when="~shared")
    depends_on("openssl ~shared", when="~shared")
    depends_on("zlib-ng ~shared", when="~shared")
    depends_on("googletest ~shared", when="~shared")
    depends_on("matio ~shared", when="~shared")

    depends_on("bzip2 ~shared", when="~shared")
    depends_on("libxml2 ~shared", when="~shared")

    for dep in dependencies["dependencies"]:
        if dep["name"] in ("kokkos", "kokkos-kernels"):
            depends_on(f"{dep['spec']} ~shared", when="~shared")
            depends_on(f"{dep['spec']} +shared", when="+shared")
            depends_on(f"{dep['spec']} ~cuda", when="~cuda ~openmp")
            depends_on(f"{dep['spec']} ~cuda +openmp", when="~cuda +openmp")
            dep_spec = f"{dep['spec']} +cuda cuda_arch={{cuda_arch}}"
            if dep["name"] == "kokkos":
                dep_spec += (
                    " +cuda_lambda +cuda_relocatable_device_code ~cuda_uvm +wrapper"
                )
            # CUDA + OpenMP
            for cuda_arch in CudaPackage.cuda_arch_values:
                depends_on(
                    dep_spec.format(cuda_arch=cuda_arch),
                    when=f"+cuda cuda_arch={cuda_arch} ~openmp",
                )
                depends_on(
                    dep_spec.format(cuda_arch=cuda_arch) + " +openmp",
                    when=f"+cuda cuda_arch={cuda_arch} +openmp",
                )
        elif dep["name"] == "trilinos":
            depends_on(f"{dep['spec']} ~shared", when="~shared")
            depends_on(f"{dep['spec']} +shared", when="+shared")
            # For non-CUDA case, use the spec as-is (it already has ~cuda)
            depends_on(dep["spec"], when="~cuda ~openmp")
            depends_on(dep["spec"] + " +openmp", when="~cuda +openmp")
            depends_on(dep["spec"] + " +krino +sacado +intrepid2 +boost", when="+krino")
            depends_on(dep["spec"] + " ~krino ~sacado ~intrepid2 ~boost", when="~krino")

            # For CUDA case, replace ~cuda with +cuda
            for cuda_arch in CudaPackage.cuda_arch_values:
                trilinos_cuda_spec = f"{dep['spec'].replace('~cuda', '+cuda')} +cuda_rdc cuda_arch={cuda_arch}"
                depends_on(
                    trilinos_cuda_spec, when=f"+cuda cuda_arch={cuda_arch} ~openmp"
                )
                depends_on(
                    trilinos_cuda_spec + " +openmp",
                    when=f"+cuda cuda_arch={cuda_arch} +openmp",
                )
        else:
            depends_on(
                dep["spec"],
                when=dep.get("when"),
                type=dep.get("type", ("build", "link")),
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
            self.define("CMAKE_EXPORT_COMPILE_COMMANDS", True),
            self.define("CMAKE_CXX_EXTENSIONS", False),
        ]
        if self.spec.satisfies("+cov"):
            args.append(self.define("CHECK_CODE_COVERAGE", True))
            args.append(self.define("LCOV_BIN_DIR", self.spec["lcov"].prefix.bin))
        if self.spec.satisfies("+cuda"):
            args.append(self.define("USE_GPU", True))
            args.append(
                self.define("CMAKE_CUDA_COMPILER", self.spec["cuda"].prefix.bin.nvcc)
            )
            cuda_arch = self.spec["kokkos"].variants["cuda_arch"].value
            args.append(
                self.define("CMAKE_CUDA_FLAGS", "-arch sm_{0}".format(cuda_arch))
            )

        return args

    def flag_handler(self, name, flags):
        cmake_flags = []
        if name == "cxxflags":
            cmake_flags.extend(
                [
                    "-Wall",
                    "-pedantic",
                    "-Wno-long-long",
                    "-ftrapv",
                    "-Wno-deprecated",
                    "-Wno-unknown-pragmas",
                ]
            )
        return None, None, cmake_flags or None
