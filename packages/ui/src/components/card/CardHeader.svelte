<script lang="ts">
	export let class: string = '';
</script>

<div class="p-md border-b border-neutral-200">
	<div class={class}>
		<slot />
	</div>
</div>
