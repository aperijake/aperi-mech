#pragma once
#include <string>  // for string
#include <stdexcept>  // for runtime_error

namespace YAML {
class Node;
}

class IoInputFile {
   public:
    IoInputFile(std::string filename) : m_filename(filename) {
        int return_code = Read(m_filename);
        if (return_code != 0) throw std::runtime_error("Error reading input file");
    };

    static int Read(const std::string& filename);
    static int Write(const std::string& filename, const YAML::Node& yaml_data);

   private:

    std::string m_filename;
};