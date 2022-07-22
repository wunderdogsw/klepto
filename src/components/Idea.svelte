<script lang="ts">
	import { onMount } from 'svelte';

	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';
	import Button, { Icon as ButtonIcon } from '@smui/button';

	import Heading from './Heading.svelte';
	import TimeAgo from './TimeAgo.svelte';
	import VoteButton from './VoteButton.svelte';

	export let _id: string;
	export let title: string;
	export let description: string;
	export let votes: string[];
	export let date: string;
	export let user;

	const divId = `idea-${_id}`;

	let open = false;
	let linked = false;

	onMount(() => {
		linked = location.hash === `#${divId}`;
		open = linked;
	});
</script>

<div id={divId} class:linked>
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

	<div class="flex">
		<div class="flex">
			<VoteButton ideaId={_id} {votes} />
			<Button class="button-shaped-round" href={`/#${divId}`}>
				<ButtonIcon class="material-icons">link</ButtonIcon>
			</Button>
		</div>
		<div>
			<span>{user.name}, </span>
			<TimeAgo {date} />
		</div>
	</div>
</div>

<style>
	.linked {
		border: 1px var(--mdc-theme-primary, #ff3e00) solid;
	}

	.flex {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}
</style>
