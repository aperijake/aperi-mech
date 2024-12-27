window.BENCHMARK_DATA = {
  "lastUpdate": 1735328593653,
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
        "date": 1734833016557,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000121652,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000623861,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 62.239,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.256664,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 8.04e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000008686,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000173083,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000723025,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 13.6099,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.112603,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.228426,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000025751,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000053311,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00347345,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.63649,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0226821,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.11e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0000048,
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
        "date": 1735328592704,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00011301,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000619122,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 61.4,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.256394,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003749,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016585,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000182897,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00103147,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 13.0918,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.124609,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.22029,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000025344,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000056118,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00357687,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.63762,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0229565,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.52e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000004889,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}