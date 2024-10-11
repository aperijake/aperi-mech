#include <gtest/gtest.h>

#include <thread>  // For std::this_thread::sleep_for

#include "Timer.h"

namespace aperi {

enum class TestTimerType {
    TIMER1,
    TIMER2,
    COUNT  // This should always be the last element
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

}  // namespace aperi