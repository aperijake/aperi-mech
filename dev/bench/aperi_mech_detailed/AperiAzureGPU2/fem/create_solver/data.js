window.BENCHMARK_DATA = {
  "lastUpdate": 1749680030654,
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
        "date": 1736331740058,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00530663,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000965718,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000019056,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000039796,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 25.7568,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.40318,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007945,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00119601,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000157129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000011211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 4.17512,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.532136,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0112742,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000072607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000125316,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.52843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.46659,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000022051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000388511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000094066,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000053019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.832052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00511814,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000985255,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000036561,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.003344,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 26.4682,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.37798,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007515,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.36547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00480836,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000013135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.146567,
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
        "date": 1736665588694,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00547707,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000874871,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00001574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000037122,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.3411,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 4.93911,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00000501,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00107605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000124671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000012895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.53706,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.519327,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0153225,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000012163,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000028946,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.38561,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.38155,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000049295,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000383581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000117567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000052501,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.772874,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.004844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000844483,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000016081,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.0017552,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 23.8282,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 6.7027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007054,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.30701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00468941,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000017905,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.145093,
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
        "date": 1736701234188,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.0045912,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000899046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000017704,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000061068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.4242,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.02914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006994,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.0010522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000119701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000012044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.56175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.514525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0119861,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000024758,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000048414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.29285,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.3551,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000050387,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000341911,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000114852,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.00005156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.753626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00488263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.00087041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000019989,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00172995,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 6.78249,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000008136,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.317,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00471069,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000017414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.145387,
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
        "date": 1736871060981,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00470891,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000910171,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000016892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000040117,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.8434,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.0988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006953,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00114537,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000141009,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.00001551,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.67627,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.527691,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0168015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000026209,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000042631,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.97834,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.39785,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000020939,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000328749,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000064712,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000018314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.843581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00573448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.00094536,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000021332,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00177129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.6314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 6.9495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 2.03726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.0397194,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000017103,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.17813,
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
        "date": 1736899332094,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00522448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.269308,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00002111,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000047722,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.6069,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.98595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007815,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00114524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000139658,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000012214,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.7813,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.520364,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000096885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000101734,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000061276,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.33523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.623,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000083118,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000490914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000161126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000085452,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.778212,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00524755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000892009,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000016933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00185052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.5043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.88422,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.32709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.0063629,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000017523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.210342,
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
        "date": 1737002246386,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00597827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.265995,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000022904,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000047492,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.2733,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.9464,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007634,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00110753,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000130613,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008747,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.71844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.513229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.00009288,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000046771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000081187,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.52354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.54127,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000092499,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000421458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000181151,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.00009255,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.764485,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00580402,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.00510383,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.00002062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00178729,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.1248,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.65098,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00000552,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.31471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.0048247,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000015701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.199228,
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
        "date": 1737242251901,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00626186,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.267605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00002053,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000048143,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.4726,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.92955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00114772,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000147356,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009278,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.71318,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.511709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000131034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000096958,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000141714,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.39006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.59975,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000022994,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000492044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000199296,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000090135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.776409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00491717,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.00159305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000017043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00177,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.7508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.57034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007675,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.31241,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00483582,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.00001534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.200497,
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
        "date": 1737292154141,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00521478,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.282044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000021541,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000047692,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.7661,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 6.00846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000005381,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00113678,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000136505,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000011011,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.7769,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.812162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000128169,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000088822,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000150041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.34233,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.60177,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009308,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.0003869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000136274,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000065937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.802571,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00418993,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.213477,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000065918,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00183187,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.2443,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.72133,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007745,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.32876,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00485867,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011953,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.199658,
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
        "date": 1737866670605,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.0054697,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00694702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00002103,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000038483,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.2096,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.76379,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007804,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00111845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000127961,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.58254,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.527825,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000132635,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000085685,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000164487,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.06227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.63063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000049555,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000388527,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000149197,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000052912,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.801165,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00561247,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.280761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000021511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00182125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.2543,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.71906,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007144,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.32253,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00486826,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000013626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.200201,
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
        "date": 1738345346110,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00604822,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00166398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000023095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000038554,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.6001,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 6.06633,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006953,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00110872,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000131444,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000011041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.75458,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.496577,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000060177,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000014548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000037713,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 7.19922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.56072,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00008259,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00033032,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000104683,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000042182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.767769,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00483138,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.187419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000022955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00180942,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.3645,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.77762,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007675,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.34067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00496206,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000017705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.204359,
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
        "date": 1738384407905,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00560634,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00168753,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000019748,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00003651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.7524,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.55214,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00112108,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000121134,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000012454,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.51121,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.522698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000135693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000070266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000112107,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.49127,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.57114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000080516,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000433639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000178125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000033665,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.784036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00594023,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.271273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000019588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00230398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.9837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.60424,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.3147,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.0048387,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000019177,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.201773,
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
        "date": 1739060076822,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00580288,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00154973,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000016621,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000036689,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.8783,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.74766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000022292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00111354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000131136,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008787,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.62696,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.494972,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000061129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.0000104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000035008,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.19045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.49785,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000010641,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000337665,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000063673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000008166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.791384,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00454226,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.264196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000024576,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00226592,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.9226,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.74134,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000024196,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.31721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00486117,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000019336,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.205634,
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
        "date": 1739074351961,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00571693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00575665,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000023645,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000040266,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.3062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.70195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006122,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00107533,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000123144,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.51307,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.472698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.00007466,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000016922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000031279,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.15249,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.49581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000011272,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000330683,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00007395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000008476,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.7747,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00479411,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.260759,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000019407,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00179988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.7047,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.65487,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009347,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.31251,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00471354,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.00001558,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.202806,
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
        "date": 1739554276488,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00488112,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.271467,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000023465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000045709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.9703,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 6.21209,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00001016,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00114532,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000144831,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.85503,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.481012,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000059064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000018917,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000027634,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.36595,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.5233,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009679,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000346651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000076658,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000008717,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.798786,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00625453,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.0017582,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000022323,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.0019648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.7312,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 8.02036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00002071,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.34922,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00512703,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012364,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.204549,
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
        "date": 1739852670788,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00606175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.243137,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00002099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00004644,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.2869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.66739,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009819,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00105836,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000133316,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009679,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.63188,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.474866,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000078843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000010681,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00003626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.19538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.48209,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000010611,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000336924,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000064365,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009208,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.79318,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00569581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.265348,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000025399,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00185461,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.9357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.72218,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.0000051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.32543,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00481305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011813,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.201778,
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
        "date": 1740174020736,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00549671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.8517,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000022454,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000042421,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.5016,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.78844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009588,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00112028,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000130972,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.78319,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.498582,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000062782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000024408,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000030599,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.35912,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.50717,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000022844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000352039,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000075054,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009488,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.775194,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00522808,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.280597,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000028305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00212256,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.7343,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.91914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000008055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.33024,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00574392,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012658,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.204817,
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
        "date": 1740201196905,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00541089,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.271974,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000026141,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000045128,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.8032,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 6.03809,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009258,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00113629,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000142419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000017043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.93671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.499013,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000063393,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000011482,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000031712,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.35095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.52438,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000010229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000363614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000076789,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000017153,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.788608,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00543039,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.270773,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.00002091,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00204617,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.5732,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.99292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009629,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.33041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00558623,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000013576,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.205006,
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
        "date": 1740273298532,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00560797,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.301608,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000014127,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000037613,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.5955,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 5.63069,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007324,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00114964,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000133469,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009298,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 3.74923,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.498566,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000054296,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.00001046,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000044025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.30622,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 1.43965,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00001017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000352322,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000058183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000008827,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 0.813566,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00598119,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.267114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000025139,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00210837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.4812,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 7.58295,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00001007,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.34054,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00500633,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 0.200589,
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
        "date": 1740427798747,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00524846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.501199,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000021211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000044086,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.0687,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000945842,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000083251,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.0657,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.474409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000052803,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000010441,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000040118,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.17939,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000006392,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000446626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00006731,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000022233,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.18268,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00495716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.258084,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000020219,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00241691,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.2471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000008457,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.15404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00524803,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.74449,
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
        "date": 1740489896848,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00536785,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00530287,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000018947,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000039006,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.3002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000023896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00104061,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000091818,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008406,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.13362,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.488996,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000060879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000010531,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000043284,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.31411,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000008457,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000541692,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000073964,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000012174,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.23274,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00474652,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.254833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000024077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00251024,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.0259,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007735,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.16036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00533183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012394,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.76579,
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
        "date": 1740540054629,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00548267,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.599118,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000021041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00004624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.3993,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00000987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00104109,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000099112,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.0000157,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.35651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.480605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000064976,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000021892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000041821,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.28495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000017364,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.0004694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000083201,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009749,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.25158,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00542624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.0013465,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.00002048,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00195492,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.7485,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007835,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.15832,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00567871,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000018977,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.80209,
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
        "date": 1740631847860,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00539694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00282132,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000019468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000041961,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.8971,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00001036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00104937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000107859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008747,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.8645,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.482175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0000614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000011472,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000042933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.3704,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000006002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000473848,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00007243,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.00002077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.25386,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00518123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.268079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000028345,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00198301,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.7261,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00001028,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.16042,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00548573,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 8.0622,
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
        "date": 1740632245556,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00539694,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00282132,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000019468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000041961,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.8971,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00001036,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00104937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000107859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008747,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.8645,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.482175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.0000614,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000011472,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000042933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.3704,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000006002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000473848,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00007243,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.00002077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.25386,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00518123,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.268079,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000028345,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00198301,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.7261,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00001028,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.16042,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00548573,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 8.0622,
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
        "date": 1740685791756,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00544599,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.253442,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000026451,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000045909,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.786,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00001033,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00107778,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000106035,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000013616,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.77909,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.503744,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000063773,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000010671,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000031401,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.42782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000016562,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00053856,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000073221,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009919,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.24705,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.0059125,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.00070972,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.00002064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00193216,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 26.3498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.16271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00544609,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012645,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.95207,
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
        "date": 1740706865238,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00613869,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00540697,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000022364,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000045778,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.3913,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009118,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00103303,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000099908,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.14488,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.491863,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000059545,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000015369,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000035047,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.27376,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000005811,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000511413,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000068272,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009649,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.22492,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00499624,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.259167,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.00002567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.0025371,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.148,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009228,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.15933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00520435,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000019307,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.79096,
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
        "date": 1740880438660,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.0058448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.0401732,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000021052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000043876,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.1043,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009909,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000976404,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000097038,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009167,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.09549,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.490386,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000055017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000024217,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000056339,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.25498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000013255,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.0005207,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000079374,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000012515,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.15185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00573599,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.254702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000028365,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00194576,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.9952,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000004849,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.15818,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00531344,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012024,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.80234,
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
        "date": 1740927896663,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00513993,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00493376,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000021251,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000049386,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.277,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009519,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000976428,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000094794,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008587,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.16463,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.474935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000064044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000018455,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00003584,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.20508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00001014,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000457284,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000073122,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000019448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.2222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00507014,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.256098,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000023055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00192308,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.0215,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009959,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.17177,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00527511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011792,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.73822,
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
        "date": 1740970649649,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00408515,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.247405,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.00003678,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000051338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.1519,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007855,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000994866,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000096696,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000013456,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.47941,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.494848,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.000061698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000011602,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000046269,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.19872,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000008927,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000507052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000086195,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000008837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.22015,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00486294,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.00538656,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000020419,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00184773,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.8888,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009879,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.16397,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00529885,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000013186,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.71191,
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
        "date": 1742279188072,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00408453,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000047242,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000013816,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000043364,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.8475,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000008166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000988321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000084864,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009238,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.21094,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.503771,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.253833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000023034,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000043695,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.31797,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009969,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000561615,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000086106,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000011182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.27688,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00451845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000064234,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000018496,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00184144,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.8991,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.1305,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00514654,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.60376,
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
        "date": 1742607246419,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00532762,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000046962,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000018606,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.0000462,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.2397,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009809,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00102338,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00008257,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.55206,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.498701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.260723,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000022083,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000040489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.3541,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009979,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000546434,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000084936,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000010511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.36983,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00507487,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000051509,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000012975,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00188843,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.2232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.15099,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00523787,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000018806,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 8.02875,
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
        "date": 1742662157649,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00554497,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000070315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000018846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000048574,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 25.8965,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006082,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00105484,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000091968,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008617,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 10.7226,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.518756,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.264538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000022393,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000050057,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.65495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009198,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000515506,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.0000776,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009258,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.62713,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00528014,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000053533,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000014077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00215892,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 26.8042,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000008086,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.15286,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00522358,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012133,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 8.63015,
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
        "date": 1743057831280,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00510166,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000065557,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000011914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000040605,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.6782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00000944,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000989021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000091277,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.46221,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.473052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.253222,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000021211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00003608,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.16654,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000008697,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000462031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00006598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000010411,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.30859,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00505104,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000054045,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000013567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00182702,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.2041,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009499,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.14809,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00514049,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000019719,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 8.01929,
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
        "date": 1743979701706,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00503632,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000046039,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000012634,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000042292,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.5299,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007555,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00100155,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000093191,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009207,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.34618,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.49525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.255126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000021241,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000045538,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.226,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000533321,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00009315,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000022083,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.30969,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00492791,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000067901,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000013907,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00185244,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.8967,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009368,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.14636,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00511797,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011833,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.94449,
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
        "date": 1744083766038,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00563448,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000068693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000012564,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000042102,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.2721,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000011832,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000949729,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000095245,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008706,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 9.1781,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.49249,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.252844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.00002097,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000041731,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.17764,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000005411,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000530828,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000080095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000012274,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 2.28423,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00548356,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000052191,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000014047,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00179521,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.6441,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009729,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.12903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00497181,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012113,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 7.73303,
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
        "date": 1744689278588,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00580993,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000054185,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000013646,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000059135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.6782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000009288,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00102567,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000091447,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000014007,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.2249,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.497547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.252838,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000017755,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000049306,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.35656,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009218,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000467637,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000084233,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000019187,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.68844,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00585137,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000070808,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000018676,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00187156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.7407,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007995,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.12725,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00511597,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000011913,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.5402,
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
        "date": 1745640035465,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00497581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000050857,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000012944,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000039846,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.2072,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006773,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000992498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000084002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008417,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.0175,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.490027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.257314,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.00002069,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00003651,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.2395,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000009548,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00053013,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000086126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000011391,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.60418,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00495063,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000061709,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000018926,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00185807,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.8713,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007495,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.13794,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00512443,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000016471,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.392,
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
        "date": 1746231475161,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00501962,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000044626,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000018135,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000044807,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.7451,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007154,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00100088,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000087489,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008807,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.2647,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.497525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.255778,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000021542,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000035629,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.38438,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00000544,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000545914,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000075055,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000011031,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.6766,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00499693,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000073232,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000019127,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00202019,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.1966,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009298,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.13674,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.0051352,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000012775,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.4174,
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
        "date": 1748663893581,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00540853,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000051569,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000019979,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000047101,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.3357,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000011933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00104553,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000087399,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000014468,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.5737,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.500358,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.264296,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000020089,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000039607,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.40133,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00001074,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000581768,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000085105,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000011271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.7256,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00452418,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000055988,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000015741,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00200824,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.8382,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000009899,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.13192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00534522,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000017204,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.6953,
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
        "date": 1748722159846,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00618412,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.00007403,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000014628,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000058822,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.8088,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000024837,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00104701,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000084349,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008986,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 15.2121,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.498698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.259528,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000015199,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000056056,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.41954,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.00000558,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00046974,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000093206,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009527,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.68589,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00610805,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000064393,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000019497,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00373679,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 26.2206,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000007926,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.12842,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00539398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000019427,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 14.1856,
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
        "date": 1748989302561,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00511813,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000054032,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000013696,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000073349,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 23.9915,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000007835,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.0010112,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000091834,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008817,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.021,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.494062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.255525,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000018716,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000038924,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.2023,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000005921,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000550579,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000082678,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000009508,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.55526,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00411229,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000052804,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000014068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00120964,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.0639,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000010761,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.28391,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00416389,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000019007,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.2285,
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
        "date": 1749069801414,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00451845,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000070156,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000018727,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000039707,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.7121,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006002,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00103366,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000088381,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009409,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.539,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.492425,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.259182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000021882,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000044467,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.327,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000005932,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000517126,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000089975,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.00001051,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.60611,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00524025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.00006337,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000022062,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00125976,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.4182,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000012764,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.29438,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00417943,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.00002068,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.5525,
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
        "date": 1749164496257,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00485547,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000052181,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000013697,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000045498,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.1216,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000005401,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00100688,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000089273,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009608,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.3296,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.495391,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.251234,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000021782,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000040087,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.21408,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000011402,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000535423,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000095604,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.00001561,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.58398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00491287,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000070707,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000017213,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00118573,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.7037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000013957,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.28769,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00394211,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000018987,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.2758,
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
        "date": 1749512737271,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00624227,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000048183,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000018646,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000046179,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 25.1698,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000011121,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00108095,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000092599,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008697,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.8415,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.480376,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.260342,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.00002067,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000035799,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.3089,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000006052,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000462625,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000075225,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000008907,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.64136,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00525637,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000056149,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.00004129,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00124591,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.6047,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000012895,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.29398,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00404017,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000021792,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.517,
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
        "date": 1749523956595,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00510025,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000053132,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000020971,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000042262,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.8023,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00001044,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00105937,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000094533,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009077,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.8673,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.478615,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.265934,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000021972,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000039426,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.2706,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000011162,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00046589,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000068192,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000018165,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.67958,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00541777,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000053122,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000017263,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00132631,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.4327,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000014648,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.30581,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00425509,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000014027,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.5646,
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
        "date": 1749594902263,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.0050982,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000067476,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000017883,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000053791,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.3306,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.00000534,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00100365,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000083981,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000008807,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.3908,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.494667,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.258264,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000022835,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000042421,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.29768,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000010932,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000506161,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000098537,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.000010191,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.6764,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00514935,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000053511,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000025598,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.0011998,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 25.1414,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000011903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.28523,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00394265,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000020819,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.5469,
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
        "date": 1749680029739,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_1",
            "value": 0.00586271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_1",
            "value": 0.000068271,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_1",
            "value": 0.000017704,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000036329,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_1",
            "value": 24.1285,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_1",
            "value": 0.000006072,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00103114,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.000083381,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_1",
            "value": 0.000009899,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_1",
            "value": 14.2218,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_cpu_np_4",
            "value": 0.50328,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_cpu_np_4",
            "value": 0.252074,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_cpu_np_4",
            "value": 0.000023145,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000041491,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_cpu_np_4",
            "value": 6.28507,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_cpu_np_4",
            "value": 0.000006011,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000516903,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.000080064,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_cpu_np_4",
            "value": 0.00001037,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_cpu_np_4",
            "value": 3.66896,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_ReadInputMesh_fem_taylor_bar_gpu_np_1",
            "value": 0.00516933,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateFieldResultsFile_fem_taylor_bar_gpu_np_1",
            "value": 0.000072353,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateTimeStepper_fem_taylor_bar_gpu_np_1",
            "value": 0.000020812,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateInternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.00118285,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddFieldsToMesh_fem_taylor_bar_gpu_np_1",
            "value": 24.6745,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_LabelMesh_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateExternalForceContribution_fem_taylor_bar_gpu_np_1",
            "value": 0.000012715,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_AddInitialConditions_fem_taylor_bar_gpu_np_1",
            "value": 1.27893,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.00413433,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_CreateOutputScheduler_fem_taylor_bar_gpu_np_1",
            "value": 0.000014388,
            "unit": "seconds"
          },
          {
            "name": "Application_Setup_Preprocessing_fem_taylor_bar_gpu_np_1",
            "value": 13.3066,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}