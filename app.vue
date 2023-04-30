<template>
  <div class="max-w-7xl mx-auto">
    <AuthenticationSignIn ref="signIn" />
    <AuthenticationSignUp ref="signUp" />
    <OnboardModal ref="onboarding" />
    <AccountModal ref="accountModal" />

    <NavBar @sign-in="signIn.openModal()" @sign-up="signUp.openModal()" @account-modal="accountModal?.openModal()" />
    
    <div v-if="auth.isLoggedIn" class="max-w-lg mt-24">
      <div class="mb-12 flex gap-x-6 w-full">
        <StatisticCard title="Calorie Intake" icon="fluent-mdl2:calories-add" :value="calculateCalorieMaintenance(auth.user)" description="Your daily calorie intake" />
        <StatisticCard title="Your Weight" icon="material-symbols:weight-outline" :value="auth.user.weight" description="Your current weight" />
        <StatisticCard title="Your Height" icon="mdi:human-male-height" :value="auth.user.height" description="Your current height" />
      </div>

      <MealGenerator />
    </div>

    <div v-else>
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 class="text-4xl font-bold text-center text-white">Welcome to your Weight Journey</h1>
        <p class="text-center mt-3">Please sign in or sign up to get started!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MealGenerator from './components/Meal/MealGenerator.vue';
import OnboardModal from './components/Onboarding/OnboardModal.vue';
import AccountModal from './components/Account/AccountModal.vue';
import { calculateCalorieMaintenance } from '~~/util';
import { useAuth } from './stores/auth';

const auth = useAuth();

const signIn = ref();
const signUp = ref();
const onboarding = ref<InstanceType<typeof OnboardModal>>();
const accountModal = ref<InstanceType<typeof AccountModal>>();

onMounted(async () => {
  /* Check if our user is logged in */
  await auth.fetchUser();

  if (auth.isLoggedIn && !auth.user.onboarded && onboarding.value) {
    onboarding.value?.openModal();
  }
});

// Watch login state and open onboarding modal if user is logged in and not onboarded
watchEffect(() => {
  if (auth.isLoggedIn && !auth.user.onboarded && onboarding.value) {
    onboarding.value?.openModal();
  }
});
</script>