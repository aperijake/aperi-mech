import pandas as pd

df = pd.read_csv("unordered_map_perf_results.csv")

# Markdown export
with open("unordered_map_perf_results.md", "w") as f:
    # for num_indices, num_unique_indices in sorted(set(zip(df['num_indices'], df['num_unique_indices']))):
    for num_indices, num_unique_indices, num_iterations in sorted(
        set(zip(df["num_indices"], df["num_unique_indices"], df["num_iterations"]))
    ):
        filtered = df[
            (df["num_indices"] == num_indices)
            & (df["num_unique_indices"] == num_unique_indices)
            & (df["num_iterations"] == num_iterations)
        ]
        if filtered.empty:
            continue

        # Find std map row for this set
        std_map_row = filtered[filtered["scenario"] == "Std map"]
        if not std_map_row.empty:
            std_map_row = std_map_row.iloc[0]
            std_reset = std_map_row["reset_time_us"]
            std_populate = std_map_row["populate_time_us"]
            std_access = std_map_row["access_time_us"]
            std_total = std_map_row["total_time_us"]
            std_max_hwm_bytes = std_map_row["max_hwm_bytes"]
        else:
            std_reset = std_populate = std_access = std_total = std_max_hwm_bytes = None

        # Add relative columns
        cols_md = [
            "scenario",
            "reset_time_us",
            "populate_time_us",
            "access_time_us",
            "total_time_us",
            "max_hwm_bytes",
            "gpu_used_bytes",
            "reset_vs_stdmap",
            "populate_vs_stdmap",
            "access_vs_stdmap",
            "total_vs_stdmap",
            "max_hwm_bytes_vs_stdmap",
        ]

        def fmt(val):
            try:
                return f"{float(val):.2e}"
            except Exception:
                return str(val)

        def rel(val, std_val):
            try:
                return (
                    f"{float(val)/float(std_val):.2e}"
                    if std_val and float(std_val) != 0
                    else "-"
                )
            except Exception:
                return "-"

        # jf.write(f'## num_indices = {num_indices}, num_unique_indices = {num_unique_indices}, num_iterations = {num_iterations}\n\n')
        f.write(
            f"## num_indices = {num_indices:.0e}, num_unique_indices = {num_unique_indices:.0e}, num_iterations = {num_iterations}\n\n"
        )
        f.write("| " + " | ".join(cols_md) + " |\n")
        f.write("|" + "|".join(["---"] * len(cols_md)) + "|\n")
        for _, row in filtered.sort_values("scenario").iterrows():
            reset_vs = rel(row["reset_time_us"], std_reset)
            populate_vs = rel(row["populate_time_us"], std_populate)
            access_vs = rel(row["access_time_us"], std_access)
            total_vs = rel(row["total_time_us"], std_total)
            max_hwm_bytes_vs = rel(row["max_hwm_bytes"], std_max_hwm_bytes)
            f.write(
                "| "
                + " | ".join(
                    [
                        str(row["scenario"]),
                        fmt(row["reset_time_us"]),
                        fmt(row["populate_time_us"]),
                        fmt(row["access_time_us"]),
                        fmt(row["total_time_us"]),
                        fmt(row["max_hwm_bytes"]),
                        fmt(row["gpu_used_bytes"]),
                        reset_vs,
                        populate_vs,
                        access_vs,
                        total_vs,
                        max_hwm_bytes_vs,
                    ]
                )
                + " |\n"
            )
        f.write("\n")
