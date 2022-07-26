import { writable } from 'svelte/store';
import { randomizeArray, sortArrayByProp } from '../lib/utils';
import { SORT_ORDER } from '../lib/types';
import * as ideasApi from '../api/ideas';

const sortByPopularity = (ideas) =>
	ideas.sort((idea1, idea2) => {
		if (idea1.votes.length > idea2.votes.length) {
			return -1;
		}
		if (idea1.votes.length < idea2.votes.length) {
			return 1;
		}

		return 0;
	});

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
		const json = await ideasApi.add(idea);
		update((ideas) => [json.idea, ...ideas]);
	};

	const edit = async (idea) => {
		await ideasApi.edit(idea);
		update((ideas) => ideas.map((item) => (item._id === idea._id ? idea : item)));
	};

	const del = async (_id) => {
		await ideasApi.del(_id);
		update((ideas) => ideas.filter((item) => item._id !== _id));
	};

	const addVote = async (id, userId) => {
		await ideasApi.vote(id, true);
		update((ideas) =>
			ideas.map((item) => (item._id === id ? { ...item, votes: [...item.votes, userId] } : item))
		);
	};

	const removeVote = async (id, userId) => {
		await ideasApi.vote(id, false);
		update((ideas) =>
			ideas.map((item) =>
				item._id === id
					? { ...item, votes: item.votes.filter((voteUserId) => voteUserId !== userId) }
					: item
			)
		);
	};

	return {
		subscribe,
		set,
		sortBy,
		add,
		edit,
		del,
		addVote,
		removeVote
	};
};

export const ideas = createIdeas();
