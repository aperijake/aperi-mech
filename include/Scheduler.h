#pragma once

#include <yaml-cpp/yaml.h>

#include <limits>
#include <memory>
#include <stdexcept>

namespace aperi {
class Scheduler {
   public:
    /**
     * @brief Constructor.
     * @param time_start The start time.
     * @param time_end The end time.
     */
    Scheduler(double time_start, double time_end) : m_time_start(time_start), m_time_end(time_end) {
        m_next_event_time = time_start;
    };

    /**
     * @brief Destructor.
     */
    ~Scheduler() = default;

    /**
     * @brief Get the end time.
     * @return The end time.
     */
    double GetTimeEnd() const { return m_time_end; };

    /**
     * @brief Get the start time.
     * @return The start time.
     */
    double GetTimeStart() const { return m_time_start; };

    /**
     * @brief Get the next event time.
     * @return The next event time.
     */
    double GetNextEventTime() const { return m_next_event_time; }

    /**
     * @brief Check if it is time for the next event.
     * @param time The current time.
     * @return True if it is time for the next event, false otherwise.
     */
    virtual bool AtNextEvent(double time) = 0;

   protected:
    double m_time_start;
    double m_time_end;
    double m_next_event_time;  // TODO(jake): This is state. Is there a better way to do this?
};

class TimeIncrementScheduler : public Scheduler {
   public:
    /**
     * @brief Constructs a TimeIncrementScheduler object with the given time increment and end time.
     *
     * @param time_start The start time for the scheduler.
     * @param time_end The end time for the scheduler.
     * @param time_increment The time increment for each
     */
    TimeIncrementScheduler(double time_start, double time_end, double time_increment) : Scheduler(time_start, time_end), m_time_increment(time_increment){};

    /**
     * @brief Check if it is time for the next event.
     * @param time The current time.
     * @return True if it is time for the next event, false otherwise.
     */
    virtual bool AtNextEvent(double time) override {
        double tolerance = 1.0e-15;
        bool at_event = time + tolerance >= m_next_event_time;
        if (at_event) {
            m_next_event_time += m_time_increment;
            // Recursively call AtNextEvent to handle the case where this event is more than one event time increment away
            AtNextEvent(time);
            // If the next event time is beyond the end time, set it to infinity
            if (m_next_event_time > GetTimeEnd()) {
                m_next_event_time = std::numeric_limits<double>::max();
            }
        }
        return at_event;
    }

   private:
    double m_time_increment;
};

inline std::shared_ptr<Scheduler> CreateScheduler(const YAML::Node &scheduler_node) {
    double time_end = scheduler_node["time_end"].as<double>();
    double time_start = scheduler_node["time_start"].as<double>();
    double time_increment = scheduler_node["time_increment"].as<double>();
    return std::make_shared<TimeIncrementScheduler>(time_start, time_end, time_increment);
}

}  // namespace aperi