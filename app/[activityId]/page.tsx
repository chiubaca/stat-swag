import { Activities, Activity } from "@/types/strava-api";
import { auth, signIn } from "auth"
import { default as strava, Strava } from 'strava-v3';

import polyline from '@mapbox/polyline'

export default async function Index({
  params
}: { params: { activityId: string } }) {

  const session = await auth()
  let athleteActivity;



  if (!!session) {


    try {

      const activityResp = await strava.activities.get({ id: params.activityId, access_token: session.token.accessToken })

      athleteActivity = activityResp
    } catch (err) {

      console.log("🚀 ~ Strava request error", err)
      // await signIn()
    }


  }


  const mapRoute = athleteActivity?.map?.polyline && polyline.decode(athleteActivity.map.polyline)


  return (
    <div className="space-y-2">

      <h1 className="text-3xl font-bold"> {athleteActivity?.name}</h1>
      <h2 className="font-bold"> Strava activity  {params.activityId}</h2>


      <code>

        {/* {JSON.stringify(athleteActivity, null, 2)} */}

        {mapRoute}
      </code>
    </div>
  )
}
