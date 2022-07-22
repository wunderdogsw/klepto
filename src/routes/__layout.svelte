<script lang="ts">
	import TopBar from '../components/TopBar.svelte';
	import Container from '../components/Container.svelte';
	import InfoSnackbar from '../components/InfoSnackbar.svelte';
</script>

<TopBar />

<main>
	<Container>
		<slot />
	</Container>
</main>

<InfoSnackbar />
