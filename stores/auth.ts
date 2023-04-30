import { defineStore } from 'pinia'
import { User } from '~~/types'

export const useAuth = defineStore('auth', {
	state: () => ({
		user: {} as User,
		isLoggedIn: false,
		token: '' as string
	}),
	actions: {
		async login (email: string, password: string) {
			const { accessToken } = await useFetchAPI<{ accessToken: string }>('/auth', {
				method: 'POST',
				body: JSON.stringify({ email, password })
			})

			this.token = accessToken
			await this.fetchUser()
		},

		async fetchUser () {
			// Fetch user from API
			console.log(this.token)
			const user = await useFetchAPI<User>('/auth/user', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${this.token}`
				}
			})

			if (!user) {
				this.user = {} as User
				this.isLoggedIn = false
				return
			}

			this.user = user
			this.isLoggedIn = true
		},

		async register (email: string, password: string) {
			await useFetchAPI('/auth/register', {
				method: 'PUT',
				body: JSON.stringify({ email, password })
			})
		},

		logout () {
			this.user = {} as User
			this.isLoggedIn = false
			this.token = ''
		}
	},
	persist: true
})
