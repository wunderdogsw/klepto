import { writable } from 'svelte/store';
import { randomizeArray, sortArrayByProp } from './utils';
import { SORT_ORDER } from './types';

export const sortOrder = writable(SORT_ORDER.POPULARITY);

const defaultIdeas = [
	{
		title: 'Personal YouTube feed',
		description:
			'I want to input the channels that I want to subscribe to and this feed would generate a feed view for me. No infinite scroll, no time doom scrolling, no random recommendations!',
		votes: 3,
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
			'This thing https://www.kickstarter.com/projects/simonegiertz/the-every-day-calendar as a mobile app',
		votes: 0,
		date: new Date('May 2, 2022 03:24:00')
	}
];

const sortByPopularity = (ideas) => sortArrayByProp(ideas, 'votes');

const sortByDate = (ideas) => sortArrayByProp(ideas, 'date');

const createIdeas = (value) => {
	const { subscribe, update } = writable(sortByPopularity(value));

	const sortBy = (sortOrderKey) => {
		const sortOrder = SORT_ORDER[sortOrderKey];

		switch (sortOrder) {
			case SORT_ORDER.POPULARITY:
				update(sortByPopularity);
				break;
			case SORT_ORDER.DATE:
				update(sortByDate);
				break;
			case SORT_ORDER.RANDOM:
				update(randomizeArray);
				break;
			default:
		}
	};

	return {
		subscribe,
		sortBy
	};
};

export const ideas = createIdeas(defaultIdeas);
