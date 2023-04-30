<template>
	<div>
		<!-- Put this part before </body> tag -->
		<input v-model="isOpen" type="checkbox" id="sign-up-modal" class="modal-toggle" />
		<label for="sign-up-modal" class="modal">
			<label class="modal-box relative max-w-sm" for="">
				<h3 class="text-2xl font-bold text-center text-white">Sign Up</h3>
				<p class="mb-8 mt-1 text-sm text-center">Welcome to Nutrimeal, Please Sign Up!</p>

				<form @submit.prevent="signUp">
					<div class="flex flex-col space-y-2">
						<label for="email" class="text-sm">E-Mail</label>
						<input v-model="email" type="email" id="email" class="input input-bordered bg-base-200" />
					</div>
					<div class="flex flex-col space-y-2 mb-0">
						<label for="password" class="text-sm">Password</label>
						<input v-model="password" type="password" id="password" class="input input-bordered bg-base-200" />
					</div>
					<button type="submit" class="btn btn-primary w-full mt-8">Register</button>
				</form>
			</label>
		</label>
	</div>
</template>

<script lang="ts" setup>
import { useToast } from 'vue-toastification';
import { useAuth } from '~~/stores/auth';

const auth = useAuth();

const isOpen = ref<boolean>(false);

const email = ref<string>('');
const password = ref<string>('');

function openModal() {
	isOpen.value = true;
}

async function signUp() {
	await auth.register(email.value, password.value);

	// Close modal
	isOpen.value = false;

	// Toast success
	useToast().success('Successfully registered, proceed to login!');
}

defineExpose({
	openModal,
});
</script>