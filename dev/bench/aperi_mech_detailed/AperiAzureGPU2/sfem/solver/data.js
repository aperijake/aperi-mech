window.BENCHMARK_DATA = {
  "lastUpdate": 1750526144952,
  "repoUrl": "https://github.com/aperijake/aperi-mech",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "jake.koester@apericmc.com"
          },
          "committer": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "jake.koester@apericmc.com"
          },
          "id": "fc07725643253f9918d150ef2cfbd2662f13c5c6",
          "message": "better handle missing js files [skip ci]",
          "timestamp": "2025-06-21T16:21:12Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/fc07725643253f9918d150ef2cfbd2662f13c5c6"
        },
        "date": 1750526144491,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.001003,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.883804,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.838112,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000437,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 14.091642,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.046081,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 154.490716,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 107.112086,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.00433,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 101.920594,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000511,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.384403,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.818804,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.396422,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 22.936409,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.386792,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000097,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002531,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022328,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000088,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.494542,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.797161,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.204517,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.366167,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005837,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.346507,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 34.506122,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.899793,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.263049,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.004904,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000093,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011881,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 22.475961,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.143914,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000523,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 3.698806,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000202,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 6.009067,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 47.653056,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.492898,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001234,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000419,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000141,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.255508,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000386,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.304025,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005079,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.412819,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.255926,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004673,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.559494,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000141,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001234,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133749,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060965,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.139453,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.239967,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.060402,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012581,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.006704,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 14.020606,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.005795,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 51.276887,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.285411,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002412,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 14.57702,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}