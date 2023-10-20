#include <Ioss_ElementBlock.h>
#include <Ioss_IOFactory.h>
#include <Ioss_NodeBlock.h>

#include <cstddef>
#include <iostream>
#include <stk_io/FillMesh.hpp>
#include <stk_io/IossBridge.hpp>
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_util/parallel/Parallel.hpp>

#include "../include/IoMesh.h"

std::vector<int> GetElementBlockSizes(const Ioss::Region &region) {
    std::vector<int> element_block_sizes;
    const Ioss::ElementBlockContainer &elem_blocks = region.get_element_blocks();
    for (Ioss::ElementBlockContainer::const_iterator it = elem_blocks.begin(); it != elem_blocks.end(); ++it) {
        Ioss::ElementBlock *p_entity = *it;
        if (stk::io::include_entity(p_entity)) {
            element_block_sizes.push_back(p_entity->get_property("entity_count").get_int());
        }
    }
    return element_block_sizes;
}

void ProcessNodeBlocks(const Ioss::Region &region, const stk::mesh::BulkData &bulk) {
    const Ioss::NodeBlockContainer &node_blocks = region.get_node_blocks();
    assert(node_blocks.size() == 1);

    Ioss::NodeBlock *p_node_block = node_blocks[0];

    std::vector<stk::mesh::Entity> nodes = stk::io::get_input_entity_list(p_node_block, stk::topology::NODE_RANK, bulk);
    std::cout << "num nodes: " << nodes.size() << std::endl;

    const stk::mesh::MetaData &meta = bulk.mesh_meta_data();
    stk::mesh::Field<double> *coord_field = meta.get_field<double>(stk::topology::NODE_RANK, "coordinates");

    stk::io::field_data_from_ioss(bulk, coord_field, nodes, p_node_block, "mesh_model_coordinates");
}

void ProcessBlocksAndSets(const stk::io::StkMeshIoBroker &ioBroker) {
    const stk::mesh::MetaData &meta = ioBroker.meta_data();
    std::cout << "has mesh: " << meta.has_mesh() << std::endl;
    std::cout << "coordinate field name: " << meta.coordinate_field_name() << std::endl;

    const stk::mesh::PartVector &all_parts = meta.get_parts();
    stk::mesh::PartVector parts;
    std::vector<std::string> part_names;
    // std::vector<std::string> ssNames;
    // std::vector<std::string> nsNames;
    int num_element_blocks = 0;

    for (stk::mesh::PartVector::const_iterator ip = all_parts.begin(); ip != all_parts.end(); ++ip) {
        stk::mesh::Part *const kp_part = *ip;

        if (!stk::mesh::is_auto_declared_part(*kp_part)) {
            if (kp_part->primary_entity_rank() == stk::topology::ELEMENT_RANK) {
                //*out << "IOSS-STK: Element part \"" << part->name() << "\" found " << std::endl;
                parts.push_back(kp_part);
                part_names.push_back(kp_part->name());
                std::cout << "part name: " << part_names.back() << std::endl;
                num_element_blocks++;
            }
            // else if (part->primary_entity_rank() == stk::topology::NODE_RANK)
            //{
            //     //*out << "Mesh has Node Set ID: " << part->name() << std::endl;
            //     nsPartVec[part->name()] = part;
            //     nsNames.push_back(part->name());
            // }
            // else if (part->primary_entity_rank() == metaData->side_rank())
            //{
            //     // print(*out, "Found side_rank entity:\n", *part);
            //     ssPartVec[part->name()] = part;
            // }
        }
    }

    const Ioss::Region &region = *ioBroker.get_input_ioss_region();

    const std::vector<int> element_block_size = GetElementBlockSizes(region);
    std::cout << "num blocks: " << element_block_size.size() << std::endl;
    for (auto &bs : element_block_size) {
        std::cout << "num elements: " << bs << std::endl;
    }

    ProcessNodeBlocks(region, ioBroker.bulk_data());
}

