<script lang="ts">
	import { enhance } from '$app/forms';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';

	export let form;
</script>

<svelte:head>
	<title>Login | Klepto</title>
</svelte:head>

<form method="POST" use:enhance>
	<LayoutGrid>
		<Cell span="12">
			<h1>Login</h1>
		</Cell>
		<Cell span="12">
			{#if form?.incorrect}
				<p>Wrong email and password. Please try again</p>
			{/if}
			<Textfield
				input$name="email"
				value={form?.email ?? ''}
				type="email"
				label="Email"
				style="width: 100%;"
				required
			/>
		</Cell>
		<Cell span="12">
			<Textfield
				input$name="password"
				value=""
				type="password"
				label="Password"
				style="width: 100%;"
				required
			/>
		</Cell>

		<Cell span="12">
			<Button variant="raised">Login</Button>
		</Cell>
		<Cell span="12">
			<p>Don't have a user? Please <a href="/signup">signup</a></p>
		</Cell>
	</LayoutGrid>
</form>
