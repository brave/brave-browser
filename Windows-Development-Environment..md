You should follow the steps from Chromium's [Checking out and Building Chromium for Windows guide](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md) stopping before the `Get the code` step

Before you begin, make sure your system satisfies the [system requirements](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#system-requirements).

## Antivirus

[Exclusions should be added](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26) for working directories in any active antivirus software ([Defender Antivirus](https://en.wikipedia.org/wiki/Microsoft_Defender_Antivirus) is enabled by default).

## Visual Studio

Install [Visual Studio Community 2022](https://visualstudio.microsoft.com/downloads/).
Follow guidance from the ["Visual Studio" section](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) of the Chromium Windows build instructions.

## Windows 11 SDK
You can get the Windows SDK in two ways: 

By selecting “Windows 11 SDK (10.0.26100.0)” in the optional components of the Visual Studio 2022 Installer(see above).

Or [Install it from this page by selecting the download link](https://developer.microsoft.com/en-us/windows/downloads/windows-sdk/)

## Git
If you need to clone `brave-core` or another repo on Windows, you can install Git from https://git-scm.com/downloads. Do not use the version included in `depot_tools`, since it's incompatible with the `brave` patching system.

After you have Git on your machine, please configure it according to the ["Get the Code" section](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#get-the-code) of the Chromium Windows build instructions, specifically all of the `git config --global` commands.

Git is included in `depot_tools`. At the moment, there are known issues calling out to Git if your system has the version from `depot_tools` PATH'ed.

## Node

Install the Node.js active LTS (v20+) from https://nodejs.org/.

## Python

If you don't already have a system version of Python, you can get version 3 from https://www.python.org/downloads/windows/.
When doing the build, the version from `depot_tools` is used. Some legacy scripts are using Python 2.7.

Python is included in `depot_tools`. At the moment, there are known issues calling out to Python if your system has the version from `depot_tools` PATH'ed.

## Done!

Now you are ready to follow the next step of the build instructions in the [[wiki|Home]].

## Build Acceleration

Internal developers can find more information on remote build execution [here](https://github.com/brave/devops/wiki/Remote-Build-Execution)

## Build Configuration

Please refer to [this document](https://github.com/brave/brave-browser/wiki/Build-configuration) for information about setting up `.env` build configuration.

# Running Brave

It's always best to run Brave from a standard `cmd.exe` shell or via Windows Explorer. There are instances where debug builds of Brave attempt to log to stderr, which will fail and potentially result in unexpected crashes in non-standard shells (e.g., Cygwin, Git for Windows, etc.)

# Troubleshooting

The upstream documentation for [Checking out and Building Chromium on Windows](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md) have a lot of useful information on configuring Windows, resolving common problems, speeding up builds, etc.

## Clone the Brave repository to `C:\`

We recommend cloning the `brave-browser` Git repository to the top level of your `C:\` drive because:

- Some developers have encountered problems with paths exceeding 256 chars when the repository is cloned to a subdirectory.
- Some developers have encountered problems with paths that contain spaces (e.g. the path to your home directory, if your username contains spaces) and some of Chromium's build tools.

## Why is my build slow?

https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#why-is-my-build-slow
