{pkgs ? import <nixpkgs> {},
 nodejs ? pkgs.nodejs-12_x,
 stdenv ? pkgs.stdenv,
 lib ? pkgs.lib,
 ...}:

let
  nodeDependencies = (pkgs.callPackage ./deps/default.nix {}).shell.nodeDependencies;

  deps = [ nodejs ] ++ (with pkgs; [ which coreutils ]);

  pergolaApiNode = stdenv.mkDerivation {
    name = "pergola-api-node";
    src = ./..;
    buildInputs = deps;
    buildPhase = ''
      export PATH="${nodeDependencies}/bin:$PATH"
      ln -s ${nodeDependencies}/lib/node_modules ./node_modules

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
lib.mergeAttrs
  (pkgs.writeScriptBin "pergola-api" ''
    #!${pkgs.runtimeShell} -e

    export PATH="${nodeDependencies}/bin:${lib.makeBinPath deps}:$PATH"
    ln -s ${nodeDependencies}/lib/node_modules ./node_modules

    export KEYCLOAK_CONFIG="''${KEYCLOAK_CONFIG:-"config/keycloak.json"}"
    ts-node ${pergolaApiNode}/dist/index.js
    ''
  )
  { inherit pergolaApiNode; }
