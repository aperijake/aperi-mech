############# VERSION INFO #############
# Get the latest abbreviated commit hash of the working branch
execute_process(
	COMMAND git rev-parse --short HEAD
	WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
	OUTPUT_VARIABLE GIT_COMMIT_HASH
	OUTPUT_STRIP_TRAILING_WHITESPACE
)

# Check if there are any uncommitted changes or untracked files
execute_process(
	COMMAND git status --porcelain
	WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
	OUTPUT_VARIABLE GIT_STATUS_OUTPUT
	OUTPUT_STRIP_TRAILING_WHITESPACE
)

if ("${GIT_STATUS_OUTPUT}" STREQUAL "")
	set(GIT_DIRTY "clean")
else()
	set(GIT_DIRTY "dirty")
endif()

# Get the current branch name
execute_process(
	COMMAND git rev-parse --abbrev-ref HEAD
	WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
	OUTPUT_VARIABLE GIT_BRANCH
	OUTPUT_STRIP_TRAILING_WHITESPACE
)

# Get the latest tag
execute_process(
	COMMAND git describe --tags --abbrev=0
	WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
	OUTPUT_VARIABLE GIT_TAG
	OUTPUT_STRIP_TRAILING_WHITESPACE
)

# Set the build type and the date and time of the build
set(BUILD_TYPE ${CMAKE_BUILD_TYPE})
string(TIMESTAMP BUILD_DATE "%Y-%m-%d")
string(TIMESTAMP BUILD_TIME "%H:%M:%S")

IF(USE_GPU)
	set(GPU_OR_CPU "GPU")
else()
	set(GPU_OR_CPU "CPU")
endif()

IF(USE_PROTEGO_MECH)
    set(PROTEGO_MECH "ON")
else()
    set(PROTEGO_MECH "OFF")
endif()

# Generate git_commit.h with the current hash
configure_file(
	${CMAKE_SOURCE_DIR}/include/git_commit.h.in
	${CMAKE_BINARY_DIR}/generated/git_commit.h
)