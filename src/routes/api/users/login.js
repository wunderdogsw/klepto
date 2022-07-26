import { getDb } from '$lib/mongodb-client';
import { generateHash, generateJWT } from '$lib/utils';
import { respond } from '$lib/respond';

import * as cookie from 'cookie';

import dotenv from 'dotenv';
dotenv.config();

import { WEEK_IN_SECONDS, COOKIE_PATH } from '$lib/constants';

export async function post({ request }) {
	const createResponse = async () => {
		const db = await getDb();
		const users = db.collection('users');

		const { email, password } = await request.json();

		const query = await users.findOne({ email }, { projection: { hash: true, salt: true } });

		const isUserFound = !!query;
		if (!isUserFound) {
			throw new Error(
				`User ${email} not found. Please fix any typos or signup if you don't have a user`
			);
		}

		const { _id, name, hash, salt } = query;
		const isPasswordValid = hash === generateHash(password, salt);

		if (!isPasswordValid) {
			throw new Error(`Wrong password for ${email}. Please try again`);
		}

		const token = await generateJWT(process.env.JWT_SECRET, { userId: _id });
		const setCookie = cookie.serialize('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: WEEK_IN_SECONDS,
			path: COOKIE_PATH
		});

		console.log('login', { email });

		return {
			headers: {
				'set-cookie': setCookie
			},
			body: {
				user: { _id, name, email }
			}
		};
	};

	return await respond(createResponse);
}
