#include <gtest/gtest.h>

#include <cstdio>
#include <fstream>
#include <string>
#include <thread>
#include <vector>

#include "ManualScopeTimer.h"
#include "ManualScopeTimerFactory.h"
#include "SimpleTimerFactory.h"

namespace aperi {

class ManualScopeTimerTest : public ::testing::Test {
   protected:
    void SetUp() override {
        m_log_file = "manual_scope_timer_test.log";
        std::remove(m_log_file.c_str());
        SimpleTimerFactory::SetEnabled(true);
        SimpleTimerFactory::SetDefaultLogFile(m_log_file);
        SimpleTimerFactory::SetAccurateTimers(false);
    }

    void TearDown() override {
        std::remove(m_log_file.c_str());
        SimpleTimerFactory::SetEnabled(false);
    }

    std::string m_log_file;
};

static std::vector<std::string> ReadLines(const std::string& filename) {
    std::vector<std::string> lines;
    std::ifstream file(filename);
    std::string line;
    while (std::getline(file, line)) {
        lines.push_back(line);
    }
    return lines;
}

TEST_F(ManualScopeTimerTest, AccumulatesTimeAndLogsStartEnd) {
    ManualScopeTimer timer("ManualEvent", m_log_file);
    timer.Start();
    std::this_thread::sleep_for(std::chrono::milliseconds(10));
    timer.Stop();
    timer.Dump();

    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_TRUE(lines[0].find("ACCUMULATOR_START,ManualEvent,") == 0);
    EXPECT_TRUE(lines[1].find("ACCUMULATOR_END,ManualEvent,") == 0);
    // Check that accumulated time is positive
    auto pos = lines[1].rfind(',');
    ASSERT_NE(pos, std::string::npos);
    double elapsed = std::stod(lines[1].substr(pos + 1));
    EXPECT_GT(elapsed, 0.0);
}

TEST_F(ManualScopeTimerTest, MultipleStartStopCyclesAccumulate) {
    ManualScopeTimer timer("MultiCycleEvent", m_log_file);
    timer.Start();
    std::this_thread::sleep_for(std::chrono::milliseconds(5));
    timer.Stop();
    timer.Start();
    std::this_thread::sleep_for(std::chrono::milliseconds(7));
    timer.Stop();
    timer.Dump();

    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    auto pos = lines[1].rfind(',');
    ASSERT_NE(pos, std::string::npos);
    double elapsed = std::stod(lines[1].substr(pos + 1));
    EXPECT_GT(elapsed, 0.01);  // Should be at least 12 ms
}

TEST_F(ManualScopeTimerTest, FactoryCreatesTimerWithDefaultLogFile) {
    auto timer = ManualScopeTimerFactory::Create("FactoryManualEvent");
    timer->Start();
    std::this_thread::sleep_for(std::chrono::milliseconds(5));
    timer->Stop();
    timer->Dump();

    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_TRUE(lines[0].find("ACCUMULATOR_START,FactoryManualEvent,") == 0);
    EXPECT_TRUE(lines[1].find("ACCUMULATOR_END,FactoryManualEvent,") == 0);
}

enum class TestEnumManualType {
    TIMER_A,
    TIMER_B,
    NONE
};

inline const std::map<TestEnumManualType, std::string> test_enum_manual_map = {
    {TestEnumManualType::TIMER_A, "EnumManualA"},
    {TestEnumManualType::TIMER_B, "EnumManualB"},
    {TestEnumManualType::NONE, "NONE"}};

TEST_F(ManualScopeTimerTest, FactoryCreatesTimerWithEnumName) {
    auto timer = ManualScopeTimerFactory::Create(TestEnumManualType::TIMER_A, test_enum_manual_map);
    timer->Start();
    std::this_thread::sleep_for(std::chrono::milliseconds(5));
    timer->Stop();
    timer->Dump();

    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_TRUE(lines[0].find("ACCUMULATOR_START,EnumManualA,") == 0);
    EXPECT_TRUE(lines[1].find("ACCUMULATOR_END,EnumManualA,") == 0);
}

TEST_F(ManualScopeTimerTest, MetadataIsLogged) {
    ManualScopeTimer timer("MetaEvent", m_log_file, "meta");
    timer.Start();
    std::this_thread::sleep_for(std::chrono::milliseconds(3));
    timer.Stop();
    timer.Dump();

    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_NE(lines[0].find(",meta"), std::string::npos);
    EXPECT_NE(lines[1].find(",meta"), std::string::npos);
}

}  // namespace aperi
