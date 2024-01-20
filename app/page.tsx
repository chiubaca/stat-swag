import { SessionExpiredLogin } from "@/components/session-expired-login";
import { auth, signIn } from "auth"
import { default as strava, Strava } from 'strava-v3';

export default async function Index() {

  const session = await auth()

  let isSessionExpired = false

  let athleteInfo;

  let athleteActivities;

  if (!!session) {


    if (new Date(session.expires) < new Date()) {


      return <SessionExpiredLogin/>

    }


    try {
      const athleteInfoResp = await strava.athlete.get({
        access_token: session.token.accessToken
      })

      const athleteActivitiesResp = await strava.athlete.listActivities({
        access_token: session.token.accessToken
      })

      athleteInfo = athleteInfoResp
      athleteActivities = athleteActivitiesResp
    } catch (err) {

      console.log("🚀 ~ Strava request error",)
    }




  }



  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Welcome to Strava cards</h1>

      <code>{JSON.stringify(athleteInfo)}</code>


      {/* <code>{JSON.stringify(athleteActivities)}</code> */}

      {athleteActivities && athleteActivities.map((r: any) => <div>{r.name}</div>)}

    </div>
  )
}
