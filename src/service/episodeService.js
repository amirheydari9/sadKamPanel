import axios from '../plugins/axios'

export function episodeService() {

    const getAllEpisodes = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/episodes')
        } catch (e) {
            console.log(e)
        }
    }
    const getEpisode = async (id) => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/episodes/${id}`)
        } catch (e) {
            console.log(e)
        }
    }

    const createEpisode = async (episode) => {
        try {
            await axios.post('http://sadkam.lincast.ir/api/episodes', episode)
        } catch (e) {
            console.log(e)
        }
    }

    const updateEpisode = async (episode) => {
        try {
            await axios.put('http://sadkam.lincast.ir/api/episodes', episode)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllEpisodes,
        getEpisode,
        createEpisode,
        updateEpisode,
    }
}
