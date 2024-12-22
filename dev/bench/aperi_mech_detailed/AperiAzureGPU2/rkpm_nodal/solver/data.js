window.BENCHMARK_DATA = {
  "lastUpdate": 1734833021466,
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
        "date": 1734833021008,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000403275,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00312181,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.2446,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.239129,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003332,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019672,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000500155,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00349603,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.82462,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0738846,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.04778,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000031905,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00017501,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0129869,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.79226,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0410399,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003789,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000014055,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}