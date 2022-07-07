<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import Idea from '../components/Idea.svelte';

	import { ideas } from '../stores/ideas';
</script>

<LayoutGrid>
	{#each $ideas as idea}
		<Cell span="12">
			<Idea {...idea} />
		</Cell>
	{/each}
</LayoutGrid>
