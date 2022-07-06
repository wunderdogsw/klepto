<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
</script>

<TopAppBar variant="static" color="secondary">
	<Row>
		<Section>
			<Title><a href="/">Klepto</a></Title>
		</Section>
		<slot />
	</Row>
</TopAppBar>
