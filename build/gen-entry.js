/**
 * Fork from https://github.com/ElemeFE/element/blob/dev/build/bin/build-entry.js
 */
const path = require('path')
const endOfLine = require('os').EOL
const fs = require('fs')
const template = require('lodash/template')
const camelCase = require('lodash/camelCase')
const upperFirst = require('lodash/upperFirst')
const upperCamelCase = (str) => upperFirst(camelCase(str))
const { components, plugins } = require('./config')

function genIndexFile() {
  const MAIN_TEMPLATE = `/* Automatically generated by './build/gen-entry.js' */

// components
<%= importText %>

// plugins
<%= importPlusText %>
 
const components = [
<%= exportText %>
]

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
<%= exportAllText %>
}

export default install
 `
  const COMP_TEMPLATE = `import <%= name %> from './components/<%= pkgName %>'`
  const PLUS_TEMPLATE = `import <%= name %> from './plugins/<%= pkgName %>'`

  const compTplCompiled = template(COMP_TEMPLATE)
  const plusTplCompiled = template(PLUS_TEMPLATE)

  const allImportComponents = []
  const allImportPlugins = []
  const allExportComponents = []
  const allInstallComponents = []

  components.forEach((item) => {
    let [pkgName] = Object.entries(item)[0]
    const name = upperCamelCase(pkgName)
    allImportComponents.push(
      compTplCompiled({
        name,
        pkgName,
      })
    )
    allInstallComponents.push(`  ${name}`)
    allExportComponents.push(`  ${name}`)
  })

  plugins.forEach((item) => {
    let [pkgName] = Object.entries(item)[0]
    const name = upperCamelCase(pkgName)
    allImportPlugins.push(
      plusTplCompiled({
        name,
        pkgName,
      })
    )
    allInstallComponents.push(`  ${name}`)
  })

  const mainTplCompiled = template(MAIN_TEMPLATE)
  const entryFileText = mainTplCompiled({
    importText: allImportComponents.join(endOfLine),
    importPlusText: allImportPlugins.join(endOfLine),
    exportText: allExportComponents.join(',' + endOfLine),
    exportAllText: allInstallComponents.join(',' + endOfLine),
  })

  const OUTPUT_PATH = path.join(__dirname, '../src/index.js')
  fs.writeFileSync(OUTPUT_PATH, entryFileText)
}

genIndexFile()
