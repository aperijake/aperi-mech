window.BENCHMARK_DATA = {
  "lastUpdate": 1736701242747,
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
        "date": 1735681812612,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00541643,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.000984366,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000016221,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000044446,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 25.5114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.6131,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000006683,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.0011007,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000137485,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000011983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.55844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.510804,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.0135248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000061368,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000066688,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.50313,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.49867,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000081036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000362509,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000172282,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.00008805,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.88328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00463357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000937689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000019037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.0018644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.4573,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.01552,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007504,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.33335,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00500781,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000019308,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.23398,
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
        "date": 1736284584380,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.0046534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.000926927,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000018494,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000038683,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.4444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.34858,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00112247,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000125084,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000011141,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.06975,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.519457,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.0104103,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000010991,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000026722,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.5843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.48276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000035117,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00032218,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000064314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000018355,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.82082,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.0052746,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000838045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.00001593,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00175707,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 24.5607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 7.7763,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.31661,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00492949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000019236,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.17727,
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
        "date": 1736331747193,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00575807,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.000966978,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.00002052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000044136,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 26.1951,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.77787,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000008016,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00123989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000163937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000011442,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.75924,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.53598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.0112935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000022312,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000040506,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.37779,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.72051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000023885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00036171,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000126358,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000057158,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.95321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.0052335,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000980096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000018025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00336266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 26.9572,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.46208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007925,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.37722,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00476241,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000012714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.60886,
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
        "date": 1736665594818,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00495527,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.000875863,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000017985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.0000362,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 23.6594,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.12114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.0010969,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000145802,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000010861,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 7.70123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.508138,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.0112183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000019968,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000102999,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.3461,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.61937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000081268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000449799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000156963,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000071889,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.77063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00496699,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000849192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000017714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.0017676,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 24.2703,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 7.66393,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000008276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.30752,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00468701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000015129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.16908,
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
        "date": 1736701241872,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00566294,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.000866743,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000018185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000037482,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 23.7956,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.08413,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00106007,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000145581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000012194,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 7.55895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.505359,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.011687,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000027182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000095094,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.38388,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.63227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000092869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000354425,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000190468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000093099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.7607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00533016,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000837337,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000018005,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00175658,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 24.6189,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 7.77278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007875,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.32815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00473642,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000012484,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.22425,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}