<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let options: string[] = [];
	export let value: string | null = null;
	export let placeholder = 'Select an option...';
	export let label = '';
	export let disabled = false;
	export let required = false;
	export let class: string = '';

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		dispatch('change', { value: target.value });
	}

	$: id = `select-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="select-wrapper">
	{#if label}
		<label for={id} class="select-label">
			{label}
			{#if required}
				<span class="required">*</span>
			{/if}
		</label>
	{/if}

	<select
		bind:value
		on:change={handleChange}
		{disabled}
		{required}
		{id}
		class="select-input"
	>
		<option value="" disabled selected>{placeholder}</option>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>

<style>
	.select-wrapper {
		width: 100%;
	}

	.select-label {
		display: block;
		font-size: 14px;
		font-weight: 500;
		color: #212121;
		margin-bottom: 4px;
	}

	.required {
		color: #E63946;
		margin-left: 2px;
	}

	.select-input {
		width: 100%;
		padding: 8px 12px;
		font-size: 16px;
		border: 1px solid #BDBDBD;
		border-radius: 4px;
		background-color: white;
		color: #212121;
		transition: border-color 200ms, box-shadow 200ms;
	}

	.select-input:hover {
		border-color: #757575;
	}

	.select-input:focus {
		outline: none;
		border-color: #3C5D4F;
		box-shadow: 0 0 0 2px rgba(60, 93, 79, 0.2);
	}

	.select-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.select-input::placeholder {
		color: #9E9E9E;
	}
</style>
