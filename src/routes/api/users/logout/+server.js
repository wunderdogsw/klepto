import { json } from '@sveltejs/kit';
import * as cookie from 'cookie';

import dotenv from 'dotenv';
dotenv.config();

import { COOKIE_PATH } from '$lib/server/constants';

export async function POST() {
	const setCookie = cookie.serialize('token', '', {
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 0,
		path: COOKIE_PATH
	});

	return json(
		{},
		{
			headers: {
				'set-cookie': setCookie
			}
		}
	);
}
