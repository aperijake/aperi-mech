#!python3

import argparse
import json


def join_performance_results(results_files, output_file):
    results = []
    for results_file in results_files:
        with open(results_file, "r") as f:
            results.extend(json.load(f))
    with open(output_file, "w") as f:
        json.dump(results, f, indent=2)
        f.write("\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Join performance results")
    parser.add_argument("results_files", nargs="+", help="Performance results files")
    parser.add_argument("output_file", help="Output file")
    args = parser.parse_args()
    join_performance_results(args.results_files, args.output_file)
