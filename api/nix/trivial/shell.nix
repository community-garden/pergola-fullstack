{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs; [ nodejs-14_x ];

  shellHook = ''
    [ -d node_modules ] && echo -e 'You might want delete ./node_modules first.\n'
    npx yarn

    echo -e '\nFor a production build run:'
    echo '> (cd api && npx yarn run build-ts)'

    echo -e '\nTo serve the production build run:'
    echo '> (cd api && npx ts-node ./dist/index.js)'

    #ENV=''${ENV:-live}
    #set -o allexport && source .circleci/$ENV.env
  '';
}
