{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [ nodejs-14_x nodePackages.node2nix ];

  shellHook = ''
    if ! [ -d ../api ] ; then
      echo 'ERROR: Must be run from the api directory!'
      exit
    fi

    cp package.json nix/deps
    cd nix/deps

    npx yarn --ignore-optional
    npx synp -f -s yarn.lock
    rm yarn.lock

    node2nix --command node2nix -l package-lock.json --development --strip-optional-dependencies

    exit
  '';
}
