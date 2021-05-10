import {authService} from "../../service/authService";

export const namespaced = true;

export const state = {}
export const mutations = {
    // SET_SIDEBAR_DRAWER(state, payload) {
    //     state.Sidebar_drawer = payload
    // },
    // SET_CUSTOMIZER_DRAWER(state, payload) {
    //     state.Customizer_drawer = payload
    // },
    // SET_SIDEBAR_COLOR(state, payload) {
    //     state.SidebarColor = payload
    // }
}
export const actions = {
    async login({commit}, payload) {
        await authService().login(payload)
    },
    async loginCheck({commit}, payload) {
        await authService().loginCheck(payload)
    }
}
