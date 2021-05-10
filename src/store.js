import Vue from 'vue'
import Vuex from 'vuex'
import {authService} from "./service/authService";
import router from "./router";
import {userService} from "./service/userService";
import {organizationService} from "./service/organizationService";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Sidebar_drawer: null,
        Customizer_drawer: false,
        SidebarColor: 'white',
        SidebarBg: '',
        loginPhone: null,
        isAuth: false,
        users: [],
        organizations: []
    },
    getters: {
        getLoginPhone(state) {
            return state.loginPhone
        },
        getIsAuth(state) {
            return state.isAuth
        },
        getUsers(state) {
            return state.users
        },
        getOrganizations(state) {
            return state.organizations
        },
    },
    mutations: {
        SET_SIDEBAR_DRAWER(state, payload) {
            state.Sidebar_drawer = payload
        },
        SET_CUSTOMIZER_DRAWER(state, payload) {
            state.Customizer_drawer = payload
        },
        SET_SIDEBAR_COLOR(state, payload) {
            state.SidebarColor = payload
        },
        SET_LOGIN_PHONE(state, payload) {
            state.loginPhone = payload
        },
        SET_AUTH(state, payload) {
            state.isAuth = payload
        },
        SET_USERS(state, payload) {
            state.users = payload
        },
        SET_ORGANIZATIONS(state, payload) {
            state.organizations = payload
        },
    },
    actions: {
        async login({commit}, phone) {
            try {
                await authService().login(phone)
                commit('SET_LOGIN_PHONE', phone)
                await router.push({name: 'LoginCheck'})
            } catch (e) {
                console.log(e)
            }
        },
        async loginCheck({state, commit}, code) {
            try {
                const {data} = await authService().loginCheck(state.loginPhone, code)
                commit('SET_AUTH', true)
                await authService().setToken(data.token)
                await router.push({name: 'Dashboard'})
            } catch (e) {
                console.log(e)
            }
        },
        async fetchUsers({commit}) {
            try {
                const {data} = await userService().getAllUsers()
                commit('SET_USERS', data.data)
            } catch (e) {
                console.log(e)
            }
        },
        async fetchOrganizations({commit}) {
            try {
                const {data} = await organizationService().getAllOrganization()
                commit('SET_ORGANIZATIONS', data.data)
            } catch (e) {
                console.log(e)
            }
        }
    },
})
