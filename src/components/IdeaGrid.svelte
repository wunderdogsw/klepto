<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import Idea from '../components/Idea.svelte';

	export let ideas;
</script>

<LayoutGrid>
	{#each ideas as idea}
		<Cell span="12">
			<Idea {...idea} />
		</Cell>
	{/each}
</LayoutGrid>
