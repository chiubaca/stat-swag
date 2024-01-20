import NextAuth from "next-auth"

type StravaUser = {
  name: string,
  image: string
}


type StravaToken = {
  name: string
  picture: string
  sub: string
  accessToken: string
  iat: number
  exp: number
  jti: string

}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: StravaUser
    token: StravaToken
  }
}