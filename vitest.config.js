import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.test.{js,jsx}'],
    exclude: ['node_modules/**', '_templates/**', '**/attempts/**', 'scripts/**'],
    setupFiles: ['./scripts/test-setup.js'],
    passWithNoTests: true,
  },
});
