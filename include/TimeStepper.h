#pragma once

#include <memory>
#include <stdexcept>

#include <yaml-cpp/yaml.h>

namespace acm {
class TimeStepper {
   public:
    TimeStepper() = default;
    ~TimeStepper() = default;
};

class DirectTimeStepper : public TimeStepper {
   public:
    DirectTimeStepper(double time_increment, double time_end) : m_time_increment(time_increment), m_time_end(time_end) {}

   private:
    double m_time_increment;
    double m_time_end;
};

inline std::shared_ptr<TimeStepper> CreateTimeStepper(const YAML::Node &time_stepper) {
    std::string type = time_stepper.begin()->first.as<std::string>();
    YAML::Node time_stepper_node = time_stepper.begin()->second;
    if (type == "direct_time_stepper") {
        double time_increment = time_stepper_node["time_increment"].as<double>();
        double time_end = time_stepper_node["time_end"].as<double>();
        return std::make_shared<DirectTimeStepper>(time_increment, time_end);
    } else {
        return nullptr;
    }
}

}  // namespace acm