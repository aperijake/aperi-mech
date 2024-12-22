window.BENCHMARK_DATA = {
  "lastUpdate": 1734833004955,
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
        "date": 1734833004427,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.005261,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000969567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00002084,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000036621,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.977,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 4.5923,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.0010964,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00014482,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009759,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.66821,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.513586,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0116885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000137246,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000122607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.48249,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.19412,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00002096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000955599,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000060477,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000517742,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.816507,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00587653,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000894381,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000016963,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00182915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.9797,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.10002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007965,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.33565,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00499141,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000015761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.146034,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}