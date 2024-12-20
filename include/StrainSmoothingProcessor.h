#pragma once

#include <Eigen/Dense>
#include <array>
#include <chrono>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"
#include "SmoothedCellData.h"

namespace aperi {

enum class StrainSmoothingTimerType {
    Instantiate,
    ComputeDerivatives,
    ComputeCellVolumeFromElementVolume,
    BuildSmoothedCellData,
    NONE
};

inline const std::map<StrainSmoothingTimerType, std::string> strain_smoothing_timer_map = {
    {StrainSmoothingTimerType::Instantiate, "Instantiate"},
    {StrainSmoothingTimerType::ComputeDerivatives, "ComputeDerivatives"},
    {StrainSmoothingTimerType::ComputeCellVolumeFromElementVolume, "ComputeCellVolumeFromElementVolume"},
    {StrainSmoothingTimerType::BuildSmoothedCellData, "BuildSmoothedCellData"},
    {StrainSmoothingTimerType::NONE, "NONE"}};

enum class SmoothedCellDataTimerType {
    Instantiate,
    SyncFields,
    AddCellNumElements,
    SetCellLocalOffsets,
    SetFunctionDerivatives,
    NONE
};

inline const std::map<SmoothedCellDataTimerType, std::string> smoothed_cell_data_timer_map = {
    {SmoothedCellDataTimerType::Instantiate, "Instantiate"},
    {SmoothedCellDataTimerType::SyncFields, "SyncFields"},
    {SmoothedCellDataTimerType::AddCellNumElements, "AddCellNumElements"},
    {SmoothedCellDataTimerType::SetCellLocalOffsets, "SetCellLocalOffsets"},
    {SmoothedCellDataTimerType::SetFunctionDerivatives, "SetFunctionDerivatives"},
    {SmoothedCellDataTimerType::NONE, "NONE"}};

class StrainSmoothingProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

