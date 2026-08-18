import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const assetFileNames = (assetInfo: { names: string[] }) => {
  // ✅ important:
  // flatten all css files into one "styles" dir and strip '.module' from names
  // because otherwise app bundlers will treat these files as real CSS modules and do another hashing
  const assetName = assetInfo.names[0].split('/').pop();
  return assetName?.endsWith('.css')
    ? `styles/${assetName.replace('.module', '')}`
    : 'assets/[name][extname]';
};

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [
    externalizeDeps(),
    dts({
      tsconfigPath: './tsconfig.json',
      entryRoot: 'src',
      include: ['src'],
      outDirs: 'dist/types',
      exclude: ['src/**/*.test.*', 'src/**/*.stories.*']
    })
  ],
  build: {
    target: 'es2020',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: 'src/index.ts',
        'theme/index': 'src/theme/index.ts'
      }
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: 'esm/[name].mjs',
          chunkFileNames: 'esm/[name].mjs',
          assetFileNames
        },
        {
          format: 'cjs',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: 'cjs/[name].cjs',
          chunkFileNames: 'cjs/[name].cjs',
          assetFileNames
        }
      ]
    }
  },
  css: {
    modules: {
      generateScopedName: '[hash:base64:8]'
    }
  }
});
