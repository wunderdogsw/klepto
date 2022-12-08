import { ObjectId } from 'mongodb';
import { redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongodb-client.js';
import { getPayloadFromCookies } from '$lib/server/utils';

export const actions = {
	default: async ({ cookies, request }) => {
		const { userId } = await getPayloadFromCookies(cookies);

		const db = await getDb();
		const ideas = db.collection('ideas');

		const data = await request.formData();
		const title = data.get('title');
		const description = data.get('description');

		const idea = {
			title,
			description,
			votes: [],
			date: new Date(),
			userId: new ObjectId(userId)
		};

		await ideas.insertOne(idea);
		console.log('new idea', idea);

		throw redirect(303, '/');
	}
};
