import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  host: true,
  server: {
    proxy: {
      // Redirects frontend /api/your-endpoint calls to backend http://localhost:3000/api/your-endpoint 
      '/api': 'http://0.0.0.0:3000',    // for docker containers and local PC OS (0.0.0.0 includes localhost)
    },
  },
});
