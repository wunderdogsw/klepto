import { invalid, redirect } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongodb-client';
import { generateHash, generateJWT } from '$lib/server/utils';

import dotenv from 'dotenv';
dotenv.config();

import { WEEK_IN_SECONDS, COOKIE_PATH } from '$lib/server/constants';

export const actions = {
	default: async ({ request, cookies }) => {
		const db = await getDb();
		const users = db.collection('users');

		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const query = await users.findOne({ email }, { projection: { hash: true, salt: true } });

		const isUserFound = !!query;
		if (!isUserFound) {
			return invalid(400, { email, incorrect: true });
		}

		const { _id, hash, salt } = query;
		const isPasswordValid = hash === generateHash(password, salt);

		if (!isPasswordValid) {
			return invalid(400, { email, incorrect: true });
		}

		const token = await generateJWT(process.env.JWT_SECRET, { userId: _id });
		cookies.set('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: WEEK_IN_SECONDS,
			path: COOKIE_PATH
		});

		console.log('login', { email });

		throw redirect(303, '/');
	}
};
