import { initRequestInstance } from '@myself/utils'

export default initRequestInstance({
  baseURL: import.meta.env.VITE_BASE_URL
})
