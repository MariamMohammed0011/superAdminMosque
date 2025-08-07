import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // <-- عدّل الرابط للسيرفر المحلي
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
