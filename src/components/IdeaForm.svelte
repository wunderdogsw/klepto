<script lang="ts">
	import { goto } from '$app/navigation';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Button from '@smui/button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { onMount } from 'svelte';

	export let id = null;

	let idea = { title: '', description: '' };

	onMount(() => {
		if (id) {
			// TODO handle when an idea isn't found
			idea = ideasStore.findById(id);
		}
	});

	const handleSubmit = () => {
		if (id) {
			ideasStore.edit(idea);
		} else {
			ideasStore.add(idea);
		}

		// TODO add success message
		goto('/');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<LayoutGrid>
		<Cell span="12">
			<Textfield bind:value={idea.title} label="Title" style="width: 100%;" required />
		</Cell>
		<Cell span="12">
			<Textfield
				textarea
				bind:value={idea.description}
				label="Description"
				required
				input$rows={4}
				input$maxlength={400}
				style="width: 100%;"
			>
				<CharacterCounter slot="internalCounter">0 / 400</CharacterCounter>
			</Textfield>
		</Cell>
		<Cell span="12">
			<Button variant="raised">{id ? 'Update Idea' : 'Add Idea'}</Button>
		</Cell>
	</LayoutGrid>
</form>
