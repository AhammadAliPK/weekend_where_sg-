<script lang="ts">
	export let customClass: string = '';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeClasses: Record<string, string> = {
		sm: 'text-base font-semibold',
		md: 'text-lg font-semibold',
		lg: 'text-xl font-bold'
	};
</script>

<h3 class={`${sizeClasses[size]} ${customClass}`}>
	<slot />
</h3>
