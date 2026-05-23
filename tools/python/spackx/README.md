# amech Spack Environment

## Setting up the amech Spack Environment

1. Clone Spack

   ```console
   git clone git@github.com/spack/spack --branch=releases/v1.1
   ```

2. `export amech=<path to amech checkout>`

3. Activate spack

   ```console
   source <spack root>/share/spack/setup-env.sh
   ```

4. Patch Trilinos (if a patch is available for this spack version)

   ```console
   spack patch-trilinos
   ```

When calling Spack, call as `spack -C $amech/spack/etc`

## Install amech

```console
spack -C $amech/spack/etc install amech
```
