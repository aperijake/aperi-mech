import json
import os
import unittest

from check_new_performance_data import check_new_performance_data


class TestCheckNewPerformanceData(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        # Get the current directory
        cls.current_dir = os.path.dirname(os.path.abspath(__file__))

    def setUp(self):
        self.original_dir = os.getcwd()
        os.chdir(os.path.join(self.__class__.current_dir, "test_files"))

        # Paths to the test files
        self.data_last = "gh_pages_data.js"
        self.data_new = "new_gh_pages_data.json"
        self.gold_file_timing = "gold_timing.json"
        self.gold_file_memory = "gold_memory.json"
        self.output_file_timing = "output_timing.json"
        self.output_file_memory = "output_memory.json"

        # Ensure the output file does not exist before the test
        if os.path.exists(self.output_file_timing):
            os.remove(self.output_file_timing)
        if os.path.exists(self.output_file_memory):
            os.remove(self.output_file_memory)

    def tearDown(self):
        # Clean up the output file after the test
        if os.path.exists(self.output_file_timing):
            os.remove(self.output_file_timing)
        if os.path.exists(self.output_file_memory):
            os.remove(self.output_file_memory)

        # Change back to the original directory
        os.chdir(self.original_dir)

    def test_check_new_performance_data(self):
        # Run the check_new_performance_data script

        # Test data_file_pairs
        data_file_pairs = {"new_gh_pages_data.json": "gh_pages_data.js"}
        check_new_performance_data(
            data_file_pairs, ".", ".", self.output_file_timing, self.output_file_memory
        )

        # Load the output and gold files
        with open(self.output_file_timing, "r") as f:
            output_data_timing = json.load(f)
        with open(self.gold_file_timing, "r") as f:
            gold_data_timing = json.load(f)

        # Assert that the output matches the gold data
        self.assertEqual(output_data_timing, gold_data_timing)

        # Load the output and gold files
        with open(self.output_file_memory, "r") as f:
            output_data_memory = json.load(f)
        with open(self.gold_file_memory, "r") as f:
            gold_data_memory = json.load(f)

        # Assert that the output matches the gold data
        self.assertEqual(output_data_memory, gold_data_memory)

    def test_missing_old_data_file(self):
        # Only new data file exists; old data file is missing
        data_file_pairs = {"new_gh_pages_data.json": "does_not_exist.js"}
        check_new_performance_data(
            data_file_pairs, ".", ".", self.output_file_timing, self.output_file_memory
        )
        # Output should exist and all differences should be zero
        with open(self.output_file_timing, "r") as f:
            output_data_timing = json.load(f)
        for row in output_data_timing:
            self.assertEqual(row["percent_difference"], 0.0)
            self.assertEqual(row["absolute_difference"], 0.0)
            self.assertEqual(row["percent_total_difference"], 0.0)

    def test_missing_new_data_file(self):
        # New data file is missing; should skip and not create output
        data_file_pairs = {"does_not_exist.json": "gh_pages_data.js"}
        check_new_performance_data(
            data_file_pairs, ".", ".", self.output_file_timing, self.output_file_memory
        )
        self.assertFalse(os.path.exists(self.output_file_timing))
        self.assertFalse(os.path.exists(self.output_file_memory))


if __name__ == "__main__":
    unittest.main()
