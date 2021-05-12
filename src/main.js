import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'
import './plugins/base'
import VueCookies from 'vue-cookies'
import axios from './plugins/axios'

Vue.use(VueCookies)
window.axios = axios

Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
