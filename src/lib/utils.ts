import * as crypto from 'crypto';

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

export const getSalt = (): string => crypto.randomBytes(16).toString('hex');

export const getHash = (password: string, salt: string): string =>
	crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
