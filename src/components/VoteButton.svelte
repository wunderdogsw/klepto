<script lang="ts">
	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { user as userStore } from '../stores/user';

	export let ideaId: string;
	export let votes: string[];

	$: isOn = votes.some((voteUserId) => voteUserId === $userStore._id);

	const handleClick = async () => {
		if (isOn) {
			await ideasStore.voteDown(ideaId, $userStore._id);
		} else {
			await ideasStore.voteUp(ideaId, $userStore._id);
		}
	};
</script>

<IconButton on:click={handleClick}>
	<Icon class="material-icons">{isOn ? 'favorite' : 'favorite_border'}</Icon>
	<Badge aria-label="votes">{votes.length}</Badge>
</IconButton>
