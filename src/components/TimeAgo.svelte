<script lang="ts">
	import formatDistance from 'date-fns/formatDistance';

	export let date;
	$: ago = formatDistance(new Date(date), new Date(), { addSuffix: true });
</script>

<span>{ago}</span>
