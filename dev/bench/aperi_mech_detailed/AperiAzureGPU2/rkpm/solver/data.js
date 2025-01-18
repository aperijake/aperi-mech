window.BENCHMARK_DATA = {
  "lastUpdate": 1737242276756,
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
        "date": 1735681826331,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00011125,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00062222,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 62.8974,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.25287,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003378,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000018353,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000178142,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000755713,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 13.398,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.110939,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.234754,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000021572,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00005823,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00346639,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.68236,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0227048,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.54e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000005019,
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
        "date": 1736284594150,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000109227,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000629639,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 59.0156,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.249245,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000003163,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000011603,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000186927,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000913229,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 13.0408,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.117905,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.356524,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000018826,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00005309,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00329778,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.67813,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0218322,
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
            "value": 0.0000053,
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
        "date": 1736331760799,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000153337,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00098182,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 68.9535,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.268318,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 9.02e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000015476,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000228756,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000854065,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 14.4661,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.138225,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.258665,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000026289,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00005811,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00333633,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.68239,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0227173,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.04e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000005528,
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
        "date": 1736665605164,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000120171,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000755858,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 56.5692,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000001072,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000014852,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000246389,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00102785,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 12.8917,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.427318,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00002615,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000047683,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0032799,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.68067,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000001001,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00000682,
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
        "date": 1736701255442,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000128728,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000767438,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 56.6185,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.194236,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 8.01e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000013324,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000245024,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00078909,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 12.7717,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.108884,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.422711,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000026873,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000046401,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00335755,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.67994,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0208519,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.63e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000004853,
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
        "date": 1736871095378,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000126281,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.00105473,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 59.3175,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.210949,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 9.38e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000021612,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000258969,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00079965,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 13.3538,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.118529,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.309513,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000039031,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000059658,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00352043,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.67899,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0215906,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.73e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000007164,
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
        "date": 1736899349348,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000142623,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000922829,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 62.7651,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.202197,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 8.55e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000016093,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000262732,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000903587,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 13.5318,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.121041,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.265137,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000032054,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000070914,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00357287,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.67895,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0220984,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.33e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000006001,
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
        "date": 1737002262696,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000125617,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000783408,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 61.5395,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.198694,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 8.89e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000019073,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.00026294,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000800235,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 13.3158,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.116754,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.323999,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000025862,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000056894,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0034061,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.67856,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0214629,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 8.73e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000004809,
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
        "date": 1737242276033,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000147217,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000799982,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_1",
            "value": 66.1719,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_1",
            "value": 0.198554,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_1",
            "value": 8.37e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_1",
            "value": 0.000015538,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000234008,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000849868,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_cpu_np_4",
            "value": 15.243,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_cpu_np_4",
            "value": 0.119996,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_cpu_np_4",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_cpu_np_4",
            "value": 0.348653,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_cpu_np_4",
            "value": 0.000044597,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_UpdateFieldStates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000056788,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ApplyBoundaryConditions_rkpm_taylor_bar_gpu_np_1",
            "value": 0.00343863,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_ComputeForce_rkpm_taylor_bar_gpu_np_1",
            "value": 2.57431,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeIntegrationNodalUpdates_rkpm_taylor_bar_gpu_np_1",
            "value": 0.0213912,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateDisplacements_rkpm_taylor_bar_gpu_np_1",
            "value": 0,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_CommunicateForce_rkpm_taylor_bar_gpu_np_1",
            "value": 9.61e-7,
            "unit": "seconds"
          },
          {
            "name": "Explicit_Solver_TimeStepCompute_rkpm_taylor_bar_gpu_np_1",
            "value": 0.000005373,
            "unit": "seconds"
          }
        ]
      }
    ]
  }
}