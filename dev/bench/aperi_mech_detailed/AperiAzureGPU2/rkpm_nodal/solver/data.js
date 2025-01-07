window.BENCHMARK_DATA = {
  "lastUpdate": 1736284601526,
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
        "date": 1735328602952,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000389326,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00345852,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.6171,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.24464,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012819,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023686,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000494255,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00372565,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.9058,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0768817,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.0927,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000042238,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000478537,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0181647,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.79483,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0526231,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003779,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000034273,
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
        "date": 1735681834260,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000399512,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00344445,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.4573,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.241243,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000005208,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000030872,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000513413,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00384497,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.88115,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0734406,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.30071,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000031735,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00017091,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0128155,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51307,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0408571,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003195,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0000175,
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
        "date": 1736284601016,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000414605,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00307095,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.3511,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.234604,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000012364,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00003906,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000505967,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00380669,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.97487,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0753056,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.00856,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000030104,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000172545,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0125623,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51631,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.040397,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003536,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00001341,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}