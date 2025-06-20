import csv
import sys


def get_keys(filename):
    # Returns a list of keys (event names) from the log file.
    keys = []
    with open(filename) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split(",")
            if parts[0] in ("START", "END", "ACCUMULATOR_START", "ACCUMULATOR_END"):
                keys.append(parts[1])  # Get the event name
    total_keys = len(keys) / 2  # Each event has a start and end, so divide by 2
    keys = set(keys)  # Remove duplicates
    if total_keys > len(keys):
        print(
            f"Warning: Found {total_keys} keys, but {len(keys)} unique keys after deduplication."
        )
    return keys


def get_events(filename, keys):
    # Returns a dictionary of events with their start and end times.
    events = {
        key: {
            "start": None,
            "end": None,
            "elapsed": 0.0,
            "unaccounted": 0.0,
            "group_percent": 0.0,
            "total_percent": 0.0,
            "metadata": "",
            "level": -1,
            "parent": None,
            "children": [],
            "accumulator": False,
        }
        for key in keys
    }

    with open(filename) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split(",")
            if parts[0] in ("START", "END"):
                event_type, name, timestamp, elapsed = parts[:4]
                metadata = parts[4] if len(parts) > 4 else ""
                if event_type == "START":
                    events[name]["start"] = float(timestamp)
                    events[name]["metadata"] = metadata
                elif event_type == "END":
                    events[name]["end"] = float(timestamp)
                    events[name]["elapsed"] += float(elapsed)
            elif parts[0] in ("ACCUMULATOR_START", "ACCUMULATOR_END"):
                event_type, name, timestamp, elapsed = parts[:4]
                metadata = parts[4] if len(parts) > 4 else ""
                events[name]["accumulator"] = True
                if event_type == "ACCUMULATOR_START":
                    events[name]["start"] = float(timestamp)
                    events[name]["metadata"] = metadata
                elif event_type == "ACCUMULATOR_END":
                    events[name]["end"] = float(timestamp)
                    events[name]["elapsed"] += float(elapsed)

    # Find incomplete events (started but not ended or ended but not started) and remove them
    incomplete_events = {
        name: event
        for name, event in events.items()
        if event["start"] is None or event["end"] is None
    }
    if incomplete_events:
        print("Warning: Found incomplete events:")
        for name, event in incomplete_events.items():
            print(
                f"  {name}: start={event['start']}, end={event['end']}, elapsed={event['elapsed']}, metadata='{event['metadata']}'"
            )
        events = {
            name: event
            for name, event in events.items()
            if event["start"] is not None and event["end"] is not None
        }
        print(f"Removed {len(incomplete_events)} incomplete events.")

    return events


def set_levels(events):
    """
    Assigns levels to each event based on nesting.
    Levels are determined by the order of start and end events.
    Level 0 is the outermost, meaning no events start earlier and end later than it.
    Level 1 is the next level down, meaning it starts after a level 0 event and ends before the level 0 event ends.
    ... and so on.
    Accumulators can be children of other events but not parents.
    """
    for name, event in events.items():
        if event["start"] is not None and event["end"] is not None:
            # Calculate level based on the number of events that start before this one and end after it
            ancestors = []
            for other_name, other_event in events.items():
                if other_name != name:
                    if (
                        other_event["start"] < event["start"]
                        and other_event["end"] > event["end"]
                        and not other_event["accumulator"]
                    ):
                        ancestors.append(
                            {"start": other_event["start"], "name": other_name}
                        )
            level = len(ancestors)
            event["level"] = level
            # The parent is the last ancestor that started before this event. Find the max start time of ancestors
            if ancestors:
                parent = max(ancestors, key=lambda x: x["start"])
                event["parent"] = parent["name"]
                events[parent["name"]]["children"].append(name)
        else:
            print(
                f"Warning: Event '{name}' is incomplete and will not be assigned a level."
            )

    # Sort children by start time
    for _name, event in events.items():
        event["children"].sort(key=lambda n: events[n]["start"])

    # Calculate unaccounted time for each event. The unaccounted time is the elapsed time minus the sum of children's elapsed times.
    for _name, event in events.items():
        if event["children"]:
            total_child_elapsed = sum(
                events[child]["elapsed"] for child in event["children"]
            )
            event["unaccounted"] = event["elapsed"] - total_child_elapsed
        else:
            event["unaccounted"] = 0.0  # No children means no unaccounted time

    # Total time is the time of the level 0 events
    total_time = 0.0
    for event in events.values():
        if event["level"] == 0:
            total_time += event["elapsed"]

    # Calculate percent time each event takes in its group and total time
    for _name, event in events.items():
        if total_time > 0:
            event["total_percent"] = (event["elapsed"] / total_time) * 100
        else:
            event["total_percent"] = 0.0
        if event["parent"] is not None:
            parent_event = events[event["parent"]]
            if parent_event["elapsed"] > 0:
                event["group_percent"] = (
                    event["elapsed"] / parent_event["elapsed"]
                ) * 100
            else:
                event["group_percent"] = 0.0
        else:
            event["group_percent"] = 100.0

    return events


