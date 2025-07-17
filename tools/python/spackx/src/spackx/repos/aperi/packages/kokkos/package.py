from spack.package import version
from spack.pkg.aperi.git_package import GitPackage
from spack.pkg.builtin.kokkos import Kokkos as builtin_kokkos


class Kokkos(GitPackage, builtin_kokkos):
    version(
        "4.6.01",
        sha256="b9d70e4653b87a06dbb48d63291bf248058c7c7db4bd91979676ad5609bb1a3a",
    )
    version(
        "4.6.02",
        sha256="baf1ebbe67abe2bbb8bb6aed81b4247d53ae98ab8475e516d9c87e87fa2422ce",
    )
