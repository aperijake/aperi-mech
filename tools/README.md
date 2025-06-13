# aperi-mech tooling

## One-time setup

- Set up a virtual environment and install tooling, after changing directory to the aperi mech source code checkout

  ```shell
  export aperi_mech=$(pwd)
  python -m venv venv
  source ./venv/bin/activate
  echo "export aperi_mech=$aperi_mech" >> $aperi_mech/venv/bin/activate
  cd $aperi_mech/tools/python/aperi-mech
  python3 -m pip install -e .
  cd $aperi_mech/tools/python/spackx
  python3 -m pip install -e .
  ```

- Install spack and add to venv

  ```shell
  mkdir -p $aperi_mech/venv/src
  cd $aperi_mech/venv/src
  git clone git@github.com:spack/spack
  git -C $aperi_mech/venv/src/spack checkout prereleases/v1.0.0-alpha.4
  source $aperi_mech/venv/src/spack/share/spack/setup-env.sh
  echo "source $aperi_mech/venv/src/spack/share/spack/setup-env.sh" >> $aperi_mech/venv/bin/activate
  ```

- Patch spack

  ```shell
  spack patch-trilinos
  ```

## Development workflow

- Inspect the aperi-mech spec

```shell
source <aperi-mech-root>/venv/bin/activate
spack spec aperi-mech
```
