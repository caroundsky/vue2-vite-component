import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'

new Vue({
  router,
  render: (h) => {
    return h(App)
  },
}).$mount('#app')
