<template>
	<div>
		<!-- Put this part before </body> tag -->
		<input v-model="isOpen" type="checkbox" id="sign-in-modal" class="modal-toggle" />
		<label for="sign-in-modal" class="modal">
			<label class="modal-box relative max-w-sm" for="">
				<h3 class="text-2xl font-bold text-center text-white">Sign In</h3>
				<p class="mb-8 mt-1 text-sm text-center">Welcome to Nutrimeal, Please Sign In!</p>

				<form class="space-y-2" @submit.prevent="signIn">
					<div class="flex flex-col space-y-2">
						<label for="email" class="text-sm">E-Mail</label>
						<input v-model="email" type="email" id="email" class="input input-bordered bg-base-200" />
					</div>
					<div class="flex flex-col space-y-2 mb-0">
						<label for="password" class="text-sm">Password</label>
						<input v-model="password" type="password" id="password" class="input input-bordered bg-base-200" />
					</div>
					<label class="label cursor-pointer mt-0 pt-0">
						<span class="label-text">Remember me</span> 
						<input type="checkbox" class="checkbox" />
					</label>
					<button type="submit" class="btn btn-primary w-full">Sign In</button>
				</form>
			</label>
		</label>
	</div>
</template>

<script lang="ts" setup>
import { useAuth } from '~~/stores/auth';

const auth = useAuth();

const isOpen = ref<boolean>(false);

const email = ref<string>('');
const password = ref<string>('');

function openModal() {
	isOpen.value = true;
}

async function signIn() {
	await auth.login(email.value, password.value);

	isOpen.value = false;
}

defineExpose({
	openModal,
});
</script>