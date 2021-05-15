import axios from '../plugins/axios'

export function staticService() {

    const getRulesListData = async () => {
        try {
            return await axios.get(`http://sadkam.lincast.ir/api/staticData/rulesData`)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getRulesListData,
    }
}
