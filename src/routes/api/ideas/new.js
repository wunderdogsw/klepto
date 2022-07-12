import clientPromise from '$lib/mongodb-client';
import { ObjectId } from 'mongodb';

export async function post({ request }) {
	try {
		const dbConnection = await clientPromise;
		const db = dbConnection.db('klepto');
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
			status: 400,
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
