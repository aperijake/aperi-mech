############# TARGETS #############
### aperi-mech ###
file(GLOB_RECURSE LIB_SOURCES "src/*.cpp")
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

# Install executables
install(TARGETS aperi-mech material_driver
    RUNTIME DESTINATION bin
)

# Install unit_tests if built
if(TARGET unit_tests)
    install(TARGETS unit_tests
        RUNTIME DESTINATION bin
    )
endif()

# Optionally install scripts and test/data directories
install(DIRECTORY ${CMAKE_SOURCE_DIR}/test/unit_tests/test_inputs DESTINATION share/aperi-mech)
install(DIRECTORY ${CMAKE_SOURCE_DIR}/test/material_tests DESTINATION share/aperi-mech)
install(DIRECTORY ${CMAKE_SOURCE_DIR}/test/utils DESTINATION share/aperi-mech)
install(PROGRAMS ${CMAKE_SOURCE_DIR}/test/run_material_tests.sh DESTINATION bin)
install(PROGRAMS ${CMAKE_SOURCE_DIR}/test/run_utils_modules_tests.sh DESTINATION bin)

# Create a symlink in the install bin directory to ../share so tests can find data
install(CODE "
    execute_process(
        COMMAND \${CMAKE_COMMAND} -E create_symlink ../share share
        WORKING_DIRECTORY \"\${CMAKE_INSTALL_PREFIX}/bin\"
    )
")