import { fetchJson } from '$lib/utils';

export const addIdea = async (idea) => await fetchJson('/api/ideas/new', idea);

export const vote = async (ideaId, isUp) =>
	await fetchJson('/api/ideas/vote', { ideaId, isUp }, 'PATCH');
