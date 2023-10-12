#include <iostream>
#include <stk_util/parallel/Parallel.hpp>

int main(int argc, char *argv[])
{

    // Initialize MPI and get communicator for the current process
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Get the rank and number of processes
    int myRank = stk::parallel_machine_rank(comm);
    int numProcs = stk::parallel_machine_size(comm);

    // Print rank and number of processes
    std::cout << "Hello from process " << myRank << " out of " << numProcs << " processes." << std::endl;

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}