   public:
    StrainSmoothingProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets), m_timer_manager("Strain Smoothing Processor", strain_smoothing_timer_map) {
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
        m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the element volume field
        m_element_volume_field = StkGetField(FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_volume_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_volume_field);

        // Get the cell volume field
        m_cell_volume_fraction_field = StkGetField(FieldQueryData<double>{"cell_volume_fraction", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_volume_fraction_field = &stk::mesh::get_updated_ngp_field<double>(*m_cell_volume_fraction_field);

        // Get the cell id field
        m_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_cell_id_field);

        // Get the smoothed cell id field
        m_smoothed_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"smoothed_cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_smoothed_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_smoothed_cell_id_field);

        // Get the function derivatives fields
        std::vector<std::string> element_function_derivatives_field_names = {"function_derivatives_x", "function_derivatives_y", "function_derivatives_z"};
        for (size_t i = 0; i < 3; ++i) {
            m_element_function_derivatives_fields[i] = StkGetField(FieldQueryData<double>{element_function_derivatives_field_names[i], FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_element_function_derivatives_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_element_function_derivatives_fields[i]);
        }
    }

    template <size_t NumNodes, typename IntegrationFunctor>
    void for_each_neighbor_compute_derivatives(const IntegrationFunctor &integration_functor) {
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(StrainSmoothingTimerType::ComputeDerivatives, "Compute Derivatives");
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_element_volume_field = *m_ngp_element_volume_field;
        Kokkos::Array<NgpDoubleField, 3> ngp_element_function_derivatives_fields;
        for (size_t i = 0; i < 3; ++i) {
            ngp_element_function_derivatives_fields[i] = *m_ngp_element_function_derivatives_fields[i];
        }
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                size_t num_nodes = nodes.size();

                // Set up the field data to gather
                Eigen::Matrix<double, NumNodes, 3> cell_node_coordinates = Eigen::Matrix<double, NumNodes, 3>::Zero();

                // Gather the field data for each node
                for (size_t i = 0; i < num_nodes; ++i) {
                    stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                    for (size_t j = 0; j < 3; ++j) {
                        cell_node_coordinates(i, j) = ngp_coordinates_field(node_index, j);
                    }
                }

                // TODO(jake): Simplify further. This is leftover from the "single pass" implementation.
                assert(integration_functor->NumGaussPoints() == 1);
                Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> derivatives_and_weight = integration_functor->ComputeBMatrixAndWeight(cell_node_coordinates);
                ngp_element_volume_field(elem_index, 0) = derivatives_and_weight.second;
                for (size_t i = 0; i < num_nodes; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        ngp_element_function_derivatives_fields[j](elem_index, i) = derivatives_and_weight.first(i, j);
                    }
                }
            });
        // Mark modified fields
        m_ngp_element_volume_field->clear_sync_state();
        m_ngp_element_volume_field->modify_on_device();
        for (size_t i = 0; i < 3; ++i) {
            m_ngp_element_function_derivatives_fields[i]->clear_sync_state();
            m_ngp_element_function_derivatives_fields[i]->modify_on_device();
        }
    }

    // Should be call after for_each_neighbor_compute_derivatives so element volume is computed
    // - Loop over each element
    //   - Add the element volume to the cell volume for the element at the cell id
    // - Loop over each element again
    //   - Grab the cell volume for the element from the element at the cell id
    // - Loop over each element again
    //   - Set the volume fraction by dividing the element volume by the cell volume
    void ComputeCellVolumeFromElementVolume() {
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(StrainSmoothingTimerType::ComputeCellVolumeFromElementVolume, "Compute Cell Volume From Element Volume");
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_element_volume_field = *m_ngp_element_volume_field;
        auto ngp_cell_volume_fraction_field = *m_ngp_cell_volume_fraction_field;
        auto ngp_cell_id_field = *m_ngp_cell_id_field;

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the cell parent element index
                stk::mesh::Entity cell_parent_element(ngp_cell_id_field(elem_index, 0));
                stk::mesh::FastMeshIndex cell_parent_element_index = ngp_mesh.fast_mesh_index(cell_parent_element);

                // Get the element volume
                double element_volume = ngp_element_volume_field(elem_index, 0);

                // Add the element volume to the cell volume
                Kokkos::atomic_add(&ngp_cell_volume_fraction_field(cell_parent_element_index, 0), element_volume);
            });

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the cell parent element index
                stk::mesh::Entity cell_parent_element(ngp_cell_id_field(elem_index, 0));
                stk::mesh::FastMeshIndex cell_parent_element_index = ngp_mesh.fast_mesh_index(cell_parent_element);

                // Get the cell volume
                double cell_volume_fraction = ngp_cell_volume_fraction_field(cell_parent_element_index, 0);

                // Set the cell volume
                ngp_cell_volume_fraction_field(elem_index, 0) = cell_volume_fraction;
            });

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element volume
                double element_volume = ngp_element_volume_field(elem_index, 0);

                // Get the cell volume
                double cell_volume_fraction = ngp_cell_volume_fraction_field(elem_index, 0);

                // Set the volume fraction
                ngp_cell_volume_fraction_field(elem_index, 0) = element_volume / cell_volume_fraction;
            });
    }

    bool CheckPartitionOfNullity(const std::shared_ptr<aperi::SmoothedCellData> &smoothed_cell_data) {
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
                if (std::abs(cell_function_derivatives_sum[j]) > 1.0e-12) {
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

    void AddCellNumElementsToSmoothedCellData(std::shared_ptr<aperi::SmoothedCellData> smoothed_cell_data, const stk::mesh::NgpMesh &ngp_mesh, const stk::mesh::NgpField<uint64_t> &ngp_smoothed_cell_id_field, stk::mesh::Selector &owned_selector, std::shared_ptr<aperi::TimerManager<SmoothedCellDataTimerType>> timer_manager) {
        // Create a scoped timer
        auto timer = timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::AddCellNumElements);

        // #### Set length and start for the elements in the smoothed cell data ####
        // Get the functor to add the number of elements to the smoothed cell data
        auto add_cell_num_elements_functor = smoothed_cell_data->GetAddCellNumElementsFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the smoothed_cell_id
                uint64_t smoothed_cell_id = ngp_smoothed_cell_id_field(elem_index, 0);

                // Add the number of elements to the smoothed cell data
                add_cell_num_elements_functor(smoothed_cell_id, 1);
            });
        // Number of cell elements ('length') is now set.
        // This populates the 'start' array from the 'length' array and collects other sizes.
        // Also copies the 'length' and 'start' arrays to host.
        smoothed_cell_data->CompleteAddingCellElementIndicesOnDevice();
    }

    void SetCellLocalOffsets(std::shared_ptr<aperi::SmoothedCellData> smoothed_cell_data, const stk::mesh::NgpMesh &ngp_mesh, const stk::mesh::NgpField<uint64_t> &ngp_smoothed_cell_id_field, const stk::mesh::NgpField<double> &ngp_element_volume_field, stk::mesh::Selector &owned_selector, std::shared_ptr<aperi::TimerManager<SmoothedCellDataTimerType>> timer_manager) {
        // #### Set the cell element local offsets for the smoothed cell data ####

        // Create a scoped timer
        auto timer = timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetCellLocalOffsets);

        // Get the functor to add the element to the smoothed cell data
        auto add_cell_element_functor = smoothed_cell_data->GetAddCellElementFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the smoothed_cell_id
                uint64_t smoothed_cell_id = ngp_smoothed_cell_id_field(elem_index, 0);

                stk::mesh::Entity element = ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, elem_index);
                uint64_t element_local_offset = element.local_offset();
                double element_volume = ngp_element_volume_field(elem_index, 0);

                // Add the number of elements to the smoothed cell data
                add_cell_element_functor(smoothed_cell_id, element_local_offset, element_volume);
            });
        // Cell element local offsets (STK offsets) are now set. Copy to host.
        smoothed_cell_data->CopyCellElementViewsToHost();
    }

    void SetFunctionDerivatives(std::shared_ptr<aperi::SmoothedCellData> smoothed_cell_data, stk::mesh::BulkData &bulk_data, stk::mesh::Field<uint64_t> &num_neighbors_field, stk::mesh::Field<uint64_t> &neighbors_field, stk::mesh::Field<double> &function_values_field, stk::mesh::Field<double> &element_volume_field, Kokkos::Array<DoubleField *, 3> &element_function_derivatives_fields, bool one_pass_method, std::shared_ptr<aperi::TimerManager<SmoothedCellDataTimerType>> timer_manager) {
        // Create a scoped timer
        auto timer = timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SetFunctionDerivatives);

        // #### Set the smoothed cell node ids from the smoothed cell elements ####
        // Get host views of the node index lengths and starts
        auto node_lengths = smoothed_cell_data->GetNodeIndices().GetLengthHost();
        auto node_starts = smoothed_cell_data->GetNodeIndices().GetStartHost();
        node_starts(0) = 0;

        // Get host views of the node derivatives
        auto node_function_derivatives = smoothed_cell_data->GetFunctionDerivativesHost();

        // Get host views of the node local offsets
        auto node_local_offsets = smoothed_cell_data->GetNodeLocalOffsetsHost();

        double average_num_neighbors = 0;
        double average_num_nodes = 0;
        // Loop over all the cells, set the derivative values for the nodes
        for (size_t i = 0, e = smoothed_cell_data->NumCells(); i < e; ++i) {
            // Get the cell element local offsets
            auto cell_element_local_offsets = smoothed_cell_data->GetCellElementLocalOffsetsHost(i);

            // Create a set of node entities to their indices
            std::unordered_set<uint64_t> node_entities;           // Short list of all the nodes in the cell
            std::unordered_set<uint64_t> node_neighbor_entities;  // Short list of all the node neighbors in the cell

            // Loop over all elements in the cell to create the short list of nodes or node neighbors
            for (size_t j = 0, je = cell_element_local_offsets.size(); j < je; ++j) {
                auto element_local_offset = cell_element_local_offsets[j];
                stk::mesh::Entity element(element_local_offset);
                stk::mesh::Entity const *element_nodes = bulk_data.begin_nodes(element);
                // Loop over all the nodes in the element
                for (size_t k = 0, ke = bulk_data.num_nodes(element); k < ke; ++k) {
                    uint64_t node_local_offset = element_nodes[k].local_offset();
                    if (node_entities.find(node_local_offset) == node_entities.end()) {
                        node_entities.insert(node_local_offset);
                        if (one_pass_method) {
                            // Get the node neighbors
                            uint64_t num_neighbors = stk::mesh::field_data(num_neighbors_field, element_nodes[k])[0];
                            uint64_t *neighbors = stk::mesh::field_data(neighbors_field, element_nodes[k]);
                            for (size_t l = 0; l < num_neighbors; ++l) {
                                uint64_t neighbor = neighbors[l];
                                if (node_neighbor_entities.find(neighbor) == node_neighbor_entities.end()) {
                                    node_neighbor_entities.insert(neighbor);
                                }
                            }
                        }
                    }
                }
            }

            // Set the length to the size of the map. This is the number of nodes or node neighbors in the cell
            if (one_pass_method) {
                node_lengths(i) = node_neighbor_entities.size();
                average_num_neighbors += static_cast<double>(node_neighbor_entities.size());
            } else {
                node_lengths(i) = node_entities.size();
            }
            average_num_nodes += static_cast<double>(node_entities.size());

            // Set the start to the start + length of the previous cell, if not the first cell
            if (i > 0) {
                node_starts(i) = node_starts(i - 1) + node_lengths(i - 1);
            }

            // Resize the node views if necessary
            size_t node_local_offsets_size = node_starts(i) + node_lengths(i);
            size_t current_node_local_offsets_size = node_local_offsets.extent(0);
            if (node_local_offsets_size > current_node_local_offsets_size) {
                // Calculate the percent done
                double percent_done = static_cast<double>(i + 1) / static_cast<double>(e);

                // Estimate the expected size based on the percent done. Then multiply by 1.5 to give some buffer.
                auto expected_size = static_cast<size_t>(static_cast<double>(node_local_offsets_size) * 1.5 * (1.0 + percent_done));

                // Double the size of the node local offsets
                smoothed_cell_data->ResizeNodeViewsOnHost(expected_size);

                // Get the new host views of the node local offsets
                node_function_derivatives = smoothed_cell_data->GetFunctionDerivativesHost();
                node_local_offsets = smoothed_cell_data->GetNodeLocalOffsetsHost();
            }

            // Loop over the node entities, create a map of local offsets to node indices
            std::unordered_map<uint64_t, size_t> node_local_offsets_to_index;
            size_t node_index = node_starts(i);
            std::unordered_set<uint64_t> &node_entities_to_use = one_pass_method ? node_neighbor_entities : node_entities;
            for (const auto &node_local_offset : node_entities_to_use) {
                node_local_offsets(node_index) = node_local_offset;
                node_local_offsets_to_index[node_local_offset] = node_index;
                ++node_index;
            }

            // Cell volume
            double cell_volume = smoothed_cell_data->GetCellVolumeHost(i);

            // Loop over all the cell elements and add the function derivatives to the nodes
            for (size_t j = 0, je = cell_element_local_offsets.size(); j < je; ++j) {
                auto element_local_offset = cell_element_local_offsets[j];
                stk::mesh::Entity element(element_local_offset);
                stk::mesh::Entity const *element_nodes = bulk_data.begin_nodes(element);
                double element_volume = stk::mesh::field_data(element_volume_field, element)[0];
                double cell_volume_fraction = element_volume / cell_volume;
                std::vector<double *> element_function_derivatives_data(3);
                for (size_t l = 0; l < 3; ++l) {
                    element_function_derivatives_data[l] = stk::mesh::field_data(*element_function_derivatives_fields[l], element);
                }
                // Loop over all the nodes in the element
                for (size_t k = 0, ke = bulk_data.num_nodes(element); k < ke; ++k) {
                    if (one_pass_method) {
                        uint64_t num_neighbors = stk::mesh::field_data(num_neighbors_field, element_nodes[k])[0];
                        // Loop over the nodes neighbors
                        for (size_t l = 0; l < num_neighbors; ++l) {
                            uint64_t neighbor = stk::mesh::field_data(neighbors_field, element_nodes[k])[l];
                            double function_value = stk::mesh::field_data(function_values_field, element_nodes[k])[l];
                            auto neighbor_iter = node_local_offsets_to_index.find(neighbor);
                            assert(neighbor_iter != node_local_offsets_to_index.end());
                            size_t neighbor_index = neighbor_iter->second;
                            // Atomic add to the derivatives and set the node local offsets for the cell
                            for (size_t m = 0; m < 3; ++m) {
                                Kokkos::atomic_add(&node_function_derivatives(neighbor_index * 3 + m), element_function_derivatives_data[m][k] * cell_volume_fraction * function_value);
                            }
                        }
                    } else {
                        uint64_t node_local_offset = element_nodes[k].local_offset();
                        size_t node_component_index = node_local_offsets_to_index[node_local_offset] * 3;
                        // Atomic add to the derivatives and set the node local offsets for the cell
                        for (size_t l = 0; l < 3; ++l) {
                            Kokkos::atomic_add(&node_function_derivatives(node_component_index + l), element_function_derivatives_data[l][k] * cell_volume_fraction);
                        }
                    }
                }
            }
        }
        double num_cells = static_cast<double>(smoothed_cell_data->NumCells());
        average_num_nodes /= num_cells;
        aperi::CoutP0() << "     - Average number of points defining a cell: " << average_num_nodes << std::endl;
        if (one_pass_method) {
            average_num_neighbors /= num_cells;
            aperi::CoutP0() << "     - Average number of neighbors for a cell: " << average_num_neighbors << std::endl;
        }
    }

    std::shared_ptr<aperi::SmoothedCellData> BuildSmoothedCellData(size_t estimated_num_nodes_per_cell, bool one_pass_method = true) {
        /* This needs a few things to be completed first:
           - The mesh labeler needs to be run to get the cell ids and create the _cells parts.
           - The node function derivatives need to be computed.
        */
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(StrainSmoothingTimerType::BuildSmoothedCellData, "Build Smoothed Cell Data");

        // Create the smoothed cell timer manager
        auto smoothed_cell_timer_manager = std::make_shared<aperi::TimerManager<SmoothedCellDataTimerType>>("Smoothed Cell Data", smoothed_cell_data_timer_map);

        // Add the smoothed cell timer manager to the timer manager
        m_timer_manager.AddChild(smoothed_cell_timer_manager);

        // Create the smoothed cell data object
        std::shared_ptr<aperi::SmoothedCellData> smoothed_cell_data = InstantiateSmoothedCellData(estimated_num_nodes_per_cell, one_pass_method, smoothed_cell_timer_manager);

        // Get the number of cells
        size_t num_cells = smoothed_cell_data->NumCells();

        // Needed for the one pass method
        stk::mesh::Field<uint64_t> *neighbors_field = nullptr;
        stk::mesh::Field<uint64_t> *num_neighbors_field = nullptr;
        stk::mesh::Field<double> *function_values_field = nullptr;

        if (one_pass_method) {
            {
                auto timer = smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::Instantiate);
                // Get the neighbors, num_neighbors, and function_values fields
                neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
                num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
                function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
            }
            {
                auto timer = smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SyncFields);
                auto ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*neighbors_field);
                auto ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*num_neighbors_field);
                auto ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*function_values_field);
                ngp_neighbors_field->sync_to_host();
                ngp_num_neighbors_field->sync_to_host();
                ngp_function_values_field->sync_to_host();
            }
        }

        // Sync the fields
        {
            auto timer = smoothed_cell_timer_manager->CreateScopedTimer(SmoothedCellDataTimerType::SyncFields);
            m_ngp_element_volume_field->sync_to_host();
            for (size_t i = 0; i < 3; ++i) {
                m_ngp_element_function_derivatives_fields[i]->sync_to_host();
            }
        }

        // Get the ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Add the cells number of elements to the smoothed cell data
        AddCellNumElementsToSmoothedCellData(smoothed_cell_data, ngp_mesh, *m_ngp_smoothed_cell_id_field, m_owned_selector, smoothed_cell_timer_manager);

        // Set the cell local offsets
        SetCellLocalOffsets(smoothed_cell_data, ngp_mesh, *m_ngp_smoothed_cell_id_field, *m_ngp_element_volume_field, m_owned_selector, smoothed_cell_timer_manager);

        // Set the function derivatives
        SetFunctionDerivatives(smoothed_cell_data, *m_bulk_data, *num_neighbors_field, *neighbors_field, *function_values_field, *m_element_volume_field, m_element_function_derivatives_fields, one_pass_method, smoothed_cell_timer_manager);

        // ---- Diagnostic output
        // Collect the cell counts on each rank
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
        int width = 12;
        ss << "*** Cell Counts ************************************\n";
        ss << std::setw(width) << "Total" << std::setw(width) << "Processor" << std::setw(width) << "Processor" << std::setw(width) << "Processor"
           << "\n";
        ss << std::setw(width) << "" << std::setw(width) << "Average" << std::setw(width) << "Min" << std::setw(width) << "Max" << std::setw(width) << "Unbalance%"
           << "\n";
        ss << "----------------------------------------------------\n";
        ss << std::setw(width) << total_num_cells << std::setw(width) << avg_num_cells << std::setw(width) << min_num_cells << std::setw(width) << max_num_cells << std::setw(width) << percent_unbalance << "%\n";
        ss << "***************************************************\n";
        aperi::CoutP0() << ss.str();
        // ---- End diagnostic output

        bool set_start_from_lengths = false;  // The start array is already set above. This can be done as we are on host and looping through sequentially.
        smoothed_cell_data->CompleteAddingCellNodeIndicesOnHost(set_start_from_lengths);
        smoothed_cell_data->CopyCellNodeViewsToDevice();

        assert(CheckPartitionOfNullity(smoothed_cell_data));

        return smoothed_cell_data;
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
    std::shared_ptr<aperi::MeshData> m_mesh_data;                   // The mesh data object.
    std::vector<std::string> m_sets;                                // The sets to process.
    aperi::TimerManager<StrainSmoothingTimerType> m_timer_manager;  // The timer manager.

    stk::mesh::BulkData *m_bulk_data;                                              // The bulk data object.
    stk::mesh::Selector m_selector;                                                // The selector
    stk::mesh::Selector m_owned_selector;                                          // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                                                 // The ngp mesh object.
    DoubleField *m_coordinates_field;                                              // The coordinates field
    DoubleField *m_element_volume_field;                                           // The element volume field
    DoubleField *m_cell_volume_fraction_field;                                     // The cell volume field
    UnsignedField *m_cell_id_field;                                                // The cell id field
    UnsignedField *m_smoothed_cell_id_field;                                       // The smoothed cell id field
    Kokkos::Array<DoubleField *, 3> m_element_function_derivatives_fields;         // The function derivatives fields
    NgpDoubleField *m_ngp_coordinates_field;                                       // The ngp coordinates field
    NgpDoubleField *m_ngp_element_volume_field;                                    // The ngp element volume field
    NgpDoubleField *m_ngp_cell_volume_fraction_field;                              // The ngp cell volume field
    NgpUnsignedField *m_ngp_cell_id_field;                                         // The ngp cell id field
    NgpUnsignedField *m_ngp_smoothed_cell_id_field;                                // The ngp smoothed cell id field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
};

}  // namespace aperi
