import pytest
from testbook import testbook

# Define a fixture for shared notebook setup
@pytest.fixture(scope="module")
def notebook_setup(material_driver_path_module, path_to_notebooks_module, temp_dir_module):
    print(f"Path to notebooks: {path_to_notebooks_module}")
    print(f"Material driver path: {material_driver_path_module}")
    print(f"Temp dir: {temp_dir_module}")
    notebook_path = f"{path_to_notebooks_module}/neohookean.ipynb"
    with testbook(notebook_path, execute=['setup']) as tb:
        yield tb, material_driver_path_module, temp_dir_module

def test_uniaxial(notebook_setup):
    tb, material_driver_path, temp_dir = notebook_setup
    tb.execute_cell("test_uniaxial")
    func = tb.ref("run_uniaxial_test")

    return_value, message = func(material_driver_path, f"{temp_dir}/neohookean_run_uniaxial_test.yaml")

    if not return_value:
        print(message)
    assert return_value

def test_simple_shear(notebook_setup):
    tb, material_driver_path, temp_dir = notebook_setup
    tb.execute_cell("test_simple_shear")
    func = tb.ref("run_simple_shear_test")

    return_value, message = func(material_driver_path, f"{temp_dir}/neohookean_run_simple_shear_test.yaml")

    if not return_value:
        print(message)
    assert return_value