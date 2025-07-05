#pragma once

#include <Kokkos_Core.hpp>
#include <stk_mesh/base/Ngp.hpp>
#include <stk_mesh/base/Types.hpp>
#include <string>
#include <vector>

namespace stk {
namespace mesh {
class BulkData;
class MetaData;
template <typename T>
class Field;
}  // namespace mesh
}  // namespace stk

#include "Constants.h"
#include "FieldData.h"
#include "Index.h"
#include "NgpMeshData.h"
#include "Types.h"

namespace aperi {

// Forward declaration for Selector struct
struct Selector;

/**
 * @brief Main mesh data wrapper for Aperi, providing access to mesh, metadata, and mesh operations.
 */
class MeshData {
   public:
    /**
     * @brief Construct MeshData from a pointer to stk::mesh::BulkData.
     * @param bulk_data Pointer to the mesh bulk data (must not be null).
     * @throws std::runtime_error if bulk_data is null.
     */
    MeshData(stk::mesh::BulkData *bulk_data);

    /**
     * @brief Get the underlying stk::mesh::BulkData pointer.
     */
    stk::mesh::BulkData *GetBulkData() const;

    /**
     * @brief Get the underlying stk::mesh::MetaData pointer.
     */
    stk::mesh::MetaData *GetMetaData() const;

    /**
     * @brief Update field data states for all fields.
     * @param rotate_device_states Whether to rotate device states.
     */
    void UpdateFieldDataStates(bool rotate_device_states = false);

    /**
     * @brief Get a device mesh wrapper with updated state.
     * @return NgpMeshData for device access.
     */
    NgpMeshData GetUpdatedNgpMesh();

    /**
     * @brief Update field data states for a set of fields.
     * @tparam T Field query type.
     * @tparam N Number of fields.
     * @param query Array of field query data.
     * @param rotate_device_states Whether to rotate device states.
     */
    template <typename T, size_t N>
    void UpdateFieldDataStates(const std::array<T, N> &query, bool rotate_device_states = false) {
        for (auto &field_query_data : query) {
            stk::mesh::Field<double> *field = StkGetField(field_query_data, &m_bulk_data->mesh_meta_data());
            m_bulk_data->update_field_data_states(field, rotate_device_states);
        }
    }

    /**
     * @brief Get the name of the coordinates field.
     */
    std::string GetCoordinatesFieldName() const;

    /**
     * @brief Get the element topology for a given part name.
     * @param part_name The part name.
     * @return The element topology.
     * @throws std::runtime_error if the part is not found.
     */
    aperi::ElementTopology GetElementTopology(std::string part_name) const;

    /**
     * @brief Get mesh entity counts for all entity ranks.
     * @return Vector of counts by rank.
     */
    std::vector<size_t> GetCommMeshCounts() const;

    /**
     * @brief Get the number of nodes in the mesh.
     */
    size_t GetNumNodes() const;

    /**
     * @brief Get the number of elements in the mesh.
     */
    size_t GetNumElements() const;

    /**
     * @brief Get the number of faces in the mesh.
     */
    size_t GetNumFaces() const;

    /**
     * @brief Get the number of owned nodes in the given sets.
     * @param sets List of part names.
     */
    size_t GetNumOwnedNodes(const std::vector<std::string> &sets);

    /**
     * @brief Get the number of owned elements in the given sets.
     * @param sets List of part names.
     */
    size_t GetNumOwnedElements(const std::vector<std::string> &sets);

    /**
     * @brief Get the number of entities in a selector and topology rank.
     * @param selector The selector to filter entities.
     * @param topo_rank The topology rank to filter by.
     * @return The number of entities matching the selector and topology rank.
     */
    size_t GetNumEntities(const aperi::Selector &selector, const aperi::FieldDataTopologyRank &topo_rank);

    /**
     * @brief Change the parts of entities on the host.
     * @param part_name The part to add.
     * @param topo_rank The topology rank.
     * @param indices_to_change Indices of entities to change.
     */
    void ChangePartsHost(const std::string &part_name, const aperi::FieldDataTopologyRank &topo_rank, const Kokkos::View<aperi::Index *> &indices_to_change);

    /**
     * @brief Mark a part for output in the results file.
     * @param part_name The part name.
     */
    void AddPartToOutput(const std::string &part_name);

    /**
     * @brief Declare a new face part in the mesh metadata.
     * @param part_name The part name.
     */
    void DeclareFacePart(const std::string &part_name);

    /**
     * @brief Declare a element part in the mesh metadata.
     * @param part_name The part name.
     * @param topology The element topology.
     */
    void DeclareElementPart(const std::string &part_name);

    /**
     * @brief Declare a node part in the mesh metadata.
     * @param part_name The part name.
     */
    void DeclareNodePart(const std::string &part_name);

    /**
     * @brief Declare a general part in the mesh metadata.
     * @param part_name The part name.
     */
    void DeclarePart(const std::string &part_name);

    /**
     * @brief Declare a field in the mesh metadata.
     * @param field The field data to declare.
     * @param part_names List of part names to assign the field to.
     */
    void DeclareField(const aperi::FieldData &field, const std::vector<std::string> &part_names);

    /**
     * @brief Declare multiple fields in the mesh metadata.
     * @param fields List of field data to declare.
     * @param part_names List of part names to assign the fields to.
     */
    void DeclareFields(const std::vector<aperi::FieldData> &fields, const std::vector<std::string> &part_names);

    /**
     * @brief Declare a field in the mesh metadata after the meta data has been committed.
     * @param field The field data to declare.
     * @param part_names List of part names to assign the field to.
     */
    void DeclareLateField(const aperi::FieldData &field, const std::vector<std::string> &part_names);

    /**
     * @brief Declare multiple fields in the mesh metadata after the meta data has been committed.
     * @param fields List of field data to declare.
     * @param part_names List of part names to assign the fields to.
     */
    void DeclareLateFields(const std::vector<aperi::FieldData> &fields, const std::vector<std::string> &part_names);

    /**
     * @brief Create exposed block boundary sides for a selector and part.
     * @param selector The selector for entities to skin.
     * @param part_name The part to assign to the skinned sides.
     */
    void CreateExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name);

    /**
     * @brief Check that exposed block boundary sides exist for a selector and part.
     * @param selector The selector for entities to check.
     * @param part_name The part to check.
     * @return True if the sides exist as expected.
     */
    bool CheckExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name) const;

   private:
    stk::mesh::BulkData *m_bulk_data;  ///< Pointer to the mesh bulk data.
};

}  // namespace aperi