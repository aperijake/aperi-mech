import argparse
import json
import os

import matplotlib.pyplot as plt
import pandas as pd


def parse_name(name):
    """
    Parse the name string to extract the number of processors, processor type,
    number of elements, number of nodes, elements per processor, and nodes per processor.
    """
    # Example name: "compute_compadre: 1 processors, gpu, 6 x 6 x 1...  seconds  0.009626"
    # Example name: "compute_reproducing_kernel: 1 processors, gpu, 6 x 6 x 1...  seconds  0.009626"
    # Number of elements: 6 x 6 x 1 = 36
    # Number of nodes: (6 + 1) x (6 + 1) x (1 + 1) = 7 x 7 x 2 = 98
    name = name.split(":")

    # Get whether it is compadre or reproducing kernel
    construction_type = name[0].split("_")[1]

    # Get the number of processors
    processors = int(name[1].split(" ")[1])

    # Get the type of processor
    processor_type = name[1].split(" ")[3].replace(",", "")

    # Get the number of elements
    elements = (
        float(name[1].split(" ")[4])
        * float(name[1].split(" ")[6])
        * float(name[1].split(" ")[8])
    )

    # Get the number of nodes
    nodes = (
        (float(name[1].split(" ")[4]) + 1)
        * (float(name[1].split(" ")[6]) + 1)
        * (float(name[1].split(" ")[8]) + 1)
    )

    # Calculate the number of elements per processor
    elements_per_processor = elements / float(processors)

    # Calculate the number of nodes per processor
    nodes_per_processor = nodes / float(processors)

    return (
        construction_type,
        processors,
        processor_type,
        elements,
        nodes,
        elements_per_processor,
        nodes_per_processor,
    )


def read_json_file(file_path):
    """
    Read the JSON file and parse the data into a DataFrame.
    """
    with open(file_path, "r") as file:
        data = json.load(file)

    # Create a DataFrame from the JSON data
    df = pd.DataFrame(data)

    # Only keep the rows where the name starts with "compute_" or "neighbor_search_"
    df = df[
        df["name"].str.startswith("compute_") | df["name"].str.startswith("neighbor_")
    ]

    # Ensure the DataFrame is properly indexed
    df.reset_index(drop=True, inplace=True)

    # Parse each name in the DataFrame
    for i in range(len(df)):
        (
            construction_type,
            processors,
            processor_type,
            elements,
            nodes,
            elements_per_processor,
            nodes_per_processor,
        ) = parse_name(df.at[i, "name"])
        # Add the construction_type number of processors, processor type, number of elements, and number of nodes to the row
        df.at[i, "construction_type"] = construction_type
        df.at[i, "processors"] = processors
        df.at[i, "processor_type"] = processor_type
        df.at[i, "elements"] = elements
        df.at[i, "nodes"] = nodes
        df.at[i, "elements_per_processor"] = elements_per_processor
        df.at[i, "nodes_per_processor"] = nodes_per_processor

    return df


