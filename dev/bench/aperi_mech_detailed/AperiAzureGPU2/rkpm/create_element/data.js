window.BENCHMARK_DATA = {
  "lastUpdate": 1734833015504,
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
          "id": "b70c81241361a8186d92f3f809989f585ed139ea",
          "message": "fix another performance pipeline issue [skip ci]",
          "timestamp": "2024-12-22T01:13:34Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/b70c81241361a8186d92f3f809989f585ed139ea"
        },
        "date": 1734833015049,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000502332,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000136995,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000010921,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 34.9254,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 3.88218,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0199532,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00854003,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00701625,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000763899,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001548,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.905853,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000023927,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.812908,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.036657,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.43316,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0665458,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003177,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0222419,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0354078,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.30892,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000174879,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000163356,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000013486,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 4.34633,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.845855,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.203761,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00269366,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00229269,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000219986,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011362,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.191676,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000068031,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.172016,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0103211,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.438357,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0251918,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000002514,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00587723,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00958527,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.397603,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0635278,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0262645,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.022484,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.202448,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.19021,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.04571,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.006771,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00629331,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00251258,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000039747,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0244195,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0096607,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0234985,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00297359,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.7135,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0650206,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192176,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00702774,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0103693,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.31913,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}