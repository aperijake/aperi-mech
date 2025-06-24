window.BENCHMARK_DATA = {
  "lastUpdate": 1750802627403,
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
      }
    ]
  }
}