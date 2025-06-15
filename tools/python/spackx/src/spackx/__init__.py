import importlib.resources
import os


def setup_extension() -> str | None:
    """Set up the aperi spack extensions

    Spack expects the directory name of the configuration path to be returned
    We also set the variable spackx which is used to locate extension resources

    """
    spackx = importlib.resources.files("spackx")
    os.environ["spackx"] = str(spackx)
    etc = spackx.joinpath("etc")
    if etc.is_dir():
        return str(etc)
    return None
