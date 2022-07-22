<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Button from '@smui/button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { info } from '../stores/info';

	export let id = null;
	const isNew = !id;

	let idea = { title: '', description: '' };

	onMount(() => {
		if (!isNew) {
			// TODO handle when an idea isn't found
			idea = ideasStore.findById(id);
		}
	});

	const handleSubmit = async () => {
		try {
			if (isNew) {
				ideasStore.add(idea);
			} else {
				// TODO fix idea editing
				ideasStore.add(idea);
			}

			await goto('/');
		} catch (error) {
			$info = error.message ?? error;
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<LayoutGrid>
		<Cell span="12">
			<Textfield name="title" label="Title" bind:value={idea.title} style="width: 100%;" required />
		</Cell>
		<Cell span="12">
			<Textfield
				textarea
				name="description"
				label="Description"
				bind:value={idea.description}
				required
				input$rows={4}
				input$maxlength={400}
				style="width: 100%;"
			>
				<CharacterCounter slot="internalCounter">0 / 400</CharacterCounter>
			</Textfield>
		</Cell>
		<Cell span="12">
			<span>
				I hereby willfully and with sound mind release this idea to the public domain and will not
				have any copyright or any other claims whatsoever
			</span>
		</Cell>
		<Cell span="12">
			<Button variant="raised">{id ? 'Update Idea' : 'Add Idea'}</Button>
		</Cell>
	</LayoutGrid>
</form>
