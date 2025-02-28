window.BENCHMARK_DATA = {
  "lastUpdate": 1740706891090,
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
      }
    ]
  }
}