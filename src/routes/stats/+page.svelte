<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData
</script>

{#if data.athleteActivities}
  <h1>Your stats</h1>

  <!-- <p>{JSON.stringify(data.athleteActivities)}</p> -->

  {#each data.athleteActivities as activity (activity.id)}
    <a href={`/stats/${activity.id}`}>
      <h2>{activity.name}</h2>
    </a>
  {/each}
{:else}
  <h1>Access Denied</h1>
  <p>
    <a href="/auth/signin"> You must be signed in to view this page </a>
  </p>
{/if}
