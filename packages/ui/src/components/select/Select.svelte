<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let options: string[] = [];
	export let value: string | null = null;
	export let placeholder = 'Select an option...';
	export let label = '';
	export let disabled = false;
	export let required = false;
	export let customClass = '';
	export let icon: string = ''; // Optional icon to show

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		dispatch('change', { value: target.value });
	}

	$: id = `select-${Math.random().toString(36).substr(2, 9)}`;
	$: isOpen = false;
</script>

<div class="select-wrapper {customClass}">
	{#if label}
		<label for={id} class="select-label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<div class="select-container">
		<select
			bind:value
			on:change={handleChange}
			{disabled}
			{required}
			{id}
			class="select-input"
			class:has-icon={!!icon}
		>
			<option value="" disabled selected>{placeholder}</option>
			{#each options as option}
				<option value={option}>{option}</option>
			{/each}
		</select>

		{#if icon}
			<div class="select-icon">
				{icon}
			</div>
		{/if}

		<div class="select-arrow">
			<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</div>
</div>

<style>
	.select-wrapper {
		width: 100%;
		position: relative;
	}

	.select-label {
		display: block;
		font-size: 14px;
		font-weight: 600;
		color: #212121;
		margin-bottom: 8px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.required {
		color: #DC2626;
		margin-left: 2px;
		font-weight: bold;
	}

	.select-container {
		position: relative;
		display: flex;
		align-items: center;
	}

	.select-input {
		width: 100%;
		padding: 12px 40px 12px 16px;
		font-size: 16px;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		font-weight: 500;
		color: #212121;
		border: 2px solid #E5E7EB;
		border-radius: 12px;
		background-color: white;
		transition: all 200ms ease;
		cursor: pointer;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		touch-action: manipulation;
		min-height: 48px; /* Touch-friendly */
	}

	.select-input:focus {
		outline: none;
		border-color: #3C5D4F;
		box-shadow: 0 0 0 3px rgba(60, 93, 79, 0.1);
	}

	.select-input:hover:not(:disabled) {
		border-color: #3C5D4F;
		background-color: #FAFAFA;
	}

	.select-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #F5F5F5;
	}

	.select-input.has-icon {
		padding-right: 50px;
	}

	.select-input::placeholder {
		color: #9CA3AF;
		font-weight: 400;
	}

	/* Remove default dropdown arrow in all browsers */
	.select-input::-webkit-calendar-picker-indicator {
		display: none;
	}

	.select-input::-ms-expand {
		display: none;
	}

	.select-icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.select-icon.has-value {
		left: 12px;
	}

	.select-input.has-icon {
		padding-left: 40px;
	}

	.select-arrow {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		color: #6B7280;
		transition: transform 200s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.select-wrapper:hover .select-arrow {
		color: #3C5D4F;
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.select-label {
			color: #E5E7EB;
		}

		.select-input {
			background-color: #1F2937;
			border-color: #374151;
			color: #F9FAFB;
		}

		.select-input:hover:not(:disabled) {
			background-color: #374151;
			border-color: #3C5D4F;
		}

		.select-input::placeholder {
			color: #6B7280;
		}
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.select-input {
			font-size: 18px; /* Prevent iOS zoom on focus */
			min-height: 52px; /* Even larger on mobile */
			padding: 16px 40px 16px 16px;
		}

		.select-wrapper:active .select-input {
			transform: scale(0.98);
		}
	}
</style>
