{pkgs ? import <nixpkgs> {},
 stdenv ? pkgs.stdenv,
 nodejs ? pkgs.nodejs-12_x,
 ...}:

let
  nodeDependencies = (pkgs.callPackage ./deps/default.nix {}).shell.nodeDependencies;

  pergolaApiNode = stdenv.mkDerivation {
    name = "pergola-api-node";
    src = ./..;
    buildInputs = [ nodejs ] ++ (with pkgs; [ which ]);
    buildPhase = ''
      ln -s ${nodeDependencies}/lib/node_modules ./node_modules
      export PATH="${nodeDependencies}/bin:$PATH"

      #npm run build-ts
      [ -d dist ] || mkdir dist
      npm run prepare-build
      node --version
      tsc
    '';
    installPhase = ''
      mkdir $out
      cp -r dist $out/
    '';
  };
in
(pkgs.writeScriptBin "pergola-api" ''
  #!${pkgs.runtimeShell} -xe

  ln -s ${nodeDependencies}/lib/node_modules ./node_modules
  export PATH="${nodeDependencies}/bin:$PATH"

  export KEYCLOAK_CONFIG="''${KEYCLOAK_CONFIG:-"config/keycloak.json"}"
  ts-node ${pergolaApiNode}/dist/index.js
  ''
)
