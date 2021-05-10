import Vue from 'vue'
import Vuex from 'vuex'
import * as app from './modules/app'
import * as auth from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        auth
    }
})
