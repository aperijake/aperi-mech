#include <gtest/gtest.h>

#include <filesystem>
#include <string>

// Fixture for capturing stdout and stderr
class CaptureOutputTest : public ::testing::Test {
   protected:
    void SetUp() override {
        // Redirect cout to a stringstream buffer
        m_cout_streambuf = std::cout.rdbuf();
        std::cout.rdbuf(m_cout_stream.rdbuf());

        // Redirect cerr to a stringstream buffer
        m_cerr_streambuf = std::cerr.rdbuf();
        std::cerr.rdbuf(m_cerr_stream.rdbuf());
    }

    void TearDown() override {
        // Redirect cout and cerr to their old selves
        std::cout.rdbuf(m_cout_streambuf);
        std::cerr.rdbuf(m_cerr_streambuf);

        // If the test has failed, print the captured output
        if (::testing::Test::HasFailure()) {
            // Print the captured stdout and stderr only if the test failed
            std::cout << m_cout_stream.str();
            std::cerr << m_cerr_stream.str();
        }
    }

    std::stringstream m_cout_stream;
    std::streambuf *m_cout_streambuf;
    std::stringstream m_cerr_stream;
    std::streambuf *m_cerr_streambuf;
};