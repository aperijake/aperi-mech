window.BENCHMARK_DATA = {
  "lastUpdate": 1761715246222,
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
        "date": 1752727420425,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.262829,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.851595,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 52.625567,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.738476,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022309,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.351103,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.387386,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.851071,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001069,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.044996,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046331,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.198325,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008109,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.342175,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 106.123472,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000637,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.531901,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000233,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.980737,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.534687,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.072776,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.00011,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.253437,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 58.241602,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000831,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.219137,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.009861,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.01186,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000437,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.356555,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.00134,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.887102,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.500955,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000453,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.924882,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.681284,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.792554,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.290419,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.753142,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.225994,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.13036,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.341349,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004489,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.217919,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.301757,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000555,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003219,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.276428,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.527382,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.156053,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 11.748042,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.377194,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.00012,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.210417,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.240485,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005771,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.116382,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.106718,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.541174,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022501,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.004029,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004281,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026096,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.393473,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.250094,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.626045,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001322,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.01671,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005586,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010807,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.075112,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 44.407444,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003853,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001471,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.231345,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053664,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.311835,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000424,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.00656,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.03533,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.006449,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004379,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 9.91929,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 10.858043,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117855,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.753652,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000037,
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
        "date": 1752874350874,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.005454,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.736804,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.614501,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.001001,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000814,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.511859,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045356,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007721,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.857691,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000012,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.998984,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000225,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 24.791192,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010658,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.379778,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022355,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.36789,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000695,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.198095,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000429,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.315131,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.226229,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.613653,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.072562,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000103,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.85943,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 65.548819,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 112.999802,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 59.599304,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.493455,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.131894,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.529681,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.359642,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.222109,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000475,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.913756,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000087,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.28465,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.268573,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.290141,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 25.149555,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.225105,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.29174,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.676883,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012585,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000397,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.11748,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.00132,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.739591,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004418,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.884359,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.196805,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.167442,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003157,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006418,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000088,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000134,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 38.494369,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.310767,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000535,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.184565,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061562,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000421,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.25181,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.389273,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026156,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001343,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.23213,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.046085,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053672,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003818,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004694,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074892,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 9.993806,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003798,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010815,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006917,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.635239,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016855,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035806,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.246121,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.116965,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.313241,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005177,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.453798,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 10.928938,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.594862,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004365,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001549,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 44.717532,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022623,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000061,
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
        "date": 1753560579267,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.190577,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.009573,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000104,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 24.794032,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.02229,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.381722,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.443261,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.982529,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.219251,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000222,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000012,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.154977,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000645,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.00829,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.248258,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000791,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.75939,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.36771,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045685,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000985,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000405,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.543321,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.209466,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000086,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.072306,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 58.504712,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.755012,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 111.427107,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000009,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.86188,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 63.990156,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.924413,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.738498,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.074791,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.682537,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.528588,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004527,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.130292,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.4519,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 38.131665,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011875,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000407,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.155037,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.23465,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.342298,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.276354,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003026,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.00063,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000078,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 24.876907,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.295103,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.208228,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.213239,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.233383,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.894824,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.223572,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.169654,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005962,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.113332,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001533,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.00042,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000088,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010864,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 1.324162,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.70961,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.00561,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.025424,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006849,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.6469,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 15.645329,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004721,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 50.115905,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117178,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.004556,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003674,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022329,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.244433,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074739,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.05362,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.016614,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035513,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000412,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001455,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.520883,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.24659,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.008801,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.387343,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061396,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.036199,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 16.616339,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026256,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.00437,
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
        "date": 1755312451460,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000814,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010193,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.819207,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 63.014639,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.37776,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000223,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.367707,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.58603,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000866,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008061,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.391177,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045891,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.19549,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.00001,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.221294,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.881071,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.740546,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.005223,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 24.919255,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.068886,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.912044,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 116.733697,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 68.951291,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000161,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000421,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 1.003508,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022197,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.576201,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.287364,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 38.885601,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.472812,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.272514,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011709,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002938,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.344703,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.469224,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.224411,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.154166,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.890255,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.48719,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.649364,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 25.647822,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.882656,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005675,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.738153,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000431,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.161616,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000102,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.127923,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.280456,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001607,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.109654,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000128,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.198202,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000444,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004214,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.473028,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.354052,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074709,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.115902,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006599,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.037162,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017116,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.392642,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001443,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061248,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.987053,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010925,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004564,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003855,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.245098,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000045,
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
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.166795,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.048848,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.643192,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026185,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000442,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.004024,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.22818,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.05367,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.342162,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.448631,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.222606,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.38719,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005626,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022467,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001806,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.256567,
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
        "date": 1755973872716,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.341344,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.075947,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.225908,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.00562,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008062,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000412,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000229,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 61.254525,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 115.039112,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 24.992542,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.211365,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000802,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.751193,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000162,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.853676,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045996,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000012,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.637928,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.765864,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000868,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.395888,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.877835,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.99269,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010202,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.57984,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 67.250722,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022499,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.368667,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005876,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.502665,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003054,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 39.117046,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.521943,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.552679,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000138,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.379893,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.433994,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.24376,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.22561,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000494,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.00125,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.163376,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.756685,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.274455,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000089,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.35524,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.01195,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.0001,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.947554,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.131432,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000379,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004349,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.289949,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.892388,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.70649,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000124,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.299661,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 25.555765,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.119764,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.20991,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003058,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074633,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.026352,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.046063,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.116599,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006605,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.64468,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.205801,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010535,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.256081,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.455523,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.317002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053522,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001518,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004387,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.263976,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.003963,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.03676,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001759,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.246963,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061124,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.28297,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022733,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003911,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.389108,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017188,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.235675,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.867114,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000039,
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
        "date": 1756157291534,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.244238,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.775024,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.00026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.622002,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000682,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 24.891092,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 12.541864,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 3.270685,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.006235,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.223229,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 78.065289,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 27.502708,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.983042,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.00051,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 71.266507,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000086,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000008,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010577,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.074518,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.16144,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.418964,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.049385,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 5.161281,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 130.508184,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000183,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000929,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.02406,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008156,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.798468,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.734632,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004223,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012399,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.217643,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000088,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.846039,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.793497,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.308139,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.187234,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.923387,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.252832,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003376,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.365128,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006659,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 26.373543,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000471,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00011,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000129,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.322378,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.993357,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.53798,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 14.416933,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.129163,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000482,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000153,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.140052,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.674649,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001418,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.338159,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.743194,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.165172,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 40.799274,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.120347,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.037471,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000486,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017757,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022492,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 11.386177,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 4.075509,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.004078,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 28.431513,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.683856,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010725,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001747,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001935,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.090848,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005783,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.264508,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 12.431755,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.004287,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 49.775336,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.411971,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.230592,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074815,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004598,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.007112,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.931004,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.062485,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.357985,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.005725,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.054189,
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
        "date": 1756162802349,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.571812,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 64.837447,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 1.130462,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046366,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022308,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 59.061263,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.211264,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.063351,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.044951,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.917415,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.071228,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.846094,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.50139,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.396508,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010176,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000605,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 113.396215,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000179,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.41028,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000871,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.39068,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000242,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000006,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.760684,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.225027,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.407606,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000121,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 38.79811,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.37645,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.534581,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.296293,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.261055,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003219,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.155611,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.422391,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.951135,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.704451,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001725,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000437,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006618,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000165,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000459,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.318642,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 25.204917,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.274506,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.763011,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004283,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.893448,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.120952,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.201874,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.371598,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012031,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.134211,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.086837,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.345374,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.55564,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.008406,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017233,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001734,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.036431,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.735732,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.247801,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.03071,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.355946,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003916,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.329058,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117336,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074644,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004522,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.004544,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.745999,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022583,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.550832,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.00676,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061576,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053692,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.391069,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001505,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000426,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.6415,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003387,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.148569,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010528,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.189048,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.236435,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
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
        "date": 1756370071433,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.566653,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 115.248612,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.069755,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.760228,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007166,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000078,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.456548,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.564905,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.201331,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000612,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000006,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.228215,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046066,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.482885,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.006818,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.385779,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 66.666622,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 60.807187,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022264,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000163,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000223,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 2.954727,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000437,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010054,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.00083,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.047816,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.887989,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.430146,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.937683,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.230203,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000123,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.879473,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.220753,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.218321,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002961,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 11.265972,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 38.352006,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005746,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.301967,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004384,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000357,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.357,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.518623,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.154698,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.117752,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.679938,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.747049,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000444,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 24.94186,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.204177,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.132453,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.084875,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001434,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.503537,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.916691,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011802,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.337767,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.281441,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017383,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010542,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003245,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.200052,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004461,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074674,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022706,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000412,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.036702,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.786154,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053838,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.650196,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.316398,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061062,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.391785,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117546,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.008049,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.248116,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 44.877451,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006941,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.165749,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.073525,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003952,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001513,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.170616,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.004312,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.239269,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001756,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.600433,
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
        "date": 1756566323460,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.00017,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000945,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.162008,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.955886,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.023612,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.526081,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007228,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 114.772462,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.189746,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000092,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010364,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.513648,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.744222,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 60.361296,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000846,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 66.372779,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.829805,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.514666,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000224,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.609888,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.201231,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.090985,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.669427,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045722,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.143139,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000424,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.225063,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.005468,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.71232,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.118762,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.087389,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012168,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000433,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.598539,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.00169,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 42.314593,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.401017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.611637,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.298796,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.157983,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.886382,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.003634,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.232292,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.976956,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.22787,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.745448,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.4986,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 28.670231,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000125,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 14.594935,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005761,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.358915,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003051,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000077,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.428516,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.281334,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.130993,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000378,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.007058,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.036788,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001834,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.661881,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001608,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.544305,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.325047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.004107,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117599,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.819081,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010502,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004753,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.676252,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.005204,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.14376,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.165064,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.283896,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000415,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.06624,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074786,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017464,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.00405,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.08641,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.227677,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053923,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.249078,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022675,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.394078,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005679,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000042,
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
        "date": 1757551951224,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.478612,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.007396,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.091141,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000009,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000272,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 60.074924,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000174,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000415,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.504573,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.804413,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010648,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.623413,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022769,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000925,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.473278,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.008766,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045661,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 24.531783,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.090055,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.196954,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.769142,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.835019,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 113.423115,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.216577,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000848,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.908549,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.439286,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 66.004971,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.158137,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.443032,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 9.798602,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 36.871261,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000452,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.978178,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011864,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.74044,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000102,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.123664,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000139,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.882871,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.553917,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.526747,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004794,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.238967,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.709209,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.13229,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.225879,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.33688,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003186,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.240617,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000116,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.00569,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000479,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.281542,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.29949,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.016495,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.349778,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001594,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.257867,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.485664,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017434,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.234105,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 26.186704,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.003878,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117771,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053879,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.307176,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010589,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.062686,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.051619,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.08677,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.002964,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074648,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.392742,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.248688,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.02258,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.32112,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006887,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004621,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.048592,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003892,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000419,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.037757,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061549,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001781,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.656701,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.513877,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.00175,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
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
          "id": "9f95a363d1ee6e2c91fbd0e239ccf254d5a9ca4b",
          "message": "Merge pull request #133 from aperijake/implicit_solver [skip ci]\n\nRefactoring for implicit solver",
          "timestamp": "2025-09-14T02:01:00Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9f95a363d1ee6e2c91fbd0e239ccf254d5a9ca4b"
        },
        "date": 1757819755184,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.0009,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.55107,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045695,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.77744,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.630654,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.232552,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010225,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.936949,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 114.946535,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.165133,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 66.307188,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.504176,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000834,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.500053,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 60.371929,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.751219,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.220056,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000229,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.19549,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.868861,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.007956,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.02013,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000007,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008805,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000166,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000439,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.092386,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.350666,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.233645,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.311751,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000425,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.129556,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.291112,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000085,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.053878,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000397,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011662,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.507457,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.682514,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001701,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.731534,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.940164,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.553153,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.112737,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.366516,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.561911,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004141,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003521,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 9.801572,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000107,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.880955,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.224309,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.296072,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.362687,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.157988,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.005678,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.083657,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.27781,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.382559,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.414063,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.048079,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.115485,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004465,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.429861,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.644831,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017163,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006864,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053911,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.241056,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.004072,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.226501,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 26.02982,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001714,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001791,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074774,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003817,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.227524,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035982,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.312489,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000434,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005688,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022639,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061171,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010585,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.220011,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.086412,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.226812,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000092,
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
        "date": 1758152189643,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045866,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000008,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010325,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.092921,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.502765,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.332873,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000413,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.00024,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.00087,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.513519,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.589638,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022776,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.092008,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.848731,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 61.507163,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 116.024413,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.216425,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 67.219342,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.197305,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.099664,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000167,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.474001,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.754283,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008731,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.910621,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.061994,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000833,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.632869,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.340442,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.370546,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011858,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.163754,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001462,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000087,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.606459,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.974723,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.133412,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.282174,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.295533,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.220774,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.88787,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000121,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.33134,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.145779,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006446,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.225026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.34847,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000421,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000406,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 9.746057,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.751262,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.112591,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.711268,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.15567,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.518928,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003113,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004737,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000137,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.530281,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.23624,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 10.952579,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.314721,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004425,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.035508,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001733,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.362129,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053941,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 9.944162,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.00717,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.742398,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117755,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.247716,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.572036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003833,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003051,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010545,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017189,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022706,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.004051,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.666671,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.39166,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001648,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 44.810114,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074639,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.060976,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00042,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.009688,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.086409,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000023,
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
        "date": 1758390527699,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.127914,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.497787,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000009,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.090412,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.00873,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.19667,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.505508,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.022908,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 59.798599,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 113.995211,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.008915,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 65.715381,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.218111,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.00044,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.461965,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.919686,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.072581,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000876,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000238,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.045901,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010296,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000077,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.675939,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.09143,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.813273,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000842,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.613952,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000172,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.755314,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000093,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.132743,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.221376,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.366592,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.758534,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001496,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.232891,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.347524,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 9.787982,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.283425,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.563138,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.466665,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000381,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.293334,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.36193,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.118753,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.00045,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.157445,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.885099,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.011845,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.00484,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006359,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.436791,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.519505,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003051,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.745471,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.245689,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.711731,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.969293,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.083505,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003726,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.257707,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.036163,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061079,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.506488,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001741,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117454,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010669,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003744,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.00724,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.343782,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000424,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.248351,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022598,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.266376,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017353,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.05392,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.237784,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.392309,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074913,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.050371,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.673436,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001778,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.33193,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 26.212064,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.810057,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004474,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005116,
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
        "date": 1758425239519,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000839,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000233,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.199917,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 61.287021,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.377989,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.371867,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.51702,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.548418,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.749193,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.045914,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000083,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000433,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.880609,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000835,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 116.013605,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 67.074046,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.747489,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 0.957085,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.464318,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.140039,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.510053,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.225302,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000167,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046058,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.091281,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008684,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000009,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.010458,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.020874,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.22588,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.228937,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.366581,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000389,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.15909,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.344335,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.513675,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.884111,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.003068,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012015,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 10.761219,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.252344,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.713505,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.27916,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001621,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.281596,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006003,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004572,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.999968,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.978198,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.113158,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.743054,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000485,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.130926,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 24.532753,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.150964,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.293514,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.543995,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000122,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.23956,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.390774,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003888,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000385,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004644,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001745,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.325176,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.592494,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001755,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.009254,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.084749,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.00413,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.375668,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010597,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.333241,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074645,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022717,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.239436,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.053934,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.75521,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000429,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017232,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.006981,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117512,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.328343,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.036569,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.003154,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.67297,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.060955,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.246856,
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
        "date": 1758758830379,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.011108,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 115.726586,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 23.196257,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 25.051964,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000927,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000449,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.759212,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 11.536929,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.023746,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.046767,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.495793,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000846,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.227272,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000179,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008001,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 67.424469,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.200379,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.00024,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 2.839977,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 61.374263,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.519183,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.647466,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.0367,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.423738,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000008,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 1.145193,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.005324,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.093015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.887523,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.594598,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.455757,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.865386,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000423,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.134098,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000158,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000124,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.241194,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.001605,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.379092,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.004815,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002991,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.012123,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.989466,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.260137,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.28122,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.713072,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 9.967436,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.496627,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.155238,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.000096,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.324316,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000346,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000106,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.297452,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.741754,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 37.56976,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.114673,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000094,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.20351,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.40512,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.006236,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004654,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.392245,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.454776,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 45.633875,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.674604,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 10.208875,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.328551,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.001816,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005678,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.004085,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.230532,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117374,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 11.213864,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.036408,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.00379,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.001769,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.056567,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010652,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.293644,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.075352,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.061048,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017555,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 26.140917,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.248288,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.054015,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.085422,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022742,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000437,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.007117,
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
        "date": 1761715245347,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_1",
            "value": 0.00111,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_1",
            "value": 0.000258,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_1",
            "value": 22.112029,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_1",
            "value": 0.756831,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_1",
            "value": 2.495228,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_1",
            "value": 0.020388,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_1",
            "value": 3.13124,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_1",
            "value": 0.008184,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_1",
            "value": 3.524217,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_1",
            "value": 118.397286,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_1",
            "value": 0.000008,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000187,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_1",
            "value": 0.009992,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_1",
            "value": 0.094724,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_1",
            "value": 27.14509,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_1",
            "value": 0.208417,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_1",
            "value": 1.160639,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_1",
            "value": 0.041048,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_1",
            "value": 63.06183,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_1",
            "value": 0.000876,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_1",
            "value": 0.528154,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_1",
            "value": 69.021717,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000461,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_1",
            "value": 4.521213,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_1",
            "value": 0.000874,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_1",
            "value": 0.225739,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_1",
            "value": 10.107253,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_1",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_1",
            "value": 3.074336,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_1",
            "value": 0.057482,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_cpu_np_4",
            "value": 0.002655,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_cpu_np_4",
            "value": 0.007698,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_cpu_np_4",
            "value": 0.16566,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_cpu_np_4",
            "value": 0.073798,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_cpu_np_4",
            "value": 13.328926,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_cpu_np_4",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_cpu_np_4",
            "value": 0.686904,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_cpu_np_4",
            "value": 0.287032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_cpu_np_4",
            "value": 2.639143,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_cpu_np_4",
            "value": 6.502252,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_cpu_np_4",
            "value": 0.540106,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_cpu_np_4",
            "value": 0.289956,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_cpu_np_4",
            "value": 0.010549,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_cpu_np_4",
            "value": 6.834738,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_cpu_np_4",
            "value": 0.89379,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_cpu_np_4",
            "value": 0.743961,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_cpu_np_4",
            "value": 0.000417,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_cpu_np_4",
            "value": 0.294982,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_cpu_np_4",
            "value": 0.382049,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_cpu_np_4",
            "value": 0.235614,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_cpu_np_4",
            "value": 0.000087,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_cpu_np_4",
            "value": 0.000283,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_cpu_np_4",
            "value": 0.003342,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_cpu_np_4",
            "value": 9.879994,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_cpu_np_4",
            "value": 38.059566,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_cpu_np_4",
            "value": 0.953195,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000907,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_cpu_np_4",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_cpu_np_4",
            "value": 0.000163,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_cpu_np_4",
            "value": 0.162175,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_cpu_np_4",
            "value": 23.831212,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_cpu_np_4",
            "value": 0.25955,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_gpu_np_1",
            "value": 0.233938,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_gpu_np_1",
            "value": 9.01477,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_gpu_np_1",
            "value": 0.003806,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_gpu_np_1",
            "value": 0.074912,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_gpu_np_1",
            "value": 0.007699,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_gpu_np_1",
            "value": 6.764723,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_gpu_np_1",
            "value": 0.005282,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_gpu_np_1",
            "value": 0.005946,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_gpu_np_1",
            "value": 0.388936,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_gpu_np_1",
            "value": 0.244161,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_gpu_np_1",
            "value": 0.004381,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_gpu_np_1",
            "value": 0.054018,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_gpu_np_1",
            "value": 3.92461,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_gpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_gpu_np_1",
            "value": 0.022908,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_gpu_np_1",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_gpu_np_1",
            "value": 0.00227,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_gpu_np_1",
            "value": 0.004736,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_gpu_np_1",
            "value": 7.99992,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_gpu_np_1",
            "value": 0.002267,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_gpu_np_1",
            "value": 0.017635,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_gpu_np_1",
            "value": 1.336256,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00042,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_gpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_gpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_gpu_np_1",
            "value": 0.117085,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_gpu_np_1",
            "value": 0.010908,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_gpu_np_1",
            "value": 25.732987,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_gpu_np_1",
            "value": 0.062154,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_gpu_np_1",
            "value": 0.085097,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_gpu_np_1",
            "value": 2.663585,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_gpu_np_1",
            "value": 43.461179,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_gpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_gpu_np_1",
            "value": 0.038389,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}