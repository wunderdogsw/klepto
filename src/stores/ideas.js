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

	const add = ({ title, description }) =>
		update((ideas) => {
			const _id = ideas.length + 1;
			const idea = { title, description, _id, date: new Date(), votes: 0 };
			return [idea, ...ideas];
		});

	const edit = (idea) =>
		update((ideas) => ideas.map((item) => (item._id === idea._id ? idea : item)));

	const findById = (id) => ideas.find((item) => item._id === id);

	const vote = (id, change) =>
		update((ideas) =>
			ideas.map((item) => (item._id === id ? { ...item, votes: item.votes + change } : item))
		);

	const voteUp = (id) => vote(id, 1);

	const voteDown = (id) => vote(id, -1);

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
