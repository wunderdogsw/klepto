<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import { ideas as ideasStore } from '../stores/ideas';
	import { SORT_ORDER } from '../types';
	import type { IdeaType } from '../types';

	import IdeaGrid from '../components/IdeaGrid.svelte';
	import SortButton from '../components/SortButton.svelte';

	type DataType = {
		ideas: IdeaType[];
	};
	export let data: DataType;
	$ideasStore = data.ideas ?? [];
</script>

<svelte:head>
	<title>Steal Great Ideas | Klepto</title>
</svelte:head>

<LayoutGrid>
	<Cell span={12}>
		<div class="wrapper">
			<SortButton sortOrderKey={SORT_ORDER.DATE} />
			<SortButton sortOrderKey={SORT_ORDER.POPULARITY} />
			<SortButton sortOrderKey={SORT_ORDER.RANDOM} />
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
