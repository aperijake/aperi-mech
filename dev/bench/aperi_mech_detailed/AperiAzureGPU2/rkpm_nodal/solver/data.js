window.BENCHMARK_DATA = {
  "lastUpdate": 1750526148174,
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
      }
    ]
  }
}