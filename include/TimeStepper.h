#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <stdexcept>

namespace aperi {
/**
 * @class TimeStepper
 * @brief Abstract base class for time stepping algorithms.
 *
 * The TimeStepper class provides an interface for time stepping algorithms used in numerical simulations.
 * It defines a pure virtual function GetTimeIncrement() that must be implemented by derived classes.
 * The GetTimeIncrement() function calculates the time increment for the next time step based on the current time.
 */
class TimeStepper {
   public:
    /**
     * @brief Constructor.
     * @param time_end The end time of the simulation.
     */
    TimeStepper(double time_end) : m_time_end(time_end){};

    /**
     * @brief Destructor.
     */
    ~TimeStepper() = default;

    /**
     * @brief Get the end time of the simulation.
     * @return The end time.
     */
    double GetTimeEnd() const { return m_time_end; };

    bool AtEnd(double time) const { return time >= GetTimeEnd(); }

    /**
     * @brief Calculate the time increment for the next time step.
     * @param time The current time.
     * @return The time increment.
     */
    virtual double GetTimeIncrement(double time) const = 0;

   private:
    double m_time_end;
};

/**
 * @brief A class that represents a direct time stepper.
 *
 * This class is derived from the TimeStepper base class and provides
 * functionality for calculating the time increment based on the current time.
 * The time increment is constant until near the end time.
 */
class DirectTimeStepper : public TimeStepper {
   public:
    /**
     * @brief Constructs a DirectTimeStepper object with the given time increment and end time.
     *
     * @param time_increment The time increment for each step.
     * @param time_end The end time for the time stepper.
     */
    DirectTimeStepper(double time_increment, double time_end) : TimeStepper(time_end), m_time_increment(time_increment){};

    /**
     * @brief Calculates the time increment for the given time.
     *
     * @param time The current time.
     * @return The calculated time increment.
     */
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

/**
 * @brief Creates a TimeStepper object based on the provided YAML configuration.
 *
 * @param time_stepper The YAML node containing the configuration for the TimeStepper.
 * @return A shared pointer to the created TimeStepper object.
 */
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