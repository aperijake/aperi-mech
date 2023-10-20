#include "../include/IoMesh.h"

#include <Ioss_Field.h>         // for Field
#include <Ioss_Property.h>      // for Property
#include <Ioss_Region.h>        // for Region
#include <Ioss_Utils.h>         // for Utils
#include <Ioss_VariableType.h>  // for Varia...
#include <mpi.h>                // for MPI_Comm

#include <cstring>   // for size_t
#include <iostream>  // for opera...
#include <sstream>
#include <stk_io/DatabasePurpose.hpp>  // for READ_...
#include <stk_io/Heartbeat.hpp>        // for NONE
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

void IoMesh::MeshRead(const std::string &type,
                      const std::string &working_directory,
                      const std::string &filename,
                      stk::io::StkMeshIoBroker &ioBroker,
                      stk::io::HeartbeatType hb_type,
                      int interpolation_intervals) const {
#ifdef STK_MEMORY_TRACKING
    stk::reset_high_water_mark_in_bytes();
    stk::reset_high_water_mark_in_ptrs();
#endif

    //    constexpr unsigned N = 1000000;
    //    std::vector<double> v(N, 0.0);
    if (interpolation_intervals == 0)
        interpolation_intervals = 1;

    std::string file = working_directory;
    file += filename;

    size_t input_index = ioBroker.add_mesh_database(file, type, stk::io::READ_MESH);
    ioBroker.set_active_mesh(input_index);
    ioBroker.create_input_mesh();

    // This is done just to define some fields in stk
    // that can be used later for reading restart data.
    stk::io::MeshField::TimeMatchOption tmo = stk::io::MeshField::CLOSEST;
    if (interpolation_intervals > 1) {
        tmo = stk::io::MeshField::LINEAR_INTERPOLATION;
    }
    ioBroker.add_all_mesh_fields_as_input_fields(tmo);

    ioBroker.populate_bulk_data();

    if (m_add_edges) {
        stk::mesh::create_edges(ioBroker.bulk_data());
    }

    if (m_add_faces) {
        stk::mesh::create_faces(ioBroker.bulk_data());
    }
}

