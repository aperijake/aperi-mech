#include <gtest/gtest.h>

#include <thread>  // For std::this_thread::sleep_for

#include "CaptureOutputTestFixture.h"
#include "Timer.h"

namespace aperi {

enum class TestTimerType {
    TIMER1,
    TIMER2,
    NONE  // This should always be the last element
};

enum class NestedTestTimerType {
    CHILD_TIMER1,
    CHILD_TIMER2,
    NONE  // This should always be the last element
};

class TimerTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();
    }

    void TearDown() override {
        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }

   public:
    TimerTest() : m_timer_manager("", {}) {
        std::map<TestTimerType, std::string> timer_names = {{TestTimerType::TIMER1, "Timer1"}, {TestTimerType::TIMER2, "Timer2"}};
        m_timer_manager = TimerManager<TestTimerType>("group", timer_names);
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
    for (int i = 0; i < 10; ++i) {
        {
            auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
            std::this_thread::sleep_for(std::chrono::milliseconds(10));
        }
    }
    for (int i = 0; i < 10; ++i) {
        {
            auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
            std::this_thread::sleep_for(std::chrono::milliseconds(20));
        }
    }

    double total_time = m_timer_manager.GetTotalTime();
    EXPECT_GE(total_time, 0.3);                                                  // Expect at least 300 milliseconds
    EXPECT_EQ(m_timer_manager.GetTotalTime(TestTimerType::TIMER1), total_time);  // Expect total time for TIMER1
    EXPECT_EQ(m_timer_manager.GetTotalTime(TestTimerType::TIMER2), 0.0);         // Expect 0.0 for TIMER2
}

