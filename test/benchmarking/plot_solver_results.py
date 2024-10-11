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
    # Example name: "Taylor Impact: 1 processors, gpu, 32 x 32 x 256 elements, runtime per increment"
    # Number of elements: 32 x 32 x 256 * 6 = 1,572,864
    # Number of nodes: (32 + 1) x (32 + 1) x (256 + 1) = 33 x 33 x 257 = 287961
    name = name.split(":")

    # Get the number of processors
    processors = int(name[1].split(" ")[1])

    # Get the type of processor
    processor_type = name[1].split(" ")[3].replace(",", "")

    # Get the number of elements
    elements = (
        float(name[1].split(" ")[4])
        * float(name[1].split(" ")[6])
        * float(name[1].split(" ")[8])
        * 6
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

    # Parse each name in the DataFrame
    for i in range(len(df)):
        (
            processors,
            processor_type,
            elements,
            nodes,
            elements_per_processor,
            nodes_per_processor,
        ) = parse_name(df.at[i, "name"])
        # Add the number of processors, processor type, number of elements, and number of nodes to the row
        df.at[i, "processors"] = processors
        df.at[i, "processor_type"] = processor_type
        df.at[i, "elements"] = elements
        df.at[i, "nodes"] = nodes
        df.at[i, "elements_per_processor"] = elements_per_processor
        df.at[i, "nodes_per_processor"] = nodes_per_processor

    return df


def plot_weak_scaling(df, group_name):
    """
    Plot the weak scaling data.
    """
    # Find the row with the processor type "cpu"
    cpu_row = df.loc[df["processor_type"] == "cpu"]

    # Group the data by number of elements per processor
    grouped = cpu_row.groupby("elements_per_processor")

    # Get the list of unique processor counts
    processors = list(cpu_row["processors"].unique())

    # Get the max length of the grouped data
    max_length = max([len(group) for name, group in grouped])
    # Plot the data
    for name, group in grouped:
        if len(group) != max_length:
            continue
        if group["processors"].iloc[0] != 1:
            continue
        # Plot, make the x-axis labels the number of processors
        normalized_values = []
        label = f"{int(name)}, {group['value'].iloc[0]/1000.0:.2e}"
        for i in range(len(group)):
            normalized_values.append(group["value"].iloc[i] / group["value"].iloc[0])

        plt.plot(group["processors"], normalized_values, label=label, marker="o")
        plt.xscale("log", base=2)

    # Set the x-ticks and labels
    plt.xticks(processors, labels=[str(int(p)) for p in processors])
    plt.xlabel("Number of Processors")
    plt.ylabel("Normalized Runtime")
    plt.title("Weak Scaling")
    plt.legend(title="Elements/Proc, First Value (s)")
    plt.grid()
    plt.savefig(group_name + "_WeakScaling.png")
    plt.close()


def plot_strong_scaling(df, group_name):
    """
    Plot the strong scaling data.
    """
    # Find the row with the processor type "cpu"
    cpu_row = df.loc[df["processor_type"] == "cpu"]

    # Group the data by number of elements
    grouped = cpu_row.groupby("elements")

    # Get the list of unique number of processors
    processors = list(cpu_row["processors"].unique())

    # Plot the data
    ideal_label = "Ideal Scaling"
    for name, group in grouped:
        # Add the ideal strong scaling line
        plt.loglog(
            group["processors"],
            group["value"].iloc[0] / group["processors"] / 1000.0,
            label=ideal_label,
            linestyle="--",
            color="black",
        )
        ideal_label = None
        plt.loglog(
            group["processors"],
            group["value"] / 1000.0,
            label=f"{int(name):.2e}",
            marker="o",
        )

    # Set the x-ticks and labels
    plt.xticks(processors, labels=[str(int(p)) for p in processors])
    plt.xlabel("Number of Processors")
    plt.ylabel("Runtime per Increment (s)")
    plt.title("Strong Scaling")
    plt.legend(title="Number of Elements", loc="lower left")
    plt.grid()
    plt.savefig(group_name + "_StrongScaling.png")
    plt.close()


def plot_elements_vs_time(df, group_name):
    """
    Plot the runtime per increment vs. number of elements.
    """
    # Group the data by number of processors and processor type
    grouped = df.groupby(["processors", "processor_type"])

    # Get the list of unique number of elements
    elements = list(df["elements"].unique())

    # Plot the data
    for name, group in grouped:
        plt.loglog(
            group["elements"],
            group["value"] / 1000.0,
            label=f"{int(name[0])} {name[1]}",
            marker="o",
        )

    # Set the x-ticks and labels
    plt.xlabel("Number of Elements")
    plt.xticks(elements, labels=[f"{int(e):.2e}" for e in elements])
    # Rotate the x-ticks
    plt.xticks(rotation=45)
    plt.ylabel("Runtime per Increment (s)")
    plt.title("Runtime per Increment vs. Number of Elements")
    plt.legend()
    plt.grid()
    plt.tight_layout()
    plt.savefig(group_name + "_ElementsVsRuntime.png")
    plt.close()

    # Check if there is a GPU in the data
    if "gpu" not in df["processor_type"].values:
        return

    # Get the data for 1 processor, cpu and gpu
    cpu_group = grouped.get_group((1, "cpu"))
    gpu_group = grouped.get_group((1, "gpu"))

    # Calculate the advantage of using the GPU
    advantage = cpu_group["value"].values / gpu_group["value"].values

    # Plot the advantage of using the GPU
    plt.semilogx(
        cpu_group["elements"], advantage, label="(Time 1 CPU) / (Time GPU)", marker="o"
    )

    # Set the x-ticks and labels
    plt.xlabel("Number of Elements")
    plt.xticks(elements, labels=[f"{int(e):.2e}" for e in elements])
    plt.ylabel("Advantage of Using the GPU")
    plt.title("GPU Advantage for Runtime per Increment")
    plt.legend()
    plt.grid()
    plt.savefig(group_name + "_GPUAdvantage.png")


def plot_set(group_name, files):
    print("Reading the following files:")
    for file in files:
        print(file)

    # Open and read the JSON file for each file and add the data to a DataFrame
    df = pd.DataFrame()
    for file in files:
        # Join the data from the JSON file to the DataFrame
        print(f"Reading {file}")
        df = pd.concat([df, read_json_file(file)], ignore_index=True)

    # Sort the DataFrame by the processor type, number of processors, and number of elements
    df = df.sort_values(
        ["processor_type", "processors", "elements"], ascending=[False, True, True]
    )

    # Print the DataFrame
    print(df)

    # Plot the weak scaling
    plot_weak_scaling(df, group_name)

    # Plot the strong scaling
    plot_strong_scaling(df, group_name)

    # Plot the number of elements vs. time
    plot_elements_vs_time(df, group_name)


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

    # List of JSON files to read. Find files that start with "scaling_gtest_SolverPerformance" in the directory
    files = [
        base_path + f
        for f in os.listdir(base_path)
        if f.startswith("scaling_gtest_SolverPerformance")
    ]

    # Throw an error if no files are found
    if len(files) == 0:
        raise FileNotFoundError(
            "No files found in the directory. Looking for files that start with 'scaling_gtest_SolverPerformance'."
        )

    # Split the files into groups based on the benchmark name. The benchmark name is the string after "scaling_gtest_SolverPerformance_" and before "_release_procs_"
    benchmark_groups = {}
    for file in files:
        file_base = os.path.basename(file)
        benchmark_name = file_base.split(
            "scaling_gtest_SolverPerformanceTest_DISABLED_Benchmark"
        )[1].split("Scaling_release_procs_")[0]
        if benchmark_name not in benchmark_groups:
            benchmark_groups[benchmark_name] = []
        benchmark_groups[benchmark_name].append(file)

    # Print the benchmark groups
    print("Benchmark Groups:")
    for benchmark_name, files in benchmark_groups.items():
        print(f"{benchmark_name}:")
        for file in files:
            print(file)

    # Plot the data for each group
    for benchmark_name, files in benchmark_groups.items():
        plot_set(benchmark_name, files)
