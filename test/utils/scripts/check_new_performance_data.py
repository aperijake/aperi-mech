import copy
import json
import logging
import os

# trunk-ignore(bandit/B404)
import subprocess

import pandas as pd

logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")


def load_data_js(filename: str):
    """
    Load benchmark data from a data.js file, stripping the JS assignment and parsing JSON.

    Args:
        filename (str): Path to the data.js file.

    Returns:
        dict or None: Parsed JSON data, or None if file does not exist.
    """
    # Check if the file exists
    if not os.path.exists(filename):
        logging.warning(f"File {filename} does not exist. Skipping this comparison.")
        return None
    with open(filename, "r") as file:
        logging.info(f"Reading {filename}")
        data_js_content = file.read()
        # Remove JS variable assignment to get pure JSON
        data_js_content = data_js_content.replace("window.BENCHMARK_DATA = ", "")
        data_js = json.loads(data_js_content)
    return data_js


def load_new_data(filename: str):
    """
    Load new benchmark data from a JSON file.

    Args:
        filename (str): Path to the JSON file.

    Returns:
        list or None: Parsed JSON data, or None if file does not exist.
    """
    if not os.path.exists(filename):
        logging.warning(f"File {filename} does not exist. Skipping this comparison.")
        return None
    with open(filename, "r") as file:
        logging.info(f"Reading {filename}")
        new_data = json.load(file)
    return new_data


def compare_new_data(
    data_js: dict, new_data: list, new_data_file: str, print_results: bool = False
) -> pd.DataFrame:
    """
    Compare new benchmark data to previous data, normalizing units and computing differences.

    Args:
        data_js (dict or None): Previous benchmark data (from data.js), or None if missing.
        new_data (list): New benchmark data.
        new_data_file (str): Base name for the benchmark file (used for totals).
        print_results (bool): If True, print the comparison DataFrame.

    Returns:
        pd.DataFrame: DataFrame with comparison results and computed differences.
    """
    if data_js is None:
        # If old data is missing, use a deep copy of new_data as last_benchmark
        last_benchmark = copy.deepcopy(new_data)
    else:
        last_benchmark = data_js["entries"]["Benchmark"][-1]["benches"]

    # Convert both old and new data to DataFrames
    last_df = pd.DataFrame(last_benchmark)
    new_df = pd.DataFrame(new_data)

    # Normalize units: treat 's' as 'seconds'
    last_df["unit"] = last_df["unit"].apply(lambda x: "seconds" if x == "s" else x)
    new_df["unit"] = new_df["unit"].apply(lambda x: "seconds" if x == "s" else x)

    # Convert milliseconds to seconds for value columns
    last_df["value"] = last_df.apply(
        lambda x: (
            x["value"] / 1000.0
            if x["unit"] == "ms" or x["unit"] == "milliseconds"
            else x["value"]
        ),
        axis=1,
    )
    new_df["value"] = new_df.apply(
        lambda x: (
            x["value"] / 1000.0
            if x["unit"] == "ms" or x["unit"] == "milliseconds"
            else x["value"]
        ),
        axis=1,
    )
    # After conversion, set all ms/milliseconds units to 'seconds'
    last_df["unit"] = last_df["unit"].apply(
        lambda x: "seconds" if x == "ms" or x == "milliseconds" else x
    )
    new_df["unit"] = new_df["unit"].apply(
        lambda x: "seconds" if x == "ms" or x == "milliseconds" else x
    )

    # Only keep rows in old data that are present in new data
    last_df = last_df[last_df["name"].isin(new_df["name"])]

    # Add a total row for timing (sum of all 'seconds' values)
    total_last_value = last_df[last_df["unit"].isin(["s", "seconds"])]["value"].sum()
    total_last = pd.DataFrame(
        [
            {
                "name": new_data_file + "_Total",
                "value": total_last_value,
                "unit": "seconds",
            }
        ]
    )
    last_df = pd.concat([last_df, total_last], ignore_index=True)

    total_new_value = new_df[new_df["unit"].isin(["s", "seconds"])]["value"].sum()
    total_new = pd.DataFrame(
        [
            {
                "name": new_data_file + "_Total",
                "value": total_new_value,
                "unit": "seconds",
            }
        ]
    )
    new_df = pd.concat([new_df, total_new], ignore_index=True)

    # Merge on 'name'; units should match
    merged_df = pd.merge(last_df, new_df, on="name", suffixes=("_last", "_new"))

    # Ensure units match between old and new
    if (merged_df["unit_last"] == merged_df["unit_new"]).all():
        merged_df["unit"] = merged_df["unit_last"]
        merged_df.drop(columns=["unit_last", "unit_new"], inplace=True)
    else:
        raise ValueError("Units do not match between last and new data")

    # Compute differences and percent changes
    if data_js is None:
        # If old data is missing, all differences are zero
        merged_df["percent_difference"] = 0.0
        merged_df["absolute_difference"] = 0.0
        merged_df["percent_total_difference"] = 0.0
    else:
        merged_df["percent_difference"] = (
            (merged_df["value_new"] - merged_df["value_last"])
            / merged_df["value_last"]
            * 100.0
        )
        # If both values are zero, percent difference is not meaningful
        merged_df.loc[
            (merged_df["value_new"] == 0) & (merged_df["value_last"] == 0),
            "percent_difference",
        ] = 0
        merged_df["absolute_difference"] = (
            merged_df["value_new"] - merged_df["value_last"]
        )

        # Calculate percent_total_difference row-wise, using the total_last_value as denominator
        total_last_value = last_df[last_df["name"] == new_data_file + "_Total"][
            "value"
        ].values[0]
        merged_df["percent_total_difference"] = (
            merged_df["absolute_difference"] / total_last_value * 100.0
            if total_last_value != 0
            else 0.0
        )

    # Optionally print the comparison DataFrame
    if print_results:
        logging.info(
            f"{new_data_file} vs Previous Data\n{merged_df.sort_values('percent_difference', ascending=False)}\n"
        )

    return merged_df


