<template>
	<div class="flex gap-x-4 justify-evenly">
		<button class="p-4 bg-base-300 rounded-md text-center w-full" @click="emit('genderSelected', 'male')">
			<img src="~/assets/img/man.png" class="h-32 mx-auto" />
			<p class="text-lg text-white mt-4">
				Male
			</p>
		</button>
		<button class="p-4 bg-base-300 rounded-md first-letter:text-center w-full" @click="emit('genderSelected', 'female')">
			<img src="~/assets/img/woman.png" class="h-32 mx-auto" />
			<p class="text-lg text-white mt-4">
				Female
			</p>
		</button>
	</div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['genderSelected']);
</script>