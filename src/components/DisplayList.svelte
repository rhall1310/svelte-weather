<script>
import {weatherList} from '../store.js'
import { fade, scale } from 'svelte/transition'

import WeatherItem from './WeatherItem.svelte'



function clearAll(){
  weatherList.update((currentWeather) => {
        return []
      })


}


</script>

<main>
  <div class="items">
   {#each $weatherList as wther}
   
    <div in:scale out:fade="{{ duration: 500 }}">
      <WeatherItem weather = {wther} />
    </div>
{/each}
</div>
{#if $weatherList != ''}
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

@media only screen and (max-width: 600px) {

  .items {
    flex-direction: column;
    align-items: center;

  }

}

</style>