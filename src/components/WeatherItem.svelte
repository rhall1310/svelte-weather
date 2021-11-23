<script>
  import { weatherList, forecast } from "../store.js";

  import Card from "./Card.svelte";

  export let weather;

  const apiKey = process.env.SVELTE_APP_API;

  function checkError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  const deleteWeather = (weatherID) => {
    weatherList.update((currentWeather) => {
      return currentWeather.filter((weather) => weather.id != weatherID);
    });
  };

  function updateWeather(weatherID) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        weather.name +
        "&units=metric&appid=" +
        apiKey
    )
      .then(checkError)
      .then((data) => {
        console.log(data);

        weather = data;
        weather.id = weatherID;

        console.log(weather);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function getForecast() {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        weather.coord.lat +
        "&lon=" +
        weather.coord.lon +
        "&exclude=current,minutely,hourly,alerts&units=metric&appid=" +
        apiKey
    )
      .then(checkError)
      .then((data) => {
        console.log(data);

        $forecast = data;
        $forecast.name = weather.name;

        console.log($forecast);
      })
      .catch((error) => {
        alert(error);
      });
  }
</script>

<main>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />

  <Card>
    <div class="item">
      <div class="top">
        <button
          id="refresh"
          class="material-icons"
          on:click={updateWeather(weather.id)}>refresh</button
        >
        <img
          src="http://openweathermap.org/img/wn/{weather.weather[0]
            .icon}@2x.png"
          alt={weather.weather[0].description}
        />
        <button
          id="delete"
          class="material-icons"
          on:click={deleteWeather(weather.id)}>close</button
        >
      </div>

      <h2>{weather.name}, {weather.sys.country}</h2>
      <p>{weather.weather[0].main}</p>
      <p>{weather.main.temp} °C</p>
      <p>Feels like - {weather.main.feels_like} °C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <button id="forecast" on:click={getForecast(weather.name)}
        >Get Forecast</button
      >
    </div>
  </Card>
</main>

<style>
  .item {
    display: flex;
    flex-direction: column;
    padding: 0;
    justify-content: center;
    font-weight: bold;
  }

  .item > h2 {
    margin: 0.5em;
  }

  img {
    max-height: 5em;
    max-width: 5em;
    padding: 0;
  }

  button {
    background-color: transparent;
    border: none;
    font-weight: bolder;
    cursor: pointer;
    transition: all ease-in-out 300ms;
  }
  #forecast {
    background-color: #f4f4f4;
    max-width: 12em;
    align-self: center;
    border-radius: 2em;
    padding: 1em;
    color: darkcyan;
    border: 1px solid #ccc;
  }

  #forecast:hover {
    background-color: aliceblue;
    border-color: darkcyan;
  }

  #delete:hover {
    color: orangered;
  }

  #refresh:hover {
    color: greenyellow;
  }

  .top {
    display: flex;
    justify-content: space-between;
  }

  #delete {
    align-self: flex-start;
  }

  #refresh {
    align-self: flex-start;
  }
</style>
