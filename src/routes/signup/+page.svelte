<script lang="ts">
	import { enhance } from '$app/forms';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';

	export let form;
</script>

<svelte:head>
	<title>Signup | Klepto</title>
</svelte:head>

<form method="POST" use:enhance>
	<LayoutGrid>
		<Cell span="12">
			<h1>Signup</h1>
		</Cell>
		<Cell span="12">
			<Textfield
				input$name="name"
				label="Name"
				value={form?.name ?? ''}
				style="width: 100%;"
				required
			/>
		</Cell>
		<Cell span="12">
			{#if form?.incorrect}
				<p>
					This email has already signed up. Please login or signup with a different email address.
				</p>
			{/if}
			<Textfield
				input$name="email"
				type="email"
				label="Email"
				value={form?.email ?? ''}
				style="width: 100%;"
				required
			/>
		</Cell>
		<Cell span="12">
			<Textfield
				input$name="password"
				type="password"
				label="Password"
				value={form?.password ?? ''}
				style="width: 100%;"
				required
			/>
		</Cell>

		<Cell span="12">
			<Button variant="raised">Signup</Button>
		</Cell>
	</LayoutGrid>
</form>
