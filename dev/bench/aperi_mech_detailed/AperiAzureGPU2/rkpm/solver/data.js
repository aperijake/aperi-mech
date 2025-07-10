window.BENCHMARK_DATA = {
  "lastUpdate": 1752184543264,
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
        "date": 1750526146072,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.009544,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 108.376002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 15.839242,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 27.082001,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010063,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000432,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.203079,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.449801,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 48.428038,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.757948,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.07206,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.841765,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022314,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 56.23684,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.171692,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001049,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.00085,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.945273,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.0001,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000168,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.484576,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.005331,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.38291,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.821199,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.601956,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000615,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.369826,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.00584,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.295752,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000215,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012003,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 7.914548,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002566,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.390694,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.72691,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 22.248885,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 4.222243,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.932349,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000399,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.145578,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.268011,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.351994,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.180496,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.211163,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.130591,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 10.237174,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.003508,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.494341,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 10.841455,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000254,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000587,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001424,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.372187,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.685117,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.118585,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.896321,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.368059,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.226386,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.002625,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026152,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.476375,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 51.154307,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003594,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035328,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.003491,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.302587,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004538,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.271825,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.116882,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.005264,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061067,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006217,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016202,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.392815,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 17.654821,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053581,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.480039,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000415,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.253677,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001225,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074557,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000094,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004317,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 16.734173,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001235,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022637,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010781,
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
        "date": 1750550644285,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.443476,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 107.858644,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.856162,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.179173,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.949112,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.007897,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.044586,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.754924,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.842349,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 47.873858,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.243015,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000837,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000104,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010295,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.609538,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 55.441929,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 27.325004,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.073975,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046211,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000129,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000891,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 16.028494,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007196,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001078,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000445,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.392804,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000011,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.212856,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022341,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.263899,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000438,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 22.098711,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000262,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.292844,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.157965,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.221777,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 4.267692,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.003719,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.262593,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.308614,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.965407,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000101,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002577,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.13015,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.527802,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011894,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.713502,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 8.033986,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.913067,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001179,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 10.536285,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000595,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.186466,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.357329,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.751406,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.120371,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.094304,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005763,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 10.684102,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061087,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.283704,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010652,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003737,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003658,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016154,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001197,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005398,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022428,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 16.637097,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004087,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.224966,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.397751,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001221,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.005453,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117419,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.512576,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035074,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.02384,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000429,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 50.717872,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.46692,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.2931,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004355,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074666,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026161,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053517,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.258469,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 17.563257,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000256,
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
        "date": 1750802628985,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 104.50044,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 45.822226,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000011,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 26.760041,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 15.596559,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.612767,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.006858,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.877629,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.375768,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 53.301581,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.841938,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.365978,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000803,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000427,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045694,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000126,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000837,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.07212,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001003,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.390033,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.135479,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000006,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.162339,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022124,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.74264,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 24.258328,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.195988,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010426,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.819754,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000251,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 10.370568,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000253,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.651548,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.711493,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 7.774158,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.359855,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.00344,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000523,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005872,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.530737,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000083,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001198,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 36.064213,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.258288,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.893737,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.236045,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000141,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 4.159279,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.287191,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 9.748991,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002395,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 21.228763,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.203494,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.112159,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.128473,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.157332,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011667,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.35251,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.181308,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.884393,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.074536,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005339,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.068576,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.265599,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000404,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001196,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.177557,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003528,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.114816,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.38326,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004246,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.006461,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074624,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.007859,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026136,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.247121,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.236353,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035611,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022313,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 5.968815,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016823,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010599,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053661,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 50.371624,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.005774,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.00408,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.473628,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.306396,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 16.251371,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 17.196002,
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
        "date": 1751227867121,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 56.320125,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.072212,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.00011,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.862041,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000011,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.283501,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.034982,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.882617,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.204782,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.665927,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.377781,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.733035,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 27.550426,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000887,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000831,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 109.302979,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 16.113865,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 50.608645,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.357551,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000461,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007001,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.008518,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001083,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.017106,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.173958,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000097,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022422,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.526277,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046157,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.29334,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 7.77698,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000147,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.260671,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.138374,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001131,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.127985,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.895831,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000098,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.912965,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000249,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004732,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000087,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 4.141247,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011822,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.359961,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 10.417251,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 21.538707,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 36.40109,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.110106,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.262404,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.215373,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005722,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.714139,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.485117,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002376,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000418,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.65824,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 10.502151,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.287773,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000529,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.185648,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000243,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016331,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001236,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003627,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.248638,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010728,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.655136,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 51.470251,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.005296,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004395,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005466,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001311,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004515,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.257649,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.223582,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 16.797588,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.387148,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035354,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.05359,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022431,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003821,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.472276,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00042,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 17.716216,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026192,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006095,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.115865,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.075097,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.627969,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.286752,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061434,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.00003,
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
        "date": 1751762636520,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.744648,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.164536,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008206,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 24.777233,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001034,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000411,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000143,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 54.06157,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.857921,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.560142,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.363666,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000584,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.725188,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000006,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 98.141646,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 19.256103,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.83546,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.381428,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000807,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000106,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.19586,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.072434,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 8.269738,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 48.189115,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.04612,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022217,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000012,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.005331,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.009784,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.551045,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.296845,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000287,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 22.379873,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.339386,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.535435,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.132894,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.00436,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 10.491237,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.161089,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.349544,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.722522,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.115935,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000388,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.192456,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.206187,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000113,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000012,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.925456,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003307,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 35.379939,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011631,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.179568,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 5.798628,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000565,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.343005,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001277,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.886886,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.136562,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006104,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.275021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.677859,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022466,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.168322,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001103,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.058883,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026218,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.678113,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 8.141513,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035063,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000408,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 41.923325,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003826,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 7.217032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010702,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001222,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003697,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.116259,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016291,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.00451,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.388201,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.299408,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.628152,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.060946,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.005933,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.37886,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074868,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004069,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.227885,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.250148,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005382,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053606,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000035,
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
        "date": 1752184542752,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.758024,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.050673,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000846,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.688382,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 1.028002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046437,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000221,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010024,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000011,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.614784,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007893,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.204187,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.371196,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.885819,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000675,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 110.285669,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.23318,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.40128,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.073851,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001074,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022449,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 55.709006,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.449083,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 61.571875,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.916334,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000452,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.934196,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.387177,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000111,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.500283,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002985,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.684582,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.279216,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000612,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012022,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.930273,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.00009,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.36161,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.450875,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.134804,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006409,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.662992,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.210692,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000591,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004417,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000409,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.131857,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.341986,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.154479,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.754487,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000251,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 11.965447,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.23008,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.208316,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.886925,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.062575,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.467481,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.029591,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000086,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.294749,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.065903,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022727,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.430211,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004542,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.005257,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.393513,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001543,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074744,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006795,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.249596,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.784472,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.628994,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.240231,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 10.914852,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.576371,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004338,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003271,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026754,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.004212,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053591,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003976,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117698,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 9.962662,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010897,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 44.815609,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.303857,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.036842,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001353,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000441,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016832,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}