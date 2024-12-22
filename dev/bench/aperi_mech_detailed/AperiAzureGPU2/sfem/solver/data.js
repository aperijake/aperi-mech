window.BENCHMARK_DATA = {
  "lastUpdate": 1734833012553,
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
        "date": 1734833012084,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_sfem_taylor_bar_cpu_np_1",
            "value": 0.000406871,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_sfem_taylor_bar_cpu_np_1",
            "value": 0.00239966,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_sfem_taylor_bar_cpu_np_1",
            "value": 181.37,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_sfem_taylor_bar_cpu_np_1",
            "value": 1.03381,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_sfem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_sfem_taylor_bar_cpu_np_1",
            "value": 0.000003075,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_sfem_taylor_bar_cpu_np_1",
            "value": 0.000035656,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_sfem_taylor_bar_cpu_np_4",
            "value": 0.000724163,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_sfem_taylor_bar_cpu_np_4",
            "value": 0.00319136,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_sfem_taylor_bar_cpu_np_4",
            "value": 35.9008,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_sfem_taylor_bar_cpu_np_4",
            "value": 0.443188,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_sfem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_sfem_taylor_bar_cpu_np_4",
            "value": 2.22831,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_sfem_taylor_bar_cpu_np_4",
            "value": 0.000100922,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_sfem_taylor_bar_gpu_np_1",
            "value": 0.000228162,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_sfem_taylor_bar_gpu_np_1",
            "value": 0.0129081,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_sfem_taylor_bar_gpu_np_1",
            "value": 6.76343,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_sfem_taylor_bar_gpu_np_1",
            "value": 0.0828894,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_sfem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_sfem_taylor_bar_gpu_np_1",
            "value": 0.00000358,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_sfem_taylor_bar_gpu_np_1",
            "value": 0.000014995,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}