/* Automatically generated by './build/gen-entry.js' */

// components
import MyComponent from './components/my-component'

// plugins
import UsePlus from './plugins/use-plus'
 
const components = [
  MyComponent
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
  MyComponent,
  UsePlus
}

export default install
 