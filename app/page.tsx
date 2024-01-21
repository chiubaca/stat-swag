import { SessionExpiredLogin } from "@/components/session-expired-login";
import { Activities } from "@/types/strava-api";
import { auth, signIn } from "auth"
import Link from "next/link";
import { default as strava, Strava } from 'strava-v3';

export default async function Index() {

  const session = await auth()

  let isSessionExpired = false

  let athleteInfo;

  let athleteActivities;


  function isFutureDate(value: string) {
    var now = new Date();
    var target = new Date(value);
    return target > now;
  }

  if (!!session) {


    if (!isFutureDate(session.expires)) {
      console.log('Session expired!', new Date(session.expires))

      return <SessionExpiredLogin />

    }


    try {
      const athleteInfoResp = await strava.athlete.get({
        access_token: session.token.accessToken
      })

      const athleteActivitiesResp: Activities = await strava.athlete.listActivities({
        access_token: session.token.accessToken
      })

      athleteInfo = athleteInfoResp
      athleteActivities = athleteActivitiesResp
    } catch (err) {

      console.log("🚀 ~ Strava request error",)

      await signIn()
    }


  }



  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Welcome to Strava cards</h1>

      {/* <code>{JSON.stringify(athleteInfo)}</code> */}
      {/* <code>{JSON.stringify(athleteActivities)}</code> */}
      {/* <code>{JSON.stringify(athleteActivities)}</code> */}

      <div className="flex flex-col">
        {athleteActivities && athleteActivities.map((r) => {
          return <Link className="link underline" key={r.id} href={`/${r.id}`}>
            {r.name}
          </Link>
        }
        )}
      </div>


    </div>
  )
}
