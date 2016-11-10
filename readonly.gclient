solutions = [
  {
    "managed": False,
    "name": "src",
    "url": "https://chromium.googlesource.com/chromium/src.git",
    "custom_deps" : {
      "src/third_party/WebKit/LayoutTests": None,
      "src/chrome_frame/tools/test/reference_build/chrome": None,
      "src/chrome_frame/tools/test/reference_build/chrome_win": None,
      "src/chrome/tools/test/reference_build/chrome": None,
      "src/chrome/tools/test/reference_build/chrome_linux": None,
      "src/chrome/tools/test/reference_build/chrome_mac": None,
      "src/chrome/tools/test/reference_build/chrome_win": None,
    },
    "deps_file": ".DEPS.git",
    "safesync_url": "",
  },
  {
    "managed": False,
    "name": "src/libchromiumcontent",
    "url": "https://github.com/brave/libchromiumcontent.git",
    "custom_deps": {},
    "safesync_url": ""
  },
  {
    "managed": False,
    "name": "src/electron",
    "url": "https://github.com/brave/electron.git",
    "safesync_url": ""
  }
]

