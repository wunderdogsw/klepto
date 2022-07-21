import * as crypto from 'crypto';
import * as jose from 'jose';
import type { JWTPayload } from 'jose';

export const sortArrayByProp = <T>(array: Array<T>, prop: keyof T) =>
	array.sort((idea1, idea2) => {
		if (idea1[prop] > idea2[prop]) {
			return -1;
		}
		if (idea1[prop] < idea2[prop]) {
			return 1;
		}

		return 0;
	});

// reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export const randomizeArray = <T>(array: Array<T>): Array<T> => {
	const arrayCopy = [...array];
	const length = arrayCopy.length;

	if (length <= 1) {
		return arrayCopy;
	}

	const randomIndex = getRandomInt(length);
	const splicedArray = arrayCopy.splice(randomIndex, 1);
	return splicedArray.concat(randomizeArray(arrayCopy));
};

export const fetchJson = async (url: string, data: unknown, method = 'POST'): Promise<unknown> => {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	return await response.json();
};

export const generateSalt = (): string => crypto.randomBytes(16).toString('hex');

export const generateHash = (password: string, salt: string): string =>
	crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

const stringToUint8Array = (string: string) => new TextEncoder().encode(string);

export const generateJWT = async (secret: string, payload: JWTPayload): Promise<string> => {
	const key = stringToUint8Array(secret);
	return await new jose.SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).sign(key);
};

export const decryptJWT = async (secret: string, jwt: string) => {
	const key = stringToUint8Array(secret);
	return await jose.jwtDecrypt(jwt, key);
};
