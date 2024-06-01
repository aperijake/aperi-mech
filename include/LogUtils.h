#pragma once

#include <mpi.h>

#include <iostream>
#include <sstream>

namespace aperi {

class OutputP0 {
   public:
    OutputP0(std::ostream& stream = std::cout) : m_rank(-1), m_ostringstream(stream) {
        MPI_Comm_rank(MPI_COMM_WORLD, &m_rank);
    }

    template <typename T>
    OutputP0& operator<<(const T& val) {
        if (m_rank == 0) {
            m_ostringstream << val;
        }
        return *this;
    }

    // Overload for std::endl
    OutputP0& operator<<(std::ostream& (*manipulator)(std::ostream&)) {
        if (manipulator == static_cast<std::ostream& (*)(std::ostream&)>(std::endl)) {
            if (m_rank == 0) {
                m_ostringstream << std::endl;
            }
        }
        return *this;
    }

   private:
    int m_rank;
    std::ostream& m_ostringstream;
};

class CoutP0 : public OutputP0 {
   public:
    CoutP0() : OutputP0() {}
};

class CerrP0 : public OutputP0 {
   public:
    CerrP0() : OutputP0(std::cerr) {}
};

class Cout {
   public:
    Cout(std::ostream& stream = std::cout) : m_rank(-1), m_size(-1), m_stream(stream), m_ostringstream() {
        MPI_Comm_rank(MPI_COMM_WORLD, &m_rank);
        MPI_Comm_size(MPI_COMM_WORLD, &m_size);
        m_ostringstream << "P" << m_rank << ": ";
    }

    template <typename T>
    Cout& operator<<(const T& val) {
        m_ostringstream << val;
        return *this;
    }

    Cout& operator<<(std::ostream& (*manipulator)(std::ostream&)) {
        if (manipulator == static_cast<std::ostream& (*)(std::ostream&)>(std::endl)) {
            if (m_rank == 0) {
                // print own output
                m_stream << m_ostringstream.str() << std::endl;

                // receive output from other processes and print it
                for (int i = 1; i < m_size; i++) {
                    std::string received = ReceiveFromRank(i);
                    m_stream << received;
                }
            } else {
                // send output to process 0
                SendToRank0(m_ostringstream.str() + "\n", m_rank);
            }

            // clear the ostringstream
            m_ostringstream.str("");
            m_ostringstream.clear();
            m_ostringstream << "P" << m_rank << ": ";
        }
        return *this;
    }

    void SendToRank0(const std::string& data, int rank) {
        int size = data.size();
        const void* data_ptr = data.c_str();
        MPI_Datatype datatype = MPI_CHAR;
    
        // Send the size and the data itself
        MPI_Send(&size, 1, MPI_INT, 0, 0, MPI_COMM_WORLD);
        MPI_Send(data_ptr, size, datatype, 0, 0, MPI_COMM_WORLD);
    }

    std::string ReceiveFromRank(int rank) {
        MPI_Status status;

        // Receive the length of data
        int length;
        MPI_Recv(&length, 1, MPI_INT, rank, 0, MPI_COMM_WORLD, &status);

        // Allocate a buffer to hold the string
        char* buffer = new char[length + 1]; // +1 for the null terminator

        // Receive the string
        MPI_Recv(buffer, length, MPI_CHAR, rank, 0, MPI_COMM_WORLD, &status);

        // Null-terminate the buffer
        buffer[length] = '\0';

        // Convert the buffer to a std::string
        std::string str(buffer);

        // Clean up the buffer
        delete[] buffer;

        return str;
    }

   private:
    int m_rank;
    int m_size;
    std::ostream& m_stream;
    std::ostringstream m_ostringstream;
};

}  // namespace aperi
