<script lang="ts">
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import { ideas as ideasStore } from '../stores/ideas';
	import { user as userStore } from '../stores/user';

	import Heading from './Heading.svelte';
	import TimeAgo from './TimeAgo.svelte';

	export let _id: string;
	export let title: string;
	export let description: string;
	export let votes: string[];
	export let date: string;
	export let user;

	let open = false;
	$: loved = votes.some((voteUserId) => voteUserId === $userStore._id);

	const handleVote = () => {
		if (loved) {
			ideasStore.voteDown(_id, $userStore._id);
		} else {
			ideasStore.voteUp(_id, $userStore._id);
		}
	};
</script>

<div>
	<Accordion>
		<Panel bind:open>
			<Header>
				<Heading level="h3">
					{title}
				</Heading>
				<IconButton slot="icon" toggle={open}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</Header>
			<Content>{description}</Content>
		</Panel>
	</Accordion>

	<div class="info">
		<IconButton on:click={handleVote}>
			<Icon class="material-icons">{loved ? 'favorite' : 'favorite_border'}</Icon>
			<Badge aria-label="votes">{votes.length}</Badge>
		</IconButton>
		<div>
			<span>{user.name}, </span>
			<TimeAgo {date} />
		</div>
	</div>
</div>

<style>
	.info {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
</style>
