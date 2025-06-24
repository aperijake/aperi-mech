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

IoMesh::IoMesh(const MPI_Comm &comm, const IoMeshParameters &io_mesh_parameters)
    : m_upward_connectivity(io_mesh_parameters.upward_connectivity),
      m_aura_option(io_mesh_parameters.aura_option),
      m_parallel_io(io_mesh_parameters.parallel_io),
      m_decomp_method(io_mesh_parameters.decomp_method),
      m_mesh_type(io_mesh_parameters.mesh_type),
      m_compose_output(io_mesh_parameters.compose_output),
      m_compression_level(io_mesh_parameters.compression_level),
      m_compression_shuffle(io_mesh_parameters.compression_shuffle),
      m_lower_case_variable_names(io_mesh_parameters.lower_case_variable_names),
      m_minimize_open_files(io_mesh_parameters.minimize_open_files),
      m_add_faces(io_mesh_parameters.add_faces),
      m_integer_size(io_mesh_parameters.integer_size),
      m_initial_bucket_capacity(io_mesh_parameters.initial_bucket_capacity),
      m_maximum_bucket_capacity(io_mesh_parameters.maximum_bucket_capacity) {
    if (!m_initial_bucket_capacity) {
        m_initial_bucket_capacity = stk::mesh::get_default_initial_bucket_capacity();
    }
    if (!m_maximum_bucket_capacity) {
        m_maximum_bucket_capacity = stk::mesh::get_default_maximum_bucket_capacity();
    }

    stk::mesh::BulkData::AutomaticAuraOption aura = m_aura_option ? stk::mesh::BulkData::AUTO_AURA : stk::mesh::BulkData::NO_AUTO_AURA;
    stk::mesh::MeshBuilder builder(comm);
    builder.set_aura_option(aura);
    builder.set_upward_connectivity(m_upward_connectivity);
    builder.set_initial_bucket_capacity(m_initial_bucket_capacity);
    builder.set_maximum_bucket_capacity(m_maximum_bucket_capacity);
    std::shared_ptr<stk::mesh::BulkData> bulk = builder.create();

    mp_io_broker = std::make_shared<stk::io::StkMeshIoBroker>(comm);
    mp_io_broker->use_simple_fields();
    SetIoProperties();
    mp_io_broker->set_bulk_data(bulk);
    mp_mesh_data = std::make_shared<MeshData>(&mp_io_broker->bulk_data());
}

// Destructor
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

void IoMesh::SetIoProperties() const {
    mp_io_broker->property_add(Ioss::Property("LOWER_CASE_VARIABLE_NAMES", static_cast<int>(m_lower_case_variable_names)));

    if (!m_decomp_method.empty()) {
        std::string decomp_method = m_decomp_method;
        mp_io_broker->property_add(Ioss::Property("DECOMPOSITION_METHOD", decomp_method.c_str()));
    }

    if (m_compose_output) {
        mp_io_broker->property_add(Ioss::Property("COMPOSE_RESULTS", 1));
    }

    if (!m_parallel_io.empty()) {
        std::string parallel_io = m_parallel_io;
        mp_io_broker->property_add(Ioss::Property("PARALLEL_IO_MODE", parallel_io.c_str()));
    }

    bool use_netcdf4 = false;
    if (m_compression_level > 0) {
        mp_io_broker->property_add(Ioss::Property("COMPRESSION_LEVEL", m_compression_level));
        use_netcdf4 = true;
    }
    if (m_compression_shuffle) {
        mp_io_broker->property_add(Ioss::Property("COMPRESSION_SHUFFLE", 1));
        use_netcdf4 = true;
    }
    if (use_netcdf4) {
        mp_io_broker->property_add(Ioss::Property("FILE_TYPE", "netcdf4"));
    }

    if (m_integer_size == 8) {
        mp_io_broker->property_add(Ioss::Property("INTEGER_SIZE_DB", m_integer_size));
        mp_io_broker->property_add(Ioss::Property("INTEGER_SIZE_API", m_integer_size));
    }

    // Close file after each timestep and then reopen on next output, allows for viewing results while simulation is running
    if (m_minimize_open_files) {
        mp_io_broker->property_add(Ioss::Property("MINIMIZE_OPEN_FILES", 1));
    }
}

