import axios from '../plugins/axios'

export function userService() {

    const getAllUsers = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/users')
        } catch (e) {
            console.log(e)
        }
    }

    const createUser = async (user) => {
        try {
            await axios.post('http://sadkam.lincast.ir/users', user)
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser = async (user) => {
        try {
            await axios.post('http://sadkam.lincast.ir/users', user)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllRoles = async () => {
        try {
           return await axios.get('http://sadkam.lincast.ir/users/roles')
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllUsers,
        createUser,
        updateUser,
        getAllRoles
    }
}
