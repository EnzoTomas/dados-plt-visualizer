import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // ESTA LINHA É A MAIS IMPORTANTE PARA O DEPLOY
  base: '/dados-plt-visualizer/', 
  
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})