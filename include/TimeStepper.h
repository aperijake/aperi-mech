#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <stdexcept>

namespace aperi {
class TimeStepper {
   public:
    TimeStepper(double time_end) : m_time_end(time_end){};
    ~TimeStepper() = default;
    double GetTimeEnd() const { return m_time_end; };
    virtual double GetTimeIncrement(double time) const = 0;

   private:
    double m_time_end;
};

class DirectTimeStepper : public TimeStepper {
   public:
    DirectTimeStepper(double time_increment, double time_end) : TimeStepper(time_end), m_time_increment(time_increment){};
    double GetTimeIncrement(double time) const override {
        if (time + m_time_increment <= GetTimeEnd()) {
            return m_time_increment;
        } else if (time > GetTimeEnd()) {
            return 0.0;
        } else {
            return GetTimeEnd() - time;
        }
        return m_time_increment;
    };

   private:
    double m_time_increment;
};

inline std::shared_ptr<TimeStepper> CreateTimeStepper(const YAML::Node &time_stepper) {
    std::string type = time_stepper.begin()->first.as<std::string>();
    YAML::Node time_stepper_node = time_stepper.begin()->second;
    double time_end = time_stepper_node["time_end"].as<double>();
    if (type == "direct_time_stepper") {
        double time_increment = time_stepper_node["time_increment"].as<double>();
        return std::make_shared<DirectTimeStepper>(time_increment, time_end);
    } else {
        return nullptr;
    }
}

}  // namespace aperi