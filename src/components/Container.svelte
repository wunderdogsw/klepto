<div class="container"><slot /></div>

<style>
	.container {
		margin: 0 auto;
		padding: 1rem 0;
	}

	@media (min-width: 768px) {
		.container {
			padding: 0;
		}
	}

	@media (min-width: 1658px) {
		.container {
			max-width: 1400px;
		}
	}
</style>
