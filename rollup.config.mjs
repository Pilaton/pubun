import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

import { defineConfig } from 'rollup';

/**
 * @type {import('rollup').OutputOptions}
 */
const commonOutput = {
  exports: 'named',
  sourcemap: true,
};

export default defineConfig({
  input: './src/index.ts',
  output: [
    {
      ...commonOutput,
      file: './build/index.js',
      format: 'cjs',
    },
    {
      ...commonOutput,
      file: './build/index.mjs',
      format: 'es',
    },
  ],
  external: ['execa', 'node:path', 'node:fs/promises'],
  plugins: [typescript(), terser()],
});
