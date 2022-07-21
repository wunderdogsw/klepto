<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label, Icon } from '@smui/button';

	import { user as userStore } from '../stores/user';
</script>

<TopAppBar variant="static" color="secondary">
	<Row>
		<Section>
			<Title><Button href="/">Klepto</Button></Title>
		</Section>
		{#if $userStore}
			<Section>
				<div>Hey {$userStore.name}!</div>
			</Section>
		{/if}
		<Section align="end">
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
