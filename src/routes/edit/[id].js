import { getDb } from '$lib/mongodb-client';
import { ObjectId } from 'mongodb';

export async function get({ locals, params }) {
	try {
		const db = await getDb();

		const idea = await db.collection('ideas').findOne({ _id: new ObjectId(params.id) });
		const isUserIdea = idea?.userId.equals(locals.user._id);

		if (!isUserIdea) {
			throw new Error("Can't edit someone else's idea");
		}

		return {
			status: 200,
			body: {
				idea
			}
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
