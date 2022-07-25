<script lang="ts">
	import IdeaForm from '../../components/IdeaForm.svelte';

	export let idea;
</script>

<svelte:head>
	<title>Edit Idea | Klepto</title>
</svelte:head>

<IdeaForm {idea} />
