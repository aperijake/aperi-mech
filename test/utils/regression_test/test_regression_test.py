import os
import shutil
import unittest

from regression_test import ExodiffCheck, RegressionTest


class TestRegressionTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        # Find the exodiff executable
        cls.exodiff = None
        for path in os.environ["PATH"].split(os.pathsep):
            exodiff = os.path.join(path, "exodiff")
            if os.path.exists(exodiff):
                cls.exodiff = exodiff
                break

        if cls.exodiff is None:
            error_msg = "exodiff not found in PATH"
            error_msg += "\nPlease make sure the environment is set up correctly:"
            error_msg += "\n - Activate the correct spack environment. e.g 'spack env activate <env-name>'"
            raise FileNotFoundError(error_msg)

        # Make sure aperi-mech is in the PATH
        cls.aperi_mech = shutil.which("aperi-mech")
        if cls.aperi_mech is None:
            error_msg = "aperi-mech not found at: " + cls.aperi_mech
            error_msg += "\nPlease make sure the environment is set up correctly:"
            error_msg += r"\n - Make sure 'aperi-mech' is in the PATH. e.g. 'which aperi-mech' to check. If not, add it to the PATH: 'export PATH=\$PATH:/path/to/aperi-mech'"
            raise FileNotFoundError(error_msg)

        # Get the current directory
        cls.current_dir = os.path.dirname(os.path.abspath(__file__))

        # Clean up any old files
        for root, _dirs, files in os.walk(cls.current_dir):
            for f in files:
                if f.startswith("regression_test_") or f.startswith("exodiff_check_"):
                    if f.endswith(".log"):
                        os.remove(os.path.join(root, f))
            if "test_output.log" in files:
                os.remove(os.path.join(root, "test_output.log"))

    def setUp(self):
        self.original_dir = os.getcwd()
        os.chdir(os.path.join(self.__class__.current_dir, "test_files"))

    def tearDown(self):
        # Clean up any old files, but keep the log files
        if os.path.exists("results.exo"):
            os.remove("results.exo")
        # Change back to the original directory
        os.chdir(self.original_dir)

    def test_run_regression_test_fail(self):
        # Setup
        test = RegressionTest(
            "fail_run", self.__class__.aperi_mech, 1, ["bad_input.yaml"]
        )

        # Run the executable and verify the return code
        result, _stats = test.run()
        self.assertFalse(result == 0)

    def test_run_exodiff_check_fail(self):
        # Setup
        test = RegressionTest(
            "fail_exodiff", self.__class__.aperi_mech, 1, ["input.yaml"]
        )
        exodiff_check = ExodiffCheck(
            "fail_exodiff",
            self.__class__.exodiff,
            "compare.exodiff",
            "results.exo",
            "bad_gold.exo",
            [],
        )

        # Run the executable and verify the return code
        result, _stats = test.run()
        self.assertTrue(result == 0)

        # Run exodiff and verify the return code
        result = exodiff_check.run()
        self.assertFalse(result == 0)

    def test_run_exodiff_check_success(self):
        # Setup
        test = RegressionTest(
            "success_test", self.__class__.aperi_mech, 1, ["input.yaml"]
        )
        exodiff_check = ExodiffCheck(
            "success_test",
            self.__class__.exodiff,
            "compare.exodiff",
            "results.exo",
            "good_gold.exo",
            [],
        )

        # Run the executable and verify the return code
        result, _stats = test.run()
        self.assertTrue(result == 0)

        # Run exodiff and verify the return code
        result = exodiff_check.run()
        self.assertTrue(result == 0)


if __name__ == "__main__":
    unittest.main()
