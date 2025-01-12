window.BENCHMARK_DATA = {
  "lastUpdate": 1736701258971,
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
      }
    ]
  }
}