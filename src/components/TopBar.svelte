<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button from '@smui/button';
</script>

<TopAppBar variant="static" color="secondary">
	<Row>
		<Section>
			<Title><Button href="/">Klepto</Button></Title>
		</Section>
		<slot />
	</Row>
</TopAppBar>
