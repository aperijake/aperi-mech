window.BENCHMARK_DATA = {
  "lastUpdate": 1742279220494,
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
        "date": 1736871108411,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000404519,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00308768,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.4593,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.165855,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003095,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000028172,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000664692,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00409843,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.99417,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0642703,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.09433,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000031216,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000182457,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0130658,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51268,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0421287,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003842,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013404,
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
        "date": 1736899355529,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000458762,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00296569,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.3523,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.162468,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003446,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000027774,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000688385,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00482682,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 4.20267,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0654396,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.14218,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000049033,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00026559,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0138314,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51542,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0434458,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003356,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019699,
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
        "date": 1737002268720,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000504176,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00297985,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 15.6287,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.160905,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003239,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022004,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000785063,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00370769,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 3.95703,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0616355,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.09672,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000052207,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000181102,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0125184,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.51495,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0415852,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003232,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000014742,
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
        "date": 1737242285498,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000462948,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00305451,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 25.6988,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.167241,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003177,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000037844,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000592931,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00379105,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.28892,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0647656,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.1597,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000048028,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00018301,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0126959,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.69775,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0416044,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00000394,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017597,
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
        "date": 1737292184132,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000437688,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00312162,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 25.7572,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.169,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003055,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000036995,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00067828,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00383812,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.06442,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0604103,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.872265,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000037657,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000218828,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0131071,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.69959,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0422017,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003928,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017467,
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
        "date": 1737866699081,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000492851,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00321548,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 26.4749,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.16853,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003031,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023233,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000740823,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00478154,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.82817,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0630388,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.07604,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000025703,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000196446,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0128484,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.69764,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0414936,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003554,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000015599,
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
        "date": 1738345370311,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000538576,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00316979,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.0637,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.171743,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003099,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020458,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00270524,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00723702,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.15187,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.104055,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.19001,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0012263,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000411206,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0163503,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.71009,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0511702,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003468,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00002915,
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
        "date": 1738384430729,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000436246,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00303403,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 28.1145,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.166255,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003082,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000020809,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00063496,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00414623,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.45741,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0623725,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.08378,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000033902,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000208624,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0125381,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.96016,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0410576,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003409,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016382,
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
        "date": 1739060097092,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00043838,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00300432,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 26.7077,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.167292,
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
            "value": 0.000029952,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000507964,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00347431,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.73765,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0577494,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.71596,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000031639,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000209214,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0127165,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.13232,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0418225,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003155,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016595,
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
        "date": 1739074387463,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000410713,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00295521,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 26.7126,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.165813,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003095,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000025216,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000503967,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00333906,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.78529,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0575299,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.755599,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000017602,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000197253,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0126685,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.848562,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0417146,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003371,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000014836,
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
        "date": 1739554308951,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000425914,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00314374,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 26.8806,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.169051,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003058,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000023936,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.42879,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000476302,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00368745,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.79075,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0579097,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.746599,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000031532,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.5974,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000184868,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0131777,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.853927,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0432795,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003076,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000017427,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.58644,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1739852691489,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000421835,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00302161,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 26.6713,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.166355,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003082,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000037552,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.30686,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00055314,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00339401,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.79144,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0574026,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.723133,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000028517,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.2036,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000186375,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0129673,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.852614,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.042573,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003899,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016054,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.60402,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740174051220,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00038874,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0032475,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 25.0757,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.166101,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003173,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000025891,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.22773,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000619305,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00372561,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.10711,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0611629,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 1.05111,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000082128,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 19.7064,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
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
        "date": 1740201217170,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000405236,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00326576,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 25.3984,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.17202,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003087,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000031083,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.45413,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000653395,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00392416,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.1075,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0616882,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 2.21254,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00002081,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.5593,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000214471,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.013318,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.848475,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.043615,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003815,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000013147,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.33546,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740273327523,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000382153,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00323092,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.1088,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.166874,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003242,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000029134,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.08945,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000509125,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00401201,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.4048,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0612967,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.801489,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000024664,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.6689,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000191381,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0128635,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.846124,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0423556,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003721,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019203,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.19713,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740427832559,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000396677,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00320165,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 23.7834,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.159609,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00000316,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000019858,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.92075,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000551869,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00360373,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.29944,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0559651,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.712541,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000028931,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.109,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000185076,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0123816,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.906649,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0421712,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000004183,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000014385,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.05081,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740489924082,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000424223,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00313399,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.2939,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.16346,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003675,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000045246,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.09124,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000557072,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0038066,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.01929,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0574493,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.768637,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000044033,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.477,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000177001,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0122865,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.28567,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0419748,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00000347,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016962,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.22101,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740540083577,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000407308,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00318894,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.5697,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.163656,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003094,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000022916,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.98664,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000536252,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00367076,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.99289,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0574955,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.746184,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00002681,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.25,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.00019851,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0124098,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.28956,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.042157,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003127,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000019222,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.06681,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740631871274,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000405202,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00330828,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.6529,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.16614,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003398,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00003556,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.14235,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000478698,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00381788,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.96465,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0549594,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.781172,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000021634,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.5231,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000184218,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0121549,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.28541,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0415013,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003831,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016482,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.13709,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740632266360,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000405202,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00330828,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.6529,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.16614,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003398,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00003556,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.14235,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000478698,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00381788,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.96465,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0549594,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.781172,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000021634,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.5231,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000184218,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0121549,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.28541,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0415013,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003831,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016482,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.13709,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740685817033,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000483558,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00325156,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.4419,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.165095,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003308,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000026057,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.15079,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0005481,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00403514,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.14567,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0612136,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.789973,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000027197,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.9147,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000182495,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.012598,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.2876,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0424711,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003467,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000018319,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.18228,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740706886950,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000415741,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00315027,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.5429,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.166322,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003103,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000033247,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.02227,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000498533,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00397935,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.05491,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0610655,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.778536,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000041518,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.6039,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000190227,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0122956,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.2872,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0420088,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003801,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016947,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.10493,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740880459896,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000450177,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00307054,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.3626,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.164919,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003091,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000044501,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.9737,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000576845,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00401804,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.0749,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0610117,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.79246,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000042812,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.255,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000190711,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0122413,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.28943,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0415299,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003899,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016457,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.14527,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740927920866,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000441091,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.0032395,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.8711,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.16468,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003085,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000015981,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 6.95477,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000517575,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00357889,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.10615,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0560526,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.750591,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000026105,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.2931,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000175511,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0121624,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.28745,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0413907,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003547,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000015174,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.03607,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1740970679733,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000423131,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00319594,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 27.7347,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.16364,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003298,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000014203,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.0031,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000570426,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00395701,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 7.43345,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.059658,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.739796,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00002851,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 21.8012,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000219278,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0122365,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 1.28928,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0415863,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003716,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000014781,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 6.10898,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
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
        "date": 1742279219564,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000399155,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.00281235,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 24.8447,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.165365,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000003459,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0.000037074,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 7.10056,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.000586096,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0042076,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 6.56051,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.0618229,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.757581,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0.00003353,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 18.2835,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000191758,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.0113972,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.633558,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.690194,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000003223,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0.000016432,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_WriteOutput_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 5.98408,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateShapeFunctions_rkpm_nodal_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}