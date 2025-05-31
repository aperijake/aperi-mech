############# TARGETS #############
### aperi-mech ###
file(GLOB LIB_SOURCES "src/*.cpp")
list(REMOVE_ITEM LIB_SOURCES "${CMAKE_SOURCE_DIR}/src/main.cpp")
list(REMOVE_ITEM LIB_SOURCES "${CMAKE_SOURCE_DIR}/src/material_driver_main.cpp")

# Add the library
add_library(aperimech ${LIB_SOURCES})
target_link_libraries(aperimech
    yaml-cpp::yaml-cpp
    Eigen3::Eigen
    ${Trilinos_LIBRARIES}
    ${Trilinos_TPL_LIBRARIES}
    ${MPI_LIBRARIES}
    ${EXTRA_LIBS}
    Kokkos::kokkos
    Compadre::compadre
)
target_include_directories(aperimech PUBLIC
    "${CMAKE_SOURCE_DIR}/include/"
    ${Trilinos_TPL_INCLUDE_DIRS}
    ${Trilinos_INCLUDE_DIRS}
    ${Kokkos_INCLUDE_DIRS}
    ${MPI_INCLUDE_PATH}
)

# Conditionally include protego-mech
if(USE_PROTEGO_MECH)
    add_subdirectory(protego-mech)
    target_link_libraries(aperimech protegomech)
    target_compile_definitions(aperimech PRIVATE USE_PROTEGO_MECH)
endif()

# Add the executable
set(MAIN_SOURCES
    src/main.cpp;
)
add_executable(aperi-mech ${MAIN_SOURCES})
target_link_libraries(aperi-mech
    aperimech
    ${MPI_LIBRARIES}
)
target_include_directories(aperi-mech PUBLIC
    "${CMAKE_SOURCE_DIR}/include/"
    "${CMAKE_BINARY_DIR}/generated/"
    ${MPI_INCLUDE_PATH}
)

############# Material Driver #############
add_executable(material_driver
    src/material_driver_main.cpp
)
target_link_libraries(material_driver
    aperimech
    ${MPI_LIBRARIES}
)
target_include_directories(material_driver PRIVATE
    "${CMAKE_SOURCE_DIR}/include/"
    ${MPI_INCLUDE_PATH}
)

install(TARGETS aperi-mech)