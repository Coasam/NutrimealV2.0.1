import { User } from "~~/types";

export function calculateCalorieMaintenance(user: User) {
	const height = user.height
	const weight = user.weight
	const gender = user.gender
	
	let bmr = 0

	if (gender === 'male') {
		bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * user.age)
	} else {
		bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * user.age)
	}
 
	return (bmr * 1.2).toFixed(2)
}