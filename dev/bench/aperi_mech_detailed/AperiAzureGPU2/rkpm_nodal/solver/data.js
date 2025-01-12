window.BENCHMARK_DATA = {
  "lastUpdate": 1736701264464,
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
        "date": 1736331771785,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000569987,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00343285,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 16.0139,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.244017,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003125,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000040058,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000646635,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0042335,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 4.34027,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0862588,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.852045,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000037261,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000176922,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0127013,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51556,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0422814,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003126,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017863,
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
        "date": 1736665610984,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00039851,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00300678,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.2807,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003104,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00002874,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000599027,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00375938,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.90262,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.971148,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000031804,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000153586,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0124441,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51366,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003788,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013246,
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
        "date": 1736701263587,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0004172,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00293173,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.418,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.159518,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000335,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020333,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000526557,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00393783,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.88555,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0596976,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.07087,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000034087,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000157318,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0124103,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51352,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.04073,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003729,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000014371,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}