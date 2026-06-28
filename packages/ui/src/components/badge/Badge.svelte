<script lang="ts">
	export let variant: 'success' | 'primary' | 'secondary' | 'warning' | 'error' | 'neutral' = 'primary';
	export let size: 'sm' | 'md' = 'md';
	export let customClass: string = '';

	const variantClasses: Record<string, string> = {
		success: 'bg-success text-white',
		primary: 'bg-primary text-white',
		secondary: 'bg-secondary text-white',
		warning: 'bg-warning text-white',
		error: 'bg-error text-white',
		neutral: 'bg-neutral-500 text-white'
	};

	const sizeClasses: Record<string, string> = {
		sm: 'px-2 py-0.5 text-xs rounded-badge',
		md: 'px-3 py-1 text-sm rounded-badge'
	};

	$: classes = `
		${variantClasses[variant]} ${sizeClasses[size]}
		font-medium rounded-badge inline-flex items-center
		${customClass}
	`;
</script>

<span class={classes}>
	<slot />
</span>
