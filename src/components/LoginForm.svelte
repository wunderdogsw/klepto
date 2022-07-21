<script lang="ts">
	import { goto } from '$app/navigation';

	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';

	import { login } from '../api/users';

	let email = '';
	let password = '';

	const handleSubmit = async () => {
		try {
			await login(email, password);
			await goto('/');
		} catch (error) {
			// TODO show error message
			console.error(error);
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<LayoutGrid>
		<Cell span="12">
			<h1>Login</h1>
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
			<Button variant="raised">Login</Button>
		</Cell>
	</LayoutGrid>
</form>
