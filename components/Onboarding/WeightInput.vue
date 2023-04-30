<template>
	<div class="flex flex-col h-full">
		<div class="btn-group mx-auto">
			<button :class="`btn btn-sm normal-case ${unit === 'kg' ? 'btn-active' : ''}`" @click="unit = 'kg'">kg (kilograms)</button>
			<button :class="`btn btn-sm normal-case ${unit === 'lbs' ? 'btn-active' : ''}`" @click="unit = 'lbs'">lbs (pounds)</button>
			<button :class="`btn btn-sm normal-case ${unit === 'st' ? 'btn-active' : ''}`" @click="unit = 'st'">st (stones)</button>
		</div>

		<label class="input-group w-full justify-center my-8">
			<input v-model="weight" type="number" placeholder="87.5" class="input input-bordered" />
			<span class="font-semibold text-white">{{ unit.toUpperCase() }}</span>
		</label>

		<button class="btn btn-primary mt-auto" @click="confirmWeight">
			Confirm
		</button>
	</div>
</template>

<script lang="ts" setup>
const unit = ref('kg');
const weight = ref(0);

function calculateKg(weight: number, unit: string) {
	switch (unit) {
		case 'lbs':
			return weight * 0.453592;
		case 'st':
			return weight * 6.35029;
		default:
			return weight;
	}
}

function confirmWeight() {
	if (weight.value === 0 || weight.value === null) return;

	emit('weightInput', calculateKg(weight.value, unit.value));
}

const emit = defineEmits(['weightInput']);
</script>