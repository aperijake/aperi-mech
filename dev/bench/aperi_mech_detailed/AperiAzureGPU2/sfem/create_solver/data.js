window.BENCHMARK_DATA = {
  "lastUpdate": 1740273306933,
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
        "date": 1736871070327,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00522119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.000899081,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000020289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.00004662,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.0935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.19721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00119459,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00015532,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000014087,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 7.83033,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.538601,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.0128254,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000026901,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000046497,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.11045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.6822,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.00006844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000367044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000103465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.0000526,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.79595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00539029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000879676,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000018757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00175101,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 24.9371,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 7.85529,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007906,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.33683,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00486765,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000019989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.25158,
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
        "date": 1736899338841,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00552374,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.273547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000021372,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000039527,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.9732,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 7.09547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007344,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00114133,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000157838,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.00001,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.11524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.526058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000111132,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000020599,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000044385,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.23605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.86311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000106222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000424328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00016792,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000083419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.83273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00610631,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.000920123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000017463,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00187105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.9515,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.73173,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000004879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.3351,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00519292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000022293,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 3.24416,
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
        "date": 1737002252148,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00553735,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.269709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000026901,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000040859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.4583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.77413,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000008226,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00114667,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000140472,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000015891,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 7.74431,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.518653,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000096588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.00007175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000062341,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.64022,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.88905,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000024778,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000336244,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000073223,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000019147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.76696,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00496766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.198627,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000021462,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00178031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.6447,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.58692,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007385,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.33175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00488201,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000018195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 4.22939,
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
        "date": 1737242260904,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.005591,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.26993,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000019548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000040799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.7714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 7.08998,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007194,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00111799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000143619,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000010891,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.03408,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.514142,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000126846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000084053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.00013939,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.12648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.86656,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000184588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000532252,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000328768,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.00008761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.79915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00506276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.615486,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000019388,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00177196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.3408,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.45711,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007324,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.32745,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00504663,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000019528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 4.26169,
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
        "date": 1737292161822,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.0051943,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.278992,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.00002034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000040518,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.8163,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.95244,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007735,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.0011247,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000140062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000011883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.02109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.514806,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000080185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000179649,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000215578,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.37582,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.85027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000022614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00032015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000112638,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000049917,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.83863,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00538062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 1.79346,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000020199,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00184568,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.8657,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.64291,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000006342,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.32677,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00509587,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.00001538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 4.26145,
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
        "date": 1737866678377,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00438108,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.0114946,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000022553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000040026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.5954,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 7.05843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007634,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00117411,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000150785,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000009468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.10367,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.526833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000060047,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000021151,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000047522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.47427,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.91048,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000023355,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000345529,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000160752,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000053083,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.84621,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00503655,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.27938,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000018896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00190011,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.8846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.64614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007645,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.32421,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00491182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000019817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 4.34208,
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
        "date": 1738345352600,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00509606,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.00156907,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000019749,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000033184,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.9908,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 7.06374,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000008276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00115984,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000155291,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000016171,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 8.09547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.584921,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000073332,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000020068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000043444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 7.35487,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.87506,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000036821,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000339848,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00013468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000053824,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.87104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00587851,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.38654,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000017715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00182155,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.6845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.61655,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007324,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.33135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00500557,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.00001562,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 4.28306,
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
        "date": 1738384413958,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00443706,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.00942548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000015971,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.00005196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.0996,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.70982,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00114527,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00013991,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000010721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 7.69037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.522548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000099873,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000053763,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.00009321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.52176,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.85608,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000080716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000475639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00016547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.00008315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 1.82652,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00506096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.274859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000023345,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00186838,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.4753,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.44227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.30816,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00487574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000017053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 4.2611,
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
        "date": 1739060082300,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00564742,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.00381699,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000017393,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000035828,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 23.8095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.85637,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000009538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00107394,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000119586,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000009458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 11.7746,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.497802,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000056188,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.00001034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000040689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.17913,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.5508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000013536,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000326129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000057651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 2.84915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00501449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.264035,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000021821,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00253519,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 24.984,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 7.93876,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000007584,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.31802,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00483662,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000011712,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 8.47698,
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
        "date": 1739074362783,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00502441,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.00355453,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000019037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000041058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 23.3935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.7423,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000010551,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.0010484,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000120841,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000009508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 11.5788,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.47489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000062217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000010079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000031729,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.11401,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.55391,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.0000105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000343908,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000059782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 2.86452,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00544532,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.262678,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000020309,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.0018289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 24.6902,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 7.88127,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000021621,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.31403,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00474315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000011191,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 8.47785,
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
        "date": 1739554287899,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00526162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.27303,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000025349,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000042392,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 25.1893,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.4209,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.0000104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00111114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000139521,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000008757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 12.5686,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.47926,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000062551,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000024327,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000033264,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.39454,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.59382,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000009799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00035685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000068332,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008887,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 2.9117,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00546159,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.00522051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000020319,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00197566,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.8367,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.31443,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000009648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.35103,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.0051341,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000012273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 8.86665,
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
        "date": 1739852676303,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00513028,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.00401773,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000020099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000039947,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.2522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.98297,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.00001034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00106168,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000135582,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000008918,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 11.966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.472897,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000060004,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.00001038,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000043854,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.26244,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.55096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000010781,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000347916,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.0000672,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 2.8733,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00507026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.265483,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000023184,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00183358,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.1043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.05276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000013256,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.32484,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00486196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000012674,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 8.75563,
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
        "date": 1740174029314,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.477001,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 1.28886,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000023655,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000042772,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.4673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.28004,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007164,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00113811,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000137845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000009588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 11.9293,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.498636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000065857,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.00001581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000036491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.41856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.58253,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.00001028,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00036671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00007275,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008747,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 2.90275,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00546736,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.282419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000027884,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00264988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.6571,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.25314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.000009588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.34924,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00546896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000011471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 0.660759,
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
        "date": 1740201202382,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.00533716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.277429,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000022273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000043424,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 25.1989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 6.27972,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000007856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00123164,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000138888,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000015099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 11.9395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.497248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.000061278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000025801,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000033074,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.44994,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.60985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.00001005,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000339587,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00007227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000008947,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 2.93784,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00534614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.279273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000026311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00414195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.294,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 8.11135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.0000052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.33143,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.0058817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000012945,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 0.661214,
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
        "date": 1740273306060,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_1",
            "value": 0.40936,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_1",
            "value": 0.184321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_1",
            "value": 0.000019127,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000040288,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_1",
            "value": 24.6109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_1",
            "value": 5.91444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_1",
            "value": 0.000009448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00115002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.000137987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_1",
            "value": 0.000018125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_1",
            "value": 11.8563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_cpu_np_4",
            "value": 0.500726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_cpu_np_4",
            "value": 0.00006227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_cpu_np_4",
            "value": 0.000011212,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000040779,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_cpu_np_4",
            "value": 6.32662,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_cpu_np_4",
            "value": 1.53015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_cpu_np_4",
            "value": 0.000010851,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000349547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.000064615,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_cpu_np_4",
            "value": 0.000009478,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_cpu_np_4",
            "value": 2.92399,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_sfem_taylor_bar_gpu_np_1",
            "value": 0.00597346,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_sfem_taylor_bar_gpu_np_1",
            "value": 0.269463,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_sfem_taylor_bar_gpu_np_1",
            "value": 0.000027233,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00218524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_sfem_taylor_bar_gpu_np_1",
            "value": 25.5823,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_sfem_taylor_bar_gpu_np_1",
            "value": 7.74938,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_sfem_taylor_bar_gpu_np_1",
            "value": 0.00001009,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_sfem_taylor_bar_gpu_np_1",
            "value": 1.33139,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.00498584,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_sfem_taylor_bar_gpu_np_1",
            "value": 0.000012565,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_sfem_taylor_bar_gpu_np_1",
            "value": 0.651695,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}