#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "Constants.h"
#include "FieldData.h"
#include "LogUtils.h"

namespace aperi {

class MeshData {
   public:
    MeshData(stk::mesh::BulkData *bulk_data) : m_bulk_data(bulk_data) {
        // Throw an exception if the bulk data is null.
        if (m_bulk_data == nullptr) {
            throw std::runtime_error("Bulk data is null.");
        }
    }

    stk::mesh::BulkData *GetBulkData() const { return m_bulk_data; }

    void UpdateFieldDataStates(bool rotate_device_states = false) { m_bulk_data->update_field_data_states(rotate_device_states); }

    template <typename T, size_t N>
    void UpdateFieldDataStates(const std::array<T, N> &query, bool rotate_device_states = false) {
        for (auto &field_query_data : query) {
            stk::mesh::Field<double> *field = StkGetField(field_query_data, &m_bulk_data->mesh_meta_data());
            m_bulk_data->update_field_data_states(field, rotate_device_states);
        }
    }

    std::string GetCoordinatesFieldName() const { return m_bulk_data->mesh_meta_data().coordinate_field_name(); }

    aperi::ElementTopology GetElementTopology(std::string part_name) const {
        stk::mesh::Part *part = m_bulk_data->mesh_meta_data().get_part(part_name);
        if (part == nullptr) {
            throw std::runtime_error("Part " + part_name + " not found.");
        }
        return aperi::GetElementTopology(part->topology());
    }

    std::vector<size_t> GetCommMeshCounts() const {
        std::vector<size_t> comm_mesh_counts;
        stk::mesh::comm_mesh_counts(*m_bulk_data, comm_mesh_counts);
        return comm_mesh_counts;
    }

    size_t GetNumNodes() const {
        return GetCommMeshCounts()[stk::topology::NODE_RANK];
    }

