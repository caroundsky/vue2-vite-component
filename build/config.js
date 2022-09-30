const fs = require('fs')
const path = require('path')

function getFilePath(prefixPath) {
  const files = fs.readdirSync(prefixPath)
  let entryFile
  entryFile = files.find((file) => /index\.(jsx?|tsx?)/.test(file))
  if (entryFile) {
    return path.join(prefixPath, entryFile)
  }
}

const componentPrefixPath = path.join(__dirname, '../src/components')
const components = fs.readdirSync(componentPrefixPath).map((pkgName) => {
  let obj = {}
  if (pkgName.indexOf('.') > -1) {
    obj[pkgName.split('.')[0]] = path.join(componentPrefixPath, pkgName)
  } else {
    obj[pkgName] = getFilePath(path.join(componentPrefixPath, pkgName))
  }
  return obj
})

const plusPrefixPath = path.join(__dirname, '../src/plugins')
const plus = fs.readdirSync(plusPrefixPath).map((pkgName) => {
  let obj = {}
  if (pkgName.indexOf('.') > -1) {
    obj[pkgName.split('.')[0]] = path.join(plusPrefixPath, pkgName)
  } else {
    obj[pkgName] = getFilePath(path.join(plusPrefixPath, pkgName))
  }
  return obj
})

module.exports = {
  entryFiles: [...components, ...plus],
  components,
  plugins: plus,
}
