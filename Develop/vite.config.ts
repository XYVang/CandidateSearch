import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'candidatesearch-n28t.onrender.com',
      '.onrender.com'
    ]
  },
  server: {
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0'
  }
})