def print_header():
    """
    Prints the header for the event tree.
    The percent columns and elapsed/accounted columns are printed with fixed width for alignment.
    """
    percent_width = 8
    elapsed_width = 10
    unaccounted_width = 14

    header = (
        f"{'Total %':>{percent_width}} {'Group %':>{percent_width}} "
        f"{'Elapsed':>{elapsed_width}} {'Unaccounted':>{unaccounted_width}} Event Name"
    )
    print(header)
    print("-" * len(header))


def print_event(name, event, events, level=0):
    indent = "  " + "    " * level
    total_pct = f"{event['total_percent']:7.2f}%"
    group_pct = f"{event['group_percent']:7.2f}%"
    elapsed = f"{event['elapsed']:11.6f}"
    unaccounted = (
        f"{event['unaccounted']:11.6f}" if event["unaccounted"] > 0 else "     -     "
    )
    print_string = f"{total_pct} {group_pct} {elapsed} {unaccounted} {indent}{name}"
    print(print_string)
    for child in event["children"]:
        print_event(child, events[child], events, level + 1)


def print_event_tree(events):
    """
    Prints a tree structure of events with their levels and parents.
    The percent columns and elapsed/accounted columns are printed with fixed width for alignment.
    """
    print("Event Tree:")
    print_header()
    for name, event in events.items():
        if event["level"] == 0:  # Only print top-level events
            print_event(name, event, events)


def print_top_events(events, top_n=10):
    """
    Prints the top N events by total elapsed time.
    Only end events (events that have no children) are considered for the top events.
    """
    top_events = sorted(
        (name, event) for name, event in events.items() if not event["children"]
    )
    top_events = sorted(top_events, key=lambda x: x[1]["elapsed"], reverse=True)[:top_n]

    print(f"\nTop {top_n} events by elapsed time:")
    print_header()
    for name, event in top_events:
        print_event(name, event, events)


def create_csv(events, run_name, filename="timing_log.csv"):
    # Timer Name, Time (seconds), Run
    # Explicit_Solver_UpdateFieldStates, 0.000295623, new_sort
    # Explicit_Solver_ApplyBoundaryConditions, 0.00232225, new_sort
    # Explicit_Solver_ComputeForce, 7.3051, new_sort
    # Explicit_Solver_TimeIntegrationNodalUpdates, 0.0903948, new_sort
    # Explicit_Solver_CommunicateDisplacements, 0, new_sort
    # Explicit_Solver_CommunicateForce, 1.1958e-05, new_sort
    # Explicit_Solver_TimeStepCompute, 1.1794e-05, new_sort
    # Explicit_Solver_WriteOutput, 3.36621, new_sort
    # Explicit_Solver_UpdateShapeFunctions, 0, new_sort

    with open(filename, "w", newline="") as csvfile:
        fieldnames = ["Timer Name", "Time (seconds)"]
        if run_name:
            fieldnames.append("Run")
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for name, event in events.items():
            if event["elapsed"] > 0:
                if run_name:
                    writer.writerow(
                        {
                            "Timer Name": name,
                            "Time (seconds)": f"{event['elapsed']:.6f}",
                            "Run": run_name,
                        }
                    )
                else:
                    writer.writerow(
                        {
                            "Timer Name": name,
                            "Time (seconds)": f"{event['elapsed']:.6f}",
                        }
                    )


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="Plot timing log as Gantt chart with nesting."
    )
    parser.add_argument(
        "logfile", help="Path to timing log file (e.g., input_timer.log)"
    )
    parser.add_argument(
        "--run_name",
        default="",
        help="Name of the run to include in the CSV output (optional)",
    )
    parser.add_argument(
        "--csv",
        action="store_true",
        help="Create a CSV file with the timing data (default: False)",
    )
    parser.add_argument(
        "--csv_filename",
        default="timing_log.csv",
        help="Filename for the CSV output (default: timing_log.csv)",
    )

    args = parser.parse_args()

    keys = get_keys(args.logfile)
    if not keys:
        print("No keys found in log file.")
        sys.exit(1)
    events = get_events(args.logfile, keys)
    if not events:
        print("No events found in log file.")
        sys.exit(1)
    print(f"Found {len(events)} events in log file.")
    events = set_levels(events)
    print_event_tree(events)
    print_top_events(events, top_n=15)
    if args.csv:
        create_csv(events, args.run_name, filename=args.csv_filename)
        print(f"CSV file created: {args.csv_filename}")


if __name__ == "__main__":
    main()
