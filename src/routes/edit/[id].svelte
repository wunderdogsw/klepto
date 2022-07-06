<script lang="ts">
	import { page } from '$app/stores';

	import TopBar from '../../components/TopBar.svelte';
	import Container from '../../components/Container.svelte';
	import IdeaForm from '../../components/IdeaForm.svelte';

	const { id } = $page.params;
</script>

<TopBar />

<main>
	<Container>
		<IdeaForm {id} />
	</Container>
</main>