def plot_nodes_vs_time(df):
    """
    Plot the function value construction time vs. number of nodes.
    """
    # Get the compadre data
    compadre = df[df["construction_type"] == "compadre"]

    # Get the reproducing kernel data
    reproducing_kernel = df[df["construction_type"] == "reproducing"]

    # Get the search data
    search = df[df["construction_type"] == "search"]

    # Group the compadre data by number of processors and processor type
    grouped_compadre = compadre.groupby(["processors", "processor_type"])

    # Group the reproducing kernel data by number of processors and processor type
    grouped_reproducing_kernel = reproducing_kernel.groupby(
        ["processors", "processor_type"]
    )

    # Group the search data by number of processors and processor type
    grouped_search = search.groupby(["processors", "processor_type"])

    # Define a color palette
    colors = plt.cm.tab10.colors

    # Define a list of linestyles
    linestyles = ["--", "-", "-.", ":"]

    # Plot the data
    for idx, (name, group) in enumerate(grouped_reproducing_kernel):
        plt.loglog(
            group["nodes"],
            group["value"],
            label=f"Aperi / Kokkos {int(name[0])} {name[1]}",
            marker="o",
            color=colors[0],
            linestyle=linestyles[idx % len(linestyles)],
        )

    for idx, (name, group) in enumerate(grouped_compadre):
        plt.loglog(
            group["nodes"],
            group["value"],
            label=f"Compadre {int(name[0])} {name[1]}",
            marker="o",
            color=colors[1],
            linestyle=linestyles[idx % len(linestyles)],
        )

    # Get the list of unique number of nodes
    nodes = list(df["nodes"].unique())

    # Set the x-ticks and labels
    plt.xlabel("Number of Nodes")
    plt.xticks(nodes, labels=[f"{int(n):.2e}" for n in nodes])
    plt.ylabel("Value Computation Time (s)")
    plt.title("Time to Compute Function Values vs. Number of Nodes")
    plt.legend()
    plt.grid("on")
    plt.savefig("NodesVsFunctionComputationTime.pdf")
    plt.savefig("NodesVsFunctionComputationTime.png")

    # Add the search data to the plot
    for idx, (name, group) in enumerate(grouped_search):
        plt.loglog(
            group["nodes"],
            group["value"],
            label=f"Neighbor Search {int(name[0])} {name[1]}",
            marker="o",
            color=colors[2],
            linestyle=linestyles[idx % len(linestyles)],
        )

    # Set the x-ticks and labels
    plt.xlabel("Number of Nodes")
    plt.xticks(nodes, labels=[f"{int(n):.2e}" for n in nodes])
    plt.ylabel("Computation Time (s)")
    plt.title("Time to Compute vs. Number of Nodes")
    plt.legend()
    plt.grid("on")
    plt.savefig("NodesVsComputationTime.pdf")
    plt.savefig("NodesVsComputationTime.png")
    plt.close()

    # Calculate the advantage of using the GPU, value cpu / value gpu
    for _idx, (name, group) in enumerate(grouped_reproducing_kernel):
        if name[1] == "cpu":
            cpu_group = group
        else:
            gpu_group = group

    # Calculate the advantage of using the GPU
    advantage = cpu_group["value"].values / gpu_group["value"].values

    # Plot the advantage of using the GPU
    plt.semilogx(
        cpu_group["nodes"],
        advantage,
        label="Aperi / Kokkos (Time 1 CPU / Time GPU)",
        marker="o",
        color=colors[0],
        linestyle=linestyles[idx % len(linestyles)],
    )
    for _idx, (name, group) in enumerate(grouped_compadre):
        if name[1] == "cpu":
            cpu_group = group
        else:
            gpu_group = group

    # Calculate the advantage of using the GPU
    advantage = cpu_group["value"].values / gpu_group["value"].values

    # Plot the advantage of using the GPU
    plt.semilogx(
        cpu_group["nodes"],
        advantage,
        label="Compadre (Time 1 CPU / Time GPU)",
        marker="o",
        color=colors[1],
        linestyle=linestyles[idx % len(linestyles)],
    )

    # Set the x-ticks and labels
    plt.xlabel("Number of Nodes")
    plt.xticks(nodes, labels=[f"{int(n):.2e}" for n in nodes])
    plt.ylabel("Advantage of Using the GPU")
    plt.title("GPU Advantage for Function Computation Time")
    plt.legend()
    plt.grid("on")
    plt.savefig("AdvantageOfUsingGPUFunctionComputationTime.pdf")
    plt.savefig("AdvantageOfUsingGPUFunctionComputationTime.png")

    # Calculate the advantage of using the GPU, value cpu / value gpu
    for _idx, (name, group) in enumerate(grouped_search):
        if name[1] == "cpu":
            cpu_group = group
        else:
            gpu_group = group

    # Calculate the advantage of using the GPU
    advantage = cpu_group["value"].values / gpu_group["value"].values

    # Plot the advantage of using the GPU
    plt.semilogx(
        cpu_group["nodes"],
        advantage,
        label="Neighbor Search (Time 1 CPU / Time GPU)",
        marker="o",
        color=colors[2],
        linestyle=linestyles[idx % len(linestyles)],
    )

    # Set the x-ticks and labels
    plt.xlabel("Number of Nodes")
    plt.xticks(nodes, labels=[f"{int(n):.2e}" for n in nodes])
    plt.ylabel("Advantage of Using the GPU")
    plt.title("GPU Advantage for Computation Time")
    plt.legend()
    plt.grid("on")
    plt.savefig("AdvantageOfUsingGPUComputationTime.pdf")
    plt.savefig("AdvantageOfUsingGPUComputationTime.png")
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
        if f.startswith("scaling_gtest_Compadre")
    ]

    # Throw an error if no files are found
    if len(files) == 0:
        raise FileNotFoundError(
            "No files found in the directory. Looking for files that start with 'scaling_gtest_Compadre'."
        )

    print("Reading the following files:")
    for file in files:
        print(file)

    # Open and read the JSON file for each file and add the data to a DataFrame
    df = pd.DataFrame()
    for file in files:
        # Join the data from the JSON file to the DataFrame
        df = pd.concat([df, read_json_file(file)], ignore_index=True)

    # Sort the DataFrame by the construction type, processor type, number of processors, and number of nodes
    df = df.sort_values(
        ["construction_type", "processor_type", "processors", "nodes"],
        ascending=[True, False, True, True],
    )

    # Ensure the DataFrame is properly indexed
    df.reset_index(drop=True, inplace=True)

    # Print the DataFrame
    print(df)

    # Plot the number of nodes vs. time
    plot_nodes_vs_time(df)
