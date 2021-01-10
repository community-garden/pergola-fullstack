import tokenRequester from "keycloak-request-token"

const username = process.argv[2]
const password = process.argv[3]

const baseUrl = "http://localhost:8080/auth"
const settings = {
  username: username || "developer",
  password: password || "developer",
  grant_type: "password",
  client_id: "keycloak-connect-graphql-public",
  realmName: "keycloak-connect-graphql",
}

export async function getToken() {
  const token = await tokenRequester( baseUrl, settings )
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  console.log( JSON.stringify( headers ))
  return token
}

if ( require.main === module ) {
  getToken()
}
