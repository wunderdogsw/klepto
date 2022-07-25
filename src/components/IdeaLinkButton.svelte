<script lang="ts">
	import Button, { Icon as ButtonIcon } from '@smui/button';

	export let ideaId;
	const href = `#${ideaId}`;
</script>

<Button class="button-shaped-round" {href}>
	<ButtonIcon class="material-icons">link</ButtonIcon>
</Button>
