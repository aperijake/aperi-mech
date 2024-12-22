window.BENCHMARK_DATA = {
  "lastUpdate": 1734833019954,
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
        "date": 1734833019490,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000532829,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000039696,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001012,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 113.319,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.5183,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.092405,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00942628,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0556952,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000229794,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017444,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.47485,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00002581,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.77047,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0571708,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.5355,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00831755,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000528,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0150993,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.194282,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.2852,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000207712,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000266436,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00000497,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.5601,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.89498,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.559867,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00330942,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0209367,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000151964,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012263,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.633991,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000029738,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.441604,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0137397,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.2517,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00181445,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000006263,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00389644,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0492255,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.10404,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0799964,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153205,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.105587,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.280361,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.9576,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.24878,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00449957,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0275883,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0056869,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029527,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.076046,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0105514,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0634145,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00272977,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0017,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0084471,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.415989,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00290376,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0106445,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.492,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}