<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let variant: 'primary' | 'secondary' | 'accent' | 'outline' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let customClass: string = '';

	const dispatch = createEventDispatcher();

	function handleClick(e: MouseEvent) {
		if (!disabled) {
			dispatch('click', e);
		}
	}

	const variantClasses: Record<string, string> = {
		primary: 'bg-primary text-white hover:bg-opacity-90',
		secondary: 'bg-secondary text-white hover:bg-opacity-90',
		accent: 'bg-accent text-white hover:bg-opacity-90',
		outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
	};

	const sizeClasses: Record<string, string> = {
		sm: 'px-3 py-1.5 text-sm rounded-button',
		md: 'px-4 py-2 text-base rounded-button',
		lg: 'px-6 py-3 text-lg rounded-button'
	};

	$: classes = `
		${variantClasses[variant]} ${sizeClasses[size]}
		font-medium rounded-button transition-colors duration-200
		focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
		${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
		${customClass}
	`;
</script>

<button
	{type}
	{disabled}
	class={classes}
	on:click={handleClick}
	aria-disabled={disabled}
>
	<slot />
</button>
