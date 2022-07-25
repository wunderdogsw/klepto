<script lang="ts">
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import IconButton, { Icon } from '@smui/icon-button';

	import Heading from './Heading.svelte';

	export let open = false;
	export let title = '';
	export let description = '';
</script>

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
