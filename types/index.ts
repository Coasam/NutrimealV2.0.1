export interface User {
	_id: string;
	email: string;
	weight: number;
	height: number;
	age: number;
	gender: string;
	onboarded: boolean;
}

export interface MealPlan {
  meals: Meal[]
  nutrients: Nutrients
}

export interface Meal {
  id: number
  title: string
  imageType: string
  readyInMinutes: number
  servings: number
  sourceUrl: string
}

export interface Nutrients {
  calories: number
  carbohydrates: number
  fat: number
  protein: number
}
