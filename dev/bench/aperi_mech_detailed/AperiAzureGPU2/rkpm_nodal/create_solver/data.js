window.BENCHMARK_DATA = {
  "lastUpdate": 1740632262646,
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
      }
    ]
  }
}