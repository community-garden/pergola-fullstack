{ pkgs }:
let
  app = import ./pergola-api.nix { inherit pkgs; };
in
pkgs.dockerTools.buildImage {
  name = "pergola-api";
  tag = "latest";
  config = {
    Env = [ "PATH=${pkgs.lib.makeBinPath ([app] ++ app.pergolaApiNode.buildInputs ++ (with pkgs; [ bashInteractive curl ]))}" ];
    Cmd = [ "pergola-api" ];
  };
}
