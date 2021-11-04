<script>
	

	import AddWeather from './components/AddWeather.svelte'
	import DisplayList from './components/DisplayList.svelte';
	import Forecast from './components/Forecast.svelte';




</script>

<main>

	<Forecast/>

	<AddWeather/>
	


	<DisplayList/>

</main>

<style>
	main {
		text-align: center;
		width: 100%;
		margin: 0;
		
		
	}





	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>