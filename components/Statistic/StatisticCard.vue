<template>
	<div class="stat bg-base-300">
		<div class="stat-figure text-primary">
			<Icon :name="icon" class="w-10 h-10" />
		</div>
		<div class="stat-title">{{ title }}</div>
		<div class="stat-value text-white">{{ value }}</div>
		<div class="stat-desc">{{ description || '' }}</div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	/** The title of the statistic */
	title: string;
	/** The value of the statistic */
	value: string | number;
	/** The description of the statistic */
	description?: string;
	/** The icon to display */
	icon: string;
}>();
</script>