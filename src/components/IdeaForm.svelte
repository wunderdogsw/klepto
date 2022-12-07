<script lang="ts">
	import { enhance } from '$app/forms';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';

	export let idea = { _id: '', title: '', description: '' };
	const isNew = !idea._id;

	export let form;
</script>

<form method="POST" use:enhance>
	{#if form?.incorrect}
		<p>You do not have permissions to edit this idea</p>
	{/if}
	<input type="hidden" name="_id" value={idea._id} />
	<LayoutGrid>
		<Cell span="12">
			<Textfield
				input$name="title"
				label="Title"
				bind:value={idea.title}
				style="width: 100%;"
				required
			/>
		</Cell>
		<Cell span="12">
			<Textfield
				textarea
				input$name="description"
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
