window.BENCHMARK_DATA = {
  "lastUpdate": 1736284578401,
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
        "date": 1735681804309,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00600025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000994984,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000018716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000036782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.6511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 4.45575,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007204,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00106636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000134944,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009138,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.7402,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.509011,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0134161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000011332,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000050357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.05878,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.21035,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000081908,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000424198,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000148767,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000068502,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.8099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00417883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000941671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000022063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.0018554,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.0048,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.08172,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.33205,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.0049496,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000016563,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.14689,
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
        "date": 1736284577868,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00499512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000923967,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000017254,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000039528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.7455,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 4.28609,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009178,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00111091,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000123579,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000011502,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.54153,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.521336,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0103111,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000034025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00004201,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.56756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.19775,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000023615,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00032519,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000069913,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000024326,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.784328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00539882,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000838578,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000018946,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00175661,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.1018,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 6.84693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.31598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00470119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000015379,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.145206,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}