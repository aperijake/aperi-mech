#pragma once

#include <Eigen/Core>
#include <memory>
#include <string>
#include <vector>

namespace aperi {
struct FieldData;
class MeshData;
}  // namespace aperi

void CheckPartitionOfUnity(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, double tolerance = 1.0e-12);

void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& shape_function_derivatives, double tolerance = 1.0e-12);

void CheckLinearCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);

void CheckQuadraticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);

void CheckCubicCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);

void CheckQuarticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);

// TODO(jake): Required Fields should be handled in the ShapeFunction classes
std::vector<aperi::FieldData> GetReproducingKernelShapeFunctionFields();

void ComputeReproducingKernelShapeFunctions(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::vector<std::string>& part_names = {"block_1"}, const std::vector<double>& kernel_radius_scale_factors = {1.1});