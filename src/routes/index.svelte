<script lang="ts">
	import IdeaGrid from '../components/IdeaGrid.svelte';

	const ideas = [
		{
			title: 'Personal YouTube feed',
			description:
				'I want to input the channels that I want to subscribe to and this feed would generate a feed view for me. No infinite scroll, no time doom scrolling, no random recommendations!',
			votes: 22,
			date: new Date('July 4, 2022 03:24:00')
		},
		{
			title: 'Office coffee rating app',
			description:
				'You could rate the current coffee that is being served at the office. In the end, you could have a cool scoreboard showing what coffee people like at the office.',
			votes: 7,
			date: new Date('December 17, 2021 03:24:00')
		},
		{
			title: 'Everyday Calendar',
			description:
				'This thing https://www.kickstarter.com/projects/simonegiertz/the-every-day-calendar but as a mobile app',
			votes: 0,
			date: new Date('May 2, 2022 03:24:00')
		}
	];
</script>

<IdeaGrid {ideas} />
