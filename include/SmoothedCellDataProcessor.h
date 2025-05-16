#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <Kokkos_UnorderedMap.hpp>
#include <array>
#include <chrono>
#include <cmath>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "Constants.h"
#include "FieldData.h"
#include "Index.h"
#include "LogUtils.h"
#include "MaxEdgeLengthProcessor.h"
#include "MeshData.h"
#include "MeshLabeler.h"
#include "MeshLabelerParameters.h"
#include "SmoothedCellData.h"
#include "Timer.h"

namespace aperi {

enum class StrainSmoothingTimerType {
    Instantiate,
    ComputeDerivatives,
    BuildSmoothedCellData,
    NONE
};

inline const std::map<StrainSmoothingTimerType, std::string> strain_smoothing_timer_map = {
    {StrainSmoothingTimerType::Instantiate, "Instantiate"},
    {StrainSmoothingTimerType::ComputeDerivatives, "ComputeDerivatives"},
    {StrainSmoothingTimerType::BuildSmoothedCellData, "BuildSmoothedCellData"},
    {StrainSmoothingTimerType::NONE, "NONE"}};

enum class SmoothedCellDataTimerType {
    LabelParts,
    Instantiate,
    SyncFields,
    AddCellNumElements,
    SetCellLocalOffsets,
    SetNodeIndiciesAndMap,
    SetFunctionDerivatives,
    NONE
};

inline const std::map<SmoothedCellDataTimerType, std::string> smoothed_cell_data_timer_map = {
    {SmoothedCellDataTimerType::LabelParts, "LabelParts"},
    {SmoothedCellDataTimerType::Instantiate, "Instantiate"},
    {SmoothedCellDataTimerType::SyncFields, "SyncFields"},
    {SmoothedCellDataTimerType::AddCellNumElements, "AddCellNumElements"},
    {SmoothedCellDataTimerType::SetCellLocalOffsets, "SetCellLocalOffsets"},
    {SmoothedCellDataTimerType::SetNodeIndiciesAndMap, "SetNodeIndiciesAndMap"},
    {SmoothedCellDataTimerType::SetFunctionDerivatives, "SetFunctionDerivatives"},
    {SmoothedCellDataTimerType::NONE, "NONE"}};

class SmoothedCellDataProcessor {
   public:
    SmoothedCellDataProcessor(
        std::shared_ptr<aperi::MeshData> mesh_data,
        const std::vector<std::string> &sets,
        const aperi::LagrangianFormulationType &lagrangian_formulation_type,
        const aperi::MeshLabelerParameters &mesh_labeler_parameters,
        bool use_f_bar = false) : m_mesh_data(mesh_data),
                                  m_sets(sets),
                                  m_lagrangian_formulation_type(lagrangian_formulation_type),
                                  m_mesh_labeler_parameters(mesh_labeler_parameters),
                                  m_use_f_bar(use_f_bar),
                                  m_timer_manager("Strain Smoothing Processor", strain_smoothing_timer_map) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(StrainSmoothingTimerType::Instantiate, "Strain Smoothing Processor Instantiation");
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: SmoothedCellDataProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & meta_data->locally_owned_part();

        // Create the smoothed cell timer manager
        m_smoothed_cell_timer_manager = std::make_shared<aperi::TimerManager<SmoothedCellDataTimerType>>("Smoothed Cell Data", smoothed_cell_data_timer_map);

        // Add the smoothed cell timer manager to the timer manager
        m_timer_manager.AddChild(m_smoothed_cell_timer_manager);
    }

    void InitializeFields() {
        // Get the coordinates field
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            m_coordinates = aperi::Field(m_mesh_data, FieldQueryData<double>{"current_coordinates_np1", FieldQueryState::None, FieldDataTopologyRank::NODE});
        } else {
            m_coordinates = aperi::Field(m_mesh_data, FieldQueryData<double>{m_mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE});
        }

