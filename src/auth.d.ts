
import type { DefaultSession } from '@auth/core/types';

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

declare module "@auth/core/types" {

  interface Session {
    user: StravaUser
    token: StravaToken
  }
}