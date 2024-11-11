#include <Scheduler.h>
#include <gtest/gtest.h>

// Test time increment scheduler creation
TEST(SchedulerTest, TimeIncrementScheduler) {
    YAML::Node output_scheduler_node;
    output_scheduler_node["time_start"] = 0.0;
    output_scheduler_node["time_end"] = 1.0;
    output_scheduler_node["time_increment"] = 0.1;
    std::shared_ptr<aperi::Scheduler<double>> scheduler = aperi::CreateTimeIncrementScheduler(output_scheduler_node);
    EXPECT_EQ(scheduler->GetTimeEnd(), 1.0);
}

// Test that the next event is detected correctly for the time increment scheduler
TEST(SchedulerTest, TimeIncrementSchedulerAtNextEvent) {
    YAML::Node output_scheduler_node;
    output_scheduler_node["time_start"] = 0.0;
    output_scheduler_node["time_end"] = 1.0;
    output_scheduler_node["time_increment"] = 0.1;
    std::shared_ptr<aperi::Scheduler<double>> scheduler = aperi::CreateTimeIncrementScheduler(output_scheduler_node);
    double tolerance = 1.0e-15;

    EXPECT_EQ(scheduler->GetNextEventTime(), 0.0);  // Initial next event time is 0.0

    EXPECT_FALSE(scheduler->AtNextEvent(-0.1));                  // Before the start time
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.0, tolerance);  // Next event time is 0.0

    EXPECT_TRUE(scheduler->AtNextEvent(0.0));                    // First event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.1, tolerance);  // Next event time is 0.1

    EXPECT_FALSE(scheduler->AtNextEvent(0.05));                  // Not yet at the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.1, tolerance);  // Next event time is 0.1

    EXPECT_FALSE(scheduler->AtNextEvent(0.09));                  // Still not yet at the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.1, tolerance);  // Next event time is 0.1

    EXPECT_TRUE(scheduler->AtNextEvent(0.1));                    // At the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.2, tolerance);  // Next event time is 0.2

    EXPECT_FALSE(scheduler->AtNextEvent(0.19));                  // Not yet at the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.2, tolerance);  // Next event time is 0.2

    EXPECT_TRUE(scheduler->AtNextEvent(0.21));                   // Past the next event, so at the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.3, tolerance);  // Next event time is 0.3

    EXPECT_TRUE(scheduler->AtNextEvent(0.3));                    // At the next event, but less than time_increment away from the last call when an event was detected
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.4, tolerance);  // Next event time is 0.4

    EXPECT_TRUE(scheduler->AtNextEvent(0.75));                   // Way past the next event, so at the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.8, tolerance);  // Next event time is 0.8

    EXPECT_FALSE(scheduler->AtNextEvent(0.76));                  // Not yet at the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 0.8, tolerance);  // Next event time is 0.8

    EXPECT_TRUE(scheduler->AtNextEvent(0.99));                   // Past the next event, so at the next event
    EXPECT_NEAR(scheduler->GetNextEventTime(), 1.0, tolerance);  // Next event time is 1.0

    EXPECT_TRUE(scheduler->AtNextEvent(1.0));                                             // At the end time, next event will be at "infinity"
    EXPECT_NEAR(scheduler->GetNextEventTime(), std::numeric_limits<double>::max(), 1.0);  // Next event time is "infinity"

    // Beyond the end time
    EXPECT_FALSE(scheduler->AtNextEvent(1.1));
    EXPECT_FALSE(scheduler->AtNextEvent(10.1));
}

// Test that the next event is detected correctly for the step scheduler
TEST(SchedulerTest, StepSchedulerAtNextEvent) {
    size_t step_increment = 5;
    std::shared_ptr<aperi::Scheduler<size_t>> scheduler = std::make_shared<aperi::StepScheduler>(0, step_increment);

    EXPECT_EQ(scheduler->GetNextEventTime(), 0);  // Initial next event time is 0

    EXPECT_TRUE(scheduler->AtNextEvent(0));       // Not yet at the next event
    EXPECT_EQ(scheduler->GetNextEventTime(), 5);  // Next event time is 0

    EXPECT_FALSE(scheduler->AtNextEvent(1));      // Not yet at the next event
    EXPECT_EQ(scheduler->GetNextEventTime(), 5);  // Next event time is 0

    EXPECT_FALSE(scheduler->AtNextEvent(4));      // Not yet at the next event
    EXPECT_EQ(scheduler->GetNextEventTime(), 5);  // Next event time is 0

    EXPECT_TRUE(scheduler->AtNextEvent(5));        // At the next event
    EXPECT_EQ(scheduler->GetNextEventTime(), 10);  // Next event time is 5

    EXPECT_FALSE(scheduler->AtNextEvent(6));       // Not yet at the next event
    EXPECT_EQ(scheduler->GetNextEventTime(), 10);  // Next event time is 5

    EXPECT_FALSE(scheduler->AtNextEvent(9));       // Not yet at the next event
    EXPECT_EQ(scheduler->GetNextEventTime(), 10);  // Next event time is 5

    EXPECT_TRUE(scheduler->AtNextEvent(10));       // At the next event
    EXPECT_EQ(scheduler->GetNextEventTime(), 15);  // Next event time is 10
}