<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';

	import Idea from '../components/Idea.svelte';

	import { ideas } from '../stores/ideas';
</script>

<LayoutGrid>
	{#each $ideas as idea}
		{@const { userId, ...props } = idea}
		<Cell span="12">
			<Idea {...props} />
		</Cell>
	{/each}
</LayoutGrid>
