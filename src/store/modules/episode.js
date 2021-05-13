import {episodeService} from "../../service/episodeService";

export const namespaced = true;

export const state = {
    episodes: [],
};

export const mutations = {
    SET_EPISODES(state, payload) {
        state.episodes = payload
    },
};

export const getters = {
    getEpisodes(state) {
        return state.episodes
    },
}

export const actions = {
    async fetchAllEpisodes({commit}, productId) {
        try {
            const {data} = await episodeService().getAllEpisodes(productId)
            commit('SET_EPISODES', data.data)
        } catch (e) {
            console.log(e)
        }
    },
};
