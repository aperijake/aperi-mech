# aperi-mech Tooling

**Note:** It is recommended to set the paths to your Fortran compilers to avoid potential issues. For example, you can do this by running:

```shell
export FC=/usr/bin/gfortran
export F77=/usr/bin/gfortran
```

## One-Time Setup

1. **Set up a Python virtual environment and install the required tooling.**
   First, change to the root directory of your `aperi-mech` source code checkout:

   ```shell
   export aperi_mech=$(pwd)
   python3 -m venv venv
   source ./venv/bin/activate
   echo "export aperi_mech=$aperi_mech" >> $aperi_mech/venv/bin/activate
   cd $aperi_mech/tools/python/aperi-mech
   python3 -m pip install -e .
   cd $aperi_mech/tools/python/spackx
   python3 -m pip install -e .
   ```

2. **Install Spack and add it to the virtual environment:**

   ```shell
   mkdir -p $aperi_mech/venv/src
   cd $aperi_mech/venv/src
   git clone https://github.com/spack/spack.git
   git -C $aperi_mech/venv/src/spack checkout prereleases/v1.0.0-alpha.4
   source $aperi_mech/venv/src/spack/share/spack/setup-env.sh
   echo "source $aperi_mech/venv/src/spack/share/spack/setup-env.sh" >> $aperi_mech/venv/bin/activate
   ```

3. **Configure the Spack environment:**

   ```shell
   spack compiler find
   spack external find
   # Optionally, specify packages explicitly. This helps spack find more externals:
   spack external find cmake hwloc libxml2 pkgconf bzip2 lz4 snappy zstd libaec ncurses openblas autoconf automake libtool
   ```

4. **Patch Spack for Trilinos support:**

   ```shell
   spack patch-trilinos
   ```

## Development Workflow

1. **Activate the virtual environment:**

   First, change to the root directory of your `aperi-mech` source code then:

   ```shell
   export aperi_mech=$(pwd)
   source $aperi_mech/venv/bin/activate
   ```

2. **(Optional) Inspect the `aperi-mech` Spack specification:**

   ```shell
   spack spec aperi-mech
   ```

3. **Create a Spack environment for `aperi-mech` and install it:**

   ```shell
   spack env create aperi-mech
   spacktivate aperi-mech
   spack develop --path $aperi_mech --build-directory $aperi_mech/build aperi-mech
   spack add aperi-mech
   spack concretize
   spack install
   ```
