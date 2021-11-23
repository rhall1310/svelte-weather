<script>
  import { v4 as uuidv4 } from "uuid";
  import { weatherList } from "../store.js";

  let weather;
  let cityName = "";
  let input;

  const apiKey = process.env.SVELTE_APP_API;

  function checkEnter(event) {
    if (event.keyCode === 13) {
      document.getElementById("submitBtn").click();
    }
  }

  function checkError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  function getWeather() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&units=metric&appid=" +
        apiKey
    )
      .then(checkError)
      .then((data) => {
        console.log(data);

        weather = data;
        weather.id = uuidv4();

        console.log(weather);

        weatherList.update((currentWeather) => {
          return [weather, ...currentWeather];
        });

        input.value = "";
        cityName = "";
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getLoc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherLoc);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function getWeatherLoc(position) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "&units=metric&appid=" +
        apiKey
    )
      .then(checkError)
      .then((data) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        weather = data;
        weather.id = uuidv4();

        console.log(weather);

        weatherList.update((currentWeather) => {
          return [weather, ...currentWeather];
        });

        input.value = "";
        cityName = "";
      })
      .catch((error) => {
        alert(error);
      });
  }
</script>

<main>
  <div class="title">
    <img src="/images/stormy-weather-1508939.jpg" alt="header" />
    <h1><a href="index.html">Weather</a></h1>
  </div>

  <p>
    Search for a location to see the current weather there. You can add multiple
    locations.
  </p>

  {#if $weatherList.length == 0}
    <input
      name="input"
      type="text"
      placeholder="Enter a city"
      bind:value={cityName}
      bind:this={input}
      on:keyup={checkEnter}
    />
  {:else}
    <input
      name="input"
      type="text"
      placeholder="Enter another city"
      bind:value={cityName}
      bind:this={input}
      on:keyup={checkEnter}
    />
  {/if}

  <button
    id="submitBtn"
    type="button"
    on:click={getWeather}
    disabled={cityName == ""}>Get Weather</button
  >

  <button on:click={getLoc}>Use Location</button>
</main>

<style>
  main {
    max-width: 100vw;
  }

  .title {
    position: relative;
    text-align: center;
  }

  img {
    max-height: 10em;
  }

  h1 {
    color: darkcyan;
    font-size: 3rem;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 1em;
    padding: 0.2em;
  }

  h1:hover {
    background-color: rgba(240, 248, 255, 0.8);
    border-color: darkcyan;
    border: solid 2px;
  }

  p {
    margin: 1em;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border-radius: 1em;
    padding: 8px 1em 8px 1em;
  }

  button:hover:enabled {
    background-color: aliceblue;
    border-color: darkcyan;
  }

  input {
    border-radius: 1em;
    text-align: center;
    min-width: 14em;
  }

  @media only screen and (min-width: 600px) {
    img {
      margin-top: 1em;
      border-radius: 1em;
    }
    h1 {
      top: 35%;
    }
  }
</style>
