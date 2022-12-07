import { redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getPayloadFromJWTCookie } from '$lib/server/utils';
import { getDb } from '$lib/server/mongodb-client.js';

export const actions = {
	default: async ({ request }) => {
		const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

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
