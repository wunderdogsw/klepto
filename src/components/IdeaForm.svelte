<script lang="ts">
	import { goto } from '$app/navigation';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Button from '@smui/button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { onMount } from 'svelte';

	export let id = null;

	let idea = { title: '', description: '' };
	let action = '/api/ideas/new';

	onMount(() => {
		if (id) {
			// TODO handle when an idea isn't found
			idea = ideasStore.findById(id);
			action = '/api/ideas/edit';
		}
	});

	const handleSubmit = async () => {
		try {
			if (id) {
				ideasStore.edit(idea);
			} else {
				// TODO move this out to store or api file?
				const response = await fetch(action, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(idea)
				});
				const json = await response.json();
				ideasStore.add(json.idea);
			}

			await goto('/');
		} catch (error) {
			console.error(error);
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
			<FormField>
				<Checkbox name="consent" />
				<span slot="label">
					I hereby willfully and with sound mind release this idea to the public domain and will not
					have any copyright or any other claims whatsoever
				</span>
			</FormField>
		</Cell>
		<Cell span="12">
			<Button variant="raised">{id ? 'Update Idea' : 'Add Idea'}</Button>
		</Cell>
	</LayoutGrid>
</form>
