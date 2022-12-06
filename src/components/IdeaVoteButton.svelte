<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import { ideas as ideasStore } from '../stores/ideas';

	export let ideaId: string;
	export let votes: string[];

	$: hasVoted = votes.some((voteUserId) => voteUserId === $page.data.user?._id);

	const handleClick = async () => {
		if (!$page.data.user) {
			await goto('/login');
			return;
		}

		if (hasVoted) {
			await ideasStore.removeVote(ideaId, $page.data.user._id);
		} else {
			await ideasStore.addVote(ideaId, $page.data.user._id);
		}
	};
</script>

<IconButton on:click={handleClick}>
	<Icon class="material-icons">{hasVoted ? 'favorite' : 'favorite_border'}</Icon>
	<Badge aria-label="votes">{votes.length}</Badge>
</IconButton>
