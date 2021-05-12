import axios from '../plugins/axios'

export function organizationService() {

    const getAllOrganization = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/organizations')
        } catch (e) {
            console.log(e)
        }
    }
    const getOrganizationTypes = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/organizations/types')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllOrganization,
        getOrganizationTypes
    }
}