void MeshRead(const std::string &filename, const stk::ParallelMachine &comm) {
    stk::mesh::MeshBuilder builder(comm);
    std::shared_ptr<stk::mesh::BulkData> bulk = builder.create();
    stk::io::StkMeshIoBroker ioBroker(comm);
    ioBroker.set_bulk_data(bulk);
    size_t input_index = ioBroker.add_mesh_database(filename, stk::io::READ_MESH);
    ioBroker.set_active_mesh(input_index);
    ioBroker.create_input_mesh();
    ioBroker.add_all_mesh_fields_as_input_fields(stk::io::MeshField::CLOSEST);
    ioBroker.populate_bulk_data();

    ProcessBlocksAndSets(ioBroker);
}

void PutFieldData(stk::mesh::BulkData &bulk, stk::mesh::Part &part, stk::mesh::EntityRank part_type, Ioss::GroupingEntity *io_entity, Ioss::Field::RoleType filter_role) {
    std::vector<stk::mesh::Entity> entities;
    stk::io::OutputParams params(bulk);
    stk::io::get_output_entity_list(io_entity, part_type, params, entities);

    stk::mesh::MetaData &meta = stk::mesh::MetaData::get(part);
    const std::vector<stk::mesh::FieldBase *> &fields = meta.get_fields();

    std::vector<stk::mesh::FieldBase *>::const_iterator i = fields.begin();
    while (i != fields.end()) {
        const stk::mesh::FieldBase *p_field = *i;
        ++i;
        if (stk::io::is_valid_part_field(p_field, part_type, part, filter_role)) {
            stk::io::field_data_to_ioss(bulk, p_field, entities, io_entity, p_field->name(), filter_role);
        }
    }
}

void WriteStep(Ioss::Region &region, stk::mesh::BulkData &bulk, int step) {
    region.begin_state(step);
    // Special processing for node block (all nodes in model)...
    const stk::mesh::MetaData &meta = bulk.mesh_meta_data();

    PutFieldData(bulk, meta.universal_part(), stk::topology::NODE_RANK,
                 region.get_node_blocks()[0], Ioss::Field::TRANSIENT);

    const stk::mesh::PartVector &all_parts = meta.get_parts();
    for (stk::mesh::PartVector::const_iterator ip = all_parts.begin(); ip != all_parts.end(); ++ip) {
        stk::mesh::Part *const kp_part = *ip;

        const stk::mesh::EntityRank part_rank = kp_part->primary_entity_rank();

        // Check whether this part should be output to results database.
        if (stk::io::is_part_io_part(*kp_part)) {
            // Get Ioss::GroupingEntity corresponding to this part...
            Ioss::GroupingEntity *p_entity = region.get_entity(kp_part->name());
            if (p_entity != nullptr) {
                if (p_entity->type() == Ioss::SIDESET) {
                    // Ioss::SideSet *sideset = dynamic_cast<Ioss::SideSet *>(entity);
                    // assert(sideset != nullptr);
                    // int block_count = sideset->block_count();

                    // for (int i = 0; i < block_count; i++)
                    //{
                    //     Ioss::SideBlock *side_block = sideset->get_block(i);
                    //     /// \todo REFACTOR Need filtering mechanism.
                    //     put_field_data(bulk, *part, part_rank, side_block, Ioss::Field::TRANSIENT);
                    // }
                } else {
                    PutFieldData(bulk, *kp_part, part_rank, p_entity, Ioss::Field::TRANSIENT);
                }
            } else {
                /// \todo IMPLEMENT handle error... Possibly an assert since
                /// I think the corresponding entity should always exist...
            }
        }
    }
    region.end_state(step);
}

