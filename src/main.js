import Vue from 'vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  render: (createElement) => createElement('router-view')
}).$mount('#app')
