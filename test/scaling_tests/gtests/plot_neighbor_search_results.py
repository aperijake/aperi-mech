import argparse
import json
import os

import matplotlib.pyplot as plt
import pandas as pd


def read_csv_file(file_path):
    """
    Read the CSV file and parse the data into a DataFrame.
    Example contents of the CSV file:
        Timer Name, Time (seconds), Percent of Total Time
        Neighbor Search Processor_Instantiate, 0.0086479, 0.0018204
        Neighbor Search Processor_KokkosDeepCopy, 2.09e-06, 4.39948e-07
    """

    # Create a DataFrame from the CSV file
    df = pd.read_csv(file_path, skipinitialspace=True)

    # Parse file name, e.g.:
    #   scaling_neighbor_search_CompadreApproximationFunctionPerformanceTest_DISABLED_BenchmarkFunctionComputationsScaling_release_procs_1_cpu_elem_192x192x576.csv
    processor_type = "cpu" if "cpu" in file_path else "gpu"
    processors = int(file_path.split("procs_")[1].split("_")[0])
    elements = (
        int(file_path.split("elem_")[1].split("x")[0])
        * int(file_path.split("elem_")[1].split("x")[1])
        * int(file_path.split("elem_")[1].split("x")[2].split("x")[0].split(".")[0])
    )
    nodes = (
        (int(file_path.split("elem_")[1].split("x")[0]) + 1)
        * (int(file_path.split("elem_")[1].split("x")[1]) + 1)
        * (
            int(file_path.split("elem_")[1].split("x")[2].split("x")[0].split(".")[0])
            + 1
        )
    )
    elements_per_processor = elements / processors
    nodes_per_processor = nodes / processors

    # Change the timer names to be the last string after the last underscore
    df["Timer Name"] = df["Timer Name"].apply(lambda x: x.split("_")[-1])

    # Rename UnpackSearchResultsIntoFields to UnpackResults
    df["Timer Name"] = df["Timer Name"].apply(
        lambda x: "UnpackResults" if x == "UnpackSearchResultsIntoField" else x
    )

    # Create a new row. If it has "Create", "Kokkos", "Compute", or "Ghost", then add them together and put in "Everything Else"
    keywords = ["Create", "Kokkos", "Compute", "Ghost"]
    mask = df["Timer Name"].str.contains("|".join(keywords))
    everything_else_time = df.loc[mask, "Time (seconds)"].sum()
    everything_else_time_percent = df.loc[mask, "Percent of Total Time"].sum()

    # Remove the rows that contain the keywords
    df = df[~mask]

    # Add the "Everything Else" row to the DataFrame
    everything_else_time_df = pd.DataFrame(
        {
            "Timer Name": ["Everything Else"],
            "Time (seconds)": [everything_else_time],
            "Percent of Total Time": [everything_else_time_percent],
        },
    )

    # Remove the "Intiantiate" row
    df = df[df["Timer Name"] != "Instantiate"]

    # Add the "Everything Else" row to the DataFrame
    df = pd.concat([df, everything_else_time_df], ignore_index=True)

    # Add the number of processors, processor type, number of elements, and number of nodes to the row
    df["processors"] = processors
    df["processor_type"] = processor_type
    df["elements"] = elements
    df["nodes"] = nodes
    df["elements_per_processor"] = elements_per_processor
    df["nodes_per_processor"] = nodes_per_processor
    df["total_time"] = df["Time (seconds)"].sum()

    # Reset the index
    df.reset_index(drop=True, inplace=True)

    return df


