window.BENCHMARK_DATA = {
  "lastUpdate": 1750488079356,
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
          "id": "871badcd53cc9fe3b876eb3fb10c2227dbe4aecb",
          "message": "pipeline order of operations fix [skip ci]",
          "timestamp": "2024-12-27T18:01:28Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/871badcd53cc9fe3b876eb3fb10c2227dbe4aecb"
        },
        "date": 1735328598151,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000584926,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000034998,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009478,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 114.528,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.31065,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.095181,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00979219,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0573121,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000213836,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017755,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.59435,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000025589,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.77959,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0578699,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.7313,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00919781,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000561,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156933,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.200657,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.471,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000209116,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000134772,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000007915,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.6089,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.92161,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.586368,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0055378,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0224048,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000912381,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010971,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.685541,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000094744,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.447562,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0126126,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.35748,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00186122,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000005712,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00385385,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0486635,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.27981,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0795664,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153692,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106479,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.277602,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.7991,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.251525,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00419255,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0273564,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0057354,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000028585,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0761133,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0110108,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.111326,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00334158,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0937,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00884134,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.416181,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00294648,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0107558,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.5834,
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
          "id": "3fe2ea5eac1c84c74196c29751ee8b39fe280648",
          "message": "Merge pull request #49 from aperijake/material_interface\n\nMaterial interface [skip ci]",
          "timestamp": "2024-12-31T20:58:56Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/3fe2ea5eac1c84c74196c29751ee8b39fe280648"
        },
        "date": 1735681831543,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000582016,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000034627,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001037,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 113.23,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.51566,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0924508,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00942315,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0557151,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000225096,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018095,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.88168,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026751,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.75938,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0579979,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.6568,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00853709,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005691,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0152208,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.197138,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.4026,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000164778,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000136703,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000047161,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.8402,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.88558,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.357683,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00348347,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0165454,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000110182,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011322,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.745619,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000073431,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.443599,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0145639,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.25956,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00156377,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00000498,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00446614,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0513016,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.1646,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0783247,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153697,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106121,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.277398,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.2124,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.248762,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00437984,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0276404,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00578182,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029357,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0761305,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0105734,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0703615,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00282387,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0334,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00844872,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.416423,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00294719,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00978607,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.5256,
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
          "id": "335d87ca5449c5a5654cee98bfd580507c7edad0",
          "message": "Update ci-cd-pipeline.yaml\n\nallow trigger pipelines from forks",
          "timestamp": "2025-01-07T18:59:45Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/335d87ca5449c5a5654cee98bfd580507c7edad0"
        },
        "date": 1736284598675,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000583677,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000031199,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009498,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 113.283,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.51462,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0958795,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00967233,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0569333,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000211191,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017614,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.88525,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00003065,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.74882,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.057059,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.5393,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00863205,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006422,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015199,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.193361,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.2875,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000176375,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000356738,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000033744,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.0501,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.87876,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.151707,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00327884,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0200884,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000124868,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010911,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.742713,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000101633,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.441938,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0121259,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.27974,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0014417,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004679,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00397784,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0482394,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.18969,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.076909,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152155,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106271,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.276117,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.989,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.251352,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00428117,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0261228,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00562889,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000028775,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0743025,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0104532,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0647638,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00231543,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9519,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0093298,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.416007,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00279645,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00970735,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.4426,
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
          "id": "d6b9de5ca18998c469e4aae5d76c2056669a9b66",
          "message": "check for eigen locally",
          "timestamp": "2025-01-08T04:55:39Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/d6b9de5ca18998c469e4aae5d76c2056669a9b66"
        },
        "date": 1736331769050,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000484533,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000038643,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009428,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.84929,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.96517,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.10754,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0112739,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0742671,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000228972,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019758,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 3.10033,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000028043,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.85227,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0630209,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.8269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00824733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006872,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157426,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.200835,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.5624,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000130648,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000204518,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000082388,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.36222,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.94429,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.145844,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00157037,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0188931,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000138343,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013006,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.882516,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000201993,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.511629,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0179457,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.71987,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00195223,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000006122,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0040671,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0553301,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.5139,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0779811,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152205,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.109044,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.277375,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 20.7794,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.280944,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00431798,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0288718,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0064598,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030147,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0627001,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0104165,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0873468,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00252475,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 14.1128,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00882643,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.48224,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00317365,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0107478,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.5346,
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
            "email": "146987853+aperijake@users.noreply.github.com"
          },
          "id": "c1398aee6a3443b2d16e95045643cac0d5c2f16d",
          "message": "make new solver changes work on the GPU",
          "timestamp": "2025-01-12T00:00:06Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/c1398aee6a3443b2d16e95045643cac0d5c2f16d"
        },
        "date": 1736665608930,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000371268,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000033505,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004398,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.59093,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.83482,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0952769,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00953604,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.069534,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000206228,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016932,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.80721,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023586,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.76114,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.05757,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.5032,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00773746,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005891,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0152166,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.197109,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.2461,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000110815,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00012417,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000005371,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.21577,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.00375,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.113488,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00382017,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0218788,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000102388,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010951,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.719943,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000095765,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.444242,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0144436,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.21269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00156663,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004669,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00386627,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0507388,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.0884,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0761216,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152139,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106605,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.277735,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.8952,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.251681,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00430214,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0274233,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00566755,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030028,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0616381,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0101254,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.100902,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0025302,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9478,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00774216,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.41746,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00276776,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00972283,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.4385,
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
          "id": "850ef5af52ecc8808acba4bd3d64de4db3f64820",
          "message": "put timers around time integrator steps again",
          "timestamp": "2025-01-12T14:45:11Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/850ef5af52ecc8808acba4bd3d64de4db3f64820"
        },
        "date": 1736701260752,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000362821,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000032783,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009098,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.61404,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.13537,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0961235,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00955138,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0688847,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000203534,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018015,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.84379,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023416,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.77791,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0575779,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.6527,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0076253,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006102,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0154349,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.200735,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.3927,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000147615,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053262,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016662,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.11949,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.98225,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.124908,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00241296,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0250595,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00076574,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012344,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.767088,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00006688,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.445177,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0120036,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.27248,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00136232,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004799,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00377138,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.049314,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.19526,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0772947,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152178,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106155,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.280624,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.1384,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.250828,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00397415,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0267489,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00566595,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000027303,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0728737,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0100493,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0667581,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00234706,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0895,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00836026,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.415998,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00277101,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0104728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.5808,
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
          "id": "812b2a3097ffd85957468a7ecf1586495485849a",
          "message": "update so pipeline doesnt automatically trigger on branches that have open pull requests targeting the main branch",
          "timestamp": "2025-01-14T13:12:28Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/812b2a3097ffd85957468a7ecf1586495485849a"
        },
        "date": 1736871103120,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000394838,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000039094,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009688,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.65376,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.0265,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0960447,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0100568,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0726604,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000211741,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018225,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.87734,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026069,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.78138,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.058153,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.6699,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0080756,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005701,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153177,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.199143,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.4087,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000138922,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000203194,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000083468,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.57755,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.0207,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.110013,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00277644,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0229375,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000128282,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011281,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.754938,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000101461,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.462492,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0122118,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.26185,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00144921,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004369,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00412789,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0498014,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.18155,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0782073,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153432,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.108647,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.281154,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.6244,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.252941,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00441284,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0291277,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00569208,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029306,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0618163,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0104557,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0956455,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00287359,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.1224,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00915811,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.406813,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00286425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.010702,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.6225,
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
          "id": "e72db6c22cdd8592e9fd5870c5ac6fc19bec1245",
          "message": "Update ci-cd-pipeline.yaml [skip ci]\n\nstop pipeline from running twice per PR",
          "timestamp": "2025-01-14T23:13:19Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/e72db6c22cdd8592e9fd5870c5ac6fc19bec1245"
        },
        "date": 1736899353413,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000355948,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000036049,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009168,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.69597,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.36236,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0970172,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00990655,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0696799,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000218135,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019507,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.81789,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000027272,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.77176,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0579228,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.6545,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00827911,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006813,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0154826,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.198733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.3952,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000119708,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000216391,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000080534,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.18238,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.10023,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.138118,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00171999,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0190668,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000133404,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011863,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.738601,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000100141,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.455533,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0122607,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.32854,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00147589,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00000541,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00385349,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.051806,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.14523,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0794018,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153046,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106616,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.283138,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.0069,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.247969,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00452551,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0280708,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00568994,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030608,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0771718,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0113324,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0939148,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0027357,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0717,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00850552,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.415853,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00294768,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00986038,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.5633,
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
          "id": "af7994ec2b8ac92b188b6a9c020fd588e64dc71d",
          "message": "Merge pull request #58 from aperijake/material_interface\n\nelement outputs and volume calc [skip ci]",
          "timestamp": "2025-01-16T03:46:39Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/af7994ec2b8ac92b188b6a9c020fd588e64dc71d"
        },
        "date": 1737002266619,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000369769,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000034237,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008888,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.53671,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.37482,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.096235,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00988164,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0692845,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000218886,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000029707,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.86641,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026402,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.76386,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0577433,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.5609,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00836528,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005991,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015309,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.198192,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.3014,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000136845,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000187804,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000006052,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.11866,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.16531,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.110992,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00273195,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0236412,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000152305,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011683,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.731321,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000068743,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.444424,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0120476,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.27319,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00147755,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00000542,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00378475,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0503492,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.19398,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0781839,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152687,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.107271,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.27391,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.4369,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.252237,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00429629,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0268083,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00572235,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00003063,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0730732,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.011084,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0670154,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00244279,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9418,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0084217,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.415956,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00290975,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0105695,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.4326,
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
          "id": "0e74e204462d31fc1988af9add5e40f8a7ab9bd7",
          "message": "Merge pull request #60 from aperijake/force_calc",
          "timestamp": "2025-01-18T21:02:59Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/0e74e204462d31fc1988af9add5e40f8a7ab9bd7"
        },
        "date": 1737242282427,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021541,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000385116,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004689,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.70753,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.86269,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0968248,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00983709,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.069612,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000214085,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019327,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.89886,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000028735,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.76905,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0577672,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.6219,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00807255,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006533,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153974,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.19819,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.3626,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000021291,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000506091,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00013412,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.23181,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.94208,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.130801,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00214471,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0207387,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000087269,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011773,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.746346,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000191291,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.44911,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0153678,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.36017,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00188596,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000006624,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0039768,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0515382,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.12358,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0808313,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152273,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106387,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.283303,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.9822,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.247997,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00441694,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0266316,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00569312,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000031381,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0654713,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0631242,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.078616,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00249594,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9771,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00923816,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.41568,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00282342,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0107957,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.4687,
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
          "id": "0e74e204462d31fc1988af9add5e40f8a7ab9bd7",
          "message": "Merge pull request #60 from aperijake/force_calc",
          "timestamp": "2025-01-18T21:02:59Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/0e74e204462d31fc1988af9add5e40f8a7ab9bd7"
        },
        "date": 1737292181408,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020981,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000434873,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009578,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.73382,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.86867,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0966429,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00987979,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0696279,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000217421,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018747,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.90723,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000027824,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.77063,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0577245,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.6419,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00772585,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006192,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015414,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.198574,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.383,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019077,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000452217,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000256938,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.14268,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.95933,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.124677,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0018408,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0192565,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000251849,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012675,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.752002,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000207252,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.451517,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0123914,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.34402,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00139875,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004489,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00449726,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0501953,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.11988,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0822083,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152759,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106621,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.283815,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.1512,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.248756,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00448839,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0277961,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00579627,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029849,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.07702,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0638581,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0656087,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00251037,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0912,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00842486,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.416303,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00293699,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0108362,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.5813,
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
          "id": "fc93f32b1c6d38651ad93cb9bcbe2fa416fc93b2",
          "message": "Merge pull request #61 from aperijake/incremental\n\nIncremental formulation for tet4 [skip ci]",
          "timestamp": "2025-01-26T03:54:00Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/fc93f32b1c6d38651ad93cb9bcbe2fa416fc93b2"
        },
        "date": 1737866696422,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022835,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000393788,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009038,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.65857,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.35632,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0961946,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00997441,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0727027,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000227149,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019288,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 4.31073,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000032093,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.7654,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0575557,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.554,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0079511,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006583,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0151669,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.197649,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.2957,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000028435,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000335251,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000457246,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.1302,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.12872,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.117087,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00320269,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0270369,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000152251,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011802,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.1129,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000932174,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.446097,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.015416,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.31514,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00149373,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000005599,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00399459,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0500308,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.14653,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0813432,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153092,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.108956,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.273849,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.4508,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.253114,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00442688,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0275382,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00578186,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030308,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.072249,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0637483,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0669032,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00254502,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9614,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00852706,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.417296,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0029058,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.010068,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.4531,
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
          "id": "9a101a6224f54afe20e3e666b7579787e2ca4c1d",
          "message": "Merge pull request #63 from aperijake/incremental\n\nperiodic reference update [skip ci]",
          "timestamp": "2025-01-31T13:24:12Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9a101a6224f54afe20e3e666b7579787e2ca4c1d"
        },
        "date": 1738345368074,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00002062,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000405475,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010371,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.18796,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.10531,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0907912,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00958044,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0686777,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000215618,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018485,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.91351,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000027122,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.78137,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0581683,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.6585,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0074303,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006072,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153548,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.199191,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.4,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019107,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000403162,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000042171,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.05111,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.97811,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.135014,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00227247,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0208511,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000259153,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010941,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.763524,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000033495,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.444417,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0120602,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.28476,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0013812,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004659,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00375875,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.049191,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.20864,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0832651,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153628,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.105925,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.282051,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.0957,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.249235,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00442556,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0274616,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00582155,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029818,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0760419,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0690116,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.063653,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00307512,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9909,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.009682,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.417492,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00293304,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0100448,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.4803,
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
          "id": "9a28db7abfd54c82b6ea9e22f5aa74e2cadaf33d",
          "message": "Merge pull request #64 from aperijake/semi_lagrangian\n\nprep for semi lagrangian [skip ci]",
          "timestamp": "2025-02-01T03:40:44Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9a28db7abfd54c82b6ea9e22f5aa74e2cadaf33d"
        },
        "date": 1738384428692,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023195,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000382109,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010059,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.57649,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.77905,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0964348,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00989135,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0707622,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000226128,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018276,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.82515,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000027323,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 1.76249,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0578393,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.5247,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00817539,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006343,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0151777,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.19738,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.2656,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000018486,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0003828,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000005711,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.12318,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.93392,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.121798,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00149514,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0173958,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000191089,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010891,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.723488,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000092078,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.444883,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0154199,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.23177,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00150144,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000005551,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00384721,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0504249,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.16015,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0813769,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152887,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.107923,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.277133,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.7441,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.251712,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00437579,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0280863,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00575495,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029917,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0626924,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0638056,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0893401,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00268623,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9664,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00870625,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.406749,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00291618,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0101838,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.4657,
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
          "id": "793ce1e8ad4628d6ac7032d7f756e8edebf56e7c",
          "message": "Merge pull request #67 from aperijake/map_testing\n\nwork on maps [skip ci]",
          "timestamp": "2025-02-08T23:27:54Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/793ce1e8ad4628d6ac7032d7f756e8edebf56e7c"
        },
        "date": 1739060095243,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000027514,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000354919,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000483,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.55091,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.83357,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0835372,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0086983,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0673528,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000199994,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015821,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.81795,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020811,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 20.3389,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0314902,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009408,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015542,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.182694,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.31762,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.6843,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000032134,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000134324,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000008326,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.10581,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.93665,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.119403,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00375126,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.02275,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005594,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012064,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.723734,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000034467,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.30692,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00929795,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000007485,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0039487,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0489425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.13926,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.95194,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.081139,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.1528,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.111251,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.27863,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.4911,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.247751,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00416849,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0277605,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00584247,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029136,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.073598,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0100928,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 19.9706,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0276156,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.229714,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00338064,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0097084,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 8.25022,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 11.392,
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
          "id": "8554cb32b9f88729b386f444ca8b085695cd36f7",
          "message": "Merge pull request #66 from aperijake/mat00",
          "timestamp": "2025-02-09T02:08:45Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/8554cb32b9f88729b386f444ca8b085695cd36f7"
        },
        "date": 1739074384375,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026711,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000354788,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004368,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.53564,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.81335,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0933152,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00929584,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0685287,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000218512,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017112,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.87212,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024006,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 20.4109,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.032415,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009849,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0155732,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.182218,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.35015,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.7281,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000021704,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000130968,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022415,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.04581,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.93685,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.119462,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0035486,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0213332,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000058339,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011222,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.741066,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022415,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.34673,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00769433,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019379,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00403203,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0486655,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.1608,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.97926,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0809742,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152775,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106201,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.272185,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.2555,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.249785,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00409408,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0276122,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0057281,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029316,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0760856,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.010228,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 20.0892,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0282039,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.224016,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00344632,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00897579,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 8.32388,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 11.4393,
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
          "id": "fd048f6fa5f16d7674ad5a49d2a73d903005645c",
          "message": "Merge pull request #68 from aperijake/semi_lagrangian\n\ncomplete first pass at semi lagrangian [skip ci]",
          "timestamp": "2025-02-14T16:45:56Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/fd048f6fa5f16d7674ad5a49d2a73d903005645c"
        },
        "date": 1739554306750,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000033505,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00040318,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010229,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.61742,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.92254,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.09406,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00953179,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.069642,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000205117,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014207,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.73823,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0331516,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005211,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015735,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.182939,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.50633,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9138,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016001,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.88712,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000025419,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000133339,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016221,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.09931,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.9512,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.118557,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00327849,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0189722,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000057381,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014368,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.36745,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0156535,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000006072,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00394605,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0463721,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.19749,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.99775,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012424,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.747651,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0812033,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153462,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106128,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.284468,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.5481,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.250485,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00447192,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0277989,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00550954,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.010874,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 8.47657,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0276985,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.228927,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00393531,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0117313,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 8.43311,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 11.5099,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029597,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0777569,
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
          "id": "15994dc2aceb019cdb16d19ab91033ff8956a9fa",
          "message": "Merge pull request #70 from aperijake/semi_lagrangian\n\nmisc small features [skip ci]",
          "timestamp": "2025-02-18T03:37:11Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/15994dc2aceb019cdb16d19ab91033ff8956a9fa"
        },
        "date": 1739852689521,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000029698,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000381273,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001008,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.56434,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.85005,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0937179,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0094018,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0685541,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000222745,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000013817,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.73831,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0325238,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000489,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0155981,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.182625,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.50749,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8591,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016733,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.86651,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000038945,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000131745,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013285,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.05825,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.91711,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.119369,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00350815,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0199447,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005674,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014879,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.36582,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0158214,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004188,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00393152,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0460503,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.19388,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.99935,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011182,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.735591,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0807373,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152815,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106027,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.278914,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.6081,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.250503,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00431683,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0277793,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00568059,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.010807,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 8.44032,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0281337,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.228918,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00372655,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0112857,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 8.39709,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 11.5139,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030669,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0776817,
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
          "id": "0e3f7f4c1bf57908cde2f627f8eeb58eea15ced4",
          "message": "Merge pull request #71 from aperijake/f_bar [skip ci]\n\nsome prep for F-bar",
          "timestamp": "2025-02-21T20:55:17Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/0e3f7f4c1bf57908cde2f627f8eeb58eea15ced4"
        },
        "date": 1740174048417,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026511,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00044398,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004589,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.63635,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.29606,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0961851,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00970023,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.070458,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000199757,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018696,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 63.7015,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0407395,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.016118,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.345404,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 63.2991,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8245,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016361,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.86413,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022974,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000138107,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000024377,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.13561,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.04229,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.124517,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00378072,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0186294,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005695,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014087,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.0335,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0167842,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00438045,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0879857,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 16.9243,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.94215,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014118,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.742475,
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
          "id": "60044af7215f1c3964774804365d2ff48316c407",
          "message": "Merge pull request #72 from aperijake/f_bar\n\nbetter guess at unordered map size for nodal integration [skip ci]",
          "timestamp": "2025-02-22T04:28:58Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/60044af7215f1c3964774804365d2ff48316c407"
        },
        "date": 1740201214873,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024959,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000425442,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000502,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.56371,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.87229,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0972064,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00975065,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0704081,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000206159,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016172,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.97627,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.424097,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0159825,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346996,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.1891,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.1281,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017244,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.82102,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000034627,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0001348,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014959,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.11366,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.94261,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.123404,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00380258,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0212081,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000059926,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017404,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.82972,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.22733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00406561,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0877091,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.51047,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.21476,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011101,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.871972,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0815375,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152703,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106605,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.280268,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.1679,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.248907,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00447112,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0275298,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00589219,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0109005,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.09539,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.278687,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00407864,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00964445,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.802884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.50712,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000031831,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.054632,
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
          "id": "14c4bad60129db71c08bd68c1c184d47486fe9f8",
          "message": "Merge pull request #74 from aperijake/f_bar [skip ci]\n\nsimplify mesh labeler",
          "timestamp": "2025-02-23T00:30:06Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/14c4bad60129db71c08bd68c1c184d47486fe9f8"
        },
        "date": 1740273324763,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000031841,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000043154,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000517,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.67259,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.27458,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0964473,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00809765,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0701981,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000204025,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012514,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.95914,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.422465,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015716,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.353859,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.16701,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0788,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016863,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 3.02642,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00003129,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00004139,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017263,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.10497,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.988,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.124217,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00292368,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0220816,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000056729,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014028,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.63584,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.227945,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.004005,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0901714,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.31363,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.00002,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011903,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.767108,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0804045,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153129,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.10607,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.279214,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.0791,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.253834,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00304209,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0289837,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00584119,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.005839,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08763,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.276953,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00338496,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0112829,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.795924,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.48938,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000028005,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0547556,
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
          "id": "bef85164ce380e9bdf1a5d2021fd7eb1e49fd99c",
          "message": "Merge pull request #75 from aperijake/f_bar [skip ci]\n\nlabel subcells for F_bar",
          "timestamp": "2025-02-24T19:22:05Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/bef85164ce380e9bdf1a5d2021fd7eb1e49fd99c"
        },
        "date": 1740427829480,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016993,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000047252,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010239,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.60719,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.95446,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0936264,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00790565,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0674281,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000214546,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000368154,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.78704,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.3065,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.407758,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157494,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346931,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.99869,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8828,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001581,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.84502,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000018436,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053815,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017564,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.09565,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.9513,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.119576,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00291886,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0184841,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000059646,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000115584,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.60292,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.99755,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.211689,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00386065,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0881178,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29609,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.98726,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011933,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.772756,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.091816,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151717,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.105566,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.285528,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.1049,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0938621,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00313317,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0278499,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00534574,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000314138,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.07995,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0003,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.268993,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00312681,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00801732,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.79241,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49129,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000028636,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0547106,
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
          "id": "2a88059e6a64d5849b78e7c0a4fe501b77da58a5",
          "message": "Merge pull request #76 from aperijake/f_bar [skip ci]\n\nImplement F-bar math",
          "timestamp": "2025-02-25T12:38:28Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/2a88059e6a64d5849b78e7c0a4fe501b77da58a5"
        },
        "date": 1740489921977,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022203,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000051239,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004379,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.67114,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.32442,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0965152,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00756706,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0694769,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000225458,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000359628,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.82745,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.3551,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.42781,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157427,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.34792,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.0184,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9074,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016803,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.88242,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000018606,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053494,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017003,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.15562,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.04825,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.121499,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0030273,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0201626,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000058444,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000125373,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62778,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.35258,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.227302,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00385992,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0889154,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30459,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.9766,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012795,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.740548,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0916783,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151971,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106622,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.285966,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.4934,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0972823,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00319354,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0286684,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00537659,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000325963,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.09371,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0529,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.281566,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00328443,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00822167,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.793216,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49304,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030128,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0546111,
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
          "id": "7cbfd7243e105574258cca30a92906461367330c",
          "message": "Merge pull request #77 from aperijake/f_bar [skip ci]\n\nF bar, first full-working capability",
          "timestamp": "2025-02-26T02:36:56Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/7cbfd7243e105574258cca30a92906461367330c"
        },
        "date": 1740540080889,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023886,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000052591,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004679,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.54285,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.99873,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.094107,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00789512,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0681578,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000204175,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00034493,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.85127,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.4529,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.414109,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156668,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.347718,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.05543,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9511,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014909,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.87447,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000018245,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000054406,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017644,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.05099,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.96869,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.118069,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00240307,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0260137,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000057551,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000113721,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62265,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.06474,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.226258,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00390345,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.088358,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30129,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.00454,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013356,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.746551,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0938143,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153303,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.105839,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.2831,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.8385,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0948978,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00339421,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0293814,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00555316,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000358616,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08566,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.069,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.272872,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00353299,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00823185,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.793459,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49255,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000027573,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0548158,
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
          "id": "3ff3401cc59c396862fa9c133359231990ca29aa",
          "message": "Merge pull request #78 from aperijake/f_bar [skip ci]\n\nF bar testing",
          "timestamp": "2025-02-27T03:56:27Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/3ff3401cc59c396862fa9c133359231990ca29aa"
        },
        "date": 1740631869088,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015911,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050939,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004468,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.5627,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.274,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0941492,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00795414,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.069453,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00020139,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000380638,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.86845,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.4648,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.41879,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156655,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.348504,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.0671,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0927,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017093,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.89667,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000023095,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053824,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016142,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.07068,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.02993,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.119062,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.003307,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0189431,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000057322,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0001134,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61923,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.0876,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.226889,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0040388,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0884959,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.2968,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.00235,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012745,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.742138,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0929894,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152656,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106002,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.282499,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.0023,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0945886,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00326553,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0289932,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00545836,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000329739,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08764,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.9835,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.274349,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00345196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00798422,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.793753,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49294,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029978,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0547799,
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
          "id": "3ff3401cc59c396862fa9c133359231990ca29aa",
          "message": "Merge pull request #78 from aperijake/f_bar [skip ci]\n\nF bar testing",
          "timestamp": "2025-02-27T03:56:27Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/3ff3401cc59c396862fa9c133359231990ca29aa"
        },
        "date": 1740632264125,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015911,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050939,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004468,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.5627,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.274,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0941492,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00795414,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.069453,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00020139,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000380638,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.86845,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.4648,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.41879,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156655,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.348504,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.0671,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0927,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017093,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.89667,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000023095,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053824,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016142,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.07068,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.02993,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.119062,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.003307,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0189431,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000057322,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0001134,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61923,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.0876,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.226889,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0040388,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0884959,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.2968,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.00235,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012745,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.742138,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0929894,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152656,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106002,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.282499,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 23.0023,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0945886,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00326553,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0289932,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00545836,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000329739,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08764,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.9835,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.274349,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00345196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00798422,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.793753,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49294,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029978,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0547799,
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
          "id": "c99d149997426493618f14037bf796d3dbee6991",
          "message": "Merge pull request #79 from aperijake/f_bar [skip ci]\n\nget performance test for f bar running [skip ci]",
          "timestamp": "2025-02-27T18:51:08Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/c99d149997426493618f14037bf796d3dbee6991"
        },
        "date": 1740685815177,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017343,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000053012,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004689,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.61141,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.28086,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0964924,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00842804,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0724509,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000223001,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000363562,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.80469,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.4072,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.430763,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0158642,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.35028,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.98998,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9371,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017213,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.88042,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022073,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000055257,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017654,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.17713,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.05386,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.125024,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00375938,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0180745,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000059485,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000126935,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.65498,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.54429,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.22832,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00400353,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0896234,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.32992,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.03238,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011813,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.754055,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0934077,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152848,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106344,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.287039,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.6749,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0968788,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00337543,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0291983,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00550642,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000345717,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.10681,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0692,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.293377,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00344122,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00780481,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.794579,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49269,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030129,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0548203,
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
          "id": "19bd4024f976d06d2c30802df49da516e5ca86da",
          "message": "Merge pull request #80 from aperijake/f_bar [skip ci]\n\nadd sanitizer build options. fix issue in f bar.",
          "timestamp": "2025-02-28T00:40:07Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/19bd4024f976d06d2c30802df49da516e5ca86da"
        },
        "date": 1740706884977,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018856,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000060446,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001057,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.7281,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.29479,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0957915,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00823021,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0695032,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0002079,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000419486,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.87469,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.2557,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.424498,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156164,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.347151,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.06983,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9736,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016111,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.83103,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001549,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000055799,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019027,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.14118,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.02626,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.123114,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00307573,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0209159,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000057532,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000121196,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61007,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.33111,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.229186,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0039331,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0889192,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.28521,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.96906,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012355,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.71863,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0924979,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152836,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.105975,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.282398,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.968,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0961742,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00323658,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0283721,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00542872,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000348491,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08826,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.99687,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.276972,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00333213,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00806128,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.792477,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49274,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000028856,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0549142,
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
          "id": "649a2b537747b6294983f699c6cd2e693cedeb8b",
          "message": "Merge pull request #81 from aperijake/f_bar [skip ci]\n\nfix more undefined bevahior. velocity_gradient issue.",
          "timestamp": "2025-03-02T00:53:02Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/649a2b537747b6294983f699c6cd2e693cedeb8b"
        },
        "date": 1740880457979,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018075,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000054276,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011052,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.67621,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.98817,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0969039,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00817998,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0692121,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000206981,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000349918,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.84168,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.2602,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.425516,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157223,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346925,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.03594,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9304,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001534,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.86119,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000018315,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053423,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000023767,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.165,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.94175,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.123405,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00337958,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0213248,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000060026,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000129612,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62267,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.30961,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.229466,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00403147,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0894172,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29695,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.99793,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012324,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.739834,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.092857,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151661,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106514,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.28287,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.7417,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0968137,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00316785,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0287468,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00531494,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000446786,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08767,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0128,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.276453,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00320269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0079903,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.792555,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49212,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029086,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0547354,
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
          "id": "b650ae2b4920d43e50a6b13f9bcaab52fc5cab92",
          "message": "Merge pull request #82 from aperijake/f_bar [skip ci]\n\nmulti body rk",
          "timestamp": "2025-03-02T04:59:30Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/b650ae2b4920d43e50a6b13f9bcaab52fc5cab92"
        },
        "date": 1740927918050,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001531,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000372211,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.73189,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.2945,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.408709,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015649,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346423,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.94335,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9241,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014448,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.83382,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011071,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000110534,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.60015,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.00987,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.213128,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00389765,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0883922,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29137,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.00377,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016181,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.734691,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0920426,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000319429,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.07905,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.025,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.267992,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00316099,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00790823,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.792628,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49429,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152486,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0546309,
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
          "id": "d0c8a5dcd9ef618ee1ff9d5b8264908f2d1f9eb5",
          "message": "Merge pull request #83 from aperijake/f_bar [skip ci]\n\nfix clustering issue with multiple block",
          "timestamp": "2025-03-03T01:54:01Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/d0c8a5dcd9ef618ee1ff9d5b8264908f2d1f9eb5"
        },
        "date": 1740970676912,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014939,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000353748,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.73544,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.4622,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.427143,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156078,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346724,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.9283,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8827,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012654,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.89196,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001577,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000122677,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62724,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.35463,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.22839,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0039564,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0883555,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30369,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.01496,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014989,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.747063,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0945099,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0003326,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08705,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0967,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.277167,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00315791,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00752516,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.791869,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.49343,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.162767,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.05468,
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
          "id": "0db24fed25c39fdc32a9bd33b0c6da56b74779a8",
          "message": "Merge pull request #85 from aperijake/docker_gpu_fix [skip ci]\n\nDocker work",
          "timestamp": "2025-03-18T05:13:03Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/0db24fed25c39fdc32a9bd33b0c6da56b74779a8"
        },
        "date": 1742279216758,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001053,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000478865,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.71359,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.0838,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.428995,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153918,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.345244,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.90634,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.95,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016111,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.71924,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009729,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00014521,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.63005,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.51766,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.228779,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00389754,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0890488,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30549,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.0235,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014368,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.702911,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.29486,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000338224,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08442,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0977,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.280551,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00310306,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00756194,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.786194,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00105098,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152018,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0613038,
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
          "id": "b2913f4112f7e4e530e46a25304bc74d2d00120f",
          "message": "Merge pull request #90 from aperijake/power_method_drucker_prager [skip ci]\n\nImplement power method for stated materials",
          "timestamp": "2025-03-22T00:32:08Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/b2913f4112f7e4e530e46a25304bc74d2d00120f"
        },
        "date": 1742607267571,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012414,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000479134,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.75891,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.2358,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.422962,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0160174,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.34578,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.95608,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0968,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016202,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.75178,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019267,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00020709,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.617,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.39761,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.227132,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00393856,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0882142,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29482,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.02538,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001556,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.702483,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0908384,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000343202,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08273,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.66401,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.279826,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00332239,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00768134,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.784714,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000999027,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152185,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0612546,
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
          "id": "f12e31de20de9b52d0db00561e1d90d72b0a4ff6",
          "message": "Merge pull request #91 from aperijake/output_lock_fix [skip ci]\n\nset MINIMIZE_OPEN_FILES in Ioss to allow viewing results while running",
          "timestamp": "2025-03-22T15:43:09Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/f12e31de20de9b52d0db00561e1d90d72b0a4ff6"
        },
        "date": 1742662182735,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014198,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000636772,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.7278,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.4777,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.446657,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0174474,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.359623,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.88247,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.0259,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016502,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 3.03607,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017083,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000214575,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.84048,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.45574,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.246686,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00416463,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0912736,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.49456,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.19453,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016161,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.812092,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0896611,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000283318,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.10265,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.913,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.295744,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00523627,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00775194,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.785765,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0010665,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.157709,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0614055,
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
          "id": "59a665e743777d61dd21dc6b060edaa2d2e48a8c",
          "message": "Merge pull request #92 from aperijake/material_separation [skip ci]\n\nadd utilities leading to material separation",
          "timestamp": "2025-03-27T05:42:48Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/59a665e743777d61dd21dc6b060edaa2d2e48a8c"
        },
        "date": 1743057854405,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012764,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000469171,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.69129,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.1834,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.406806,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156315,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.34514,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.90584,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0381,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014247,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.73592,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013366,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000173541,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61519,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.02222,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.202637,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00457381,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0879762,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.31567,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.10816,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000015519,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.700587,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0905295,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00030876,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.07496,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.62321,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.270736,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0030743,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00775632,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.786393,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000959145,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151698,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.061114,
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
          "id": "012d2b19a930e8091b97a24e90923d2123b6f6c2",
          "message": "Merge pull request #94 from aperijake/material_separation [skip ci]\n\nelement geometry utils",
          "timestamp": "2025-04-06T21:47:54Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/012d2b19a930e8091b97a24e90923d2123b6f6c2"
        },
        "date": 1743979720316,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012193,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000468145,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.7847,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.2958,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.431026,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157721,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.34599,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.97412,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.141,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015049,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.7506,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012594,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000200418,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.63663,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.36489,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.2302,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00481229,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0884816,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30877,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.08385,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016171,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.702596,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.090212,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00031556,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08656,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.52686,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.281629,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00318898,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00807586,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.786664,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00113938,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151696,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0611939,
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
          "id": "2a6b90a750d52a94913f16478c0a158d08f0727a",
          "message": "Merge pull request #95 from aperijake/creep\n\nAdd creep material model",
          "timestamp": "2025-04-08T01:05:14Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/2a6b90a750d52a94913f16478c0a158d08f0727a"
        },
        "date": 1744083784312,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000013486,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000469931,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.70336,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 10.31,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.41496,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153848,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.345335,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.9101,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9943,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024067,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.73744,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001597,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000236318,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62941,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.39646,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.217289,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0046574,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.088769,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.31447,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.03855,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017854,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.711287,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0896891,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000315131,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.07855,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.57557,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.277296,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00303268,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00724787,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.784094,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000939711,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.150242,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0611275,
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
          "id": "74c30d557434f1e480595887092a3899ded69180",
          "message": "Merge pull request #97 from aperijake/creep [skip ci]\n\nplug creep model parameters into schema [skip ci]",
          "timestamp": "2025-04-15T02:51:54Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/74c30d557434f1e480595887092a3899ded69180"
        },
        "date": 1744689297010,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015981,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000473267,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.94231,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.3093,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.434419,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0155351,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.345641,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.12863,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.3122,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014037,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.73135,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012925,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000192473,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.63125,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.38207,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.22508,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00395797,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0882386,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30976,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.01803,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0000159,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.704038,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0904566,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000323317,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08583,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.7863,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.281549,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00312324,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00753577,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.786573,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000932829,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151944,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0612126,
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
          "id": "c4d68d577f07668c31619886f27f5876db2fd39a",
          "message": "Merge pull request #98 from aperijake/material_separation [skip ci]\n\nadd kinematics tests",
          "timestamp": "2025-04-26T02:55:13Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/c4d68d577f07668c31619886f27f5876db2fd39a"
        },
        "date": 1745640062119,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016171,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000463708,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.74727,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.1319,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.418063,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156671,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346404,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.94938,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0545,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000013496,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.74649,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001533,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000175085,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61653,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.26144,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.226019,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00386602,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0880091,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29579,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.03996,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012333,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.701462,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0904285,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000348097,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08614,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.6463,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.280923,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00324393,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00813616,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.78679,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000929109,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151182,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0611795,
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
          "id": "95c9b5808626aa1c7e3961113347e3d13f582526",
          "message": "Merge pull request #99 from aperijake/material_separation [skip ci]\n\nCreep model fixes",
          "timestamp": "2025-05-02T23:14:01Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/95c9b5808626aa1c7e3961113347e3d13f582526"
        },
        "date": 1746231502938,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012995,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000478542,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.88345,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.5488,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.416795,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157424,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.347483,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.08564,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.1076,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014208,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.76942,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001034,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000190357,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62412,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.31309,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.226997,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00398558,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0879552,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30222,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.02964,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013877,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.705368,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0906923,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000339145,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.07967,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.7397,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.275878,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0031071,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00755773,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.786112,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000939663,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.151926,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0612385,
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
          "id": "6c94c48b9464184405c14bfa9300d024eff298f9",
          "message": "Merge pull request #101 from aperijake/material_separation [skip ci]\n\nMaterial separation",
          "timestamp": "2025-05-31T03:10:57Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/6c94c48b9464184405c14bfa9300d024eff298f9"
        },
        "date": 1748663914119,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018195,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011592,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0300042,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000474751,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0278784,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.83098,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153072,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00599245,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00645571,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014378,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008736,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0907352,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152282,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0100735,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000311855,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0124064,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.811752,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00357385,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000741038,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000739525,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00108605,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0005924,
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
          "id": "37a02ac4dd691982894f9a0530103661cc14f610",
          "message": "Merge pull request #102 from aperijake/material_separation [skip ci]\n\nFixes for material separation",
          "timestamp": "2025-05-31T19:06:05Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/37a02ac4dd691982894f9a0530103661cc14f610"
        },
        "date": 1748722179396,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017192,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000013385,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.77072,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000466445,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.82964,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.5693,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.423195,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157361,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.34949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.02332,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.524,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010451,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010531,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.71229,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0001987,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.71611,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.35962,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.227275,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00390026,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0886017,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.39335,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.25868,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0909005,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152784,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0691251,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000351146,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.10317,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.406,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.296728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00341569,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00812505,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.787211,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00105438,
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
          "id": "0c5be6a4f69361c24728e065431da742fe0b8925",
          "message": "Merge pull request #103 from aperijake/update_trilinos [skip ci]\n\nUpdate trilinos",
          "timestamp": "2025-06-03T19:58:36Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/0c5be6a4f69361c24728e065431da742fe0b8925"
        },
        "date": 1748989331199,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015209,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011662,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.5001,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000365655,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.63495,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.0478,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.419107,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0155126,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.349641,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.83264,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8537,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013846,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000008547,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.649076,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000158179,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.58513,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.47209,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.225468,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00395153,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0883958,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.26399,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.02327,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0835627,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.14734,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0689919,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000376945,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08971,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.7644,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.278719,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00225739,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00778386,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.795734,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000819863,
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
          "id": "6bada80bce3099fef2ec62fd9c1918a34c13fb3d",
          "message": "Merge pull request #104 from aperijake/timer_update [skip ci]\n\ntimer updates",
          "timestamp": "2025-06-04T19:43:43Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/6bada80bce3099fef2ec62fd9c1918a34c13fb3d"
        },
        "date": 1749069821445,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011633,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000013126,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.49235,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000353614,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.71792,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.1508,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.424522,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0158901,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.348564,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.91057,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8934,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017554,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001033,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.637,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000171188,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.58105,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.50801,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.225004,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00386642,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0888178,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.25994,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.98823,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.082359,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.146069,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0688845,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000378322,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.09018,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9254,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.272986,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0023164,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00735457,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.802188,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51387,
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
          "id": "657fd1a56b3182e8d3d6fb7d04fb696e03c75989",
          "message": "Merge pull request #106 from aperijake/type_work [skip ci]\n\ncentralize data type specification",
          "timestamp": "2025-06-05T22:00:34Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/657fd1a56b3182e8d3d6fb7d04fb696e03c75989"
        },
        "date": 1749164516644,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012644,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012594,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.49104,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000354204,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.71255,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.2382,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.418224,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015565,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.34851,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.9122,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.7866,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000021772,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009237,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.643616,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000170961,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.59483,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.50887,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.223457,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00390323,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0886413,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.27547,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.98079,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0823821,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.147844,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0643508,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000358241,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.09101,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.8209,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.274214,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00220442,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00734548,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.801556,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51098,
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
          "id": "ccc7f41d77cd82b748a054ff00268080da9a6353",
          "message": "Merge pull request #107 from aperijake/misc_refactoring [skip ci]\n\nMisc refactoring",
          "timestamp": "2025-06-09T22:46:12Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/ccc7f41d77cd82b748a054ff00268080da9a6353"
        },
        "date": 1749512762516,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017273,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003537,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.49225,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000344315,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.96463,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.6629,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.469264,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157796,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.349746,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.11103,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0285,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016812,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000002635,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.633922,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000132376,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.63694,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.22286,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.22735,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00403039,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.089637,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.31223,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.03008,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0828011,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000008457,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0771076,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000387309,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08705,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0944,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.270565,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00228714,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00705102,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.801799,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51039,
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
          "id": "9d54fea3419f515239d32a4e1bbaba4fb50393a2",
          "message": "Merge pull request #108 from aperijake/for_each_with_caching [skip ci]\n\nadd caching option to ForEachEntity",
          "timestamp": "2025-06-10T01:53:41Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9d54fea3419f515239d32a4e1bbaba4fb50393a2"
        },
        "date": 1749523982837,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024988,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003316,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.42342,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00032581,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.75335,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.6186,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.41674,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156898,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.349287,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.95295,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0912,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011252,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000002254,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.615902,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000153707,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61932,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.21145,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.225324,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00388665,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0892275,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29701,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.03378,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0830786,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007916,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0629155,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000386807,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08651,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.1737,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.269027,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00236605,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00759077,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.802141,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51166,
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
          "id": "999a0431a3d4ee8c372a5c0e1e5821336f6673e9",
          "message": "Merge pull request #109 from aperijake/search_update [skip ci]\n\nSearch update",
          "timestamp": "2025-06-10T21:38:53Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/999a0431a3d4ee8c372a5c0e1e5821336f6673e9"
        },
        "date": 1749594928758,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017863,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004137,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.46521,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000362489,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.70568,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.2012,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.42399,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0157203,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.347497,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.90041,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8051,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000015089,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000002124,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.632036,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000136789,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.60132,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.5952,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.225934,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00392949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0885102,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.27982,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.026,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0820823,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000008756,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0663699,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000378826,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08992,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0983,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.272635,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00229962,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00738989,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.802141,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.511,
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
          "id": "80f57c141a37b1fa2843a9620271e0b9dace5983",
          "message": "Merge pull request #110 from aperijake/search_update [skip ci]\n\nre-hook in neighbor search timers",
          "timestamp": "2025-06-11T21:15:03Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/80f57c141a37b1fa2843a9620271e0b9dace5983"
        },
        "date": 1749680054306,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012985,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004097,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.43059,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000372934,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.67704,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.2056,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.427309,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153093,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346516,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.87009,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.72,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000015189,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000002565,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.624722,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000171208,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62582,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.65225,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.227733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00423522,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0883707,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30206,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.02204,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0825363,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007385,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0636289,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000371271,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.09685,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9491,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.279287,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00223752,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00747886,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.802461,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51041,
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
          "id": "281c82483fd6f8ee2cce7950bd1fde7ea8189489",
          "message": "Merge pull request #111 from aperijake/search_update [skip ci]\n\nSearch update",
          "timestamp": "2025-06-12T04:00:40Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/281c82483fd6f8ee2cce7950bd1fde7ea8189489"
        },
        "date": 1749704253119,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012755,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004018,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.43923,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000361426,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.75191,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.4657,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.426737,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0154287,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.348666,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.94278,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.7767,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001569,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000002154,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.631086,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000192178,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.60519,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.64317,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.237558,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00388386,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0883038,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.27178,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.02094,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.082276,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000006983,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0626402,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000381472,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.09314,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0149,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.27612,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00254081,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00752822,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.801536,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.50878,
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
          "id": "f5265df5dfd5c3a62735ab60780d45e3aec53340",
          "message": "Merge pull request #112 from aperijake/search_update [skip ci]\n\nPrefer local offsets of EntityIds in search",
          "timestamp": "2025-06-13T02:58:03Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/f5265df5dfd5c3a62735ab60780d45e3aec53340"
        },
        "date": 1749787017266,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011162,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004148,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.50616,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000317765,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.70175,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.2804,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.41065,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153889,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.347372,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.91005,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.9474,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000034828,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000003116,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.62897,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000145191,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.6146,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.09308,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.255017,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.003891,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0886746,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.26331,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.99879,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.082994,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007044,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0715447,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000386264,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08058,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0294,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.264534,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00215908,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00744809,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.801092,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51181,
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
          "id": "101c688af985a70771115a56e73e4a76d459fa3d",
          "message": "Merge pull request #113 from aperijake/spack_updates [skip ci]\n\nSpack updates",
          "timestamp": "2025-06-15T18:31:29Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/101c688af985a70771115a56e73e4a76d459fa3d"
        },
        "date": 1750015716025,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011352,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004059,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.46405,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00031945,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.68078,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.3134,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.420383,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156902,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.34752,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.87882,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8553,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014588,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000002235,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.630897,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000150513,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62946,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.13657,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.234269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00408295,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0883515,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29915,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.0225,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0823625,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000006953,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0778531,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000368476,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08645,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.1157,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.269595,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00221139,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00766533,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.801591,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.5112,
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
          "id": "7cd889dfa89cb187ce6691725698cea19c2d2502",
          "message": "small readme change",
          "timestamp": "2025-06-16T23:46:06Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/7cd889dfa89cb187ce6691725698cea19c2d2502"
        },
        "date": 1750127185624,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018216,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000484,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.49986,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000372866,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.72987,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.1229,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.427889,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0153641,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.347119,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.92163,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8235,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011202,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000002545,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.64303,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000173387,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61991,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.62977,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.229883,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00410517,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0898618,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29217,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.98314,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0819131,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000006563,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0770128,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000378756,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.09702,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9441,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.278253,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00217611,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00786404,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.803418,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.5125,
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
          "id": "dc4117d5403d3775326e2e543163833946bb985e",
          "message": "Merge pull request #114 from aperijake/search_update [skip ci]\n\nSearch update",
          "timestamp": "2025-06-19T11:10:42Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/dc4117d5403d3775326e2e543163833946bb985e"
        },
        "date": 1750334871328,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011422,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004719,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.60571,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000337277,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.75086,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.4383,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.409135,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.015728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.351666,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.95602,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 12.0061,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012795,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000004108,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.641497,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000133526,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.61389,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.16423,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.221054,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00381492,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0888199,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.29717,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.00853,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0833671,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000006944,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0549174,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000373829,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.07712,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.0851,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.262881,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00217286,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00683512,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.799982,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51275,
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
          "id": "03d3ddeb0c58ffc3f64d8bffff92fc1dd2da8cf5",
          "message": "fix ordering issue in performance pipeline [skip ci]",
          "timestamp": "2025-06-20T21:53:27Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/03d3ddeb0c58ffc3f64d8bffff92fc1dd2da8cf5"
        },
        "date": 1750459973243,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000039106,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00008284,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.43375,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000378952,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.80076,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.5444,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.424502,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0156351,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.348215,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.99432,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8529,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000044676,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000093802,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.636883,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000224856,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.62351,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.61235,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.225791,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00401033,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0893509,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.30147,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.00202,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0820014,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000070426,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0545406,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000389453,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08865,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 12.9754,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.272234,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00250622,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00690017,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.801732,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51154,
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
          "id": "8d99364dd9699ae2fd1e3340e31cf6ffb1d01835",
          "message": "stash changes first [skip ci]",
          "timestamp": "2025-06-21T05:44:45Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/8d99364dd9699ae2fd1e3340e31cf6ffb1d01835"
        },
        "date": 1750488078825,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000040057,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_Other_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000083451,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.43812,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000396695,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.80723,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_LabelParts_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 13.3114,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.423623,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SyncFields_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0155413,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.346765,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.0034,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 11.8845,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000036511,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_Other_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000090966,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.623947,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000154287,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_ComputeDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.60966,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_LabelParts_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.61557,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.223948,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SyncFields_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_AddCellNumElements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00406844,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0892682,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.28826,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.01084,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_CreateElementForceProcessor_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0822005,
            "unit": "seconds"
          },
          {
            "name": "Element_Element_Other_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000077139,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_FunctionCreationProcessor_ComputeFunctionValues_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0549782,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000386337,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_ComputeDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_StrainSmoothingProcessor_BuildSmoothedCellData_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.08647,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_LabelParts_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 13.005,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.270551,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SyncFields_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_AddCellNumElements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00226745,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetCellLocalOffsets_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00691986,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetNodeIndiciesAndMap_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.801457,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SmoothedCellData_SetFunctionDerivatives_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51138,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}