void IoMesh::MeshWrite(const std::string &type,
                       const std::string &working_directory,
                       const std::string &filename,
                       stk::io::StkMeshIoBroker &ioBroker,
                       stk::io::HeartbeatType hb_type,
                       int interpolation_intervals) {
    if (interpolation_intervals == 0)
        interpolation_intervals = 1;

    std::string file = working_directory;
    file += filename;

    // ========================================================================
    // Create output mesh...  ("generated_mesh.out") ("exodus_mesh.out")
    std::string output_filename = working_directory + type + "_mesh.out";

    // This call adds an output database for results data to ioBroker.
    // No data is written at this time other than verifying that the
    // file can be created on the disk.
    size_t results_index = ioBroker.create_output_mesh(output_filename, stk::io::WRITE_RESULTS);

    // Create restart output ...  ("generated_mesh.restart") ("exodus_mesh.restart")
    std::string restart_filename = working_directory + type + "_mesh.restart";

    size_t restart_index = ioBroker.create_output_mesh(restart_filename, stk::io::WRITE_RESTART);

    // Iterate all fields and set them as restart fields...
    const stk::mesh::FieldVector &fields = ioBroker.meta_data().get_fields();
    for (size_t i = 0; i < fields.size(); i++) {
        const Ioss::Field::RoleType *p_role = stk::io::get_field_role(*fields[i]);
        if (p_role && *p_role == Ioss::Field::TRANSIENT) {
            ioBroker.add_field(restart_index, *fields[i]);  // restart output
            ioBroker.add_field(results_index, *fields[i]);  // results output
        }
    }

    // Determine the names of the global fields on the input
    // mesh. These will be used below to define the same fields on the
    // restart and results output databases.
    std::vector<std::string> global_fields;
    ioBroker.get_global_variable_names(global_fields);

    // Create heartbeat file of the specified format...
    size_t heart = 0;
    if (hb_type != stk::io::NONE && !global_fields.empty()) {
        std::string heartbeat_filename = working_directory + type + ".hrt";
        heart = ioBroker.add_heartbeat_output(heartbeat_filename, hb_type);
    }

    stk::util::ParameterList parameters;

    // For each global field name on the input database, determine the type of the field
    // and define that same global field on the results, restart, history, and heartbeat outputs.
    if (!global_fields.empty()) {
        std::cout << "Adding " << global_fields.size() << " global fields:\n";
    }

    auto io_region = ioBroker.get_input_ioss_region();

    for (size_t i = 0; i < global_fields.size(); i++) {
        const Ioss::Field &input_field = io_region->get_fieldref(global_fields[i]);
        std::cout << "\t" << input_field.get_name() << " of type " << input_field.raw_storage()->name() << "\n";

        if (input_field.raw_storage()->component_count() == 1) {
            double val = 0.0;
            parameters.set_param(input_field.get_name(), val);
        } else {
            std::vector<double> vals(input_field.raw_storage()->component_count());
            parameters.set_param(input_field.get_name(), vals);
        }

        // Define the global fields that will be written on each timestep.
        ioBroker.add_global(restart_index, input_field.get_name(),
                            input_field.raw_storage()->name(), input_field.get_type());
        ioBroker.add_global(results_index, input_field.get_name(),
                            input_field.raw_storage()->name(), input_field.get_type());
        if (hb_type != stk::io::NONE) {
            stk::util::Parameter &param = parameters.get_param(input_field.get_name());
            ioBroker.add_heartbeat_global(heart, input_field.get_name(), param);
        }
    }

    // ========================================================================
    // Begin the transient loop...  All timesteps on the input database are transferred
    // to the results and restart output databases...

    // Determine number of timesteps on input database...
    int timestep_count = io_region->get_property("state_count").get_int();

    if (timestep_count == 0) {
        ioBroker.write_output_mesh(results_index);
    } else {
        for (int step = 1; step <= timestep_count; step++) {
            double time = io_region->get_state_time(step);
            if (step == timestep_count)
                interpolation_intervals = 1;

            int step_end = step < timestep_count ? step + 1 : step;
            double t_end = io_region->get_state_time(step_end);
            double t_begin = time;
            double delta = (t_end - t_begin) / static_cast<double>(interpolation_intervals);

            for (int interval = 0; interval < interpolation_intervals; interval++) {
                // Normally, an app would only process the restart input at a single step and
                // then continue with execution at that point.  Here just for testing, we are
                // reading restart data at each step on the input restart file/mesh and then
                // outputting that data to the restart and results output.
                time = t_begin + delta * static_cast<double>(interval);

                ioBroker.read_defined_input_fields(time);
                ioBroker.begin_output_step(restart_index, time);
                ioBroker.begin_output_step(results_index, time);

                ioBroker.write_defined_output_fields(restart_index);
                ioBroker.write_defined_output_fields(results_index);

                // Transfer all global variables from the input mesh to the
                // restart and results databases
                stk::util::ParameterMapType::const_iterator i = parameters.begin();
                stk::util::ParameterMapType::const_iterator iend = parameters.end();
                for (; i != iend; ++i) {
                    const std::string parameter_name = (*i).first;
                    stk::util::Parameter &parameter = parameters.get_param(parameter_name);
                    ioBroker.get_global(parameter_name, parameter);
                }

                for (i = parameters.begin(); i != iend; ++i) {
                    const std::string parameter_name = (*i).first;
                    stk::util::Parameter parameter = (*i).second;
                    ioBroker.write_global(restart_index, parameter_name, parameter.value, parameter.type);
                    ioBroker.write_global(results_index, parameter_name, parameter.value, parameter.type);
                }

                ioBroker.end_output_step(restart_index);
                ioBroker.end_output_step(results_index);
            }
            if (hb_type != stk::io::NONE && !global_fields.empty()) {
                ioBroker.process_heartbeat_output(heart, step, time);
            }

            // Flush the data.  This is not necessary in a normal
            // application, Just being done here to verify that the
            // function exists and does not core dump.
            ioBroker.flush_output();
        }
    }
    stk::log_with_time_and_memory(m_comm, "Finished writing output mesh.");
}

