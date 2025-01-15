window.BENCHMARK_DATA = {
  "lastUpdate": 1736899341566,
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
      }
    ]
  }
}