#include <gtest/gtest.h>

#include <cstdio>
#include <fstream>
#include <sstream>
#include <string>
#include <thread>
#include <vector>

#include "SimpleTimer.h"
#include "SimpleTimerFactory.h"

namespace aperi {

class SimpleTimerTest : public ::testing::Test {
   protected:
    void SetUp() override {
        // Use a unique log file for each test
        m_log_file = "simple_timer_test.log";
        // Remove any existing file
        std::remove(m_log_file.c_str());
        // Set factory default
        SimpleTimerFactory::SetDefaultLogFile(m_log_file);
        SimpleTimerFactory::SetAccurateTimers(false);
    }

    void TearDown() override {
        std::remove(m_log_file.c_str());
    }

    std::string m_log_file;
};

// Helper to read all lines from a file
std::vector<std::string> ReadLines(const std::string& filename) {
    std::vector<std::string> lines;
    std::ifstream file(filename);
    std::string line;
    while (std::getline(file, line)) {
        lines.push_back(line);
    }
    return lines;
}

TEST_F(SimpleTimerTest, LogsStartAndEndEvents) {
    {
        SimpleTimer timer("TestEvent", m_log_file);
        std::this_thread::sleep_for(std::chrono::milliseconds(10));
    }
    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_TRUE(lines[0].find("START,TestEvent,") == 0);
    EXPECT_TRUE(lines[1].find("END,TestEvent,") == 0);
}

TEST_F(SimpleTimerTest, LogsMetadata) {
    {
        SimpleTimer timer("TestEvent", m_log_file, "meta");
        std::this_thread::sleep_for(std::chrono::milliseconds(5));
    }
    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_NE(lines[0].find(",meta"), std::string::npos);
    EXPECT_NE(lines[1].find(",meta"), std::string::npos);
}

TEST_F(SimpleTimerTest, FactoryCreatesTimerWithDefaultLogFile) {
    {
        auto timer = SimpleTimerFactory::Create("FactoryEvent");
        std::this_thread::sleep_for(std::chrono::milliseconds(5));
    }
    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_TRUE(lines[0].find("START,FactoryEvent,") == 0);
    EXPECT_TRUE(lines[1].find("END,FactoryEvent,") == 0);
}

TEST_F(SimpleTimerTest, FactorySetsAccurateTimers) {
    // Set accurate timers to true
    SimpleTimerFactory::SetAccurateTimers(true);
    {
        auto timer = SimpleTimerFactory::Create("AccurateEvent");
        std::this_thread::sleep_for(std::chrono::milliseconds(5));
    }
    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 2u);
    EXPECT_TRUE(lines[0].find("START,AccurateEvent,") == 0);
    EXPECT_TRUE(lines[1].find("END,AccurateEvent,") == 0);
}

TEST_F(SimpleTimerTest, MultipleTimersAppendToSameFile) {
    {
        SimpleTimer timer1("Event1", m_log_file);
        std::this_thread::sleep_for(std::chrono::milliseconds(2));
    }
    {
        SimpleTimer timer2("Event2", m_log_file);
        std::this_thread::sleep_for(std::chrono::milliseconds(2));
    }
    auto lines = ReadLines(m_log_file);
    ASSERT_EQ(lines.size(), 4u);
    EXPECT_TRUE(lines[0].find("START,Event1,") == 0);
    EXPECT_TRUE(lines[1].find("END,Event1,") == 0);
    EXPECT_TRUE(lines[2].find("START,Event2,") == 0);
    EXPECT_TRUE(lines[3].find("END,Event2,") == 0);
}

}  // namespace aperi
