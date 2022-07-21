<script lang="ts">
	import TopBar from '../components/TopBar.svelte';
	import Container from '../components/Container.svelte';
</script>

<TopBar />

<main>
	<Container>
		<h1>About Klepto</h1>
		<p>
			Ever had an amazing idea, but no time to build it? Or are you looking to build something, but
			have no idea?
		</p>
		<p>Well, we've got the solution for you!</p>
		<p>
			Klepto is a space to dump your ideas so that people in need of projects could steal them to
			build something beautiful, whether for fun, education, or profit.
		</p>
		<p>
			By giving up your ideas to the world, you de-clutter your brain and allow idle hands to get
			working and make something new. By stealing an idea, you can help to solve a real need and get
			coding ASAP.
		</p>
		<p>
			This project was made with <a href="https://kit.svelte.dev">SvelteKit</a> by Ido Schacham, a
			freely stolen idea from Mikhail Demin, both employees of
			<a href="https://www.wunderdog.fi">Wunderdog</a>. Ido worked on Klepto while in between
			projects to take Svelte and SvelteKit for a test ride and to learn some MongoDB. He was last
			seen riding somewhere towards the digital sunset.
		</p>
	</Container>
</main>