void IoMesh::Driver(const std::string &parallel_io,
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
                    int interpolation_intervals) {
    stk::mesh::BulkData::AutomaticAuraOption aura = m_aura_option ? stk::mesh::BulkData::AUTO_AURA : stk::mesh::BulkData::NO_AUTO_AURA;
    stk::mesh::MeshBuilder builder(MPI_COMM_WORLD);
    builder.set_aura_option(aura);
    builder.set_upward_connectivity(m_upward_connectivity);
    builder.set_initial_bucket_capacity(m_initial_bucket_capacity);
    builder.set_maximum_bucket_capacity(m_maximum_bucket_capacity);
    stk::log_with_time_and_memory(m_comm, "Creating MetaData/BulkData objects");
    std::shared_ptr<stk::mesh::BulkData> bulk = builder.create();

    stk::log_with_time_and_memory(m_comm, "Creating StkMeshIoBroker object");

    stk::io::StkMeshIoBroker io_broker(MPI_COMM_WORLD);
    SetIoProperties(io_broker, lower_case_variable_names, decomp_method, compose_output, parallel_io, compression_level, compression_shuffle, integer_size);

    stk::log_with_time_and_memory(m_comm, "Setting memory baseline");
    EquilibrateMemoryBaseline();
    stk::log_with_time_and_memory(m_comm, "Finished setting memory baseline");

    stk::log_with_time_and_memory(m_comm, "Reading input mesh: " + filename);

    io_broker.set_bulk_data(bulk);
    MeshRead(type, working_directory, filename, io_broker, hb_type, interpolation_intervals);

    stk::log_with_time_and_memory(m_comm, "Finished reading input mesh");

    LogMeshCounts(*bulk);

    MeshWrite(type, working_directory, filename, io_broker, hb_type, interpolation_intervals);
}

void IoMesh::SetIoProperties(stk::io::StkMeshIoBroker &ioBroker,
                             bool lower_case_variable_names,
                             const std::string &decomp_method,
                             bool compose_output,
                             const std::string &parallel_io,
                             int compression_level,
                             bool compression_shuffle,
                             int integer_size) {
    ioBroker.property_add(Ioss::Property("LOWER_CASE_VARIABLE_NAMES", lower_case_variable_names));

    if (!decomp_method.empty()) {
        ioBroker.property_add(Ioss::Property("DECOMPOSITION_METHOD", decomp_method));
    }

    if (compose_output) {
        ioBroker.property_add(Ioss::Property("COMPOSE_RESULTS", true));
        ioBroker.property_add(Ioss::Property("COMPOSE_RESTART", true));
    }

    if (!parallel_io.empty()) {
        ioBroker.property_add(Ioss::Property("PARALLEL_IO_MODE", parallel_io));
    }

    bool use_netcdf4 = false;
    if (compression_level > 0) {
        ioBroker.property_add(Ioss::Property("COMPRESSION_LEVEL", compression_level));
        use_netcdf4 = true;
    }
    if (compression_shuffle) {
        ioBroker.property_add(Ioss::Property("COMPRESSION_SHUFFLE", 1));
        use_netcdf4 = true;
    }
    if (use_netcdf4) {
        ioBroker.property_add(Ioss::Property("FILE_TYPE", "netcdf4"));
    }

    if (integer_size == 8) {
        ioBroker.property_add(Ioss::Property("INTEGER_SIZE_DB", integer_size));
        ioBroker.property_add(Ioss::Property("INTEGER_SIZE_API", integer_size));
    }
}