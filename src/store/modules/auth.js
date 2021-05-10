import {authService} from "../../service/authService";
import router from "../../router";

export const namespaced = true;

export const state = {
    loginPhone: null,
    isAuth: false
}

export const getters = {
    getLoginPhone(state) {
        return state.loginPhone
    },
    getIsAuth(state) {
        return state.isAuth
    }
}

export const mutations = {
    SET_LOGIN_PHONE(state, payload) {
        state.loginPhone = payload
    },
    SET_AUTH(state, payload) {
        state.isAuth = payload
    },
}


export const actions = {
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
    }
}
