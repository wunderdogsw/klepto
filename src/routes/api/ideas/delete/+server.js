import { json, error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/mongodb-client';
import { getPayloadFromJWTCookie } from '$lib/server/utils';

import dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
	const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);
	const { _id } = await request.json();

	const db = await getDb();
	const ideas = db.collection('ideas');
	const query = { _id: new ObjectId(_id), userId: new ObjectId(userId) };

	const result = await ideas.deleteOne(query);

	const didDelete = result.deletedCount === 1;
	if (!didDelete) {
		throw error(400, `Could not delete idea ${_id} with userId ${userId}`);
	}

	console.log('delete idea', { _id });

	return json({});
}
