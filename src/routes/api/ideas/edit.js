import { getDb } from '$lib/mongodb-client';
import { getPayloadFromJWTCookie } from '$lib/utils';

import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
dotenv.config();

export async function post({ request }) {
	try {
		const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

		const idea = await request.json();
		const { _id, title, description } = idea;

		const db = await getDb();
		const ideas = db.collection('ideas');
		const filter = { _id: new ObjectId(_id), userId: new ObjectId(userId) };
		const updateDoc = {
			$set: { title, description }
		};

		await ideas.updateOne(filter, updateDoc);
		console.log('edit idea', { idea });

		return {
			status: 200,
			body: { idea }
		};
	} catch (error) {
		console.error(error);
		const { message } = error;
		return {
			status: 400,
			body: { error: { message } }
		};
	}
}
