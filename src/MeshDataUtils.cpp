#include "MeshDataUtils.h"

#include <mpi.h>

#include <algorithm>
#include <iomanip>
#include <numeric>
#include <sstream>

namespace aperi {

void PrintNodeCounts(std::shared_ptr<MeshData> mesh_data, bool print_each_processor) {
    auto* m_bulk_data = mesh_data->GetBulkData();
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
    int width_1 = 7;
    int width_2 = 12;
    ss << "\n*** Node Counts ***********************************************\n";
    ss << std::setw(width_1) << "Type" << std::setw(width_1) << "Total" << std::setw(width_2) << "Processor" << std::setw(width_2) << "Processor" << std::setw(width_2) << "Processor"
       << "\n";
    ss << std::setw(width_1) << "" << std::setw(width_1) << "" << std::setw(width_2) << "Average" << std::setw(width_2) << "Min" << std::setw(width_2) << "Max" << std::setw(width_2) << "Unbalance"
       << "\n";
    ss << "---------------------------------------------------------------\n";
    ss << std::setw(width_1) << "Owned" << std::setw(width_1) << total_num_active_owned_nodes << std::setw(width_2) << avg_num_active_owned_nodes << std::setw(width_2) << min_num_active_owned_nodes << std::setw(width_2) << max_num_active_owned_nodes << std::setw(width_2) << percent_unbalance_active_owned << "%\n";
    ss << std::setw(width_1) << "Ghosted" << std::setw(width_1) << total_num_ghosted_active_nodes << std::setw(width_2) << avg_num_ghosted_active_nodes << std::setw(width_2) << min_num_ghosted_active_nodes << std::setw(width_2) << max_num_ghosted_active_nodes << "\n";
    ss << "***************************************************************\n";

    ss << "\n*** Vertex Counts *********************************************\n";
    ss << std::setw(width_1) << "Type" << std::setw(width_1) << "Total" << std::setw(width_2) << "Processor" << std::setw(width_2) << "Processor" << std::setw(width_2) << "Processor"
       << "\n";
    ss << std::setw(width_1) << "" << std::setw(width_1) << "" << std::setw(width_2) << "Average" << std::setw(width_2) << "Min" << std::setw(width_2) << "Max" << std::setw(width_2) << "Unbalance"
       << "\n";
    ss << "---------------------------------------------------------------\n";
    ss << std::setw(width_1) << "Owned" << std::setw(width_1) << total_num_owned_nodes << std::setw(width_2) << avg_num_owned_nodes << std::setw(width_2) << min_num_owned_nodes << std::setw(width_2) << max_num_owned_nodes << std::setw(width_2) << percent_unbalance_owned << "%\n";
    ss << std::setw(width_1) << "Ghosted" << std::setw(width_1) << total_num_ghosted_nodes << std::setw(width_2) << avg_num_ghosted_nodes << std::setw(width_2) << min_num_ghosted_nodes << std::setw(width_2) << max_num_ghosted_nodes << "\n";
    ss << "***************************************************************\n";
    aperi::CoutP0() << ss.str();

    if (print_each_processor) {
        // Print the number of nodes on each processor
        ss.str("");
        ss << "\n*** Node Counts ***********************************************\n";
        ss << std::setw(width_1) << "Processor" << std::setw(width_1) << "Owned" << std::setw(width_2) << "Ghosted\n";
        ss << "---------------------------------------------------------------\n";
        for (int i = 0; i < num_procs; ++i) {
            ss << std::setw(width_1) << i << std::setw(width_1) << num_owned_nodes_per_proc[i] << std::setw(width_2) << num_ghosted_nodes_per_proc[i] << "\n";
        }
        ss << "\n*** Vertex Counts *********************************************\n";
        ss << std::setw(width_1) << "Processor" << std::setw(width_1) << "Owned" << std::setw(width_2) << "Ghosted\n";
        ss << "---------------------------------------------------------------\n";
        for (int i = 0; i < num_procs; ++i) {
            ss << std::setw(width_1) << i << std::setw(width_1) << num_active_owned_nodes_per_proc[i] << std::setw(width_2) << num_ghosted_active_nodes_per_proc[i] << "\n";
        }
        ss << "***************************************************************\n";
        aperi::CoutP0() << ss.str();
    }
}

void PrintElementCounts(std::shared_ptr<MeshData> mesh_data) {
    auto* m_bulk_data = mesh_data->GetBulkData();
    // Get the universal part
    stk::mesh::Selector selector = StkGetSelector({}, &m_bulk_data->mesh_meta_data());
    // Get the owned part
    stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();

    // Get the number of elements
    size_t num_cells = stk::mesh::count_entities(*m_bulk_data, stk::topology::ELEMENT_RANK, owned_selector);

    size_t num_ranks = m_bulk_data->parallel_size();
    std::vector<size_t> num_cells_per_rank(num_ranks);
    num_cells_per_rank[m_bulk_data->parallel_rank()] = num_cells;
    MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_cells_per_rank.data(), 1, MPI_UNSIGNED_LONG, m_bulk_data->parallel());

    // Get the total number of cells
    size_t total_num_cells = std::accumulate(num_cells_per_rank.begin(), num_cells_per_rank.end(), 0);

    // Get the average number of cells
    double avg_num_cells = static_cast<double>(total_num_cells) / static_cast<double>(num_ranks);

    // Get the min and max number of cells
    size_t min_num_cells = *std::min_element(num_cells_per_rank.begin(), num_cells_per_rank.end());
    size_t max_num_cells = *std::max_element(num_cells_per_rank.begin(), num_cells_per_rank.end());

    // Calculate the percent unbalance = (max - avg) / avg
    double percent_unbalance = (static_cast<double>(max_num_cells) - avg_num_cells) / avg_num_cells * 100.0;

    // Print the cell counts
    std::stringstream ss;
    int width_1 = 9;
    int width_2 = 12;
    ss << "*** Cell Counts ***********************************************\n";
    ss << std::setw(width_1) << "Total" << std::setw(width_1) << "Processor" << std::setw(width_2) << "Processor" << std::setw(width_2) << "Processor"
       << "\n";
    ss << std::setw(width_1) << "" << std::setw(width_1) << "Average" << std::setw(width_2) << "Min" << std::setw(width_2) << "Max" << std::setw(width_2) << "Unbalance"
       << "\n";
    ss << "---------------------------------------------------------------\n";
    ss << std::setw(width_1) << total_num_cells << std::setw(width_1) << avg_num_cells << std::setw(width_2) << min_num_cells << std::setw(width_2) << max_num_cells << std::setw(width_2) << percent_unbalance << "%\n";
    ss << "***************************************************************\n";
    aperi::CoutP0() << ss.str();
}

}  // namespace aperi
