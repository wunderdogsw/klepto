# Klepto

Simple website for sharing project ideas for others to steal, whether for education, fun, or profit.

The stack is based on [Svelte](https://svelte.dev), [SvelteKit](https://kit.svelte.dev), [MongoDB](https://www.mongodb.com), and [Svelte Material UI](https://sveltematerialui.com).

## Setup

1. Install packages with `npm install` (or `pnpm install` or `yarn`)
2. Setup MongoDB or [sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
3. Create a new MongoDB database and initialize two collections: `users` and `ideas`
4. Copy `.env.example` to `.env` and fill in all the relevant env variables

## Developing

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
