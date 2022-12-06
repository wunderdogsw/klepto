import { getDb } from '$lib/mongodb-client';
import { respond } from '$lib/respond';

export async function get() {
	const createResponse = async () => {
		const db = await getDb();
		const pipeline = [
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$set: {
					user: { $arrayElemAt: ['$user', 0] }
				}
			},
			{
				$project: {
					user: {
						hash: 0,
						salt: 0
					}
				}
			}
		];

		const ideas = await db.collection('ideas').aggregate(pipeline).sort({ date: -1 }).toArray();

		return {
			body: {
				ideas
			}
		};
	};

	return await respond(createResponse);
}
