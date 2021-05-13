import {assessmentRequestService} from "../../service/assessmentRequestService";

export const namespaced = true;

export const state = {
    assessmentRequests: [],
};

export const mutations = {
    SET_ASSESSMENT_REQUESTS(state, payload) {
        state.assessmentRequests = payload
    },
};

export const getters = {
    getAssessmentRequests(state) {
        return state.assessmentRequests
    },
}

export const actions = {
    async fetchAllAssessmentRequests({commit}) {
        try {
            const {data} = await assessmentRequestService().getAllAssessmentRequests()
            commit('SET_ASSESSMENT_REQUESTS', data.data)
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAssessmentRequest({commit}, id) {
        try {
            return await assessmentRequestService().getAssessmentRequest(id)
        } catch (e) {
            console.log(e)
        }
    },

    async fetchAssessmentRequestByEpisode({commit}, id) {
        try {
            return await assessmentRequestService().getAssessmentRequestByEpisode(id)
        } catch (e) {
            console.log(e)
        }
    },

    async createAssessmentRequest({commit}, assessmentRequests) {
        try {
            return await assessmentRequestService().createAssessmentRequest(assessmentRequests)
        } catch (e) {
            console.log(e)
        }
    },

};
