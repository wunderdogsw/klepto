import { getDb } from '$lib/server/mongodb-client';
import { convertToJson } from '$lib/server/utils';

export async function load() {
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
	const ideasJson = convertToJson(ideas);

	return { ideas: ideasJson };
}
