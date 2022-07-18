import clientPromise from '$lib/mongodb-client';

export async function patch({ request }) {
	try {
		const dbConnection = await clientPromise;
		const db = dbConnection.db('klepto');
		const ideas = db.collection('ideas');

		// TODO determine userId securely
		const { _id, userId, hasVoted } = await request.json();
		const filter = { _id };
		const operation = hasVoted ? '$pull' : '$push';
		const updateDoc = {
			[operation]: {
				votes: userId
			}
		};
		ideas.update(filter, updateDoc);
	} catch (errors) {
		console.error(errors);
		return {
			status: 400,
			body: { errors }
		};
	}
}
