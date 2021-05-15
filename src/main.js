import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/store'
import './plugins/base'
import VueCookies from 'vue-cookies'
import axios from './plugins/axios'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueConfirmDialog from 'vue-confirm-dialog'

Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.use(VueToast,{
    position: 'top'
});

Vue.use(VueCookies)
window.axios = axios
Vue.config.productionTip = false

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount('#app')
