window.BENCHMARK_DATA = {
  "lastUpdate": 1736284586536,
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
        "date": 1734833010494,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000486532,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.00002585,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.821876,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.037211,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.23145,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0906106,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005992,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0227754,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0361986,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.08181,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000172093,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000110304,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.145716,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.00933607,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.924895,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0246539,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000006322,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00582887,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.00935858,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.800069,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0634982,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0092968,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0233965,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00303991,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.04132,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0664533,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.192331,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00675904,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0104422,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.70584,
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
        "date": 1735328581614,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000489992,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000026983,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.812115,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0367446,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.21076,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.096821,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.00000578,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0228024,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0360946,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.05498,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000190189,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0000877,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.173235,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.00974662,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.91358,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0277123,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000007516,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00602081,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0093354,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.779765,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0626255,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00922825,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0233746,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00297688,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.08703,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0686546,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.191989,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.0067763,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0106016,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.74867,
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
        "date": 1735681815305,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000491407,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000025609,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.835727,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0369468,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.23122,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0903057,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005641,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0227969,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0359562,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.08211,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000137215,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000033875,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.21122,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.0103778,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.883981,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0275553,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000005701,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00558045,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.00965544,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.841057,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0623555,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00915538,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0233083,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00296766,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.01793,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0660753,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.192265,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00676718,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0103656,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.6817,
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
        "date": 1736284586023,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.00045441,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000024657,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.793379,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0368691,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.94416,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0942632,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005349,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225598,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0356302,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.79165,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000137271,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000040217,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.213203,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.0115352,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.858297,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0265012,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000005821,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00558336,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.00966501,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.816466,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0607742,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00870501,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0231392,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00270102,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 2.96513,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0680437,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.19845,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00667077,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0106213,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.62152,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}