        // Get the element volume field
        m_element_volume = aperi::Field(m_mesh_data, FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});

        // Get the smoothed cell id field
        m_cell_id = aperi::Field(m_mesh_data, FieldQueryData<uint64_t>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});

        // Get the subcell id field
        m_subcell_id = aperi::Field(m_mesh_data, FieldQueryData<uint64_t>{"subcell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});

        // Get the neighbors and num_neighbors fields
        m_neighbors = aperi::Field(m_mesh_data, FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE});
        m_num_neighbors = aperi::Field(m_mesh_data, FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE});

        // Get the function values field
        m_function_values = aperi::Field(m_mesh_data, FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE});
    }

    bool CheckPartitionOfNullity(const std::shared_ptr<aperi::SmoothedCellData> &smoothed_cell_data, double warning_tolerance = 1.0e-6, double error_tolerance = 1.0e-2) {
        // Get the number of subcells
        size_t num_subcells = smoothed_cell_data->NumSubcells();

        // Get the number of nodes
        auto node_lengths = smoothed_cell_data->GetNodeCSRIndices().GetLengthView();

        // Loop over all the subcells, set the derivative values for the nodes
        Kokkos::parallel_for(
            "for_each_subcell_set_function_derivatives", num_subcells, KOKKOS_LAMBDA(const size_t subcell_id) {
                // Get the function derivatives
                auto subcell_function_derivatives = smoothed_cell_data->GetSubcellFunctionDerivatives(subcell_id);
                Kokkos::Array<double, 3> subcell_function_derivatives_sum{0.0, 0.0, 0.0};
                for (size_t j = 0, je = node_lengths[subcell_id] * 3; j < je; ++j) {
                    subcell_function_derivatives_sum[j % 3] += subcell_function_derivatives[j];
                }
                for (size_t j = 0; j < 3; ++j) {
                    // Compare the sum of the function derivatives to the tolerance on device
                    if (Kokkos::abs(subcell_function_derivatives_sum[j]) > warning_tolerance) {
                        // Print the subcell id and the sum of the function derivatives
                        printf("Subcell %lu: Sum of function derivatives: %.8e\n", subcell_id, subcell_function_derivatives_sum[j]);
                        if (Kokkos::abs(subcell_function_derivatives_sum[j]) > error_tolerance) {
                            Kokkos::abort("Partition of nullity check failed");
                        }
                    }
                }
            });
        return true;
    }

    bool CheckCellVolumes(const std::shared_ptr<aperi::SmoothedCellData> &smoothed_cell_data) {
        // Get the cell volumes
        auto cell_volumes = smoothed_cell_data->GetCellVolumes();

        // Get the subcell volumes
        auto subcell_volumes = smoothed_cell_data->GetSubcellVolumes();

        // Loop over all the cells and make sure the cell volume is the sum of the subcell volumes
        Kokkos::parallel_for(
            "check_cell_volumes", smoothed_cell_data->NumCells(), KOKKOS_CLASS_LAMBDA(const size_t cell_id) {
                // Get the cell volume
                double cell_volume = cell_volumes(cell_id);

                // Get the cells subcells
                auto cell_subcells = smoothed_cell_data->GetCellSubcells(cell_id);

                // Get the subcell volumes
                double subcell_volume_sum = 0.0;
                for (size_t i = 0; i < cell_subcells.size(); ++i) {
                    subcell_volume_sum += subcell_volumes(cell_subcells[i]);
                }

                // Check the cell volume
                if (Kokkos::abs(cell_volume - subcell_volume_sum) > 1.0e-10) {
                    printf("Cell %lu: Cell volume %f does not match subcell volume sum %f\n", cell_id, cell_volume, subcell_volume_sum);
                    Kokkos::abort("Cell volume check failed");
                }

                // Verbose output
                if (m_verbose) {
                    printf("Cell %lu: Cell volume %f matches subcell volume sum %f\n", cell_id, cell_volume, subcell_volume_sum);
                }
            });

        return true;
    }

    void LabelParts() {
        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::LabelParts);

        // Create a mesh labeler
        std::shared_ptr<aperi::MeshLabeler> mesh_labeler = CreateMeshLabeler(m_mesh_data);

        // Label the part
        mesh_labeler->LabelPart(m_mesh_labeler_parameters);

        // Calculate the maximum edge length
        aperi::MaxEdgeLengthProcessor max_edge_length_processor(m_mesh_data);
        max_edge_length_processor.ComputeMaxEdgeLength();
    }

    /**
     * @brief Get the sizes of the smoothed cell data.
     * @return The sizes of the smoothed cell data.
     */
    SmoothedCellDataSizes GetSmoothedCellDataSizes(size_t estimated_num_nodes_per_cell) {
        // Create the cells selector
        std::vector<std::string> cells_sets;
        // If sets are named the same with _cells at the end, use those.
        for (const auto &set : m_sets) {
            cells_sets.push_back(set + "_cells");
        }
        // If sets are not named, get the universal cells part.
        if (cells_sets.size() == 0) {
            cells_sets.push_back("universal_cells_part");
        }
        auto cell_selector = StkGetSelector(cells_sets, &m_bulk_data->mesh_meta_data());

        // Get the number of cells
        size_t num_cells = GetNumElements(cell_selector);

        // Get the number of elements
        size_t num_elements = GetNumElements();

        // Estimate the total number of nodes in the cells
        size_t estimated_num_nodes = num_cells * estimated_num_nodes_per_cell;

        // Get the number of subcells
        size_t num_subcells_per_cell = m_mesh_labeler_parameters.num_subcells;
        size_t num_subcells = num_subcells_per_cell < 1 ? num_elements : num_subcells_per_cell * num_cells;

        return {num_cells, num_subcells, num_elements, estimated_num_nodes};
    }

    std::shared_ptr<aperi::SmoothedCellData> InstantiateSmoothedCellData(size_t estimated_num_nodes_per_cell, bool one_pass_method, std::shared_ptr<aperi::TimerManager<SmoothedCellDataTimerType>> timer_manager) {
        // Create a scoped timer
        auto timer = timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::Instantiate);

        // Get the sizes of the smoothed cell data
        SmoothedCellDataSizes sizes = GetSmoothedCellDataSizes(estimated_num_nodes_per_cell);

        bool use_f_bar = m_use_f_bar && sizes.num_subcells != sizes.num_cells;

        if (m_verbose) {
            aperi::Cout() << "Number of cells: " << sizes.num_cells << std::endl;
            aperi::Cout() << "Number of subcells: " << sizes.num_subcells << std::endl;
            aperi::Cout() << "Number of elements: " << sizes.num_elements << std::endl;
            aperi::Cout() << "Estimated number of node-cell pairs: " << sizes.estimated_num_nodes << std::endl;
            aperi::Cout() << "Use f_bar: " << (use_f_bar ? "true" : "false") << std::endl;
        }

        return std::make_shared<aperi::SmoothedCellData>(sizes.num_cells, sizes.num_subcells, sizes.num_elements, sizes.estimated_num_nodes, use_f_bar);
    }

    void AddSubcellNumElements() {
        // Update the fields
        m_subcell_id.UpdateField();

        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::AddCellNumElements);

        // Get the functor to add the number of elements to the smoothed cell data
        auto add_subcell_num_elements_functor = m_smoothed_cell_data->GetAddSubcellNumElementsFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_CLASS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the subcell_id
                uint64_t subcell_id = m_subcell_id(elem_index, 0);

                // Add the number of elements to the smoothed cell data
                add_subcell_num_elements_functor(subcell_id, 1);
            });
        // Number of subcell elements ('length') is now set.
        // This populates the 'start' array from the 'length' array and collects other sizes.
        // Also copies the 'length' and 'start' arrays to host.
        m_smoothed_cell_data->CompleteAddingSubcellElementCSRIndicesOnDevice();

        if (m_verbose) {
            aperi::Cout() << "Number of subcell elements added: " << m_smoothed_cell_data->TotalNumElements() << std::endl;
        }
    }

    void SetSubcellElementIndices() {
        // #### Set the subcell element indices for the smoothed cell data ####

        const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;
        m_subcell_id.UpdateField();

        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetCellLocalOffsets);

        // Get the functor to add the element to the smoothed cell data
        auto add_subcell_element_functor = m_smoothed_cell_data->GetAddSubcellElementFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_CLASS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the subcell_id
                uint64_t subcell_id = m_subcell_id(elem_index, 0);

                stk::mesh::Entity element = ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, elem_index);

                // Get the fast mesh index for the element
                stk::mesh::FastMeshIndex element_fast_mesh_index = ngp_mesh.fast_mesh_index(element);

                // Create an aperi::Index for the element
                aperi::Index element_index = aperi::Index(element_fast_mesh_index);

                // Add the number of elements to the smoothed cell data
                add_subcell_element_functor(subcell_id, element_index);
            });
        // Cell element indices are now set. Copy to host.
        m_smoothed_cell_data->CopySubcellElementViewsToHost();
    }

    void SetCellNumSubcells() {
        // Update the fields
        m_cell_id.UpdateField();

        auto add_cell_num_subcells_functor = m_smoothed_cell_data->GetAddCellNumSubcellsFunctor();

        // Get the number of subcells
        size_t num_subcells = m_smoothed_cell_data->NumSubcells();

        // Get the element indices
        auto element_indices = m_smoothed_cell_data->GetElementIndices();

        // Get the start view
        auto start = m_smoothed_cell_data->GetElementCSRIndices().GetStartView();

        // Loop over all the subcells
        Kokkos::parallel_for(
            "set_cell_num_subcells", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                // Get the first element in the subcell
                auto element_index = element_indices(start(subcell_id));

                // Get the cell id for the element
                uint64_t cell_id = m_cell_id(element_index(), 0);

                // Add the number of subcells to the cell
                add_cell_num_subcells_functor(cell_id, 1);
            });
        // Number of cell subcells ('length') is now set.
        // This populates the 'start' array from the 'length' array and collects other sizes.
        // Also copies the 'length' and 'start' arrays to host.
        m_smoothed_cell_data->CompleteAddingCellNumSubcellsOnDevice();

        if (m_verbose) {
            aperi::Cout() << "Number of cell subcells added: " << m_smoothed_cell_data->NumSubcells() << std::endl;
        }
    }

    void SetCellSubcells() {
        // Update the fields
        m_cell_id.UpdateField();

        // Get the functor to add the subcells to the cell
        auto add_cell_subcells_functor = m_smoothed_cell_data->GetAddCellSubcellsFunctor();

        // Get the number of subcells
        size_t num_subcells = m_smoothed_cell_data->NumSubcells();

        // Get the element indices
        auto element_indices = m_smoothed_cell_data->GetElementIndices();

        // Get the start view
        auto start = m_smoothed_cell_data->GetElementCSRIndices().GetStartView();

        // Loop over all the subcells
        Kokkos::parallel_for(
            "set_cell_subcells", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                // Get the first element in the subcell
                auto element_index = element_indices(start(subcell_id));

                // Get the cell id for the element
                uint64_t cell_id = m_cell_id(element_index(), 0);

                // Add the subcell to the cell
                add_cell_subcells_functor(cell_id, subcell_id);
            });
        // Cell subcell indices are now set. Copy to host.
        m_smoothed_cell_data->CopyCellSubcellsToHost();
    }

    KOKKOS_INLINE_FUNCTION
    aperi::Index EntityToIndex(const stk::mesh::Entity &entity) const {
        return aperi::Index(m_ngp_mesh.fast_mesh_index(entity));
    }

    KOKKOS_INLINE_FUNCTION
    aperi::Index LocalOffsetToIndex(uint64_t local_offset) const {
        stk::mesh::Entity entity(local_offset);
        return EntityToIndex(entity);
    }

    // Resize the node views and map.
    void ResizeNodeViewsAndMap(std::shared_ptr<aperi::SmoothedCellData> smoothed_cell_data, size_t current_size, size_t required_size) {
        if (current_size >= required_size) {
            return;
        }
        int proc_id;
        MPI_Comm_rank(MPI_COMM_WORLD, &proc_id);
        printf("Resizing node views on processor %d from %lu to %lu\n", proc_id, current_size, required_size);

        // Resize the views
        smoothed_cell_data->ResizeNodeViews(required_size);

        // Rehash the map
        smoothed_cell_data->RehashNodeToViewIndexMap(required_size * 1.2);  // Add 20% buffer to help avoid collisions
    }

    template <size_t NumElementNodes>
    void SetSubcellNodeIndices(bool one_pass_method) {
        m_num_neighbors.UpdateField();
        m_neighbors.UpdateField();

        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetNodeIndiciesAndMap);

        // Get views of the node index lengths starts
        auto node_lengths = m_smoothed_cell_data->GetNodeCSRIndices().GetLengthView();

        // Get views of the node indices
        auto node_indicies = m_smoothed_cell_data->GetNodeIndices();

        // Get the global node index to local index map
        auto &node_to_view_index_map = m_smoothed_cell_data->GetNodeToViewIndexMap();

        // Get the number of subcells
        size_t num_subcells = m_smoothed_cell_data->NumSubcells();

        auto &ngp_mesh = m_ngp_mesh;

        size_t num_failed;
        size_t num_tries = 0;
        size_t max_tries = 3;

        auto element_indices = m_smoothed_cell_data->GetElementIndices();
        auto start = m_smoothed_cell_data->GetElementCSRIndices().GetStartView();
        auto length = m_smoothed_cell_data->GetElementCSRIndices().GetLengthView();

        // Loop over all the subcells, set indexes for the nodes
        do {
            // Reset the number of failed insertions
            num_failed = 0;
            Kokkos::parallel_reduce(
                "set_indices_and_map", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id, size_t &local_fail) {
                    // Initialize the local index counter
                    uint64_t local_index_counter = 0;

                    // Loop over all elements in the subcell to create the short list of nodes or node neighbors
                    for (size_t j = 0, je = length(subcell_id); j < je; ++j) {
                        auto element_index = element_indices(start(subcell_id) + j);

                        // Get the nodes for the element
                        stk::mesh::NgpMesh::ConnectedNodes element_node_entities = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, element_index());
                        size_t num_nodes = element_node_entities.size();
                        Kokkos::Array<aperi::Index, NumElementNodes> element_nodes;
                        for (size_t i = 0; i < num_nodes; ++i) {
                            element_nodes[i] = aperi::Index(ngp_mesh.fast_mesh_index(element_node_entities[i]));
                        }

                        // Loop over all the nodes in the element
                        for (size_t k = 0, ke = num_nodes; k < ke; ++k) {
                            if (one_pass_method) {
                                // Get the node neighbors
                                uint64_t num_neighbors = m_num_neighbors(element_nodes[k], 0);
                                for (size_t l = 0; l < num_neighbors; ++l) {
                                    uint64_t neighbor = m_neighbors(element_nodes[k], l);
                                    aperi::Index neighbor_node_index = LocalOffsetToIndex(neighbor);
                                    auto results = node_to_view_index_map.insert({subcell_id, neighbor_node_index.bucket_id(), neighbor_node_index.bucket_ord()}, local_index_counter);
                                    if (results.success()) {
                                        local_index_counter++;
                                    } else if (results.failed()) {
                                        local_fail++;
                                        if (num_tries > 0) {
                                            // Should have sized things properly after the first pass, so this should not happen.
                                            printf("Warning: Failed to insert neighbor (%u, %u) into the map on subcell %lu\n", neighbor_node_index.bucket_id(), neighbor_node_index.bucket_ord(), subcell_id);
                                        }
                                    }
                                }
                            } else {
                                auto results = node_to_view_index_map.insert({subcell_id, element_nodes[k].bucket_id(), element_nodes[k].bucket_ord()}, local_index_counter);
                                if (results.success()) {
                                    local_index_counter++;
                                } else if (results.failed()) {
                                    local_fail++;
                                    if (num_tries > 0) {
                                        // Should have sized things properly after the first pass, so this should not happen.
                                        printf("Warning: Failed to insert node (%u, %u) into the map on subcell %lu\n", element_nodes[k].bucket_id(), element_nodes[k].bucket_ord(), subcell_id);
                                    }
                                }
                            }
                        }
                    }

                    // Set the length to the size of the map. This is the number of nodes or node neighbors in the cell
                    node_lengths(subcell_id) = local_index_counter;
                },
                num_failed);

            // This is on the host
            if (num_failed > 0) {
                // Resize the node views and map
                ResizeNodeViewsAndMap(m_smoothed_cell_data, node_to_view_index_map.capacity(), node_to_view_index_map.capacity() + num_failed);

                // Get the views after resizing
                node_indicies = m_smoothed_cell_data->GetNodeIndices();
                node_to_view_index_map = m_smoothed_cell_data->GetNodeToViewIndexMap();

                num_tries++;
                if (num_tries > max_tries) {
                    aperi::CoutP0() << "Error: Too many tries to set node indicies and map." << std::endl;
                    Kokkos::abort("Error: Too many tries to set node indicies and map.");
                }
            }
        } while (num_failed > 0);

        bool set_start_from_lengths = true;
        m_smoothed_cell_data->CompleteAddingSubcellNodeCSRIndicesOnDevice(set_start_from_lengths);

        if (m_verbose) {
            aperi::Cout() << "Number of subcell-neighbor pairs added: " << m_smoothed_cell_data->TotalNumNodes() << std::endl;
        }

        // Get the views after potential resizing
        node_indicies = m_smoothed_cell_data->GetNodeIndices();
        auto node_starts = m_smoothed_cell_data->GetNodeCSRIndices().GetStartView();

        // Get the capacity of the node to view index map
        size_t map_size = node_to_view_index_map.capacity();

        // Set the node indicies
        Kokkos::parallel_for(
            "set_node_indicies_from_map", map_size, KOKKOS_LAMBDA(const size_t i) {
                if (node_to_view_index_map.valid_at(i)) {
                    auto key = node_to_view_index_map.key_at(i);
                    auto value = node_to_view_index_map.value_at(i);
                    auto node_start_index = node_starts(key.cell_id);
                    uint64_t new_value = node_start_index + value;
                    node_indicies(new_value) = aperi::Index(key.bucket_id, key.bucket_ord);
                    node_to_view_index_map.value_at(i) = new_value;
                }
            });
    }

    template <size_t NumElementNodes, typename IntegrationFunctor>
    void ComputeFunctionDerivatives(const IntegrationFunctor &integration_functor, bool one_pass_method) {
        // Update the fields
        m_coordinates.UpdateField();
        m_element_volume.UpdateField();
        m_neighbors.UpdateField();
        m_num_neighbors.UpdateField();
        m_function_values.UpdateField();
        m_cell_id.UpdateField();

        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetFunctionDerivatives);

        // #### Set the smoothed cell node ids from the smoothed cell elements ####
        // Get device views of the node index lengths and starts
        auto node_lengths = m_smoothed_cell_data->GetNodeCSRIndices().GetLengthView();
        auto node_starts = m_smoothed_cell_data->GetNodeCSRIndices().GetStartView();

        // Get device view of the node derivatives
        auto node_function_derivatives = m_smoothed_cell_data->GetFunctionDerivatives();

        // Zero the node derivatives
        Kokkos::deep_copy(node_function_derivatives, 0.0);

        // Get the global node index to local index map
        auto &node_to_view_index_map = m_smoothed_cell_data->GetNodeToViewIndexMap();

        // Get the cell volume view and zero it
        auto cell_volumes = m_smoothed_cell_data->GetCellVolumes();
        Kokkos::deep_copy(cell_volumes, 0.0);

        // Get the subcell volume view and zero it
        auto subcell_volumes = m_smoothed_cell_data->GetSubcellVolumes();
        Kokkos::deep_copy(subcell_volumes, 0.0);

        // Get the number of subcells
        size_t num_subcells = m_smoothed_cell_data->NumSubcells();

        auto &ngp_mesh = m_ngp_mesh;

        // Get the start and length views
        auto start = m_smoothed_cell_data->GetElementCSRIndices().GetStartView();
        auto length = m_smoothed_cell_data->GetElementCSRIndices().GetLengthView();

        // Get the element indices
        auto element_indices = m_smoothed_cell_data->GetElementIndices();

        // Loop over all the cells, set the derivative values for the nodes
        Kokkos::parallel_for(
            "for_each_subcell_set_function_derivatives", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                // Loop over all the subcell elements and add the function derivatives to the nodes
                for (size_t j = 0, je = length(subcell_id); j < je; ++j) {
                    // Get the element index
                    auto element_index = element_indices(start(subcell_id) + j);

                    // Get the nodes for the element
                    stk::mesh::NgpMesh::ConnectedNodes element_node_entities = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, element_index());
                    size_t num_nodes = element_node_entities.size();
                    Kokkos::Array<aperi::Index, NumElementNodes> element_nodes;
                    for (size_t i = 0; i < num_nodes; ++i) {
                        element_nodes[i] = aperi::Index(ngp_mesh.fast_mesh_index(element_node_entities[i]));
                    }

                    // Set up the field data to gather
                    Eigen::Matrix<double, NumElementNodes, 3> subcell_node_coordinates = Eigen::Matrix<double, NumElementNodes, 3>::Zero();

                    // Gather the field data for each node
                    for (size_t l = 0; l < num_nodes; ++l) {
                        subcell_node_coordinates.row(l).noalias() = m_coordinates.GetEigenMatrix<1, 3>(element_nodes[l]);
                    }
                    Kokkos::pair<Eigen::Matrix<double, NumElementNodes, 3>, double> derivatives_and_weight = integration_functor.ComputeBMatrixAndWeight(subcell_node_coordinates);
                    const Eigen::Matrix<double, NumElementNodes, 3> &element_function_derivatives = derivatives_and_weight.first;
                    double &element_volume = derivatives_and_weight.second;

                    // Set the element volume
                    m_element_volume(element_index, 0) = element_volume;
                    subcell_volumes(subcell_id) += element_volume;                                   // No need to atomic because we are looping over subcells
                    Kokkos::atomic_add(&cell_volumes(m_cell_id(element_index, 0)), element_volume);  // Atomic because we are looping over subcells

                    // Loop over all the nodes in the element
                    for (size_t k = 0, ke = num_nodes; k < ke; ++k) {
                        // One pass method: store the function derivatives for the neighbors of the nodes in the cell
                        if (one_pass_method) {
                            // Get the number of neighbors
                            uint64_t num_neighbors = m_num_neighbors(element_nodes[k], 0);
                            KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);

                            // Loop over the nodes neighbors
                            for (size_t l = 0; l < num_neighbors; ++l) {
                                // Get the neighbor
                                uint64_t neighbor = m_neighbors(element_nodes[k], l);

                                // Get the function value
                                double function_value = m_function_values(element_nodes[k], l);

                                // Get the subcell index of the neighbor
                                aperi::Index neighbor_index = LocalOffsetToIndex(neighbor);
                                KOKKOS_ASSERT(node_to_view_index_map.exists({subcell_id, neighbor_index.bucket_id(), neighbor_index.bucket_ord()}));
                                auto neighbor_component_index = node_to_view_index_map.value_at(node_to_view_index_map.find({subcell_id, neighbor_index.bucket_id(), neighbor_index.bucket_ord()})) * 3;

                                // Atomic add to the derivatives
                                for (size_t m = 0; m < 3; ++m) {
                                    // Will have to divide by the subcell volume when we have the full value
                                    Kokkos::atomic_add(&node_function_derivatives(neighbor_component_index + m), element_function_derivatives(k, m) * element_volume * function_value);
                                }
                            }
                        } else {
                            // Two pass method: store the function derivatives for the nodes in the subcell

                            // Get the node index
                            KOKKOS_ASSERT(node_to_view_index_map.exists({subcell_id, element_nodes[k].bucket_id(), element_nodes[k].bucket_ord()}));
                            size_t node_component_index = node_to_view_index_map.value_at(node_to_view_index_map.find({subcell_id, element_nodes[k].bucket_id(), element_nodes[k].bucket_ord()})) * 3;
                            // Atomic add to the derivatives
                            for (size_t l = 0; l < 3; ++l) {
                                // Will have to divide by the subcell volume when we have the full value
                                Kokkos::atomic_add(&node_function_derivatives(node_component_index + l), element_function_derivatives(k, l) * element_volume);
                            }
                        }
                    }
                }

                // Subcell volume
                double subcell_volume = subcell_volumes(subcell_id);

                size_t start_node_index = node_starts(subcell_id);

                // Divide the function derivatives by the subcell volume
                for (size_t j = 0, je = node_lengths(subcell_id); j < je; ++j) {
                    size_t j3 = (start_node_index + j) * 3;
                    for (size_t k = 0; k < 3; ++k) {
                        node_function_derivatives(j3 + k) /= subcell_volume;
                    }
                }
            });
        m_element_volume.MarkModifiedOnDevice();
        assert(CheckPartitionOfNullity(m_smoothed_cell_data));
        assert(CheckCellVolumes(m_smoothed_cell_data));
    }

    void PopulateElementOutputs() {
        // Fill in the other elements in the cell with the parent elements values
        // Fields: pk1_stress, displacement_gradient, state

        // Const expressions for the number of tensor components and the number of state components
        constexpr size_t num_tensor_components = 9;

        // Get the element indices, start, and length views
        auto element_indices = m_smoothed_cell_data->GetElementIndices();
        auto start = m_smoothed_cell_data->GetElementCSRIndices().GetStartView();
        auto length = m_smoothed_cell_data->GetElementCSRIndices().GetLengthView();

        // Get the fields
        aperi::Field<double> pk1(m_mesh_data, FieldQueryData<double>{"pk1_stress", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        aperi::Field<double> displacement_gradient(m_mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});

        // Check for state field
        aperi::FieldQueryData<double> state_query({"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        bool state_field_exist_on_part = false;
        aperi::Field<double> state;
        assert(m_sets.size() == 1);
        if (FieldExistsOn(state_query, m_sets[0], m_mesh_data)) {
            state_field_exist_on_part = true;
            // Get the state field
            state = aperi::Field<double>(m_mesh_data, state_query);
        }
        const size_t stride = state_field_exist_on_part ? state.GetStride() : 0;

        // Get the number of subcells
        size_t num_subcells = m_smoothed_cell_data->NumSubcells();

        // Loop over all the subcells, set the derivative values for the nodes
        Kokkos::parallel_for(
            "for_each_subcell_populate_subcell_outputs", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                // Get the first element
                const aperi::Index first_element = element_indices(start(subcell_id));

                // Get the pk1_stress and displacement_gradient of the first element as Eigen maps
                const auto first_element_pk1_stress = pk1.GetConstEigenVectorMap<num_tensor_components>(first_element);
                const auto first_element_displacement_gradient = displacement_gradient.GetConstEigenVectorMap<num_tensor_components>(first_element);

                // Get the state field map if it exists
                Eigen::InnerStride<Eigen::Dynamic> state_stride(stride);
                size_t num_state_components = state_field_exist_on_part ? state.GetNumComponentsPerEntity(first_element) : 0;
                const auto first_element_state = state_field_exist_on_part ? state.GetConstEigenVectorMap(first_element, num_state_components) : Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);

                // Loop over all the subcell elements and add the function derivatives to the nodes
                for (size_t j = 1, je = length(subcell_id); j < je; ++j) {
                    // Get the element index
                    const aperi::Index element_index = element_indices(start(subcell_id) + j);

                    // Set the pk1_stress and displacement_gradient
                    for (size_t k = 0; k < num_tensor_components; ++k) {
                        pk1(element_index, k) = first_element_pk1_stress(k);
                        displacement_gradient(element_index, k) = first_element_displacement_gradient(k);
                    }

                    // Set the state field if it exists
                    if (state_field_exist_on_part) {
                        for (size_t k = 0; k < num_state_components; ++k) {
                            state(element_index, k) = first_element_state(k);
                        }
                    }
                }
            });
        pk1.MarkModifiedOnDevice();
        displacement_gradient.MarkModifiedOnDevice();
        if (state_field_exist_on_part) {
            state.MarkModifiedOnDevice();
        }
    }

    void PrintDiagnosticOutput() {
        // Collect the cell counts on each rank
        size_t num_cells = m_smoothed_cell_data->NumCells();
        size_t num_subcells = m_smoothed_cell_data->NumSubcells();
        size_t num_ranks = m_bulk_data->parallel_size();
        std::vector<size_t> num_cells_per_rank(num_ranks);
        std::vector<size_t> num_subcells_per_rank(num_ranks);
        num_cells_per_rank[m_bulk_data->parallel_rank()] = num_cells;
        num_subcells_per_rank[m_bulk_data->parallel_rank()] = num_subcells;
        MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_cells_per_rank.data(), 1, MPI_UNSIGNED_LONG, m_bulk_data->parallel());
        MPI_Allgather(MPI_IN_PLACE, 0, MPI_DATATYPE_NULL, num_subcells_per_rank.data(), 1, MPI_UNSIGNED_LONG, m_bulk_data->parallel());

        // Get the total number of cells and subcells
        size_t total_num_cells = std::accumulate(num_cells_per_rank.begin(), num_cells_per_rank.end(), 0);
        size_t total_num_subcells = std::accumulate(num_subcells_per_rank.begin(), num_subcells_per_rank.end(), 0);

        // Get the average number of cells and subcells
        double avg_num_cells = static_cast<double>(total_num_cells) / static_cast<double>(num_ranks);
        double avg_num_subcells = static_cast<double>(total_num_subcells) / static_cast<double>(num_ranks);

        // Get the min and max number of cells and subcells
        size_t min_num_cells = *std::min_element(num_cells_per_rank.begin(), num_cells_per_rank.end());
        size_t max_num_cells = *std::max_element(num_cells_per_rank.begin(), num_cells_per_rank.end());
        size_t min_num_subcells = *std::min_element(num_subcells_per_rank.begin(), num_subcells_per_rank.end());
        size_t max_num_subcells = *std::max_element(num_subcells_per_rank.begin(), num_subcells_per_rank.end());

        // Get the number of resizes that occurred. Should be at least one due to the final resize.
        size_t num_resizes = m_smoothed_cell_data->NumberOfResizes();

        // Calculate the percent unbalance = (max - avg) / avg
        double percent_unbalance = (static_cast<double>(max_num_cells) - avg_num_cells) / avg_num_cells * 100.0;
        double percent_unbalance_subcells = (static_cast<double>(max_num_subcells) - avg_num_subcells) / avg_num_subcells * 100.0;

        // Print the cell counts
        std::stringstream ss;
        int width = 12;
        ss << "*** Cell Counts ************************************\n";
        ss << std::setw(width) << "Total" << std::setw(width) << "Processor" << std::setw(width) << "Processor" << std::setw(width) << "Processor"
           << "\n";
        ss << std::setw(width) << "" << std::setw(width) << "Average" << std::setw(width) << "Min" << std::setw(width) << "Max" << std::setw(width) << "Unbalance%"
           << "\n";
        ss << "----------------------------------------------------\n";
        ss << std::setw(width) << total_num_cells << std::setw(width) << avg_num_cells << std::setw(width) << min_num_cells << std::setw(width) << max_num_cells << std::setw(width) << percent_unbalance << "%\n";
        ss << "*** Subcell Counts ************************************\n";
        ss << std::setw(width) << "Total" << std::setw(width) << "Processor" << std::setw(width) << "Processor" << std::setw(width) << "Processor" << std::setw(width) << "Processor" << std::setw(width) << "Unbalance%"
           << "\n";
        ss << std::setw(width) << "" << std::setw(width) << "Average" << std::setw(width) << "Min" << std::setw(width) << "Max" << std::setw(width) << "Processor" << std::setw(width) << "Processor"
           << "\n";
        ss << "----------------------------------------------------\n";
        ss << std::setw(width) << total_num_subcells << std::setw(width) << avg_num_subcells << std::setw(width) << min_num_subcells << std::setw(width) << max_num_subcells << std::setw(width) << percent_unbalance_subcells << "%\n";
        ss << "***************************************************\n";
        ss << "Number of resizes: " << num_resizes << std::endl;
        aperi::CoutP0() << ss.str();
    }

    template <size_t NumElementNodes>
    std::shared_ptr<aperi::SmoothedCellData> BuildSmoothedCellData(size_t estimated_num_nodes_per_subcell, bool one_pass_method = true) {
        /* This needs a few things to be completed first:
           - The mesh labeler needs to be run to get the cell ids, subcell ids, and create the _cells parts.
        */
        std::string timer_name = "Build Smoothed Cell Data for Sets: ";
        for (const auto &set : m_sets) {
            timer_name += set + " ";
        }
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(StrainSmoothingTimerType::BuildSmoothedCellData, timer_name);

        // Update the ngp mesh
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Initialize the fields
        InitializeFields();

        // Create the smoothed cell data object
        m_smoothed_cell_data = InstantiateSmoothedCellData(estimated_num_nodes_per_subcell, one_pass_method, m_smoothed_cell_timer_manager);

        // Add the subcells number of elements to the smoothed cell data
        AddSubcellNumElements();

        // Set the subcell element indices
        SetSubcellElementIndices();

        // Set the number of subcells for each cell
        SetCellNumSubcells();

        // Set the cell subcells
        SetCellSubcells();

        // Set the node indicies and map
        SetSubcellNodeIndices<NumElementNodes>(one_pass_method);

        PrintDiagnosticOutput();

        return m_smoothed_cell_data;
    }

    double GetNumElements(const stk::mesh::Selector &selector) const {
        return stk::mesh::count_selected_entities(selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

    // Overloaded version that uses m_selector
    double GetNumElements() const {
        return GetNumElements(m_selector);
    }

    // Get the TimerManager
    std::shared_ptr<aperi::TimerManager<StrainSmoothingTimerType>> GetTimerManager() { return std::make_shared<aperi::TimerManager<StrainSmoothingTimerType>>(m_timer_manager); }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                    // The mesh data object.
    std::vector<std::string> m_sets;                                 // The sets to process.
    aperi::LagrangianFormulationType m_lagrangian_formulation_type;  // The lagrangian formulation type.
    aperi::MeshLabelerParameters m_mesh_labeler_parameters;          // The mesh labeler parameters.
    bool m_use_f_bar;                                                // Whether to use f_bar
    aperi::TimerManager<StrainSmoothingTimerType> m_timer_manager;   // The timer manager.
    bool m_verbose = false;                                          // Whether to print verbose output

    stk::mesh::BulkData *m_bulk_data;        // The bulk data object.
    stk::mesh::Selector m_selector;          // The selector
    stk::mesh::Selector m_owned_selector;    // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;           // The ngp mesh object.
    aperi::Field<double> m_coordinates;      // The coordinates field
    aperi::Field<double> m_element_volume;   // The element volume field
    aperi::Field<uint64_t> m_neighbors;      // The neighbors field
    aperi::Field<uint64_t> m_num_neighbors;  // The number of neighbors field
    aperi::Field<double> m_function_values;  // The function values field
    aperi::Field<uint64_t> m_cell_id;        // The smoothed cell id field
    aperi::Field<uint64_t> m_subcell_id;     // The subcell id field

    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;                                  // The smoothed cell data object
    std::shared_ptr<aperi::TimerManager<SmoothedCellDataTimerType>> m_smoothed_cell_timer_manager;  // The timer manager for the smoothed cell data
};

}  // namespace aperi
