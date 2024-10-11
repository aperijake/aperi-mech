#!/usr/bin/env python3
"""
Given a log file with performance results, grab the timing data and plot it.

The relevant part of the file looks like this:
                  25        3.125000e-06             7.945130e-03  Write Field Output
                  25        3.125000e-06             7.945130e-03   End of Simulation
---------------------------------------------------------------------------------------
---------------------------------------------------------------------
Timer Group: Explicit Solver
Total Time: 2.061426e-01 seconds
---------------------------------------------------------------------
                 Timer Name |   Time (seconds) |   % of Total Time
---------------------------------------------------------------------
          UpdateFieldStates |     2.795900e-05 |         0.0135629%
    ApplyBoundaryConditions |     1.112900e-04 |         0.0539869%
               ComputeForce |     1.887114e-01 |           91.5441%
TimeIntegrationNodalUpdates |     4.480290e-03 |           2.17339%
   CommunicateDisplacements |     2.749249e-03 |           1.33366%
           CommunicateForce |     1.006246e-02 |           4.88131%
---------------------------------------------------------------------
   Finished Solver. Time: 300 ms 
Application Finalized
############################################
aperi-mech finished successfully!
Finished at: 2024-10-10 21:26:19
Total time: 7.99e-01 seconds
############################################
"""

import argparse
import glob
import os
import re

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.ticker import FixedLocator


def read_timing_data(log_file):
    with open(log_file, "r") as f:
        lines = f.readlines()
    timing_data = []

    num_times_found = 0
    expected_times = 6
    found_solver_block = False
    found_num_processes = False
    num_processes = 0
    for line in lines:
        # Stop reading the file after we have found everything we need
        if (
            found_num_processes
            and found_num_processes
            and num_times_found == expected_times
        ):
            break

        # Find this line: Running on 1 processes.
        match = re.search(r"Running on (\d+) processes.", line)
        if match:
            num_processes = int(match.group(1))
            found_num_processes = True
            continue
        if not found_solver_block:
            # Find: Timer Group: Explicit Solver
            match = re.search(r"Timer Group: Explicit Solver", line)
            if match:
                found_solver_block = True
                continue

        if found_solver_block:
            # Find: Total Time: 2.061426e-01 seconds
            match = re.search(r"Total Time: ([\d\.e\+\-]+) seconds", line)
            if match:
                total_time = float(match.group(1))
                timing_data.append((num_processes, "Total Time", 1.0, total_time))
                continue

            # Grab the percentage of time spent in each step from these lines:
            #           UpdateFieldStates |     2.795900e-05 |         0.0135629%
            #     ApplyBoundaryConditions |     1.112900e-04 |         0.0539869%
            #                ComputeForce |     1.887114e-01 |           91.5441%
            # TimeIntegrationNodalUpdates |     4.480290e-03 |           2.17339%
            #    CommunicateDisplacements |     2.749249e-03 |           1.33366%
            #            CommunicateForce |     1.006246e-02 |           4.88131%

            # split the line by "|" and grab the second part
            match = re.search(
                r"^\s*(.+)\s*\|\s+([\d\.e\+\-]+)\s*\|\s+([\d\.e\+\-]+)%$", line
            )
            if match:
                step = match.group(1)
                time = float(match.group(2))
                fraction = float(match.group(3)) * 100.0
                timing_data.append((num_processes, step, fraction, time))
                num_times_found += 1

    return timing_data