void MeshWrite(const std::string &output_base_filename, Ioss::Region &region, stk::mesh::BulkData &bulk, int step) {
    // TODO(jake): Finish this
    // std::cout << "Creating output file: " << output_base_filename << "\n";
    // Ioss::DatabaseIO *dbo = Ioss::IOFactory::create("exodusII", output_base_filename, Ioss::WRITE_RESULTS, MPI_COMM_WORLD);
    // if (dbo == nullptr || !dbo->ok())
    //{
    //    std::cerr << "ERROR: Could not open results database '" << output_base_filename << "'\n";
    //    std::exit(EXIT_FAILURE);
    //}

    //// NOTE: 'out_region' owns 'dbo' pointer at this time...
    // Ioss::Region out_region(dbo, "results_output");

    // stk::io::OutputParams params(out_region, *bulk_data);
    // stk::io::define_output_db(params, {}, &in_region);
    // stk::io::write_output_db(params);

    //// ------------------------------------------------------------------------
    ///** \todo REFACTOR A real app would register a subset of the
    // * fields on the mesh database as fields that the app would want
    // * read at one or all or specified steps.  In this example, all
    // * fields existing on the input mesh database are defined on the
    // * parts in the stk::mesh.
    // *
    // * The real app would also only register a subset of the stk::mesh
    // * fields as output fields and would probably have a mapping from
    // * the internally used name to some name picked by the user. In
    // * this example, all Ioss::Field::TRANSIENT fields defined on the stk::mesh are
    // * output to the results database and the internal stk::mesh field
    // * name is used as the name on the database....
    // */

    // out_region.begin_mode(Ioss::STATE_DEFINE_TRANSIENT);

    //// Special processing for node_block (all nodes in model)...
    // stk::io::ioss_add_fields(fem_meta_data.universal_part(), stk::topology::NODE_RANK,
    //                          out_region.get_node_blocks()[0],
    //                          Ioss::Field::TRANSIENT);

    // const stk::mesh::PartVector &all_parts = fem_meta_data.get_parts();
    // for (stk::mesh::PartVector::const_iterator
    //          ip = all_parts.begin();
    //      ip != all_parts.end(); ++ip)
    //{

    //    stk::mesh::Part *const part = *ip;

    //    const stk::mesh::EntityRank part_rank = part->primary_entity_rank();

    //    // Check whether this part should be output to results database.
    //    if (stk::io::is_part_io_part(*part))
    //    {
    //        // Get Ioss::GroupingEntity corresponding to this part...
    //        Ioss::GroupingEntity *entity = out_region.get_entity(part->name());
    //        if (entity != nullptr)
    //        {
    //            if (entity->type() == Ioss::SIDESET)
    //            {
    //                Ioss::SideSet *sideset = dynamic_cast<Ioss::SideSet *>(entity);
    //                assert(sideset != nullptr);
    //                int block_count = sideset->block_count();
    //                for (int i = 0; i < block_count; i++)
    //                {
    //                    Ioss::SideBlock *fb = sideset->get_block(i);
    //                    stk::io::ioss_add_fields(*part, part_rank, fb, Ioss::Field::TRANSIENT);
    //                }
    //            }
    //            else
    //            {
    //                stk::io::ioss_add_fields(*part, part_rank, entity, Ioss::Field::TRANSIENT);
    //            }
    //        }
    //        else
    //        {
    //            /// \todo IMPLEMENT handle error... Possibly an assert since
    //            /// I think the corresponding entity should always exist...
    //        }
    //    }
    //}
    // out_region.end_mode(Ioss::STATE_DEFINE_TRANSIENT);
    //// ------------------------------------------------------------------------

    //// Read and Write transient fields...
    // out_region.begin_mode(Ioss::STATE_TRANSIENT);
    // int timestep_count = in_region.get_property("state_count").get_int();
    // for (int step = 1; step <= timestep_count; step++)
    //{
    //     double time = in_region.get_state_time(step);

    //    // Read data from the io input mesh database into stk::mesh fields...
    //    process_input_request(in_region, *bulk_data, step);

    //    // execute()

    //    // Write data from the stk::mesh fields out to the output database.a
    //    int out_step = out_region.add_state(time);
    //    process_output_request(out_region, *bulk_data, out_step);
    //}
    // out_region.end_mode(Ioss::STATE_TRANSIENT);
}

int main(int argc, char *argv[]) {
    // Initialize MPI and get communicator for the current process
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Get the rank and number of processes
    int my_rank = stk::parallel_machine_rank(comm);
    int num_procs = stk::parallel_machine_size(comm);

    // Print rank and number of processes
    std::cout << "Hello from process " << my_rank << " out of " << num_procs << " processes." << std::endl;

    IoMesh io_mesh_driver(comm);

    std::string input_base_filename = "cylinder.exo";
    MeshRead(input_base_filename, comm);

    std::string output_base_filename = "cylinder_out.exo";
    // MeshWrite(Ioss::Region &region, stk::mesh::BulkData &bulk, int step)

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}