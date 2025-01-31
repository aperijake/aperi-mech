window.BENCHMARK_DATA = {
  "lastUpdate": 1738345346702,
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
      }
    ]
  }
}