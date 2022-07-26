<script lang="ts">
	import { goto } from '$app/navigation';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { info } from '../stores/info';

	export let idea = { title: '', description: '' };
	const isNew = !idea._id;

	const handleSubmit = async () => {
		try {
			if (isNew) {
				await ideasStore.add(idea);
			} else {
				// TODO fix idea editing
				await ideasStore.edit(idea);
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
				style="width: 100%;"
			/>
		</Cell>
		<Cell span="12">
			<span>
				By submitting this form I hereby willfully and with sound mind release this idea to the
				public domain and will not have any copyright or any other claims whatsoever
			</span>
		</Cell>
		<Cell span="12">
			<Button variant="raised">{isNew ? 'Add Idea' : 'Update Idea'}</Button>
		</Cell>
	</LayoutGrid>
</form>
