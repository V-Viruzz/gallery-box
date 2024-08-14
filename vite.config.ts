import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), libInjectCss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'gallery-box',
      fileName: 'gallery-box',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
      },
    },
  },
})
