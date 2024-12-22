window.BENCHMARK_DATA = {
  "lastUpdate": 1734833010971,
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
      }
    ]
  }
}