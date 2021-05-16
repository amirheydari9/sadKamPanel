import {assessmentService} from "../../service/assessmentService";

export const namespaced = true;

export const state = {};

export const mutations = {};

export const getters = {}

export const actions = {
    async createAssessment(context, assessment) {
        try {
            return await assessmentService().createAssessment(assessment)
        } catch (e) {
            console.log(e)
        }
    },
    async findAssessmentByEpisodeId(context, episodeId) {
        try {
            return await assessmentService().createAssessment(episodeId)
        } catch (e) {
            console.log(e)
        }
    },
};
