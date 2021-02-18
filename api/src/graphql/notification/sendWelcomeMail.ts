import {auth, KeycloakContext} from "keycloak-connect-graphql"

import {sendEMail} from "../../notification/nodemailer"
import {MutationResolvers} from "../types/graphql"

const { sendWelcomeMail }: MutationResolvers<{kauth: KeycloakContext}> = {
  sendWelcomeMail: async ( _, args, { kauth }, info ) =>  {
    const content = ( kauth?.accessToken as unknown as any )?.content
    const {sub: userId, preferred_username: name } = content
    userId && console.log( JSON.stringify( content?.email, null, 2 ))
    await sendEMail( "welcomeUser", { to: "pergola@gra.one" }, {locale: "en", name, garden: "Wurzelwerk"} )
    return true
  }
}
export default { resolvers: { Mutation: { sendWelcomeMail: auth ( sendWelcomeMail ) } } }

