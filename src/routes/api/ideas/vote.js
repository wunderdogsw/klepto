import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client';

export async function patch({ request }) {
	try {
		const db = await getDb();
		const ideas = db.collection('ideas');

		// TODO determine userId securely
		const { ideaId, userId, isUp } = await request.json();
		const filter = { _id: new ObjectId(ideaId) };
		const operation = isUp ? '$push' : '$pull';
		const updateDoc = {
			[operation]: {
				votes: new ObjectId(userId)
			}
		};
		await ideas.updateOne(filter, updateDoc);
		console.log('vote', { ideaId, userId });
		return {
			status: 200
		};
	} catch (errors) {
		console.error(errors);
		return {
			status: 400,
			body: { errors }
		};
	}
}
