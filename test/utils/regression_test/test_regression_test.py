import json
import os
import shutil
import unittest

from regression_test import ExodiffCheck, PeakMemoryCheck, RegressionTest, RunTimeCheck


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
            error_msg = "aperi-mech not found in PATH"
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
                elif f.startswith("performance_"):
                    if f.endswith(".json"):
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


class TestPeakMemoryCheck(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        # Get the current directory
        cls.current_dir = os.path.dirname(os.path.abspath(__file__))

        # Clean up any old files
        for root, _dirs, files in os.walk(cls.current_dir):
            for f in files:
                if f.startswith("performance_"):
                    if f.endswith(".json"):
                        os.remove(os.path.join(root, f))

    def setUp(self):
        self.original_dir = os.getcwd()
        os.chdir(os.path.join(self.__class__.current_dir, "test_files"))

    def tearDown(self):
        # Change back to the original directory
        os.chdir(self.original_dir)

    def test_peak_memory_within_tolerance(self):
        check = PeakMemoryCheck(
            test_name="test_within_tolerance",
            peak_memory=100,
            gold_peak_memory=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_peak_memory_exceeds_upper_limit(self):
        check = PeakMemoryCheck(
            test_name="test_exceeds_upper_limit",
            peak_memory=120,
            gold_peak_memory=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 1)

    def test_peak_memory_below_lower_limit(self):
        check = PeakMemoryCheck(
            test_name="test_below_lower_limit",
            peak_memory=80,
            gold_peak_memory=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_peak_memory_exactly_upper_limit(self):
        check = PeakMemoryCheck(
            test_name="test_exactly_upper_limit",
            peak_memory=110,
            gold_peak_memory=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_peak_memory_exactly_lower_limit(self):
        check = PeakMemoryCheck(
            test_name="test_exactly_lower_limit",
            peak_memory=90,
            gold_peak_memory=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_write_json(self):
        check = PeakMemoryCheck(
            test_name="test_write_json_peak_memory",
            peak_memory=80,
            gold_peak_memory=100,
            tolerance_percent=10,
            write_json=True,
        )
        check.run()
        self.assertTrue(os.path.exists("performance_test_write_json_peak_memory.json"))
        expected = [
            {
                "name": "test_write_json_peak_memory",
                "unit": "MB",
                "value": 80,
            }
        ]
        with open("performance_test_write_json_peak_memory.json", "r") as f:
            result = json.load(f)
        self.assertEqual(result, expected)


class TestRunTimeCheck(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        # Get the current directory
        cls.current_dir = os.path.dirname(os.path.abspath(__file__))

        # Clean up any old files
        for root, _dirs, files in os.walk(cls.current_dir):
            for f in files:
                if f.startswith("performance_"):
                    if f.endswith(".json"):
                        os.remove(os.path.join(root, f))

    def setUp(self):
        self.original_dir = os.getcwd()
        os.chdir(os.path.join(self.__class__.current_dir, "test_files"))

    def tearDown(self):
        # Change back to the original directory
        os.chdir(self.original_dir)

    def test_runtime_within_tolerance(self):
        check = RunTimeCheck(
            test_name="test_within_tolerance",
            executable_time=100,
            gold_executable_time=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_runtime_exceeds_upper_limit(self):
        check = RunTimeCheck(
            test_name="test_exceeds_upper_limit",
            executable_time=120,
            gold_executable_time=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 1)

    def test_runtime_below_lower_limit(self):
        check = RunTimeCheck(
            test_name="test_below_lower_limit",
            executable_time=80,
            gold_executable_time=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_runtime_exactly_upper_limit(self):
        check = RunTimeCheck(
            test_name="test_exactly_upper_limit",
            executable_time=110,
            gold_executable_time=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_runtime_exactly_lower_limit(self):
        check = RunTimeCheck(
            test_name="test_exactly_lower_limit",
            executable_time=90,
            gold_executable_time=100,
            tolerance_percent=10,
        )
        result = check.run()
        self.assertEqual(result, 0)

    def test_write_json(self):
        check = RunTimeCheck(
            test_name="test_write_json_run_time",
            executable_time=90,
            gold_executable_time=100,
            tolerance_percent=10,
            write_json=True,
        )
        check.run()
        self.assertTrue(os.path.exists("performance_test_write_json_run_time.json"))
        expected = [
            {
                "name": "test_write_json_run_time",
                "unit": "s",
                "value": 90,
            }
        ]
        with open("performance_test_write_json_run_time.json", "r") as f:
            result = json.load(f)
        self.assertEqual(result, expected)


if __name__ == "__main__":
    unittest.main()
