{pkgs ? import <nixpkgs> {},
 stdenv ? pkgs.stdenv,
 nodejs ? pkgs.nodejs-12_x,
 ...}:

let
  nodeDependencies = (pkgs.callPackage ./deps/default.nix {}).shell.nodeDependencies;
in
stdenv.mkDerivation {
  name = "pergola-api";
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
}
