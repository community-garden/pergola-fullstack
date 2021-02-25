{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [ nodejs-14_x nodePackages.node2nix ];

  shellHook = ''
    if ! [ -d ../api ] ; then
      echo 'ERROR: Must be run from the api directory!'
      exit
    fi

    ## deleting seems to be the only way of getting rid of previously installed and optional deps
    rm -r node_modules yarn.lock
    npx yarn --ignore-optional

    npx synp -f -s yarn.lock

    cd nix
    node2nix --command node2nix -i ../package.json -l ../package-lock.json --development --strip-optional-dependencies

    exit
  '';
}
