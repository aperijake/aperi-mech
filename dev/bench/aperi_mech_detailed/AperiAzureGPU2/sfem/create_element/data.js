window.BENCHMARK_DATA = {
  "lastUpdate": 1748722168074,
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
        "date": 1736331749578,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000409659,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000029226,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.909443,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0398969,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.09675,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0826464,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000006522,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0229785,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0408557,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.9502,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000135605,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000063269,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.171645,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.0106888,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.984674,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0260657,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000006723,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00583138,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0104922,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.814425,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0619164,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00845109,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0227484,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00276017,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.39462,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0721188,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.21643,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00764867,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0115413,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 3.02386,
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
        "date": 1736665596822,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000329407,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000025019,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.793331,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0359583,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.6792,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.078262,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.00000515,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0222204,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0401076,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.53855,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000115253,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000099964,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.163906,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.00950266,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.893942,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0191637,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000005661,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00571276,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0103563,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.763829,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.060925,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00871733,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0230618,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00272074,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 2.95664,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0679137,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.192989,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00661949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0110951,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.61794,
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
        "date": 1736701244993,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000304868,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000023225,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.777569,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0358964,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.58223,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0783218,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.00000518,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0223847,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0406128,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.44086,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000096938,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000076849,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.153835,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.00998663,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.901016,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0261884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000005301,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00567043,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.010345,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.769439,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0604245,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00865911,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0222488,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00251187,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.0134,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0677118,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.19211,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00674915,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0103278,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.67629,
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
        "date": 1736871075279,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000327934,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000024988,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.811975,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0373301,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.75506,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0807796,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000006413,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225367,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0402733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.6114,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000129304,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000062759,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.167584,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.00971373,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.888668,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0228923,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000005721,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00577487,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0104863,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.849369,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0625641,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00911006,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0223097,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00260665,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.03617,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0677432,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.192321,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00672999,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0103869,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.69875,
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
        "date": 1736899341007,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000356987,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000029547,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.840957,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0369563,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.87554,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0789513,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005801,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225874,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0404365,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.7335,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000133113,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000122042,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.203557,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.0130159,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.834652,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0299017,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000007255,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00602642,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.011087,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.7765,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0614091,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00898499,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0217972,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00270723,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.03125,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0687004,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.191392,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00678728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.010633,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 2.69326,
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
        "date": 1737002254344,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.00033514,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000029978,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.797042,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0365725,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.69218,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0779414,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005651,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225641,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0399371,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.55168,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000102479,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000083262,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.20665,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.0100211,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.79762,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.023442,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.00000518,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00572352,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.010453,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.748037,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.061996,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00892599,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0223589,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00269959,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 4.01553,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0686777,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.193537,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00705866,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0105492,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 3.61184,
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
        "date": 1737242264218,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000033966,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.00003143,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.820316,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0367729,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.85776,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0787578,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005651,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0224969,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0402055,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.71625,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000020711,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000271707,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.194755,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.00989642,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.850502,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0199885,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.0000054,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00577309,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0106491,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.810109,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0645336,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0637308,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0224944,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.0025677,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.99084,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0675906,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.192865,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00673407,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0102864,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 3.59068,
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
        "date": 1737292164575,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000026803,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000029287,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.814287,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0367131,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.89778,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0790048,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005821,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225328,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0401024,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.75608,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000019138,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.00007747,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.195037,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.011629,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.860219,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.033118,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008166,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.0066381,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0111113,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.787644,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0649165,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0644272,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0220092,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00265795,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.98939,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0684255,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.192889,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00675881,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0106468,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 3.58786,
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
        "date": 1737866681055,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000025027,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000028223,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.839032,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0373289,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.95137,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0793869,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005791,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0224315,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0400088,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.80948,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000016042,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000074795,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.220936,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.0107967,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.850979,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0258258,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000005351,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00558086,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0109611,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.80854,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0650169,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0641233,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0227895,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00276354,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 4.06942,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0695216,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.193646,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00675227,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0105289,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 3.66544,
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
        "date": 1738345354981,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000022133,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000029447,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.850702,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0371405,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.90697,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0755569,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005221,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0226007,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0404149,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.76834,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.00001525,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000049887,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.156101,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.00944144,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.97602,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0182087,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000006142,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00560841,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0101581,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.818434,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0661237,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0650024,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0237814,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.0027694,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 4.00659,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0668609,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.193201,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00666677,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0105957,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 3.60796,
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
        "date": 1738384416141,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000028004,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000028515,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0.804661,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_1",
            "value": 0.0364872,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.69961,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.0810288,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007544,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.022363,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0402987,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 3.55586,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000016121,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000125573,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.191114,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_cpu_np_4",
            "value": 0.0101824,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.866519,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0254916,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000009667,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00605852,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0113738,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0.769008,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0654453,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0635162,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0227059,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeCellVolumeFromElementVolume_sfem_taylor_bar_gpu_np_1",
            "value": 0.00252963,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.98892,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.0701461,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.193758,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.0068622,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0106365,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 3.58258,
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
        "date": 1739060084289,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000028064,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000023695,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 8.51505,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.342261,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000008475,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0224781,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.025924,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.2914,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.83289,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000034848,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000034366,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 2.12706,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.183538,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008797,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00606361,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.00713035,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.831755,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.09848,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0654356,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00885162,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 8.28445,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.227791,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.000797948,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00780544,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.010074,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 3.2023,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 4.80574,
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
        "date": 1739074365941,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000031018,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000022403,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 8.41815,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.343253,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007975,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0226885,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0256282,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.2288,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.79769,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000023204,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000017192,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 2.15986,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.164102,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000011801,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00661985,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.00777736,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.797035,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.14482,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0646627,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00855792,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 8.28694,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.225773,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.000713725,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00802945,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0107549,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 3.21,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 4.8018,
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
        "date": 1739554290448,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000039046,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000023245,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.98108,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.3445,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005441,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0231085,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0260014,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.58738,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 5.09473,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000031612,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.0000153,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.02208,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.170301,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000006463,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00673892,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.00813546,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.817515,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.1478,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0672587,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00931024,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.72348,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.22731,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.000703248,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00837707,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0103689,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 3.47664,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 4.94973,
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
        "date": 1739852678169,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000028305,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000021762,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.7844,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.342011,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0.000005661,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0227729,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0263252,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.3932,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.86779,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000018355,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000035479,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 0.99876,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.173575,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0.000006362,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00604131,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.00660426,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.807651,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.13659,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0658082,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00880577,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 3.64997,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.226615,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0.00076323,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00778776,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.010367,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 3.40435,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 4.91497,
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
        "date": 1740174032093,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000033174,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000023415,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.86608,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.364789,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0230364,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0416573,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.43652,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.61083,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000024377,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000017333,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.09034,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.158848,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00683331,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0233281,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.884076,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.09207,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0667371,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00893814,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.394579,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.242303,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00820803,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.010733,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.133229,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0739177,
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
        "date": 1740201204219,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000021421,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.00002042,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.84144,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.369719,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0230809,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0417024,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.40683,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.61741,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000016923,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000017844,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.09492,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.182326,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00694118,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0159261,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.88007,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.09259,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.067298,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00888699,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.393685,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.242156,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00828206,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0111748,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.131974,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0745302,
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
        "date": 1740273308953,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000027273,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000023055,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.85128,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.366405,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0226856,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0426134,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.41948,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.61809,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000022123,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000032643,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.08521,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.186672,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00664892,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0111784,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.867585,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.09755,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.06567,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00483681,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.391326,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.240428,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00755012,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.0107346,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.132506,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0742327,
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
        "date": 1740427810416,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000013997,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000344768,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.80769,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 8.99231,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.371154,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0222894,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0426902,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.32777,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.52505,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000013015,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000117948,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.05516,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.219,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.185516,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00561303,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0109165,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.834339,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.1048,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0665578,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000225447,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.406844,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.82625,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.249888,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00778745,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00449892,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.130939,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0746324,
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
        "date": 1740489907679,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000013437,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.00033961,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.8744,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.17346,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.391916,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0223698,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0432196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.3726,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.58635,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000020449,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.00012869,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.10865,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.31738,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.193097,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00673466,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0168297,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.868279,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.06086,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0666959,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00023179,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.418121,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.74838,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.258552,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00771332,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00451403,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.133653,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0742029,
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
        "date": 1740540064980,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000026581,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000379926,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.96058,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.39537,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.377795,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0224785,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0433245,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.47284,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.7648,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000017263,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000119,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.07518,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.29196,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.174487,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.0063327,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0218417,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.820574,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.0954,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0678243,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000245356,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.413556,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.9437,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.253852,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00815118,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00462183,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.133016,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0745573,
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
        "date": 1740631856167,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000249353,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000379585,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.94615,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.61104,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.379935,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225018,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0433163,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.45626,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.741,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000020089,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000115564,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.07553,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.25517,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.173112,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00673706,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0246494,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.821662,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.12127,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0668086,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000245105,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.412246,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 8.12683,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.253253,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00748828,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00475384,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.133167,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.074736,
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
        "date": 1740632252759,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000249353,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000379585,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.94615,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.61104,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.379935,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225018,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0433163,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.45626,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.741,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000020089,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000115564,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.07553,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.25517,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.173112,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00673706,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0246494,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.821662,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.12127,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0668086,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000245105,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.412246,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 8.12683,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.253253,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00748828,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00475384,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.133167,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.074736,
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
        "date": 1740685800989,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000028285,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000355566,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.89248,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.58304,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.388601,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225946,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0438348,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.39302,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.6872,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000021371,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000138147,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.10208,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.30743,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.199964,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00584276,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0114025,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.859769,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.10658,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0671583,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000247107,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.421999,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 8.0071,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.26321,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00792058,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00459903,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.132213,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0747153,
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
        "date": 1740706872764,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000020009,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000392354,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.77613,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.06616,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.388394,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0222742,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0430045,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.2782,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.58965,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000013896,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000137234,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.10537,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.20824,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.179207,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.0067283,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0236096,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.851757,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.10302,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.066701,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000229762,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.416054,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.83407,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.256248,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00740033,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00449431,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.134445,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0741861,
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
        "date": 1740880445976,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000028686,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.00033435,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.739,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 8.94036,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.388907,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0223107,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0433443,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.24031,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.59722,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000018034,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000122868,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.09237,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.24228,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.204242,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00575663,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0111327,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.851509,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.11342,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0668894,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000227561,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.413212,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.7766,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.255957,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00780695,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00447672,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.131603,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0746635,
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
        "date": 1740927905121,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000013827,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000343724,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.81248,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.01084,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.373927,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.022298,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0430838,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.32932,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.63675,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000011753,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000114121,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.0621,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.2105,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.155335,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.0064359,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0247032,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.829461,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.08612,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.067106,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000249484,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.406504,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.79153,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.248884,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00744965,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00465772,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.132195,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0745411,
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
        "date": 1740970660683,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000018636,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000338609,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.70658,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.07611,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.389669,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0224726,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0433098,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.20722,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.52631,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000012123,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000148454,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.09858,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.27428,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.198985,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00594422,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0112229,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.870087,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.12384,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0665079,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000229279,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.414235,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.68545,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.256802,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00775105,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00472491,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.131389,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.0746389,
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
        "date": 1742279199700,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000013306,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000411055,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.85795,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.00365,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.380736,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0221949,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0428056,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.36821,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.9358,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000018847,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000157455,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.15888,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.23596,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.19497,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00639391,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.012098,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.929081,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.16098,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0665222,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000203423,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.401162,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.75171,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.257481,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00758396,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00477839,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.117827,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00156121,
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
        "date": 1742607254821,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000014038,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000415552,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.95051,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.20183,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.385277,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0223574,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0426679,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.45599,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 5.04456,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000013616,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000167837,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.14383,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.32881,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.186777,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00682867,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0140269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.898311,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.18396,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0666189,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000228972,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.402809,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.99548,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.258426,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00784269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00476162,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.118308,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00165653,
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
        "date": 1742662168166,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000014067,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000593168,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.2099,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 10.3501,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.40497,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0228425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0433851,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.69207,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 5.57857,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000014719,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000237419,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.13145,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.56466,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.220035,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00594841,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0111398,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.881888,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.28314,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0666514,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000319858,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.422296,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 8.6658,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.274975,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00808891,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00475869,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.120425,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00164604,
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
        "date": 1743057840273,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000017443,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000410078,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.93888,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.20617,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.370951,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0221709,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0420561,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.45982,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.95567,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000016222,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000143936,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.07959,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.31283,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.180481,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00613749,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.011438,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.841229,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.12901,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0666612,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000215085,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.390488,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 8.01699,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.24859,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00750956,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00449224,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.116508,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00155592,
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
        "date": 1743979709198,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000019197,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000427075,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.9369,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 9.28728,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.393789,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0222784,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0424777,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.43424,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.9461,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000014839,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000164127,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.1375,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.30917,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.208587,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00641236,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0109899,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.899471,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.15496,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0665809,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000207361,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.403568,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 8.01323,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.25812,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00786711,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00473976,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.119345,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00155629,
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
        "date": 1744083773403,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000012324,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000410436,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.79729,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 8.92311,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.378756,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0222769,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0425119,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.30962,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.81037,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000017774,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000153558,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.11965,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 2.27293,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.197606,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00615108,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0110538,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.879297,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.132,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0661653,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000204326,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.39942,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 7.6996,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.25723,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00727833,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00446513,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.117414,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00156878,
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
        "date": 1744689286056,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000013135,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000416317,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.0024,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 13.8315,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.389679,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0224068,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.042753,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.50316,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.96181,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000012514,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000182583,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.15371,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 3.75249,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.203179,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00596893,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0108482,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.902698,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.16816,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0664921,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000200519,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.40796,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 13.9284,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.262897,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00808634,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00454684,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.118926,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00158657,
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
        "date": 1745640045933,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000013396,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000397579,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.93219,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 13.7914,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.377358,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0223117,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0426863,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.44572,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.9652,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000016382,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000170058,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.12952,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 3.63965,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.204289,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00581329,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0109664,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.883526,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.16562,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0668057,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.000196507,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.399817,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 13.3414,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.257881,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00739406,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00449794,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.116894,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00158392,
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
        "date": 1746231486320,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000017714,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000395099,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 3.94639,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 13.9512,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.37819,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0224507,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.042632,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.45906,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 4.98003,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000012955,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000150741,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.1302,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 3.67948,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.193299,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00627692,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.0126318,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.896349,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.22129,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0664141,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00019703,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.399433,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 13.7205,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.258857,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00751172,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00450971,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.115212,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00160221,
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
        "date": 1748663901543,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.00001525,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000450273,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.21597,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 14.8408,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.390147,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225257,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0464502,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.71271,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 5.13543,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000021903,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000150812,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.1613,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 3.75205,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.197163,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.00660756,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.011803,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.933653,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.17323,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0666488,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00021625,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.407731,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 13.8093,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.260744,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00800269,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00459426,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.120534,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00163307,
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
        "date": 1748722167587,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_1",
            "value": 0.000018555,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.000694915,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_1",
            "value": 4.10726,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_1",
            "value": 15.4074,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_1",
            "value": 0.388832,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_1",
            "value": 0.0225083,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_1",
            "value": 0.0465064,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_1",
            "value": 3.60477,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_1",
            "value": 5.10089,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_cpu_np_4",
            "value": 0.000013796,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.000183056,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_cpu_np_4",
            "value": 1.26467,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_cpu_np_4",
            "value": 3.88776,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_cpu_np_4",
            "value": 0.241841,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_cpu_np_4",
            "value": 0.0066375,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_cpu_np_4",
            "value": 0.012188,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_cpu_np_4",
            "value": 0.987628,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_cpu_np_4",
            "value": 1.33761,
            "unit": "seconds"
          },
          {
            "name": "Element_CreateElementForceProcessor_sfem_taylor_bar_gpu_np_1",
            "value": 0.0671927,
            "unit": "seconds"
          },
          {
            "name": "Element_Other_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.00022588,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_ComputeDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Strain_Smoothing_Processor_BuildSmoothedCellData_sfem_taylor_bar_gpu_np_1",
            "value": 0.40367,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_LabelParts_sfem_taylor_bar_gpu_np_1",
            "value": 14.424,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_Instantiate_sfem_taylor_bar_gpu_np_1",
            "value": 0.259671,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SyncFields_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_AddCellNumElements_sfem_taylor_bar_gpu_np_1",
            "value": 0.00779593,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetCellLocalOffsets_sfem_taylor_bar_gpu_np_1",
            "value": 0.00483353,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetNodeIndiciesAndMap_sfem_taylor_bar_gpu_np_1",
            "value": 0.117894,
            "unit": "seconds"
          },
          {
            "name": "Smoothed_Cell_Data_SetFunctionDerivatives_sfem_taylor_bar_gpu_np_1",
            "value": 0.00163261,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}