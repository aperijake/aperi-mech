import json
import os
import unittest

from join_performance_results import join_performance_results


class TestJoinPerformanceResults(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        # Get the current directory
        cls.current_dir = os.path.dirname(os.path.abspath(__file__))

    def setUp(self):
        self.original_dir = os.getcwd()
        os.chdir(os.path.join(self.__class__.current_dir, "test_files"))

        # Paths to the test files
        self.data_1 = "data_1.json"
        self.data_2 = "data_2.json"
        self.gold_file = "all_data.json"
        self.output_file = "output.json"

        # Ensure the output file does not exist before the test
        if os.path.exists(self.output_file):
            os.remove(self.output_file)

    def tearDown(self):
        # Clean up the output file after the test
        if os.path.exists(self.output_file):
            os.remove(self.output_file)

        # Change back to the original directory
        os.chdir(self.original_dir)

    def test_join_performance_results(self):
        # Run the join_performance_results function
        join_performance_results([self.data_1, self.data_2], self.output_file)

        # Load the output and gold files
        with open(self.output_file, "r") as f:
            output_data = json.load(f)
        with open(self.gold_file, "r") as f:
            gold_data = json.load(f)

        # Assert that the output matches the gold data
        self.assertEqual(output_data, gold_data)


if __name__ == "__main__":
    unittest.main()
