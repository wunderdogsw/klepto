import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/mongodb-client';
import { convertToJson } from '$lib/server/utils';

export async function load({ parent, params }) {
	const db = await getDb();

	const idea = await db.collection('ideas').findOne({ _id: new ObjectId(params.id) });
	if (!idea) {
		throw error(400, 'No idea found');
	}

	const { user } = await parent();
	const isUserIdea = idea.userId.equals(user._id);
	if (!isUserIdea) {
		throw error(400, "Can't edit someone else's idea");
	}

	return { idea: convertToJson(idea) };
}
