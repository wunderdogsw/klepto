<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { info } from '../stores/info';

	export let ideaId: string;
	export let title = '';

	let open = false;

	const handleClick = () => {
		open = true;
	};

	const handleDelete = async () => {
		try {
			await ideasStore.del(ideaId);
			open = false;
			$info = `Deleted "${title}"`;
		} catch (error) {
			if (error instanceof Error) {
				$info = error.message;
			} else if (typeof error === 'string') {
				$info = error;
			}
		}
	};
</script>

<Button on:click={handleClick}>Delete</Button>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	<Title id="simple-title">Delete Idea</Title>
	<Content id="simple-content">Are you sure you would like to delete "{title}"?</Content>
	<Actions>
		<Button on:click={() => (open = false)}>
			<Label>No</Label>
		</Button>
		<Button on:click={handleDelete}>
			<Label>Yes</Label>
		</Button>
	</Actions>
</Dialog>
