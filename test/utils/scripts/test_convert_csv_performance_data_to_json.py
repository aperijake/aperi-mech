import json
import os
import unittest

from convert_csv_performance_data_to_json import convert_csv_performance_data_to_json


class TestConvertCsvPerformanceDataToJson(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        # Get the current directory
        cls.current_dir = os.path.dirname(os.path.abspath(__file__))

    def setUp(self):
        self.original_dir = os.getcwd()
        os.chdir(os.path.join(self.__class__.current_dir, "test_files"))

        # Paths to the test files
        self.data_a = "data_a.csv"
        self.data_b = "data_b.csv"
        self.gold_file = "all_converted_csv_data.json"
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

    def test_convert_csv_performance_data_to_json(self):
        # Run the convert_csv_performance_data_to_json function
        convert_csv_performance_data_to_json(
            [self.data_a, self.data_b], self.output_file
        )

        # Load the output and gold files
        with open(self.output_file, "r") as f:
            output_data = json.load(f)
        with open(self.gold_file, "r") as f:
            gold_data = json.load(f)

        # Assert that the output matches the gold data
        self.assertEqual(output_data, gold_data)


if __name__ == "__main__":
    unittest.main()
