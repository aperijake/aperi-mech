############# BUILD SETTINGS #############
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CUDA_STANDARD 14)

# Set the project languages
enable_language(CXX)
IF(USE_GPU)
    enable_language(CUDA)
    set(CUDA_SEPARABLE_COMPILATION ON)
ENDIF()

# Set the path to project-specific custom modules
list(APPEND CMAKE_MODULE_PATH "${CMAKE_SOURCE_DIR}/cmake")