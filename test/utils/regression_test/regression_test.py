import argparse
import datetime
import json
import os
import shutil

# trunk-ignore(bandit/B404)
import subprocess
import sys
import threading
import time

import psutil


def _log_output(log_file, message):
    with open(log_file, "a") as f:
        f.write(message)


def _read_output(pipe, log_file):
    with pipe:
        for line in iter(pipe.readline, b""):
            _log_output(log_file, line.decode("utf-8"))


def _run_executable(
    command_pre, executable_path, command_args, log_file, check_memory=False
):
    return_code = 1
    stats = {"peak_memory": 0}

    executable_path = os.path.abspath(executable_path)
    if not os.path.exists(executable_path):
        error_message = f"Executable not found at path: {executable_path}"
        _log_output(log_file, error_message)
        print(error_message)
        return return_code, stats

    command = command_pre + [executable_path] + command_args
    try:
        if check_memory:
            # trunk-ignore(bandit/B603)
            process = subprocess.Popen(
                command, stdout=subprocess.PIPE, stderr=subprocess.PIPE
            )
            ps_process = psutil.Process(process.pid)
            peak_memory = 0

            stdout_thread = threading.Thread(
                target=_read_output, args=(process.stdout, log_file)
            )
            stderr_thread = threading.Thread(
                target=_read_output, args=(process.stderr, log_file)
            )
            stdout_thread.start()
            stderr_thread.start()

            while process.poll() is None:
                try:
                    total_memory = ps_process.memory_info().rss
                    for child in ps_process.children(recursive=True):
                        total_memory += child.memory_info().rss
                    peak_memory = max(peak_memory, total_memory)
                except psutil.NoSuchProcess:
                    pass
                time.sleep(0.01)

            stdout_thread.join()
            stderr_thread.join()
            return_code = process.wait()

            peak_memory_mb = peak_memory / (1024 * 1024)
            stats["peak_memory"] = peak_memory_mb
            _log_output(log_file, f"Peak memory usage: {peak_memory_mb:.2f} MB\n")
        else:
            # trunk-ignore(bandit/B603)
            result = subprocess.run(
                command, capture_output=True, text=True, check=False
            )
            stdout, stderr = result.stdout, result.stderr
            return_code = result.returncode

            # Decode stdout and stderr if they are in bytes
            if isinstance(stdout, bytes):
                stdout = stdout.decode("utf-8")
            if isinstance(stderr, bytes):
                stderr = stderr.decode("utf-8")

            if stdout:
                _log_output(log_file, "Standard output:\n" + stdout)
            if stderr:
                _log_output(log_file, "Standard error:\n" + stderr)

        if return_code == 0:
            _log_output(log_file, "Executable ran successfully.\nPASSED\n")
        else:
            error_message = (
                f"Executable returned non-zero exit code: {return_code}\n"
                f"Command: {' '.join(command)}\nFAILED\n"
            )
            _log_output(log_file, error_message)
            print(error_message)

    except FileNotFoundError as e:
        error_message = f"File not found: {e}"
        _log_output(log_file, error_message)
        print(error_message)
    except psutil.Error as e:
        error_message = f"psutil error: {e}"
        _log_output(log_file, error_message)
        print(error_message)
    except Exception as e:
        error_message = f"An unexpected error occurred: {e}"
        _log_output(log_file, error_message)
        print(error_message)

    return return_code, stats


def _remove_file(filename):
    try:
        os.remove(filename)
    except FileNotFoundError:
        pass
    # Make sure the file was removed
    if os.path.exists(filename):
        print(f"Failed to remove {filename}")
        sys.exit(1)


def _get_date_time():
    now = datetime.datetime.now()
    return now.strftime("%Y-%m-%d_%H-%M-%S")


def _move_log_files(input_log_file, test_name):
    # Move log_file to a unique name with the date and time
    date_time = _get_date_time()
    log_file_base = input_log_file.split(".")[0]
    log_file = log_file_base + "_" + test_name + "_" + date_time + ".log"
    os.rename(input_log_file, log_file)


def _print_pass_fail(test_name, return_code, executable_time, extra_message=None):
    GREEN = "\033[92m"  # Green text
    RED = "\033[91m"  # Red text
    RESET = "\033[0m"  # Reset color
    TEST_NAME_WIDTH = 30
    TIME_WIDTH = 12

    status = f"{GREEN}PASS{RESET}" if return_code == 0 else f"{RED}FAIL{RESET}"
    time_formatted = f"{executable_time:.4e}"
    message = f"message: {extra_message}" if extra_message else ""

    print(
        f"    {status}:    time(s): {time_formatted:>{TIME_WIDTH}}    test: {test_name:<{TEST_NAME_WIDTH}}{message}"
    )

    if return_code != 0:
        print(f"        Return code: {return_code}")


