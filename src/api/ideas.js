import { fetchJson } from '$lib/utils';

export const del = async (_id) => await fetchJson(`/api/ideas/delete`, { _id });

export const vote = async (ideaId, isUp) =>
	await fetchJson('/api/ideas/vote', { ideaId, isUp }, 'PATCH');