    void PrintNodeCounts(bool print_each_processor = false) const {
        // Get the universal part
        stk::mesh::Selector selector = StkGetSelector({}, &m_bulk_data->mesh_meta_data());
        // Get the ghosted part
        stk::mesh::Selector ghosted_selector = selector & m_bulk_data->mesh_meta_data().globally_shared_part();
        // Get the universal active part
        stk::mesh::Selector active_selector = StkGetSelector({"universal_active_part"}, &m_bulk_data->mesh_meta_data());
        // Get the owned part
        stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
        // Get the active owned part
        stk::mesh::Selector active_owned_selector = active_selector & m_bulk_data->mesh_meta_data().locally_owned_part();

        // Count the number of nodes
        // Want number of owned nodes, number of ghosted nodes, number of owned active nodes, number of ghosted active nodes
        size_t num_owned_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, owned_selector);
        size_t num_ghosted_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, ghosted_selector);
        size_t num_active_owned_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, active_owned_selector);
        // number of ghosted active nodes = number of active nodes - number of active owned nodes
        size_t num_active_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, active_selector);
        size_t num_ghosted_active_nodes = num_active_nodes - num_active_owned_nodes;

        // Get the number of nodes on each processor
        int num_procs = stk::parallel_machine_size(MPI_COMM_WORLD);
        std::vector<size_t> num_owned_nodes_per_proc(num_procs);
        std::vector<size_t> num_ghosted_nodes_per_proc(num_procs);
        std::vector<size_t> num_active_owned_nodes_per_proc(num_procs);
        std::vector<size_t> num_ghosted_active_nodes_per_proc(num_procs);
        num_owned_nodes_per_proc[stk::parallel_machine_rank(MPI_COMM_WORLD)] = num_owned_nodes;
        num_ghosted_nodes_per_proc[stk::parallel_machine_rank(MPI_COMM_WORLD)] = num_ghosted_nodes;
        num_active_owned_nodes_per_proc[stk::parallel_machine_rank(MPI_COMM_WORLD)] = num_active_owned_nodes;
        num_ghosted_active_nodes_per_proc[stk::parallel_machine_rank(MPI_COMM_WORLD)] = num_ghosted_active_nodes;
        MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_owned_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);
        MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_ghosted_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);
        MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_active_owned_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);
        MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_ghosted_active_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);

        // Total number of nodes
        size_t total_num_owned_nodes = 0;
        size_t total_num_ghosted_nodes = 0;
        size_t total_num_active_owned_nodes = 0;
        size_t total_num_ghosted_active_nodes = 0;

        size_t min_num_owned_nodes = num_owned_nodes_per_proc[0];
        size_t max_num_owned_nodes = num_owned_nodes_per_proc[0];
        size_t min_num_ghosted_nodes = num_ghosted_nodes_per_proc[0];
        size_t max_num_ghosted_nodes = num_ghosted_nodes_per_proc[0];
        size_t min_num_active_owned_nodes = num_active_owned_nodes_per_proc[0];
        size_t max_num_active_owned_nodes = num_active_owned_nodes_per_proc[0];
        size_t min_num_ghosted_active_nodes = num_ghosted_active_nodes_per_proc[0];
        size_t max_num_ghosted_active_nodes = num_ghosted_active_nodes_per_proc[0];

        for (int i = 0; i < num_procs; ++i) {
            total_num_owned_nodes += num_owned_nodes_per_proc[i];
            total_num_ghosted_nodes += num_ghosted_nodes_per_proc[i];
            total_num_active_owned_nodes += num_active_owned_nodes_per_proc[i];
            total_num_ghosted_active_nodes += num_ghosted_active_nodes_per_proc[i];
            min_num_owned_nodes = std::min(min_num_owned_nodes, num_owned_nodes_per_proc[i]);
            max_num_owned_nodes = std::max(max_num_owned_nodes, num_owned_nodes_per_proc[i]);
            min_num_ghosted_nodes = std::min(min_num_ghosted_nodes, num_ghosted_nodes_per_proc[i]);
            max_num_ghosted_nodes = std::max(max_num_ghosted_nodes, num_ghosted_nodes_per_proc[i]);
            min_num_active_owned_nodes = std::min(min_num_active_owned_nodes, num_active_owned_nodes_per_proc[i]);
            max_num_active_owned_nodes = std::max(max_num_active_owned_nodes, num_active_owned_nodes_per_proc[i]);
            min_num_ghosted_active_nodes = std::min(min_num_ghosted_active_nodes, num_ghosted_active_nodes_per_proc[i]);
            max_num_ghosted_active_nodes = std::max(max_num_ghosted_active_nodes, num_ghosted_active_nodes_per_proc[i]);
        }

        double avg_num_owned_nodes = static_cast<double>(total_num_owned_nodes) / num_procs;
        double avg_num_ghosted_nodes = static_cast<double>(total_num_ghosted_nodes) / num_procs;
        double avg_num_active_owned_nodes = static_cast<double>(total_num_active_owned_nodes) / num_procs;
        double avg_num_ghosted_active_nodes = static_cast<double>(total_num_ghosted_active_nodes) / num_procs;

        // Calculate the percent unbalance = (max - avg) / avg
        double percent_unbalance_owned = (static_cast<double>(max_num_owned_nodes) - avg_num_owned_nodes) / avg_num_owned_nodes * 100.0;
        double percent_unbalance_active_owned = (static_cast<double>(max_num_active_owned_nodes) - avg_num_active_owned_nodes) / avg_num_active_owned_nodes * 100.0;

        // Print the number of nodes in a nice table, using setw to make it look nice
        // This is the summary so print total number of nodes, average number of nodes, min number of nodes, max number of nodes for each type
        std::stringstream ss;
        int width = 12;
        ss << "*** Node Counts ************************************\n";
        ss << std::setw(width) << "Type" << std::setw(width) << "Total" << std::setw(width) << "Processor" << std::setw(width) << "Processor" << std::setw(width) << "Processor"
           << "\n";
        ss << std::setw(width) << "" << std::setw(width) << "" << std::setw(width) << "Average" << std::setw(width) << "Min" << std::setw(width) << "Max" << std::setw(width) << "Unbalance%"
           << "\n";
        ss << "----------------------------------------------------\n";
        ss << std::setw(width) << "Owned" << std::setw(width) << total_num_active_owned_nodes << std::setw(width) << avg_num_active_owned_nodes << std::setw(width) << min_num_active_owned_nodes << std::setw(width) << max_num_active_owned_nodes << std::setw(width) << percent_unbalance_active_owned << "%\n";
        ss << std::setw(width) << "Ghosted" << std::setw(width) << total_num_ghosted_active_nodes << std::setw(width) << avg_num_ghosted_active_nodes << std::setw(width) << min_num_ghosted_active_nodes << std::setw(width) << max_num_ghosted_active_nodes << "\n";
        ss << "*** Vertex Counts *********************************\n";
        ss << std::setw(width) << "Type" << std::setw(width) << "Total" << std::setw(width) << "Processor" << std::setw(width) << "Processor" << std::setw(width) << "Processor"
           << "\n";
        ss << std::setw(width) << "" << std::setw(width) << "" << std::setw(width) << "Average" << std::setw(width) << "Min" << std::setw(width) << "Max" << std::setw(width) << "Unbalance%"
           << "\n";
        ss << "----------------------------------------------------\n";
        ss << std::setw(width) << "Owned" << std::setw(width) << total_num_owned_nodes << std::setw(width) << avg_num_owned_nodes << std::setw(width) << min_num_owned_nodes << std::setw(width) << max_num_owned_nodes << std::setw(width) << percent_unbalance_owned << "%\n";
        ss << std::setw(width) << "Ghosted" << std::setw(width) << total_num_ghosted_nodes << std::setw(width) << avg_num_ghosted_nodes << std::setw(width) << min_num_ghosted_nodes << std::setw(width) << max_num_ghosted_nodes << "\n";
        ss << "***************************************************\n";
        aperi::CoutP0() << ss.str();

        if (print_each_processor) {
            // Print the number of nodes on each processor
            ss.str("");
            ss << "*** Node Counts ************************************\n";
            ss << std::setw(width) << "Processor" << std::setw(width) << "Owned" << std::setw(width) << "Ghosted\n";
            ss << "----------------------------------------------------\n";
            for (int i = 0; i < num_procs; ++i) {
                ss << std::setw(width) << i << std::setw(width) << num_owned_nodes_per_proc[i] << std::setw(width) << num_ghosted_nodes_per_proc[i] << "\n";
            }
            ss << "*** Vertex Counts *********************************\n";
            ss << std::setw(width) << "Processor" << std::setw(width) << "Owned" << std::setw(width) << "Ghosted\n";
            ss << "----------------------------------------------------\n";
            for (int i = 0; i < num_procs; ++i) {
                ss << std::setw(width) << i << std::setw(width) << num_active_owned_nodes_per_proc[i] << std::setw(width) << num_ghosted_active_nodes_per_proc[i] << "\n";
            }
            ss << "***************************************************\n";
            aperi::CoutP0() << ss.str();
        }
    }

    size_t GetNumElement() const {
        return GetCommMeshCounts()[stk::topology::ELEMENT_RANK];
    }

    size_t GetNumOwnedNodes(const std::vector<std::string> &sets) {
        stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
        stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
        return stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, owned_selector);
    }

    size_t GetNumOwnedElements(const std::vector<std::string> &sets) {
        stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
        stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
        return stk::mesh::count_entities(*m_bulk_data, stk::topology::ELEMENT_RANK, owned_selector);
    }

   private:
    stk::mesh::BulkData *m_bulk_data;  // The bulk data object.
};

// Creation is in IoMesh as it knows about the mesh data (e.g. the bulk data and meta data).

}  // namespace aperi
