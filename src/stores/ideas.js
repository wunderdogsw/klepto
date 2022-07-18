import { writable } from 'svelte/store';
import { randomizeArray, sortArrayByProp } from '../lib/utils';
import { SORT_ORDER } from '../lib/types';

const sortByPopularity = (ideas) => sortArrayByProp(ideas, 'votes');

const sortByDate = (ideas) => sortArrayByProp(ideas, 'date');

const createIdeas = () => {
	const { subscribe, set, update } = writable([]);

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

	const add = async (idea) => {
		const response = await fetch('/api/ideas/new', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(idea)
		});
		const json = await response.json();
		update((ideas) => [json.idea, ...ideas]);
	};

	const edit = (idea) =>
		update((ideas) => ideas.map((item) => (item._id === idea._id ? idea : item)));

	const findById = (id) => ideas.find((item) => item._id === id);

	// TODO
	const voteUp = (id, userId) =>
		update((ideas) =>
			ideas.map((item) => (item._id === id ? { ...item, votes: [...item.votes, userId] } : item))
		);

	// TODO
	const voteDown = (id, userId) =>
		update((ideas) =>
			ideas.map((item) =>
				item._id === id
					? { ...item, votes: item.votes.filter((voteUserId) => voteUserId !== userId) }
					: item
			)
		);

	return {
		subscribe,
		set,
		findById,
		sortBy,
		add,
		edit,
		voteUp,
		voteDown
	};
};

export const ideas = createIdeas();
