window.BENCHMARK_DATA = {
  "lastUpdate": 1737242283332,
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
      }
    ]
  }
}