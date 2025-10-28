import json
import os

from spack.package import (
    CMakePackage,
    CudaPackage,
    conflicts,
    depends_on,
    variant,
    version,
)

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

    # Conflict on shared and cuda variants
    conflicts(
        "+shared",
        when="+cuda",
        msg="Cannot build shared libs with CUDA due to relocatable device code",
    )

    for dep in dependencies["dependencies"]:
        if dep["name"] in ("kokkos", "kokkos-kernels"):
            base_spec = dep["spec"]
            is_kokkos = dep["name"] == "kokkos"

            def build_kokkos_spec(shared, openmp, cuda_arch, base, kokkos):
                spec = base
                spec += " +shared" if shared else " ~shared"
                spec += " +openmp" if openmp else " ~openmp"
                if cuda_arch is None:
                    spec += " ~cuda"
                else:
                    spec += f" +cuda cuda_arch={cuda_arch}"
                    if kokkos:
                        spec += " +cuda_lambda +cuda_relocatable_device_code ~cuda_uvm +wrapper"
                return spec

            cuda_arches = [
                arch for arch in CudaPackage.cuda_arch_values if arch != "none"
            ]
            for cuda_arch in [None] + cuda_arches:
                for shared in (False, True):
                    for openmp in (False, True):
                        spec = build_kokkos_spec(
                            shared, openmp, cuda_arch, base_spec, is_kokkos
                        )
                        if cuda_arch is None:
                            when = "~cuda"
                        else:
                            when = f"+cuda cuda_arch={cuda_arch}"
                        when += " +shared" if shared else " ~shared"
                        when += " +openmp" if openmp else " ~openmp"
                        depends_on(spec, when=when)

        elif dep["name"] == "trilinos":
            base_spec = dep["spec"]

            def build_trilinos_spec(shared, openmp, krino, cuda_arch, base):
                spec = base
                spec += " +shared" if shared else " ~shared"
                spec += " +openmp" if openmp else " ~openmp"
                if krino:
                    spec += " +krino +sacado +intrepid2 +boost"
                else:
                    spec += " ~krino ~sacado ~intrepid2 ~boost"
                if cuda_arch is None:
                    spec += " ~cuda"
                else:
                    spec += f" +cuda +cuda_rdc +wrapper cuda_arch={cuda_arch}"
                return spec

            cuda_arches = [
                arch for arch in CudaPackage.cuda_arch_values if arch != "none"
            ]
            for cuda_arch in [None] + cuda_arches:
                for shared in (False, True):
                    for openmp in (False, True):
                        for krino in (False, True):
                            spec = build_trilinos_spec(
                                shared, openmp, krino, cuda_arch, base_spec
                            )
                            if cuda_arch is None:
                                when = "~cuda"
                            else:
                                when = f"+cuda cuda_arch={cuda_arch}"
                            when += " +shared" if shared else " ~shared"
                            when += " +openmp" if openmp else " ~openmp"
                            when += " +krino" if krino else " ~krino"
                            depends_on(spec, when=when)

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
