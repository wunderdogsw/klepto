import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client';

export async function post({ request }) {
	try {
		const db = await getDb();
		const ideas = db.collection('ideas');

		const { title, description } = await request.json();

		const idea = {
			title,
			description,
			votes: [],
			date: new Date(),
			// TODO fix for authentication/authorization
			userId: new ObjectId('62c692648ec3799497ae377e')
		};

		await ideas.insertOne(idea);
		console.log('new idea', { idea });

		return {
			status: 200,
			body: { idea }
		};
	} catch (errors) {
		console.error(errors);
		return {
			status: 400,
			body: { errors }
		};
	}
}
