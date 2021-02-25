{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [ nodejs-14_x nodePackages.node2nix ];

  shellHook = ''
    if ! [ -d ../api ] ; then
      echo 'ERROR: Must be run from the api directory!'
      exit
    fi

    npx synp -f -s yarn.lock
    cd nix
    node2nix --command node2nix -i ../package.json -l ../package-lock.json --development --strip-optional-dependencies

    exit
  '';
}
