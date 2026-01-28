import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // This removes '/api' from the path before sending to Express
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
