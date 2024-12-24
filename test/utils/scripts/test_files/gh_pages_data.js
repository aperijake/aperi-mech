window.BENCHMARK_DATA = {
  lastUpdate: 1734833006395,
  repoUrl: "https://github.com/aperijake/aperi-mech",
  entries: {
    Benchmark: [
      {
        commit: {
          author: {
            name: "Jake Koester",
            username: "aperijake",
            email: "jake.koester@apericmc.com",
          },
          committer: {
            name: "Jake Koester",
            username: "aperijake",
            email: "jake.koester@apericmc.com",
          },
          id: "b70c81241361a8186d92f3f809989f585ed139ea",
          message: "fix another performance pipeline issue [skip ci]",
          timestamp: "2024-12-22T01:13:34Z",
          url: "https://github.com/aperijake/aperi-mech/commit/b70c81241361a8186d92f3f809989f585ed139ea",
        },
        date: 1734833005933,
        tool: "customSmallerIsBetter",
        benches: [
          {
            name: "Element_CreateElementForceProcessor_fem_taylor_bar_cpu_np_1",
            value: 0.000363754,
            unit: "seconds",
          },
          {
            name: "Element_Other_fem_taylor_bar_cpu_np_1",
            value: 0.362439,
            unit: "seconds",
          },
          {
            name: "Element_CreateElementForceProcessor_fem_taylor_bar_cpu_np_4",
            value: 0.000110585,
            unit: "seconds",
          },
          {
            name: "Element_Other_fem_taylor_bar_cpu_np_4",
            value: 0.0570865,
            unit: "seconds",
          },
          {
            name: "Element_CreateElementForceProcessor_fem_taylor_bar_gpu_np_1",
            value: 0.0107764,
            unit: "seconds",
          },
          {
            name: "Element_Other_fem_taylor_bar_gpu_np_1",
            value: 0.0277912,
            unit: "seconds",
          },
        ],
      },
    ],
  },
};
