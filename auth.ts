import NextAuth  from "next-auth"
import Strava from "next-auth/providers/strava"

export const { handlers, auth, signIn, signOut, update } = NextAuth({
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Strava({
      clientId: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      authorization:{
        params: { scope: 'activity:read,activity:write'}
      }
    })
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
    jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
   async session({session, token}): Promise<any> {
      return {...session, token}
    },
  },

})
