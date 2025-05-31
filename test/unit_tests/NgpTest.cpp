#include <gtest/gtest.h>

#include <stk_io/FillMesh.hpp>
#include <stk_mesh/base/Bucket.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Entity.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Ngp.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpMesh.hpp>

void RunForEach(const stk::mesh::MetaData& meta, const stk::mesh::NgpMesh& ngp_mesh, stk::mesh::NgpField<int>& ngp_field, int field_val, stk::mesh::EntityRank rank) {
    stk::mesh::for_each_entity_run(
        ngp_mesh, rank, meta.universal_part(), KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex& entity) {
            ngp_field(entity, 0) = field_val;
        });
}

TEST(NgpMesh, MeshIndices) {
    if (stk::parallel_machine_size(MPI_COMM_WORLD) > 1) {
        return;
    }

    std::shared_ptr<stk::mesh::BulkData> bulk = stk::mesh::MeshBuilder(MPI_COMM_WORLD).create();
    bulk->mesh_meta_data().use_simple_fields();
    stk::mesh::MetaData& meta = bulk->mesh_meta_data();

    stk::mesh::EntityRank rank = stk::topology::ELEMENT_RANK;
    unsigned num_states = 1;

    const int init = 1;
    stk::mesh::Field<int>& field = meta.declare_field<int>(rank, "field_1", num_states);
    stk::mesh::put_field_on_mesh(field, meta.universal_part(), &init);

    stk::io::fill_mesh("generated:1x1x1", *bulk);
    field.sync_to_device();
    stk::mesh::NgpMesh& ngp_mesh = stk::mesh::get_updated_ngp_mesh(*bulk);
    stk::mesh::NgpField<int>& ngp_field = stk::mesh::get_updated_ngp_field<int>(field);
    int field_val = 5;

    RunForEach(meta, ngp_mesh, ngp_field, field_val, rank);

    ngp_field.modify_on_device();
    ngp_field.sync_to_host();

    stk::mesh::EntityId id = 1;
    stk::mesh::Entity entity = bulk->get_entity(rank, id);
    int* p_data = stk::mesh::field_data(field, entity);

    ASSERT_EQ(field_val, p_data[0]);
}
