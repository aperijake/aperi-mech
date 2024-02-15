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

}  // namespace aperi
