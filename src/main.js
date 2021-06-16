import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Firebase from './firebase'
import VueMask from 'di-vue-mask'
import VueMaterial from 'vue-material'
import './assets/scss/app.scss'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(Firebase)
Vue.config.productionTip = false

// plugins
Vue.use(VueMask)
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