void IoMesh::ReadMesh(const std::string &filename, const std::vector<std::string> &part_names) {
    // Make sure this is the first call to ReadMesh
    if (m_input_index != -1) {
        throw std::runtime_error("ReadMesh called twice");
    }

    mp_io_broker->use_simple_fields();
    m_input_index = mp_io_broker->add_mesh_database(filename, m_mesh_type, stk::io::READ_MESH);
    mp_io_broker->set_active_mesh(m_input_index);
    mp_io_broker->create_input_mesh();

    // Get the meta data
    stk::mesh::MetaData &meta_data = mp_io_broker->meta_data();

    // Add all parts to the meta data
    for (const std::string &part_name : part_names) {
        stk::mesh::Part *p_part = &meta_data.declare_part(part_name, stk::topology::ELEMENT_RANK);
        // Make sure the part exists in the mesh file. If not, throw an exception
        if (p_part->id() == stk::mesh::Part::INVALID_ID) {
            throw std::runtime_error("Part '" + part_name + "' does not exist in the mesh file.");
        }
    }

    // mp_io_broker->add_all_mesh_fields_as_input_fields();
}

void IoMesh::FillGeneratedMesh(const std::string &mesh_string) {
    stk::io::fill_mesh(mesh_string, mp_io_broker->bulk_data());
    // Create faces
    if (m_add_faces) {
        stk::mesh::create_faces(mp_io_broker->bulk_data());
    }
}

void DeclareField(stk::mesh::MetaData &meta_data, const FieldData &field, const std::vector<std::string> &part_names) {
    std::visit([&](auto &&arg) {
        // Get the topology rank
        stk::topology::rank_t topology_rank = aperi::GetTopologyRank(field.data_topology_rank);

        // Get the field output type
        stk::io::FieldOutputType field_output_type = aperi::GetFieldOutputType(field.data_rank);

        using T = std::decay_t<decltype(arg)>;
        stk::mesh::FieldBase &data_field = meta_data.declare_field<T>(topology_rank, field.name, field.number_of_states);

        // Convert initial values to the appropriate type
        std::vector<T> initial_values_converted;
        initial_values_converted.reserve(field.initial_values.size());
        for (const auto &value : field.initial_values) {
            std::visit([&](auto &&val) {
                initial_values_converted.push_back(static_cast<T>(val));
            },
                       value);
        }

        // Get selector for the parts
        stk::mesh::Selector selector = aperi::StkGetSelector(part_names, &meta_data);

        // Set the field properties
        stk::mesh::put_field_on_mesh(data_field, selector, field.number_of_components, initial_values_converted.data());
        if (field.data_rank != FieldDataRank::CUSTOM) {
            stk::io::set_field_output_type(data_field, field_output_type);
        }

        // Set the field role to TRANSIENT
        stk::io::set_field_role(data_field, Ioss::Field::TRANSIENT);
    },
               field.data_type);
}

void IoMesh::AddFields(const std::vector<aperi::FieldData> &field_data, const std::vector<std::string> &part_names) {
    // Make sure ReadMesh has been called
    if (m_input_index == -1) {
        throw std::runtime_error("AddFields called before ReadMesh");
    }
    // Get the meta data
    stk::mesh::MetaData &meta_data = mp_io_broker->meta_data();

    // Create the fields
    for (const FieldData &field : field_data) {
        // Create the field
        DeclareField(meta_data, field, part_names);
    }
}

void IoMesh::CompleteInitialization() {
    // Make sure ReadMesh has been called
    if (m_input_index == -1) {
        throw std::runtime_error("CompleteInitialization called before ReadMesh");
    }
    mp_io_broker->populate_bulk_data();  // committing here

    // Create faces
    if (m_add_faces) {
        stk::mesh::create_faces(mp_io_broker->bulk_data());
    }
}

void IoMesh::CreateFieldResultsFile(const std::string &filename) {
    m_results_index = mp_io_broker->create_output_mesh(filename, stk::io::WRITE_RESULTS);
}

void IoMesh::AddFieldResultsOutput(const std::vector<aperi::FieldData> &field_data) {
    // Make sure CreateFieldResultsFile has been called
    if (m_results_index == -1) {
        throw std::runtime_error("CreateFieldResultsFile called before AddFieldResultsOutput");
    }

    // Iterate all fields and set them as results fields...
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

void IoMesh::WriteFieldResults(double time) const {
    mp_io_broker->process_output_request(m_results_index, time);
}

void IoMesh::CloseFieldResultsFile() const {
    mp_io_broker->close_output_mesh(m_results_index);
}

// IoMesh factory function
std::unique_ptr<aperi::IoMesh> CreateIoMesh(const MPI_Comm &comm, const aperi::IoMeshParameters &io_mesh_parameters) {
    return std::make_unique<aperi::IoMesh>(comm, io_mesh_parameters);
}

}  // namespace aperi
