<script lang="ts">
	import { Section } from '@smui/top-app-bar';
	import Button, { Label, Icon } from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import { ideas as ideasStore } from '../stores/ideas';
	import { SORT_ORDER } from '../lib/types';

	import TopBar from '../components/TopBar.svelte';
	import IdeaGrid from '../components/IdeaGrid.svelte';
	import SortButton from '../components/SortButton.svelte';

	export let ideas = [];

	console.log(ideas);
	ideasStore.set(ideas);
</script>

<TopBar>
	<Section align="end">
		<Button variant="raised" href="/new">
			<Label>New Idea</Label>
			<Icon class="material-icons">lightbulb</Icon>
		</Button>
	</Section>
</TopBar>

<LayoutGrid>
	{#each Object.keys(SORT_ORDER) as sortOrderKey}
		<Cell span="1">
			<SortButton {sortOrderKey} />
		</Cell>
	{/each}
</LayoutGrid>

<main>
	<IdeaGrid />
</main>
