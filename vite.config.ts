import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

export default defineConfig({
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@wasm': resolve(__dirname, 'node_modules', '@rhwp', 'core'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 7700,
    allowedHosts: true,
    fs: {
      allow: ['..'],
    },
  },
});
