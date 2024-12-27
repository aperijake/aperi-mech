window.BENCHMARK_DATA = {
  "lastUpdate": 1735328577538,
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
        "date": 1734833008962,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00584207,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.000979946,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000018266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000035329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 25.9188,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.77524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.0010958,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000138749,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000012294,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.57266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.507443,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.0127633,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000027163,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000032784,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.62461,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.50536,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000021481,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000477083,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000171322,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000035338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.83366,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.0051951,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000914761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000018356,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00181583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.3624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.11268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00000505,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.33344,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00502814,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000018536,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.25925,
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
        "date": 1735328576597,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00539395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.00098771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000017364,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000035449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 25.4161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.63192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007164,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00111167,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000142016,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000009758,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.52043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.530948,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.0130268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000048013,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000106116,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.34954,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.5073,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000081879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000337285,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000179489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000093221,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.89459,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00426225,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000919563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000016902,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00185447,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.4196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.07431,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000008005,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.34329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00499357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000016882,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.30337,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}