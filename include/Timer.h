#pragma once

#include <algorithm>
#include <chrono>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <memory>
#include <numeric>
#include <string>
#include <vector>

#include "LogUtils.h"

namespace aperi {

class ScopedTimer {
   public:
    ScopedTimer(double& result) : m_result(result), m_start(std::chrono::high_resolution_clock::now()) {}

    ~ScopedTimer() {
        auto end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> duration = end - m_start;
        m_result += duration.count();
    }

   private:
    double& m_result;
    std::chrono::time_point<std::chrono::high_resolution_clock> m_start;
};

class TimerManagerBase {
   public:
    virtual ~TimerManagerBase() = default;

    virtual double GetTotalTime() const = 0;
    virtual std::string GetGroupName() const = 0;
    virtual void PrintTimers() const = 0;
    virtual void AppendToCSV(std::ofstream& csv_file) const = 0;
    virtual void WriteCSV(const std::string& filename) const = 0;
};

template <typename TimerType>
class TimerManager : public TimerManagerBase {
   public:
    TimerManager(const std::string& group_name, const std::vector<std::string>& timer_names)
        : m_timer_group_name(group_name), m_timer_names(timer_names) {
        m_timers.resize(static_cast<size_t>(TimerType::NONE), 0.0);
    }

    ScopedTimer CreateScopedTimer(TimerType type) {
        return ScopedTimer(m_timers[static_cast<size_t>(type)]);
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
            max_name_length = std::max(max_name_length, name.size());
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
            aperi::CoutP0() << std::setw(max_name_length) << m_timer_names[i] << " | " << std::setw(time_width) << m_timers[i] << " | " << std::defaultfloat << std::setw(percent_width) << m_timers[i] / total_time * 100 << "%" << std::endl;
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

    void AppendToCSV(std::ofstream& csv_file) const override {
        // Append the timers to the CSV file
        for (size_t i = 0; i < m_timers.size(); ++i) {
            std::string timer_name = m_timer_group_name + "_" + m_timer_names[i];
            csv_file << timer_name << ", " << m_timers[i] << std::endl;
        }

        // Recursively append child timers
        for (const auto& child : m_children) {
            child->AppendToCSV(csv_file);
        }
    }

    void WriteCSV(const std::string& filename) const override {
        // Only write the CSV file on the rank 0 processor
        int rank;
        MPI_Comm_rank(MPI_COMM_WORLD, &rank);
        if (rank != 0) {
            return;
        }

        // Open the file
        std::ofstream csv_file(filename);
        if (!csv_file.is_open()) {
            aperi::CoutP0() << "Failed to open file " << filename << " for writing." << std::endl;
            return;
        }

        // Write the header
        csv_file << "Timer Name, Time (seconds)" << std::endl;

        // Append the timers to the CSV file
        AppendToCSV(csv_file);

        // Close the file
        csv_file.close();
    }

    std::string GetGroupName() const override {
        return m_timer_group_name;
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
    std::vector<std::string> m_timer_names;                     // The names of the scoped timers
    std::vector<std::shared_ptr<TimerManagerBase>> m_children;  // Child TimerManagers
};

}  // namespace aperi