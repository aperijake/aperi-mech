#include <TimeStepper.h>
#include <gtest/gtest.h>

// Test direct time stepper creation
TEST(TimeStepperTest, DirectTimeStepper) {
    YAML::Node time_stepper_node;
    time_stepper_node["direct_time_stepper"]["time_end"] = 1.0;
    time_stepper_node["direct_time_stepper"]["time_increment"] = 0.1;
    std::shared_ptr<aperi::TimeStepper> time_stepper = aperi::CreateTimeStepper(time_stepper_node);
    EXPECT_EQ(time_stepper->GetTimeEnd(), 1.0);
    EXPECT_EQ(time_stepper->GetTimeIncrement(0.0), 0.1);
}

// Test that a nullptr is returned if an invalid time stepper is specified
TEST(TimeStepperTest, InvalidTimeStepper) {
    YAML::Node time_stepper_node;
    time_stepper_node["invalid_time_stepper"]["time_end"] = 1.0;
    time_stepper_node["invalid_time_stepper"]["time_increment"] = 0.1;
    std::shared_ptr<aperi::TimeStepper> time_stepper = aperi::CreateTimeStepper(time_stepper_node);
    EXPECT_EQ(time_stepper, nullptr);
}

// Test that the time increment is computed correctly
TEST(TimeStepperTest, TimeIncrement) {
    YAML::Node time_stepper_node;
    time_stepper_node["direct_time_stepper"]["time_end"] = 1.0;
    time_stepper_node["direct_time_stepper"]["time_increment"] = 0.1;
    std::shared_ptr<aperi::TimeStepper> time_stepper = aperi::CreateTimeStepper(time_stepper_node);
    double tolerance = 1.0e-15;
    EXPECT_NEAR(time_stepper->GetTimeIncrement(0.0), 0.1, tolerance);
    EXPECT_NEAR(time_stepper->GetTimeIncrement(0.1), 0.1, tolerance);
    EXPECT_NEAR(time_stepper->GetTimeIncrement(0.9), 0.1, tolerance);
    EXPECT_NEAR(time_stepper->GetTimeIncrement(0.95), 0.05, tolerance);
    EXPECT_NEAR(time_stepper->GetTimeIncrement(1.0), 0.0, tolerance);
    EXPECT_NEAR(time_stepper->GetTimeIncrement(1.1), 0.0, tolerance);
}