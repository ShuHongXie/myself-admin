import { defineStore } from '@minilo/store'
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
