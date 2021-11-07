<script>
	

	import AddWeather from './components/AddWeather.svelte'
	import DisplayList from './components/DisplayList.svelte';
	import Forecast from './components/Forecast.svelte';
	import Footer from './components/Footer.svelte';




</script>

<main>

	<Forecast/>

	<AddWeather/>
	


	<DisplayList/>
	<footer>
	<Footer/>
	</footer>
</main>

<style>
	
	main {
		text-align: center;
		width: 100%;
		margin: 0;
		
		
	}

	footer {
		padding-top: 4em;
	}







	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>