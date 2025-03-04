solutions = [
  {
    "managed": False,
    "name": "src",
    "url": "https://github.com/brave/chromium",
    "custom_deps": {
      "src/testing/libfuzzer/fuzzers/wasm_corpus": None,
      "src/third_party/chromium-variations": None
    },
    "custom_vars": {
      "checkout_pgo_profiles": False,
    }
  },
  {
    "managed": False,
    "name": "src/brave",
    "url": "https://github.com/yuthstyle88/brave-core.git"
  }
]
