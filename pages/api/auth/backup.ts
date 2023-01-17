import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    AzureADProvider({
    clientId: process.env.AZURE_AD_CLIENT_ID as string,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
    tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
    // --------------------------------------------------------------------
    // AzureADB2CProvider({
    //   tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
    //   clientId: process.env.AZURE_AD_B2C_CLIENT_ID as string,
    //   clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET as string,
    //   primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
    //   authorization: {
    //     params: {
    //       scope: `https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/demo.read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/demo.write offline_access openid profile`,
    //     },
    //   },
    //   profile(profile) {
    //     // console.log('profile',profile)
    //     return {
    //       id: profile.sub,
    //       name: profile.given_name,
    //       ...profile,
    //     };
    //   },
    // }),
  ],

  callbacks: {
    async jwt({ token, account ,profile }) {
      // console.log('token', token)

    // Persist the OAuth access_token to the token right after signin
    if (account) {
    token.accessToken = account.access_token
    }
    return token
    },
    async session({ session, token, user }:any) {
      // console.log('token', token)
    // Send properties to the client, like an access_token from a provider.
    session.accessToken = token.accessToken
    return session
    }
  },
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.NEXTAUTH_SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/signin', // Displays signin buttons
    signOut: '/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null// If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
});
