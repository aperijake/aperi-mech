window.BENCHMARK_DATA = {
  "lastUpdate": 1758425242106,
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
        "date": 1750526147688,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.72792,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.424922,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.273117,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.403237,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 11.875609,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015466,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.485791,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.897102,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.167489,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000328,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.983036,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.348868,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 101.297255,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.40033,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.790789,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.00022,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.00357,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000101,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 49.032462,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000522,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000481,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000765,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001936,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.00722,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 18.519443,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 27.535628,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.051628,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 13.359638,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.16853,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.408797,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000294,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.229399,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004474,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088485,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017406,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002516,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.138075,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.748627,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.612437,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003896,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.002912,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000101,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.878121,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.337309,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.257266,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.58239,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021938,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.640688,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.00016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.286763,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 7.620168,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.935016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.123285,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 24.568823,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 4.976433,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 2.991186,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 52.568928,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.062897,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 19.88396,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.061402,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000705,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 13.02684,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008437,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.325775,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000847,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 54.781087,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000369,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.801151,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001316,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.054685,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.082486,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.357222,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002219,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.024754,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 6.719648,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.510836,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.150152,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.02081,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.086968,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.139024,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.563086,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 16.809832,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000147,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.0045,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.043695,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.319808,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000152,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001243,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.39483,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.271191,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.41619,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.027518,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006866,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013366,
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
        "date": 1750550646445,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.973819,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.727544,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.717817,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 13.372413,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003575,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000564,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.117399,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015306,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000423,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.430125,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 18.223364,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.346327,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.047424,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.38274,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 100.252573,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 27.235873,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.292225,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.166172,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 23.939017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.417931,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000216,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000095,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.007675,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 48.820794,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.00077,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 11.722111,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.00035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001959,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.907882,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.418951,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.068151,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.016675,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.853965,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.763145,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000672,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.062278,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 20.082905,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000013,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 2.999182,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.654329,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.019497,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.138017,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 52.434227,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 24.340173,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.265558,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.640399,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000157,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000077,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003905,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002726,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.625062,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 7.715103,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000271,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004649,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.15297,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.301909,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.874369,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.256175,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 4.999512,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.003159,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.02323,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088734,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 13.168934,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013378,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000145,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.407312,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001304,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.394654,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000371,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.511771,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006921,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.373347,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002177,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.027515,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.020898,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.043469,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.278815,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 6.801053,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.315567,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.325583,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.024643,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.136506,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000817,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000139,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004685,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001232,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.066719,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 16.955302,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.05465,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.082602,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.094404,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 54.920821,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.800897,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008421,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.636744,
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
        "date": 1750802631068,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.04448,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 13.339203,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.186395,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001854,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003458,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.41355,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.78244,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 27.40219,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.00413,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.149379,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.01568,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000318,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000936,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 7.043756,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.380117,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 18.464818,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 100.945641,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.577087,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 23.990169,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.984678,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000431,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000108,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.349919,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.642649,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.40546,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000536,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 49.258296,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000222,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.006744,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.16717,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.219395,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.854014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.103003,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.637451,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.002327,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.003875,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003902,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.621436,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000531,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.579497,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 24.015713,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000238,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000116,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.017537,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017075,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.271267,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000197,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.055739,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 5.962171,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 19.344985,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 4.73743,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.263403,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.7937,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.756788,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088405,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 7.102091,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.042217,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002442,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 2.34888,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.009518,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.130434,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001182,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.453419,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.04306,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 55.245554,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.32474,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.027667,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.082567,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.012838,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.135602,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008375,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006775,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.513028,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395065,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.490057,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000342,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 12.94691,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.264475,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000127,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.055221,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.024186,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002026,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.206877,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.387329,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 16.722116,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001188,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.800204,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000796,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 6.619461,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000148,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.00453,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.320938,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.078849,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.020723,
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
        "date": 1751227868843,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000216,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 13.541963,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000534,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.384725,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.410478,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.882282,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 101.1505,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.419248,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015415,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.374915,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001898,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 49.025559,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.949526,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.168884,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 18.652465,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000089,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.623987,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 27.467201,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000325,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.133106,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000143,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.257584,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000077,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.006985,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.684552,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 11.886606,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000511,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000839,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003523,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.348545,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.452436,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.050958,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000117,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.257086,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.859101,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.014768,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.058749,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.223347,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.129142,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.558174,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000102,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.232519,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.022116,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004407,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003916,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 4.860847,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.264821,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.811661,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.71655,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.00208,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.576946,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.549534,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.058032,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000127,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000617,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000153,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017967,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 19.303497,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.105553,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.629374,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.0883,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.002692,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 24.27047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 7.167026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000276,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.024657,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 54.775679,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.021084,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 16.771278,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.318476,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.043522,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.418326,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.39609,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.800487,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002308,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.264344,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.138215,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.02767,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.083048,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008564,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007081,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000384,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000146,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.001051,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.158319,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.05536,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.486114,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.456099,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.00138,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.079892,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 12.992471,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 6.646337,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001527,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.39259,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.512369,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000146,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013736,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004595,
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
        "date": 1751762638661,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.051345,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.740321,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 6.18175,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 18.334199,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000508,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 92.640754,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.163185,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.362787,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000774,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003284,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.423424,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 27.250001,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000303,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.892123,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.394817,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.007704,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.729586,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 23.868906,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 41.301479,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.347148,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000525,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.414445,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015628,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000185,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.421665,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001892,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 11.663579,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.542906,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.105077,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 2.96495,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.566235,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 50.547482,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.40011,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.055002,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000116,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.133258,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000146,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.632135,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003836,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.016203,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.923815,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 24.913849,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004629,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000179,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002495,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.687668,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000331,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000089,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.248475,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.221765,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.84578,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.15815,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.061349,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 4.959181,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.533434,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088212,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.00064,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.548958,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021792,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.244442,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.002918,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.821154,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008457,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001214,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042004,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.320781,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.36006,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001306,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.271303,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002193,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000358,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.00097,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 48.342618,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.390045,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 6.903423,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000134,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395401,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.981505,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004536,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026704,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.7369,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.417018,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.082125,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.219476,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.020532,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006865,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.086753,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.139072,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013573,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.024522,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.05421,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.800845,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.512692,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.577968,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000142,
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
        "date": 1752184544786,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 31.995559,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 6.547405,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.346959,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.007193,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.051641,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.440166,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.583862,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.794827,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.757147,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 99.896479,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000331,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 3.315009,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 22.882279,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003324,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000758,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000565,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015423,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.061429,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.423192,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 43.615827,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.093434,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001883,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.859775,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.76444,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000115,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.078654,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.164808,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000777,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000198,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.943608,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000093,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.348189,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 19.721756,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.003158,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.634275,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.00367,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000106,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 18.107319,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002479,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.477861,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.145599,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.022661,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.005888,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088587,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 52.905443,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 26.501582,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.052176,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.104179,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.239032,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.06431,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000296,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000792,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.84554,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.858049,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.00018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003848,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 6.004227,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.301537,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000092,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.136564,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.259318,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 2.074687,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.636302,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.80205,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395732,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.941648,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001572,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007038,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.02193,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.054824,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.003072,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.27356,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.092612,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.398602,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.001015,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001742,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.324932,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.005105,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000139,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 49.17022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008905,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013341,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.776546,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.511957,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026464,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000138,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.094781,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.9659,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.115639,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.143336,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.215197,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.025078,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.00038,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.888186,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.043313,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.330728,
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
        "date": 1752727422641,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.158845,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.752842,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003326,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.051098,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.862134,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.008758,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.427687,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000805,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.635336,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 6.500646,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 32.060061,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.666827,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 100.349402,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 22.910037,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.661729,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015512,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001841,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000341,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.346325,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.007006,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.718184,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000793,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 3.366439,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000186,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.413403,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.910452,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.133037,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000575,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 43.375715,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000907,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 18.274324,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.746524,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.135816,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.537613,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.251028,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.100785,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.056382,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003844,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021405,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.9229,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000101,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.297554,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 26.026673,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.002897,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000372,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 6.062525,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088497,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000175,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.646815,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.877029,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002378,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000161,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.257657,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 52.396888,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.775961,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.1459,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.651036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017164,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.078414,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.865791,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004237,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.020931,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.044139,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002839,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.411738,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.00168,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000896,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000449,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.320219,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.091536,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.99275,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.915401,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.070314,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.0267,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.511491,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008714,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 48.804228,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.15586,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.054688,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.082951,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.908921,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.394588,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001495,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000158,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000142,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.78652,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013703,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.801572,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004707,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006949,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.025553,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.143931,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.27133,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.39626,
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
        "date": 1752874353164,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.00184,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.156277,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.713758,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000784,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000746,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.007077,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.346416,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.420956,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000096,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.173189,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000199,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003424,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.051113,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015568,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.930533,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.066469,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.069261,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 41.510803,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 21.053613,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.642292,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 3.299458,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.60237,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000547,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.751657,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.67863,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.249336,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.912694,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 96.112946,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.412544,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000326,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000199,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.020776,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.005983,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.004898,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.852394,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.89064,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.935746,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 19.053624,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004083,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.304315,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000095,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002293,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.626808,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.857975,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.704679,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.678658,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.074245,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.682965,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.05453,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000348,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000213,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.340181,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.004082,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.2255,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.244147,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.150665,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.487945,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000945,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.055417,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.137825,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000084,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.002971,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088304,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000037,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000134,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 24.955969,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.031937,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.085949,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.021074,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.104791,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004862,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.043452,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.414408,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006965,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.141933,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.025809,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013665,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000394,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.503861,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026586,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000157,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.266271,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.801174,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.054242,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.327516,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 47.178305,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000146,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000783,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.010426,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.511645,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.576235,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.084141,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001688,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395215,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001585,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.779857,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.023114,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002769,
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
        "date": 1753560581817,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.723971,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.730551,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.555639,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.751686,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000346,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.106016,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.573118,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000754,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.23009,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 41.657379,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000527,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.613566,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.180966,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.42297,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 3.303684,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.050586,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015641,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000183,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000782,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.00186,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.007033,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 21.118894,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.924224,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.412862,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.347357,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.157187,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.00327,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 96.734998,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.926552,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.220812,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000992,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000286,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.004124,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.002724,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 4.986646,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088359,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.055272,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017817,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.00237,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.296274,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.844358,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.857137,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.13062,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.642763,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.142802,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000187,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.990415,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.588485,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004148,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.773317,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.382112,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.049156,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.135762,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000085,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 5.999915,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.25919,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.434749,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.614132,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.862021,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021114,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004918,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.083112,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001633,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013774,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.613651,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.801597,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001481,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000839,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.021279,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.025997,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002702,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.054809,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000021,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.443898,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000147,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.329243,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.517388,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.13523,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000162,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.925775,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.01058,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006933,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026647,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000354,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.804889,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.044554,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.08742,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 2.434652,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.396529,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.032089,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.267566,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.139867,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 6.965363,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 48.180027,
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
        "date": 1755312454653,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 3.29425,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000196,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 41.408251,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 95.717451,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.738286,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.399309,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.940302,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.757077,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015393,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.499891,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003143,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.641094,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.14861,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.05082,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.804693,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000542,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000829,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.111322,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001818,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000303,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 21.038316,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.416838,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000732,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 23.940153,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.347224,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.154579,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.057452,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.00009,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.619668,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 19.24922,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.865181,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 2.059436,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.305671,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.618614,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.316314,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.848798,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.034874,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.003649,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.648987,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.130925,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.191723,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.102162,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.215471,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.069463,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.004174,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.05126,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000822,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.020094,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017009,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.294887,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000114,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002209,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.852776,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000219,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.813306,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088579,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 4.778695,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.282371,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.085842,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.08095,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.034138,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001747,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 47.792478,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000138,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.801768,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.027249,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.005423,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.323748,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002952,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001812,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.512851,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.528406,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.083747,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.794515,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.394877,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.039017,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013871,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.043383,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.013872,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.265468,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.145506,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.00017,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.670227,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.054767,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.419744,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026625,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000832,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.46116,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006952,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000364,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000043,
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
        "date": 1755973875215,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 21.112273,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.860005,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.432588,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 23.982261,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.031985,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.390664,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 96.432601,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.98772,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000769,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000112,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000553,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.160966,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.052056,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.694627,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003374,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.78976,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001937,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.432934,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.648408,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000193,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015215,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000796,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.347361,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.129753,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 3.392472,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.801212,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 41.815771,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000348,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.758806,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088331,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.113767,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021232,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017152,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.842026,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.776138,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.183619,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.64565,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000173,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 19.609329,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.395803,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000071,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000267,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.877921,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.138267,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.323801,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.225959,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 26.229426,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.073314,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.252237,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000086,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 52.179083,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.855817,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.056589,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002358,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003905,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000955,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004326,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.651309,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.874469,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.160275,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000832,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395888,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.005148,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001735,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.00016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026661,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.02648,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042549,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.313488,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002801,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.089584,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.510955,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.800752,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.547997,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000361,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001906,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.031674,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.427177,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006934,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.08312,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.150959,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.142204,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000144,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000149,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.062053,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013765,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.015264,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.738271,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.606898,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.066791,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.270319,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.052989,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 47.428941,
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
        "date": 1756157293634,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.12877,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 8.569302,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 26.409885,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000101,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.170033,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.017926,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 7.212298,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 45.030861,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000528,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 11.127195,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000774,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.373919,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 10.252468,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003678,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.893041,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.431298,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000235,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 33.969402,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.054075,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 13.533547,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 23.48098,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.850917,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.002018,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.00092,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.458878,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000847,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.467135,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 5.403946,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00009,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000078,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 105.653512,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.694079,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.368232,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.00121,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 19.511468,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 26.931213,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000298,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.886791,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 6.034478,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.522703,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.430922,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.92703,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.022578,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.921094,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.094148,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000161,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.248858,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 18.903792,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.584106,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.672035,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.060142,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002665,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.004262,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.878561,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000104,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.568782,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004356,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 54.470564,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.149571,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.210262,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.005821,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000177,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000203,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000471,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.04199,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.014088,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.287595,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.114706,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 9.386533,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.005013,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.143045,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 27.312484,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.130269,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.0274,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.517021,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000151,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.02639,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.527338,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 10.278376,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 51.320792,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.002218,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.805257,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000973,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395847,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.052129,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.151281,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007234,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.851568,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.005475,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001776,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 6.247122,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.083682,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.010366,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.337259,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000065,
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
        "date": 1756162805260,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 11.979646,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.789081,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000767,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.346427,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.455457,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000564,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.048167,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001912,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.41427,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003155,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000221,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000075,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 96.585931,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000081,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.741613,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 3.510285,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.729195,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015447,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.876964,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.707178,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.755777,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.158925,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000784,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000095,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000347,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.134997,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 41.928114,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.789521,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.05214,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.871669,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.366235,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.628974,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.899586,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.82023,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.06774,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.001004,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.825176,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.056652,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.642591,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.228801,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.192919,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.853015,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.302401,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.917544,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.061905,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.628562,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000105,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.004011,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.14131,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.588396,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000271,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021683,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.167458,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.003979,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.041037,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000168,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000136,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.963574,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002582,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.192178,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.089163,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.386028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.097619,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 48.44815,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026408,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.054893,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.053571,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.154637,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395328,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.238,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.027375,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.803829,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.513764,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.0019,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.59255,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.00079,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000554,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000143,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.747219,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013907,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.32312,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.009024,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.980331,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.46171,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.144046,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.274969,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.00306,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004916,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.084376,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006955,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001555,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.04304,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.870969,
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
        "date": 1756370074016,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 29.974427,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001879,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.145129,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000212,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.00337,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.346152,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000775,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.05135,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.112042,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 9.001239,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000556,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.148231,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.73994,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000814,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.424522,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000118,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000318,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.73583,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.158778,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.678616,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.266271,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.716876,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000078,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.754728,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015541,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.00003,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 95.422834,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.877504,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.402197,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000064,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 40.922713,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.805576,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.320786,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.434837,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000133,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.020946,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002295,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.269075,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.776765,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.593068,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.224467,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.046745,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.641477,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003905,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.136684,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004209,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.15948,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.592827,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.329491,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.804996,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.056515,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.112482,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.845638,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.056213,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 19.19112,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017156,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000091,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000888,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 2.152676,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.64267,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000151,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088471,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000294,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.055184,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.792397,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007178,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.026937,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.335272,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000163,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001653,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002952,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.270176,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 48.043016,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.141693,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.08404,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.328635,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000388,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.091056,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.132103,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.757942,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004844,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026441,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.801912,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.39588,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013666,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.438719,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.143547,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000143,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.009934,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.777281,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.269702,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042268,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.510915,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000793,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001843,
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
        "date": 1756566325155,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 41.675762,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000322,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000786,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.824256,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.748444,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.157098,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015375,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.681009,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.348122,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.854153,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.52157,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000571,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.81102,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.095351,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.575968,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.05481,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003753,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 96.266061,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.222848,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.801807,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000084,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 9.004582,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000782,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001983,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.962409,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.142315,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.147801,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000235,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.242077,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000216,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.924896,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.620078,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.666321,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.762007,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.251726,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000157,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.702632,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.140231,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.649089,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.058812,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000067,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.137519,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 19.1453,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.00468,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088794,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.005083,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.389649,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.16671,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.001082,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000135,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.189948,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002418,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.34867,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.256889,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000097,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.004066,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.787022,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.823339,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.828297,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021929,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.123928,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000247,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.027587,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 26.283578,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.143621,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004937,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.01398,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 49.585045,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.765012,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000175,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007038,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.510556,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001594,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.148415,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.269251,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000168,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.083312,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.301733,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.813483,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.003196,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.057788,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395539,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000367,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.443318,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026559,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.090774,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042804,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.008956,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000819,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.319455,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.670599,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.802341,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001858,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.792208,
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
        "date": 1757551954068,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.116577,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.0966,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.681717,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 95.1878,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000558,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000204,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015575,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.055401,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.747242,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.222727,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.943551,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000872,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.009348,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.717931,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.8932,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000091,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.352762,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.516763,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.823327,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003432,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.134289,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.734927,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000051,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 40.843685,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000326,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.563254,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000807,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.805058,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.156691,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001933,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.018343,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.863731,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003904,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.790679,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.606562,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088734,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 51.041163,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000128,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.058091,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.669963,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.309838,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000923,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.32307,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.014499,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000097,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.022858,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.501986,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.426909,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000148,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.668623,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000296,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.937491,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.132301,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.087982,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.00021,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.13553,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.262907,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.946201,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.05652,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004277,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002442,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000066,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.194331,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.02751,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.082608,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.270288,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.014086,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007001,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.014016,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.299747,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.46161,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000149,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395221,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.812488,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000156,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001828,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.51337,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042015,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000376,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000052,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.000765,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000132,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004915,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 50.278032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.02668,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.092009,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000072,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.003159,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.803211,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.323755,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.150109,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.802668,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.787979,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.095708,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.346555,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.146234,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.057311,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001975,
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
        "date": 1757819756979,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.054402,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.071958,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 95.293422,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000199,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.091796,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000931,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000805,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.920928,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.509607,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000049,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000065,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003582,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.743722,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.993908,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.212511,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.972793,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000033,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000316,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.229683,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001933,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.566341,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.771365,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.673439,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00008,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.146467,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 40.714209,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.704372,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000542,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015486,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000029,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000094,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.156909,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.653776,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.347855,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000128,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.094306,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.177398,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004406,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.647593,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.28331,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.647704,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.787871,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.00007,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.016336,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.305027,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000108,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.020476,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003775,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.246848,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088625,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000019,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.106033,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000156,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.131547,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.056556,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.718758,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.065459,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000062,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.00092,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.769002,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000221,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.885512,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000087,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.290172,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002278,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.607973,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 50.354817,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 4.824526,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.165223,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.02759,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.04238,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.395853,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.156374,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.006972,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.014023,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.148448,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.583224,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.790349,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.44408,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.802947,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.073664,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 47.709749,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.082752,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.00193,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.056471,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.320219,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.013316,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.001002,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.124632,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.263449,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001858,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000365,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.514147,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.143449,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.00015,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.821391,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000059,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000162,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.085237,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.002922,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000131,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026295,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004893,
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
        "date": 1758152192839,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.715083,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 40.703677,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001923,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000083,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.132245,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000096,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.119477,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 31.659904,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.898538,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000837,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.217367,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000204,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.740386,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.522979,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.802571,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 97.229589,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 9.381562,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.700384,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.742142,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000795,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.154661,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000077,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.346863,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.00336,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.838995,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.055029,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000035,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000562,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.032217,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015412,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.56014,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000317,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.021397,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000323,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.004074,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.005663,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000015,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000975,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000115,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.812095,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.348581,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.221091,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.141036,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000068,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.065685,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.046843,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002429,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.056723,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000137,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000046,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.296137,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.888807,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.05658,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 54.869254,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.249909,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.642872,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 22.800304,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004384,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000198,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.493096,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 29.407641,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.0887,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.16518,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.649231,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000095,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.811845,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.618054,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.02727,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004874,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.054641,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001859,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.144618,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.014034,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.009553,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000148,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000359,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.849034,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.769,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000063,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 48.391617,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026321,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.003069,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.802997,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.645364,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042375,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.135782,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000127,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.226391,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.269428,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.001688,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.394641,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.003039,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.091135,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000154,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000028,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.445439,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.14131,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007012,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.331123,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.513767,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.072662,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.735444,
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
        "date": 1758390530531,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000115,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.000224,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.188612,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001956,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.863436,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 9.094961,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.758611,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.347452,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000316,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000082,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.156295,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.759618,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 97.196744,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.098508,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 10.031945,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.524777,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 42.578321,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.055642,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.00077,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000543,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.555779,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000023,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000786,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000061,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.774561,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.231563,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.000038,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000048,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.896635,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.92197,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015676,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003476,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.213527,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.085872,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000076,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.538173,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.796531,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.827636,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000138,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.061639,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088819,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.00013,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.058607,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.13511,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.651283,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000039,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000074,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000089,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.399486,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.312943,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.017193,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.607414,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.002324,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000157,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004483,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000287,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.21614,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.106361,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 6.219374,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.152796,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_4",
            "value": 50.987792,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.318919,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.660887,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.02099,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003968,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000044,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.251821,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.000983,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000073,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.902768,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.705722,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.00002,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.002181,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.00533,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.027251,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007017,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 49.270142,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.00014,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.09032,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.143719,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.883751,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.07529,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.02639,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.268122,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013776,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.143641,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000358,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.335121,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.339326,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.058853,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.515019,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000026,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.866187,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.394935,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.477936,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042014,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000152,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000148,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.842717,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.15379,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000055,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.803456,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000053,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.002061,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000025,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.003044,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.016482,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000042,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.001048,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 25.771349,
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
        "date": 1758425241611,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_1",
            "value": 0.518336,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_1",
            "value": 0.00004,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_1",
            "value": 0.000022,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.00006,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_1",
            "value": 6.893902,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_1",
            "value": 0.054605,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_1",
            "value": 2.226707,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_1",
            "value": 0.015934,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_1",
            "value": 8.964503,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_1",
            "value": 0.000043,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_1",
            "value": 0.74411,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_cpu_np_1",
            "value": 95.436925,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_1",
            "value": 0.156521,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_1",
            "value": 7.654356,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_1",
            "value": 40.972182,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_1",
            "value": 4.758641,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.003514,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_1",
            "value": 30.044058,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_1",
            "value": 20.814023,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_1",
            "value": 0.347065,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_1",
            "value": 0.000829,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_1",
            "value": 3.67279,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_1",
            "value": 12.133111,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.00034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000576,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_1",
            "value": 24.145286,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.000079,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_1",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_1",
            "value": 0.000971,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_1",
            "value": 0.001944,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_1",
            "value": 0.00005,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_1",
            "value": 0.156353,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_1",
            "value": 0.000032,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.572712,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_1",
            "value": 0.00022,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_1",
            "value": 0.000054,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_1",
            "value": 0.000016,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_1",
            "value": 0.000111,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_1",
            "value": 9.918229,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_cpu_np_4",
            "value": 18.889709,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000128,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_cpu_np_4",
            "value": 0.136552,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_cpu_np_4",
            "value": 1.153778,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_cpu_np_4",
            "value": 0.929905,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_cpu_np_4",
            "value": 0.000034,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_cpu_np_4",
            "value": 0.056141,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_cpu_np_4",
            "value": 0.8164,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_cpu_np_4",
            "value": 0.672804,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_cpu_np_4",
            "value": 0.005537,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_cpu_np_4",
            "value": 0.608767,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_cpu_np_4",
            "value": 5.988454,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.00011,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_cpu_np_4",
            "value": 0.003953,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.2546,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_cpu_np_4",
            "value": 5.338157,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_cpu_np_4",
            "value": 2.310175,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_cpu_np_4",
            "value": 0.000069,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_cpu_np_4",
            "value": 1.784176,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_cpu_np_4",
            "value": 25.492961,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_cpu_np_4",
            "value": 0.00246,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_cpu_np_4",
            "value": 2.661671,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_cpu_np_4",
            "value": 0.00092,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000098,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_cpu_np_4",
            "value": 17.553185,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_cpu_np_4",
            "value": 0.000172,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_cpu_np_4",
            "value": 0.000057,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_cpu_np_4",
            "value": 3.253795,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.004255,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_cpu_np_4",
            "value": 3.066465,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_cpu_np_4",
            "value": 0.000041,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_cpu_np_4",
            "value": 0.000017,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_cpu_np_4",
            "value": 0.000018,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000296,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_cpu_np_4",
            "value": 0.02126,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_cpu_np_4",
            "value": 0.088992,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_cpu_np_4",
            "value": 5.024949,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_cpu_np_4",
            "value": 0.000036,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_cpu_np_4",
            "value": 0.000141,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeStepCompute_rkpm_nodal_gpu_np_1",
            "value": 0.000157,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.26848,
            "unit": "seconds"
          },
          {
            "name": "Solver_Total_rkpm_nodal_gpu_np_1",
            "value": 8.675902,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 2.470684,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000058,
            "unit": "seconds"
          },
          {
            "name": "Solver_WriteOutput_rkpm_nodal_gpu_np_1",
            "value": 7.165612,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_gpu_np_1",
            "value": 0.004949,
            "unit": "seconds"
          },
          {
            "name": "Solver_TimeIntegrationNodalUpdates_rkpm_nodal_gpu_np_1",
            "value": 0.02731,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CoarseSearch_rkpm_nodal_gpu_np_1",
            "value": 0.35051,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_gpu_np_1",
            "value": 1.515384,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_gpu_np_1",
            "value": 0.073346,
            "unit": "seconds"
          },
          {
            "name": "Solver_ApplyBoundaryConditions_rkpm_nodal_gpu_np_1",
            "value": 0.013953,
            "unit": "seconds"
          },
          {
            "name": "FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_gpu_np_1",
            "value": 0.14523,
            "unit": "seconds"
          },
          {
            "name": "Application_Preprocessing_rkpm_nodal_gpu_np_1",
            "value": 9.7576,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_gpu_np_1",
            "value": 1.091742,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateFieldStates_rkpm_nodal_gpu_np_1",
            "value": 0.144989,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateTimeStepper_rkpm_nodal_gpu_np_1",
            "value": 0.000024,
            "unit": "seconds"
          },
          {
            "name": "StrainSmoothingProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000356,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_gpu_np_1",
            "value": 0.026488,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_gpu_np_1",
            "value": 0.042007,
            "unit": "seconds"
          },
          {
            "name": "Application_Total_rkpm_nodal_gpu_np_1",
            "value": 47.597537,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_gpu_np_1",
            "value": 0.002085,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_gpu_np_1",
            "value": 0.012371,
            "unit": "seconds"
          },
          {
            "name": "Application_AddFieldsToMesh_rkpm_nodal_gpu_np_1",
            "value": 24.918643,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_Instantiate_rkpm_nodal_gpu_np_1",
            "value": 0.000045,
            "unit": "seconds"
          },
          {
            "name": "Solver_ComputeForce_rkpm_nodal_gpu_np_1",
            "value": 1.056741,
            "unit": "seconds"
          },
          {
            "name": "NeighborSearchProcessor_SortSearchResults_rkpm_nodal_gpu_np_1",
            "value": 0.394675,
            "unit": "seconds"
          },
          {
            "name": "Application_ReadInputMesh_rkpm_nodal_gpu_np_1",
            "value": 0.105924,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_gpu_np_1",
            "value": 0.804665,
            "unit": "seconds"
          },
          {
            "name": "Solver_UpdateShapeFunctions_rkpm_nodal_gpu_np_1",
            "value": 0.000157,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_gpu_np_1",
            "value": 0.007026,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateInternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.001869,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateExternalForceContribution_rkpm_nodal_gpu_np_1",
            "value": 0.000056,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateOutputScheduler_rkpm_nodal_gpu_np_1",
            "value": 0.000027,
            "unit": "seconds"
          },
          {
            "name": "Application_CreateFieldResultsFile_rkpm_nodal_gpu_np_1",
            "value": 0.001014,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_AddCellNumElements_rkpm_nodal_gpu_np_1",
            "value": 0.003056,
            "unit": "seconds"
          },
          {
            "name": "Solver_CommunicateForce_rkpm_nodal_gpu_np_1",
            "value": 0.000153,
            "unit": "seconds"
          },
          {
            "name": "Application_AddInitialConditions_rkpm_nodal_gpu_np_1",
            "value": 0.000047,
            "unit": "seconds"
          },
          {
            "name": "SmoothedCellData_LabelParts_rkpm_nodal_gpu_np_1",
            "value": 5.808949,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}