<script lang="ts">
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';

	import { info as infoStore } from '../stores/info';

	let info: string;
	// unfortunately no type is available in the library :(
	type SnackBarElement = {
		open: () => void;
	};
	let snackBarWithClose: SnackBarElement;

	infoStore.subscribe((value) => {
		if (value) {
			info = value;
			snackBarWithClose.open();
			// clear error store so that if the same error repeats subscribe will be triggerred again
			setTimeout(() => infoStore.set(''), 5 * 1000);
		}
	});
</script>

<Snackbar bind:this={snackBarWithClose}>
	<Label>{info}</Label>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>
