const { createVuePlugin } = require('vite-plugin-vue2')
const cssInjectedByJsPlugin = require('vite-plugin-css-injected-by-js') // 将文件内的style打包进js

module.exports = [createVuePlugin, cssInjectedByJsPlugin]
