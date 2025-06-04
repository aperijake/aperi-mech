#pragma once

#include <algorithm>
#include <chrono>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <map>
#include <memory>
#include <numeric>
#include <string>
#include <vector>

#include "Kokkos_Core.hpp"
#include "LogUtils.h"

namespace aperi {

class ScopedTimer {
   public:
    ScopedTimer(double& result, bool accurate_timer) : m_result(result), m_start(std::chrono::high_resolution_clock::now()), m_accurate_timer(accurate_timer) {}
    ScopedTimer(double& result, const std::string& message, bool accurate_timer) : m_result(result), m_print_message(true), m_start(std::chrono::high_resolution_clock::now()), m_accurate_timer(accurate_timer) {
        aperi::CoutP0() << "----------------------------------------" << std::endl;
        aperi::CoutP0() << "  " << message << std::endl;
    }

    ~ScopedTimer() {
        if (m_accurate_timer) {
            Kokkos::fence();  // Ensure all Kokkos operations are complete before measuring time
        }
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = end - m_start;
        m_result += duration.count();
        if (m_print_message) {
            aperi::CoutP0() << "  Finished in " << std::scientific << std::setprecision(3) << duration.count() << " seconds" << std::endl;
            aperi::CoutP0() << "----------------------------------------" << std::endl;
        }
    }

   private:
    double& m_result;
    bool m_print_message = false;
    std::chrono::time_point<std::chrono::high_resolution_clock> m_start;
    bool m_accurate_timer;
};

class TimerManagerBase {
   public:
    virtual ~TimerManagerBase() = default;

    virtual double GetTotalTime() const = 0;
    virtual std::string GetGroupName() const = 0;
    virtual void PrintTimers() const = 0;
    virtual void AppendToCSV(std::ofstream& csv_file, const std::string& runstring = "") const = 0;
    virtual void WriteCSV(const std::string& filename_base, const std::string& runstring = "") const = 0;
};

template <typename TimerType>
class TimerManager : public TimerManagerBase {
   public:
    TimerManager(const std::string& group_name, const std::map<TimerType, std::string>& timer_names, bool enable_accurate_timers)
        : m_timer_group_name(group_name), m_timer_names(timer_names), m_enable_accurate_timers(enable_accurate_timers) {
        m_timers.resize(static_cast<size_t>(TimerType::NONE), 0.0);
    }

    ScopedTimer CreateScopedTimer(TimerType type) {
        return ScopedTimer(m_timers[static_cast<size_t>(type)], m_enable_accurate_timers);
    }

    ScopedTimer CreateScopedTimerWithInlineLogging(TimerType type, const std::string& message) {
        return ScopedTimer(m_timers[static_cast<size_t>(type)], message, m_enable_accurate_timers);
    }

    double GetTotalTime(TimerType type) const {
        return m_timers[static_cast<size_t>(type)];
    }

    double GetTotalTime() const override {
        double total_time = 0.0;
        for (const auto& time : m_timers) {
            total_time += time;
        }
        for (const auto& child : m_children) {
            total_time += child->GetTotalTime();
        }
        return total_time;
    }

    template <typename T>
    void AddChild(std::shared_ptr<T> child) {
        m_children.push_back(std::static_pointer_cast<TimerManagerBase>(child));
    }

