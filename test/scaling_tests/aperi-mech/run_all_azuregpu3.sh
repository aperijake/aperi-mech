#!/bin/bash

./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e5_hexes/rkpm
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e5_hexes/rkpm_nodal
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e5_hexes/rkpm_nodal_two_pass

./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e6_hexes/rkpm
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e6_hexes/rkpm_nodal
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e6_hexes/rkpm_nodal_two_pass

./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e7_hexes/rkpm

./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_4e7_tets/fem
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_4e7_tets/rkpm

./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_5e6_tets/fem
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_5e6_tets/rkpm
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_5e6_tets/rkpm_nodal

./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_6e5_tets/fem
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_6e5_tets/rkpm
./batch_run.sh -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_6e5_tets/rkpm_nodal

./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_1e5_hexes/rkpm
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_1e5_hexes/rkpm_nodal
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_1e5_hexes/rkpm_nodal_two_pass

./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_1e6_hexes/rkpm
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_1e6_hexes/rkpm_nodal
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_1e6_hexes/rkpm_nodal_two_pass

./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_1e7_hexes/rkpm

./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_4e7_tets/fem
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_4e7_tets/rkpm

./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_5e6_tets/fem
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_5e6_tets/rkpm
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_5e6_tets/rkpm_nodal

./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_6e5_tets/fem
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_6e5_tets/rkpm
./batch_run.sh -g -e ~/aperi-mech/protego-mech/build/ -p 1 taylor_bar_6e5_tets/rkpm_nodal
