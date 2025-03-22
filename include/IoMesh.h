#pragma once
#include <stk_io/StkMeshIoBroker.hpp>  // for StkMe...
#include <stk_mesh/base/BulkData.hpp>
#include <string>  // for string
#include <vector>  // for vector

#include "FieldData.h"  // for FieldDataRank, FieldData
#include "MeshData.h"
#include "mpi.h"  // for MPI_Comm

namespace aperi {

struct IoMeshParameters {
    bool upward_connectivity = true;        // create upward connectivity/adjacency in the mesh
    bool aura_option = false;               // create aura ghosting around each MPI rank
    std::string parallel_io = "pnetcdf";    // method to use for parallel io. One of mpiio, mpiposix, or pnetcdf
    std::string decomp_method = "rcb";      // decomposition method.  One of: linear, rcb, rib, hsfc, block, cyclic, random, kway, geom_kway, metis_sfc
    std::string mesh_type = "exodusII";     // mesh type. One of: exodusii, generated
    bool compose_output = false;            // create a single output file: true|false"
    int compression_level = 0;              // compression level [1..9] to use
    bool compression_shuffle = false;       // use shuffle filter prior to compressing data: true|false
    bool lower_case_variable_names = true;  // convert variable names to lowercase and replace spaces in names with underscore
    bool minimize_open_files = true;        // close file after each timestep and then reopen on next output, allows for viewing results while simulation is running
    int integer_size = 8;                   // use 4 or 8-byte integers for input and output
    int initial_bucket_capacity = 0;
    int maximum_bucket_capacity = 0;
};

class IoMesh {
   public:
    IoMesh(const stk::ParallelMachine &comm, const aperi::IoMeshParameters &io_mesh_parameters);

    ~IoMesh();

    void ReadMesh(const std::string &filename, const std::vector<std::string> &part_names);

    void CompleteInitialization();

    void AddFields(const std::vector<aperi::FieldData> &field_data, const std::vector<std::string> &part_names = {});

    void CreateFieldResultsFile(const std::string &filename);

    void AddFieldResultsOutput(const std::vector<aperi::FieldData> &field_data);

    void WriteFieldResults(double time) const;

    void CloseFieldResultsFile() const;

    stk::mesh::BulkData &GetBulkData() { return mp_io_broker->bulk_data(); }
    stk::mesh::MetaData &GetMetaData() { return mp_io_broker->meta_data(); }
    std::shared_ptr<aperi::MeshData> GetMeshData() { return mp_mesh_data; }

   private:
    void SetIoProperties() const;

    bool m_upward_connectivity;  // create upward connectivity/adjacency in the mesh
    bool m_aura_option;          // create aura ghosting around each MPI rank
    const std::string m_parallel_io;
    const std::string m_decomp_method;
    const std::string m_mesh_type;
    bool m_compose_output;             // create a single output file: true|false"
    int m_compression_level;           // compression level [1..9] to use
    bool m_compression_shuffle;        // use shuffle filter prior to compressing data: true|false
    bool m_lower_case_variable_names;  // convert variable names to lowercase and replace spaces in names with underscore
    bool m_minimize_open_files;        // close file after each timestep and then reopen on next output, allows for viewing results while simulation is running
    int m_integer_size;                // use 4 or 8-byte integers for input and output
    int m_initial_bucket_capacity;
    int m_maximum_bucket_capacity;

    std::shared_ptr<stk::io::StkMeshIoBroker> mp_io_broker;
    std::shared_ptr<aperi::MeshData> mp_mesh_data;
    int m_input_index = -1;
    int m_results_index = -1;
};

// IoMesh factory function
std::unique_ptr<IoMesh> CreateIoMesh(const MPI_Comm &comm, const IoMeshParameters &io_mesh_parameters);

}  // namespace aperi
