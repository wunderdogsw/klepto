<script lang="ts">
	import IdeaGrid from '../components/IdeaGrid.svelte';

	import { ideas as ideasStore } from '../lib/stores';

	let ideas = [];

	ideasStore.subscribe((value) => (ideas = value));
</script>

<IdeaGrid {ideas} />
