#include <iostream>
#include <stk_util/parallel/Parallel.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_io/FillMesh.hpp>
#include <stk_io/IossBridge.hpp>
#include <stk_io/StkMeshIoBroker.hpp>
#include <Ioss_ElementBlock.h>
#include <Ioss_NodeBlock.h>

std::vector<int> get_element_block_sizes(const Ioss::Region& region)
{
    std::vector<int> element_block_sizes;
    const Ioss::ElementBlockContainer &elem_blocks = region.get_element_blocks();
    for (Ioss::ElementBlockContainer::const_iterator it = elem_blocks.begin(); it != elem_blocks.end(); ++it)
    {
        Ioss::ElementBlock *entity = *it;
        if (stk::io::include_entity(entity))
        {
            element_block_sizes.push_back(entity->get_property("entity_count").get_int());
        }
    }
    return element_block_sizes;
}

void process_nodeblocks(const Ioss::Region& region, const stk::mesh::BulkData& bulk)
{
    const Ioss::NodeBlockContainer &node_blocks = region.get_node_blocks();
    assert(node_blocks.size() == 1);

    Ioss::NodeBlock *nb = node_blocks[0];

    std::vector<stk::mesh::Entity> nodes = stk::io::get_input_entity_list(nb, stk::topology::NODE_RANK, bulk);
    std::cout << "num nodes: " << nodes.size() << std::endl;

    const stk::mesh::MetaData &meta = bulk.mesh_meta_data();
    stk::mesh::Field<double> *coord_field = meta.get_field<double>(stk::topology::NODE_RANK, "coordinates");

    stk::io::field_data_from_ioss(bulk, coord_field, nodes, nb, "mesh_model_coordinates");
}

void process_blocks_and_sets(const stk::io::StkMeshIoBroker& ioBroker)
{
    const stk::mesh::MetaData& meta = ioBroker.meta_data();
    std::cout << "has mesh: " << meta.has_mesh() << std::endl;
    std::cout << "coordinate field name: " << meta.coordinate_field_name() << std::endl;

    const stk::mesh::PartVector &all_parts = meta.get_parts();
    stk::mesh::PartVector parts;
    std::vector<std::string> partNames;
    //std::vector<std::string> ssNames;
    //std::vector<std::string> nsNames;
    int num_element_blocks = 0;

    for (stk::mesh::PartVector::const_iterator i = all_parts.begin(); i != all_parts.end(); ++i)
    {
        stk::mesh::Part *const part = *i;

        if (!stk::mesh::is_auto_declared_part(*part))
        {
            if (part->primary_entity_rank() == stk::topology::ELEMENT_RANK)
            {
                //*out << "IOSS-STK: Element part \"" << part->name() << "\" found " << std::endl;
                parts.push_back(part);
                partNames.push_back(part->name());
                std::cout << "part name: " << partNames.back() << std::endl;
                num_element_blocks++;
            }
            //else if (part->primary_entity_rank() == stk::topology::NODE_RANK)
            //{
            //    //*out << "Mesh has Node Set ID: " << part->name() << std::endl;
            //    nsPartVec[part->name()] = part;
            //    nsNames.push_back(part->name());
            //}
            //else if (part->primary_entity_rank() == metaData->side_rank())
            //{
            //    // print(*out, "Found side_rank entity:\n", *part);
            //    ssPartVec[part->name()] = part;
            //}
        }
    }

    const Ioss::Region &region = *ioBroker.get_input_ioss_region();

    const std::vector<int> element_block_size = get_element_block_sizes(region);
    std::cout << "num blocks: " << element_block_size.size() << std::endl;
    for (auto& bs : element_block_size){
        std::cout << "num elements: " << bs << std::endl;
    }

    process_nodeblocks(region, ioBroker.bulk_data());
}

void mesh_read(const std::string &filename, const stk::ParallelMachine &comm)
{
    stk::mesh::MeshBuilder builder(comm);
    std::shared_ptr<stk::mesh::BulkData> bulk = builder.create();
    stk::io::StkMeshIoBroker ioBroker(comm);
    ioBroker.set_bulk_data(bulk);
    size_t input_index = ioBroker.add_mesh_database(filename, stk::io::READ_MESH);
    ioBroker.set_active_mesh(input_index);
    ioBroker.create_input_mesh();
    ioBroker.add_all_mesh_fields_as_input_fields(stk::io::MeshField::CLOSEST);
    ioBroker.populate_bulk_data();

    process_blocks_and_sets(ioBroker);
}

int main(int argc, char *argv[])
{
    // Initialize MPI and get communicator for the current process
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Get the rank and number of processes
    int myRank = stk::parallel_machine_rank(comm);
    int numProcs = stk::parallel_machine_size(comm);

    // Print rank and number of processes
    std::cout << "Hello from process " << myRank << " out of " << numProcs << " processes." << std::endl;

    std::string input_base_filename = "cylinder.exo";
    mesh_read(input_base_filename, comm);

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}