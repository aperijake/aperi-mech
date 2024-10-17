#!/usr/bin/env python3
import argparse
import glob
import os

import matplotlib.pyplot as plt
import pandas as pd


def plot_timing_data_per_proc(df, output_dir):
    # Create a plot of the timing data per processor
    # Want a line for each number of processes
    # Y-axis is the scaling efficiency: df["scaling_efficiency"], which is: time / time_1_cpu * num_procs
    # X-axis is the number of cells per processor: df["cell_count_per_proc"]
    # total_time_data = df[df["step"] == "Total Time"]
    # time_1_cpu = total_time_data[total_time_data["num_procs"] == 1]["time"].values[0]

    plt.figure()
    plt.title("Scaling Efficiency")
    plt.xlabel("Number of Cells per Processor")
    plt.ylabel("Time / Time 1 CPU * Number of Processes")
    plt.grid()
    for num_procs in df["num_procs"].unique():
        num_procs_data = df[df["num_procs"] == num_procs]
        plt.semilogx(
            num_procs_data["cell_count_per_proc"],
            num_procs_data["scaling_efficiency"],
            label=f"{num_procs} processes",
            marker="o",
        )
    plt.axhline(y=1, color="k", linestyle="--", label="Perfect Scaling")
    plt.legend()
    plt.savefig(output_dir + os.path.sep + "summary_timing_data_per_proc.png")
    plt.close()


def print_scaling(df):
    # Print the scaling of the time spent in each step
    for step in df["step"].unique():
        step_data = df[df["step"] == step]
        time_1_cpu = step_data[step_data["num_procs"] == 1]["time"].values[0]
        # There is no communication cost for 1 process, so we need to grab the time for 2 processes
        if step.startswith("Communicate"):
            time_1_cpu = step_data[step_data["num_procs"] == 2]["time"].values[0]
        print(f"Step: {step}")
        for num_procs, time in zip(step_data["num_procs"], step_data["time"]):
            if step.startswith("Communicate") and num_procs == 1:
                continue
            print(f"  {num_procs} processes: {time:.2e} s ({time_1_cpu/time:.2f}x)")
        print()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Plot timing summary data from sets of runs"
    )
    parser.add_argument("--output", help="Output directory for the plot", default=".")
    parser.add_argument(
        "folders",
        nargs="+",
        help="Folders containing the 'scaling_data.csv' files to plot",
    )
    args = parser.parse_args()

    df = pd.DataFrame()

    # Expand wildcards in the folder names
    folders = []
    for folder in args.folders:
        folders.extend(glob.glob(folder))
    folders.sort()
    print("Folders:", folders)

    # Ensure that 'scaling_data.csv' files exist in all folders
    for folder in folders:
        if not os.path.exists(os.path.join(folder, "scaling_data.csv")):
            raise ValueError(f"File 'scaling_data.csv' not found in folder {folder}")

    # Read the data from the 'scaling_data.csv' files into a DataFrame
    for folder in folders:
        data = pd.read_csv(os.path.join(folder, "scaling_data.csv"))
        df = pd.concat([df, data], ignore_index=True)

    # Sort the data by the number of processes and the number of cells per processor
    df.sort_values(["num_procs", "cell_count_per_proc"], inplace=True)

    # Get full path to the output directory
    output_dir = os.path.abspath(args.output)
    os.makedirs(output_dir, exist_ok=True)

    print(df)
    plot_timing_data_per_proc(df, args.output)
