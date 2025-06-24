window.BENCHMARK_DATA = {
  "lastUpdate": 1750802629473,
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
      }
    ]
  }
}