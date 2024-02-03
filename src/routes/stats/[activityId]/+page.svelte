<script lang="ts">
  import { onMount } from "svelte"
  import type { PageData } from "./$types"
  import polyline from "@mapbox/polyline"
  import { geoMercator, select, easeLinear, geoPath } from "d3"
  import { bbox, center } from "@turf/turf"

  export let data: PageData

  const routeGeoJson =
    data.activity?.map?.summary_polyline &&
    polyline.toGeoJSON(data.activity.map.summary_polyline)
  console.log("🚀 ~ routeGeojson:", routeGeoJson)

  const routeCenter = center(routeGeoJson)
  // console.log("🚀 ~ routeCenter:", routeCenter)

  const routebbox = bbox(routeGeoJson)
  console.log("🚀 ~ routebbox:", routebbox)

  var width = 500
  var height = 500

  // Define the projection and path generator for the map
  var projection = geoMercator()
    .center(routeCenter.geometry.coordinates) // Set the center to the approximate center of the coordinates
    // .scale(100000) // Set the scale to fit the coordinates
    .translate([width / 2, height / 2]) // Center the map in the SVG element
    .fitSize([width - 10, height - 10], routeGeoJson)

  var path = geoPath().projection(projection)(routeGeoJson)
  // console.log("🚀 ~ path:", path)

  let pathElement

  onMount(() => {
    // Get the length of the path
    var totalLength = pathElement.getTotalLength()

    // Set the stroke-dasharray and the stroke-dashoffset
    select(pathElement)
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition() // Start a transition
      .duration(2000) // For a duration of 2000 ms
      .ease(easeLinear) // Use a linear easing function
      .attr("stroke-dashoffset", 0) // Set the stroke-dashoffset to 0
  })
</script>

<main>
  <div
    class="rounded-lg p-5 border-solid border-black border-2 grid grid-cols-3"
  >
    <h1 class=" bg-fuchsia-200 rounded-lg p-5 m-1 col-span-1">
      {data.activity?.name}
    </h1>

    <div class="col-span-1 bg-blue-200 rounded-lg p-5 m-1">
      {data.activity?.distance}
    </div>

    <div class="col-span-1 bg-green-200 m-1 rounded-lg p-5">
      {new Date(data.activity?.start_date)}
    </div>

    <div class="col-span-3 bg-neutral-200 m-1 rounded-lg p-5">
      <svg {width} {height}>
        <!-- Append the data as a path element to the SVG -->
        <path
          bind:this={pathElement}
          d={path}
          fill="white"
          fill-opacity="0.1"
          stroke="black"
        />
      </svg>
    </div>
  </div>

  <a
    href={`https://www.strava.com/activities/${data.activity?.id}`}
    referrerpolicy="no-referrer"
    target="_blank"
  >
    See on strava</a
  >
</main>

<style>
</style>
