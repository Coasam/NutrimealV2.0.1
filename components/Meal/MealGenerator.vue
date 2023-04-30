<template>
	<div class="card w-[72rem] bg-base-200 rounded-md">
		<div class="card-body">
			<h2 class="card-title text-white font-bold gap-x-12">
				Meal Generator
				
				<div class="flex-grow flex gap-2">
					<v-select class="flex-grow" :options="intolerances" v-model="selectedIntolerances" label="Intolerances" multiple></v-select>
					<v-select class="flex-grow" :options="diet" v-model="selectedDiet" label="Diet"></v-select>
				</div>
			</h2>
			<p class="mb-4">Generate a meal plan for your specific caloric intake</p>
			
			<button v-show="!generatedMeal?.meals.length" class="btn btn-primary btn-sm w-32 mx-auto my-10" @click="generateMealPlan()">Generate</button>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-x-8">

				<a :href="meal.sourceUrl" target="_blank" v-for="meal in generatedMeal?.meals" :key="meal.id" class="card bg-base-300 rounded-md">
					<figure><img :src="`https://webknox.com/recipeImages/${meal.id}-556x370.${meal.imageType}`" alt="Meal Image" class="rounded-t-md" /></figure>

					<div class="card-body px-4 py-3">
						<h2 class="card-title text-white font-bold mb-4">{{ meal.title }}</h2>

						<div class="card-actions items-end">
							<div class="badge badge-outline">{{ meal.readyInMinutes }} mins</div> 
							<div class="badge badge-outline">{{ meal.servings }} servings</div>
						</div>
					</div>
				</a>
			</div>

			<div class="card-actions justify-end mt-6 text-white">
				<button v-show="generatedMeal?.meals.length" class="btn btn-primary btn-circle btn-sm mr-auto" @click="generateMealPlan()">
					<Icon name="heroicons:arrow-path" class="w-5 h-5" />
				</button>

      	<div class="badge badge-outline">Calories - {{ generatedMeal?.nutrients.calories }}</div> 
      	<div class="badge badge-outline">Protein - {{ generatedMeal?.nutrients.protein }}</div>
      	<div class="badge badge-outline">Carbs - {{ generatedMeal?.nutrients.carbohydrates }}</div>
				<div class="badge badge-outline">Fat - {{ generatedMeal?.nutrients.fat }}</div>
	    </div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import vSelect from 'vue-select'

import { calculateCalorieMaintenance } from '~~/util';
import { useAuth } from '~~/stores/auth';
import { MealPlan } from '~~/types'

const auth = useAuth()
 
const intolerances = ['Dairy','Egg','Gluten','Grain','Peanut','Seafood','Sesame','Shellfish','Soy','Sulfite','Tree Nut','Wheat']
const diet = ['Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian','Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo', 'Primal', 'Whole30']

const generatedMeal = ref<MealPlan>()

const selectedIntolerances = ref([])
const selectedDiet = ref('')

// A function that generates a meal plan
async function generateMealPlan() {
	const mealPlan = await useFetchWithAuth<MealPlan>('/meal/generate', {
		method: 'POST',
		body: JSON.stringify({
			diet: selectedDiet.value,
			exclude: selectedIntolerances.value,
			timeFrame: 'day'
		})
	})

	generatedMeal.value = mealPlan
}

</script>