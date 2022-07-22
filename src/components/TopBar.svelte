<script lang="ts">
	import { session } from '$app/stores';

	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label, Icon } from '@smui/button';

	import { logout } from '../api/users';
</script>

<TopAppBar variant="static" color="secondary">
	<Row>
		<Section>
			<Title>
				<Button href="/">
					<Icon class="material-icons">psychology</Icon>
					Klepto
				</Button>
			</Title>
		</Section>

		<Section align="end">
			<Button href="/about">About</Button>
			{#if $session.user}
				<Button on:click={logout}>Logout</Button>
				<Button variant="raised" href="/new">
					<Label>New Idea</Label>
					<Icon class="material-icons">lightbulb</Icon>
				</Button>
			{:else}
				<Button href="/login">Login</Button>
				<Button href="/signup">Signup</Button>
			{/if}
		</Section>
	</Row>
</TopAppBar>
