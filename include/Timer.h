#pragma once

#include <algorithm>
#include <chrono>
#include <fstream>
#include <iomanip>
#include <iostream>
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

template <typename TimerType>
class TimerManager {
   public:
    TimerManager(const std::string& group_name, const std::vector<std::string>& timer_names) : m_timer_group_name(group_name), m_timer_names(timer_names) {
        m_timers.resize(static_cast<size_t>(TimerType::NONE), 0.0);
    }

    ScopedTimer CreateScopedTimer(TimerType type) {
        return ScopedTimer(m_timers[static_cast<size_t>(type)]);
    }

    double GetTotalTime(TimerType type) const {
        return m_timers[static_cast<size_t>(type)];
    }

    double GetTotalTime() const {
        double total_time = 0.0;
        for (const auto& time : m_timers) {
            total_time += time;
        }
        return total_time;
    }

    void PrintTimers() const {
        // Print the timers in tabular format
        size_t max_name_length = 0;  // Find the maximum length of the timer names to align the columns in the output
        for (const auto& name : m_timer_names) {
            max_name_length = std::max(max_name_length, name.size());
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
        PrintLine(header_width);
    }

    void WriteCSV(const std::string& filename) const {
        std::ofstream csv_file(filename);
        if (!csv_file.is_open()) {
            aperi::CoutP0() << "Failed to open file " << filename << " for writing." << std::endl;
            return;
        }

        // Write the header
        csv_file << "Timer Name, Time (seconds), Percent of Total Time" << std::endl;

        double total_time = GetTotalTime();
        for (size_t i = 0; i < m_timers.size(); ++i) {
            std::string timer_name = m_timer_group_name + "_" + m_timer_names[i];
            csv_file << timer_name << ", " << m_timers[i] << ", " << m_timers[i] / total_time * 100 << std::endl;
        }

        csv_file.close();
    }

   private:
    void PrintLine(const size_t width) const {
        for (size_t i = 0; i < width; ++i) {
            aperi::CoutP0() << "-";
        }
        aperi::CoutP0() << std::endl;
    }

    std::vector<double> m_timers;
    std::string m_timer_group_name;
    std::vector<std::string> m_timer_names;
};

}  // namespace aperi