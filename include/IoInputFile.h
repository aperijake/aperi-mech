#pragma once
#include <stdexcept>  // for runtime_error
#include <string>     // for string

namespace YAML {
class Node;
}

class IoInputFile {
   public:
    IoInputFile(std::string filename) : m_filename(filename) {
        int return_code = Read(m_filename);
        if (return_code != 0) throw std::runtime_error("Error reading input file");
    };

    int Read(const std::string& filename);
    static int Write(const std::string& filename, const YAML::Node& yaml_data);

    std::string GetMeshFile() const { return m_mesh_file; }
    std::string GetOutputFile() const { return m_output_file; }

   private:
    std::string m_filename;

    std::string m_mesh_file;    // mesh file
    std::string m_output_file;  // output file
};