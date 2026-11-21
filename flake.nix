{
  description = "Build the pergola backend with nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in
  rec {
    legacyPackages.x86_64-linux = {
      inherit pkgs;
      trivial = import ./api/nix/trivial/shell.nix { inherit pkgs; };
      update-deps = import ./api/nix/tools/node2nix/shell.nix { inherit pkgs; };

      shell = (import ./api/nix/deps/default.nix { inherit pkgs; }).shell;
      nodeDependencies = (import ./api/nix/deps/default.nix { inherit pkgs; }).shell.nodeDependencies;
      pergola-api = import ./api/nix/pergola-api.nix { inherit pkgs; };
      pergola-api-docker = import ./api/nix/pergola-api-docker.nix { inherit pkgs; };
    };
    defaultPackage.x86_64-linux = legacyPackages.x86_64-linux.pergola-api;

    # `nix develop .#e2e` — Cypress from nixpkgs (the npm-downloaded binary does
    # not run on NixOS). e2e/package.json pins cypress ^13 to match.
    devShells.x86_64-linux.e2e = pkgs.mkShell {
      packages = [ pkgs.cypress pkgs.nodejs_20 ];
      shellHook = ''
        # A host LD_LIBRARY_PATH (e.g. a newer alsa-lib) breaks the nixpkgs
        # Cypress binary (glibc mismatch) — it brings its own libraries.
        unset LD_LIBRARY_PATH
        export CYPRESS_INSTALL_BINARY=0
        export CYPRESS_RUN_BINARY=${pkgs.cypress}/bin/Cypress
        export CYPRESS_NIX_VERSION=${pkgs.cypress.version}
      '';
    };
  };
}
