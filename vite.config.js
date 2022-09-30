import { defineConfig } from 'vite'

const _baseSet = require('./build/common')

export default defineConfig({
  ..._baseSet,
  plugins: require('./build/plugins').map((plus) => plus()),
  base: './',
  build: {
    ..._baseSet.build,
    sourcemap: true,
    // emptyOutDir: false,
    outDir: 'lib',
    // 常规打包
    lib: {
      entry: './src/index.js',
      name: 'index',
      fileName: (format) => `index.common.js`,
      formats: ['es'],
    },
  },
  server: {
    port: 8080, // 指定端口号
    strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
    proxy: {
      // 开发者服务地址
      '/proxy': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace('/proxy', ''),
      },
    },
  },
})
