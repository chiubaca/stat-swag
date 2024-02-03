import type { PageServerLoad } from './$types';
import strava from "strava-v3"

import type { Activities } from "../../common/strava-api"

export const load = (async (event) => {

  const auth = await event.locals.auth()

  try {
    const athleteInfo = await strava.athlete.get({
      access_token: auth?.token.accessToken,
    })

    const athleteActivities: Activities = await strava.athlete.listActivities({
      access_token: auth?.token.accessToken,
    })


    return { athleteInfo, athleteActivities };
  } catch (err) {
    console.log("🚀 ~ load ~ err:", err)
  }


}) satisfies PageServerLoad;