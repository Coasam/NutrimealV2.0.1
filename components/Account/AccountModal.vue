<template>
	<div>
		<!-- Put this part before </body> tag -->
		<input v-model="isOpen" type="checkbox" id="account-modal" class="modal-toggle" />
		<label for="account-modal" class="modal">
			<label class="modal-box relative max-w-sm" for="">
				<h3 class="text-2xl font-bold text-center text-white">Your Details</h3>
				<p class="mb-8 mt-1 text-sm text-center">Update your details</p>

				<form class="space-y-2" @submit.prevent="updateDetails">
					<div class="form-control">
						<label class="label">
							<span class="label-text">Height</span>
						</label>
						<label class="input-group">
							<input v-model="height" type="text" class="input input-bordered" />
							<span>ft &amp; in</span>
						</label>
					</div>
					<div class="form-control">
						<label class="label">
							<span class="label-text">Weight</span>
						</label>
						<label class="input-group">
							<input v-model="weight" type="text" class="input input-bordered" />
							<span>lbs</span>
						</label>
					</div>
					<div class="form-control">
						<label class="label">
							<span class="label-text">Age</span>
						</label>
						<input v-model="age" type="text" class="input input-bordered" />
					</div>

					<button type="submit" class="btn btn-primary w-full normal-case mt-12">Save Details</button>
				</form>
			</label>
		</label>
	</div>
</template>

<script lang="ts" setup>
import { useAuth } from '~~/stores/auth';

const auth = useAuth();

const isOpen = ref<boolean>(false);

const weight = ref<number>(auth.user.weight);
const height = ref<number>(Number((auth.user.height / 30.48).toFixed(2)));
const age = ref<number>(auth.user.age);

function openModal() {
	isOpen.value = true;
}

async function updateDetails() {
	useFetchWithAuth('/account/update', {
		method: 'POST',
		body: JSON.stringify({
			weight: weight.value,
			height: height.value * 30.48,
			age: age.value,
		}),
	});

	await auth.fetchUser();

	isOpen.value = false;
}

defineExpose({
	openModal,
});
</script>