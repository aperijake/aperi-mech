#include "IoMesh.h"

#include <Ioss_Field.h>         // for Field
#include <Ioss_Property.h>      // for Property
#include <Ioss_Region.h>        // for Region
#include <Ioss_Utils.h>         // for Utils
#include <Ioss_VariableType.h>  // for Varia...
#include <mpi.h>                // for MPI_Comm

#include <cstring>                     // for size_t
#include <iostream>                    // for opera...
#include <memory>                      // for shared_ptr
#include <stk_io/DatabasePurpose.hpp>  // for READ_...
#include <stk_io/IossBridge.hpp>       // for get_f...
#include <stk_io/MeshField.hpp>        // for MeshF...
#include <stk_io/StkMeshIoBroker.hpp>  // for StkMe...
#include <stk_mesh/base/BulkData.hpp>  // for BulkData
#include <stk_mesh/base/Comm.hpp>      // for comm_...
#include <stk_mesh/base/CreateEdges.hpp>
#include <stk_mesh/base/CreateFaces.hpp>
#include <stk_mesh/base/GetEntities.hpp>                  // for count...
#include <stk_mesh/base/MeshBuilder.hpp>                  // for MeshBuilder
#include <stk_mesh/base/MetaData.hpp>                     // for MetaData
#include <stk_mesh/base/Part.hpp>                         // for Part
#include <stk_mesh/base/Selector.hpp>                     // for Selector
#include <stk_mesh/base/Types.hpp>                        // for Field...
#include <stk_topology/topology.hpp>                      // for topology
#include <stk_util/environment/Env.hpp>                   // for outputP0
#include <stk_util/environment/EnvData.hpp>               // for EnvData
#include <stk_util/environment/LogWithTimeAndMemory.hpp>  // for log_w...
#include <stk_util/environment/memory_util.hpp>           // for get_c...
#include <stk_util/parallel/Parallel.hpp>                 // for paral...
#include <stk_util/parallel/ParallelReduce.hpp>           // for Reduc...
#include <stk_util/util/MemoryTracking.hpp>
#include <stk_util/util/ParameterList.hpp>   // for Param...
#include <stk_util/util/SimpleArrayOps.hpp>  // for Sum
#include <stk_util/util/human_bytes.hpp>     // for human...
#include <string>                            // for string
#include <vector>                            // for vector

#include "FieldManager.h"

