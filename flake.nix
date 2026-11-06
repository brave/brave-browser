{
  description = "Brave browser — privacy-oriented browser (prebuilt binaries from upstream releases)";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs = { self, nixpkgs }:
    let
      # Bumped by .github/workflows/update-brave-hashes.yml (daily lag-check).
      # Tag-pinning does NOT work for this flake: the hash bump lands AFTER the
      # upstream release tag is cut, so github:brave/brave-browser/vX.Y.Z may
      # predate the flake.nix update. Pin the flake ref or commit instead.
      version = "1.92.134";

      assets = {
        "x86_64-linux" = {
          url = "https://github.com/brave/brave-browser/releases/download/v${version}/brave-browser_${version}_amd64.deb";
          hash = "sha256-T3A/ejmLkIRYGWc8GXQmvIAZvQFwYEyhQJxssNDalhQ=";
        };
        "aarch64-linux" = {
          url = "https://github.com/brave/brave-browser/releases/download/v${version}/brave-browser_${version}_arm64.deb";
          hash = "sha256-qo40t+PGl1RO2ajJ2Hev4G1FWvzTx7Ak5CVxjdxabLI=";
        };
        "x86_64-darwin" = {
          url = "https://github.com/brave/brave-browser/releases/download/v${version}/brave-v${version}-darwin-x64.zip";
          hash = "sha256-IrhvRVFZGLoGSVNy10ppFL9rEy7MRTb/HIhzspDsrs8=";
        };
        "aarch64-darwin" = {
          url = "https://github.com/brave/brave-browser/releases/download/v${version}/brave-v${version}-darwin-arm64.zip";
          hash = "sha256-K1p5mAYfEDJNZFSmoOQV7kHNsA5RQuyUl3T2KVsNcbw=";
        };
      };

      systems = builtins.attrNames assets;
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);

      # Reuse nixpkgs' brave packaging (patchelf, wrapGAppsHook3, desktop-file
      # fixup, icon symlinks, OutdatedBuildDetector disable, darwin .app install)
      # by overriding only version + src to track upstream releases. Vendoring
      # make-brave.nix would duplicate ~150 lines that upstream already maintains.
      braveFor = system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          asset = assets.${system};
        in
        pkgs.brave.overrideAttrs (old: {
          inherit version;
          src = pkgs.fetchurl { inherit (asset) url hash; };
          meta = old.meta // {
            changelog = "https://github.com/brave/brave-browser/blob/master/CHANGELOG_DESKTOP.md#"
              + nixpkgs.lib.replaceStrings [ "." ] [ "" ] version;
          };
        });
    in
    {
      packages = forAllSystems (system: rec {
        brave = braveFor system;
        default = brave;
      });

      apps = forAllSystems (system: {
        brave = {
          type = "app";
          program = nixpkgs.lib.getExe (braveFor system);
        };
        default = {
          type = "app";
          program = nixpkgs.lib.getExe (braveFor system);
        };
      });
    };
}
