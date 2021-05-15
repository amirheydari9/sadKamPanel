import axios from '../plugins/axios'

export function ruleService() {

    const getListRuleOfFile = async (fileId) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/rules/find/byFile/${fileId}?count=100`)
        } catch (e) {
            console.log(e)
        }
    }

    const getListRulesOfAssessmentRequest = async (assessmentRequestId) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/rules/find/${assessmentRequestId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const getListRulesOfAssessment = async (assessmentId) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/rules/find/${assessmentId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createRuleForAssessmentRequest = async (rule) => {
        try {
            return await axios.post(`http://sadkam.lincast.ir/api/rules/forAssessmentRequest`, rule)
        } catch (e) {
            console.log(e)
        }
    }

    const createRuleForAssessment = async (rule) => {
        try {
            return await axios.post(`http://sadkam.lincast.ir/api/rules/forAssessment`, rule)
        } catch (e) {
            console.log(e)
        }
    }

    const updateRule = async (rule) => {
        try {
            return await axios.put(`http://sadkam.lincast.ir/api/rules`, rule)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteRule = async (id) => {
        try {
            return await axios.delete(`http://sadkam.lincast.ir/api/rules/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getListRuleOfFile,
        createRuleForAssessmentRequest,
        updateRule,
        deleteRule,
        getListRulesOfAssessmentRequest,
        getListRulesOfAssessment,
        createRuleForAssessment
    }
}
