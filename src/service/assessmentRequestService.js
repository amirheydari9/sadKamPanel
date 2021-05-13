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
            return await axios.get(`http://sadkam.lincast.ir/api/find/byEpisode/${episodeId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createAssessmentRequest = async (assessmentRequest) => {
        try {
            await axios.post('http://sadkam.lincast.ir/api/assessmentRequest', assessmentRequest)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllAssessmentRequests,
        getAssessmentRequest,
        getAssessmentRequestByEpisode,
        createAssessmentRequest,
    }
}
