<script lang="ts">
	export let class: string = '';
</script>

<div class={"p-md " + class}>
	<slot />
</div>