def label_good_bad(
    merged_df: pd.DataFrame,
    weight_percent: float = 0.0,
    weight_percent_total: float = 1.0,
    exponent_percent: float = 1.0,
    exponent_percent_total: float = 1.0,
) -> pd.DataFrame:
    """
    Label benchmarks as good or bad based on performance metrics.

    Args:
        merged_df (pd.DataFrame): DataFrame with comparison results.
        weight_percent (float): Weight for percent_difference.
        weight_percent_total (float): Weight for percent_total_difference.
        exponent_percent (float): Exponent for percent_difference.
        exponent_percent_total (float): Exponent for percent_total_difference.

    Returns:
        pd.DataFrame: DataFrame with an added 'performance_quality' column.
    """
    # Calculate performance quality metric (negative is bad, positive is good)
    merged_df["performance_quality"] = merged_df["percent_difference"].apply(
        lambda x: -1.0 if x >= 0.0 else 1.0
    ) * (
        weight_percent * abs(merged_df["percent_difference"]) ** exponent_percent
        + weight_percent_total
        * abs(merged_df["percent_total_difference"]) ** exponent_percent_total
    )

    return merged_df


def print_best_and_worst(
    merged_df: pd.DataFrame,
    column: str,
    num_best: int = 5,
    num_worst: int = 5,
    smaller_is_better: bool = True,
):
    """
    Print the best and worst performing benchmarks by a given metric.

    Args:
        merged_df (pd.DataFrame): DataFrame with comparison results.
        column (str): Column to sort by.
        num_best (int): Number of best benchmarks to show.
        num_worst (int): Number of worst benchmarks to show.
        smaller_is_better (bool): If True, smaller values are better.

    Returns:
        Tuple[pd.DataFrame, pd.DataFrame]: Best and worst performing benchmarks.
    """
    if merged_df.empty:
        logging.info(f"No data to display for {column}.")
        return None, None

    # Sort and select best/worst
    best_df = merged_df.sort_values(column, ascending=smaller_is_better).head(num_best)
    worst_df = merged_df.sort_values(column, ascending=not smaller_is_better).head(
        num_worst
    )

    # Set pandas display options for clarity
    pd.set_option("display.max_columns", None)
    pd.set_option("display.max_colwidth", None)

    # Log the results
    logging.info(f"Best {num_best} performing {column} benchmarks:\n{best_df}\n")
    logging.info(f"Worst {num_worst} performing {column} benchmarks:\n{worst_df}\n")

    return best_df, worst_df


