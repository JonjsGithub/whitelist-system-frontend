import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//import WindiCSS from 'vite-plugin-windicss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  
  base: "/",

  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ]
    }
  },

  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  
  plugins: [
    vue(),
  ],

  server: {
    cors: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

})
