#pragma once
#include <stk_io/Heartbeat.hpp>
#include <string>  // for string
#include <vector>  // for vector

#include "mpi.h"  // for MPI_Comm

namespace stk {
    namespace io {
        class StkMeshIoBroker;
    }
    namespace mesh {
        class BulkData;
    }
}

class IoMesh {
   public:
    explicit IoMesh(MPI_Comm comm)
        : m_comm(comm) {
        SetOutputStreams();
        EquilibrateMemoryBaseline();
    }

    void EquilibrateMemoryBaseline();

    void SetOutputStreams();

    void LogMeshCounts(const stk::mesh::BulkData &mesh) const;

    void MeshRead(const std::string &type,
                  const std::string &working_directory,
                  const std::string &filename,
                  stk::io::StkMeshIoBroker &ioBroker,
                  stk::io::HeartbeatType hb_type,
                  int interpolation_intervals) const;

    void MeshWrite(const std::string &type,
                   const std::string &working_directory,
                   const std::string &filename,
                   stk::io::StkMeshIoBroker &ioBroker,
                   stk::io::HeartbeatType hb_type,
                   int interpolation_intervals);

    void Driver(const std::string &parallel_io,
                const std::string &working_directory,
                const std::string &filename,
                const std::string &type,
                const std::string &decomp_method,
                bool compose_output,
                int compression_level,
                bool compression_shuffle,
                bool lower_case_variable_names,
                int integer_size,
                stk::io::HeartbeatType hb_type,
                int interpolation_intervals);

    static void SetIoProperties(stk::io::StkMeshIoBroker &ioBroker,
                                bool lower_case_variable_names,
                                const std::string &decomp_method,
                                bool compose_output,
                                const std::string &parallel_io,
                                int compression_level,
                                bool compression_shuffle,
                                int integer_size);

    void SetAddEdges(bool trueOrFalse) { m_add_edges = trueOrFalse; }
    void SetAddFaces(bool trueOrFalse) { m_add_faces = trueOrFalse; }
    void SetUpwardConnectivity(bool trueOrFalse) { m_upward_connectivity = trueOrFalse; }
    void SetAuraOption(bool trueOrFalse) { m_aura_option = trueOrFalse; }
    void SetInitialBucketCapacity(int initialCapacity) { m_initial_bucket_capacity = initialCapacity; }
    void SetMaximumBucketCapacity(int maximumCapacity) { m_maximum_bucket_capacity = maximumCapacity; }

   private:
    MPI_Comm m_comm;
    size_t m_current_avg_baseline = 0;
    bool m_add_edges;
    bool m_add_faces;
    bool m_upward_connectivity;
    bool m_aura_option;
    int m_initial_bucket_capacity;
    int m_maximum_bucket_capacity;
    std::vector<double> m_baseline_buffer;
};