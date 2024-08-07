# conftest.py
import pytest


def pytest_addoption(parser):
    parser.addoption(
        "--material_driver",
        action="store",
        help="Path to the material driver that is run in the tests",
        required=True,
    )
    parser.addoption(
        "--path_to_notebooks",
        action="store",
        help="Path to the notebooks containing the tests",
        required=True,
    )
    parser.addoption(
        "--temp_dir",
        action="store",
        help="Path to the temporary directory where the material driver inputs are stored",
        required=True,
    )


@pytest.fixture(scope="module")
def material_driver_path_module(pytestconfig):
    return pytestconfig.getoption("material_driver")


@pytest.fixture(scope="module")
def path_to_notebooks_module(pytestconfig):
    return pytestconfig.getoption("path_to_notebooks")


@pytest.fixture(scope="module")
def temp_dir_module(pytestconfig):
    return pytestconfig.getoption("temp_dir")
