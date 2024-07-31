import os
import sys
import unittest


class CustomTextTestResult(unittest.TextTestResult):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.passed_tests = []
        self.failed_tests = []

    def startTest(self, test):
        super().startTest(test)

    def addSuccess(self, test):
        self.passed_tests.append(str(test))
        super().addSuccess(test)

    def addFailure(self, test, err):
        self.failed_tests.append(str(test))
        super().addFailure(test, err)


class CustomTextTestRunner(unittest.TextTestRunner):
    def _makeResult(self):
        return CustomTextTestResult(self.stream, self.descriptions, self.verbosity)


def run_tests(test_dirs):
    fail = False
    all_passed_tests = []
    all_failed_tests = []

    for dir in test_dirs:
        print(f"Running tests in {dir}")
        try:
            # Add the test directory to the system path
            sys.path.append(os.path.abspath(dir))
            # Discover and run tests
            loader = unittest.TestLoader()
            suite = loader.discover(dir)
            runner = CustomTextTestRunner()
            result = runner.run(suite)
            all_passed_tests.extend(result.passed_tests)
            all_failed_tests.extend(result.failed_tests)
            if not result.wasSuccessful():
                fail = True
        except Exception as e:
            print(f"An error occurred while running tests in {dir}: {e}")
            fail = True
        finally:
            # Remove the test directory from the system path
            sys.path.pop()

    return fail, all_passed_tests, all_failed_tests


if __name__ == "__main__":
    test_dirs = ["regression_test"]
    fail, all_passed_tests, all_failed_tests = run_tests(test_dirs)

    print("\n############## TEST SUMMARY ##############")
    print("Passed tests:")
    for test_name in all_passed_tests:
        print(f" - {test_name}")

    print("Failed tests:")
    for test_name in all_failed_tests:
        print(f" - {test_name}")

    print(
        "Note: Some tests above check for failure, so a test that has 'FAIL' in the output may actually be passing."
    )
    print("------------------------------------------")
    if fail:
        print("Overall result: \033[91mFAIL\033[0m")
        print("##########################################")
        sys.exit(1)
    elif len(all_passed_tests) == 0:
        print("No tests were run.")
        print("Overall result: \033[91mFAIL\033[0m")
        print("##########################################")
        sys.exit(1)
    else:
        print("Overall result: \033[92mPASS\033[0m")
        print("##########################################")
        sys.exit(0)
