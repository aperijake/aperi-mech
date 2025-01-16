window.BENCHMARK_DATA = {
  "lastUpdate": 1737002259118,
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
        "date": 1734833013577,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00632929,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000993673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000034958,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 26.1596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.35753,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00113982,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000140532,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 45.4616,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.502072,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0101515,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000028224,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000047442,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.56303,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.7227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009118,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000371429,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000126004,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000064033,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 7.00687,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00445339,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000924649,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00183756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.5454,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.68338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.34372,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00528511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016602,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.49851,
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
        "date": 1735328587103,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00560833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000972979,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00002036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000042803,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.8583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.4021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00113296,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00016494,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009459,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 46.3473,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.527063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0134223,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000024257,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050898,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.2315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.75575,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000016051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000347134,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000129741,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000052332,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 7.02716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00662699,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00104152,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000022404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00192208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.6843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.76343,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00560114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000013426,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.7148,
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
        "date": 1735681821059,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00511203,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000971269,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000022193,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000041019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.6647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.355,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007695,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00113328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000139408,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000025119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 44.9764,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.508907,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0137128,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000034617,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.2111,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.72957,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000021321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00112062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000091225,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000599304,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 7.13992,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.047734,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00109055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00189059,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.3076,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.69363,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33091,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00516181,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016592,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.56384,
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
        "date": 1736284589519,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.13761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000944675,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000017533,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000076995,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.0715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0011505,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000188914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 44.2282,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.558297,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0110998,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000014518,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000038084,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.20792,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.75923,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000055836,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000386068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000116603,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050627,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 6.99944,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.079041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000874545,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000021101,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00477806,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.3853,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.41915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.31961,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00539847,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.50311,
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
        "date": 1736331756124,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.136955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000968484,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000019529,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000051501,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 26.7957,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.43295,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008277,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00124855,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000168292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013406,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 13.0218,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.546155,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0134783,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000058139,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000049142,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.12112,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.08728,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050485,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000463112,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000138841,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000052809,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.38641,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00534192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00103722,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000019788,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00206096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.8934,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.2212,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.37832,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00495776,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016872,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 7.97557,
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
        "date": 1736665601049,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.161705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000870994,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000017644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000047402,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.4795,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.70797,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000005009,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00110089,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000150701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014939,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.1456,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.562122,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00948483,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000037583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000062852,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.7973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.88912,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000092289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000459748,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00018107,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000091808,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.23334,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0155545,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000829464,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00456931,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 24.5714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.31595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.31384,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00485667,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000017734,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.47068,
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
        "date": 1736701250209,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.155271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000918964,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000020289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000072229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.6012,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.74787,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007334,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0011154,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00015535,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009568,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.3095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.548571,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0129833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000033966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000064314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.65287,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.8892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000048875,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000414611,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000125353,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000062121,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.22165,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0162665,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000889566,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000019147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00444966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 24.9721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.43637,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.31895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00487802,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000011051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.52506,
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
        "date": 1736871084499,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.141036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000995232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000051873,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.0142,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00125038,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000161749,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.403,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.533694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0105015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000029876,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.70475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.96369,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050746,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000382583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000195499,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000061787,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.29883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0051151,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000918444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000024427,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00179606,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.2794,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.50933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008376,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.34566,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00500907,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016873,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.60629,
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
        "date": 1736899345310,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00625077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.274951,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000029248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000049659,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0172,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.70532,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007304,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00115175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000162399,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000019017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.6681,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.520918,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000237492,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000201714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000319739,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.0342,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.14354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000019437,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000602548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000373512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000159113,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.32271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.049932,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00098182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000020419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00195794,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.379,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007775,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33188,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00512268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00001581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.58707,
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
        "date": 1737002258548,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00765321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.269557,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000025539,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000048193,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.8239,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.65552,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007936,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00112721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000144109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008978,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.4506,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.538944,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000060077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00002005,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000048104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.87008,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.10278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000078873,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000408093,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000163447,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000069445,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.22849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0462767,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000914651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000019417,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00195921,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.4789,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.17057,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007124,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.32597,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00547953,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002023,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.55798,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}