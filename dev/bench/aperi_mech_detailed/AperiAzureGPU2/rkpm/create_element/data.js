window.BENCHMARK_DATA = {
  "lastUpdate": 1736701253567,
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
        "date": 1735328589879,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000524939,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000125213,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008998,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 35.7534,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 3.88939,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0200129,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00866834,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00697009,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000784352,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001527,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.917798,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000029507,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.82425,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0365499,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.45556,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.072317,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003297,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0224195,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0356111,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.32516,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000171353,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00015468,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00005112,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 4.44605,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.862592,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.128963,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00247124,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00226815,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000233914,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011392,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.212332,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00003605,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.210569,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0100158,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.382368,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0229359,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000002956,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00636696,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00904944,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.343894,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.063768,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263186,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0227623,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.206908,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.33092,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0468209,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00728623,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00677587,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00254589,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000029948,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0252549,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00988624,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0233893,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00302928,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.78044,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0684914,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192156,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0071238,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0114775,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.37875,
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
        "date": 1735681823587,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000510273,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000133787,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000005361,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 34.3701,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 3.84002,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0226565,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00871977,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00700979,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00077366,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016141,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.969466,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000022995,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.831612,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0365935,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.4882,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0667297,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003346,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0221839,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0353485,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.36389,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000174586,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000152745,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000054825,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 4.32873,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.83937,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.288699,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00812715,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00234187,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000293155,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001071,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.218188,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000036861,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.181403,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0104396,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.437569,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0259604,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000003877,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00592373,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00905169,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.34101,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0639953,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0262851,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0223986,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.201847,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.23931,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0457638,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00634083,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.005979,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0025817,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028015,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0253321,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0097357,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0233182,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00296044,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.73002,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0659949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192147,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00720313,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0103199,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33441,
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
        "date": 1736284592021,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0053627,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000120527,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000005079,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 33.9461,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 3.73131,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0207392,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00887406,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00698597,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000752817,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000015069,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.924269,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000022923,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.795535,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0364534,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.49107,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0706923,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003687,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.022193,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0350237,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.36309,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000163763,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000156058,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000148858,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 4.3953,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.828796,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.134,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00258491,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00224424,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000227084,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012374,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.205078,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000064224,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.179822,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0106915,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.456728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0317844,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000003556,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00588423,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00902572,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.339983,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0617428,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0259172,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225185,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.214337,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.15362,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.04901,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00649821,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00602085,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00246624,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002637,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0260629,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00928362,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0230933,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00276206,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.73236,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0693791,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.19252,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00698901,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0103732,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33119,
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
        "date": 1736331758508,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000736158,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000151556,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004439,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.57057,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.41138,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0239104,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0115027,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00884504,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00079874,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016481,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 1.00392,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000028905,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.894064,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0389591,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.36947,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0785043,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003577,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0230421,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.040859,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.22699,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000141967,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000232448,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000230183,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.940242,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.55606,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.145306,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00339096,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00255768,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000357704,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011662,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.218959,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000099568,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.189532,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0117594,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.419027,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0365696,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000004328,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00689856,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0116515,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.346559,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.062246,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.026041,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0230546,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.201151,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 5.60079,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.052304,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00578598,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00561081,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00229498,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000034958,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0252426,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00999268,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0229224,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00300187,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.77315,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0734752,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.220092,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00896247,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0109322,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33352,
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
        "date": 1736665603041,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00340726,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000131926,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008877,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.40825,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.49953,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0213517,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0103269,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00839284,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000711376,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014669,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.885359,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00002556,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.787005,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0355213,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.3341,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0745743,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000002616,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.022163,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0400067,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.19726,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000120803,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000128758,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000085796,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.898644,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.574148,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.134949,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00240087,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00202314,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000211308,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001075,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.198603,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000104242,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.171299,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00963696,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.454891,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0298399,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000004819,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00620998,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0111685,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.332208,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0666578,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0259435,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.022615,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.216698,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.10659,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0465698,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00609614,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0084405,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0024236,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026371,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0251976,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00948019,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0231441,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00275441,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.73905,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0679412,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.193156,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00695119,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0103646,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33787,
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
        "date": 1736701252879,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00344442,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000131844,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008296,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.44653,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.54325,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0214436,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0102048,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00851241,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000718767,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013596,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.912647,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000023535,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.790556,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0371034,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.35092,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.074685,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000002616,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0224446,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.040254,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.21345,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000107688,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000160451,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000015661,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.87197,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.580004,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.133367,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0030804,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00263443,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000261857,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001032,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.202435,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000066629,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.169345,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00957655,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.427566,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0242539,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000002425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00596631,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0106455,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.331745,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0654232,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0261051,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225031,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.221073,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.16371,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0464268,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00638809,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00900149,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00243455,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000025519,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.025344,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00944709,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0231585,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00274519,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.73642,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0674952,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192075,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00697397,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0103583,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33731,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}