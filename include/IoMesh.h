#include <cstring>                     // for size_t
#include <iostream>                    // for opera...
#include <stk_io/StkMeshIoBroker.hpp>  // for StkMe...
#include <stk_mesh/base/Comm.hpp>      // for comm_...
#include <stk_mesh/base/CreateEdges.hpp>
#include <stk_mesh/base/CreateFaces.hpp>
#include <stk_mesh/base/GetEntities.hpp>                        // for count...
#include <stk_mesh/base/MetaData.hpp>                           // for MetaData
#include <stk_util/command_line/CommandLineParserParallel.hpp>  // for Comma...
#include <stk_util/environment/Env.hpp>                         // for outputP0
#include <stk_util/environment/EnvData.hpp>                     // for EnvData
#include <stk_util/environment/LogWithTimeAndMemory.hpp>        // for log_w...
#include <stk_util/environment/memory_util.hpp>                 // for get_c...
#include <stk_util/parallel/Parallel.hpp>                       // for paral...
#include <stk_util/parallel/ParallelReduce.hpp>                 // for Reduc...
#include <stk_util/util/MemoryTracking.hpp>
#include <stk_util/util/ParameterList.hpp>  // for Param...
#include <stk_util/util/human_bytes.hpp>    // for human...
#include <string>                           // for string
#include <vector>                           // for vector

#include "Ioss_Field.h"                                 // for Field
#include "Ioss_Property.h"                              // for Property
#include "Ioss_Region.h"                                // for Region
#include "Ioss_Utils.h"                                 // for Utils
#include "Ioss_VariableType.h"                          // for Varia...
#include "mpi.h"                                        // for MPI_Comm
#include "stk_io/DatabasePurpose.hpp"                   // for READ_...
#include "stk_io/Heartbeat.hpp"                         // for NONE
#include "stk_io/IossBridge.hpp"                        // for get_f...
#include "stk_io/MeshField.hpp"                         // for MeshF...
#include "stk_mesh/base/BulkData.hpp"                   // for BulkData
#include "stk_mesh/base/MeshBuilder.hpp"                // for MeshBuilder
#include "stk_mesh/base/Part.hpp"                       // for Part
#include "stk_mesh/base/Selector.hpp"                   // for Selector
#include "stk_mesh/base/Types.hpp"                      // for Field...
#include "stk_topology/topology.hpp"                    // for topology
#include "stk_util/command_line/CommandLineParser.hpp"  // for Comma...
#include "stk_util/util/SimpleArrayOps.hpp"             // for Sum

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