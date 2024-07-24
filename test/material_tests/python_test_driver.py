from testbook import testbook

def test_uniaxial(material_driver_path, path_to_notebooks, temp_dir):
    print(f"Path to notebooks: {path_to_notebooks}")
    print(f"Material driver path: {material_driver_path}")
    print(f"Temp dir: {temp_dir}")
    notebook_path = path_to_notebooks + "/neohookean.ipynb"
    with testbook(notebook_path) as tb:
        # The following code block is equivalent to the setup cell in the notebook
        tb.execute_cell("setup")
        tb.execute_cell("test_uniaxial")
        func = tb.ref("run_uniaxial_test")

        return_value, message = func(material_driver_path, temp_dir+'/neohookean_run_uniaxial_test.yaml')

        if not return_value:
            print(message)
        assert return_value

def test_simple_shear(material_driver_path, path_to_notebooks, temp_dir):
    print(f"Path to notebooks: {path_to_notebooks}")
    print(f"Material driver path: {material_driver_path}")
    print(f"Temp dir: {temp_dir}")
    notebook_path = path_to_notebooks + "/neohookean.ipynb"
    with testbook(notebook_path) as tb:
        # The following code block is equivalent to the setup cell in the notebook
        tb.execute_cell("setup")
        tb.execute_cell("test_simple_shear")
        func = tb.ref("run_simple_shear_test")

        return_value, message = func(material_driver_path, temp_dir+'/neohookean_run_simple_shear_test.yaml')

        if not return_value:
            print(message)
        assert return_value