<script context="module">
	export function load({ error }) {
		console.log({ error });
		return {
			props: {
				title: error.message
			}
		};
	}
</script>

<script lang="ts">
	export let title;
</script>

<h1>{title}</h1>
