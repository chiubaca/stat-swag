'use client'
import { signIn  } from "next-auth/react"

export const SessionExpiredLogin = () => {

return <> 
<h1>Session expired</h1>
<button onClick={async ()=> await signIn()}>Sign in</button>
</>

}