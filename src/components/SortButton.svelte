<script lang="ts">
	import Button from '@smui/button';

	import { ideas as ideasStore } from '../lib/stores';
	import { SORT_ORDER } from '../lib/types';

	export let sortOrderKey;
</script>

<Button on:click={() => ideasStore.sortBy(sortOrderKey)}>
	{SORT_ORDER[sortOrderKey]}
</Button>
