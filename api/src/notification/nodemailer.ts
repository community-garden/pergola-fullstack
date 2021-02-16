import Email from "email-templates"
import { createTransport } from "nodemailer"
import path from "path"

const { SMTP_PASS, SMTP_USER, SMTP_HOST, SMTP_PORT } = process.env
const smtp = {
    host: SMTP_HOST ,
    port: SMTP_PORT ,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    debug: true,
    pool: true,
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    },
    maxConnections: 1
}


const from = "Pergola <noreply@pergola.gra.one.de>"

const transport = createTransport( smtp )


const email =
  new Email( {
    transport,
    message: {
      from
    },
    views: {
      root: path.join( __dirname, "../emails/views" )
    },
    juiceResources: {
      webResources: {
        relativeTo: path.join( __dirname, "../emails/styles" )
      }
    },
    i18n: {
      locales: ["en", "de"],
      directory: path.join( __dirname, "../emails/translations" ),
      logger: false
    },
    // preview: true,
    send: true
  } )

export const sendEMail: ( template: string, message: any, locals: any ) => Promise<any> = async ( template, message , locals ) => {
  try {
    await email.send( {template, message, locals} )
  } catch ( e ) {
    console.error( "some error in the mailer occured", e )
    return false
  }
}
