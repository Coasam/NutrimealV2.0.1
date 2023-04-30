<template>
	<div class="flex flex-col h-full">
		<div class="form-control">
			<label class="label">
				<span class="label-text text-white">Your Age</span>
			</label>
			<input v-model="age" type="number" placeholder="18" class="input input-bordered" />
		</div>
		<div class="form-control mb-2">
			<label class="label">
					<span class="label-text text-white">Your Height</span>
				</label>
			<label class="input-group w-full justify-center">
				<input v-model="height" type="number" placeholder="5.8" class="input input-bordered w-full" />
				<span class="font-semibold text-white w-24 text-center">ft (in)</span>
			</label>
		</div>

		<button class="btn btn-primary mt-auto" @click="emit('ageHeightInput', { age, height: heightToCm(height) })">
			Confirm
		</button>
	</div>
</template>

<script lang="ts" setup>
const age = ref(0);
const height = ref(0);

function heightToCm(height: number) {
	return height * 30.48;
}

const emit = defineEmits(['ageHeightInput']);
</script>