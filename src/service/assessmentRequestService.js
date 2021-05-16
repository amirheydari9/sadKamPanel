import axios from '../plugins/axios'

export function assessmentRequestService() {

    const getAllAssessmentRequests = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/assessmentRequest')
        } catch (e) {
            console.log(e)
        }
    }
    const getAssessmentRequest = async (id) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/assessmentRequest/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
    const getAssessmentRequestByEpisode = async (episodeId) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/assessmentRequest/find/byEpisode/${episodeId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createAssessmentRequest = async (assessmentRequest) => {
        try {
            return await axios.post('http://sadkam.lincast.ir/api/assessmentRequest', assessmentRequest)
        } catch (e) {
            console.log(e)
        }
    }

    const createFile = async (file) => {
        try {
            return await axios.post('http://sadkam.lincast.ir/api/assessmentRequest/file', file)
        } catch (e) {
            console.log(e)
        }
    }

    const createDialog = async (dialog) => {
        try {
            return await axios.post('http://sadkam.lincast.ir/api/assessmentRequest/dialog', dialog)
        } catch (e) {
            console.log(e)
        }
    }

    const getAssessmentListByStatus = async (status) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/assessmentRequest/find/byStatus/${status}`)
        } catch (e) {
            console.log(e)
        }
    }

    const assignAssessmentRequestToBrokerage = async (assign) => {
        try {
            return await axios.patch(`http://sadkam.lincast.ir/api/assessmentRequest/assign`, assign)
        } catch (e) {
            console.log(e)
        }
    }

    const unAssignAssessmentRequestToBrokerage = async (assessmentRequestId) => {
        try {
            return await axios.patch(`http://sadkam.lincast.ir/api/assessmentRequest/unassign`, assessmentRequestId)
        } catch (e) {
            console.log(e)
        }
    }

    const setStatusOfAssessmentRequest = async (status) => {
        try {
            return await axios.patch(`http://sadkam.lincast.ir/api/assessmentRequest/status`, status)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllAssessmentRequests,
        getAssessmentRequest,
        getAssessmentRequestByEpisode,
        createAssessmentRequest,
        createDialog,
        createFile,
        getAssessmentListByStatus,
        assignAssessmentRequestToBrokerage,
        setStatusOfAssessmentRequest,
        unAssignAssessmentRequestToBrokerage
    }
}
