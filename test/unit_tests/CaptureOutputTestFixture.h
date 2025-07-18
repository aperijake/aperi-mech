#pragma once
#include <gtest/gtest.h>

#include <filesystem>
#include <string>

// Fixture for capturing stdout and stderr
class CaptureOutputTest : public ::testing::Test {
   protected:
    void SetUp() override {
        if (!m_capture_output) {
            return;
        }
        // Redirect cout and cerr to a stringstream buffer
        CaptureOutput();
    }

    void CaptureOutput() {
        // Redirect cout to a stringstream buffer
        m_cout_streambuf = std::cout.rdbuf();
        std::cout.rdbuf(m_cout_stream.rdbuf());

        // Redirect cerr to a stringstream buffer
        m_cerr_streambuf = std::cerr.rdbuf();
        std::cerr.rdbuf(m_cerr_stream.rdbuf());
        m_output_captured = true;
    }

    void StopCapturingOutput() {
        // Redirect cout and cerr to their old selves
        std::cout.rdbuf(m_cout_streambuf);
        std::cerr.rdbuf(m_cerr_streambuf);
        m_output_captured = false;
    }

    void PrintCapturedOutput() {
        // Redirect cout and cerr to their old selves
        std::cout.rdbuf(m_cout_streambuf);
        std::cerr.rdbuf(m_cerr_streambuf);

        // Print the captured stdout and stderr
        std::cout << m_cout_stream.str();
        std::cerr << m_cerr_stream.str();

        // Redirect cout and cerr to a stringstream buffer
        std::cout.rdbuf(m_cout_stream.rdbuf());
        std::cerr.rdbuf(m_cerr_stream.rdbuf());
    }

    void TearDown() override {
        if (!m_output_captured) {
            return;
        }
        // Redirect cout and cerr to their old selves
        StopCapturingOutput();

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
    bool m_capture_output = true;

   private:
    bool m_output_captured = false;
};
