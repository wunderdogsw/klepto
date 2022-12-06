import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client';
import { getPayloadFromJWTCookie } from '$lib/utils';
import { respond } from '$lib/respond';

import dotenv from 'dotenv';
dotenv.config();

export async function post({ request }) {
	const createResponse = async () => {
		const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);
		const { _id } = await request.json();

		const db = await getDb();
		const ideas = db.collection('ideas');
		const query = { _id: new ObjectId(_id), userId: new ObjectId(userId) };

		const result = await ideas.deleteOne(query);

		const didDelete = result.deletedCount === 1;
		if (!didDelete) {
			throw new Error(`Could not delete idea ${_id} with userId ${userId}`);
		}

		console.log('delete idea', { _id });

		return {};
	};

	return await respond(createResponse);
}
