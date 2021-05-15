import {assessmentRequestService} from "../../service/assessmentRequestService";

export const namespaced = true;

export const state = {
    assessmentRequests: [],
    submitted: [],
    inqueu: [],
    assigned: [],
    confirmed: [],
    working: [],
    completed: [],

};

export const mutations = {
    SET_ASSESSMENT_REQUESTS(state, payload) {
        state.assessmentRequests = payload
    },
    SET_SUBMITTED(state, payload) {
        state.submitted = payload
    },
    SET_INQUEU(state, payload) {
        state.inqueu = payload
    },
    SET_ASSIGNED(state, payload) {
        state.assigned = payload
    },
    SET_CONFIRMED(state, payload) {
        state.confirmed = payload
    },
    SET_WORKING(state, payload) {
        state.working = payload
    },
    SET_COMPLETED(state, payload) {
        state.completed = payload
    },
};

export const getters = {
    getAssessmentRequests(state) {
        return state.assessmentRequests
    },
    getSubmitted(state) {
        return state.submitted
    },
    getInqueu(state) {
        return state.inqueu
    },
    getAssigned(state) {
        return state.assigned
    },
    getConfirmed(state) {
        return state.confirmed
    },
    getWorking(state) {
        return state.working
    },
    getCompleted(state) {
        return state.completed
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
    async fetchAssessmentRequest(context, id) {
        try {
            return await assessmentRequestService().getAssessmentRequest(id)
        } catch (e) {
            console.log(e)
        }
    },

    async fetchAssessmentRequestByEpisode(context, id) {
        try {
            return await assessmentRequestService().getAssessmentRequestByEpisode(id)
        } catch (e) {
            console.log(e)
        }
    },

    async createAssessmentRequest(context, assessmentRequests) {
        try {
            return await assessmentRequestService().createAssessmentRequest(assessmentRequests)
        } catch (e) {
            console.log(e)
        }
    },

    async fetchAssessmentListByStatus({commit}, status) {
        try {
            const {data} = await assessmentRequestService().getAssessmentListByStatus(status)
            switch (status) {
                case 0:
                    commit('SET_SUBMITTED', data.data)
                    break
                case 1:
                    commit('SET_INQUEU', data.data)
                    break
                case 2:
                    commit('SET_ASSIGNED', data.data)
                    break
                case 3:
                    commit('SET_CONFIRMED', data.data)
                    break
                case 4:
                    commit('SET_WORKING', data.data)
                    break
                case 5:
                    commit('SET_COMPLETED', data.data)
                    break
            }
        } catch (e) {
            console.log(e)
        }
    },

    async assignAssessmentRequestToBrokerage(context, assign) {
        try {
            return await assessmentRequestService().assignAssessmentRequestToBrokerage(assign)
        } catch (e) {
            console.log(e)
        }
    },

    async setStatusOfAssessmentRequest(context, status) {
        try {
            return await assessmentRequestService().setStatusOfAssessmentRequest(status)
        } catch (e) {
            console.log(e)
        }
    },

};
