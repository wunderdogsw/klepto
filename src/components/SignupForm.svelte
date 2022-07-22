<script lang="ts">
	import { goto } from '$app/navigation';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';

	import { signup } from '../api/users';
	import { info } from '../stores/info';

	let name = '';
	let email = '';
	let password = '';

	const handleSubmit = async () => {
		try {
			await signup(name, email, password);
			await goto('/');
		} catch (error) {
			$info = error.message ?? error;
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<LayoutGrid>
		<Cell span="12">
			<h1>Signup</h1>
		</Cell>
		<Cell span="12">
			<Textfield name="name" label="Name" bind:value={name} style="width: 100%;" required />
		</Cell>
		<Cell span="12">
			<Textfield
				name="email"
				type="email"
				label="Email"
				bind:value={email}
				style="width: 100%;"
				required
			/>
		</Cell>
		<Cell span="12">
			<Textfield
				name="password"
				type="password"
				label="Password"
				bind:value={password}
				style="width: 100%;"
				required
			/>
		</Cell>

		<Cell span="12">
			<Button variant="raised">Signup</Button>
		</Cell>
	</LayoutGrid>
</form>
