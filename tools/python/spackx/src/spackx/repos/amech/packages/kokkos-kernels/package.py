from spack.package import version
from spack.pkg.amech.git_package import GitPackage
from spack_repo.builtin.packages.kokkos_kernels.package import (
    KokkosKernels as builtin_kokkos_kernels,
)


class KokkosKernels(GitPackage, builtin_kokkos_kernels):
    version(
        "4.6.01",
        sha256="95b9357f37ab3b9c3913c00741acb2501831c28ea8664de67818ae79c69c5908",
    )
    version(
        "4.6.02",
        sha256="a953f445660ed5aaab10e18fc4a90c4c178291e9d9d97d20abd4e6027f1193ec",
    )
    version(
        "4.7.01",
        sha256="f3e1452db0e182c8e32c61632465e3a829159b9ae0645d9e4cd97b4fa09c36e1",
    )
