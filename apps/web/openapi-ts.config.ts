import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://127.0.0.1:4000/swagger-json',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src/apis'
  },
  plugins: ['@hey-api/client-axios']
})
