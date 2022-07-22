<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import { ideas as ideasStore } from '../stores/ideas';
	import { SORT_ORDER } from '../lib/types';

	import IdeaGrid from '../components/IdeaGrid.svelte';
	import SortButton from '../components/SortButton.svelte';

	export let ideas = [];

	$ideasStore = ideas;
</script>

<LayoutGrid>
	<Cell span="12">
		<div class="wrapper">
			{#each Object.keys(SORT_ORDER) as sortOrderKey}
				<SortButton {sortOrderKey} />
			{/each}
		</div>
	</Cell>
</LayoutGrid>

<IdeaGrid />

<style>
	.wrapper {
		display: flex;
		gap: 1rem;
	}
</style>
