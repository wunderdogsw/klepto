<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button from '@smui/button';

	import { user } from '../stores/user';
</script>

<TopAppBar variant="static" color="secondary">
	<Row>
		<Section>
			<Title><Button href="/">Klepto</Button></Title>
		</Section>
		<Section align="end">
			{#if $user}
				<slot />
			{:else}
				<Button href="/login">Login</Button>
				<Button href="/signup">Signup</Button>
			{/if}
		</Section>
	</Row>
</TopAppBar>
