<script>
  import { weatherList } from "../store.js";
  import { fade, scale } from "svelte/transition";

  import WeatherItem from "./WeatherItem.svelte";

  function clearAll() {
    weatherList.update((currentWeather) => {
      return [];
    });
    window.scrollTo(0, 0);
  }
</script>

<main>
  <div class="items">
    {#each $weatherList as weather}
      <div in:scale out:fade={{ duration: 500 }}>
        <WeatherItem weather={weather} />
      </div>
    {/each}
  </div>
  {#if $weatherList != ""}
    <button on:click={clearAll}>Clear All</button>
  {/if}
</main>

<style>
  .items {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5em;
    padding: 2em 0;
    margin: auto;
    max-width: 90vw;
  }

  button {
    border-radius: 1em;
    padding: 8px 1em 8px 1em;
  }

  button:hover {
    background-color: aliceblue;
    border-color: darkcyan;
  }

  @media only screen and (max-width: 800px) {
    .items {
      align-items: center;
      justify-content: center;
    }
  }
</style>
