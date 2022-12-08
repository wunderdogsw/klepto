export type UserType = {
	_id: string;
	name: string;
	email: string;
};

export type IdeaType = {
	_id: string;
	userId: string;
	date: string;
	title: string;
	description: string;
	votes: string[];
};

export type FormType = {
	incorrect: boolean;
} | null;

export enum SORT_ORDER {
	DATE = 'newest',
	POPULARITY = 'popular',
	RANDOM = 'random'
}
