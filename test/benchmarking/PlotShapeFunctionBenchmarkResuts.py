# plot the results of three csv files that contain the benchmark results that have columns of "Nodes" and "Runtime per increment (s)"
# The three csv files are for the benchmark results of the three different implementations of the same algorithm
# The three implementations are: "Serial", "GPU", and "GPU without synchronization"
# using pandas and matplotlib

import os

import matplotlib.pyplot as plt
import pandas as pd

# path to the script
base_path = os.path.dirname(os.path.realpath(__file__)) + "/"

# read the csv files
df1 = pd.read_csv(base_path + "shape_function_benchmark_cpu.csv")
df1.columns = df1.columns.str.lstrip()
df2 = pd.read_csv(base_path + "shape_function_benchmark_gpu.csv")
df2.columns = df2.columns.str.lstrip()

# Nodes, Compadre Runtime (s), Reproducing Kernel Runtime (s)
# plot the results
plt.loglog(
    df1["Nodes"],
    df1["Compadre Runtime (s)"],
    label="Compadre CPU",
    marker="o",
    color="red",
)
plt.loglog(
    df1["Nodes"],
    df1["Reproducing Kernel Runtime (s)"],
    label="Reproducing Kernel CPU",
    marker="o",
    color="blue",
)
plt.loglog(
    df2["Nodes"],
    df2["Compadre Runtime (s)"],
    label="Compadre GPU",
    marker="o",
    color="red",
    linestyle="--",
)
plt.loglog(
    df2["Nodes"],
    df2["Reproducing Kernel Runtime (s)"],
    label="Reproducing Kernel GPU",
    marker="o",
    color="blue",
    linestyle="--",
)
plt.xlabel("Number of Nodes")
plt.ylabel("Runtime (s)")
plt.title("Benchmark Results")
plt.legend()
plt.grid()
plt.savefig(base_path + "ShapeFunctionBenchmarkResults.png")