def plot_timing_data(df, output_dir):
    # Create a plot of the timing data
    # Plot the scaling of the time spent in each step vs. the number of processes
    for step in df["step"].unique():
        step_data = df[df["step"] == step]
        if step.startswith("Communicate"):
            # There is no communication cost for 1 process, so skip it
            plt.loglog(
                step_data["num_procs"][1:],
                step_data["time"][1:],
                label=step,
                marker="o",
            )
        else:
            plt.loglog(
                step_data["num_procs"], step_data["time"], label=step, marker="o"
            )
    num_procs = df["num_procs"].unique()
    plt.xticks(
        num_procs, [f"{num_proc}" for num_proc in num_procs]
    )  # Set x-axis tick labels to regular integers
    plt.gca().xaxis.set_minor_locator(
        FixedLocator([])
    )  # Disable minor ticks on the x-axis
    plt.xlabel("Number of Processes")
    plt.ylabel("Time (s)")
    plt.legend()
    plt.grid()
    plt.savefig(output_dir + os.path.sep + "timing_data.png")
    plt.close()

    # Create a plot of the percentage of time spent in each step
    for step in df["step"].unique():
        step_data = df[df["step"] == step]
        plt.plot(step_data["num_procs"], step_data["fraction"], label=step, marker="o")
    plt.xticks(
        num_procs, [f"{num_proc}" for num_proc in num_procs]
    )  # Set x-axis tick labels to regular integers
    plt.gca().xaxis.set_minor_locator(
        FixedLocator([])
    )  # Disable minor ticks on the x-axis
    plt.xlabel("Number of Processes")
    plt.ylabel("Fraction of Time")
    plt.legend()
    plt.grid()
    plt.savefig(output_dir + os.path.sep + "timing_data_fraction.png")
    plt.close()

    # Plot the scaling of the time spent in each step relative to the 1 cpu time
    for step in df["step"].unique():
        step_data = df[df["step"] == step]
        # There is no communication cost for 1 process, so we need to grab the time for 2 processes
        if step.startswith("Communicate"):
            time_1_cpu = step_data[step_data["num_procs"] == 2]["time"].values[0]
            plt.loglog(
                step_data["num_procs"][1:],
                step_data["time"][1:] / time_1_cpu,
                label=step,
                marker="o",
            )
        else:
            time_1_cpu = step_data[step_data["num_procs"] == 1]["time"].values[0]
            plt.loglog(
                step_data["num_procs"],
                step_data["time"] / time_1_cpu,
                label=step,
                marker="o",
            )
    # Add a perfect scaling line
    plt.loglog(
        step_data["num_procs"],
        1.0 / step_data["num_procs"],
        label="Perfect Scaling",
        linestyle="--",
    )
    plt.xticks(
        num_procs, [f"{num_proc}" for num_proc in num_procs]
    )  # Set x-axis tick labels to regular integers
    plt.gca().xaxis.set_minor_locator(
        FixedLocator([])
    )  # Disable minor ticks on the x-axis
    plt.xlabel("Number of Processes")
    plt.ylabel("Time / Initial Time")
    plt.grid()
    plt.legend()
    plt.savefig(output_dir + os.path.sep + "timing_data_relative.png")


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
        description="Plot timing data from a set of log files"
    )
    parser.add_argument("--output", help="Output directory for the plots", default=".")
    parser.add_argument(
        "folders",
        nargs="+",
        help="Folders containing log files. Each folder should contain a set of log files with the same number of processes.",
    )
    args = parser.parse_args()

    df = pd.DataFrame()

    # Expand wildcards in the folder names
    folders = []
    for folder in args.folders:
        folders.extend(glob.glob(folder))
    folders.sort()
    print("Folders:", folders)

    # Grab the files in the first folder
    folder = folders[0]
    # Grab all the *.log files in the folder
    log_files = glob.glob(os.path.join(folder, "*.log"))
    # Sort the files by name
    log_files.sort()
    # Strip the folder name from the log files
    log_files = [os.path.basename(log_file) for log_file in log_files]
    print("Log files:", log_files)

    # Ensure that the names of log files are the same in all folders
    for folder in folders:
        new_log_files = glob.glob(os.path.join(folder, "*.log"))
        new_log_files.sort()
        new_log_files = [os.path.basename(log_file) for log_file in new_log_files]
        if log_files != new_log_files:
            raise ValueError("Log files in different folders do not match")

    num_folders = len(folders)
    for log_file in log_files:
        dfs_for_file = []
        for folder in folders:
            timing_data = read_timing_data(os.path.join(folder, log_file))
            # Create a DataFrame with the timing data
            dfs_for_file.append(
                pd.DataFrame(
                    timing_data, columns=["num_procs", "step", "fraction", "time"]
                )
            )
            # Divide the time and fraction columns by the number of folders
            dfs_for_file[-1]["time"] /= num_folders
            dfs_for_file[-1]["fraction"] /= num_folders
        file_df = dfs_for_file[0]
        for df_for_file in dfs_for_file[1:]:
            # Add the time and fraction columns from the other DataFrames
            file_df["time"] += df_for_file["time"]
            file_df["fraction"] += df_for_file["fraction"]

        # Add this file's data to the overall DataFrame
        df = pd.concat([df, file_df], ignore_index=True)

    # Get full path to the output directory
    output_dir = os.path.abspath(args.output)
    os.makedirs(output_dir, exist_ok=True)

    # print(df)
    plot_timing_data(df, args.output)
    print_scaling(df)
