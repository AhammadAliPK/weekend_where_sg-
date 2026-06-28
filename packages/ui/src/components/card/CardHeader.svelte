<script lang="ts">
	export let customClass: string = '';
</script>

<div class="p-md border-b border-neutral-200">
	<div class={`${customClass}`}>
		<slot />
	</div>
</div>
