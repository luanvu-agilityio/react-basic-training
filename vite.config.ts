import { defineConfig } from 'vitest/config';
import { defineConfig as viteDefineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(
  viteDefineConfig({
    // ... other Vite configurations
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }),
);
