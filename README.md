# aperi-mech

Public build environment for **aperi-mech**, an open-source platform for
computational mechanics that uses Kokkos for performance portability across
CPU (MPI/OpenMP) and GPU (CUDA, ROCm) backends.

This repository hosts the Dockerfiles, Spack package recipes, and helper
scripts used to produce the container images published to
`ghcr.io/aperijake/aperi-mech`. The application source code is maintained
in a separate repository; this repo exists so the build environment is
publicly visible, auditable, and reproducible.

> **Historical note:** Prior to the move to a build-env-only scope, this
> repo contained the full application source and history. That state is
> preserved on the `legacy-final` tag.

## Layout

- [`docker/`](docker/) — Dockerfiles for Ubuntu and RockyLinux (CPU/OpenMP,
  NVIDIA CUDA, AMD ROCm) plus build, push, multi-arch combine, and test
  scripts
- [`tools/python/spackx/`](tools/python/spackx/) — custom Spack extensions
  and package recipes (the `amech` package and tuned `trilinos`,
  `kokkos`, `kokkos-kernels`, `compadre`, `eigen` recipes)
- [`tools/python/amech/`](tools/python/amech/) — Python helper package
  (schema doc generation, etc.)
- [`tools/openmpi/`](tools/openmpi/) — OpenMPI build script

## Internal naming

The Dockerfiles and Spack recipes use the name `amech` internally
(`Dockerfile_AMech_*`, spack package `amech`, python module `amech`).
This matches the upstream source so the mirror stays low-friction; the
`aperi-mech` and `amech` names refer to the same project.

## Using a pre-built image

```bash
docker pull ghcr.io/aperijake/aperi-mech:ubuntu24.04
docker run -it ghcr.io/aperijake/aperi-mech:ubuntu24.04
```

See [docker/README.md](docker/README.md) for the available tags
(distro × CUDA / ROCm × architecture combinations).

## Building an image locally

```bash
cd docker
./build_and_push_images.sh --help
```

The Dockerfiles clone this repository at build time (sparse-checkout of
`tools/`) and install the full dependency stack (Trilinos, Kokkos,
Compadre, etc.) via Spack. They **do not** build the aperi-mech
application itself — the result is a ready-to-use development
environment. To compile the application against this environment, mount
your source into the container and finish the build via
`spack develop --path /your/source amech && spack install`.

## License

See [LICENSE.md](LICENSE.md).
