import { json, error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/mongodb-client';
import { getPayloadFromCookies } from '$lib/server/utils';

export async function POST({ request, cookies }) {
	const { userId } = await getPayloadFromCookies(cookies);
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
