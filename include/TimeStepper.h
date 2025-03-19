#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <stdexcept>

#include "FieldData.h"
#include "PowerMethodProcessor.h"
#include "Scheduler.h"

namespace aperi {

class ExplicitSolver;
class MeshData;

struct TimeStepperData {
    double time_increment;
    bool updated = false;
    std::string message = "";
};

/**
 * @class TimeStepper
 * @brief Abstract base class for time stepping algorithms.
 *
 * The TimeStepper class provides an interface for time stepping algorithms used in numerical simulations.
 * It defines a pure virtual function GetTimeIncrement() that must be implemented by derived classes.
 * The GetTimeIncrement() function calculates the time increment for the next time step based on the current time and current increment.
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
    virtual ~TimeStepper() = default;

    /**
     * @brief Initialize the time stepper.
     */
    virtual void Initialize(std::shared_ptr<aperi::MeshData> /*mesh_data*/, std::shared_ptr<ExplicitSolver> /*solver*/){};

    /**
     * @brief Get the end time of the simulation.
     * @return The end time.
     */
    double GetTimeEnd() const { return m_time_end; };

    bool AtEnd(double time) const { return time >= GetTimeEnd(); }

    /**
     * @brief Calculate the time increment for the next time step.
     * @param time The current time.
     * @param increment The current increment.
     * @return The time increment.
     */
    virtual double GetTimeIncrement(double time, size_t increment) = 0;

    /**
     * @brief Get the time stepper data.
     * @param time The current time.
     * @param increment The current increment.
     * @return The time stepper data.
     */
    virtual TimeStepperData GetTimeStepperData(double time, size_t increment) {
        TimeStepperData data;
        data.time_increment = GetTimeIncrement(time, increment);
        return data;
    }

    /**
     * @brief Get the field data.
     * @return The field data.
     */
    std::vector<aperi::FieldData> GetFieldData() const { return m_field_data; }

   private:
    double m_time_end;

   protected:
    std::vector<aperi::FieldData> m_field_data;
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

    virtual ~DirectTimeStepper() = default;

    /**
     * @brief Calculates the time increment for the given time.
     *
     * @param time The current time.
     * @return The calculated time increment.
     */
    double GetTimeIncrement(double time, size_t /*increment*/) override {
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
 * @brief A class that represents a power method time stepper.
 *
 * This class is derived from the TimeStepper base class and provides
 * functionality for calculating the time increment based on the current time.
 * The time increment is updated periodically using the power method to estimate
 * the largest eigenvalue of the system.
 */
class PowerMethodTimeStepper : public TimeStepper {
   public:
    /**
     * @brief Constructs a PowerMethodTimeStepper object with the given time increment and end time.
     *
     * @param scale_factor The scale factor for the time increment.
     * @param time_update_interval The number of time steps between updates.
     * @param time_end The end time for the time stepper.
     */
    PowerMethodTimeStepper(double scale_factor, size_t time_update_interval, double time_end)
        : TimeStepper(time_end), m_scale_factor(scale_factor), m_time_increment(0.0) {
        m_step_scheduler = std::make_shared<StepScheduler>(0, time_update_interval);

        std::vector<double> empty_vector;
        bool output = false;
        size_t number_of_states = 1;
        m_field_data.push_back(aperi::FieldData("displacement_np1_temp", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, number_of_states, empty_vector, output));
        m_field_data.push_back(aperi::FieldData("eigenvector", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, number_of_states, empty_vector, output));
        m_field_data.push_back(aperi::FieldData("force_coefficients_temp", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, number_of_states, empty_vector, output));
    };

    virtual ~PowerMethodTimeStepper() = default;

    /**
     * @brief Initialize the time stepper.
     */
    void Initialize(std::shared_ptr<aperi::MeshData> mesh_data, std::shared_ptr<ExplicitSolver> solver) override {
        m_power_method_processor = std::make_shared<PowerMethodProcessor>(mesh_data, solver);
    };

    /**
     * @brief Calculates the time increment for the given time.
     *
     * @param time The current time.
     * @param increment The current increment.
     * @return The calculated time increment.
     */
    double GetTimeIncrement(double time, size_t increment) override {
        return GetTimeIncrementAndUpdated(time, increment).first;
    };

    /**
     * @brief Get the time stepper data.
     * @param time The current time.
     * @param increment The current increment.
     * @return The time stepper data.
     */
    TimeStepperData GetTimeStepperData(double time, size_t increment) override {
        TimeStepperData data;
        std::pair<double, bool> time_increment_and_updated = GetTimeIncrementAndUpdated(time, increment);
        data.time_increment = time_increment_and_updated.first;
        data.updated = time_increment_and_updated.second;
        data.message = m_power_method_processor->GetPowerMethodStats().Message();
        return data;
    }

   private:
    /**
     * @brief Get the time increment and whether the time increment was updated.
     * @param time The current time.
     * @param increment The current increment.
     * @return A pair containing the time increment and a boolean indicating whether the time increment was updated.
     */
    std::pair<double, bool> GetTimeIncrementAndUpdated(double time, size_t increment) {
        assert(m_power_method_processor != nullptr);
        bool updated = false;
        // Update the time increment if necessary
        if (m_step_scheduler->AtNextEvent(increment)) {
            double full_time_increment = m_power_method_processor->ComputeStableTimeIncrement(time, m_time_increment / m_scale_factor);
            m_time_increment = full_time_increment * m_scale_factor;
            updated = true;
        }
        if (time + m_time_increment <= GetTimeEnd()) {
            return {m_time_increment, updated};
        } else if (time > GetTimeEnd()) {
            return {0.0, updated};
        } else {
            return {GetTimeEnd() - time, updated};
        }
        return {m_time_increment, updated};
    }

    double m_scale_factor;
    double m_time_increment;
    std::shared_ptr<aperi::StepScheduler> m_step_scheduler;
    std::shared_ptr<aperi::PowerMethodProcessor> m_power_method_processor;
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
    } else if (type == "power_method_time_stepper") {
        double scale_factor = time_stepper_node["scale_factor"].as<double>();
        size_t time_update_interval = time_stepper_node["update_interval"].as<size_t>();
        return std::make_shared<PowerMethodTimeStepper>(scale_factor, time_update_interval, time_end);
    } else {
        return nullptr;
    }
}

}  // namespace aperi
