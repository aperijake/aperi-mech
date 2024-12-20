#!python3

import argparse
import csv
import json


def convert_csv_performance_data_to_json(results_files, output_file):
    """
    Convert a set of CSV performance data files to a single JSON file

    A CSV performance data file is expected to have the following format:
        Timer Name, Time (seconds), Run
        Explicit_Solver_UpdateFieldStates, 2.154e-05, run_1
        Explicit_Solver_ApplyBoundaryConditions, 0.00017726, run_1

    The JSON file will have the following format:
    [
        {
            "name": "Explicit_Solver_UpdateFieldStates_run_1",
            "unit": "seconds"
            "value": 2.154e-05,
        },
        {
            "name": "Explicit_Solver_ApplyBoundaryConditions_run_1",
            "unit": "seconds"
            "value": 0.00017726,
        },
    ]
    """

    results = []
    for results_file in results_files:
        with open(results_file, "r") as f:
            reader = csv.DictReader(f)
            for row in reader:
                row = {k.strip(): v for k, v in row.items()}
                # Get the timer name, strip any whitespace
                name = row["Timer Name"].strip()
                # If the 'Run' column is present, append it to the name, strip any whitespace
                if "Run" in row:
                    name += "_" + row["Run"].strip()
                result = {
                    "name": name,
                    "unit": "seconds",
                    "value": float(row["Time (seconds)"].strip()),
                }
                results.append(result)

    with open(output_file, "w") as f:
        json.dump(results, f, indent=2)
        f.write("\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Grab a set of csv performance data files and convert them to a single json file"
    )
    parser.add_argument(
        "results_files", nargs="+", help="CSV performance results files"
    )
    parser.add_argument("output_file", help="Output file")
    args = parser.parse_args()
    convert_csv_performance_data_to_json(args.results_files, args.output_file)
