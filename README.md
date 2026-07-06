# Brave Browser

This repository is not needed for building the browser and only holds issues, releases and the wiki. The source code and contributions are at https://github.com/brave/brave-core.

## Resources

- [Documentation and guides](https://github.com/brave/brave-core/blob/master/docs/README.md)
- [Issues](https://github.com/brave/brave-browser/issues)
- [Releases](https://github.com/brave/brave-browser/releases)
- [Wiki](https://github.com/brave/brave-browser/wiki)

## Downloads

You can [visit our website](https://brave.com/download) to get the latest stable release.

### Nix

The repository provides a Nix flake that wraps the prebuilt release binary (the
same prebuilt `.deb`/`.zip` artifacts that
[nixpkgs `brave`](https://github.com/NixOS/nixpkgs/blob/nixos-26.05/pkgs/by-name/br/brave/make-brave.nix)
uses). It is not built from source.

```bash
# Run without installing
nix run github:brave/brave-browser

# Install into your profile
nix profile install github:brave/brave-browser
```

The flake tracks the default branch and is auto-bumped to the latest stable
release by a daily [workflow](.github/workflows/nix-release.yml), so
`github:brave/brave-browser` always serves the current release. (Release tags
are cut before the bump lands, so `github:brave/brave-browser/vX.Y.Z` is not a
valid pin — use the nixpkgs package or a specific commit SHA if you need
reproducibility.)

Supported platforms: `x86_64-linux`, `aarch64-linux`, `x86_64-darwin`,
`aarch64-darwin`.

## Contributing

Please see the [contributing guidelines](https://github.com/brave/brave-core/blob/master/CONTRIBUTING.md).

## Security Policy

Please see the [security policy](https://github.com/brave/brave-core/blob/master/SECURITY.md).

## Community

[Join the Q&A community](https://community.brave.app/) if you'd like to get more involved with Brave. You can [ask for help](https://community.brave.app/c/support-and-troubleshooting),
[discuss features you'd like to see](https://community.brave.app/c/brave-feature-requests), and a lot more. We'd love to have your help so that we can continue improving Brave.

You can also ask questions and interact in the [`community-guest`](https://bravesoftware.slack.com) channel on Brave Software's Slack.

Help us translate Brave to your language by submitting translations at https://explore.transifex.com/brave/brave_en/.

Follow [@brave](https://x.com/brave) on X for important news and announcements.
