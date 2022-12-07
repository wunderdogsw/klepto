import { redirect, invalid, error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { getDb } from '$lib/server/mongodb-client';
import { convertToJson } from '$lib/server/utils';
import { getPayloadFromJWTCookie } from '$lib/server/utils';

import dotenv from 'dotenv';
dotenv.config();

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

export const actions = {
	default: async ({ request }) => {
		const { userId } = await getPayloadFromJWTCookie(process.env.JWT_SECRET, request);

		const data = await request.formData();
		const _id = data.get('_id');
		const title = data.get('title');
		const description = data.get('description');

		const db = await getDb();
		const ideas = db.collection('ideas');
		const filter = { _id: new ObjectId(_id), userId: new ObjectId(userId) };
		const updateDoc = {
			$set: { title, description }
		};

		const result = await ideas.updateOne(filter, updateDoc);

		const didMatch = result.modifiedCount === 1;
		if (!didMatch) {
			return invalid(400, { incorrect: true });
		}

		console.log('edit idea', { _id, title, description });

		throw redirect(303, '/');
	}
};
