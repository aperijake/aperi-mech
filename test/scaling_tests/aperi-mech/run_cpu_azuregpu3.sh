#!/bin/bash

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e4_hexes/rkpm
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e4_hexes/rkpm_nodal

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_8e4_tets/fem
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_8e4_tets/rkpm
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_8e4_tets/rkpm_nodal

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e5_hexes/rkpm
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e5_hexes/rkpm_nodal

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_6e5_tets/fem
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_6e5_tets/rkpm
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_6e5_tets/rkpm_nodal

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e6_hexes/rkpm
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e6_hexes/rkpm_nodal

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_5e6_tets/fem
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_5e6_tets/rkpm
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_5e6_tets/rkpm_nodal

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_1e7_hexes/rkpm

./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_4e7_tets/fem
./batch_run.sh -n 1 -e ~/aperi-mech/protego-mech/build/ -p 32,16,8,4,2,1 taylor_bar_4e7_tets/rkpm
