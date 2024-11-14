#include <gtest/gtest.h>

#include <thread>  // For std::this_thread::sleep_for

#include "Timer.h"

namespace aperi {

enum class TestTimerType {
    TIMER1,
    TIMER2,
    NONE  // This should always be the last element
};

class TimerTest : public ::testing::Test {
   public:
    TimerTest() : m_timer_manager("", {}) {
        m_timer_manager = TimerManager<TestTimerType>("group", {std::string("Timer1"), std::string("Timer2")});
    }

   protected:
    TimerManager<TestTimerType> m_timer_manager;
};

TEST_F(TimerTest, ScopedTimerMeasuresTimeCorrectly) {
    double measured_time = 0.0;
    {
        ScopedTimer timer(measured_time);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    EXPECT_GE(measured_time, 0.1);  // Expect at least 100 milliseconds
}

TEST_F(TimerTest, TimerManagerAccumulatesTimeCorrectly) {
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    double total_time = m_timer_manager.GetTotalTime(TestTimerType::TIMER1);
    EXPECT_GE(total_time, 0.3);  // Expect at least 300 milliseconds
}

TEST_F(TimerTest, TimerManagerHandlesMultipleTimerTypes) {
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER2);
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    double total_time1 = m_timer_manager.GetTotalTime(TestTimerType::TIMER1);
    double total_time2 = m_timer_manager.GetTotalTime(TestTimerType::TIMER2);
    EXPECT_GE(total_time1, 0.1);  // Expect at least 100 milliseconds for TIMER1
    EXPECT_GE(total_time2, 0.2);  // Expect at least 200 milliseconds for TIMER2
}

TEST_F(TimerTest, TimerManagerPrintsTimers) {
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER2);
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    m_timer_manager.PrintTimers();
}

TEST_F(TimerTest, TimerManagerWriteCSV) {
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER2);
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    // Create filename from test name
    std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
    std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
    std::string full_test_name = test_suite_name + "_" + test_name;
    std::string filename = full_test_name + ".csv";
    m_timer_manager.WriteCSV(filename);

    // Check that the file was created
    std::ifstream file(filename);
    EXPECT_TRUE(file.good());

    // Check the contents of the file
    std::string line;

    // Check the header
    std::getline(file, line);
    // Expected: "Timer Name, Time (seconds), Percent of Total Time"
    EXPECT_EQ(line, "Timer Name, Time (seconds), Percent of Total Time");

    // Check the first timer
    std::getline(file, line);
    // Expected: "group_Timer1, 0.1, 33.3333%"
    // Get up to the first comma
    size_t comma_pos = line.find(",");
    std::string timer_name = line.substr(0, comma_pos);
    EXPECT_EQ(timer_name, "group_Timer1");
    // Get up to the second comma
    size_t comma_pos2 = line.find(",", comma_pos + 1);
    std::string time = line.substr(comma_pos + 2, comma_pos2 - comma_pos - 2);
    // Convert the time to a double
    double time_double = std::stod(time);
    EXPECT_GE(time_double, 0.1);
    // Get up to the third comma
    size_t comma_pos3 = line.find(",", comma_pos2 + 1);
    std::string percent = line.substr(comma_pos2 + 2, comma_pos3 - comma_pos2 - 2);
    // Convert the percent to a double
    double percent_double = std::stod(percent);
    EXPECT_GE(percent_double, 0.0);
    EXPECT_LE(percent_double, 100.0);

    // Check the second timer
    std::getline(file, line);
    // Expected: "group_Timer2, 0.2, 66.6667%"
    // Get up to the first comma
    comma_pos = line.find(",");
    timer_name = line.substr(0, comma_pos);
    EXPECT_EQ(timer_name, "group_Timer2");
    // Get up to the second comma
    comma_pos2 = line.find(",", comma_pos + 1);
    time = line.substr(comma_pos + 2, comma_pos2 - comma_pos - 2);
    // Convert the time to a double
    time_double = std::stod(time);
    EXPECT_GE(time_double, 0.2);
    // Get up to the third comma
    comma_pos3 = line.find(",", comma_pos2 + 1);
    percent = line.substr(comma_pos2 + 2, comma_pos3 - comma_pos2 - 2);
    // Convert the percent to a double
    percent_double = std::stod(percent);
    EXPECT_GE(percent_double, 0.0);
    EXPECT_LE(percent_double, 100.0);

    file.close();

    // Remove the file
    std::remove(filename.c_str());
}

}  // namespace aperi