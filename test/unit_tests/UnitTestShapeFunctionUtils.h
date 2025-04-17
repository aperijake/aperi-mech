#pragma once

#include <Eigen/Core>

// Shape Function Utils
void CheckPartitionOfUnity(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, double tolerance = 1.0e-12);
void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& shape_function_derivatives, double tolerance = 1.0e-12);
void CheckLinearCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);
void CheckQuadraticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);
void CheckCubicCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);
void CheckQuarticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);