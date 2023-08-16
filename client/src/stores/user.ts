import storageKeys from '@/enums/storage-keys'
import { type IAuth } from '@/interfaces/auth'
import { getMe } from '@/services/auth'
import StorageService from '@/services/local-storage'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: (): IAuth => ({
    id: null,
    email: null,
    name: null,
    role: null
  }),

  actions: {
    async getProfile() {
      const profileRes = await getMe()
      const profileData = profileRes?.data?.result?.data || {}
      this.$patch({
        ...profileData,
      })
    },

    logout() {
      this.$reset()
      StorageService.remove(storageKeys.authProfile)
    },
  },
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }
