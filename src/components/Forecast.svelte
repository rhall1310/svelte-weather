<script>
    
    import {forecast} from '../store.js';

    function clearForecast() {
        $forecast = '';
        window.scrollTo(0, 0);
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

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet">
       

        <button class="material-icons" id="closeTop" on:click={clearForecast}>close</button>
        <h1>{$forecast.name}</h1>
        <h2>7 day forecast</h2>
        <div class="days">
            {#each Array(7) as item, i}
            <div class="day">
                <h3>{next5DaysNames[i]} {getDates(day, i)}</h3>
                <img src="http://openweathermap.org/img/wn/{$forecast.daily[i].weather[0].icon}@2x.png" alt="{$forecast.daily[i].weather[0].main}">
                <p>{$forecast.daily[i].weather[0].main}</p>
                <p>{$forecast.daily[i].temp.day}</p>
            </div>
            {/each}
        </div>
        
           
                <button class="material-icons" id="closeBot" on:click={clearForecast}>close</button>
          
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
    margin-bottom: 2em;
      
            
            
    }

p {
    font-weight: bold;
}

.days {
    display: flex;
    gap: 2em;
    height: 100%;
            
        }

button {
    margin: 0;
    background-color: transparent;
    border: none;
    font-size: 3rem;
    transition: all ease-in-out 300ms;
}

button:hover {
    color: orangered
}

#closeTop {
    align-self: start;
}

#closeBot {
    align-self: flex-end;
    display: none;
    
}


        
@media only screen and (max-width: 600px) {

    main {
        height: fit-content;
        width: 96%;
        margin-bottom: 2em;
      
    }    

    .days {
        flex-direction: column;
        align-items: center;
        
        

    }

    #closeBot {
        display: inline-block;
    }

}


</style>