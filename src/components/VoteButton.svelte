<script lang="ts">
	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';
	import { goto } from '$app/navigation';

	import { ideas as ideasStore } from '../stores/ideas';
	import { user as userStore } from '../stores/user';

	export let ideaId: string;
	export let votes: string[];

	$: hasVoted = votes.some((voteUserId) => $userStore?._id && voteUserId === $userStore._id);

	const handleClick = async () => {
		if (!$userStore) {
			await goto('/login');
		}

		if (hasVoted) {
			await ideasStore.removeVote(ideaId, $userStore._id);
		} else {
			await ideasStore.addVote(ideaId, $userStore._id);
		}
	};
</script>

<IconButton on:click={handleClick}>
	<Icon class="material-icons">{hasVoted ? 'favorite' : 'favorite_border'}</Icon>
	<Badge aria-label="votes">{votes.length}</Badge>
</IconButton>
