import pytest
from testbook import testbook


# Define a fixture for shared notebook setup for the neohookean notebook
@pytest.fixture(scope="module")
def notebook_setup_neohookean(
    material_driver_path_module, path_to_notebooks_module, temp_dir_module
):
    print(f"Path to notebooks: {path_to_notebooks_module}")
    print(f"Material driver path: {material_driver_path_module}")
    print(f"Temp dir: {temp_dir_module}")
    notebook_path = f"{path_to_notebooks_module}/neohookean.ipynb"
    with testbook(notebook_path, execute=["setup"]) as tb:
        yield tb, material_driver_path_module, temp_dir_module


def test_uniaxial_neohookean(notebook_setup_neohookean):
    tb, material_driver_path, temp_dir = notebook_setup_neohookean
    tb.execute_cell("test_uniaxial")
    func = tb.ref("run_uniaxial_test")

    return_value, message = func(
        material_driver_path, f"{temp_dir}/neohookean_run_uniaxial_test.yaml"
    )

    if not return_value:
        print(message)
    # trunk-ignore(bandit/B101)
    assert return_value


def test_simple_shear_neohookean(notebook_setup_neohookean):
    tb, material_driver_path, temp_dir = notebook_setup_neohookean
    tb.execute_cell("test_simple_shear")
    func = tb.ref("run_simple_shear_test")

    return_value, message = func(
        material_driver_path, f"{temp_dir}/neohookean_run_simple_shear_test.yaml"
    )

    if not return_value:
        print(message)
    # trunk-ignore(bandit/B101)
    assert return_value


# Define a fixture for shared notebook setup for the st_venant_kirchhoff notebook
@pytest.fixture(scope="module")
def notebook_setup_st_venant_kirchhoff(
    material_driver_path_module, path_to_notebooks_module, temp_dir_module
):
    print(f"Path to notebooks: {path_to_notebooks_module}")
    print(f"Material driver path: {material_driver_path_module}")
    print(f"Temp dir: {temp_dir_module}")
    notebook_path = f"{path_to_notebooks_module}/st_venant_kirchhoff.ipynb"
    with testbook(notebook_path, execute=["setup"]) as tb:
        yield tb, material_driver_path_module, temp_dir_module


def test_uniaxial_st_venant_kirchhoff(notebook_setup_st_venant_kirchhoff):
    tb, material_driver_path, temp_dir = notebook_setup_st_venant_kirchhoff
    tb.execute_cell("test_uniaxial")
    func = tb.ref("run_uniaxial_test")

    return_value, message = func(
        material_driver_path, f"{temp_dir}/st_venant_kirchhoff_run_uniaxial_test.yaml"
    )

    if not return_value:
        print(message)
    # trunk-ignore(bandit/B101)
    assert return_value


def test_simple_shear_st_venant_kirchhoff(notebook_setup_st_venant_kirchhoff):
    tb, material_driver_path, temp_dir = notebook_setup_st_venant_kirchhoff
    tb.execute_cell("test_simple_shear")
    func = tb.ref("run_simple_shear_test")

    return_value, message = func(
        material_driver_path,
        f"{temp_dir}/st_venant_kirchhoff_run_simple_shear_test.yaml",
    )

    if not return_value:
        print(message)
    # trunk-ignore(bandit/B101)
    assert return_value
