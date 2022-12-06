import { ObjectId } from 'mongodb';
import { getDb } from '$lib/mongodb-client';
import { respond } from '$lib/respond';

export async function get({ locals, params }) {
	const createResponse = async () => {
		const db = await getDb();

		const idea = await db.collection('ideas').findOne({ _id: new ObjectId(params.id) });
		if (!idea) {
			throw new Error('No idea found');
		}

		const isUserIdea = idea.userId.equals(locals.user._id);
		if (!isUserIdea) {
			throw new Error("Can't edit someone else's idea");
		}

		return {
			body: {
				idea
			}
		};
	};

	return await respond(createResponse);
}
