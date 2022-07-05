<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label, Icon } from '@smui/button';
</script>

<TopAppBar variant="static" color="secondary">
	<Row>
		<Section>
			<Title>Klepto</Title>
		</Section>
		<Section align="end">
			<Button variant="raised">
				<Label>New Idea</Label>
				<Icon class="material-icons">lightbulb</Icon>
			</Button>
		</Section>
	</Row>
</TopAppBar>

<main>
	<slot />
</main>

<style>
</style>
