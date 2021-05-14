import axios from '../plugins/axios'

export function organizationService() {

    const getAllOrganization = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/organizations?count=100')
        } catch (e) {
            console.log(e)
        }
    }

    const createOrganization = async (organization) => {
        try {
            await axios.post('http://sadkam.lincast.ir/api/organizations', organization)
        } catch (e) {
            console.log(e)
        }
    }

    const updateOrganization = async (organization) => {
        try {
            await axios.put('http://sadkam.lincast.ir/api/organizations', organization)
        } catch (e) {
            console.log(e)
        }
    }

    const getOrganizationTypes = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/api/organizations/types')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllOrganization,
        getOrganizationTypes,
        createOrganization,
        updateOrganization
    }
}
