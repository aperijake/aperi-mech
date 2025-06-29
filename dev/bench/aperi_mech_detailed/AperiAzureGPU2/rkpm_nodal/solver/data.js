window.BENCHMARK_DATA = {
  "lastUpdate": 1751227869298,
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
      }
    ]
  }
}