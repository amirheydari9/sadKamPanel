import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import appStore from './store'
import './plugins/base'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
// import axios from "./plugins/axios";
import axios from "axios";
window.axios = axios

Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    appStore,
    router,
    render: h => h(App)
}).$mount('#app')
