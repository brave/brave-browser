
# Linux Development Environment

## System Requirements

Ensure your system satisfies the [system requirements](https://chromium.googlesource.com/chromium/src/+/main/docs/linux_build_instructions.md#System-requirements).

## Install Additional Build Dependencies

You will need Git, Python 3 and Node.js active LTS (v20+). You may need to make python3 the default if Python 2.7 is default for your OS. Also, if you don't have anything named python on your machine and only have `python3`, you will need something like `python-is-python3`

Alternatively, you can use Yarn. Follow the [Yarn install docs](https://yarnpkg.com/getting-started/install) to install Yarn and a compatible version of Node.js. After installing Yarn, run `yarn import` to create a `yarn.lock` file from `package-lock.json`.

## Additonal installs for different Linux distributions: 

### For Ubuntu Users

```bash
apt-get install build-essential python-setuptools python3-distutils
```

### For Fedora Users

```bash
dnf install @development-tools python3-devel
```

### For Arch Linux Users

```bash
pacman -S base-devel python
```

### For Red Hat Users
```bash
yum groupinstall 'Development Tools' && yum install python3-devel
```

### For openSUSE Users

```bash
zypper install -t pattern devel_basis
zypper install python3-devel
```

### General Instructions

After cloning and initializing the repo, run the following script to finish installing build dependencies:

```bash
# cd to brave-browser repo root
./src/build/install-build-deps.sh # for Linux
```

For unsupported distributions:

```bash
./src/build/install-build-deps.sh --unsupported
```

## Troubleshooting

Check out the upstream [Checking out and building Chromium on Linux](https://chromium.googlesource.com/chromium/src/+/main/docs/linux_build_instructions.md#Checking-out-and-building-Chromium-on-Linux) docs before filing an issue.
