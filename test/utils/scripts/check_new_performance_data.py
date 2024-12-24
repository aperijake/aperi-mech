import json
import subprocess

import pandas as pd


# Load data from data.js
def load_data_js(file):
    with open(file, "r") as file:
        data_js_content = file.read()
        data_js_content = data_js_content.replace("window.BENCHMARK_DATA = ", "")
        data_js = json.loads(data_js_content)
    return data_js


# Load new performance data
def load_new_data(file):
    with open(file, "r") as file:
        new_data = json.load(file)
    return new_data


def compare_new_data(data_js, new_data, new_data_file, print_results=False):
    # Extract the last benchmark data from data.js
    last_benchmark = data_js["entries"]["Benchmark"][-1]["benches"]

    # Convert the data to pandas DataFrames
    last_df = pd.DataFrame(last_benchmark)
    new_df = pd.DataFrame(new_data)

    # Find the rows that are in the last data but not in the new data and remove them
    last_df = last_df[last_df["name"].isin(new_df["name"])]

    # Find all the rows that have a 'unit' of 's' or 'seconds' and add a new_data_file_Total row
    total_last_value = last_df[last_df["unit"].isin(["s", "seconds"])]["value"].sum()
    total_last = pd.DataFrame(
        [{"name": new_data_file + "_Total", "value": total_last_value, "unit": "s"}]
    )
    last_df = pd.concat([last_df, total_last], ignore_index=True)

    total_new_value = new_df[new_df["unit"].isin(["s", "seconds"])]["value"].sum()
    total_new = pd.DataFrame(
        [{"name": new_data_file + "_Total", "value": total_new_value, "unit": "s"}]
    )
    new_df = pd.concat([new_df, total_new], ignore_index=True)

    # Merge the data on the 'name' column, the unit column should be the same
    merged_df = pd.merge(last_df, new_df, on="name", suffixes=("_last", "_new"))

    # Verify that the units are the same
    if (merged_df["unit_last"] == merged_df["unit_new"]).all():
        merged_df["unit"] = merged_df["unit_last"]
        merged_df.drop(columns=["unit_last", "unit_new"], inplace=True)
    else:
        raise ValueError("Units do not match between last and new data")

    # Calculate the percent difference between the new and last values
    merged_df["percent_difference"] = (
        (merged_df["value_new"] - merged_df["value_last"])
        / merged_df["value_last"]
        * 100.0
    )
    # Percent difference is not meaningful for values of 0, so set the percent difference to 0 if both values are 0
    merged_df.loc[
        (merged_df["value_new"] == 0) & (merged_df["value_last"] == 0),
        "percent_difference",
    ] = 0

    # Calculate the absolute difference between the new and last values
    merged_df["absolute_difference"] = merged_df["value_new"] - merged_df["value_last"]

    # Calculate the percent difference of each row with respect to the total time (new_data_file_Total column)
    # absolute_difference / total_last_value * 100.0
    merged_df["percent_total_difference"] = (
        merged_df["absolute_difference"] / total_last_value * 100.0
    )

    # Print the comparison, sorted by the percent difference
    if print_results:
        print(f"{data_file} vs {new_data_file}")
        print(merged_df.sort_values("percent_difference", ascending=False))
        print("\n")

    return merged_df


def label_good_bad(
    merged_df,
    weight_percent=0.0,
    weight_percent_total=1.0,
    exponent_percent=1.0,
    exponent_percent_total=1.0,
):
    """
    Label the benchmarks as good or bad based on the metric (positive is good, negative is bad).
    - performance_quality = sign(percent_difference) * (weight_percent * abs(percent_difference) ** exponent_percent + weight_percent_total * abs(percent_total_difference) ** exponent_percent_total)


    Parameters:
    merged_df (pd.DataFrame): The DataFrame containing the merged data
    weight_percent (float): The weight to apply to the percent_difference
    weight_percent_total (float): The weight to apply to the percent_total_difference
    exponent_percent (float): The exponent to apply to the percent_difference
    exponent_percent_total (float): The exponent to apply to the percent_total

    Returns:
    merged_df (pd.DataFrame): The DataFrame containing the merged data with the 'performance_quality' column
    """

    # Calculate the performance quality
    merged_df["performance_quality"] = merged_df["percent_difference"].apply(
        lambda x: -1.0 if x >= 0.0 else 1.0
    ) * (
        weight_percent * abs(merged_df["percent_difference"]) ** exponent_percent
        + weight_percent_total
        * abs(merged_df["percent_total_difference"]) ** exponent_percent_total
    )

    return merged_df


