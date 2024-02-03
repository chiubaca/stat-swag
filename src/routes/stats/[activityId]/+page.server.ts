import type { PageServerLoad } from './$types';

import strava from "strava-v3"


export const load = (async ({ params, locals }) => {
  const auth = await locals.auth()


  try {
    const activity = await strava.activities.get({
      id: params.activityId,
      access_token: auth?.token.accessToken,
    })

    return {
      id: params.activityId,
      activity
    };
  } catch (err) {
    console.log("🚀 ~ load ~ err:", err)
  }


}) satisfies PageServerLoad;