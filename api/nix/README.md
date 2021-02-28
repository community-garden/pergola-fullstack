This directory contains tooling to build the pergola-api in 2 different ways:


## Trivial non pure build ##

`trivial/shell.nix` allows opening a development environment containing all dependencies (independent of your host system):

```
cd api
nix develop ..#trivial
```

This environment can be used during development and for running the tests.

The development shell uses `yarn` to get the `node_modules`, so it behaves very similar to the development environment you would manually setup without nix.


## Reproducible pure build ##

For deployments, we don't want any side effects influence our build result. To accomplish this, we use only exactly the inputs defined in `flake.nix`, check the pinned hash for all downloads and prevent any access outside this repository during the build.

### Update dependencies ###

The `node_modules` are build by nix using [node2nix](https://github.com/svanderburg/node2nix). To update them (whenever you changed dependencies in `package.json`), run:

```
cd api
nix develop ..#update-deps
```

The generated packages will be put into `./deps`.

### Spawn develop shell ###

You can open a develop environment similar to `nix develop ..#trivial`, but with `$NODE_PATH` referencing the `/nix/store`:

```
cd api
nix develop ..#shell
```

### Build pergola-api ###

`pergola-api.nix` and `pergola-api-docker.nix` contain the definitions of packages to build & run the pergola-api as simple package and as docker container.

Both don't contain `neo4j` and `keycloak`, so they need be started first:

```
docker-compose up -d neo4j keycloak  ## requires KEYCLOAK_FRONTEND_URL="http://localhost:8080/auth/"
cd api
nix run ..#pergola-api
```

### Build pergola-api docker container ###

Using keycloak from another docker container requires `KEYCLOAK_FRONTEND_URL=http://keycloak:8080/auth/`

```
nix build .#pergola-api-docker
docker load < result
docker-compose up
```

### Using prebuild docker container ###

The CI/CD builds the docker container and uploads it to dockerhub.

When doing frontend development without changing the api, you don't need to build the backend yourself. Just use the same container as the live deployments does:

```
docker-compose up
```


## Known Issues ##

`KEYCLOAK_FRONTEND_URL` needs different settings depending on whether the pergola-api is running on the host (during development) or inside docker.

A workaround is having the constant `KEYCLOAK_FRONTEND_URL=http://keycloak:8080/auth/`, but resolving `keycloak` at the hostsystem.


```
127.0.0.1 keycloak >> /etc/hosts 
```


## Ideas for future improvement ##

We may provide a bundled version of pergola-api containing neo4j and keycloak without the need of running an additional container.
