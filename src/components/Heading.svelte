<script lang="ts">
	type Level = 'h1' | 'h2' | 'h3' | 'h4';

	export let level: Level = 'h1';
	export let as = level;
</script>

<svelte:element this={as}><slot /></svelte:element>
