import { UseFetchOptions } from 'nuxt/dist/app/composables'
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'
import { useToast } from 'vue-toastification'
import { useAuth } from '~/stores/auth'

export async function useFetchWithAuth<T> (path: string, options: UseFetchOptions<unknown, (res: unknown) => unknown, KeyOfRes<(res: unknown) => unknown>> = {}) {
	const auth = useAuth()

	const headers: Record<string, string> = {}
	if (auth.token && auth.token.length > 0) {
		headers.Authorization = `Bearer ${auth.token}`
	}

	return await useFetchAPI<T>(path, { headers, ...options })
}

export async function useFetchAPI<T> (path: string, options: UseFetchOptions<unknown, (res: unknown) => unknown, KeyOfRes<(res: unknown) => unknown>> = {}) {
	const { data, error } = await useFetch(`/api${path}`, options)

	if (error && error.value) {
		if (error.value.statusCode === 401) {
			useAuth().logout()
			return
		}

		if (error.value.response?._data) {
			useToast().error(error.value.response._data.message)
			throw error.value
		}
	}

	return data.value as T
}
