<script lang="ts">
	import Button from '@smui/button';

	import { ideas as ideasStore } from '../stores/ideas';

	export let sortOrderKey: string;
</script>

<Button variant="unelevated" on:click={() => ideasStore.sortBy(sortOrderKey)}>
	{sortOrderKey}
</Button>
