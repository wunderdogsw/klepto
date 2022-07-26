import { fetchJson } from '$lib/utils';

export const add = async (idea) => await fetchJson('/api/ideas/new', idea);

export const edit = async (idea) => await fetchJson('/api/ideas/edit', idea);

export const del = async (id) => await fetchJson(`/delete/${id}`, {}, 'DELETE');

export const vote = async (ideaId, isUp) =>
	await fetchJson('/api/ideas/vote', { ideaId, isUp }, 'PATCH');
