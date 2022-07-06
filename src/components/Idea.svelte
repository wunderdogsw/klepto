<script lang="ts">
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import formatDistance from 'date-fns/formatDistance';

	import { ideas as ideasStore } from '../stores/ideas';

	import Heading from './Heading.svelte';

	export let id: number;
	export let title: string;
	export let description: string;
	export let votes: number;
	export let date: Date = new Date();

	let open = false;
	let voted = false;

	$: dateDistance = formatDistance(date, new Date(), { addSuffix: true });
	const handleVote = () => {
		console.log({ voted });
		if (voted) {
			ideasStore.voteDown(id);
			voted = false;
		} else {
			ideasStore.voteUp(id);
			voted = true;
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
			<Icon class="material-icons">thumb_up</Icon>
			<Badge aria-label="votes">{votes}</Badge>
		</IconButton>
		<span>
			{dateDistance}
		</span>
	</div>
</div>

<style>
	.info {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
</style>