class RegressionTest:

    def __init__(
        self, test_name, executable_path, num_procs, exe_args, write_json=False
    ):
        self.test_name = test_name
        self.log_file = "regression_test.log"
        self.executable_path = executable_path
        self.num_procs = num_procs
        self.exe_args = exe_args
        self.executable_time = 0
        self.peak_memory = 0
        self.write_json = write_json

    def _write_json(self, return_code):
        """Write the peak memory and run time to a JSON file
        Example JSON output:
        [
          {
             "name": "test_name",
             "unit": "Return code",
             "value": 1
          }
        ]
        """
        json_file = "performance_" + self.test_name + ".json"
        data = []
        data.append(
            {
                "name": self.test_name,
                "unit": "Return code",
                "value": return_code,
            }
        )
        with open(json_file, "w") as f:
            json.dump(data, f, indent=2)

    def run(self):
        _remove_file(self.log_file)
        return_code, stats = self._run()
        _print_pass_fail(self.test_name, return_code, self.executable_time)
        _move_log_files(self.log_file, self.test_name)
        stats["run_time"] = self.executable_time
        if self.write_json:
            self._write_json(return_code)
        return return_code, stats

    def _run(self):
        command_pre = ["mpirun", "-n", str(self.num_procs)]
        # Time the executable
        start_time = time.perf_counter()
        return_code, stats = _run_executable(
            command_pre,
            self.executable_path,
            self.exe_args,
            self.log_file,
            check_memory=True,
        )
        self.peak_memory = stats["peak_memory"]
        end_time = time.perf_counter()
        self.executable_time = end_time - start_time
        return return_code, stats


class PeakMemoryCheck:

    def __init__(
        self,
        test_name,
        peak_memory,
        gold_peak_memory,
        tolerance_percent,
        write_json=False,
    ):
        self.test_name = test_name
        self.peak_memory = peak_memory
        self.gold_peak_memory = gold_peak_memory
        self.tolerance_percent = tolerance_percent / 100.0
        self.write_json = write_json

    def _write_json(self):
        """Write the peak memory to a JSON file
        Example JSON output:
        [
          {
             "name": "test_name",
             "unit": "MB",
             "value": 50
          }
        ]
        """
        json_file = "performance_" + self.test_name + ".json"
        data = []
        data.append(
            {
                "name": self.test_name,
                "unit": "MB",
                "value": self.peak_memory,
            }
        )
        with open(json_file, "w") as f:
            json.dump(data, f, indent=2)

    def run(self):
        # Check if the peak memory is within the tolerance
        upper_limit = self.gold_peak_memory * (1.0 + self.tolerance_percent)
        lower_limit = self.gold_peak_memory * (1.0 - self.tolerance_percent)
        message = f"Peak memory value: {self.peak_memory} MB, Gold value: {self.gold_peak_memory:.2f} MB, Upper limit {upper_limit:.2f} MB"
        return_code = 0
        if self.peak_memory > upper_limit:
            print(
                f"    Peak memory ({self.peak_memory:.2f} MB) exceeded the gold peak memory ({self.gold_peak_memory:.2f} MB) by more than {self.tolerance_percent*100.0}%"
            )
            return_code = 1
        elif self.peak_memory < lower_limit:
            print(
                f"    Peak memory ({self.peak_memory:.2f} MB) is less than the gold peak memory ({self.gold_peak_memory:.2f} MB) by more than {self.tolerance_percent*100.0}%"
            )
            print(
                f"    Consider changing the gold peak memory to {self.peak_memory:.2f} MB"
            )
        if self.write_json:
            self._write_json()
        _print_pass_fail(self.test_name, return_code, 0, message)

        return return_code


class RunTimeCheck:

    def __init__(
        self,
        test_name,
        executable_time,
        gold_executable_time,
        tolerance_percent,
        write_json=False,
    ):
        self.test_name = test_name
        self.executable_time = executable_time
        self.gold_executable_time = gold_executable_time
        self.tolerance_percent = tolerance_percent / 100.0
        self.write_json = write_json

    def _write_json(self):
        """Write the run time to a JSON file
        Example JSON output:
        [
          {
             "name": "test_name",
             "unit": "s",
             "value": 50
          }
        ]
        """
        json_file = "performance_" + self.test_name + ".json"
        data = []
        data.append(
            {
                "name": self.test_name,
                "unit": "s",
                "value": self.executable_time,
            }
        )
        with open(json_file, "w") as f:
            json.dump(data, f, indent=2)

    def run(self):
        # Check if the executable time is within the tolerance
        upper_limit = self.gold_executable_time * (1.0 + self.tolerance_percent)
        lower_limit = self.gold_executable_time * (1.0 - self.tolerance_percent)
        message = f"Executable time: {self.executable_time:.4e} s, Gold time: {self.gold_executable_time:.4e} s, Upper limit {upper_limit:.4e} s"
        return_code = 0
        if self.executable_time > upper_limit:
            print(
                f"    Executable time ({self.executable_time:.4e} s) exceeded the gold executable time ({self.gold_executable_time:.4e} s) by more than {self.tolerance_percent*100.0}%"
            )
            return_code = 1
        elif self.executable_time < lower_limit:
            print(
                f"    Executable time ({self.executable_time:.4e} s) is less than the gold executable time ({self.gold_executable_time:.4e} s) by more than {self.tolerance_percent*100.0}%"
            )
            print(
                f"    Consider changing the gold executable time to {self.executable_time:.4e} s"
            )
        if self.write_json:
            self._write_json()
        _print_pass_fail(self.test_name, return_code, 0, message)

        return return_code


