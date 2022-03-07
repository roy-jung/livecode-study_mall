import { defineConfig } from 'vite'
import { reactRouterPlugin } from 'vite-plugin-next-react-router'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), reactRouterPlugin()],
})
