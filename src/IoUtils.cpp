#include "IoUtils.h"

IoInputFile ReadInputFile(const std::string& filename) {
    IoInputFile io_input_file(filename);
    return io_input_file;
}

IoMesh ReadMesh(stk::ParallelMachine comm, const std::string& filename, std::function<void(stk::mesh::MetaData&)> create_fields) {
    // Create an IO mesh object
    IoMeshParameters io_mesh_parameters;  // Default parameters
    IoMesh io_mesh(comm, io_mesh_parameters);

    // Read the mesh
    std::string type = "exodusii";  // File type.  One of: exodusii
    io_mesh.ReadMesh(type, filename, create_fields);

    return io_mesh;
}

void WriteResults(IoMesh& io_mesh, const std::string& filename) {
    stk::io::HeartbeatType heartbeat_type = stk::io::NONE;  // Format of heartbeat output. One of binary = stk::io::NONE, stk::io::BINARY, stk::io::CSV, stk::io::TS_CSV, stk::io::TEXT, stk::io::TS_TEXT, stk::io::SPYHIS;
    int interpolation_intervals = 0;                        // Number of intervals to divide each input time step into
    io_mesh.WriteFieldResults(filename, heartbeat_type, interpolation_intervals);
}