class ExodiffCheck:

    def __init__(
        self,
        test_name,
        exodiff_path,
        exodiff_file,
        exodiff_results_file,
        exodiff_gold_results_file,
        exodiff_args,
        write_json=False,
    ):
        self.test_name = test_name
        self.log_file = "exodiff_check.log"

        # Check if exodiff_path is an absolute path or an executable name
        if os.path.isabs(exodiff_path) and os.path.exists(exodiff_path):
            self.exodiff_path = exodiff_path
        else:
            self.exodiff_path = shutil.which(exodiff_path)
            if self.exodiff_path is None:
                raise FileNotFoundError(f"Executable {exodiff_path} not found in PATH.")

        self.exodiff_file = exodiff_file
        self.exodiff_results_file = exodiff_results_file
        self.exodiff_gold_results_file = exodiff_gold_results_file
        self.exodiff_args = exodiff_args
        self.executable_time = 0
        self.write_json = write_json

    def _write_json(self, return_code):
        """Write the exodiff results to a JSON file
        Example JSON output:
        [
          {
             "name": "test_name",
             "unit": "Return code",
             "value": 1
          }
        ]
        """
        json_file = "performance_" + self.test_name + ".json"
        data = []
        data.append(
            {
                "name": self.test_name,
                "unit": "Return code",
                "value": return_code,
            }
        )
        with open(json_file, "w") as f:
            json.dump(data, f, indent=2)

    def run(self):
        _remove_file(self.log_file)
        return_code = self._run()
        _print_pass_fail(self.test_name, return_code, self.executable_time)
        _move_log_files(self.log_file, self.test_name)
        if self.write_json:
            self._write_json(return_code)
        return return_code

    def _run(self):
        command_pre = []
        # Time the executable
        start_time = time.perf_counter()
        return_code, _stats = _run_executable(
            command_pre,
            self.exodiff_path,
            [
                "-f",
                self.exodiff_file,
            ]
            + self.exodiff_args
            + [
                self.exodiff_results_file,
                self.exodiff_gold_results_file,
            ],
            self.log_file,
            check_memory=False,
        )
        end_time = time.perf_counter()
        self.executable_time = end_time - start_time
        return return_code


def _parse_arguments():
    # Define command line arguments
    parser = argparse.ArgumentParser(
        description="Run an executable and check its return value."
    )
    parser.add_argument("--name", help="Name of the test", default="test")
    parser.add_argument(
        "--num_procs", help="Number of processors for running the executable", default=1
    )
    parser.add_argument(
        "--executable_path", help="Path to the executable", default="aperi-mech"
    )
    parser.add_argument("--exodiff_path", help="Path to exodiff", default="exodiff")
    parser.add_argument(
        "--exodiff_file", help="Path to exodiff file.", default="compare.exodiff"
    )
    parser.add_argument(
        "--exodiff_gold_file",
        help="Path to exodiff gold file.",
        default="gold_results.exo",
    )
    parser.add_argument(
        "--exodiff_results_file",
        help="Path to exodiff results file.",
        default="results.exo",
    )
    parser.add_argument(
        "--exe_args", nargs="*", help="Additional arguments to pass to the executable"
    )
    parser.add_argument(
        "--exodiff_args", nargs="*", help="Additional arguments to pass to exodiff"
    )
    parser.add_argument(
        "--tolerance_percent",
        help="Tolerance for peak memory check in percent",
        default=10,
    )
    parser.add_argument(
        "--peak_memory",
        help="Peak memory usage in MB. If it is 0, the peak memory check will be skipped.",
        default=0,
    )

    # Parse command line arguments
    return parser.parse_args()


def main():
    # TODO(jake): CLI is not really used so may have issues. Need to test.
    args = _parse_arguments()
    regression_test = RegressionTest(
        args.name + "_regression_test",
        args.executable_path,
        args.num_procs,
        args.exe_args,
    )
    return_code, stats = regression_test.run()
    if return_code == 0:
        exodiff_test, _stats = ExodiffCheck(
            args.name + "_exodiff_check",
            args.exodiff_path,
            args.exodiff_file,
            args.exodiff_results_file,
            args.exodiff_gold_file,
            args.exodiff_args,
        )
        return_code = exodiff_test.run()

    if return_code == 0 and args.peak_memory != 0:
        memory_test = PeakMemoryCheck(
            args.name + "_peak_memory_check",
            stats["peak_memory"],
            args.peak_memory,
            args.tolerance_percent,
        )
        return_code = memory_test.run()

    return return_code


if __name__ == "__main__":
    return_code = main()
    exit(return_code)
