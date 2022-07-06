<script lang="ts">
	import { goto } from '$app/navigation';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import CharacterCounter from '@smui/textfield/character-counter';
	import Button from '@smui/button';

	import { ideas as ideasStore } from '../lib/stores';

	let title = '';
	let description = '';

	const handleSubmit = () => {
		ideasStore.add({
			title,
			description
		});
		goto('/');
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<LayoutGrid>
		<Cell span="12">
			<Textfield bind:value={title} label="Title" style="width: 100%;" required />
		</Cell>
		<Cell span="12">
			<Textfield
				textarea
				bind:value={description}
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
			<Button variant="raised">Add Idea</Button>
		</Cell>
	</LayoutGrid>
</form>
