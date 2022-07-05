<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Label, Icon } from '@smui/button';

	import { SORT_ORDER } from '../lib/types';

	import SortButton from './SortButton.svelte';
</script>

<TopAppBar variant="static" color="secondary">
	<Row>
		<Section>
			<Title>Klepto</Title>
		</Section>
		<Section>
			{#each Object.keys(SORT_ORDER) as sortOrderKey}
				<SortButton {sortOrderKey} />
			{/each}
		</Section>
		<Section align="end">
			<Button variant="raised">
				<Label>New Idea</Label>
				<Icon class="material-icons">lightbulb</Icon>
			</Button>
		</Section>
	</Row>
</TopAppBar>
