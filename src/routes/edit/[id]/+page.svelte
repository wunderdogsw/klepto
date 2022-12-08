<script lang="ts">
	import IdeaForm from '../../../components/IdeaForm.svelte';
	import type { IdeaType } from '../../../types';

	type DataType = {
		idea: Pick<IdeaType, '_id' | 'title' | 'description'>;
	};
	export let data: DataType;
	let { idea } = data;
</script>

<svelte:head>
	<title>Edit Idea | Klepto</title>
</svelte:head>

<IdeaForm {idea} />