def check_new_performance_data(
    data_file_pairs: dict,
    root_input_dir: str = None,
    root_output_dir: str = None,
    timing_output_file: str = None,
    memory_output_file: str = None,
):
    """
    Main routine to compare new performance data to previous data and report results.

    Args:
        data_file_pairs (dict): Mapping of new data files to old data.js files.
        root_input_dir (str, optional): Root directory for input files.
        root_output_dir (str, optional): Root directory for output files.
        timing_output_file (str, optional): Output file for timing results.
        memory_output_file (str, optional): Output file for memory results.
    """
    logging.info("Checking new performance data")
    # Use git to find the project root if not provided
    if root_input_dir is None:
        project_root = (
            # trunk-ignore(bandit/B603)
            # trunk-ignore(bandit/B607)
            subprocess.check_output(["git", "rev-parse", "--show-toplevel"])
            .strip()
            .decode("utf-8")
        )
    else:
        project_root = root_input_dir

    if root_output_dir is None:
        root_output_dir = project_root

    logging.info(f"Project root: {project_root}")
    logging.info(f"Root output directory: {root_output_dir}")

    full_df = pd.DataFrame()

    # Iterate over all data file pairs and compare
    for new_data_file, data_file in data_file_pairs.items():
        data_js = load_data_js(f"{project_root}/{data_file}")
        new_data = load_new_data(f"{project_root}/{new_data_file}")
        if new_data is None:
            logging.info(f"Skipping {new_data_file} because new data file is missing.")
            continue

        # Get the base name of the new data file, drop the 'performance_' and '.json'
        new_data_file_base = (
            new_data_file.split("/")[-1]
            .replace("performance_", "")
            .replace(".json", "")
        )
        merged_df = compare_new_data(data_js, new_data, new_data_file_base)
        full_df = pd.concat([full_df, merged_df], ignore_index=True)

    if full_df.empty:
        # No comparisons were made because no new data files were found.
        logging.info("No comparisons were made because no new data files were found.")
        return

    # Label the benchmarks as good or bad based on the metric (positive is good, negative is bad)
    full_df = label_good_bad(full_df)

    # Split the dataframe into units of "seconds" and "MB"
    seconds_df = full_df[full_df["unit"] == "seconds"]
    mb_df = full_df[full_df["unit"] == "MB"]

    # Print the best and worst performing benchmarks for timing and memory
    logging.info("Best and worst performing benchmarks, timing:")
    print_best_and_worst(seconds_df, "percent_total_difference")
    logging.info("Best and worst performing benchmarks, memory:")
    print_best_and_worst(mb_df, "percent_difference")

    # Sanity check: ensure all rows are accounted for
    if len(full_df) != len(seconds_df) + len(mb_df):
        raise ValueError(
            "The sum of the seconds and mb DataFrames does not equal the full DataFrame"
        )

    # Save the seconds and mb DataFrames to JSON files
    if timing_output_file is None:
        timing_output_file = "gh-pages/performance_comparison_timing_results.json"
    seconds_df.to_json(
        f"{root_output_dir}/{timing_output_file}",
        orient="records",
    )

    if memory_output_file is None:
        memory_output_file = "gh-pages/performance_comparison_memory_results.json"
    mb_df.to_json(
        f"{root_output_dir}/{memory_output_file}",
        orient="records",
    )


def main():
    """
    Entry point for the script. Defines file pairs and runs the comparison.
    """
    data_file_pairs = {
        "protego_mech/build/performance_gtest_all_results.json": "gh-pages/dev/bench/gtest/AperiAzureGPU2/data.js",
        "protego_mech/build/performance_aperi_mech_all_results.json": "gh-pages/dev/bench/aperi_mech/AperiAzureGPU2/data.js",
        "protego_mech/build/performance_fem_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/fem/solver/data.js",
        "protego_mech/build/performance_fem_strain_smoothing_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/sfem/solver/data.js",
        "protego_mech/build/performance_rkpm_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm/solver/data.js",
        "protego_mech/build/performance_rkpm_nodal_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm_nodal/solver/data.js",
    }
    check_new_performance_data(data_file_pairs)


if __name__ == "__main__":
    main()
