window.BENCHMARK_DATA = {
  "lastUpdate": 1761715243252,
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
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "9ab928504a9e44bc1507576303badbabb2937416",
          "message": "Merge pull request #118 from aperijake/search_update [skip ci]\n\nstop using old timer",
          "timestamp": "2025-06-21T23:07:20Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9ab928504a9e44bc1507576303badbabb2937416"
        },
        "date": 1750550641976,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000433,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.001016,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000466,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 14.110179,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.421424,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000526,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.618798,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.929165,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 152.754672,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 22.98957,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000096,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000105,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005084,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.395157,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 100.607615,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.115732,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00246,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022179,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.046255,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 105.604184,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.856036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000095,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.3725,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.253217,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.11979,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011834,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005069,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.208837,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 47.81856,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.910696,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.505863,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.296587,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000325,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 6.071598,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.511468,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.150971,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 34.65632,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 3.723396,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000551,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.000962,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 23.299374,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005777,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 14.211679,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.311978,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.259826,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.00014,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000128,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 50.084575,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.135395,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012417,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.060035,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060845,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005119,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.263821,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.006622,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.00223,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.418384,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.267678,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 13.650131,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.137192,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.551602,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 24.894496,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000452,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004378,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001208,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.004014,
            "unit": "seconds"
          }
        ]
      },
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
          "id": "1b7344351ed8bfd62f5e5fd5b750aa881f1d4517",
          "message": "clean up output",
          "timestamp": "2025-06-24T18:44:31Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/1b7344351ed8bfd62f5e5fd5b750aa881f1d4517"
        },
        "date": 1750802626873,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.785822,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 22.896678,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.378753,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 149.768515,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.776665,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 98.009901,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 103.049079,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.412187,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.02219,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.0001,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.004843,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000097,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000495,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002461,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 23.778606,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000426,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000979,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.908622,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 14.036816,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.051331,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.000781,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 5.885817,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011703,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 32.699311,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.083763,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005668,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 3.620714,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.472552,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 45.547237,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000216,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.004238,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000119,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.50279,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.246864,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000089,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.855968,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.256888,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.19533,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.198291,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000449,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 21.179009,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.443403,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.276047,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.006788,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 24.554482,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001234,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.05989,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.011744,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.004695,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 13.281609,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004289,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000404,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 49.874624,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 8.94247,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.401038,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000137,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002405,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.561971,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060968,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.05427,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 2.97489,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.003887,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.250127,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.139475,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 13.826195,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.128203,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "b31183f83e0682cedf01594d17f219c0fd7ae6fb",
          "message": "Merge pull request #119 from aperijake/pinball_contact [skip ci]\n\nPinball contact, initial pieces",
          "timestamp": "2025-06-29T19:08:55Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/b31183f83e0682cedf01594d17f219c0fd7ae6fb"
        },
        "date": 1751227865490,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.509841,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.379787,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.004478,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 14.490241,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022511,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.577991,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000106,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000078,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.148807,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 156.355373,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.046098,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 108.060755,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 104.095123,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.655956,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.826978,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.001019,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.00045,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 23.741525,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000128,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000456,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002413,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.208263,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 32.801829,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.000883,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 21.600052,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.004432,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 5.929635,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.478667,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 45.729479,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 3.645242,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005817,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.46007,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000468,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.206217,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.108637,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011864,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.860102,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.428062,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000221,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.263081,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000083,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000086,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.198161,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.389119,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002373,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000447,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.26759,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005101,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.004261,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.669209,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000151,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.232024,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004716,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.12901,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000134,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.062236,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.139268,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012493,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.060206,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000146,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.252885,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 14.340308,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.006896,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001076,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.266511,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 50.679755,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 13.789238,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.405798,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "096c52152e4a3da137c0282f0b2a83b07fbf132d",
          "message": "Merge pull request #120 from aperijake/pinball_contact [skip ci]\n\nworking pinball contact",
          "timestamp": "2025-07-05T23:41:41Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/096c52152e4a3da137c0282f0b2a83b07fbf132d"
        },
        "date": 1751762634430,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.887632,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.395358,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000982,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 16.516751,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 145.130686,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.378069,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.005332,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 104.46385,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000112,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.106225,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 100.117635,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000215,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000094,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.04647,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.807625,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000467,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000414,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 7.790432,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022415,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002589,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.004847,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.223655,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000134,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.496319,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.26897,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 11.181899,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 35.166453,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.263883,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.484376,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000084,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.200853,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006235,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.122224,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.883324,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000086,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005558,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.282864,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 46.520358,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011652,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.000991,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000552,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 23.149859,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000274,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 1.999595,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.409847,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.2549,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.060472,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.003981,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000129,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000153,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 7.280655,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060706,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 6.724993,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.687877,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 24.925826,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.006646,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.199636,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002143,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.004969,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.672854,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 43.908559,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.132013,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012352,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.135382,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.00131,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.16587,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.275664,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004573,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "6f1ba715148123c492f3e2804f3c254dfed0af17",
          "message": "Merge pull request #121 from aperijake/trilinos_update [skip ci]\n\nupdate spack setup due to new spack-based build process",
          "timestamp": "2025-07-10T20:51:40Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/6f1ba715148123c492f3e2804f3c254dfed0af17"
        },
        "date": 1752184541025,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.001032,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.682081,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 172.485274,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.339737,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000441,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.545881,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022399,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.854905,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.809182,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000092,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000107,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002625,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.046443,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 128.127706,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000819,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 123.965467,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005078,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.401912,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.764591,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.82392,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.174304,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.238884,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000159,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000083,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.001467,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 50.832704,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.534679,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011818,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.220839,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.396577,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.000729,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.291699,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.846043,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 27.198754,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000574,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005796,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.721057,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.146065,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.500438,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 39.056115,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.892636,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000093,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005502,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.669118,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.067463,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.282173,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.425557,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 9.938667,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.67258,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.061321,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.134355,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002189,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000144,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.549331,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001563,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.004623,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.013077,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004719,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.370167,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000144,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007281,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.140897,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.415973,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000412,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.251619,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.574735,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "7e5ca685511c585e86798500ab401d21886da742",
          "message": "Merge pull request #123 from aperijake/trilinos_update [skip ci]\n\nTrilinos update",
          "timestamp": "2025-07-17T03:37:50Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/7e5ca685511c585e86798500ab401d21886da742"
        },
        "date": 1752727418364,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000411,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.162883,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.829936,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 125.10056,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022284,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.793017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.330461,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.04618,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.587229,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000849,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.001036,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.824041,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 120.970658,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000101,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00012,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.388741,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 168.894957,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.832417,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002542,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005109,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.297391,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000097,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.30069,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.00011,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.11807,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.755709,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.500944,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.882073,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.27827,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005692,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 51.520067,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000482,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005954,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.124517,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001698,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.498737,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.204783,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.012001,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 28.291054,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.604025,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 39.797592,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000259,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.028261,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.00138,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.541698,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007056,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002218,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000151,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.51295,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.670799,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005204,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.417548,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 9.89832,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.334735,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.209504,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.004222,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012816,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000412,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000147,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.254236,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060908,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.061483,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004649,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.300156,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.140498,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133873,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "bca0093812391941bb7c6dfce319367813a6ef80",
          "message": "Merge pull request #124 from aperijake/material_separation [skip ci]\n\nincremental work on material separation",
          "timestamp": "2025-07-18T20:26:25Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/bca0093812391941bb7c6dfce319367813a6ef80"
        },
        "date": 1752874348948,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.079287,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.783571,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.243972,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.004178,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 196.886337,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000827,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000972,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045797,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.02232,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.012594,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000405,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.656896,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 149.168407,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.384235,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 153.534178,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.740382,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.297059,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002778,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000101,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 11.337474,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.291594,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.48892,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.877989,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000218,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.602454,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000086,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001942,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005868,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 56.92523,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006394,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 33.168893,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011864,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000139,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.11737,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.11006,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000543,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.282674,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.276432,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 45.229692,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.494193,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.200791,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 9.851903,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.290048,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001474,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.288215,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012428,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005062,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.139331,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000151,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007644,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.245298,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.412392,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002229,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060741,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.249945,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.061391,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.742532,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.29361,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000141,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.004203,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004475,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 45.701242,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 24.777051,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.132366,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "58f7a46cba17dcddbd1545c834acc46fb4633db5",
          "message": "Merge pull request #125 from tjfulle/tjfulle/creep2\n\nsome tweaks to the power law creep model",
          "timestamp": "2025-07-26T17:16:16Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/58f7a46cba17dcddbd1545c834acc46fb4633db5"
        },
        "date": 1753560577229,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.342787,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022204,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045729,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.00091,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000969,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.230762,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 23.85113,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000089,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.728275,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 146.761535,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 194.075649,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005052,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002836,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.385331,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.800199,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.771151,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00009,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.682162,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000102,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 150.837838,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000561,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006195,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.267232,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.273116,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011743,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.511585,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.487264,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.710746,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001834,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00025,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.120734,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005687,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 44.408637,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.118174,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.200701,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.881236,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.492418,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 32.901832,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.185745,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 55.848719,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012536,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.51089,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 9.92259,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.363643,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.061239,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002227,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060904,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.579693,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.767309,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.139966,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.004997,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.249805,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.00441,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.095475,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.305786,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.412728,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001317,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007409,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133171,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 24.815557,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000409,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000145,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.004162,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "01378e442d0ad636003ae2922b4f7862f54307e7",
          "message": "Merge pull request #126 from aperijake/material_separation [skip ci]\n\nMaterial separation",
          "timestamp": "2025-08-16T01:39:38Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/01378e442d0ad636003ae2922b4f7862f54307e7"
        },
        "date": 1755312448425,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.044516,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.87957,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022217,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.787811,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045577,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 153.313156,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.54953,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000149,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.376321,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.391382,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 157.688593,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.666507,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000403,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 201.668172,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.383411,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.004996,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000862,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002522,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.474428,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.01179,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.006183,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.279585,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000103,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.31729,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.847379,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 11.002812,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.288643,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.073062,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001976,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000177,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.446452,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.27681,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.00009,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.539976,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 56.367511,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.188629,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 32.866749,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006098,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 44.761991,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000124,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.061108,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007392,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000145,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.331395,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005092,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001699,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012735,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000418,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.312539,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.204669,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.142662,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.371837,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.410414,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.130405,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063271,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.252261,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.77536,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.643824,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004631,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.250101,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 9.946226,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002211,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "9a93a2eb8930806472c149ad06d544458d6a14aa",
          "message": "Merge pull request #127 from aperijake/material_separation [skip ci]\n\nMaterial separation",
          "timestamp": "2025-08-23T17:22:26Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9a93a2eb8930806472c149ad06d544458d6a14aa"
        },
        "date": 1755973870244,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.118276,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.594514,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.321636,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.06212,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.820545,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000159,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000897,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005796,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 154.691696,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.843059,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002601,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000085,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 150.230234,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022416,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045783,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000424,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.309488,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 198.122382,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.397773,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.952896,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.335407,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.2737,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.564062,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000139,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001645,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005862,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.619917,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.282911,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 32.759882,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.523598,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000085,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011993,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.003942,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 44.925321,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000124,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 56.690833,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.908406,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.50311,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.147634,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000353,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.205545,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.141583,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.134096,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.06088,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004475,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005363,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 24.873753,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000408,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.312277,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007269,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.062661,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.242894,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.309838,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000143,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 9.818472,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.00188,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.412446,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.756304,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002218,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.00014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.248744,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000077,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 47.055264,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012498,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.254687,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          }
        ]
      },
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
          "id": "0609551d8666348d04a3fa99b7b34d5714a5663d",
          "message": "fix some paths in performance pipeline [skip ci]",
          "timestamp": "2025-08-25T20:09:09Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/0609551d8666348d04a3fa99b7b34d5714a5663d"
        },
        "date": 1756157289538,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000503,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000983,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 160.508036,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.916828,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000176,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.705541,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.051587,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 11.832876,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.419638,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 26.687538,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.024241,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.248182,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.374017,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 21.861504,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005607,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 165.408326,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002798,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 214.008945,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000202,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.530503,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 11.144798,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001737,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000247,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005409,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.212582,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.679216,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000088,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.524969,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 5.028485,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.94074,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 45.668321,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 58.389242,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006208,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.228526,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000078,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.797773,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.012451,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 33.184954,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.306544,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.529363,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.807226,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.008087,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001833,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.137154,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.970592,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.013173,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 10.430836,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063483,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002259,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000532,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.144065,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.00463,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000139,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.35512,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.850793,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 51.020307,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.267735,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.061971,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000147,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.00385,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 28.164825,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.436261,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 11.03605,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          }
        ]
      },
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
          "id": "847ef80ec72cfff5e125b143ce06be5a4978f2ec",
          "message": "use eigen inverse routine temporarily. just to check performance. [skip ci]",
          "timestamp": "2025-08-25T21:44:30Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/847ef80ec72cfff5e125b143ce06be5a4978f2ec"
        },
        "date": 1756162800210,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.00041,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.046362,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.728935,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.856123,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.87919,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000893,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002514,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 144.874623,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.9038,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.841462,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022311,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005309,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.28764,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.414196,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.376015,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 140.632021,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000111,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 188.936696,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000158,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005633,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.496762,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.146355,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000266,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011943,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.208257,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.28345,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.907549,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.272866,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 43.088826,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.35273,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000122,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.672653,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.34836,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001754,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 11.118814,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000145,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 54.863824,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 30.990578,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.505846,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005865,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.420221,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.256797,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000427,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.062944,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001529,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.432312,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.31314,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.073381,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007363,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.664049,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.562346,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004689,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.142758,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.00219,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.00521,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133492,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.061034,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.798714,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012769,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.016346,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.535154,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "16afea524667407026629fae1ad1a9a2d66561fe",
          "message": "Merge pull request #128 from aperijake/material_separation [skip ci]\n\nMaterial separation",
          "timestamp": "2025-08-28T07:19:11Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/16afea524667407026629fae1ad1a9a2d66561fe"
        },
        "date": 1756370068971,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 145.147924,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005155,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.00083,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.428261,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 140.980561,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.800822,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.022382,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.366964,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 11.007146,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.392366,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.853072,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.813237,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 189.43513,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000098,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000156,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.002427,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000414,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.046047,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 3.872855,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.886948,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000232,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.634097,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000093,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.125453,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.276529,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011781,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 42.80873,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 30.581146,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.488765,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.322922,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 54.569416,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.006024,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000139,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.640793,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.203884,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.307041,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000111,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005777,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.492246,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.973458,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.0018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133921,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 9.86916,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.2575,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.415944,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007764,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004697,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.570646,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063123,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.251084,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.142254,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060878,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 24.958166,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001463,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.786342,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.289748,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012556,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.660535,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000406,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000152,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002159,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000143,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.307366,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005059,
            "unit": "seconds"
          }
        ]
      },
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
          "id": "1f6519a514124acee9b02f90d057c08d8592dca5",
          "message": "fix filename in performance test scripts, again [skip ci]",
          "timestamp": "2025-08-30T13:51:47Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/1f6519a514124acee9b02f90d057c08d8592dca5"
        },
        "date": 1756566321747,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005109,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.515218,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000439,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.13925,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 197.427245,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 25.07331,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000162,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 151.876287,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 147.414466,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045845,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.021985,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.165283,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000822,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.806618,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.003354,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 20.431149,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.536289,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 11.295804,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000078,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000096,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.39508,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.780056,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.477153,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 13.722043,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.007345,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 47.119192,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 59.205532,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.490989,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.012148,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.782271,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.917565,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000137,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006129,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.497858,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.281157,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000521,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.19084,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.232393,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001852,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 31.998162,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.141593,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.070019,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.637616,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.256311,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.190843,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.730068,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.295866,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.260359,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000149,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007362,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012394,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004856,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063113,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000146,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.419472,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.787774,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.945565,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.00301,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005897,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001617,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000458,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000134,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.597774,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.1315,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "57064def13dde7cc973189bd85c5830cd4d9040f",
          "message": "Merge pull request #132 from aperijake/bary_dual [skip ci]\n\nBary dual",
          "timestamp": "2025-09-10T23:35:50Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/57064def13dde7cc973189bd85c5830cd4d9040f"
        },
        "date": 1757551948813,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.504558,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.894889,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.00042,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000085,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.021271,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.792469,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005008,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000168,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.4217,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000895,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045786,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.003336,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 148.686927,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 144.280211,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 23.901083,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 192.527463,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000119,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.940068,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.039583,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.111555,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.280659,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000207,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.494995,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.240924,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 31.530857,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.012005,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000095,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.690846,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.332516,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.910207,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005638,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000094,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 53.561703,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.007443,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 41.763629,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00012,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.509076,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.192537,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.229317,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.27802,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 9.367153,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.00181,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000093,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.14442,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.30937,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.417506,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004711,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000165,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.253285,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.06325,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.387228,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007663,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.277162,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000148,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.552633,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001798,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012693,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.061273,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 47.837135,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002224,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.284752,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.134359,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133339,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.00041,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005172,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.797446,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "9f95a363d1ee6e2c91fbd0e239ccf254d5a9ca4b",
          "message": "Merge pull request #133 from aperijake/implicit_solver [skip ci]\n\nRefactoring for implicit solver",
          "timestamp": "2025-09-14T02:01:00Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9f95a363d1ee6e2c91fbd0e239ccf254d5a9ca4b"
        },
        "date": 1757819753311,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000889,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.423429,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.781598,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00017,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.04579,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000125,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.003275,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 195.367491,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.505218,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.244618,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000398,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.951172,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.020337,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.084344,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.004913,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 146.314489,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 150.684395,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.629542,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 20.206314,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000292,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011716,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 53.674021,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.477693,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.35911,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 31.805881,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 41.797933,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000109,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000128,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001546,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.455123,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.222542,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.006888,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.140369,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.382371,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.887624,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.683112,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 9.303363,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.278132,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.107232,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005435,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000127,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002225,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.238141,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012766,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.404856,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000143,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.214145,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.061596,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063083,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001752,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.628153,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.144844,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 47.46929,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.719042,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.196628,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133164,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.029715,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.313663,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007666,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000153,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.241571,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005001,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004484,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000415,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "820ed915d343c78360d770eb801f0348272849b2",
          "message": "Merge pull request #134 from aperijake/shared_libs [skip ci]\n\nadd python packages",
          "timestamp": "2025-09-17T22:20:48Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/820ed915d343c78360d770eb801f0348272849b2"
        },
        "date": 1758152186530,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045799,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000817,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005125,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000403,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.096862,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 149.771665,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000088,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.792687,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00325,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.899569,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.481203,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.920766,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 198.526007,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.605013,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.838204,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.505897,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 153.942559,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.020952,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000179,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00024,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.485237,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.276345,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.189235,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.491121,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006224,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.327953,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000123,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.223384,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.007402,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 54.489801,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001896,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.012029,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 42.671699,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.667185,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.595424,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 9.477212,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 31.983913,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.346224,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.919661,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.00014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000149,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005102,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000134,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.139276,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007626,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.579334,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.183113,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.215926,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.305151,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.559207,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001654,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.418615,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004511,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012671,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.135513,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.062754,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.00219,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.602324,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.252754,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000414,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000148,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.059309,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.719072,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.760176,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "9a6c5111b1bda8d51a865bee8196dc32c66bd4a0",
          "message": "Merge pull request #135 from aperijake/implicit_solver [skip ci]\n\nImplicit solver",
          "timestamp": "2025-09-20T16:32:26Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9a6c5111b1bda8d51a865bee8196dc32c66bd4a0"
        },
        "date": 1758390525520,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.134255,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.877125,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005093,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.803999,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 151.874398,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000159,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 147.404711,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045838,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 196.348615,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.79224,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000395,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.023618,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.542462,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00328,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.497765,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.105359,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000839,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000123,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.493552,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 42.060936,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.011973,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 53.8447,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.664608,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.278125,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 31.695926,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.302061,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.493068,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001725,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.006871,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000118,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.223551,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.286269,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.505077,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000421,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 9.434434,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.339684,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000119,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.17362,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.005803,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.915812,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000138,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.308172,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.134801,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005145,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.167903,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.364105,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.251054,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001818,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.140291,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002205,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000145,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004736,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060298,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.076426,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.324681,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007621,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.062845,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.416512,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000161,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000426,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.735073,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000174,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 48.102584,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012882,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.587002,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "1254fb84e63753d01fe688c83e28feeb3f30df82",
          "message": "Merge pull request #136 from aperijake/planar_contact [skip ci]\n\nPlanar contact",
          "timestamp": "2025-09-21T02:09:29Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/1254fb84e63753d01fe688c83e28feeb3f30df82"
        },
        "date": 1758425237832,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000917,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 146.234084,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005129,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.045943,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.023823,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 194.295989,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.788286,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.003163,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.514568,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00009,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000403,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.43541,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.023711,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.00016,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.856546,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.847654,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.82702,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 150.38767,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.066191,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.19721,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000103,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.247428,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 43.324868,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.703812,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 55.102646,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.275781,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.492621,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 10.647862,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.01208,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 31.811398,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.228874,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.007119,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000125,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.920833,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.007088,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.251988,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.490919,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.34161,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001716,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.256464,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.003445,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.734994,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.589746,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007798,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000152,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000427,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.248571,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.549989,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.680512,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.059315,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012975,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.413676,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.732854,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.14239,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.134698,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001665,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.317444,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002223,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000161,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.095129,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004509,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063021,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          }
        ]
      },
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
          "id": "9ed99a889db0e5b398d79cd5113199a707e90e94",
          "message": "update gold in protego",
          "timestamp": "2025-09-24T20:56:18Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9ed99a889db0e5b398d79cd5113199a707e90e94"
        },
        "date": 1758758828426,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.499582,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 148.851565,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000171,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000077,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.021303,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 197.480405,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 153.33484,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.000841,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 10.918134,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000114,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.485918,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 20.002229,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.003498,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.804294,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 3.131882,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 24.088182,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.005193,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.099889,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.046472,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.278512,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.702618,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.006591,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.925194,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.480705,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001702,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000181,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.495871,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.360685,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 53.768464,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 41.836375,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 9.411593,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.000099,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.228275,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006422,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.279182,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.187533,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 31.537969,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000155,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.390947,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.012049,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000144,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000157,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.305477,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.051544,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.000162,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 10.050561,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005043,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.249838,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012765,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 9.473794,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002749,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.738636,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.134347,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.413975,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.140538,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.00732,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.270167,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.309612,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004484,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000424,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.059241,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.001698,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063072,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 46.196092,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Jake Koester",
            "username": "aperijake",
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "84945ae5ceed39cb6a3bcccb7bd0302015aaef6a",
          "message": "Merge pull request #138 from aperijake/imppy3d [skip ci]\n\nImppy3d",
          "timestamp": "2025-10-29T04:01:10Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/84945ae5ceed39cb6a3bcccb7bd0302015aaef6a"
        },
        "date": 1761715242355,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000178,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_1",
            "value": 0.040897,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_1",
            "value": 3.527281,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_1",
            "value": 0.816265,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000121,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_1",
            "value": 9.790075,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_1",
            "value": 152.089485,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.531762,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_1",
            "value": 0.023955,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_1",
            "value": 4.168978,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_1",
            "value": 147.849509,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.00044,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_1",
            "value": 197.187471,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_1",
            "value": 0.003355,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_1",
            "value": 0.000099,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_1",
            "value": 0.00099,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_1",
            "value": 0.006229,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_1",
            "value": 0.001039,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_1",
            "value": 19.082064,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_1",
            "value": 2.892789,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_1",
            "value": 25.954112,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_cpu_np_4",
            "value": 0.279804,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000159,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_cpu_np_4",
            "value": 0.006453,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.005075,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_cpu_np_4",
            "value": 0.478189,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_cpu_np_4",
            "value": 0.00009,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.211841,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_cpu_np_4",
            "value": 1.191542,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_cpu_np_4",
            "value": 42.929823,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_cpu_np_4",
            "value": 9.355151,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_cpu_np_4",
            "value": 6.720195,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.00011,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_cpu_np_4",
            "value": 55.412877,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_cpu_np_4",
            "value": 0.010386,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_cpu_np_4",
            "value": 0.000206,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_cpu_np_4",
            "value": 0.950372,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_cpu_np_4",
            "value": 4.960588,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_cpu_np_4",
            "value": 2.494203,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_cpu_np_4",
            "value": 32.744683,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_cpu_np_4",
            "value": 0.001417,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_cpu_np_4",
            "value": 0.302024,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_cpu_np_4",
            "value": 0.407445,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 1.319387,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_fem_strain_smoothing_gpu_np_1",
            "value": 3.711683,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_fem_strain_smoothing_gpu_np_1",
            "value": 25.387487,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_fem_strain_smoothing_gpu_np_1",
            "value": 8.131878,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_fem_strain_smoothing_gpu_np_1",
            "value": 45.028249,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.002306,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_fem_strain_smoothing_gpu_np_1",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_fem_strain_smoothing_gpu_np_1",
            "value": 7.547169,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_fem_strain_smoothing_gpu_np_1",
            "value": 0.414785,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_fem_strain_smoothing_gpu_np_1",
            "value": 0.133437,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.002243,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_fem_strain_smoothing_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_fem_strain_smoothing_gpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.249743,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_fem_strain_smoothing_gpu_np_1",
            "value": 0.004803,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.012898,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_fem_strain_smoothing_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_fem_strain_smoothing_gpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_fem_strain_smoothing_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_fem_strain_smoothing_gpu_np_1",
            "value": 0.1499,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_fem_strain_smoothing_gpu_np_1",
            "value": 5.668847,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_fem_strain_smoothing_gpu_np_1",
            "value": 9.703286,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_fem_strain_smoothing_gpu_np_1",
            "value": 0.060585,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_fem_strain_smoothing_gpu_np_1",
            "value": 0.005135,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_fem_strain_smoothing_gpu_np_1",
            "value": 0.000152,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_fem_strain_smoothing_gpu_np_1",
            "value": 0.000421,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_fem_strain_smoothing_gpu_np_1",
            "value": 0.063271,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_fem_strain_smoothing_gpu_np_1",
            "value": 0.007978,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}