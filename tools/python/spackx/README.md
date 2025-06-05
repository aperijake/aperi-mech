# aperi-mech Spack Environment

## Setting up the aperi-mech Spack Environment

1. Clone Spack

   ```console
   git clone git@github.com/spack/spack --branch=prereleases/v1.0.0-alpha.4
   ```

2. Modify the Trilinos package

   ```console
   sed -i 's/kokkos@4.5.01/kokkos@4.6:/g' spack/var/spack/repos/builtin/packages/trilinos/package.py
   sed -i 's/kokkos-kernels@4.5.01/kokkos-kernels@4.6:/g' spack/var/spack/repos/builtin/packages/trilinos/package.py
   ```

3. `export aperi_mech=<path to aperi mech checkout`

4. Activate spack

   ```console
   source <spack root>/share/spack/setup-env.sh
   ```

When calling Spack, call as `spack -C $aperi_mech/spack/etc`


## Install aperi-mech


```console
spack -C $aperi_mech/spack/etc install aperi-mech
```
