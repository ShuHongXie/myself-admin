import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const someState = ref('hello pinia')
    return { someState }
  },
  {
    persist: true
  }
)
