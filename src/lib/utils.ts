export const fetchJson = async (
	url: string,
	data: unknown = {},
	method = 'POST'
): Promise<unknown> => {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const json = await response.json();

	if (!response.ok) {
		const { message } = json;
		throw new Error(message);
	}

	return json;
};
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
