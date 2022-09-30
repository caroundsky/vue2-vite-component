const { defineConfig, build } = require('vite')
const { entryFiles } = require('./config')
const _baseSet = require('./common')

const baseConfig = defineConfig({
  configFile: false,
  ..._baseSet,
})

// 全量打包构建
const buildAll = async (input) => {
  const keyValues = Object.entries(input)[0]
  await build({
    ...baseConfig,
    plugins: require('./plugins').map((plus) => plus()),
    build: {
      ..._baseSet.build,
      sourcemap: true,
      // emptyOutDir: false,
      outDir: `lib/${keyValues[0]}`,
      lib: {
        entry: keyValues[1],
        name: 'TmsComponent', // 构建依赖包的时候， 对外暴露的名称
        fileName: (format) => `index.js`,
        formats: ['esm'],
      },
    },
  })
}

const myBuild = async () => {
  for (let index = 0; index < entryFiles.length; index++) {
    await buildAll(entryFiles[index])
  }
}

myBuild()
