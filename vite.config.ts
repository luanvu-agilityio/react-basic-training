import { defineConfig } from 'vitest/config';
import { defineConfig as viteDefineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(
  viteDefineConfig({
    // ... other Vite configurations
    plugins: [tsconfigPaths()],
    base: process.env.VITE_BASE_PATH || '/react-basic-training',
  }),
);
