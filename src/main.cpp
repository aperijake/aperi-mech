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

int main(int argc, char *argv[]) {
    // Initialize MPI and get communicator for the current process
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Get the rank and number of processes
    int my_rank = stk::parallel_machine_rank(comm);
    int num_procs = stk::parallel_machine_size(comm);

    // Print rank and number of processes
    std::cout << "Hello from process " << my_rank << " out of " << num_procs << " processes." << std::endl;

    IoMesh io_mesh_driver(comm);

    // io_mesh_driver.SetAddEdges(add_edges); //  create all internal edges in the mesh (default is false): true|false"
    // io_mesh_driver.SetAddFaces(add_faces); //  create all internal faces in the mesh (default is false): true|false"
    // io_mesh_driver.SetUpwardConnectivity(upward_connectivity); //  create upward connectivity/adjacency in the mesh (default is true): true|false"
    // io_mesh_driver.SetAuraOption(aura_option); //  create aura ghosting around each MPI rank (default is false): true|false"
    // io_mesh_driver.SetInitialBucketCapacity(initial_bucket_capacity); //  "initial bucket capacity"
    // io_mesh_driver.SetMaximumBucketCapacity(maximum_bucket_capacity); //  "maximum bucket capacity"

    std::string parallel_io = "pnetcdf";          // Method to use for parallel io. One of mpiio, mpiposix, or pnetcdf
    std::string working_directory = "./";         // working directory with trailing '/'
    std::string input_filename = "cylinder.exo";  // mesh file. Use name of form 'gen:NxMxL' to internally generate a hex mesh of size N by M by L intervals. See GeneratedMesh documentation for more options. Can also specify a filename. The generated mesh will be output to the file 'generated_mesh.out'
    std::string type = "exodusii";
    std::string decomp_method = "rcb";               // decomposition method.  One of: linear, rcb, rib, hsfc, block, cyclic, random, kway, geom_kway, metis_sfc
    bool compose_output = false;                     //  create a single output file: true|false"
    int compression_level = 0;                       //  compression level [1..9] to use
    bool compression_shuffle = false;                //  use shuffle filter prior to compressing data: true|false
    bool lc_names = true;                            // convert variable names to lowercase and replace spaces in names with underscore
    int integer_size = 4;                            // use 4 or 8-byte integers for input and output
    stk::io::HeartbeatType hb_type = stk::io::NONE;  // Format of heartbeat output. One of binary = stk::io::NONE, stk::io::BINARY, stk::io::CSV, stk::io::TS_CSV, stk::io::TEXT, stk::io::TS_TEXT, stk::io::SPYHIS;
    int interpolation_intervals = 0;                 // number of intervals to divide each input time step into

    io_mesh_driver.Driver(parallel_io,
                          working_directory, input_filename, type, decomp_method, compose_output,
                          compression_level, compression_shuffle, lc_names, integer_size, hb_type,
                          interpolation_intervals);

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}