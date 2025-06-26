import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // A linha abaixo SÓ é necessária para publicar no GitHub Pages.
  // Vamos deixá-la comentada enquanto desenvolvemos localmente.
  // base: '/pallet-data-visualizer-11-main/', 
  
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})