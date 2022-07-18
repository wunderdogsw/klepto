<script lang="ts">
	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { user as userStore } from '../stores/user';

	export let _id: string;
	export let votes: string[];

	$: loved = votes.some((voteUserId) => voteUserId === $userStore._id);

	const handleVote = () => {
		if (loved) {
			ideasStore.voteDown(_id, $userStore._id);
		} else {
			ideasStore.voteUp(_id, $userStore._id);
		}
	};
</script>

<IconButton on:click={handleVote}>
	<Icon class="material-icons">{loved ? 'favorite' : 'favorite_border'}</Icon>
	<Badge aria-label="votes">{votes.length}</Badge>
</IconButton>
