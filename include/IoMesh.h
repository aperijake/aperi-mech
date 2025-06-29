#pragma once
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <string>
#include <vector>

#include "FieldData.h"
#include "MeshData.h"
#include "mpi.h"

namespace aperi {

/**
 * @struct IoMeshParameters
 * @brief Parameters controlling mesh I/O and mesh construction options.
 */
struct IoMeshParameters {
    bool upward_connectivity = true;        ///< Create upward connectivity/adjacency in the mesh
    bool aura_option = false;               ///< Create aura ghosting around each MPI rank
    std::string parallel_io = "pnetcdf";    ///< Parallel IO method: mpiio, mpiposix, or pnetcdf
    std::string decomp_method = "rcb";      ///< Decomposition method: linear, rcb, rib, hsfc, block, cyclic, random, kway, geom_kway, metis_sfc
    std::string mesh_type = "exodusII";     ///< Mesh type: exodusii, generated
    bool compose_output = false;            ///< Create a single output file
    int compression_level = 0;              ///< Compression level [1..9]
    bool compression_shuffle = false;       ///< Use shuffle filter before compressing data
    bool lower_case_variable_names = true;  ///< Convert variable names to lowercase and replace spaces with underscores
    bool minimize_open_files = true;        ///< Minimize open files for live viewing of results
    bool add_faces = false;                 ///< Add faces to the mesh
    int integer_size = 8;                   ///< Integer size for input/output (4 or 8 bytes)
    int initial_bucket_capacity = 0;        ///< Initial bucket capacity for mesh
    int maximum_bucket_capacity = 0;        ///< Maximum bucket capacity for mesh
};

/**
 * @class IoMesh
 * @brief Handles mesh I/O operations, mesh construction, and field management.
 */
class IoMesh {
   public:
    /**
     * @brief Constructor.
     * @param comm MPI communicator.
     * @param io_mesh_parameters Mesh I/O and construction parameters.
     */
    IoMesh(const stk::ParallelMachine &comm, const aperi::IoMeshParameters &io_mesh_parameters);

    /**
     * @brief Destructor.
     */
    ~IoMesh();

    /**
     * @brief Read mesh from file and declare parts.
     * @param filename Mesh file name.
     * @param part_names Names of mesh parts to declare.
     */
    void ReadMesh(const std::string &filename, const std::vector<std::string> &part_names);

    /**
     * @brief Fill a generated mesh from a mesh string.
     * @param mesh_string Mesh generation string.
     */
    void FillGeneratedMesh(const std::string &mesh_string) const;

    /**
     * @brief Complete mesh initialization after reading mesh.
     */
    void CompleteInitialization();

    /**
     * @brief Add fields to the mesh.
     * @param field_data Field definitions.
     * @param part_names Parts to which fields are added.
     */
    void AddFields(const std::vector<aperi::FieldData> &field_data, const std::vector<std::string> &part_names = {});

    /**
     * @brief Create a results file for field output.
     * @param filename Output file name.
     */
    void CreateFieldResultsFile(const std::string &filename);

    /**
     * @brief Register fields for results output.
     * @param field_data Field definitions.
     */
    void AddFieldResultsOutput(const std::vector<aperi::FieldData> &field_data);

    /**
     * @brief Write field results at a given time.
     * @param time Simulation time.
     */
    void WriteFieldResults(double time) const;

    /**
     * @brief Close the field results file.
     */
    void CloseFieldResultsFile() const;

    /**
     * @brief Get reference to mesh bulk data.
     */
    stk::mesh::BulkData &GetBulkData() { return mp_io_broker->bulk_data(); }

    /**
     * @brief Get reference to mesh meta data.
     */
    stk::mesh::MetaData &GetMetaData() { return mp_io_broker->meta_data(); }

    /**
     * @brief Get shared pointer to MeshData.
     */
    std::shared_ptr<aperi::MeshData> GetMeshData() { return mp_mesh_data; }

   private:
    /**
     * @brief Set properties for mesh I/O broker.
     */
    void SetIoProperties() const;

    IoMeshParameters m_params;  ///< Mesh I/O and construction parameters

    std::shared_ptr<stk::io::StkMeshIoBroker> mp_io_broker;  ///< Mesh I/O broker
    std::shared_ptr<aperi::MeshData> mp_mesh_data;           ///< Mesh data wrapper
    int m_input_index = -1;                                  ///< Index of input mesh database
    int m_results_index = -1;                                ///< Index of results output mesh
};

/**
 * @brief Factory function to create IoMesh.
 * @param comm MPI communicator.
 * @param io_mesh_parameters Mesh I/O and construction parameters.
 * @return Unique pointer to IoMesh.
 */
std::unique_ptr<IoMesh> CreateIoMesh(const MPI_Comm &comm, const IoMeshParameters &io_mesh_parameters);

}  // namespace aperi