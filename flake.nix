{
  description = "Build the pergola backend with nix";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
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
    };
    defaultPackage.x86_64-linux = legacyPackages.x86_64-linux.trivial;
  };
}
