<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';

	import { info } from '../stores/info';

	import { login } from '../api/users';

	let email = '';
	let password = '';

	const handleSubmit = async () => {
		try {
			await login(email, password);
		} catch (error) {
			$info = error.message ?? error;
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
		<Cell span="12">
			<p>Don't have a user? Please <a href="/signup">signup</a></p>
		</Cell>
	</LayoutGrid>
</form>
