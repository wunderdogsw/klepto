<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label, Icon } from '@smui/button';

	import { user as userStore } from '../stores/user';

	import ErrorSnackbar from './InfoSnackbar.svelte';
</script>

<ErrorSnackbar />

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
			{#if $userStore}
				<Button on:click={() => userStore.logout()}>Logout</Button>
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
