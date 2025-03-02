window.BENCHMARK_DATA = {
  "lastUpdate": 1740927912063,
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
        "date": 1736871092513,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000675411,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00014306,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000010812,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.44112,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.53865,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0213673,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0118649,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00951374,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000754575,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016091,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.905923,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000024357,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.823023,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0371409,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.36496,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0770191,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000002816,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.022823,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0401728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.22487,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000122581,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000210828,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000080993,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.92732,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.579232,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.127883,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00303281,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00221251,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000269639,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001076,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.201479,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000098887,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.17932,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0109477,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.460003,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.024468,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000003046,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00605289,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0109409,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.337238,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0619232,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0261188,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0226183,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.206792,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.2689,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0465563,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00597633,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00562289,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00249802,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000027584,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0260365,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00963767,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0232693,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0027926,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.73838,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0687146,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192374,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00728001,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0104322,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33693,
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
        "date": 1736899347387,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000334158,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000148278,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008276,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.44309,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.61761,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0217195,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0111112,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00924043,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000736459,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001517,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.946434,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000028827,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.845019,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0368235,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.34849,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0737563,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000002676,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0227091,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0402268,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.21174,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00012069,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000458623,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000242472,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.941149,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.614976,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.132532,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00269247,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.002108,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000384973,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011692,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.206882,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00019938,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.179081,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0107076,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.447737,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.02992,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000004799,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00639906,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0120196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.335791,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0633416,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0262664,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0226516,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.204738,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.2109,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0467157,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00664261,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00623445,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00258034,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000027893,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0261322,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0100259,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0233502,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00302383,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.77523,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0717192,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192429,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0072196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0106251,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.37056,
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
        "date": 1737002260651,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000357403,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000140743,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000509,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.43673,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.59551,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0214422,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0111132,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00922114,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000744243,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014798,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.93012,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000028987,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.806338,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0366789,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.31705,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0731525,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003116,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0225999,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0403679,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.18088,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000103802,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000075326,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000041681,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.892691,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.602939,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.128799,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00254336,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00238471,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00027302,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001062,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.218232,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00004099,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.223009,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00928013,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.361217,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0183685,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000002645,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00563406,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0102069,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.326831,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0625899,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0262828,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225086,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.199064,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.21812,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0466822,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0056432,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00536338,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00251137,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000027063,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.025127,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00993063,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0232363,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00280337,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.7495,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0690112,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192354,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00695932,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0105011,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.34819,
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
        "date": 1737242272872,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000278891,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000464731,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008877,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.45263,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.49613,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0214353,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0110296,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00917926,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00100657,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016131,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.921919,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000028946,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.80072,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0367138,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.35379,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0735057,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000015931,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0224929,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0400498,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.21767,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000017525,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000512113,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000238182,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.904448,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.606643,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.123196,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00297915,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0023104,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000428821,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011242,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.219836,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000202152,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.218471,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0104861,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.394747,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0201983,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000003436,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00566192,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0111697,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.357598,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0666148,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.026258,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225487,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.204698,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.1766,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0466491,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00728853,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00655835,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00245376,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028064,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0261592,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0652835,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0235965,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00275336,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.73646,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0697407,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.19228,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00657651,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0104758,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33539,
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
        "date": 1737292172869,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000025971,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000458559,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009589,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.46631,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.52845,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0214799,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0114276,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00937136,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00074231,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014809,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.955779,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000027764,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.836159,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0369118,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.36045,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0727985,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000002235,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0224981,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0402179,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.22488,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000013757,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000250255,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005821,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.881809,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.610353,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.124295,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00419978,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00378729,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000278881,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012133,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.218714,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000100194,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.208701,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0120352,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.383024,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0200284,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000002344,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00555022,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0100396,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.347268,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0665135,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0265505,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.022575,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.207347,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.23032,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0468446,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00723693,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00665519,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00249598,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026841,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0252654,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0661362,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0237058,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00294736,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.73418,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0711444,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.19192,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00675972,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0106503,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33146,
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
        "date": 1737866688605,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000567787,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000482816,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008356,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.45523,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.63905,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0215098,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0112591,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00931507,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000752748,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001543,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 1.17078,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000025268,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.83839,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0369961,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.36623,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0753518,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000002264,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0225525,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0401765,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.22808,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000019858,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000751444,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00066226,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.950883,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.60372,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.131536,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00294342,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00255275,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000777495,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010872,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.265229,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000660457,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.184852,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0137055,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.438126,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.028487,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000002244,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00574689,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0105131,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.336798,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0668584,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0265085,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.022731,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.209974,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.22248,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.047606,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0072767,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0067099,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00251556,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000027792,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0254115,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0660903,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0236831,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00292905,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.85267,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0688808,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192696,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00669983,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.010789,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.4504,
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
        "date": 1738345361339,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000027202,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000482104,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004338,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.46652,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.55643,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0203673,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0113963,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00850787,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000750534,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014949,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.940921,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000023656,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.842373,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0365676,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.33215,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0713192,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000001654,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0223277,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0403718,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.19809,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000022243,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000776343,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00000554,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.937783,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.619048,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.12327,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0027956,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00199337,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000546558,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011201,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.225942,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00009796,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.200428,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0103262,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.398646,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0210878,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000003296,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00564004,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0101511,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.328781,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0682172,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.026613,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225309,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.20535,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.19176,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.045791,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00610199,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00591242,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00253292,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028906,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0267342,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0669327,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0243418,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00286586,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.75311,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0675983,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192865,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00714947,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0106577,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.35413,
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
        "date": 1738384422511,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000028134,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000453547,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008838,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.40513,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.46038,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0213133,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0115403,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00912996,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000754498,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014448,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.915101,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000024387,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0.807386,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0370704,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 1.3626,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0782233,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000001893,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0225675,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0399761,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 1.22178,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000018485,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000370406,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000085345,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.939808,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.583096,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.125583,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00268017,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00224839,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000294369,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012504,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.202419,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000096126,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.17461,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0110588,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.468227,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0327015,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000003277,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00605068,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0103568,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.330935,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0659455,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263646,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0232714,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.203936,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.08954,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0468653,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00596106,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00557719,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00243212,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026832,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0258521,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0654881,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0241259,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00280724,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 1.80359,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0720246,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.192934,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00676838,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0109965,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 1.39601,
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
        "date": 1739060089609,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000029977,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000453651,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004428,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.4397,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.53061,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0194693,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0110786,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00859732,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000753428,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014437,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.895785,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000022092,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 5.34859,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.347732,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000001704,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0224915,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0262802,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.21166,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.74035,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000023316,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000165335,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012375,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.87065,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.572522,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.124057,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00216489,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00183651,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000189173,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010892,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.195705,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000037524,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 1.52161,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.181496,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000002115,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00693735,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00816809,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.627323,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.666302,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0661578,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263509,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0227621,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.201448,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.16718,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0466768,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00566214,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00532112,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00231009,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002671,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0259454,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.009788,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 5.23278,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.22916,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000001933,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00819256,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0101431,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 2.20297,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 2.75219,
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
        "date": 1739074375194,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00354807,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00044618,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009138,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.42997,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.48119,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0206167,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0111523,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00886551,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000737952,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013917,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.912408,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000019748,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 5.43211,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.338785,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000001493,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0226622,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0257426,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.26508,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.77975,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000019697,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00021246,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00000536,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.854718,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.569166,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.122573,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00366285,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0029886,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000317107,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010279,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.206591,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000047169,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 1.51335,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.176946,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 8.02e-7,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00580048,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0067969,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.617923,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.701888,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0806088,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0262916,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0224235,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.209895,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.21987,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0457535,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00531366,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00805751,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00250108,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026551,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0259105,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00943903,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 5.37807,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.230131,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000002184,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00867124,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0100849,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 2.29772,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 2.80158,
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
        "date": 1739554299712,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000036541,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000489332,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000519,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.50476,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.57776,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.020921,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0114067,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00966208,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000790598,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013876,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.73288,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.342753,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000001373,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0231322,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0257167,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.34119,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.86709,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014187,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.975947,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020349,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000188876,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000016351,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.883438,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.588304,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.121517,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0028927,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00241564,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000262598,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000013977,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.807967,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.182057,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000001643,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00591978,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00679525,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.609164,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.707389,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001031,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.207942,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0666763,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.026534,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0226312,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.197365,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.21466,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0475244,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00679159,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00683708,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00256647,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00989879,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 2.53193,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.234187,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000002625,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00857717,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0105655,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 2.27851,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 2.88985,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028526,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0279268,
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
        "date": 1739852683945,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000029286,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000483604,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004678,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.41711,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.51762,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0207967,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0111148,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00830559,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000723626,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014538,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.62932,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.337967,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000001483,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0226996,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0256553,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.24291,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.82229,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013025,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.924909,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000022133,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000192945,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011924,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.859666,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.578864,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.12069,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00246564,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00226193,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000198235,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000013486,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.806829,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.182415,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 6.71e-7,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00582129,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0066493,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.611853,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.704264,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010721,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.201977,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0658803,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263025,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0223484,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.203372,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.16236,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0462688,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0060667,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00562655,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00230914,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00972593,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 2.53655,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.230728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000002365,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00834484,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0106199,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 2.28675,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 2.89903,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000039065,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.027851,
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
        "date": 1740174040476,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000027202,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000466879,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004589,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.53047,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.62119,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0214316,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0115624,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00856756,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000757618,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016923,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.68944,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.361145,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0229788,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0414341,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.26379,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.7355,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014518,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.966551,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020159,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000166242,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000016241,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.885476,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.600625,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.125646,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00389583,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00221316,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00018568,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010901,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.897999,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.195337,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00623707,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0109667,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.685358,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.700828,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011492,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.204227,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0666193,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263105,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225061,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.199194,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.14129,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.047207,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0056908,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00540665,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00242621,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00981666,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.392623,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.243477,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00882387,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0108364,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.129379,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0537672,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000027412,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0260444,
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
        "date": 1740201209454,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000032623,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000473103,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008176,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.44997,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.56556,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0215761,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0115468,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00850604,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000765667,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018286,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.69035,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.365856,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0229953,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0413937,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.26002,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.74092,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014628,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.97824,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000019117,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00017573,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001523,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.887222,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.57665,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.124336,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00273036,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00224664,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00021149,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000015751,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.894463,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.195234,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00601186,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0107874,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.682324,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.696823,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011523,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.199041,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.067015,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0265108,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.022497,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.203825,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.24299,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0472588,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00587483,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00572991,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00259143,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0100777,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.392073,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.242544,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00872319,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0108569,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.129856,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0539514,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00003095,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0262878,
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
        "date": 1740273317105,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000028615,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000478665,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009238,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.45683,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.62043,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.021458,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0110269,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00872478,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000752065,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000015049,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.70481,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.361886,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0224252,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0416279,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.27878,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.71344,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016001,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.968653,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000021371,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000173907,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000022674,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.869928,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.586344,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.125124,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00264327,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0021484,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000203444,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000017584,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.889596,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.18945,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00632434,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0109004,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.680429,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.703095,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010861,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.203492,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0668788,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263911,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225771,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.206082,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.13154,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0472091,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00739637,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00672287,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00237467,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00600645,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.392271,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.243141,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00791399,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0109339,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.13019,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0537078,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002599,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0256297,
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
        "date": 1740427819973,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000019999,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000149389,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004619,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.48244,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.56429,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.020671,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0108757,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00909416,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000751024,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000348896,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.88136,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 9.78619,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.370742,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0222632,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0424866,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.40211,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.74684,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013086,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.935434,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000017053,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00008226,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012454,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.870434,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.588118,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.122635,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00300975,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0026282,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000189768,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000122077,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.861801,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.41443,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.191924,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00566011,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0108613,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.641029,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.690767,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001023,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.204414,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0668513,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0260688,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0224939,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.216552,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.13706,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.021034,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00668344,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00876062,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00134909,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000224144,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.399199,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.40047,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.247896,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00770383,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00468114,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.124558,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0532441,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000027995,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0253144,
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
        "date": 1740489914896,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00002064,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000160052,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004499,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.44989,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.63108,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0214323,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.011203,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00853698,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000737415,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000366783,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.72533,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 9.90221,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.384957,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0223065,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0430602,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.23089,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.70702,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013687,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.92299,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000017574,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000081719,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000004859,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.870677,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.601685,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.125196,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00321865,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00289925,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000215208,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000140543,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.894857,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.48325,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.204781,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00583403,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0110884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.660671,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.709425,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001022,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.204706,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0669854,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263222,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0227134,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.213288,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.21027,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0217302,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00756123,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0076573,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00138842,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000238363,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.415905,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.49391,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.259358,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00783274,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00474235,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.12916,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0534626,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026531,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0256992,
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
        "date": 1740540072825,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001583,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000167234,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000011993,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.43568,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.54119,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0210573,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0112016,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00855646,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000766275,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000368174,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.76011,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 10.1757,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.371083,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0224009,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0428554,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.27927,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.88543,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014327,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.961216,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000018606,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000091378,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012425,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.86524,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.578366,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.123832,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00339134,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00229398,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000205619,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000114823,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.870901,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.49509,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.208358,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00579556,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0110118,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.631106,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.714233,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011322,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.204168,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0674758,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263471,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0224953,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.213781,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.24162,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0211117,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00722116,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00878417,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00142565,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000239486,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.409153,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.5826,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.254652,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00814737,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00457585,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.126891,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0536625,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028135,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.025341,
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
        "date": 1740631862611,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016061,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000170952,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000997,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.45776,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.61313,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0210269,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0113599,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00860334,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000793347,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000362302,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.77216,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 10.2983,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.376583,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0225272,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0431025,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.28538,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.90875,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014729,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.977971,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020369,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00008277,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010901,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.871817,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.60113,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.122608,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00288757,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0026654,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000200659,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000115203,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.866759,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.51309,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.206196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00573868,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0109623,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.62794,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.718651,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011312,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.206286,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0679559,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0264687,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0224796,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.214153,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.23794,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0212314,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00712387,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00793656,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00143389,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000380066,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.406884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.6893,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.252587,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00786119,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00473273,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.127021,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0535541,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026942,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0258835,
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
        "date": 1740632258431,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016061,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000170952,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000997,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.45776,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.61313,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0210269,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0113599,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00860334,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000793347,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000362302,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.77216,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 10.2983,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.376583,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0225272,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0431025,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.28538,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.90875,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014729,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.977971,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020369,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00008277,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010901,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.871817,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.60113,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.122608,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00288757,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0026654,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000200659,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000115203,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.866759,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.51309,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.206196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00573868,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0109623,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.62794,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.718651,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011312,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.206286,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0679559,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0264687,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0224796,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.214153,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.23794,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0212314,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00712387,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00793656,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00143389,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000380066,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.406884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.6893,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.252587,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00786119,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00473273,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.127021,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0535541,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026942,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0258835,
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
        "date": 1740685808822,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000026721,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000170048,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004869,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.47094,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.61287,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.021657,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0112733,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00948159,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000760558,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000375766,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.7094,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 10.0908,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.383748,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0226202,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0433947,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.21504,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.82124,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014158,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 1.00076,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00002061,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000094542,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005471,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.889542,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.599975,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.12769,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00228107,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00193766,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000192902,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000130141,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.899991,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.52733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.205229,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00597439,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0111664,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.652715,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.728721,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010721,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.20241,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0690142,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0263359,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.02256,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.219006,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.09189,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0216991,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00685765,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00834989,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00140681,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000338163,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.414224,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.65044,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.259719,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00797159,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0045801,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.127351,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0533404,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026721,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0251077,
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
        "date": 1740706878824,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016903,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000157042,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000011181,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.50486,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.59653,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0213413,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0111973,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00828954,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000758068,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000330125,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.72713,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 9.8206,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.385015,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0222171,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0424968,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.23341,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.79166,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013266,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.922851,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020159,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000074223,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000017874,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.871179,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.58968,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.125169,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00389806,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0028841,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000211857,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000129769,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.901383,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.4548,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.206454,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00587518,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0111016,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.662996,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.731042,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011141,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.198824,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.067373,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0261679,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225653,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.207239,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.13117,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0215674,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00705827,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00914704,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00136476,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000250473,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.410712,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.4047,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.25599,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00775262,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00471448,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.12789,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0536605,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002629,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0257155,
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
        "date": 1740880452295,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000012976,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000161002,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000004499,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_1",
            "value": 3.45676,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_1",
            "value": 2.54057,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0214867,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0106074,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0087058,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000746768,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000384866,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.69169,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 9.7354,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.387297,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0222946,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0432901,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.19448,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.78936,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013917,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.910982,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000016853,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000078012,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00000524,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_cpu_np_4",
            "value": 0.869498,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_cpu_np_4",
            "value": 0.593966,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_cpu_np_4",
            "value": 0.124936,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00375952,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0026778,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000183426,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000135443,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.900466,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.4674,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.214024,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0057532,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.011014,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.656879,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.736922,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010451,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.203584,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0675037,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0261687,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0225558,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_taylor_bar_gpu_np_1",
            "value": 0.208662,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_taylor_bar_gpu_np_1",
            "value": 6.07075,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0215557,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00798662,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_taylor_bar_gpu_np_1",
            "value": 0.008328,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00132802,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000236419,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.411761,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.45171,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.256206,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00794884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00471721,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.128483,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0537557,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028324,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0257432,
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
        "date": 1740927911686,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000012725,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00033535,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_1",
            "value": 2.76251,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_1",
            "value": 9.86197,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.367666,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0221869,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0430839,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_1",
            "value": 2.28573,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_1",
            "value": 2.76555,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014107,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_1",
            "value": 0.929767,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012674,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00011389,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_cpu_np_4",
            "value": 0.860453,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_cpu_np_4",
            "value": 2.43059,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.188239,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00615751,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0108878,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_cpu_np_4",
            "value": 0.630242,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_cpu_np_4",
            "value": 0.69432,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000014478,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_cpu_np_4",
            "value": 0.202234,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0671699,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000232441,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_taylor_bar_gpu_np_1",
            "value": 0.403703,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_taylor_bar_gpu_np_1",
            "value": 8.44105,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.250007,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00767036,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00453885,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_taylor_bar_gpu_np_1",
            "value": 0.126544,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0535863,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0260831,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0256891,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}