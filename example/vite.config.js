import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@react-krpano-hooks': resolve(__dirname, '../src/index'),
      'parent-src': resolve(__dirname, '../src')
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/react-krpano-hooks/' : '/',
  build: {
    outDir: 'dist',
  },
}); 