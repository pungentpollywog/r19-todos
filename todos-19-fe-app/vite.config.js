import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      /* Redirects frontend /api/your-endpoint calls to 
         backend http://localhost:3000/api/your-endpoint */
      '/api': 'http://localhost:3000',
    },
  },
});
