#pragma once

#include <yaml-cpp/yaml.h>

#include <limits>
#include <memory>
#include <stdexcept>

namespace aperi {
template <typename EventType>
class Scheduler {
   public:
    /**
     * @brief Constructor.
     * @param start_point The start point.
     * @param time_end The end time.
     */
    Scheduler(EventType start_point, double time_end) : m_time_end(time_end) {
        m_next_event_point = start_point;
    };

    /**
     * @brief Destructor.
     */
    virtual ~Scheduler() = default;

    /**
     * @brief Get the end time.
     * @return The end time.
     */
    double GetTimeEnd() const { return m_time_end; };

    /**
     * @brief Get the next event time.
     * @return The next event time.
     */
    EventType GetNextEventTime() const { return m_next_event_point; }

    /**
     * @brief Check if it is time for the next event.
     * @param point The current event point.
     * @return True if it is time for the next event, false otherwise.
     */
    virtual bool AtNextEvent(EventType point) = 0;

   protected:
    double m_time_end;
    EventType m_next_event_point;  // TODO(jake): This is state. Is there a better way to do this?
};

class TimeIncrementScheduler : public Scheduler<double> {
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
     * @brief Destructor.
     */
    virtual ~TimeIncrementScheduler() = default;

    /**
     * @brief Check if it is time for the next event.
     * @param time The current time.
     * @return True if it is time for the next event, false otherwise.
     */
    virtual bool AtNextEvent(double time) override {
        double tolerance = 1.0e-15;
        bool at_event = time + tolerance >= m_next_event_point;
        if (at_event) {
            m_next_event_point += m_time_increment;
            // Recursively call AtNextEvent to handle the case where this event is more than one event time increment away
            AtNextEvent(time);
            // If the next event time is beyond the end time, set it to infinity
            if (m_next_event_point > GetTimeEnd()) {
                m_next_event_point = std::numeric_limits<double>::max();
            }
        }
        return at_event;
    }

   private:
    double m_time_increment;
};

class StepScheduler : public Scheduler<size_t> {
   public:
    /**
     * @brief Constructs a StepScheduler object with the given start point, end time, and step increment.
     *
     * @param start_point The start point.
     * @param step_increment The step increment.
     */
    StepScheduler(size_t start_point, size_t step_increment) : Scheduler(start_point, 0.0), m_step_increment(step_increment){};

    /**
     * @brief Destructor.
     */
    virtual ~StepScheduler() = default;

    /**
     * @brief Check if it is time for the next event.
     * @param point The current event point.
     * @return True if it is at the point of the next event, false otherwise.
     */
    virtual bool AtNextEvent(size_t point) override {
        bool at_event = point == m_next_event_point;
        if (at_event) {
            m_next_event_point += m_step_increment;
        }
        return at_event;
    }

   private:
    size_t m_step_increment;
};

inline std::shared_ptr<Scheduler<double>> CreateTimeIncrementScheduler(const YAML::Node &scheduler_node) {
    double time_end = scheduler_node["time_end"].as<double>();
    double time_start = scheduler_node["time_start"].as<double>();
    double time_increment = scheduler_node["time_increment"].as<double>();
    return std::make_shared<TimeIncrementScheduler>(time_start, time_end, time_increment);
}

}  // namespace aperi