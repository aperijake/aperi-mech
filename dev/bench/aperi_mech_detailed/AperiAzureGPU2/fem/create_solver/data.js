window.BENCHMARK_DATA = {
  "lastUpdate": 1735328570048,
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
          "id": "48a0eecc0db73d1a2bb7dc3af68ea67abae5dcdf",
          "message": "pipeline fix WIP [skip ci]",
          "timestamp": "2024-12-27T18:01:28Z",
          "url": "https://github.com/aperijake/aperi-mech/commit/48a0eecc0db73d1a2bb7dc3af68ea67abae5dcdf"
        },
        "date": 1735324278991,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00610362,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.0010033,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00002073,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000037383,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.4964,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 4.42757,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000010971,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00109336,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000132667,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000012715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.60827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.525472,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0126089,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000030991,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000073823,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.05663,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.22611,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000053203,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000342204,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000145823,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000053523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.806618,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00576756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000927551,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000020019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00182126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.069,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.08814,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007234,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.32968,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00498285,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000017644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.146216,
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
        "date": 1735328569172,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00529869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00099355,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000016492,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000038154,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.5989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 4.57658,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007695,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.0011103,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000136105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000012464,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.65754,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.521491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0125667,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000110425,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000042603,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.21838,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.25012,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000050447,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000340871,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000066329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000051971,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.749467,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00577767,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000965795,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000016673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00186251,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.9868,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.06211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007504,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.33036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00549593,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012976,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.146127,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}