    void PrintTimers() const override {
        // Print the timers in tabular format
        size_t max_name_length = 0;  // Find the maximum length of the timer names to align the columns in the output
        for (const auto& name : m_timer_names) {
            max_name_length = std::max(max_name_length, name.second.size());
        }
        for (const auto& child : m_children) {
            max_name_length = std::max(max_name_length, child->GetGroupName().size());
        }
        max_name_length = std::max(max_name_length, std::string("Timer Name").size());
        size_t time_width = 16;
        size_t percent_width = 17;
        size_t header_width = max_name_length + 3 + time_width + 3 + percent_width + 3;

        // Print the header
        PrintLine(header_width);

        // Print the group name
        aperi::CoutP0() << "Timer Group: " << m_timer_group_name << std::endl;

        double total_time = GetTotalTime();
        // Print the total time
        aperi::CoutP0() << "Total Time: " << total_time << " seconds" << std::endl;
        PrintLine(header_width);

        aperi::CoutP0() << std::setw(max_name_length) << "Timer Name"
                        << " | " << std::setw(time_width) << "Time (seconds)"
                        << " | " << std::setw(percent_width) << " % of Total Time" << std::endl;
        PrintLine(header_width);

        // Print the timers
        for (size_t i = 0; i < m_timers.size(); ++i) {
            aperi::CoutP0() << std::scientific << std::setprecision(6);
            aperi::CoutP0() << std::setw(max_name_length) << m_timer_names.at(static_cast<TimerType>(i)) << " | " << std::setw(time_width) << m_timers[i] << " | " << std::defaultfloat << std::setw(percent_width) << m_timers[i] / total_time * 100 << "%" << std::endl;
        }

        // Print child timers as if they were additional timers
        for (const auto& child : m_children) {
            double child_time = child->GetTotalTime();
            aperi::CoutP0() << std::scientific << std::setprecision(6);
            aperi::CoutP0() << std::setw(max_name_length) << child->GetGroupName() << " | " << std::setw(time_width) << child_time << " | " << std::defaultfloat << std::setw(percent_width) << child_time / total_time * 100 << "%" << std::endl;
        }

        PrintLine(header_width);

        // Recursively print child timers
        for (const auto& child : m_children) {
            child->PrintTimers();
        }
    }

    void AppendToCSV(std::ofstream& csv_file, const std::string& runstring = "") const override {
        // Append the timers to the CSV file
        for (size_t i = 0; i < m_timers.size(); ++i) {
            std::string timer_name = m_timer_group_name + "_" + m_timer_names.at(static_cast<TimerType>(i));
            // Replace spaces with underscores
            std::replace(timer_name.begin(), timer_name.end(), ' ', '_');
            csv_file << timer_name << ", " << m_timers[i];
            if (!runstring.empty()) {
                csv_file << ", " << runstring;
            }
            csv_file << std::endl;
        }

        // Recursively append child timers
        for (const auto& child : m_children) {
            child->AppendToCSV(csv_file, runstring);
        }
    }

    void WriteCSV(const std::string& filename_base, const std::string& runstring = "") const override {
        // Only write the CSV file on the rank 0 processor
        int rank;
        MPI_Comm_rank(MPI_COMM_WORLD, &rank);
        if (rank != 0) {
            return;
        }

        // Create the filename
        std::string runstring_filename = runstring.empty() ? "" : "_" + runstring;
        // Replace spaces with underscores
        std::replace(runstring_filename.begin(), runstring_filename.end(), ' ', '_');
        // All lowercase
        std::transform(runstring_filename.begin(), runstring_filename.end(), runstring_filename.begin(), ::tolower);
        std::string filename = filename_base + runstring_filename + ".csv";

        // Open the file
        std::ofstream csv_file(filename);
        if (!csv_file.is_open()) {
            aperi::CoutP0() << "Failed to open file " << filename << " for writing." << std::endl;
            return;
        }

        // Write the header
        std::string header = "Timer Name, Time (seconds)";
        if (!runstring.empty()) {
            header += ", Run";
        }
        csv_file << header << std::endl;

        // Append the timers to the CSV file
        AppendToCSV(csv_file, runstring);

        // Close the file
        csv_file.close();
    }

    std::string GetGroupName() const override {
        return m_timer_group_name;
    }

    bool AreAccurateTimersEnabled() const {
        return m_enable_accurate_timers;
    }

   private:
    void PrintLine(const size_t width) const {
        for (size_t i = 0; i < width; ++i) {
            aperi::CoutP0() << "-";
        }
        aperi::CoutP0() << std::endl;
    }

    std::vector<double> m_timers;                               // The scoped timers
    std::string m_timer_group_name;                             // The name of the group of timers
    std::map<TimerType, std::string> m_timer_names;             // The names of the timers
    std::vector<std::shared_ptr<TimerManagerBase>> m_children;  // Child TimerManagers
    bool m_enable_accurate_timers;                              // Flag to enable accurate timers
};

}  // namespace aperi
