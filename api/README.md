# Our Garden - GraphQL API

## Quick Start

Install dependencies:

```
npm install
```

Start the GraphQL service:

```
npm start
```

This will start the GraphQL service (by default on localhost:4000) where you can issue GraphQL requests or access GraphQL Playground in the browser:

![GraphQL Playground](img/graphql-playground.png)

## Configure

Set your Neo4j connection string and credentials in `.env`. For example:

_.env_

```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=
AUTH_DIRECTIVES_ROLE_KEY=https://<auth0domain_OR_Custom_Auth_Doamin>/role
JWT_SECRET="-----BEGIN PUBLIC KEY-----<ACTUAL_PUBLIC_KEY_CONTENT_WITH_CRLF>-----END PUBLIC KEY-----"
```

The fastest way to spawn a database is using the `docker-compose.yml` in the root directory

## Configuring Auth0 for Our Garden - GraphQL.

Currently no Auth0 configured. Use the GRANDStack Starter Guide.

Please read this [write-up](auth0-howto.md) for more information on configuring `Auth0` for GRANDStack - GraphQL.


## Deployment

You can deploy to any service that hosts Node.js apps

```
vercel
```

to deploy your GraphQL service on Vercel. Once deployed you'll be given a fresh URL that represents the current state of your application where you can access your GraphQL endpoint and GraphQL Playgound. For example: https://grand-stack-starter-api-pqdeodpvok.vercel.sh/

## Seeding The Database

Optionally you can seed the GraphQL service by executing mutations that will write sample data to the database:

```
npm run seedDb
```
