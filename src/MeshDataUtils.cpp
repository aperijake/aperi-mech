#include "MeshDataUtils.h"

#include <mpi.h>

#include <algorithm>
#include <iomanip>
#include <numeric>
#include <sstream>
#include <stk_mesh/base/GetEntities.hpp>

#include "AperiStkUtils.h"
#include "LogUtils.h"

namespace aperi {

/**
 * @brief Print a summary table of node counts (owned, ghosted, etc.) for the mesh.
 *
 * This function prints a formatted summary of node counts, including owned, ghosted,
 * and active nodes, as well as per-processor statistics if requested.
 */
void PrintNodeCounts(std::shared_ptr<MeshData> mesh_data, bool print_each_processor) {
    auto* bulk = mesh_data->GetBulkData();
    auto& meta = bulk->mesh_meta_data();

    // Build selectors for various node sets
    stk::mesh::Selector selector = StkGetSelector({}, &meta);
    stk::mesh::Selector ghosted_selector = selector & meta.globally_shared_part();
    stk::mesh::Selector active_selector = StkGetSelector({"universal_active_part"}, &meta);
    stk::mesh::Selector owned_selector = selector & meta.locally_owned_part();
    stk::mesh::Selector active_owned_selector = active_selector & meta.locally_owned_part();

    // Count nodes in each category
    size_t num_owned_nodes = stk::mesh::count_entities(*bulk, stk::topology::NODE_RANK, owned_selector);
    size_t num_ghosted_nodes = stk::mesh::count_entities(*bulk, stk::topology::NODE_RANK, ghosted_selector);
    size_t num_active_owned_nodes = stk::mesh::count_entities(*bulk, stk::topology::NODE_RANK, active_owned_selector);
    size_t num_active_nodes = stk::mesh::count_entities(*bulk, stk::topology::NODE_RANK, active_selector);
    size_t num_ghosted_active_nodes = num_active_nodes - num_active_owned_nodes;

    // Gather per-processor counts
    int num_procs = stk::parallel_machine_size(MPI_COMM_WORLD);
    int my_rank = stk::parallel_machine_rank(MPI_COMM_WORLD);
    std::vector<size_t> owned_nodes_per_proc(num_procs, 0), ghosted_nodes_per_proc(num_procs, 0);
    std::vector<size_t> active_owned_nodes_per_proc(num_procs, 0), ghosted_active_nodes_per_proc(num_procs, 0);
    owned_nodes_per_proc[my_rank] = num_owned_nodes;
    ghosted_nodes_per_proc[my_rank] = num_ghosted_nodes;
    active_owned_nodes_per_proc[my_rank] = num_active_owned_nodes;
    ghosted_active_nodes_per_proc[my_rank] = num_ghosted_active_nodes;
    MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, owned_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);
    MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, ghosted_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);
    MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, active_owned_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);
    MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, ghosted_active_nodes_per_proc.data(), 1, MPI_UNSIGNED_LONG, MPI_COMM_WORLD);

    // Utility lambdas for stats
    auto sum = [](const std::vector<size_t>& v) { return std::accumulate(v.begin(), v.end(), size_t(0)); };
    auto min = [](const std::vector<size_t>& v) { return *std::min_element(v.begin(), v.end()); };
    auto max = [](const std::vector<size_t>& v) { return *std::max_element(v.begin(), v.end()); };

    // Compute totals and statistics
    size_t total_owned = sum(owned_nodes_per_proc);
    size_t total_ghosted = sum(ghosted_nodes_per_proc);
    size_t total_active_owned = sum(active_owned_nodes_per_proc);
    size_t total_ghosted_active = sum(ghosted_active_nodes_per_proc);

    double avg_owned = double(total_owned) / num_procs;
    double avg_ghosted = double(total_ghosted) / num_procs;
    double avg_active_owned = double(total_active_owned) / num_procs;
    double avg_ghosted_active = double(total_ghosted_active) / num_procs;

    double unbal_owned = (max(owned_nodes_per_proc) - avg_owned) / avg_owned * 100.0;
    double unbal_active_owned = (max(active_owned_nodes_per_proc) - avg_active_owned) / avg_active_owned * 100.0;

    // Print summary tables
    std::stringstream ss;
    int w1 = 7, w2 = 12;
    ss << "\n*** Node Counts ***********************************************\n";
    ss << std::setw(w1) << "Type" << std::setw(w1) << "Total" << std::setw(w2) << "Processor" << std::setw(w2) << "Processor" << std::setw(w2) << "Processor"
       << "\n";
    ss << std::setw(w1) << "" << std::setw(w1) << "" << std::setw(w2) << "Average" << std::setw(w2) << "Min" << std::setw(w2) << "Max" << std::setw(w2) << "Unbalance"
       << "\n";
    ss << "---------------------------------------------------------------\n";
    ss << std::setw(w1) << "Owned" << std::setw(w1) << total_active_owned << std::setw(w2) << avg_active_owned << std::setw(w2) << min(active_owned_nodes_per_proc) << std::setw(w2) << max(active_owned_nodes_per_proc) << std::setw(w2) << unbal_active_owned << "%\n";
    ss << std::setw(w1) << "Ghosted" << std::setw(w1) << total_ghosted_active << std::setw(w2) << avg_ghosted_active << std::setw(w2) << min(ghosted_active_nodes_per_proc) << std::setw(w2) << max(ghosted_active_nodes_per_proc) << "\n";
    ss << "***************************************************************\n";

    ss << "\n*** Vertex Counts *********************************************\n";
    ss << std::setw(w1) << "Type" << std::setw(w1) << "Total" << std::setw(w2) << "Processor" << std::setw(w2) << "Processor" << std::setw(w2) << "Processor"
       << "\n";
    ss << std::setw(w1) << "" << std::setw(w1) << "" << std::setw(w2) << "Average" << std::setw(w2) << "Min" << std::setw(w2) << "Max" << std::setw(w2) << "Unbalance"
       << "\n";
    ss << "---------------------------------------------------------------\n";
    ss << std::setw(w1) << "Owned" << std::setw(w1) << total_owned << std::setw(w2) << avg_owned << std::setw(w2) << min(owned_nodes_per_proc) << std::setw(w2) << max(owned_nodes_per_proc) << std::setw(w2) << unbal_owned << "%\n";
    ss << std::setw(w1) << "Ghosted" << std::setw(w1) << total_ghosted << std::setw(w2) << avg_ghosted << std::setw(w2) << min(ghosted_nodes_per_proc) << std::setw(w2) << max(ghosted_nodes_per_proc) << "\n";
    ss << "***************************************************************\n";
    aperi::CoutP0() << ss.str();

    // Optionally print per-processor details
    if (print_each_processor) {
        ss.str("");
        ss << "\n*** Node Counts ***********************************************\n";
        ss << std::setw(w1) << "Processor" << std::setw(w1) << "Owned" << std::setw(w2) << "Ghosted\n";
        ss << "---------------------------------------------------------------\n";
        for (int i = 0; i < num_procs; ++i)
            ss << std::setw(w1) << i << std::setw(w1) << owned_nodes_per_proc[i] << std::setw(w2) << ghosted_nodes_per_proc[i] << "\n";
        ss << "\n*** Vertex Counts *********************************************\n";
        ss << std::setw(w1) << "Processor" << std::setw(w1) << "Owned" << std::setw(w2) << "Ghosted\n";
        ss << "---------------------------------------------------------------\n";
        for (int i = 0; i < num_procs; ++i)
            ss << std::setw(w1) << i << std::setw(w1) << active_owned_nodes_per_proc[i] << std::setw(w2) << ghosted_active_nodes_per_proc[i] << "\n";
        ss << "***************************************************************\n";
        aperi::CoutP0() << ss.str();
    }
}

