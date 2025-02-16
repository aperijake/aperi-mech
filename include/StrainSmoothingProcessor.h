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
#include "MeshData.h"
#include "SmoothedCellData.h"

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
    Instantiate,
    SyncFields,
    AddCellNumElements,
    SetCellLocalOffsets,
    SetNodeIndiciesAndMap,
    SetFunctionDerivatives,
    NONE
};

inline const std::map<SmoothedCellDataTimerType, std::string> smoothed_cell_data_timer_map = {
    {SmoothedCellDataTimerType::Instantiate, "Instantiate"},
    {SmoothedCellDataTimerType::SyncFields, "SyncFields"},
    {SmoothedCellDataTimerType::AddCellNumElements, "AddCellNumElements"},
    {SmoothedCellDataTimerType::SetCellLocalOffsets, "SetCellLocalOffsets"},
    {SmoothedCellDataTimerType::SetNodeIndiciesAndMap, "SetNodeIndiciesAndMap"},
    {SmoothedCellDataTimerType::SetFunctionDerivatives, "SetFunctionDerivatives"},
    {SmoothedCellDataTimerType::NONE, "NONE"}};

class StrainSmoothingProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

    // Define the key type and value type
    using KeyType = aperi::Index;  // Use aperi::Index for the key
    using ValueType = uint64_t;    // Use uint64_t for the local index

   public:
    StrainSmoothingProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets, const aperi::LagrangianFormulationType &lagrangian_formulation_type = aperi::LagrangianFormulationType::Total) : m_mesh_data(mesh_data), m_sets(sets), m_lagrangian_formulation_type(lagrangian_formulation_type), m_timer_manager("Strain Smoothing Processor", strain_smoothing_timer_map) {
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
            aperi::CoutP0() << "Warning: StrainSmoothingProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & meta_data->locally_owned_part();

        // Get the coordinates field
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            m_coordinates_field = StkGetField(FieldQueryData<double>{"current_coordinates_np1", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        } else {
            m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        }
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the element volume field
        m_element_volume_field = StkGetField(FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_volume_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_volume_field);

        // Get the cell id field
        m_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_cell_id_field);

        // Get the smoothed cell id field
        m_smoothed_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"smoothed_cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_smoothed_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_smoothed_cell_id_field);
    }

    bool CheckPartitionOfNullity(const std::shared_ptr<aperi::SmoothedCellData> &smoothed_cell_data, double tolerance = 1.0e-10) {
        // Loop over all the cells
        bool passed = true;
        for (size_t i = 0, e = smoothed_cell_data->NumCells(); i < e; ++i) {
            // Get the function derivatives
            auto cell_function_derivatives = smoothed_cell_data->GetCellFunctionDerivativesHost(i);
            std::array<double, 3> cell_function_derivatives_sum{0.0, 0.0, 0.0};
            for (size_t j = 0, je = cell_function_derivatives.size(); j < je; ++j) {
                cell_function_derivatives_sum[j % 3] += cell_function_derivatives[j];
            }
            for (size_t j = 0; j < 3; ++j) {
                if (std::abs(cell_function_derivatives_sum[j]) > tolerance) {
                    aperi::CoutP0() << "Cell " << i << " has non-zero sum of function derivatives: " << cell_function_derivatives_sum[j] << std::endl;
                    passed = false;
                }
            }
        }
        return passed;
    }

    std::shared_ptr<aperi::SmoothedCellData> InstantiateSmoothedCellData(size_t estimated_num_nodes_per_cell, bool one_pass_method, std::shared_ptr<aperi::TimerManager<SmoothedCellDataTimerType>> timer_manager) {
        // Create a scoped timer
        auto timer = timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::Instantiate);

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

        return std::make_shared<aperi::SmoothedCellData>(num_cells, num_elements, estimated_num_nodes);
    }

    void AddCellNumElementsToSmoothedCellData() {
        const stk::mesh::NgpField<uint64_t> &ngp_smoothed_cell_id_field = *m_ngp_smoothed_cell_id_field;

        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::AddCellNumElements);

        // #### Set length and start for the elements in the smoothed cell data ####
        // Get the functor to add the number of elements to the smoothed cell data
        auto add_cell_num_elements_functor = m_smoothed_cell_data->GetAddCellNumElementsFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the smoothed_cell_id
                uint64_t smoothed_cell_id = ngp_smoothed_cell_id_field(elem_index, 0);

                // Add the number of elements to the smoothed cell data
                add_cell_num_elements_functor(smoothed_cell_id, 1);
            });
        // Number of cell elements ('length') is now set.
        // This populates the 'start' array from the 'length' array and collects other sizes.
        // Also copies the 'length' and 'start' arrays to host.
        m_smoothed_cell_data->CompleteAddingCellElementIndicesOnDevice();
    }

    void SetCellLocalOffsets() {
        // #### Set the cell element local offsets for the smoothed cell data ####

        const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;
        const stk::mesh::NgpField<uint64_t> &ngp_smoothed_cell_id_field = *m_ngp_smoothed_cell_id_field;

        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetCellLocalOffsets);

        // Get the functor to add the element to the smoothed cell data
        auto add_cell_element_functor = m_smoothed_cell_data->GetAddCellElementFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the smoothed_cell_id
                uint64_t smoothed_cell_id = ngp_smoothed_cell_id_field(elem_index, 0);

                stk::mesh::Entity element = ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, elem_index);
                uint64_t element_local_offset = element.local_offset();

                // Add the number of elements to the smoothed cell data
                add_cell_element_functor(smoothed_cell_id, element_local_offset);
            });
        // Cell element local offsets (STK offsets) are now set. Copy to host.
        m_smoothed_cell_data->CopyCellElementViewsToHost();
    }

    aperi::Index EntityToIndex(const stk::mesh::Entity &entity) {
        const stk::mesh::MeshIndex &meshIndex = m_bulk_data->mesh_index(entity);
        stk::mesh::FastMeshIndex fast_mesh_index = stk::mesh::FastMeshIndex{meshIndex.bucket->bucket_id(), static_cast<unsigned>(meshIndex.bucket_ordinal)};
        return aperi::Index{fast_mesh_index.bucket_id, fast_mesh_index.bucket_ord};
    }

    aperi::Index LocalOffsetToIndex(uint64_t local_offset) {
        stk::mesh::Entity entity(local_offset);
        return EntityToIndex(entity);
    }

    // Resize the node views and map. Check if the size is greater than the current size. If so, resize the node views and map.
    bool ResizeNodeViewsAndMap(std::shared_ptr<aperi::SmoothedCellData> smoothed_cell_data, size_t current_size, size_t next_size, size_t cell_index, size_t num_cells) {
        double ratio_complete = static_cast<double>(cell_index + 1) / static_cast<double>(num_cells);
        // Estimate the expected size based on the percent done.
        double expected_size = static_cast<double>(next_size) / ratio_complete;
        double size_ratio = static_cast<double>(current_size) / expected_size;

        // Calculate the percent done
        if (next_size > current_size || size_ratio < 0.8) {
            // Multiply by up to 1.2 to give some buffer. (ramp from multiplying by 1.2 to 1.0 as ratio_complete goes from 0 to 1)
            auto new_size = static_cast<size_t>(std::ceil(expected_size * (1.0 + 0.2 * (1.0 - ratio_complete))));

            int proc_id;
            MPI_Comm_rank(MPI_COMM_WORLD, &proc_id);
            printf("Resizing node views on processor %d from %lu to %lu. Percent done building smoothed cell data: %f\n", proc_id, current_size, new_size, ratio_complete * 100.0);

            // Double the size of the node local offsets
            smoothed_cell_data->ResizeNodeViewsOnHost(new_size);

            // Rehash the map, doubling the size
            smoothed_cell_data->RehashNodeToViewIndexMapOnHost(new_size * 2);

            return true;
        }
        return false;
    }

    template <size_t NumElementNodes>
    void SetNodeIndiciesAndMap(bool one_pass_method) {
        // Get the bulk data
        stk::mesh::BulkData &bulk_data = *m_bulk_data;

        // Needed for the one pass method
        stk::mesh::Field<uint64_t> *neighbors_field = nullptr;
        stk::mesh::Field<uint64_t> *num_neighbors_field = nullptr;

        if (one_pass_method) {
            {
                auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::Instantiate);
                // Get the neighbors, num_neighbors fields
                neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
                num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
            }
            {
                auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SyncFields);
                auto ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*neighbors_field);
                auto ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*num_neighbors_field);
                ngp_neighbors_field->sync_to_host();
                ngp_num_neighbors_field->sync_to_host();
            }
        }

        // Create a scoped timer
        auto time = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetNodeIndiciesAndMap);

        // #### Set the smoothed cell node ids from the smoothed cell elements ####
        // Get host views of the node index lengths and starts
        auto node_lengths = m_smoothed_cell_data->GetNodeIndices().GetLengthHost();
        auto node_starts = m_smoothed_cell_data->GetNodeIndices().GetStartHost();
        node_starts(0) = 0;

        // Get host views of the node local offsets
        auto node_indicies = m_smoothed_cell_data->GetNodeIndiciesHost();

        // Get the global node index to local index map
        auto &node_to_view_index_map = m_smoothed_cell_data->GetNodeToViewIndexMapHost();

        // Initialize the global index counter
        ValueType global_index_counter = 0;

        // Loop over all the cells, set the derivative values for the nodes
        for (size_t i = 0, e = m_smoothed_cell_data->NumCells(); i < e; ++i) {
            // Get the cell element local offsets
            auto cell_element_local_offsets = m_smoothed_cell_data->GetCellElementLocalOffsetsHost(i);

            // Initialize the local index counter
            ValueType local_index_counter = 0;

            // Loop over all elements in the cell to create the short list of nodes or node neighbors
            for (size_t j = 0, je = cell_element_local_offsets.size(); j < je; ++j) {
                auto element_local_offset = cell_element_local_offsets[j];
                stk::mesh::Entity element(element_local_offset);
                stk::mesh::Entity const *element_nodes = bulk_data.begin_nodes(element);
                // Loop over all the nodes in the element
                for (size_t k = 0, ke = bulk_data.num_nodes(element); k < ke; ++k) {
                    if (one_pass_method) {
                        // Get the node neighbors
                        uint64_t num_neighbors = stk::mesh::field_data(*num_neighbors_field, element_nodes[k])[0];
                        uint64_t *neighbors = stk::mesh::field_data(*neighbors_field, element_nodes[k]);
                        for (size_t l = 0; l < num_neighbors; ++l) {
                            aperi::Index neighbor_node_index = LocalOffsetToIndex(neighbors[l]);
                            auto results = node_to_view_index_map.insert({i, neighbor_node_index.bucket_id(), neighbor_node_index.bucket_ord()}, global_index_counter);
                            if (results.success()) {
                                global_index_counter++;
                                local_index_counter++;
                            } else if (results.failed()) {
                                // printf("Failed to insert node (%lu, %lu) into node_neighbor_entities\n", neighbor_node_index.bucket_id(), neighbor_node_index.bucket_ord());
                                Kokkos::abort("Failed to insert node into node_entities");
                            }
                        }
                    } else {
                        aperi::Index node_index = EntityToIndex(element_nodes[k]);
                        auto results = node_to_view_index_map.insert({i, node_index.bucket_id(), node_index.bucket_ord()}, global_index_counter);
                        if (results.success()) {
                            global_index_counter++;
                            local_index_counter++;
                        } else if (results.failed()) {
                            // printf("Failed to insert node (%lu, %lu) into node_to_view_index_map\n", node_index.bucket_id(), node_index.bucket_ord());
                            Kokkos::abort("Failed to insert node into node_entities");
                        }
                    }
                }
            }

            // Set the length to the size of the map. This is the number of nodes or node neighbors in the cell
            node_lengths(i) = local_index_counter;

            // Set the start to the start + length of the previous cell, if not the first cell
            if (i > 0) {
                node_starts(i) = node_starts(i - 1) + node_lengths(i - 1);
            }

            // Resize the node views if necessary
            uint64_t node_start = node_starts(i);
            size_t new_node_indicies_size = node_start + node_lengths(i);
            size_t current_node_indicies_size = node_indicies.extent(0);
            bool resized = ResizeNodeViewsAndMap(m_smoothed_cell_data, current_node_indicies_size, new_node_indicies_size, i, e);
            if (resized) {
                // Get the new host views of the node local offsets
                node_indicies = m_smoothed_cell_data->GetNodeIndiciesHost();
            }
        }

        // Set the node indicies
        for (size_t i = 0, e = node_to_view_index_map.capacity(); i < e; ++i) {
            if (node_to_view_index_map.valid_at(i)) {
                auto key = node_to_view_index_map.key_at(i);
                auto value = node_to_view_index_map.value_at(i);
                // Note: This is the correct value because the cell were looped over in order.
                // This will have to change when this function is threaded.
                node_indicies(value) = aperi::Index(key.bucket_id, key.bucket_ord);
            }
        }

        bool set_start_from_lengths = false;  // The start array is already set above.
        m_smoothed_cell_data->CompleteAddingCellNodeIndicesOnHost(set_start_from_lengths);
        m_smoothed_cell_data->CopyCellNodeIndiciesToDevice();
    }

    template <size_t NumElementNodes, typename IntegrationFunctor>
    void SetFunctionDerivatives(const IntegrationFunctor &integration_functor, bool one_pass_method) {
        // Get the bulk data
        stk::mesh::BulkData &bulk_data = *m_bulk_data;

        // Needed for the one pass method
        stk::mesh::Field<uint64_t> *neighbors_field = nullptr;
        stk::mesh::Field<uint64_t> *num_neighbors_field = nullptr;
        stk::mesh::Field<double> *function_values_field = nullptr;

        if (one_pass_method) {
            {
                auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::Instantiate);
                // Get the neighbors, num_neighbors, and function_values fields
                neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
                num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
                function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
            }
            {
                // Sync the function values field. Other fields are already synced.
                auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SyncFields);
                auto ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*function_values_field);
                ngp_function_values_field->sync_to_host();
            }
        }

        m_ngp_coordinates_field->sync_to_host();
        stk::mesh::Field<double> &element_volume_field = *m_element_volume_field;
        stk::mesh::Field<double> &coordinate_field = *m_coordinates_field;

        // Create a scoped timer
        auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetFunctionDerivatives);

        // #### Set the smoothed cell node ids from the smoothed cell elements ####
        // Get host views of the node index lengths and starts
        auto node_lengths = m_smoothed_cell_data->GetNodeIndices().GetLengthHost();
        auto node_starts = m_smoothed_cell_data->GetNodeIndices().GetStartHost();
        node_starts(0) = 0;

        // Get host views of the node derivatives
        auto node_function_derivatives = m_smoothed_cell_data->GetFunctionDerivativesHost();

        // Zero the node derivatives
        Kokkos::deep_copy(node_function_derivatives, 0.0);

        // Get the global node index to local index map
        auto &node_to_view_index_map = m_smoothed_cell_data->GetNodeToViewIndexMapHost();

        // Get the cell volume view and zero it
        auto cell_volumes = m_smoothed_cell_data->GetCellVolumeHost();
        Kokkos::deep_copy(cell_volumes, 0.0);

        // Loop over all the cells, set the derivative values for the nodes
        for (size_t i = 0, e = m_smoothed_cell_data->NumCells(); i < e; ++i) {
            // Get the cell element local offsets
            auto cell_element_local_offsets = m_smoothed_cell_data->GetCellElementLocalOffsetsHost(i);

            // Loop over all the cell elements and add the function derivatives to the nodes
            for (size_t j = 0, je = cell_element_local_offsets.size(); j < je; ++j) {
                // Get the element using the stk local offset
                auto element_local_offset = cell_element_local_offsets[j];
                stk::mesh::Entity element(element_local_offset);

                // Get the nodes for the element
                stk::mesh::Entity const *element_nodes = bulk_data.begin_nodes(element);

                // Number of nodes in the element
                size_t num_nodes = bulk_data.num_nodes(element);

                // Get the element function derivatives. TODO(jake): Calculate the element function derivatives here instead of precomputing and storing.
                // Set up the field data to gather
                Eigen::Matrix<double, NumElementNodes, 3> cell_node_coordinates = Eigen::Matrix<double, NumElementNodes, 3>::Zero();

                // Gather the field data for each node
                for (size_t l = 0; l < num_nodes; ++l) {
                    for (size_t k = 0; k < 3; ++k) {
                        cell_node_coordinates(l, k) = stk::mesh::field_data(coordinate_field, element_nodes[l])[k];
                    }
                }
                Kokkos::pair<Eigen::Matrix<double, NumElementNodes, 3>, double> derivatives_and_weight = integration_functor.ComputeBMatrixAndWeight(cell_node_coordinates);
                const Eigen::Matrix<double, NumElementNodes, 3> &element_function_derivatives = derivatives_and_weight.first;
                double &element_volume = derivatives_and_weight.second;

                // Set the element volume
                stk::mesh::field_data(element_volume_field, element)[0] = element_volume;
                m_smoothed_cell_data->AddToCellVolumeHost(i, element_volume);

                // Loop over all the nodes in the element
                for (size_t k = 0, ke = num_nodes; k < ke; ++k) {
                    // One pass method: store the function derivatives for the neighbors of the nodes in the cell
                    if (one_pass_method) {
                        // Get the number of neighbors
                        uint64_t num_neighbors = stk::mesh::field_data(*num_neighbors_field, element_nodes[k])[0];

                        // Loop over the nodes neighbors
                        for (size_t l = 0; l < num_neighbors; ++l) {
                            // Get the neighbor
                            uint64_t neighbor = stk::mesh::field_data(*neighbors_field, element_nodes[k])[l];

                            // Get the function value
                            double function_value = stk::mesh::field_data(*function_values_field, element_nodes[k])[l];

                            // Get the cell index of the neighbor
                            aperi::Index neighbor_index = LocalOffsetToIndex(neighbor);
                            KOKKOS_ASSERT(node_to_view_index_map.exists({i, neighbor_index.bucket_id(), neighbor_index.bucket_ord()}));
                            auto neighbor_component_index = node_to_view_index_map.value_at(node_to_view_index_map.find({i, neighbor_index.bucket_id(), neighbor_index.bucket_ord()})) * 3;

                            // Atomic add to the derivatives and set the node local offsets for the cell
                            for (size_t m = 0; m < 3; ++m) {
                                // Will have to divide by the cell volume when we have the full value
                                Kokkos::atomic_add(&node_function_derivatives(neighbor_component_index + m), element_function_derivatives(k, m) * element_volume * function_value);
                            }
                        }
                    } else {
                        // Two pass method: store the function derivatives for the nodes in the cell

                        // Get the node local offset
                        aperi::Index node_index = EntityToIndex(element_nodes[k]);
                        KOKKOS_ASSERT(node_to_view_index_map.exists({i, node_index.bucket_id(), node_index.bucket_ord()}));
                        size_t node_component_index = node_to_view_index_map.value_at(node_to_view_index_map.find({i, node_index.bucket_id(), node_index.bucket_ord()})) * 3;
                        // Atomic add to the derivatives and set the node local offsets for the cell
                        for (size_t l = 0; l < 3; ++l) {
                            // Will have to divide by the cell volume when we have the full value
                            Kokkos::atomic_add(&node_function_derivatives(node_component_index + l), element_function_derivatives(k, l) * element_volume);
                        }
                    }
                }
            }

            // Cell volume
            double cell_volume = m_smoothed_cell_data->GetCellVolumeHost(i);

            size_t start_node_index = node_starts(i);

            // Divide the function derivatives by the cell volume
            for (size_t j = 0, je = node_lengths(i); j < je; ++j) {
                size_t j3 = (start_node_index + j) * 3;
                for (size_t k = 0; k < 3; ++k) {
                    node_function_derivatives(j3 + k) /= cell_volume;
                }
            }
        }
        // Copy element volumes, function derivatives to device
        element_volume_field.clear_sync_state();
        element_volume_field.modify_on_host();
        element_volume_field.sync_to_device();
        m_smoothed_cell_data->CopyCellVolumeToDevice();
        m_smoothed_cell_data->CopyCellFunctionDerivativesToDevice();
        assert(CheckPartitionOfNullity(m_smoothed_cell_data));
    }

    void PopulateElementOutputs() {
        // Fill in the other elements in the cell with the parent elements values
        // Fields: pk1_stress, displacement_gradient

        size_t num_tensor_components = 9;

        // Get the fields
        stk::mesh::Field<double> *pk1_stress_field = StkGetField(FieldQueryData<double>{"pk1_stress", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, &m_bulk_data->mesh_meta_data());
        stk::mesh::Field<double> *displacement_gradient_field = StkGetField(FieldQueryData<double>{"displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, &m_bulk_data->mesh_meta_data());

        // Create aperi::Field objects for the fields to make sure they are synced to the host
        aperi::Field<double> pk1(m_mesh_data, FieldQueryData<double>{"pk1_stress", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
        aperi::Field<double> displacement_gradient(m_mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
        pk1.MarkModifiedOnDevice();
        displacement_gradient.MarkModifiedOnDevice();
        pk1.SyncDeviceToHost();
        displacement_gradient.SyncDeviceToHost();

        // Loop over all the cells, set the derivative values for the nodes
        for (size_t i = 0, e = m_smoothed_cell_data->NumCells(); i < e; ++i) {
            // Get the cell element local offsets
            auto cell_element_local_offsets = m_smoothed_cell_data->GetCellElementLocalOffsetsHost(i);

            // Get the first element
            stk::mesh::Entity first_element(cell_element_local_offsets[0]);

            // Get the pk1_stress and displacement_gradient of the first element
            auto first_element_pk1_stress = stk::mesh::field_data(*pk1_stress_field, first_element);
            auto first_element_displacement_gradient = stk::mesh::field_data(*displacement_gradient_field, first_element);

            // Loop over all the cell elements and add the function derivatives to the nodes
            for (size_t j = 1, je = cell_element_local_offsets.size(); j < je; ++j) {
                // Get the element using the stk local offset
                auto element_local_offset = cell_element_local_offsets[j];
                stk::mesh::Entity element(element_local_offset);

                // Loop over all the components in the pk1_stress and displacement_gradient and set them to the first element values
                for (size_t k = 0; k < num_tensor_components; ++k) {
                    // Set the pk1_stress
                    stk::mesh::field_data(*pk1_stress_field, element)[k] = first_element_pk1_stress[k];

                    // Set the displacement_gradient
                    stk::mesh::field_data(*displacement_gradient_field, element)[k] = first_element_displacement_gradient[k];
                }
            }
        }
    }

    void PrintDiagnosticOutput() {
        // Collect the cell counts on each rank
        size_t num_cells = m_smoothed_cell_data->NumCells();
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

        // Get the number of resizes that occurred. Should be at least one due to the final resize.
        size_t num_resizes = m_smoothed_cell_data->NumberOfResizes();

        // Calculate the percent unbalance = (max - avg) / avg
        double percent_unbalance = (static_cast<double>(max_num_cells) - avg_num_cells) / avg_num_cells * 100.0;

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
        ss << "***************************************************\n";
        ss << "Number of resizes: " << num_resizes << std::endl;
        aperi::CoutP0() << ss.str();
    }

    template <size_t NumElementNodes>
    std::shared_ptr<aperi::SmoothedCellData> BuildSmoothedCellData(size_t estimated_num_nodes_per_cell, bool one_pass_method = true) {
        /* This needs a few things to be completed first:
           - The mesh labeler needs to be run to get the cell ids and create the _cells parts.
        */
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(StrainSmoothingTimerType::BuildSmoothedCellData, "Build Smoothed Cell Data");

        // Create the smoothed cell timer manager
        m_smoothed_cell_timer_manager = std::make_shared<aperi::TimerManager<SmoothedCellDataTimerType>>("Smoothed Cell Data", smoothed_cell_data_timer_map);

        // Add the smoothed cell timer manager to the timer manager
        m_timer_manager.AddChild(m_smoothed_cell_timer_manager);

        // Create the smoothed cell data object
        m_smoothed_cell_data = InstantiateSmoothedCellData(estimated_num_nodes_per_cell, one_pass_method, m_smoothed_cell_timer_manager);

        // Sync the fields
        {
            auto timer = m_smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SyncFields);
            m_ngp_element_volume_field->sync_to_host();
        }

        // Add the cells number of elements to the smoothed cell data
        AddCellNumElementsToSmoothedCellData();

        // Set the cell local offsets
        SetCellLocalOffsets();

        // Set the node indicies and map
        SetNodeIndiciesAndMap<NumElementNodes>(one_pass_method);

        PrintDiagnosticOutput();

        return m_smoothed_cell_data;
    }

    template <size_t NumElementNodes, typename IntegrationFunctor>
    void ComputeFunctionDerivatives(const IntegrationFunctor &integration_functor, bool one_pass_method = true) {
        // Set the function derivatives
        SetFunctionDerivatives<NumElementNodes>(integration_functor, one_pass_method);
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
    aperi::TimerManager<StrainSmoothingTimerType> m_timer_manager;   // The timer manager.

    stk::mesh::BulkData *m_bulk_data;                // The bulk data object.
    stk::mesh::Selector m_selector;                  // The selector
    stk::mesh::Selector m_owned_selector;            // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                   // The ngp mesh object.
    DoubleField *m_coordinates_field;                // The coordinates field
    DoubleField *m_element_volume_field;             // The element volume field
    UnsignedField *m_cell_id_field;                  // The cell id field
    UnsignedField *m_smoothed_cell_id_field;         // The smoothed cell id field
    NgpDoubleField *m_ngp_coordinates_field;         // The ngp coordinates field
    NgpDoubleField *m_ngp_element_volume_field;      // The ngp element volume field
    NgpUnsignedField *m_ngp_cell_id_field;           // The ngp cell id field
    NgpUnsignedField *m_ngp_smoothed_cell_id_field;  // The ngp smoothed cell id field

    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;                                  // The smoothed cell data object
    std::shared_ptr<aperi::TimerManager<SmoothedCellDataTimerType>> m_smoothed_cell_timer_manager;  // The timer manager for the smoothed cell data
};

}  // namespace aperi