TEST_F(TimerTest, NestedTimerManagerAccumulatesTimeCorrectly) {
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }

    // Create a nested timer
    std::map<NestedTestTimerType, std::string> nested_timer_names = {{NestedTestTimerType::CHILD_TIMER1, "ChildTimer1"}, {NestedTestTimerType::CHILD_TIMER2, "ChildTimer2"}};
    auto child_timer_manager = std::make_shared<aperi::TimerManager<NestedTestTimerType>>("child_group", nested_timer_names);
    m_timer_manager.AddChild(child_timer_manager);
    {
        auto timer = child_timer_manager->CreateScopedTimer(NestedTestTimerType::CHILD_TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    {
        auto timer = child_timer_manager->CreateScopedTimer(NestedTestTimerType::CHILD_TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(300));
    }

    double total_time = m_timer_manager.GetTotalTime();
    EXPECT_GE(total_time, 0.6);  // Expect at least 600 milliseconds
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

TEST_F(TimerTest, NestedTimerManagerPrintsTimers) {
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    // Create a nested timer
    std::map<NestedTestTimerType, std::string> nested_timer_names = {{NestedTestTimerType::CHILD_TIMER1, "ChildTimer1"}, {NestedTestTimerType::CHILD_TIMER2, "ChildTimer2"}};
    auto child_timer_manager = std::make_shared<aperi::TimerManager<NestedTestTimerType>>("child_group", nested_timer_names);
    m_timer_manager.AddChild(child_timer_manager);
    {
        auto timer = child_timer_manager->CreateScopedTimer(NestedTestTimerType::CHILD_TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    {
        auto timer = child_timer_manager->CreateScopedTimer(NestedTestTimerType::CHILD_TIMER2);
        std::this_thread::sleep_for(std::chrono::milliseconds(300));
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
    std::string filename_base = full_test_name;
    std::string filename = filename_base + ".csv";
    m_timer_manager.WriteCSV(filename_base);

    // Only check the file on rank 0
    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    if (rank != 0) {
        return;
    }

    // Check that the file was created
    std::ifstream file(filename);
    EXPECT_TRUE(file.good());

    // Check the contents of the file
    std::string line;

    // Check the header
    std::getline(file, line);
    // Expected: "Timer Name, Time (seconds), Percent of Total Time"
    EXPECT_EQ(line, "Timer Name, Time (seconds)");

    // Check the first timer
    std::getline(file, line);
    // Expected: "group_Timer1, 0.1"
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

    // Check the second timer
    std::getline(file, line);
    // Expected: "group_Timer2, 0.2"
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

    file.close();

    // Remove the file
    std::remove(filename.c_str());
}

TEST_F(TimerTest, NestedTimerManagerWriteCSV) {
    {
        auto timer = m_timer_manager.CreateScopedTimer(TestTimerType::TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
    // Create a nested timer
    std::map<NestedTestTimerType, std::string> nested_timer_names = {{NestedTestTimerType::CHILD_TIMER1, "ChildTimer1"}, {NestedTestTimerType::CHILD_TIMER2, "ChildTimer2"}};
    auto child_timer_manager = std::make_shared<aperi::TimerManager<NestedTestTimerType>>("child_group", nested_timer_names);
    m_timer_manager.AddChild(child_timer_manager);
    {
        auto timer = child_timer_manager->CreateScopedTimer(NestedTestTimerType::CHILD_TIMER1);
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }
    {
        auto timer = child_timer_manager->CreateScopedTimer(NestedTestTimerType::CHILD_TIMER2);
        std::this_thread::sleep_for(std::chrono::milliseconds(300));
    }
    // Create filename from test name
    std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
    std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
    std::string full_test_name = test_suite_name + "_" + test_name;
    std::string filename_base = full_test_name;
    std::string filename = filename_base + ".csv";
    m_timer_manager.WriteCSV(filename_base);

    // Only check the file on rank 0
    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    if (rank != 0) {
        return;
    }

    // Check that the file was created
    std::ifstream file(filename);
    EXPECT_TRUE(file.good());

    // Check the contents of the file
    std::string line;

    // Check the header
    std::getline(file, line);
    // Expected: "Timer Name, Time (seconds), Percent of Total Time"
    EXPECT_EQ(line, "Timer Name, Time (seconds)");

    // Check the first timer
    std::getline(file, line);
    // Expected: "group_Timer1, 0.1"
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

    // Check the second timer
    std::getline(file, line);
    // Expected: "group_Timer2, 0.0"
    // Get up to the first comma
    comma_pos = line.find(",");
    timer_name = line.substr(0, comma_pos);
    EXPECT_EQ(timer_name, "group_Timer2");
    // Get up to the second comma
    comma_pos2 = line.find(",", comma_pos + 1);
    time = line.substr(comma_pos + 2, comma_pos2 - comma_pos - 2);
    // Convert the time to a double
    time_double = std::stod(time);
    EXPECT_EQ(time_double, 0.0);

    // Check the third timer
    std::getline(file, line);
    // Expected: "child_group_ChildTimer1, 0.2"
    // Get up to the first comma
    comma_pos = line.find(",");
    timer_name = line.substr(0, comma_pos);
    EXPECT_EQ(timer_name, "child_group_ChildTimer1");
    // Get up to the second comma
    comma_pos2 = line.find(",", comma_pos + 1);
    time = line.substr(comma_pos + 2, comma_pos2 - comma_pos - 2);
    // Convert the time to a double
    time_double = std::stod(time);
    EXPECT_GE(time_double, 0.2);

    // Check the forth timer
    std::getline(file, line);
    // Expected: "child_group_ChildTimer2, 0.3"
    // Get up to the first comma
    comma_pos = line.find(",");
    timer_name = line.substr(0, comma_pos);
    EXPECT_EQ(timer_name, "child_group_ChildTimer2");
    // Get up to the second comma
    comma_pos2 = line.find(",", comma_pos + 1);
    time = line.substr(comma_pos + 2, comma_pos2 - comma_pos - 2);
    // Convert the time to a double
    time_double = std::stod(time);
    EXPECT_GE(time_double, 0.3);

    file.close();

    // Remove the file
    std::remove(filename.c_str());
}

}  // namespace aperi