window.BENCHMARK_DATA = {
  "lastUpdate": 1734833018477,
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
      }
    ]
  }
}