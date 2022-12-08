<script lang="ts">
	import { formatDistance } from 'date-fns';

	export let date: string;
	$: ago = formatDistance(new Date(date), new Date(), { addSuffix: true });
</script>

<span>{ago}</span>
