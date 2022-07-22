<script lang="ts">
	import { page } from '$app/stores';

	import IdeaForm from '../../components/IdeaForm.svelte';

	const { id } = $page.params;
</script>

<IdeaForm {id} />
