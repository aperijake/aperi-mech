#!/usr/bin/env python3
"""
Given a log file with performance results, grab the timing data and plot it.

*** Cell Counts ************************************
       Total   Processor   Processor   Processor
                 Average         Min         Max  Unbalance%
----------------------------------------------------
       19082       19082       19082       19082           0%
***************************************************
     Finished building Smoothed Cell Data. Time: 12 ms.
   Finished Setting up for the Solver. Time: 446 ms
 - Starting Solver
*** Node Counts ************************************
        Type       Total   Processor   Processor   Processor
                             Average         Min         Max  Unbalance%
----------------------------------------------------
       Owned       20736       20736       20736       20736           0%
     Ghosted           0           0           0           0

     .
     .
     .

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


def find_num_processes(i, lines):
    # Find this line: Running on N processes.
    match = re.search(r"Running on (\d+) processes.", lines[i])
    if match:
        return int(match.group(1))
    return 0


def find_solver_block(i, lines):
    # Find: Timer Group: Explicit Solver
    solver_match = re.search(r"Timer Group: Explicit Solver", lines[i])
    solver_data = []
    if not solver_match:
        return solver_data

    # Read the data in the next 10 lines
    for j in range(i, i + 11):
        # Find: Total Time: 2.061426e-01 seconds
        match = re.search(r"Total Time: ([\d\.e\+\-]+) seconds", lines[j])
        if match:
            total_time = float(match.group(1))
            solver_data.append(("Total Time", 1.0, total_time))
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
            r"^\s*(.+)\s*\|\s+([\d\.e\+\-]+)\s*\|\s+([\d\.e\+\-]+)%$", lines[j]
        )
        if match:
            step = match.group(1)
            time = float(match.group(2))
            fraction = float(match.group(3)) / 100.0
            solver_data.append((step, fraction, time))

    return solver_data


def find_cell_counts(i, lines):
    # Find: *** Cell Counts ************************************
    match = re.search(r"\*\*\* Cell Counts \*+\s*\n", lines[i])
    cell_counts_data = []
    if match:
        # Skip the next 4 lines
        for j in range(i + 1, i + 5):
            # Find:       Total   Processor   Processor   Processor
            # Find:                 Average         Min         Max  Unbalance%
            match = re.search(
                r"\s*Total\s+Processor\s+Processor\s+Processor\s*\n", lines[j]
            )
            if match:
                continue

            # Find:       19082      4770.5        4770        4771   0.0104811%
            match = re.search(
                r"\s*(\d+)\s+([\d\.e\+\-]+)\s+(\d+)\s+(\d+)\s+([\d\.e\+\-]+)%?\s*\n",
                lines[j],
            )
            if match:
                total = int(match.group(1))
                average = float(match.group(2))
                min_value = int(match.group(3))
                max_value = int(match.group(4))
                unbalance = float(match.group(5))
                cell_counts_data.append(
                    (total, average, min_value, max_value, unbalance)
                )

    return cell_counts_data


def find_node_counts(i, lines):
    # Find: *** Node Counts ************************************
    match = re.search(r"\*\*\* Node Counts \*+\s*\n", lines[i])
    node_counts_data = []
    if match:
        # Skip the next 4 lines
        for j in range(i + 1, i + 5):
            # Find:        Type       Total   Processor   Processor   Processor
            # Find:                              Average         Min         Max  Unbalance%
            match = re.search(
                r"\s*Type\s+Total\s+Processor\s+Processor\s+Processor\s*\n", lines[j]
            )
            if match:
                continue

            # Find:        Owned       20736       20736       20736       20736           0%
            match = re.search(
                r"\s*(\w+)\s+(\d+)\s+([\d\.e\+\-]+)\s+(\d+)\s+(\d+)\s+([\d\.e\+\-]+)%?\s*\n",
                lines[j],
            )
            if match:
                node_type = match.group(1)
                total = int(match.group(2))
                average = float(match.group(3))
                min_value = int(match.group(4))
                max_value = int(match.group(5))
                unbalance = float(match.group(6))
                node_counts_data.append(
                    (node_type, total, average, min_value, max_value, unbalance)
                )
    return node_counts_data


def read_timing_data(log_file):
    with open(log_file, "r") as f:
        lines = f.readlines()

    found_solver_block = False
    found_num_processes = False
    found_cell_counts = False
    found_node_counts = False
    found_all = False
    num_processes = 0

    solver_data = []
    cell_counts = []
    node_counts = []
    for i in range(len(lines)):
        # Stop reading the file after we have found everything we need
        if (
            found_num_processes
            and found_num_processes
            and found_solver_block
            and found_cell_counts
            and found_node_counts
        ):
            print("Found all the necessary data in the log file")
            found_all = True
            break

        if not found_num_processes:
            num_processes = find_num_processes(i, lines)
            if num_processes != 0:
                print("Num processes:", num_processes)
                found_num_processes = True
                continue

        if not found_solver_block:
            solver_data = find_solver_block(i, lines)
            if len(solver_data) > 0:
                print("Solver data:", solver_data)
                found_solver_block = True
                continue

        if not found_cell_counts:
            cell_counts = find_cell_counts(i, lines)
            if len(cell_counts) > 0:
                print("Cell counts:", cell_counts)
                found_cell_counts = True
                continue

        if not found_node_counts:
            node_counts = find_node_counts(i, lines)
            if len(node_counts) > 0:
                print("Node counts:", node_counts)
                found_node_counts = True
                continue

    if not found_all:
        message = (
            "Failed to find all the necessary data in the log file. File: "
            + log_file
            + ". Missing:"
        )
        if not found_num_processes:
            message += " num_processes"
        if not found_solver_block:
            message += " solver_block"
        if not found_cell_counts:
            message += " cell_counts"
        if not found_node_counts:
            message += " node_counts"
        raise ValueError(message)

    # Grab the cell and node counts data
    cell_count = cell_counts[0][0]
    node_count = 0
    for node_type, total, _average, _min_value, _max_value, _unbalance in node_counts:
        if node_type == "Owned":
            node_count += total

    timing_data = []
    # Add the solver, cell and node counts data to the timing data
    for step, fraction, time in solver_data:
        timing_data.append(
            (num_processes, cell_count, node_count, step, fraction, time)
        )

    return timing_data


def plot_weak_timing_data(df, output_dir):
    # Create a plot of the timing data
    # Plot the scaling of the time spent in each step vs. the number of processes

    # Sort the data by the number of processes
    df = df.sort_values(by=["num_procs"])

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

    # Make sure the x-axis goes from at least 0.5 to 1.5
    if len(num_procs) == 1:
        plt.xlim(0.5, 1.5)
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

    # Make sure the x-axis goes from at least 0.5 to 2.0
    if len(num_procs) == 1:
        plt.xlim(0.5, 2.0)

    plt.xlabel("Number of Processes")
    plt.ylabel("Fraction of Time")
    plt.legend()
    plt.grid()
    plt.savefig(output_dir + os.path.sep + "timing_data_fraction.png")
    plt.close()

    # If there is only 1 process then skip the remaining plots
    if len(num_procs) == 1:
        return

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
    plt.close()


def plot_weak_timing_data_per_proc(df, output_dir):
    # Create a plot of the timing data per processor
    # Want a line for each number of processes
    # Y-axis is the relative time processing per processor: df["time"] * df["num_procs"] / time_1_cpu
    # X-axis is the number of cells per processor: df["cell_count_per_proc"]
    # Do only for the "Total Time" step
    # Also write a file with the scaling data

    # Only do this if there is more than 1 process
    num_procs = df["num_procs"].unique()
    if len(num_procs) == 1:
        return

    total_time_data = df[df["step"] == "Total Time"]
    time_1_cpu = total_time_data[total_time_data["num_procs"] == 1]["time"].values[0]

    output = "num_procs,cell_count_per_proc,scaling_efficiency\n"
    for num_procs in total_time_data["num_procs"].unique():
        num_procs_data = total_time_data[total_time_data["num_procs"] == num_procs]
        scaling_efficiency = num_procs_data["time"] * num_procs / time_1_cpu
        # Plot log x and linear y
        plt.semilogx(
            num_procs_data["cell_count_per_proc"],
            scaling_efficiency,
            label=f"{num_procs} processes",
            marker="o",
        )
        for cell_count_per_proc, scaling in zip(
            num_procs_data["cell_count_per_proc"], scaling_efficiency
        ):
            output += f"{num_procs},{cell_count_per_proc},{scaling}\n"
    # plot a horizontal line at y=1, perfect scaling
    plt.axhline(y=1, color="k", linestyle="--", label="Perfect Scaling")
    plt.xlabel("Number of Cells per Processor")
    plt.ylabel("Time / Time 1 CPU * Number of Processes")
    plt.legend()
    plt.grid()
    plt.savefig(output_dir + os.path.sep + "timing_data_per_proc.png")
    plt.close()

    with open(output_dir + os.path.sep + "scaling_data.csv", "w") as f:
        f.write(output)


def plot_strong_timing_data(cpu_df, gpu_df, output_dir):
    # Create a plot of the timing data
    # X-axis is the number of elements
    # Y-axis is the time
    # Do only for the "Total Time" step
    # Have a line for each number of processes

    # Get the data for the "Total Time" step
    cpu_total_time_data = cpu_df[cpu_df["step"] == "Total Time"]

    # Loop over the number of processes
    for num_procs in cpu_total_time_data["num_procs"].unique():
        # Get the data for this number of processes
        cpu_num_procs_data = cpu_total_time_data[
            cpu_total_time_data["num_procs"] == num_procs
        ]

        # Plot the data
        plt.loglog(
            cpu_num_procs_data["cell_count"],
            cpu_num_procs_data["time"],
            label=f"CPU {num_procs} processes",
            marker="o",
        )

    # If there is GPU data, plot that as well
    if not gpu_df.empty:
        gpu_total_time_data = gpu_df[gpu_df["step"] == "Total Time"]
        for num_procs in gpu_total_time_data["num_procs"].unique():
            gpu_num_procs_data = gpu_total_time_data[
                gpu_total_time_data["num_procs"] == num_procs
            ]
            plt.loglog(
                gpu_num_procs_data["cell_count"],
                gpu_num_procs_data["time"],
                label=f"GPU {num_procs} processes",
                marker="o",
            )

    plt.xlabel("Number of Elements")
    plt.ylabel("Time (s)")
    plt.legend()
    plt.grid()
    plt.savefig(output_dir + os.path.sep + "timing_data_strong.png")
    plt.close()


def print_weak_scaling(df):
    # Print the scaling of the time spent in each step

    # Only do this if there is more than 1 process
    if len(df["num_procs"].unique()) == 1:
        return

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


def get_log_files(in_folders):
    # Expand wildcards in the folder names
    folders = []
    for folder in in_folders:
        folders.extend(glob.glob(folder))
    folders.sort()

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

    return log_files


def read_weak_files(folders):
    # Get the log files
    log_files = get_log_files(folders)

    # Create an empty DataFrame
    df = pd.DataFrame()

    num_folders = len(folders)
    for log_file in log_files:
        dfs_for_file = []
        for folder in folders:
            timing_data = read_timing_data(os.path.join(folder, log_file))
            # Create a DataFrame with the timing data
            dfs_for_file.append(
                pd.DataFrame(
                    timing_data,
                    columns=[
                        "num_procs",
                        "cell_count",
                        "node_count",
                        "step",
                        "fraction",
                        "time",
                    ],
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

        # Add the cell_count_per_proc and node_count_per_proc columns
        file_df["cell_count_per_proc"] = file_df["cell_count"] / file_df["num_procs"]
        file_df["node_count_per_proc"] = file_df["node_count"] / file_df["num_procs"]

        # Add this file's data to the overall DataFrame
        df = pd.concat([df, file_df], ignore_index=True)

    return df


def read_strong_files(folders):
    # Get the log files
    log_files = get_log_files(folders)

    # Create an empty DataFrame
    df = pd.DataFrame()

    for log_file in log_files:
        for folder in folders:
            timing_data = read_timing_data(os.path.join(folder, log_file))
            # Create a DataFrame with the timing data
            df_for_file = pd.DataFrame(
                timing_data,
                columns=[
                    "num_procs",
                    "cell_count",
                    "node_count",
                    "step",
                    "fraction",
                    "time",
                ],
            )

            # Add the cell_count_per_proc and node_count_per_proc columns
            df_for_file["cell_count_per_proc"] = (
                df_for_file["cell_count"] / df_for_file["num_procs"]
            )
            df_for_file["node_count_per_proc"] = (
                df_for_file["node_count"] / df_for_file["num_procs"]
            )

            # Add this file's data to the overall DataFrame
            df = pd.concat([df, df_for_file], ignore_index=True)

    return df


def process_weak(args):
    print("Processing weak scaling data")

    # Read the log files
    df = read_weak_files(args.folders)

    # Get full path to the output directory
    output_dir = os.path.abspath(args.output)
    os.makedirs(output_dir, exist_ok=True)

    # print(df)
    plot_weak_timing_data(df, args.output)
    plot_weak_timing_data_per_proc(df, args.output)
    print_weak_scaling(df)


def process_strong(args):
    print("Processing strong scaling data")

    # Read the CPU log files
    cpu_df = read_strong_files(args.cpu)

    # Read the GPU log files
    gpu_df = pd.DataFrame()
    if args.gpu:
        gpu_df = read_strong_files(args.gpu)

    # Get full path to the output directory
    output_dir = os.path.abspath(args.output)
    os.makedirs(output_dir, exist_ok=True)

    print(cpu_df)
    print(gpu_df)
    plot_strong_timing_data(cpu_df, gpu_df, args.output)


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Plot timing data from a set of log files"
    )
    subparsers = parser.add_subparsers(
        dest="command", help="Subcommands: weak or strong"
    )

    # Subparser for the 'weak' command
    parser_weak = subparsers.add_parser("weak", help="Process weak scaling data")
    parser_weak.add_argument(
        "--output",
        help="Output directory for the plots",
        default=".",
    )
    parser_weak.add_argument(
        "folders",
        nargs="+",
        help="Folders containing log files. Each folder should contain a set of log files with the same number of processes.",
    )

    # Subparser for the 'strong' command
    parser_strong = subparsers.add_parser("strong", help="Process strong scaling data")
    parser_strong.add_argument(
        "--cpu", nargs="+", help="Folder containing CPU log files", required=True
    )
    parser_strong.add_argument(
        "--gpu", nargs="+", help="Folder containing GPU log files"
    )
    parser_strong.add_argument(
        "--output",
        help="Output directory for the plots",
        default=".",
    )

    args = parser.parse_args()

    if args.command == "weak":
        process_weak(args)
    elif args.command == "strong":
        process_strong(args)
    else:
        parser.print_help()