def plot_nodes_vs_time(df):
    """
    Plot the function value construction time vs. number of nodes for each timer name.
    """

    # Get unique timer names
    timer_names = df["Timer Name"].unique()

    # Define a color palette
    colors = plt.cm.tab10.colors

    # Grab green, the 3rd color
    green = colors[2]

    # Skip the colors until after green
    colors = colors[3:]

    # Define a list of linestyles
    linestyles = ["--", "-", "-.", ":"]

    # Add the total time to the plot
    grouped = df.groupby(["processors", "processor_type"])
    for idx_group, (name, group) in enumerate(grouped):
        plt.loglog(
            group["nodes"],
            group["total_time"],
            label=f"Total Time {int(name[0])} {name[1]}",
            marker="o",
            color=green,
            linestyle=linestyles[idx_group % len(linestyles)],
        )

    # Plot the data
    for idx, timer_name in enumerate(timer_names):
        timer_df = df[df["Timer Name"] == timer_name]
        grouped = timer_df.groupby(["processors", "processor_type"])
        color = colors[idx % len(colors)]
        for idx_group, (name, group) in enumerate(grouped):
            plt.loglog(
                group["nodes"],
                group["Time (seconds)"],
                label=f"{timer_name} {int(name[0])} {name[1]}",
                marker="o",
                color=color,
                linestyle=linestyles[idx_group % len(linestyles)],
            )

    # Get the list of unique number of nodes
    nodes = list(df["nodes"].unique())

    # Set the x-ticks and labels
    plt.xlabel("Number of Nodes")
    plt.xticks(nodes, labels=[f"{int(n):.2e}" for n in nodes])
    plt.ylabel("Computation Time (s)")
    plt.title("Time to Compute vs. Number of Nodes")
    plt.legend()
    plt.grid("on")
    plt.tight_layout()
    plt.savefig("NeighborSearchNodesVsComputationTime.pdf")
    plt.savefig("NeighborSearchNodesVsComputationTime.png")
    plt.close()

    # Calculate the advantage of using the GPU, value cpu / value gpu for just the "total_time"
    for idx, (name, group) in enumerate(grouped):
        if name[1] == "cpu":
            cpu_group = group
        elif name[1] == "gpu":
            gpu_group = group

    # Calculate the advantage of using the GPU
    advantage = cpu_group["total_time"].values / gpu_group["total_time"].values

    # Plot the advantage of using the GPU
    plt.semilogx(
        cpu_group["nodes"],
        advantage,
        label=f"Total Time (Time 1 CPU / Time GPU) {int(name[0])} {name[1]}",
        marker="o",
        color=green,
        linestyle="-",
    )

    # Calculate the advantage of using the GPU, value cpu / value gpu for each timer name
    for idx, timer_name in enumerate(timer_names):
        timer_df = df[df["Timer Name"] == timer_name]
        grouped = timer_df.groupby(["processors", "processor_type"])
        color = colors[idx % len(colors)]
        cpu_group = None
        gpu_group = None
        for idx_group, (name, group) in enumerate(grouped):
            if name[1] == "cpu":
                cpu_group = group
            elif name[1] == "gpu":
                gpu_group = group

        # Ensure both cpu_group and gpu_group are found
        if cpu_group is not None and gpu_group is not None:
            # Calculate the advantage of using the GPU
            advantage = (
                cpu_group["Time (seconds)"].values / gpu_group["Time (seconds)"].values
            )

            # Plot the advantage of using the GPU
            plt.semilogx(
                cpu_group["nodes"],
                advantage,
                label=f"{timer_name} (Time 1 CPU / Time GPU) {int(name[0])} {name[1]}",
                marker="o",
                color=color,
                linestyle="-",
            )

    # Set the x-ticks and labels
    plt.xlabel("Number of Nodes")
    plt.xticks(nodes, labels=[f"{int(n):.2e}" for n in nodes])
    plt.ylabel("Advantage of Using the GPU")
    plt.title("GPU Advantage for Computation Time")
    plt.legend()
    plt.grid("on")
    plt.savefig("NeighborSearchAdvantageOfUsingGPUComputationTime.pdf")
    plt.savefig("NeighborSearchAdvantageOfUsingGPUComputationTime.png")
    plt.close()


def get_args():
    """
    Get the command line arguments.
    """

    parser = argparse.ArgumentParser(description="Plot the solver results")
    parser.add_argument("path", help="Path to the directory containing the JSON files")
    return parser.parse_args()


if __name__ == "__main__":
    # Get the command line arguments
    args = get_args()

    # Base path to the JSON file
    base_path = os.path.abspath(args.path) + os.sep

    # List of JSON files to read. Find files that start with "scaling_gtest_Compadre" in the directory
    files = [
        base_path + f
        for f in os.listdir(base_path)
        if f.startswith("scaling_neighbor_search_Compadre")
    ]

    # Throw an error if no files are found
    if len(files) == 0:
        raise FileNotFoundError(
            "No files found in the directory. Looking for files that start with 'scaling_neighbor_search_Compadre'"
        )

    print("Reading the following files:")
    for file in files:
        print(file)

    # Open and read the CSV file for each file and add the data to a DataFrame
    df = pd.DataFrame()
    for file in files:
        # Join the data from the CSV file to the DataFrame
        df = pd.concat([df, read_csv_file(file)], ignore_index=True)

    # Sort the DataFrame by the construction type, processor type, number of processors, and number of nodes
    df = df.sort_values(
        ["processor_type", "processors", "nodes"],
        ascending=[False, True, True],
    )

    # Ensure the DataFrame is properly indexed
    df.reset_index(drop=True, inplace=True)

    # Print the DataFrame
    print(df)

    # Plot the number of nodes vs. time
    plot_nodes_vs_time(df)