/**
 * @brief Print a summary table of element (cell) counts for the mesh.
 *
 * This function prints a formatted summary of element counts, including total,
 * average, min, max, and imbalance statistics across all processors.
 */
void PrintElementCounts(std::shared_ptr<MeshData> mesh_data) {
    auto* bulk = mesh_data->GetBulkData();
    auto& meta = bulk->mesh_meta_data();

    // Selectors for all and owned elements
    stk::mesh::Selector selector = StkGetSelector({}, &meta);
    stk::mesh::Selector owned_selector = selector & meta.locally_owned_part();

    // Count owned elements on this processor
    size_t num_cells = stk::mesh::count_entities(*bulk, stk::topology::ELEMENT_RANK, owned_selector);

    // Gather per-processor element counts
    int num_ranks = bulk->parallel_size();
    int my_rank = bulk->parallel_rank();
    std::vector<size_t> num_cells_per_rank(num_ranks, 0);
    num_cells_per_rank[my_rank] = num_cells;
    MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_cells_per_rank.data(), 1, MPI_UNSIGNED_LONG, bulk->parallel());

    // Compute statistics
    size_t total_num_cells = std::accumulate(num_cells_per_rank.begin(), num_cells_per_rank.end(), 0);
    double avg_num_cells = static_cast<double>(total_num_cells) / num_ranks;
    size_t min_num_cells = *std::min_element(num_cells_per_rank.begin(), num_cells_per_rank.end());
    size_t max_num_cells = *std::max_element(num_cells_per_rank.begin(), num_cells_per_rank.end());
    double percent_unbalance = (static_cast<double>(max_num_cells) - avg_num_cells) / avg_num_cells * 100.0;

    // Print summary table
    std::stringstream ss;
    int w1 = 9, w2 = 12;
    ss << "\n*** Cell Counts ***********************************************\n";
    ss << std::setw(w1) << "Total" << std::setw(w1) << "Processor" << std::setw(w2) << "Processor" << std::setw(w2) << "Processor"
       << "\n";
    ss << std::setw(w1) << "" << std::setw(w1) << "Average" << std::setw(w2) << "Min" << std::setw(w2) << "Max" << std::setw(w2) << "Unbalance"
       << "\n";
    ss << "---------------------------------------------------------------\n";
    ss << std::setw(w1) << total_num_cells << std::setw(w1) << avg_num_cells << std::setw(w2) << min_num_cells << std::setw(w2) << max_num_cells << std::setw(w2) << percent_unbalance << "%\n";
    ss << "***************************************************************\n";
    aperi::CoutP0() << ss.str();
}

}  // namespace aperi