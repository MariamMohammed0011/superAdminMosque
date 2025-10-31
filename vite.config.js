import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   // هنا تحدد مسار الـ base العام للمشروع
//   base: '/', // إذا المشروع على الجذر العام. لو على subpath حط '/my-app/'
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5174,
//     proxy: {
//       '/api': {
//         target: 'https://api.devscape.online', // رابط الـ API العام
//         changeOrigin: true,
//         secure: true, // true لأنه HTTPS
//         rewrite: (path) => path.replace(/^\/api/, '/api'), // يحافظ على المسارات
//       },
//     },
//   },
// })
