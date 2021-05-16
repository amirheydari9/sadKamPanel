import axios from '../plugins/axios'

export function assessmentService() {

    const createAssessment = async (assessment) => {
        try {
            return await axios.post('http://sadkam.lincast.ir/api/assessment', assessment)
        } catch (e) {
            console.log(e)
        }
    }

    const findAssessmentByEpisodeId = async (episodeId) => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/assessment', episodeId)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        createAssessment,
        findAssessmentByEpisodeId
    }
}
