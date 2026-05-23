from spack.package import join_path
from spack.pkg.amech.git_package import GitPackage
from spack_repo.builtin.packages.compadre.package import Compadre as builtin_compadre


class Compadre(GitPackage, builtin_compadre):
    def cmake_args(self):
        options = super().cmake_args()

        # When kokkos is built with +rocm, the exported CMake targets include
        # HIP flags (--offload-arch, -fno-gpu-rdc, -x hip) that require hipcc
        # or amdclang++. The builtin package uses kokkos_cxx which falls back
        # to g++ for non-wrapper builds. Override to use hipcc.
        if self.spec.satisfies("^kokkos+rocm"):
            hipcc = join_path(self.spec["hip"].prefix, "bin", "hipcc")
            for i, opt in enumerate(options):
                if opt.startswith("-DCMAKE_CXX_COMPILER"):
                    options[i] = f"-DCMAKE_CXX_COMPILER:STRING={hipcc}"
                    break
            # Remove -march/-mtune flags that conflict with HIP compilation
            options = [
                opt
                for opt in options
                if "-march=native" not in opt and "-mtune=native" not in opt
            ]

        return options
