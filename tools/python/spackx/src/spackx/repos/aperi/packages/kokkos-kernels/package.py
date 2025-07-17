from spack.package import version
from spack.pkg.aperi.git_package import GitPackage
from spack.pkg.builtin.kokkos_kernels import KokkosKernels as builtin_kokkos_kernels


class KokkosKernels(GitPackage, builtin_kokkos_kernels):
    version(
        "4.6.01",
        sha256="95b9357f37ab3b9c3913c00741acb2501831c28ea8664de67818ae79c69c5908",
    )
    version(
        "4.6.02",
        sha256="a953f445660ed5aaab10e18fc4a90c4c178291e9d9d97d20abd4e6027f1193ec",
    )
