import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Adresse du backend Spring Boot
        changeOrigin: true,
        secure: false
      }
    }
  }
}
);
