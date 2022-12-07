<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import { ideas as ideasStore } from '../stores/ideas';

	export let ideaId: string;
	export let votes: string[];
	const { user } = $page.data;

	$: hasVoted = user && votes.some((voteUserId) => voteUserId === user._id);

	const handleClick = async () => {
		if (!user) {
			await goto('/login');
			return;
		}

		if (hasVoted) {
			await ideasStore.removeVote(ideaId, user._id);
		} else {
			await ideasStore.addVote(ideaId, user._id);
		}
	};
</script>

<IconButton on:click={handleClick}>
	<Icon class="material-icons">{hasVoted ? 'favorite' : 'favorite_border'}</Icon>
	<Badge aria-label="votes">{votes.length}</Badge>
</IconButton>
