<script lang="ts">
	export let customClass: string = '';
	export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

	const paddingClasses: Record<string, string> = {
		none: '',
		sm: 'p-sm',
		md: 'p-md',
		lg: 'p-lg'
	};

	$: classes = `
		bg-white rounded-card shadow-md border border-neutral-200
		${paddingClasses[padding]}
		${customClass}
	`;
</script>

<div class={classes}>
	<slot />
</div>
