window.BENCHMARK_DATA = {
  "lastUpdate": 1750488077667,
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
        "date": 1734833017985,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.1583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00103645,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000045679,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 30.8731,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 14.6799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00729386,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000837591,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 140.397,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.275,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.018269,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017334,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000039417,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 8.4701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.40158,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000040217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00205779,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000427116,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000086638,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 26.0077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.109173,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000957884,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00180925,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.07,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.84017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.47317,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0265314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.5054,
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
        "date": 1735328595484,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0594512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00103964,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000038495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 30.623,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 14.5466,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00710775,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00101742,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010179,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 141.836,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.51259,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0141604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000173758,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00006688,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 8.47385,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.49417,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00023203,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00255128,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000344229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000091357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 26.2959,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.212115,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000946468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00002056,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0018247,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.5724,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.82798,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.48506,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0265062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022894,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 38.4972,
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
        "date": 1735681828734,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.119212,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00102957,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017975,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000041891,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 31.2128,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 14.4777,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00705558,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000820668,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016963,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 140.853,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.24719,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0160403,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000035489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000054856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 8.39994,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.1523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053363,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00211886,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000382929,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000045147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 26.2726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.157426,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000992159,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021442,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00195721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.8919,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.77049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000020229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.45676,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0264646,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019487,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.792,
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
        "date": 1736284596536,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.147305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00096952,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021551,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000040758,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 30.2166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 14.3602,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00729211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000834328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021069,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 140.735,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.06522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0106884,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000144195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000035818,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 8.27435,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.48948,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000207946,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00229997,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000495603,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000205121,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 26.3279,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.234846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000912046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022152,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00176921,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.5561,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.6915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.44472,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0252856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022252,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.4892,
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
        "date": 1736331762835,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.16798,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0010484,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019546,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000043833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 25.0537,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 9.17255,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00757136,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000665022,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 37.3157,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.0945,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0230006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022537,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000050002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.61358,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.15125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000103011,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00270414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000387834,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000093983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 11.4886,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.107159,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00105824,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000018916,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00204273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 26.3639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.8853,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007835,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.48612,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0253497,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.5036,
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
        "date": 1736665607252,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.133703,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000903376,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018736,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000043104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.4099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.40475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00680021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000592947,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 34.3477,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.54745,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0234276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000030058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.41766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.87883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000049817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00222374,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000352071,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000053564,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.3878,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0945789,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000922293,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000020058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00175967,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.77091,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.44045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0253006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000018296,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.418,
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
        "date": 1736701258123,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.250305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000895488,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00002065,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000044877,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2341,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.35346,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007655,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00672892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00055392,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 34.9109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.04512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.01204,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000087439,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000161131,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.35207,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.7914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000051449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00237709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000320238,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005174,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.4109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.196482,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00092292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017905,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00174742,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.4267,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.6719,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.44642,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0252419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019969,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.7805,
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
        "date": 1736871098152,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.145297,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000955986,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018805,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000037841,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.9715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.55486,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000518,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00750399,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000668957,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 34.9156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.46224,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0169063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000020358,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000036479,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.44819,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.08557,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000087955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00221218,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000316768,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000085813,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.9844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.138053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000977918,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021592,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00179713,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.9404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.93018,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.47143,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.026331,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019237,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 38.3363,
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
        "date": 1736899351170,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.212145,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000992765,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000039505,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.1627,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.72854,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007855,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00697756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000600352,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001573,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 35.2427,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.31938,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0216924,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000044315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.49457,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.17647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000106182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0022756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000329456,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000086534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.6755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.226376,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00096671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022082,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00185265,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.4002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.46061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.025875,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000024456,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.6714,
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
        "date": 1737002264924,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.13261,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000955192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019789,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000040419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.8949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.7126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007555,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00693689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000613695,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 35.012,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.66776,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.021888,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000032031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.29666,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.14208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000042743,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00205771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000378373,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000099733,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.5674,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.158145,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000940585,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00183871,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.6664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.97109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007804,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.45896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0255109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000024647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.933,
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
        "date": 1737242279113,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.123177,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000967787,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018075,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000043985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.0843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.70098,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007886,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00685226,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000609412,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 34.7546,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.21725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0157596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000090916,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00015449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.56982,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.05615,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022514,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00296271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00041267,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000117027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.6611,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.282248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000945794,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00177663,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.499,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.90927,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.45518,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0254322,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019568,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.5745,
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
        "date": 1737292178461,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.147194,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000991633,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000048604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.8715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.73108,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00711169,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000863154,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 34.871,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.46088,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0143462,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011703,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.36977,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.11111,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000197263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00216596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000469521,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00042272,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.4992,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.221671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000961084,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00180236,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.2257,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.91093,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000008957,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.46495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0256793,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.8632,
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
        "date": 1737866693718,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.166315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00122741,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016402,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000038898,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.6814,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.7692,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007554,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00693456,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000858162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 36.5682,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.38904,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0316582,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000021922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005241,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.53788,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.11463,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000081646,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00209215,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000368285,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000086766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.121707,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000977589,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00181475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.2956,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.93039,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.45975,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0257374,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000023294,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 38.026,
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
        "date": 1738345365948,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.312966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00162123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016231,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000044026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.0183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.78815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007083,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00709048,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000647053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 35.5829,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.26429,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0281936,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000358205,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000032995,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.49724,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.7672,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017785,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00237714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000309029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022304,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.5213,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.109076,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000976361,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019197,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00190583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.7077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007274,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.46019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0265794,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000025159,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.7048,
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
        "date": 1738384426572,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.145562,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00096148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017484,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000042903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.8436,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.75403,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00720423,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000606222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 34.3505,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.6414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0225831,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000037553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.30792,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.24565,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000020689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00231949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000428117,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022814,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 10.3471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.14917,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000944112,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019417,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0018253,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.53,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.0375,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007826,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.44652,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0258473,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021662,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.3395,
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
        "date": 1739060093408,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.184737,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.254444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019319,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000041332,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2656,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.33282,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006373,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00691503,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000569989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009429,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 40.3369,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.63664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0101695,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011074,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000040516,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.96431,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.48947,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009919,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00227902,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000218079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009178,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 11.8789,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.146217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000918329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000039825,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00180026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.8622,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.69413,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007464,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.47478,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0252559,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000018375,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 44.9582,
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
        "date": 1739074381116,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.204236,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000920156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00002134,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000045025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 22.9664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.35392,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009038,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00670286,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000561097,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 40.4066,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.50591,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0237774,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000036744,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.89208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.40647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010201,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00220183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000194817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000008648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 11.8561,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.13438,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00118216,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019967,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00178443,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.5878,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.77559,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000010009,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.44552,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0256924,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 44.8169,
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
        "date": 1739554304310,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.117386,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000961764,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020249,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000045057,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.6692,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.49309,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008687,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00696456,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000619348,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010179,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 40.9679,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.52416,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0226966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022884,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000037643,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.02854,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.37589,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00214066,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000414235,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019638,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 11.9632,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.298147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00115087,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021712,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0019731,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.6299,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.79345,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.48367,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.026149,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019157,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 45.2497,
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
        "date": 1739852687584,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.238148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000736311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000041981,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.1058,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.42635,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00679035,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000604528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000984,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 40.7989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.71329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0355316,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011863,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000040238,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.96639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.31119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009819,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00211769,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000239244,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001035,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 11.8828,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.144647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000720348,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021441,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00183739,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.9608,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.86959,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000008236,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.45467,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0252251,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021752,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 44.2697,
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
        "date": 1740174045627,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.144465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000745966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00002019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000040318,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.6954,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.13149,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007866,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00705608,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000604077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001533,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 96.2088,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.58688,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00006771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000018987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000047411,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.02179,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.66528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010871,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00230092,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000236958,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 26.6989,
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
        "date": 1740201213085,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.117955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000766297,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020921,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000047783,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.7705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.14496,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009739,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00713588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000624356,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000997,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 42.2549,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.70619,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0107514,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000026181,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000034477,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.99869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.62289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010611,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00221926,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000256726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 12.7927,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.183886,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000750182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.001974,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.9262,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 9.32042,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000010009,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.46657,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.02558,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 28.2379,
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
        "date": 1740273322065,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.176168,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00074373,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000018777,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000041901,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2949,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.68695,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007675,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00696833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000607687,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000017434,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 42.9643,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.80271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0213095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017383,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000040378,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.97664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.75524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00231052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000221919,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010631,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 12.3251,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.152398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000721682,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00192962,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 10.3636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007986,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.4611,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0253144,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022924,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 27.1313,
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
        "date": 1740427826303,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.146887,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00079371,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020219,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000049807,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.1819,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001013,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00673212,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0005257,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001014,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.58,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.5471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00998147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017543,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000041881,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.89725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012594,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00259548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000192002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009318,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.5758,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.117068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000713101,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000026491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0037913,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.8737,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007514,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.0492,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0251374,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000015941,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.7123,
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
        "date": 1740489919824,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.158623,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000712363,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000052762,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.4553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005722,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00718865,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000587761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 50.1715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.59644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0109215,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000042232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.96918,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00284124,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000201701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009078,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.10079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000720219,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00188416,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.8086,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009779,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.05976,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0252355,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.1891,
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
        "date": 1740540078216,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.162203,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000802746,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00003605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000053153,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.2591,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00712271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000554046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010461,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.8723,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.69973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0107542,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000042302,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.96991,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00288363,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000192894,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009358,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.6168,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.183705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000739113,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00195443,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.2325,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009198,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.05562,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0265146,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000023746,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.5381,
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
        "date": 1740631866825,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0963607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000055448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2401,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009428,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00710649,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000565977,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 50.3614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.53561,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0347278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016783,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000038164,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.96071,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012324,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00274757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000195309,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009198,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.7166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0997093,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00084081,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00002044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00192275,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.6739,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.05833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0259638,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00003604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.6131,
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
        "date": 1740632262163,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0963607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000055448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2401,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009428,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00710649,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000565977,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 50.3614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.53561,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0347278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016783,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000038164,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.96071,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012324,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00274757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000195309,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009198,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.7166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0997093,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00084081,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00002044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00192275,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.6739,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.05833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0259638,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00003604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.6131,
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
        "date": 1740685812705,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.120097,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000760099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021301,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000056268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.4621,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00744523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000600771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 50.1303,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.54253,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0245371,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022904,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000045227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.10098,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012805,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0029806,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00021266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000008697,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.3967,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.139849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000739577,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021602,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.001931,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3303,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009669,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.05509,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0260701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.4045,
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
        "date": 1740706883048,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.142902,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000717585,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015149,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.0148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00716279,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000552202,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014938,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 50.1618,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.6482,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0336096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011032,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000039837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.92505,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011723,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00325501,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000210702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000008817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.9713,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.140189,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00073808,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00184432,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3065,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007775,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.07045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0259494,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.5982,
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
        "date": 1740880455954,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.203084,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000709464,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000025209,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000070026,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.0975,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009668,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0073081,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000576848,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.7623,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.63135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0103376,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000046039,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.96155,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001529,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00270746,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000202031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.962,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.116082,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000917137,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00002548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0019284,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3941,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.05135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0251328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.3886,
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
        "date": 1740927915712,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.142209,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000746933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000058533,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.0728,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00670842,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000534856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0000105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.5093,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.50162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0251146,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011001,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000066909,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.91209,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00281777,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000184196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.5244,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0749134,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000935452,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019668,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00189036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.3007,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000005701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.0571,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0251547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016672,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.9454,
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
        "date": 1740970674067,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.146379,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000720061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00005726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.5978,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008646,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00725127,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000560805,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.7676,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.4563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0103348,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019618,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00004673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.87722,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013496,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0026986,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000220216,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000008687,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.0125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.126596,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000743912,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022453,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00187265,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.4498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000008927,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.03493,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0256256,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019257,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 36.7947,
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
        "date": 1742279213779,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.105823,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000790738,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024277,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000067691,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.6442,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00767958,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000600851,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009518,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.3421,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.14583,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0069143,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019087,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000047311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.06206,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000033405,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00311415,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000216609,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000023626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.118,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.07684,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000794336,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000023826,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00189987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.5629,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00000542,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.85061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153235,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017734,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 35.3472,
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
        "date": 1742607265443,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.122481,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000862863,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022904,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.9231,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009788,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00749217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000636929,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.6061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.60043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0180395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00002076,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000048334,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.05517,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011802,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00303817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000338414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000033835,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.9782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0991149,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000859248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000024286,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00194354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 26.266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.03734,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0250385,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00002581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 34.6044,
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
        "date": 1742662180259,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0991215,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000884079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023085,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000059745,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.8091,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00794414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000678593,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009909,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 54.2002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.64685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.018021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0000207,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000056779,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.29429,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012434,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00336772,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000346389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011422,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.6588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0599474,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000933355,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000025029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00348626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 26.3152,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009038,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.09598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0257294,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000024307,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 33.0343,
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
        "date": 1743057851179,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0973414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000785995,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022293,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050496,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.8693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00689938,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000558962,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009919,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.3664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.66756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0179479,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00004744,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.9389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013165,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00261546,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000298199,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.631,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0921451,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000826953,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00184988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009188,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.03186,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0248446,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00002082,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 34.3804,
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
        "date": 1743979718401,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0814921,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000811049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00006191,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2289,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008206,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00732108,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000598317,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009098,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.7841,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.52291,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0174025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000022263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000046019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.95467,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017304,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00303794,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000288538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000010891,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.0139,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0808045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000071619,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019347,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.001869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.5526,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.02715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0250418,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016792,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 34.6509,
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
        "date": 1744083782327,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0920985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000778498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022744,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000055838,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009298,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00702733,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000593029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.5222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.46992,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0064535,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000023095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000055648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.02624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012494,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00299072,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000325661,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000015189,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.0513,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.141316,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000781664,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022653,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00185354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.7228,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009187,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.01465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.02452,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00001577,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 34.0732,
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
        "date": 1744689295142,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.104557,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000811913,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024597,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000055638,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.2099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00748618,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000622837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 53.2755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.85201,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00630419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000050338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.99855,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011262,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00302078,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000280414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012865,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.9749,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.197036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00106879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000028195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00188584,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.2725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.02532,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0254884,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016241,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.9328,
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
        "date": 1745640059379,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.138034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000803911,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000025098,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000058383,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.7633,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009197,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00740383,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000600394,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 52.3176,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.64211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00674431,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000048693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.95617,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013426,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00297698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000245781,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012283,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.7969,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.147208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000768512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022774,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00187414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.0378,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007474,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.03014,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0250197,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.2555,
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
        "date": 1746231499993,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0984988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000790307,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00005708,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.9441,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009128,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00727169,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000575987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016323,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 53.385,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.7797,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0195989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011642,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000042462,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 5.99598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013747,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00309996,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000230054,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000009388,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.9373,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.132161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000796126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000023215,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00184587,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 26.007,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000008867,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.02879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0253603,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.8575,
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
        "date": 1748663911891,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.230662,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000860829,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000057601,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.0463,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0076021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000616175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010461,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 3.09096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.126302,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000053644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000027122,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00201327,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3073,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000007795,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.02777,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0254381,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000018425,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.25742,
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
        "date": 1748722177209,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.165101,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000055806,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016371,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000062819,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.6312,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009518,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00760006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000627351,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016682,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 53.8405,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.89429,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0322825,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000018356,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000045079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.26138,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011884,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00305337,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000273698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.2879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0945036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000829825,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00199807,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.4298,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00001054,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.05241,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0254038,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000023876,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 38.3176,
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
          "id": "0c5be6a4f69361c24728e065431da742fe0b8925",
          "message": "Merge pull request #103 from aperijake/update_trilinos [skip ci]\n\nUpdate trilinos",
          "timestamp": "2025-06-03T19:58:36Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/0c5be6a4f69361c24728e065431da742fe0b8925"
        },
        "date": 1748989328317,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.150262,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050177,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050167,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.7679,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010249,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0071307,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000509161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000016311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 51.9191,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.96983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0174617,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000051147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.0984,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00306162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000207453,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000008776,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.9396,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.159389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000765889,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000023455,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00124939,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3341,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000009458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.39702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0211553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013816,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 37.3481,
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
          "id": "6bada80bce3099fef2ec62fd9c1918a34c13fb3d",
          "message": "Merge pull request #104 from aperijake/timer_update [skip ci]\n\ntimer updates",
          "timestamp": "2025-06-04T19:43:43Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/6bada80bce3099fef2ec62fd9c1918a34c13fb3d"
        },
        "date": 1749069819414,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.130989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000781021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000063999,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.5892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008998,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00717142,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000552491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 52.2889,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.09328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0285907,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012073,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.06689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00304842,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000268756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013085,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.9779,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0714743,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000791667,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000027495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00127311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.6802,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000011763,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.43948,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0207458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 40.0687,
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
          "id": "657fd1a56b3182e8d3d6fb7d04fb696e03c75989",
          "message": "Merge pull request #106 from aperijake/type_work [skip ci]\n\ncentralize data type specification",
          "timestamp": "2025-06-05T22:00:34Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/657fd1a56b3182e8d3d6fb7d04fb696e03c75989"
        },
        "date": 1749164514470,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.103522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000774935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023936,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0000572,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.3478,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00716042,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000540102,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 52.1469,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.96264,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.02992,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00002037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000043955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.09689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00294525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000273489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012204,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.9553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.132352,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00082262,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000024397,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00121199,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.1245,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000011673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.3886,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0210338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 39.296,
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
          "id": "ccc7f41d77cd82b748a054ff00268080da9a6353",
          "message": "Merge pull request #107 from aperijake/misc_refactoring [skip ci]\n\nMisc refactoring",
          "timestamp": "2025-06-09T22:46:12Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/ccc7f41d77cd82b748a054ff00268080da9a6353"
        },
        "date": 1749512759888,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.225665,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000805176,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021993,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00005668,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.628,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009829,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00697195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000520175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001038,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 52.8379,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.6636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0184849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012565,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000059455,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.13025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000016472,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00285789,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000254942,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012324,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.6898,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0407304,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000830444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000030479,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00132412,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000012874,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.43896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0214556,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022813,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 39.8854,
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
          "id": "9d54fea3419f515239d32a4e1bbaba4fb50393a2",
          "message": "Merge pull request #108 from aperijake/for_each_with_caching [skip ci]\n\nadd caching option to ForEachEntity",
          "timestamp": "2025-06-10T01:53:41Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/9d54fea3419f515239d32a4e1bbaba4fb50393a2"
        },
        "date": 1749523979510,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.192297,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000806849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000052471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.3712,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000007896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00687941,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000532149,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014168,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 52.7161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.66161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0187451,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000049676,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.01922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000020329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0030388,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000217049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.6588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.215108,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.115048,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000029898,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00136017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.4229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013486,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.42578,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0213318,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022724,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 40.3694,
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
          "id": "999a0431a3d4ee8c372a5c0e1e5821336f6673e9",
          "message": "Merge pull request #109 from aperijake/search_update [skip ci]\n\nSearch update",
          "timestamp": "2025-06-10T21:38:53Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/999a0431a3d4ee8c372a5c0e1e5821336f6673e9"
        },
        "date": 1749594926172,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.124685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000774369,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00002131,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000052338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.7513,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009749,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00703668,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000517589,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009488,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 51.9195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.7658,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0171174,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012023,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000040237,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.03004,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013526,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00296521,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000218903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.0413,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.170741,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000803222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000026068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00123639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.5759,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013585,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.42435,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0208854,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000023523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 39.3499,
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
          "id": "80f57c141a37b1fa2843a9620271e0b9dace5983",
          "message": "Merge pull request #110 from aperijake/search_update [skip ci]\n\nre-hook in neighbor search timers",
          "timestamp": "2025-06-11T21:15:03Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/80f57c141a37b1fa2843a9620271e0b9dace5983"
        },
        "date": 1749680051808,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.106613,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000779165,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000049195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00754257,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000518426,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011432,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 51.7032,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000043344,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001064,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.75277,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.71203,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.107232,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00686777,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0554437,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000207232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.93488,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0181813,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00004195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.07578,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000015369,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00298295,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000282693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000024988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.1337,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000050066,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014498,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.15152,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.88956,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.126416,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00205065,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0236963,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00007311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.153866,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000842538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000027984,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0012043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3928,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013286,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.40491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0207006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000022082,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 39.6114,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000044616,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.110346,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.27189,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.9556,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.111178,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00121123,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00862238,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00457499,
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
          "id": "281c82483fd6f8ee2cce7950bd1fde7ea8189489",
          "message": "Merge pull request #111 from aperijake/search_update [skip ci]\n\nSearch update",
          "timestamp": "2025-06-12T04:00:40Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/281c82483fd6f8ee2cce7950bd1fde7ea8189489"
        },
        "date": 1749704251410,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.187047,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000799658,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023765,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000057199,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.6781,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0074703,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000534718,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010571,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 52.5233,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00003655,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010911,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.76229,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 8.22933,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004769,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00671443,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0553436,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000219322,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.82403,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0192557,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000021652,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000043825,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.05838,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013887,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00306744,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000288845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013145,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.2493,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000044296,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017594,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.16112,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.02295,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.123295,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00210114,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0230962,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000068903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0735921,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000835287,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00124459,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.6016,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013897,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.41638,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0206879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00001516,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 39.2546,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000039697,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.106904,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.269494,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.662,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013756,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00124921,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00859582,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00458565,
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
          "id": "f5265df5dfd5c3a62735ab60780d45e3aec53340",
          "message": "Merge pull request #112 from aperijake/search_update [skip ci]\n\nPrefer local offsets of EntityIds in search",
          "timestamp": "2025-06-13T02:58:03Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/f5265df5dfd5c3a62735ab60780d45e3aec53340"
        },
        "date": 1749787015664,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.107685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00079258,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000057211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.5676,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0067048,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00048542,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009529,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 46.6386,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000047613,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009498,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.86742,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.25462,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006102,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00194352,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0447009,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000206882,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.97559,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0186231,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0000357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000048594,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.00675,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017985,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00258639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000236168,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.7694,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000059115,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000007454,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.09619,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.18279,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.119884,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00223968,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0180855,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000064966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.158235,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000832114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000028305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00121012,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.152,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.41424,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0209097,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000015761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.543,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000038575,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.105779,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.274774,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 5.94244,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013997,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00115825,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0084376,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00454924,
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
          "id": "101c688af985a70771115a56e73e4a76d459fa3d",
          "message": "Merge pull request #113 from aperijake/spack_updates [skip ci]\n\nSpack updates",
          "timestamp": "2025-06-15T18:31:29Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/101c688af985a70771115a56e73e4a76d459fa3d"
        },
        "date": 1750015714445,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.122119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000749195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000025619,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000048234,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.8079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000008065,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00682042,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000518587,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00001551,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 46.3623,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000038154,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000513,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.68045,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.28747,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000004359,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00191979,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0444762,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000222563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.74109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00565129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000036701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000050348,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.01377,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000041771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00278363,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000246609,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013586,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 17.8335,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000059465,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000019908,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.05373,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.20245,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.12153,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00237279,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0185472,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000078793,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.127138,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000821336,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000024548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00119932,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.41,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013736,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.42895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0206495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000020711,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.4099,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000036861,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.105901,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.274725,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 5.70742,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000012795,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00116757,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00840366,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0045206,
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
          "id": "7cd889dfa89cb187ce6691725698cea19c2d2502",
          "message": "small readme change",
          "timestamp": "2025-06-16T23:46:06Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/7cd889dfa89cb187ce6691725698cea19c2d2502"
        },
        "date": 1750127183880,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0871295,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000751372,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000024618,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000057743,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.9948,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005981,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00731932,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000544329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000010029,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 46.2019,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000033335,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000011402,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.67714,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 2.2652,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000006713,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00198129,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0462337,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000208505,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.68115,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00520449,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000020279,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005163,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.1076,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000013867,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00292166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00027777,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000012694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.3944,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000060718,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00001545,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.13842,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.21581,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.126279,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00273022,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0192522,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00007235,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.066569,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000790928,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000027303,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00116022,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.3997,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000011693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.3887,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0204468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000021983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 22.2034,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000039116,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.107883,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.276346,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 5.65381,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000015461,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00110365,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00831623,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00445643,
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
          "id": "dc4117d5403d3775326e2e543163833946bb985e",
          "message": "Merge pull request #114 from aperijake/search_update [skip ci]\n\nSearch update",
          "timestamp": "2025-06-19T11:10:42Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/dc4117d5403d3775326e2e543163833946bb985e"
        },
        "date": 1750334869662,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.151195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000814311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000021912,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000050337,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.9095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00690585,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000501662,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000009578,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.4719,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000037032,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.01962,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 4.56762,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0018676,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.04487,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000213974,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.77328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0178018,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000040547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.01017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000014438,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00258467,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000240843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000011311,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.3714,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000061198,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00000559,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.24038,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.53832,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.128029,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00235836,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0177593,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000063762,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0729366,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000079883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000024878,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00122906,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 24.4404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013557,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.41232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.020936,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000014708,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 16.861,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000040257,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.321654,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.466015,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00128476,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0083746,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00448598,
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
          "id": "03d3ddeb0c58ffc3f64d8bffff92fc1dd2da8cf5",
          "message": "fix ordering issue in performance pipeline [skip ci]",
          "timestamp": "2025-06-20T21:53:27Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/03d3ddeb0c58ffc3f64d8bffff92fc1dd2da8cf5"
        },
        "date": 1750459971508,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_Application_Total_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.247553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000813621,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000046901,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000078231,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.897,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000034306,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00721366,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000573948,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000032793,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 49.1654,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000081598,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000232409,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0462954,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00191766,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.954,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.400804,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_SortSearchResults_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 3.69131,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.402172,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Total_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.92989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0171348,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000044626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000101116,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.18212,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000054926,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00290943,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000316723,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000032793,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.8621,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000063753,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000090375,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0214991,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00243784,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.25176,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000044936,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.134767,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.56709,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_SortSearchResults_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.14718,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.845863,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Total_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.150772,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000849691,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000047081,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00124595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.4772,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000047923,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.4167,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0205148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000050107,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 16.7602,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000095956,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00468303,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00850017,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00135038,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.320139,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0275562,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_SortSearchResults_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.396004,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0435598,
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
          "id": "8d99364dd9699ae2fd1e3340e31cf6ffb1d01835",
          "message": "stash changes first [skip ci]",
          "timestamp": "2025-06-21T05:44:45Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/8d99364dd9699ae2fd1e3340e31cf6ffb1d01835"
        },
        "date": 1750488077324,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_Application_Total_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.143534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000835701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000045528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000080575,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.8184,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000034837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00716408,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000556023,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000031711,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 48.9802,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000070215,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000230695,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0461112,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00194641,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.9931,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.398225,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_SortSearchResults_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 3.66332,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.399431,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Total_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_ReadInputMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.58704,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateFieldResultsFile_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00491742,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateTimeStepper_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000039997,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateInternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000077139,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddFieldsToMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.01554,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_LabelMesh_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateExternalForceContribution_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00005673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddInitialConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00289497,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000246395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateOutputScheduler_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000032663,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Preprocessing_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.8886,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_Instantiate_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000052742,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000088611,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.019529,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00257657,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CoarseSearch_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.25913,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000039647,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.132625,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.573488,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_SortSearchResults_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.15049,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.875021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Total_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_ReadInputMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0993652,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateFieldResultsFile_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000841524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateTimeStepper_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000056379,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateInternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00123922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddFieldsToMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 25.5319,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_LabelMesh_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateExternalForceContribution_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000042572,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_AddInitialConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 2.43564,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0206659,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_CreateOutputScheduler_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000049336,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Application_Preprocessing_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 16.7859,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_Instantiate_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000087879,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_ComputeKernelRadius_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00472876,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodePoints_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00851751,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CreateNodeSpheres_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00133277,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CoarseSearch_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.319043,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_KokkosDeepCopy_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_GhostNodeNeighbors_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_CalculateResultsDistances_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.028062,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_SortSearchResults_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.395902,
            "unit": "seconds"
          },
          {
            "name": "Neighbor_Search_Processor_NeighborSearchProcessor_UnpackSearchResultsIntoField_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0436657,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}