<script lang="ts">
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';

	import Heading from './Heading.svelte';
	import TimeAgo from './TimeAgo.svelte';
	import VoteButton from './VoteButton.svelte';

	export let _id: string;
	export let title: string;
	export let description: string;
	export let votes: string[];
	export let date: string;
	export let user;

	let open = false;
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
		<VoteButton ideaId={_id} {votes} />
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
