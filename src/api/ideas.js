const fetchJson = async (url, data, method = 'POST') => {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await response.json();
};

export const addIdea = async (idea) => await fetchJson('/api/ideas/new', idea);

export const vote = async (ideaId, userId, isUp) =>
	await fetchJson('/api/ideas/vote', { ideaId, userId, isUp }, 'PATCH');
