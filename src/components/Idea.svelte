<script lang="ts">
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Badge from '@smui-extra/badge';
	import IconButton, { Icon } from '@smui/icon-button';

	import formatDistance from 'date-fns/formatDistance';

	import Heading from './Heading.svelte';

	export let title: string;
	export let description: string;
	export let votes: number;
	export let date: Date = new Date();

	let open: boolean;
	$: dateDistance = formatDistance(date, new Date(), { addSuffix: true });
</script>

<div>
	<Accordion>
		<Panel bind:open>
			<Header>
				<Heading level="h3">
					<IconButton>
						<Icon class="material-icons">thumb_up</Icon>
						<Badge aria-label="votes">{votes}</Badge>
					</IconButton>
					{title}
				</Heading>
				<IconButton slot="icon" toggle pressed={open}>
					<Icon class="material-icons" on>expand_less</Icon>
					<Icon class="material-icons">expand_more</Icon>
				</IconButton>
			</Header>
			<Content>{description}</Content>
		</Panel>
	</Accordion>
	<div>
		{dateDistance}
	</div>
</div>
