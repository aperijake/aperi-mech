# plot the results of three csv files that contain the benchmark results that have columns of "Nodes" and "Runtime per increment (s)"
# The three csv files are for the benchmark results of the three different implementations of the same algorithm
# The three implementations are: "Serial", "GPU", and "GPU without synchronization"
# using pandas and matplotlib

import matplotlib.pyplot as plt
import pandas as pd

# path to build directory
base_path = "./"

# read the csv files
df1 = pd.read_csv(base_path + "benchmark_results_cpu.csv")
df1.columns = df1.columns.str.lstrip()
df2 = pd.read_csv(base_path + "benchmark_results_gpu.csv")
df2.columns = df2.columns.str.lstrip()
# df3 = pd.read_csv(base_path + "benchmark_results_gpu_no_sync.csv")
# df3.columns = df3.columns.str.lstrip()
df4 = pd.read_csv(base_path + "benchmark_results_4_cpus.csv")
df4.columns = df4.columns.str.lstrip()

# plot the results
plt.loglog(df1["Nodes"], df1["Runtime per increment (s)"], label="CPU", marker="o")
plt.loglog(df4["Nodes"], df4["Runtime per increment (s)"], label="4 CPUs", marker="o")
plt.loglog(df2["Nodes"], df2["Runtime per increment (s)"], label="GPU", marker="o")
# plt.loglog(df3["Nodes"], df3["Runtime per increment (s)"], label="GPU without synchronization", marker='o')
plt.xlabel("Number of Nodes")
plt.ylabel("Runtime per increment (s)")
plt.title("Benchmark Results")
plt.legend()
plt.grid()
plt.savefig("BenchmarkResults.png")
