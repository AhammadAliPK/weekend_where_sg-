<script lang="ts">
	export let customClass: string = '';
</script>

<div class={`p-md ${customClass}`}>
	<slot />
</div>
