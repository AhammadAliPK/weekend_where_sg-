<script lang="ts">
	export let class: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeClasses: Record<string, string> = {
		sm: 'text-base font-semibold',
		md: 'text-lg font-semibold',
		lg: 'text-xl font-bold'
	};
</script>

<h3 class={sizeClasses + ' ' + class}>
	<slot />
</h3>
