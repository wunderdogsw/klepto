import { error } from '@sveltejs/kit';
import { getDb } from '$lib/server/mongodb-client';
import { generateHash, generateJWT } from '$lib/server/utils';

import * as cookie from 'cookie';

import dotenv from 'dotenv';
dotenv.config();

import { WEEK_IN_SECONDS, COOKIE_PATH } from '$lib/server/constants';

export async function POST({ request }) {
	const db = await getDb();
	const users = db.collection('users');

	const { email, password } = await request.json();

	const query = await users.findOne({ email }, { projection: { hash: true, salt: true } });

	const isUserFound = !!query;
	if (!isUserFound) {
		throw error(
			400,
			`User ${email} not found. Please fix any typos or signup if you don't have a user`
		);
	}

	const { _id, name, hash, salt } = query;
	const isPasswordValid = hash === generateHash(password, salt);

	if (!isPasswordValid) {
		throw error(400, `Wrong password for ${email}. Please try again`);
	}

	const token = await generateJWT(process.env.JWT_SECRET, { userId: _id });
	const setCookie = cookie.serialize('token', token, {
		httpOnly: true,
		sameSite: 'strict',
		maxAge: WEEK_IN_SECONDS,
		path: COOKIE_PATH
	});

	console.log('login', { email });

	return new Response(
		JSON.stringify({
			user: { _id, name, email }
		}),
		{
			headers: {
				'set-cookie': setCookie
			}
		}
	);
}
