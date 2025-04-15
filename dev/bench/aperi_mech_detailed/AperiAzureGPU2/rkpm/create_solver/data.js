window.BENCHMARK_DATA = {
  "lastUpdate": 1744689290263,
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
        "date": 1737242270006,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0412709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.271146,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000021853,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000047321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.6152,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.64074,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007564,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00161527,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000157716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000011102,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.3629,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.513236,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000053664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011352,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000034126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.81795,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.10473,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00011829,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000506853,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000327355,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000101767,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.21287,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0581174,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000970532,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023155,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0017918,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.0479,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.18841,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.32846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0049193,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000019788,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.57373,
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
        "date": 1737292169970,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00548836,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.277694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000024197,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000042453,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0712,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.81417,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00113781,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000160581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013325,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.5883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.514196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000067641,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010891,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000049435,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.93564,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.08288,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000021762,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0003356,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000105194,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000043063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.21796,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0516005,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00101441,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000019067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00195169,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.6584,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.36213,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00000526,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.32097,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00529596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012364,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.62768,
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
        "date": 1737866685929,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.119373,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000965176,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000044775,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.401,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.72316,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00119705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000160885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016662,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.8802,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.529387,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000060827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000022193,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.72603,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.18799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000258153,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000385631,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000879764,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000043795,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.41568,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00931821,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000905498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000020208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00181356,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.951,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.27327,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007374,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.32797,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00510322,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000020619,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.74334,
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
        "date": 1738345359064,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0588798,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000940564,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000019187,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000036301,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.3508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.72284,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00118952,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00016504,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.5292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.533942,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000118539,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000032162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 7.02592,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.16092,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000596796,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000899742,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000818996,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000411176,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.29766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0107415,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000874565,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000024898,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00190738,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.3522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.31653,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33438,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00516904,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000019046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.60809,
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
        "date": 1738384420351,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0571933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00468651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00003636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.9647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.43636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00119513,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000143528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000011221,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 12.2315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.545072,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000133458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000090766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000143037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.83536,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 2.12017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000120614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000385605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000183715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000101827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 3.24591,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00586022,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000904648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00179371,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.4759,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.0771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.31006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00547015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 8.55157,
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
        "date": 1739060087752,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0426649,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00092174,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000020039,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000037732,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.6378,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.77282,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000005089,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0011899,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000133713,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008517,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 15.4415,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.511495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000065129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000024669,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000044037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.25454,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.78086,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011122,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000326012,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000058966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000008516,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 4.05116,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00539768,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.269872,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000028965,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00207386,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.2078,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.69176,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.32637,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00551822,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018184,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 11.971,
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
        "date": 1739074372041,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.144049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00448106,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000022553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000053814,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.2866,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.65032,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000006602,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00116416,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000134781,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 15.4812,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.510847,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000081563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050445,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.1519,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.75314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000326255,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000070673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000008156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 4.01248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.01585,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.264192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023635,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00706477,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.0344,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.65326,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008205,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33199,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0054702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018916,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 12.1954,
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
        "date": 1739554297227,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00565776,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.282073,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000023366,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000045759,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0603,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.02792,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008416,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00114769,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000143409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 16.116,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.473931,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000063402,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010641,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000037943,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.43037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.83053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001022,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000350308,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000069385,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000008847,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 4.11892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0395628,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00162922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000019347,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00198475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.93296,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00001025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.35053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00530562,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000021873,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 12.2085,
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
        "date": 1739852682000,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0420647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00331727,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000019939,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000042612,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0111,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.82666,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00111161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000145391,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016953,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 15.6351,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.490308,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000060878,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000042752,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.28344,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.77508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000325323,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000057492,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000008286,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 4.04813,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0055394,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.26815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026862,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00189179,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.349,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.76328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.33297,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00500395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000017173,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 12.1704,
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
        "date": 1740174037599,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0539692,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00338018,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00002105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000049254,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.5766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.91289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008086,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00117595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00014592,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018115,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 15.9644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.503514,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000059836,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000018015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000032954,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.44068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.85389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000373974,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00006217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009178,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 4.2117,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00535804,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.282081,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000025499,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00259257,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.5963,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.68115,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000009989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.3293,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00520148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000011512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 7.15636,
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
        "date": 1740201207614,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00567716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.283507,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000025128,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000043665,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.9517,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 7.07263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008176,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00117293,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000152654,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016672,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 15.9078,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.49486,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000056008,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000018927,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000048644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.51449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.88224,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009919,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000357462,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00008262,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000008788,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 4.18489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0058104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.28401,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023205,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00270345,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.1843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 9.03362,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000006402,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.35409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00591353,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 7.26489,
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
        "date": 1740273314476,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0439773,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0117255,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000020299,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0000466,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.3059,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 6.7303,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001558,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00115903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000144068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000017083,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 15.8591,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.499157,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000060156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010961,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000042192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.32412,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 1.7534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009729,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000389043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000057181,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000008777,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 4.15512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00529538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.271285,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000041421,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00193715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.6772,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 8.50454,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007324,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.34079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00525171,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012284,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 7.15244,
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
        "date": 1740427816556,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0399172,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00347341,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000022664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000054466,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009718,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00103029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000102859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008878,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.4434,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.498689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000060468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011042,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00006217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.24076,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000006593,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000491593,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000079725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000012605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.78965,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00540034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.262523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000027914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00220833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.3819,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00001022,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.14817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00532525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018416,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.4343,
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
        "date": 1740489912509,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0415691,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00389537,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018796,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000052272,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00103859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000093963,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000011973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.3853,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.51078,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0000619,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000016522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000049436,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.3713,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009759,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000569706,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000072431,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011151,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.94035,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00655166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.262151,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000022214,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00243062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.4225,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000009278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.15965,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00538734,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016382,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.6157,
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
        "date": 1740540070143,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00564207,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.270765,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000024357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000055768,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.7642,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009779,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00106189,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000094312,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.8059,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.481932,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000060949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050267,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.43553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000500421,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000085936,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.90661,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0418317,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00298052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002023,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00197957,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.4596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00001067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.16094,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00561178,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012497,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.7307,
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
        "date": 1740631860417,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00583856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.267399,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000024627,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000074755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0882,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009628,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00108678,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000103761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 23.0748,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.486233,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00006161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00003609,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000047211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.44058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000535626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000076147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.9547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00743977,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.265064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000022263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00256868,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.9203,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.15896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00557232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012834,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.832,
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
        "date": 1740632256512,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00583856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.267399,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000024627,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000074755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0882,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009628,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00108678,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000103761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 23.0748,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.486233,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00006161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00003609,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000047211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.44058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000535626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000076147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.9547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00743977,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.265064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000022263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00256868,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.9203,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.15896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00557232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012834,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.832,
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
        "date": 1740685805296,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00522572,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.26459,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000024758,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000050929,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.7571,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008396,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00107651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000097849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.7541,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.502014,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000066368,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011322,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000045027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.42229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000016031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000561224,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00011373,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000016642,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 6.03024,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0409318,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000717234,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000021201,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0019512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 26.1524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00000985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.16646,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00702143,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000015379,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.6604,
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
        "date": 1740706876939,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0424925,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00367255,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000022183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000050737,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.1569,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00109784,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000098359,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009108,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.4099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.514761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000060947,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010279,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000053984,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.27655,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000013476,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000548263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00007811,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.92022,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00530466,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.260021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002108,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00215171,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.4136,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00000987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.16228,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00529837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.4387,
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
        "date": 1740880450428,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0456717,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00349766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000020931,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000050157,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.9125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008346,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00106657,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000096237,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.1711,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.511672,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000061159,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00004671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.30389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005451,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000523486,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000072631,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000033185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.93739,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00557831,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.260849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002091,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00190274,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.2269,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008075,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.15628,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00575686,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.427,
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
        "date": 1740927909623,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0413392,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00126117,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00002095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000059516,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.1338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001014,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00102206,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00010277,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008768,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.3372,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.490277,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00006192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050628,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.28525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000015821,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000469538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00008801,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009107,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.78657,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00552596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.258901,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00193992,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.2566,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008867,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.17709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0053216,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000017383,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.446,
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
        "date": 1740970666014,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00737336,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.253321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000027583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000064753,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.4898,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009738,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00106151,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000097967,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009267,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.3839,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.511143,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000052501,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000017634,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000050517,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.33371,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000013726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000560084,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000077689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000010309,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.94723,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.040105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00132482,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002086,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00188623,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.6051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.14435,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00588563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018887,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.4512,
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
        "date": 1742279205266,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00799637,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00005161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000052031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.5949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000007465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00105109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000090485,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.2902,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.534731,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.255885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00002074,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000404973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.3811,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000559963,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000078702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.0000102,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.99202,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0434536,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00008827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00183006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.7932,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.134,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00570862,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00002036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 15.3523,
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
        "date": 1742607258897,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.046712,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0000573,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000021581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00005198,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 25.0809,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00001002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00108646,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00009883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.5275,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.497041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.266449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020569,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000049035,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.39455,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000522499,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000098471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 6.04626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00518398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000055738,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000014077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00193101,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.5196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000009639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.14766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00609353,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018736,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 17.3962,
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
        "date": 1742662173026,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.044384,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000075145,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000021502,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000059966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 27.0382,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000997,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00122168,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000106736,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009499,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 24.5755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.549082,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.276283,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000022594,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000049476,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.69632,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000504365,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000091487,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00001004,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 6.42216,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00671783,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000056389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00335478,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 27.2162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007213,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.1452,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00546823,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000016983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 17.6233,
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
        "date": 1743057844809,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0428448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00007432,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000015409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000058691,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.8727,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000011743,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.0010362,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000098576,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.498892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.262497,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000020549,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000056978,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.32609,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00000547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000492049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000066148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.95667,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00596649,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000051261,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000017775,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.001833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.4811,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000009198,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.142,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00532812,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000012314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 17.6343,
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
        "date": 1743979712785,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00709564,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000047783,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018866,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000046851,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.2541,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000006362,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00106994,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000091276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009138,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.3354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.522298,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.264848,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000021922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000048684,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.3146,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009719,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000530185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000073422,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000009508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 6.05164,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0413912,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000086578,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000023666,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00183859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.9281,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000008236,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.14235,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00520472,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000011933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 17.4643,
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
        "date": 1744083776602,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.160146,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00359316,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016552,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00302268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 24.2717,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00000545,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00106174,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000085556,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 22.1244,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.529504,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.267708,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000021061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000043113,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.2226,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00000556,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000545567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000088511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000011172,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 5.94682,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0247214,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000050558,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000020469,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00968753,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 24.9558,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000009879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.15632,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00516569,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000011673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 17.5624,
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
        "date": 1744689289802,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00784512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000055067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00005654,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 23.993,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00107767,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00009811,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000009408,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_1",
            "value": 27.9844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0.524218,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_cpu_np_4",
            "value": 0.255874,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000019859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000052131,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 6.44668,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000005641,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000518325,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000077911,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000015671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_cpu_np_4",
            "value": 7.74512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0428245,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000071098,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000026521,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00186217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 25.6055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 1.12276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00526359,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000018607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_taylor_bar_gpu_np_1",
            "value": 23.794,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}