import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  build: {
    outDir: "build",
    sourcemap: true, // Enable sourcemaps for production
  },
  encPrefix: "VITE_",
  plugins: [
    react(),
    envCompatible(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for `src` directory
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:5000', // Use env variable for backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
