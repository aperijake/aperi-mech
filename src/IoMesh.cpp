#include "IoMesh.h"

#include <Ioss_Field.h>     // for Field
#include <Ioss_Property.h>  // for Property
#include <mpi.h>            // for MPI_Comm

#include <cstring>                     // for size_t
#include <iostream>                    // for opera...
#include <memory>                      // for shared_ptr
#include <stk_io/DatabasePurpose.hpp>  // for READ_...
#include <stk_io/FillMesh.hpp>
#include <stk_io/IossBridge.hpp>       // for get_f...
#include <stk_io/StkMeshIoBroker.hpp>  // for StkMe...
#include <stk_mesh/base/Bucket.hpp>    // for Bucket
#include <stk_mesh/base/BulkData.hpp>  // for BulkData
#include <stk_mesh/base/CreateEdges.hpp>
#include <stk_mesh/base/CreateFaces.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>  // for MeshBuilder
#include <stk_mesh/base/MetaData.hpp>     // for MetaData
#include <stk_mesh/base/Part.hpp>         // for Part
#include <stk_mesh/base/Selector.hpp>     // for Selector
#include <string>                         // for string

#include "AperiStkUtils.h"
#include "FieldData.h"

namespace aperi {

/**
 * @brief IoMesh constructor. Initializes mesh data and I/O broker.
 */
IoMesh::IoMesh(const MPI_Comm &comm, const IoMeshParameters &io_mesh_parameters)
    : m_params(io_mesh_parameters) {
    // Set default bucket capacities if not provided
    if (!m_params.initial_bucket_capacity) {
        m_params.initial_bucket_capacity = stk::mesh::get_default_initial_bucket_capacity();
    }
    if (!m_params.maximum_bucket_capacity) {
        m_params.maximum_bucket_capacity = stk::mesh::get_default_maximum_bucket_capacity();
    }

    // Configure mesh builder with parameters
    stk::mesh::BulkData::AutomaticAuraOption aura = m_params.aura_option ? stk::mesh::BulkData::AUTO_AURA : stk::mesh::BulkData::NO_AUTO_AURA;
    stk::mesh::MeshBuilder builder(comm);
    builder.set_aura_option(aura);
    builder.set_upward_connectivity(m_params.upward_connectivity);
    builder.set_initial_bucket_capacity(m_params.initial_bucket_capacity);
    builder.set_maximum_bucket_capacity(m_params.maximum_bucket_capacity);
    std::shared_ptr<stk::mesh::BulkData> bulk = builder.create();

    // Initialize I/O broker and mesh data
    mp_io_broker = std::make_shared<stk::io::StkMeshIoBroker>(comm);
    mp_io_broker->use_simple_fields();
    SetIoProperties();
    mp_io_broker->set_bulk_data(bulk);
    mp_mesh_data = std::make_shared<MeshData>(&mp_io_broker->bulk_data());
}

/**
 * @brief IoMesh destructor. Cleans up mesh I/O resources.
 */
IoMesh::~IoMesh() {
    mp_io_broker->flush_output();
    if (m_input_index != -1) {
        mp_io_broker->remove_mesh_database(m_input_index);
    }
    if (m_results_index != -1) {
        mp_io_broker->close_output_mesh(m_results_index);
    }
    mp_io_broker->close_output_mesh(m_results_index);
}

/**
 * @brief Set properties for the mesh I/O broker based on parameters.
 */
void IoMesh::SetIoProperties() const {
    mp_io_broker->property_add(Ioss::Property("LOWER_CASE_VARIABLE_NAMES", static_cast<int>(m_params.lower_case_variable_names)));

    if (!m_params.decomp_method.empty()) {
        std::string decomp_method = m_params.decomp_method;
        mp_io_broker->property_add(Ioss::Property("DECOMPOSITION_METHOD", decomp_method.c_str()));
    }

    if (m_params.compose_output) {
        mp_io_broker->property_add(Ioss::Property("COMPOSE_RESULTS", 1));
    }

    if (!m_params.parallel_io.empty()) {
        std::string parallel_io = m_params.parallel_io;
        mp_io_broker->property_add(Ioss::Property("PARALLEL_IO_MODE", parallel_io.c_str()));
    }

    bool use_netcdf4 = false;
    if (m_params.compression_level > 0) {
        mp_io_broker->property_add(Ioss::Property("COMPRESSION_LEVEL", m_params.compression_level));
        use_netcdf4 = true;
    }
    if (m_params.compression_shuffle) {
        mp_io_broker->property_add(Ioss::Property("COMPRESSION_SHUFFLE", 1));
        use_netcdf4 = true;
    }
    if (use_netcdf4) {
        mp_io_broker->property_add(Ioss::Property("FILE_TYPE", "netcdf4"));
    }

    if (m_params.integer_size == 8) {
        mp_io_broker->property_add(Ioss::Property("INTEGER_SIZE_DB", m_params.integer_size));
        mp_io_broker->property_add(Ioss::Property("INTEGER_SIZE_API", m_params.integer_size));
    }

    if (m_params.minimize_open_files) {
        mp_io_broker->property_add(Ioss::Property("MINIMIZE_OPEN_FILES", 1));
    }
}

/**
 * @brief Read mesh from file and declare parts.
 */
void IoMesh::ReadMesh(const std::string &filename, const std::vector<std::string> &part_names) {
    // Ensure this is the first call to ReadMesh
    if (m_input_index != -1) {
        throw std::runtime_error("ReadMesh called twice");
    }

    mp_io_broker->use_simple_fields();
    m_input_index = mp_io_broker->add_mesh_database(filename, m_params.mesh_type, stk::io::READ_MESH);
    mp_io_broker->set_active_mesh(m_input_index);
    mp_io_broker->create_input_mesh();

    // Declare all parts in the meta data
    stk::mesh::MetaData &meta_data = mp_io_broker->meta_data();
    for (const std::string &part_name : part_names) {
        stk::mesh::Part *p_part = &meta_data.declare_part(part_name, stk::topology::ELEMENT_RANK);
        // Validate part existence
        if (p_part->id() == stk::mesh::Part::INVALID_ID) {
            throw std::runtime_error("Part '" + part_name + "' does not exist in the mesh file.");
        }
    }
    // mp_io_broker->add_all_mesh_fields_as_input_fields();
}

/**
 * @brief Fill a generated mesh from a mesh string.
 */
void IoMesh::FillGeneratedMesh(const std::string &mesh_string) const {
    stk::io::fill_mesh(mesh_string, mp_io_broker->bulk_data());
    // Optionally create faces if requested
    if (m_params.add_faces) {
        stk::mesh::create_faces(mp_io_broker->bulk_data());
    }
}

/**
 * @brief Add fields to the mesh.
 */
void IoMesh::AddFields(const std::vector<aperi::FieldData> &field_data, const std::vector<std::string> &part_names) {
    // Ensure mesh has been read
    if (m_input_index == -1) {
        throw std::runtime_error("AddFields called before ReadMesh");
    }

    // Declare each field
    for (const FieldData &field : field_data) {
        mp_mesh_data->DeclareField(field, part_names);
    }
}

/**
 * @brief Complete mesh initialization after reading mesh.
 */
void IoMesh::CompleteInitialization() {
    // Ensure mesh has been read
    if (m_input_index == -1) {
        throw std::runtime_error("CompleteInitialization called before ReadMesh");
    }
    mp_io_broker->populate_bulk_data();

    // Optionally create faces if requested
    if (m_params.add_faces) {
        stk::mesh::create_faces(mp_io_broker->bulk_data());
    }
}

/**
 * @brief Create a results file for field output.
 */
void IoMesh::CreateFieldResultsFile(const std::string &filename) {
    m_results_index = mp_io_broker->create_output_mesh(filename, stk::io::WRITE_RESULTS);
}

/**
 * @brief Register fields for results output.
 */
void IoMesh::AddFieldResultsOutput(const std::vector<aperi::FieldData> &field_data) {
    // Ensure results file has been created
    if (m_results_index == -1) {
        throw std::runtime_error("CreateFieldResultsFile called before AddFieldResultsOutput");
    }

    // Register each output field
    for (const auto &field : field_data) {
        if (!field.output) {
            continue;
        }
        assert(!field.output_name.empty());
        const std::string output_name = field.output_name;
        const std::string name = field.name;
        stk::topology::rank_t topology_rank = aperi::GetTopologyRank(field.data_topology_rank);
        stk::mesh::FieldBase *p_field = mp_io_broker->meta_data().get_field(topology_rank, name);
        assert(p_field != nullptr);
        const Ioss::Field::RoleType *p_role = stk::io::get_field_role(*p_field);
        if (p_role && *p_role == Ioss::Field::TRANSIENT) {
            mp_io_broker->add_field(m_results_index, *p_field, output_name);
        }
    }
}

/**
 * @brief Write field results at a given time.
 */
void IoMesh::WriteFieldResults(double time) const {
    mp_io_broker->process_output_request(m_results_index, time);
}

/**
 * @brief Close the field results file.
 */
void IoMesh::CloseFieldResultsFile() const {
    mp_io_broker->close_output_mesh(m_results_index);
}

/**
 * @brief Factory function to create IoMesh.
 */
std::unique_ptr<aperi::IoMesh> CreateIoMesh(const MPI_Comm &comm, const aperi::IoMeshParameters &io_mesh_parameters) {
    return std::make_unique<aperi::IoMesh>(comm, io_mesh_parameters);
}

}  // namespace aperi
