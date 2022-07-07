<script lang="ts">
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import { ideas as ideasStore } from '../stores/ideas';

	import Heading from './Heading.svelte';
	import TimeAgo from './TimeAgo.svelte';

	export let _id: string;
	export let title: string;
	export let description: string;
	export let votes: number;
	export let name: string;
	export let date: string;
	export let user;

	let open = false;
	let loved = false;

	const handleVote = () => {
		if (loved) {
			ideasStore.voteDown(_id);
		} else {
			ideasStore.voteUp(_id);
		}
		loved = !loved;
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
			<Badge aria-label="votes">{votes}</Badge>
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
