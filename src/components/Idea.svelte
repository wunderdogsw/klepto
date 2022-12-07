<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import Button from '@smui/button';

	import IdeaAccordion from './IdeaAccordion.svelte';
	import IdeaVoteButton from './IdeaVoteButton.svelte';
	import IdeaLinkButton from './IdeaLinkButton.svelte';
	import IdeaDeleteButton from './IdeaDeleteButton.svelte';
	import TimeAgo from './TimeAgo.svelte';

	export let _id: string;
	export let title: string;
	export let description: string;
	export let votes: string[];
	export let date: string;
	export let user;

	let open = false;
	let linked = false;

	onMount(() => {
		linked = location.hash.endsWith(_id);
		open = linked;
	});
</script>

<div id={_id} class:linked>
	<IdeaAccordion {title} {description} {open} />

	<div class="flex">
		<div class="flex">
			<IdeaVoteButton ideaId={_id} {votes} />
			<IdeaLinkButton ideaId={_id} />
			{#if user._id === $page.data.user?._id}
				<Button href={`/edit/${_id}`}>Edit</Button>
				<IdeaDeleteButton ideaId={_id} {title} />
			{/if}
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
