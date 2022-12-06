import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client';
import { getPayloadFromJWTCookie } from '$lib/utils';
import { respond } from '$lib/respond';

import dotenv from 'dotenv';
dotenv.config();

export async function post({ request }) {
	const createResponse = async () => {
		const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

		const idea = await request.json();
		const { _id, title, description } = idea;

		const db = await getDb();
		const ideas = db.collection('ideas');
		const filter = { _id: new ObjectId(_id), userId: new ObjectId(userId) };
		const updateDoc = {
			$set: { title, description }
		};

		const result = await ideas.updateOne(filter, updateDoc);

		const didMatch = result.modifiedCount === 1;
		if (!didMatch) {
			throw new Error(`Could not edit idea ${_id} with userId ${userId}`);
		}

		console.log('edit idea', { idea });

		return { body: { idea } };
	};

	return await respond(createResponse);
}
