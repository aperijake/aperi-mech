############# DEPENDENCIES #############
find_package(Kokkos REQUIRED PATHS ${Kokkos_ROOT} NO_DEFAULT_PATH)
find_package(Trilinos REQUIRED PATHS ${TRILINOS_PATH}/lib/cmake/Trilinos ${TRILINOS_PATH} NO_DEFAULT_PATH)
find_package(Eigen3 REQUIRED PATHS ${EIGEN_PATH}/lib/cmake/eigen3 ${EIGEN_PATH}/share/eigen3/cmake ${EIGEN_PATH} NO_DEFAULT_PATH)
find_package(GTest REQUIRED PATHS ${GTEST_PATH}/lib/cmake/GTest ${GTEST_PATH} NO_DEFAULT_PATH)
find_package(yaml-cpp REQUIRED PATHS ${YAML-CPP_PATH}/lib/cmake/yaml-cpp ${YAML-CPP_PATH} NO_DEFAULT_PATH)
find_path(MPI_INCLUDE_PATH NAMES mpi.h PATHS ${OPENMPI_PATH}/include ${OPENMPI_PATH}/include/openmpi-mp NO_DEFAULT_PATH)
find_library(MPI_LIBRARIES NAMES mpi PATHS ${OPENMPI_PATH}/lib ${OPENMPI_PATH}/lib/openmpi-mp NO_DEFAULT_PATH)
find_package(Compadre REQUIRED PATHS ${COMPADRE_PATH}/lib/cmake/Compadre ${COMPADRE_PATH} NO_DEFAULT_PATH)