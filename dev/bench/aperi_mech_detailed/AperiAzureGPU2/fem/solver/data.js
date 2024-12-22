window.BENCHMARK_DATA = {
  "lastUpdate": 1734833007963,
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
        "date": 1734833007487,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_fem_taylor_bar_cpu_np_1",
            "value": 0.000307364,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_fem_taylor_bar_cpu_np_1",
            "value": 0.00212134,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_fem_taylor_bar_cpu_np_1",
            "value": 187.658,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_fem_taylor_bar_cpu_np_1",
            "value": 1.03404,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_fem_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_fem_taylor_bar_cpu_np_1",
            "value": 0.000003107,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_fem_taylor_bar_cpu_np_1",
            "value": 0.000030497,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_fem_taylor_bar_cpu_np_4",
            "value": 0.000508093,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_fem_taylor_bar_cpu_np_4",
            "value": 0.00436054,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_fem_taylor_bar_cpu_np_4",
            "value": 40.413,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_fem_taylor_bar_cpu_np_4",
            "value": 0.463348,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_fem_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_fem_taylor_bar_cpu_np_4",
            "value": 1.38697,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_fem_taylor_bar_cpu_np_4",
            "value": 0.000100637,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_fem_taylor_bar_gpu_np_1",
            "value": 0.000195448,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_fem_taylor_bar_gpu_np_1",
            "value": 0.0129613,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_fem_taylor_bar_gpu_np_1",
            "value": 8.35835,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_fem_taylor_bar_gpu_np_1",
            "value": 0.0825711,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_fem_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_fem_taylor_bar_gpu_np_1",
            "value": 0.000003415,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_fem_taylor_bar_gpu_np_1",
            "value": 0.000018203,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}