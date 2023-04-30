// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon'],

	css: ['vue-toastification/dist/index.css', 'vue-select/dist/vue-select.css'],

	build: {
		transpile: ['vue-toastification'],
	},

	runtimeConfig: {
		mongoUri: '',
		jwtSecret: '',
		spoonacularKey: '',
	}
})
