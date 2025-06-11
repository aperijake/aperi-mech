window.BENCHMARK_DATA = {
  "lastUpdate": 1749680062805,
  "repoUrl": "https://github.com/aperijake/aperi-mech",
  "entries": {
    "Benchmark": [
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
        "date": 1740685821175,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000032794,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000048794,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.00000488,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 5.33374,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 5.79703,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0671694,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.00837454,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0708644,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000206589,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000380945,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.0369,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.7289,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.456746,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0268723,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0931777,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 58.2539,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.3701,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000018135,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.8031,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000020008,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000069334,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000011372,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 1.46192,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 1.44315,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.101127,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00270937,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0274618,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000069675,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000132736,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 19.4512,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.64104,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.243166,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00847522,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0276864,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 19.0445,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 5.77977,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000014258,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.707325,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.149272,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.153407,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0737955,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.221671,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 15.0707,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0677463,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00330154,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0291973,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00566832,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00033135,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.245,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.88265,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.298143,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00810725,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00625638,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.91761,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.913324,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000027994,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0404883,
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
        "date": 1740706890613,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000021341,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000050478,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000008786,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 5.40485,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 5.87733,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0670234,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.00817134,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0683161,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000197786,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000402303,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.3945,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.5783,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.454057,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0264912,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0926295,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 58.6176,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.2503,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000016091,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.72501,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000023476,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000052013,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000019338,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 1.45037,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 1.42279,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0995649,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00349426,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.021389,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000060389,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000132333,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.9194,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.5119,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.242881,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00826788,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0274689,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.5246,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.52288,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000012314,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.709871,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.149128,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.152791,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0736295,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.21995,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 15.4997,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0672053,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00324413,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0282064,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00542145,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000331547,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.23834,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.87139,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.296486,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00777639,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0059161,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.91417,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.913069,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000027423,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0412818,
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
        "date": 1740880463791,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000024638,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000053073,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000004319,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 5.38207,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 5.59291,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0675097,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.008096,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0691345,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000198735,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000365669,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.2298,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.5771,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.453864,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.026621,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0914044,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 58.4544,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.2467,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000017254,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.68375,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00002085,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000052732,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000006071,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 1.4677,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 1.37657,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0998823,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00286664,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0203197,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000059896,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000126375,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.0023,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.48536,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.242106,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00835292,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0271286,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.6597,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.56338,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000012243,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.702017,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.147291,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.151912,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0734074,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.219577,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 15.0889,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0675948,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00318253,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0287751,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00521164,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000303248,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.24013,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.78286,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.297622,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00798642,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00595845,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.91414,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.912944,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000028015,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0411752,
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
        "date": 1740927924795,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.00001581,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000390275,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.5974,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.6596,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.435691,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0266271,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0933361,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 58.8379,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.3572,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000014398,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.68852,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000011492,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000114161,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.696,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.12117,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.228552,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00726444,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0249754,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.3408,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.59657,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000012545,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.686055,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.148938,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000342915,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.15414,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.86313,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.286654,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00768596,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00586317,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.84085,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.91428,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.152428,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0404786,
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
        "date": 1740970685438,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000022002,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000370881,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 58.8212,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.7932,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.456759,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0265479,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0914584,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 58.043,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.1689,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.00001519,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.67818,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000017213,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000129508,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.9741,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.48771,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.243272,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00858408,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0276809,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.6435,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.57345,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000014839,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.698646,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.146968,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000316343,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.24014,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.9132,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.296258,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00760317,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00592188,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.91625,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.913568,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.15191,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0412581,
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
        "date": 1742279225556,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012164,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000458718,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.9283,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.4223,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.446737,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.026658,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0903075,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.1595,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.9205,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000015049,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.5967,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000013457,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000157063,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.3298,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.66093,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.244075,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00879417,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0287586,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.9476,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.79084,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000015209,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.676581,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.145169,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000326161,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.17304,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.64363,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.299425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00800854,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00587918,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.84588,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00429285,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.150957,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.114888,
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
        "date": 1742607274114,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012073,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000445983,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.9892,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.6369,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.450184,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0268912,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0918503,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.2128,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 19.2909,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000014608,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.58102,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000020149,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000217892,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.4401,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.62151,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.242598,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00840554,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0267729,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.1064,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.75248,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00001537,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.677198,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.148258,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000343934,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.1571,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 10.0347,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.297097,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0078097,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00593791,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.83256,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00432588,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.151831,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.114886,
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
        "date": 1742662189610,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012754,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000638925,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 66.6375,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 12.6987,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.472949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.036029,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.142645,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 65.7146,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 21.4038,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000017424,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.66492,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000022343,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000216278,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 17.3994,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.76511,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.262776,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00987451,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.037287,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.9427,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 5.25871,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000018015,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.690773,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.145856,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000293799,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.24579,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 10.824,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.315489,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00997031,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00599341,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.89992,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00431324,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.150047,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.114913,
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
        "date": 1743057860769,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000010249,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000416042,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.1407,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.6415,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.43355,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0271982,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0945275,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.3812,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 19.0922,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000015509,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.56596,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000017254,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000211813,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.0205,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.2014,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.224122,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00724666,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0261654,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.7121,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.79434,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000017253,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.665014,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.147912,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000363176,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.0844,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.87913,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.28648,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00789146,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0058715,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.7694,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00428679,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.151762,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.114899,
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
        "date": 1743979725355,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000014929,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000437397,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.2134,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.5973,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.45733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0265507,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0901174,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.4348,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 19.0719,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000014228,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.5672,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000044065,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000243501,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.4337,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.60328,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.253665,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00848555,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0277327,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.0927,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.7567,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000016352,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.66876,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.147385,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000352222,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.18653,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.75852,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.298386,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00823351,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00595261,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.85881,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00430374,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.151502,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.11488,
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
        "date": 1744083789635,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000011182,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000432708,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.7865,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 10.5705,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.441432,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0272352,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0948425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.0188,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.7245,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000014458,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.56523,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000016893,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000171111,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.395,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 6.59176,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.233496,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00892045,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0289186,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.0327,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.66944,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000017063,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.674094,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.145349,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000305973,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.16234,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 9.6946,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.296392,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00786019,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00586278,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.83779,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00426629,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.150563,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.114842,
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
        "date": 1744689302932,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012104,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000457597,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.972,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.6182,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.462107,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0267565,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0900062,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.1881,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 20.0048,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000013305,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.59709,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000019217,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000227352,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.6533,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.67331,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.242726,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00854173,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0300352,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.32,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.99923,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000012544,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.666332,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.146651,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000327755,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.18949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.1612,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.302949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0081677,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00595867,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.85916,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00428546,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.15116,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.114792,
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
        "date": 1745640069806,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000016973,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000465893,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.2074,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.4882,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.447314,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0271504,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.091656,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.4371,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.9643,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000014628,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.57642,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000013897,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000221205,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.4633,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.53715,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.239514,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00849968,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0279627,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.1354,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.77655,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000013876,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.6753,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.147435,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000381631,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.16271,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 12.9517,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.296865,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00771714,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00595871,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.83856,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00431255,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.177339,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.115542,
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
        "date": 1746231510584,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000015821,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000430351,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 62.97,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.5292,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.44586,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0262868,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0893442,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 62.2044,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 19.0359,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000013325,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.6158,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000017454,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000240927,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.7064,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.56407,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.241034,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00883065,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0283372,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.3425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 5.10423,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000016572,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.686678,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.147503,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000335096,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.17006,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.0597,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.298415,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00773567,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00594366,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.8448,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00430191,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.151672,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.114918,
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
        "date": 1748663920077,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000020039,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000011593,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0301831,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000459691,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0278113,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.8382,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0153069,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.00598726,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0064142,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000016632,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000009148,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.148379,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.151633,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0101123,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000353667,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0127831,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.817825,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00352021,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000742431,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000746378,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00108731,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000586358,
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
        "date": 1748722185190,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000013757,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000011543,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.60447,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000491783,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 62.2322,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 14.2261,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.451499,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.027132,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.101957,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.4447,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 19.7036,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000013966,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000013466,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.672742,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000223073,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.9059,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 8.09781,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.240883,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00847949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0289131,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.5758,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.95751,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.147802,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.152405,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0459876,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00034683,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.17401,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.6385,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.297901,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.008088,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0059805,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.84832,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00440388,
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
        "date": 1748989339908,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012513,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000011311,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.36036,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000566228,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.661,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.5162,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.450845,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0266619,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0965927,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.879,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.7356,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000013877,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000009168,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.608899,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000185171,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.2071,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.76108,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.240635,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00825929,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0283998,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.8017,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.68351,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.135761,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.147054,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0586767,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000371241,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.14108,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.0097,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.296872,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00646093,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00565272,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.82223,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00417401,
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
        "date": 1749069827511,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000014918,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012514,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.30389,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.00036548,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.8722,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.6601,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.456112,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0267356,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.101574,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.0796,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.8038,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000010169,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000008977,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.59374,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000126252,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.1224,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.7872,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.239697,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00820613,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0278362,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.7954,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.71012,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.134881,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.146111,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0478548,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000385372,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.22435,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.0889,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.295928,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00705384,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00597237,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.90384,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.921372,
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
        "date": 1749164522663,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012264,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000012413,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.33613,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000354796,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.4932,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.5074,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.446924,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0264561,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0984861,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.716,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.5276,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00002063,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000010521,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.608176,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000182983,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.251,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.76735,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.239592,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00835889,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0275861,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.9184,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.68594,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.135672,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.14725,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.057973,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000385095,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.20689,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.1426,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.293287,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00667316,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00568429,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.89115,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.920684,
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
        "date": 1749512769697,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000019147,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000003045,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.34521,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000330279,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.8582,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.9792,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.498258,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0267944,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0992172,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.0248,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 19.19,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000013646,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000002054,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.604001,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000143517,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.1308,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.4232,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.245066,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00722092,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0271813,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.7977,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.77263,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.135444,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000008356,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0481097,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000387699,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.16522,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.4376,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.289636,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00741155,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00572548,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.8509,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.920562,
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
        "date": 1749523990263,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000013105,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000003897,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.28737,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000334486,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.669,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.9839,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.446901,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0269269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.100769,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.8844,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 19.1809,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000012233,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000002865,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.581548,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000137786,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.1453,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.46976,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.243151,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00732333,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0271151,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 15.8163,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.77216,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.135789,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000007735,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.057873,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00038822,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.16443,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.3532,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.291446,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00703298,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00594724,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.84855,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.920488,
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
        "date": 1749594936366,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000019336,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000003907,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.27927,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000365381,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 61.0884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.7929,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.462271,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.02667,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0921565,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.2967,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.6505,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000014158,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000002504,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.592283,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.00014186,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.5629,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.79188,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.242847,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0081556,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0286603,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.1509,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.68357,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.134602,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000007774,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0578943,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000393798,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.21879,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.2899,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.297233,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00704805,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00568801,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.89801,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.920898,
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
        "date": 1749680061857,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000013265,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000003968,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 2.29119,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.000358338,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 60.5362,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 13.6095,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.46146,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0263776,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 0.0914444,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 59.7511,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_1",
            "value": 18.441,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000019799,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000002965,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.596465,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.000211357,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.5506,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 7.92706,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.240553,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0084793,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 0.0296454,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 16.1462,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_cpu_np_4",
            "value": 4.7218,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.135436,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000006863,
            "unit": "seconds"
          },
          {
            "name": "Function_Value_Storage_Processor_ComputeFunctionValues_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.0586488,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.000378193,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 4.25804,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 13.2545,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.312721,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00659872,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.00574195,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 3.92266,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_rkpm_fbar_taylor_bar_gpu_np_1",
            "value": 0.920463,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}