namespace acm {

IoMesh::IoMesh(MPI_Comm comm, IoMeshParameters io_mesh_parameters)
    : m_comm(comm),
      m_add_edges(io_mesh_parameters.add_edges),
      m_add_faces(io_mesh_parameters.add_faces),
      m_upward_connectivity(io_mesh_parameters.upward_connectivity),
      m_aura_option(io_mesh_parameters.aura_option),
      m_parallel_io(io_mesh_parameters.parallel_io),
      m_decomp_method(io_mesh_parameters.decomp_method),
      m_mesh_type(io_mesh_parameters.mesh_type),
      m_compose_output(io_mesh_parameters.compose_output),
      m_compression_level(io_mesh_parameters.compression_level),
      m_compression_shuffle(io_mesh_parameters.compression_shuffle),
      m_lower_case_variable_names(io_mesh_parameters.lower_case_variable_names),
      m_integer_size(io_mesh_parameters.integer_size),
      m_initial_bucket_capacity(io_mesh_parameters.initial_bucket_capacity),
      m_maximum_bucket_capacity(io_mesh_parameters.maximum_bucket_capacity) {
    if (!m_initial_bucket_capacity) {
        m_initial_bucket_capacity = stk::mesh::get_default_initial_bucket_capacity();
    }
    if (!m_maximum_bucket_capacity) {
        m_maximum_bucket_capacity = stk::mesh::get_default_maximum_bucket_capacity();
    }

    SetOutputStreams();
    EquilibrateMemoryBaseline();

    stk::mesh::BulkData::AutomaticAuraOption aura = m_aura_option ? stk::mesh::BulkData::AUTO_AURA : stk::mesh::BulkData::NO_AUTO_AURA;
    stk::mesh::MeshBuilder builder(comm);
    builder.set_aura_option(aura);
    builder.set_upward_connectivity(m_upward_connectivity);
    builder.set_initial_bucket_capacity(m_initial_bucket_capacity);
    builder.set_maximum_bucket_capacity(m_maximum_bucket_capacity);
    stk::log_with_time_and_memory(m_comm, "Creating MetaData/BulkData objects");
    std::shared_ptr<stk::mesh::BulkData> bulk = builder.create();

    stk::log_with_time_and_memory(m_comm, "Creating StkMeshIoBroker object");

    mp_io_broker = std::make_shared<stk::io::StkMeshIoBroker>(comm);
    SetIoProperties();
    mp_io_broker->set_bulk_data(bulk);
}

void IoMesh::Finalize() {
    // remove databases (or get "The MPI_File_sync() function was called after MPI_FINALIZE was invoked.")
    mp_io_broker->remove_mesh_database(m_input_index);
    mp_io_broker->close_output_mesh(m_results_index);
}

void IoMesh::EquilibrateMemoryBaseline() {
    size_t now = 0;
    size_t high_water_mark = 0;
    stk::get_memory_usage(now, high_water_mark);
    if (high_water_mark > now) {
        m_baseline_buffer.resize((high_water_mark - now) / sizeof(double));
    }

    size_t current_max = 0;
    size_t current_min = 0;
    size_t current_average = 0;
    stk::get_memory_high_water_mark_across_processors(m_comm, current_max, current_min, current_average);
    m_current_avg_baseline = current_average;
}

void IoMesh::SetOutputStreams() {
    if (stk::parallel_machine_rank(m_comm) != 0) {
        stk::EnvData::instance().m_outputP0 = &stk::EnvData::instance().m_outputNull;
    }
    Ioss::Utils::set_output_stream(sierra::Env::outputP0());
}

void IoMesh::LogMeshCounts(const stk::mesh::BulkData &mesh) const {
    size_t current_max = 0;
    size_t current_min = 0;
    size_t current_average = 0;
    stk::get_memory_high_water_mark_across_processors(m_comm, current_max, current_min, current_average);
    size_t total_bytes = mesh.parallel_size() * (current_average - m_current_avg_baseline);

    constexpr unsigned k_num_ranks = static_cast<unsigned>(stk::topology::ELEM_RANK + 1);
    std::vector<size_t> global_counts(k_num_ranks, 0);
    std::vector<size_t> min_global_counts(k_num_ranks, 0);
    std::vector<size_t> max_global_counts(k_num_ranks, 0);
    std::vector<size_t> aura_global_counts(k_num_ranks, 0);
    std::vector<size_t> shared_not_owned_counts(k_num_ranks, 0);
    stk::mesh::comm_mesh_counts(mesh, global_counts, min_global_counts, max_global_counts);
    stk::mesh::Selector shared_not_owned = mesh.mesh_meta_data().globally_shared_part() & !mesh.mesh_meta_data().locally_owned_part();
    stk::mesh::count_entities(shared_not_owned, mesh, shared_not_owned_counts);
    stk::all_reduce(m_comm, stk::ReduceSum<k_num_ranks>(shared_not_owned_counts.data()));
    stk::mesh::Selector aura = mesh.mesh_meta_data().aura_part();
    stk::mesh::count_entities(aura, mesh, aura_global_counts);
    stk::all_reduce(m_comm, stk::ReduceSum<k_num_ranks>(aura_global_counts.data()));

    stk::mesh::EntityRank end_rank = static_cast<stk::mesh::EntityRank>(mesh.mesh_meta_data().entity_rank_count());
    {
        std::ostringstream os;
        os << std::setw(8) << " " << std::setw(12) << "owned" << std::setw(14) << "sh-not-owned" << std::setw(10) << "aura" << std::endl;
        for (stk::mesh::EntityRank rank = stk::topology::NODE_RANK; rank < end_rank; ++rank) {
            os << std::setw(34 + 8) << (mesh.mesh_meta_data().entity_rank_names()[rank])
               << std::setw(12) << global_counts[rank]
               << std::setw(12) << shared_not_owned_counts[rank]
               << std::setw(12) << aura_global_counts[rank]
               << std::endl;
        }
        stk::log_with_time_and_memory(m_comm, os.str());
    }

    size_t total_entities = 0;
    for (size_t count : global_counts) total_entities += count;
    for (size_t count : shared_not_owned_counts) total_entities += count;
    for (size_t count : aura_global_counts) total_entities += count;

    size_t bytes_per_entity = total_entities > 0 ? total_bytes / total_entities : 0;
    std::string bytes_per_entity_str = total_entities > 0 ? std::to_string(bytes_per_entity) : std::string("N/A");
    stk::log_with_time_and_memory(m_comm, "Total HWM Mesh Memory: " + stk::human_bytes(total_bytes));
    stk::log_with_time_and_memory(m_comm, "Total Mesh Entities: " + std::to_string(total_entities) + ", bytes-per-entity: " + bytes_per_entity_str);

    for (stk::mesh::EntityRank rank = stk::topology::NODE_RANK; rank < end_rank; ++rank) {
        size_t local_bucket_capacity = 0;
        size_t local_bucket_size = 0;
        const stk::mesh::BucketVector &buckets = mesh.buckets(rank);
        for (const stk::mesh::Bucket *p_bucket : buckets) {
            local_bucket_capacity += p_bucket->capacity();
            local_bucket_size += p_bucket->size();
        }

        size_t global_num_buckets = stk::get_global_sum(m_comm, buckets.size());
        size_t global_bucket_capacity = stk::get_global_sum(m_comm, local_bucket_capacity);
        size_t global_bucket_size = stk::get_global_sum(m_comm, local_bucket_size);
        std::ostringstream os;
        os << global_num_buckets << " " << rank << " buckets, total size/capacity: " << global_bucket_size << " / " << global_bucket_capacity;
        if (global_num_buckets > 0) {
            double total_size = global_bucket_size;
            double proportion = total_size / global_bucket_capacity;
            os << "; " << (100 * proportion) << "%";
        }
        stk::log_with_time_and_memory(m_comm, os.str());
    }

#ifdef STK_MEMORY_TRACKING
    size_t localBytes = stk::get_total_bytes_currently_allocated();
    size_t globalBytes = stk::get_global_sum(m_comm, localBytes);
    size_t localPtrs = stk::get_current_num_ptrs();
    size_t globalPtrs = stk::get_global_sum(m_comm, localPtrs);
    stk::log_with_time_and_memory(m_comm, "Total tracked bytes: " + stk::human_bytes(globalBytes) + ", num ptrs: " + std::to_string(globalPtrs));
    size_t localHWMBytes = stk::get_high_water_mark_in_bytes();
    size_t globalHWMBytes = stk::get_global_sum(m_comm, localHWMBytes);
    size_t localHWMPtrs = stk::get_high_water_mark_in_ptrs();
    size_t globalHWMPtrs = stk::get_global_sum(m_comm, localHWMPtrs);
    stk::log_with_time_and_memory(m_comm, "Total HWM tracked bytes: " + std::to_string(globalHWMBytes) + ", HWM num ptrs: " + std::to_string(globalHWMPtrs));
#endif
}

void IoMesh::SetIoProperties() const {
    mp_io_broker->property_add(Ioss::Property("LOWER_CASE_VARIABLE_NAMES", m_lower_case_variable_names));

    if (!m_decomp_method.empty()) {
        mp_io_broker->property_add(Ioss::Property("DECOMPOSITION_METHOD", m_decomp_method));
    }

    if (m_compose_output) {
        mp_io_broker->property_add(Ioss::Property("COMPOSE_RESULTS", true));
    }

    if (!m_parallel_io.empty()) {
        mp_io_broker->property_add(Ioss::Property("PARALLEL_IO_MODE", m_parallel_io));
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
}

void IoMesh::ReadMesh(const std::string &filename,
                      std::shared_ptr<acm::FieldManager> field_manager) {
    stk::log_with_time_and_memory(m_comm, "Setting memory baseline");
    EquilibrateMemoryBaseline();
    stk::log_with_time_and_memory(m_comm, "Finished setting memory baseline");

#ifdef STK_MEMORY_TRACKING
    stk::reset_high_water_mark_in_bytes();
    stk::reset_high_water_mark_in_ptrs();
#endif

    stk::log_with_time_and_memory(m_comm, "Reading input mesh: " + filename);

    // Make sure this is the first call to ReadMesh
    if (m_input_index != -1) {
        throw std::runtime_error("ReadMesh called twice");
    }

    mp_field_manager = field_manager;
    m_input_index = mp_io_broker->add_mesh_database(filename, m_mesh_type, stk::io::READ_MESH);
    mp_io_broker->set_active_mesh(m_input_index);
    mp_io_broker->create_input_mesh();

    if (field_manager) {
        field_manager->SetupFields(mp_io_broker->meta_data());
    }
    // mp_io_broker->add_all_mesh_fields_as_input_fields();

    mp_io_broker->populate_bulk_data();  // committing here

    // if (m_add_edges) {
    //     stk::mesh::create_edges(mp_io_broker->bulk_data());
    // }

    // if (m_add_faces) {
    //     stk::mesh::create_faces(mp_io_broker->bulk_data());
    // }

    stk::log_with_time_and_memory(m_comm, "Finished reading input mesh");
    LogMeshCounts(mp_io_broker->bulk_data());
}

void IoMesh::CreateFieldResultsFile(const std::string &filename) {
    m_results_index = mp_io_broker->create_output_mesh(filename, stk::io::WRITE_RESULTS);

    // Iterate all fields and set them as results fields...
    const stk::mesh::FieldVector &fields = mp_io_broker->meta_data().get_fields();
    for (size_t i = 0; i < fields.size(); i++) {
        const Ioss::Field::RoleType *p_role = stk::io::get_field_role(*fields[i]);
        if (p_role && *p_role == Ioss::Field::TRANSIENT) {
            mp_io_broker->add_field(m_results_index, *fields[i]);  // results output
        }
    }
}

void IoMesh::WriteFieldResults(double time) const {
    mp_io_broker->begin_output_step(m_results_index, time);
    mp_io_broker->write_defined_output_fields(m_results_index);
    mp_io_broker->end_output_step(m_results_index);
}

// IoMesh factory function
std::unique_ptr<acm::IoMesh> CreateIoMesh(const MPI_Comm &comm, const acm::IoMeshParameters &io_mesh_parameters) {
    return std::make_unique<acm::IoMesh>(comm, io_mesh_parameters);
}

}  // namespace acm