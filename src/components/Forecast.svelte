<script>
    
    import {forecast} from '../store.js';
    function clearForecast() {
        $forecast = '';
    }
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const day = new Date()
        const todayNumber = day.getDay()
        const next5DaysNames = getWeekDaysNames()
        function getWeekDaysNames() {
            let result = []
            for (let i = todayNumber; i <= todayNumber + 7; i++) {
                if (i > 6) {
                    const dayName = weekDays[i-7]
                    result.push(dayName)
                } else{
                    const dayName = weekDays[i]
                    result.push(dayName)
                }
            
            }
            return result
        }
        function getDates(date, index) {
            const tomorrow = new Date(date)
            tomorrow.setDate(tomorrow.getDate() + index)
            const result = tomorrow.toLocaleDateString('en-GB');
            
           
            return result
        }
    </script>
    
    
    
    {#if $forecast != ''}
    <main>
        <button on:click={clearForecast}>Clear</button>
        <h1>{$forecast.name}</h1>
        <h2>7 day forecast</h2>
        <div class="days">
            {#each Array(7) as item, i}
            <div class="day">
                <h2>{next5DaysNames[i]} {getDates(day, i)}</h2>
                <img src="http://openweathermap.org/img/wn/{$forecast.daily[i].weather[0].icon}@2x.png" alt="{$forecast.daily[i].weather[0].main}">
                <p>{$forecast.daily[i].weather[0].main}</p>
                <p>{$forecast.daily[i].temp.day}</p>
            </div>
            {/each}
        </div>
    </main>
    {/if}
    
<style>
        main {
            height: 96%;
            width: 96%;
            background-color: rgb(47, 148, 216);
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: auto;
            z-index: 999;
            left: 2vw;
            box-shadow: 5px 3px;
      
            
            
        }
        .days {
            display: flex;
            gap: 2em;
            
        }

        
@media only screen and (max-width: 600px) {

main {
    height: fit-content;
    width: 96%;
}    
.days {
  flex-direction: column;
  align-items: center;

}

}
    </style>