def print_best_and_worst(
    merged_df, column, num_best=5, num_worst=5, smaller_is_better=True
):
    """
    Find and print the best and worst performing benchmarks in the merged_df.
    The best/worst performing benchmarks are determined by the column specified.

    Parameters:
    merged_df (pd.DataFrame): The DataFrame containing the merged data
    column (str): The column to check for the best and worst performing benchmarks
    num_best (int): The number of best performing benchmarks to return
    num_worst (int): The number of worst performing benchmarks to return

    Returns:
    best_df (pd.DataFrame): The DataFrame containing the best performing benchmarks
    worst_df (pd.DataFrame): The DataFrame containing the worst performing benchmarks
    """

    # Find the best and worst performing benchmarks, smallest difference is best
    best_df = merged_df.sort_values(column, ascending=smaller_is_better).head(num_best)
    worst_df = merged_df.sort_values(column, ascending=not smaller_is_better).head(
        num_worst
    )

    # Print the best and worst performing benchmarks
    print(f"Best {num_best} performing {column} benchmarks:")
    print(best_df)
    print("\n")

    print(f"Worst {num_worst} performing {column} benchmarks:")
    print(worst_df)
    print("\n")

    return best_df, worst_df


# with open('test_files/gh_pages_data.js', 'r') as file:
# with open('test_files/new_gh_pages_data.json', 'r') as file:

if __name__ == "__main__":
    # data.js to new data file mapping, paths are relative to the project root
    data_file_pairs = {
        "build/performance_aperi_mech_all_results.json": "gh-pages/dev/bench/aperi_mech/AperiAzureGPU2/data.js",
        "build/performance_fem_create_element.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/fem/create_element/data.js",
        "build/performance_fem_create_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/fem/create_solver/data.js",
        "build/performance_fem_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/fem/solver/data.js",
        "build/performance_fem_strain_smoothing_create_element.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/sfem/create_element/data.js",
        "build/performance_fem_strain_smoothing_create_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/sfem/create_solver/data.js",
        "build/performance_fem_strain_smoothing_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/sfem/solver/data.js",
        "build/performance_rkpm_create_element.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm/create_element/data.js",
        "build/performance_rkpm_create_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm/create_solver/data.js",
        "build/performance_rkpm_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm/solver/data.js",
        "build/performance_rkpm_nodal_create_element.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm_nodal/create_element/data.js",
        "build/performance_rkpm_nodal_create_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm_nodal/create_solver/data.js",
        "build/performance_rkpm_nodal_solver.json": "gh-pages/dev/bench/aperi_mech_detailed/AperiAzureGPU2/rkpm_nodal/solver/data.js",
    }

    # Use git to find the project root
    project_root = (
        subprocess.check_output(["git", "rev-parse", "--show-toplevel"])
        .strip()
        .decode("utf-8")
    )

    full_df = pd.DataFrame()

    # Compare the new data to the last data in data.js
    for new_data_file, data_file in data_file_pairs.items():
        # Load the data, prepending the project root to the file paths
        data_js = load_data_js(f"{project_root}/{data_file}")
        new_data = load_new_data(f"{project_root}/{new_data_file}")

        # Get the base name of the new data file, drop the 'performance_' and '.json'
        new_data_file_base = (
            new_data_file.split("/")[-1]
            .replace("performance_", "")
            .replace(".json", "")
        )
        merged_df = compare_new_data(data_js, new_data, new_data_file_base)
        full_df = pd.concat([full_df, merged_df], ignore_index=True)

    # Print the best and worst performing benchmarks
    # best_percent_df, worst_percent_df = print_best_and_worst(full_df, 'percent_difference')
    # best_absolute_df, worst_absolute_df = print_best_and_worst(full_df, 'absolute_difference')
    best_total_percent_df, worst_total_percent_df = print_best_and_worst(
        full_df, "percent_total_difference"
    )

    # Label the benchmarks as good or bad based on the metric (positive is good, negative is bad)
    full_df = label_good_bad(full_df)
    best_quality_df, worst_quality_df = print_best_and_worst(
        full_df, "performance_quality", smaller_is_better=False
    )

    # Save the full DataFrame to a JSON file
    full_df.to_json(
        f"{project_root}/gh-pages/performance_comparison_results.json", orient="records"
    )
