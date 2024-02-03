import { SvelteKitAuth } from "@auth/sveltekit"

import Strava from "@auth/sveltekit/providers/strava"
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private"

export const handle = SvelteKitAuth({
  secret: AUTH_SECRET,
  providers: [
    Strava({
      clientId: STRAVA_CLIENT_ID,
      clientSecret: STRAVA_CLIENT_SECRET,
      authorization: {
        params: { scope: 'activity:read,activity:write' }
      }
    })
  ],
  callbacks: {
    jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }): Promise<any> {
      return { ...session, token }
    },
  },
})
