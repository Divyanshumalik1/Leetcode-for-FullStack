// Preview server used by `npm run play`. PROBLEM_ENTRY points at the problem's App.jsx.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const here = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.PROBLEM_ENTRY) {
  throw new Error('Run this through `npm run play -- <problem>`.');
}

export default defineConfig({
  root: here,
  plugins: [react()],
  resolve: { alias: { '@problem': process.env.PROBLEM_ENTRY } },
  server: {
    open: true,
    fs: { allow: [path.resolve(here, '../..')] },
    proxy: { '/api': 'http://localhost:3000' },
  },
});
