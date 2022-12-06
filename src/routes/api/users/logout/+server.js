import * as cookie from 'cookie';

import dotenv from 'dotenv';
dotenv.config();

import { COOKIE_PATH } from '$lib/constants';

export async function POST() {
	const setCookie = cookie.serialize('token', '', {
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 0,
		path: COOKIE_PATH
	});

	return new Response(JSON.stringify({}), {
		headers: {
			'set-cookie': setCookie
		}
	});
}
