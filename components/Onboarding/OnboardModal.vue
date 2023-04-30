<template>
	<div>
		<!-- Put this part before </body> tag -->
		<input v-model="isOpen" type="checkbox" id="sign-in-modal" class="modal-toggle" />
		<div class="modal">
			<label class="modal-box relative max-w-sm" for="">
				<h3 class="text-2xl font-bold text-center text-white">Onboarding</h3>
				<p class="mb-8 mt-1 text-sm text-center">Please fill in as much detail as possible</p>
				<transition-group tag="div" class="max-w-sm h-56 overflow-hidden relative" name="slide">
					<div v-show="currentStep === 0">
						<GenderSelection  class="absolute top-0 right-0 left-0 bottom-0" @gender-selected="setGender" />
					</div>

					<div v-show="currentStep === 1">
						<WeightInput class="absolute top-0 right-0 left-0 bottom-0" @weight-input="setWeight" />
					</div>

					<div v-show="currentStep === 2">
						<AgeSelection class="absolute top-0 right-0 left-0 bottom-0" @age-height-input="finishOnboard" />
					</div>
				</transition-group>
			</label>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification';
import { useAuth } from '~~/stores/auth';
import AgeSelection from './AgeSelection.vue';
import GenderSelection from './GenderSelection.vue';
import WeightInput from './WeightInput.vue';

const toast = useToast();
const auth = useAuth();

const isOpen = ref<boolean>(false);

const currentStep = ref<number>(0);

const gender = ref<string>('');
const weight = ref<number>(0);
const age = ref<number>(0);
const height = ref<number>(0);

function openModal() {
	isOpen.value = true;
}

function nextStep() {
	currentStep.value++;
}

function previousStep() {
	currentStep.value--;
}

function setGender(selection: string) {
	gender.value = selection;

	nextStep();
}

function setWeight(amount: number) {
	weight.value = amount;

	nextStep();
}

async function finishOnboard(amount: { age: number, height: number }) {
	age.value = amount.age;
	height.value = amount.height;

	nextStep();

	useFetchWithAuth('/account/update', {
		method: 'POST',
		body: JSON.stringify({ age: age.value, weight: weight.value, gender: gender.value, height: height.value }),
	})
	.then(async () => {
		// Close Modal
		await auth.fetchUser();
		isOpen.value = false;

		toast.success('Welcome to the app! 🎉');

	})
	.catch(() => {
		toast.error('Something went wrong, please try again later.');
	});
}

defineExpose({
	openModal,
});
</script>

<style scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.3s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>