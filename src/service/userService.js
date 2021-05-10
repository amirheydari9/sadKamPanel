import axios from "axios";
export function userService() {

    const getAllUsers = async () => {
        try {
            await axios.get('http://sadkam.lincast.ir/users')
        } catch (e) {
            console.log(e)
        }
    }

    const createUser = async (user) => {
        try {
            await axios.post('http://sadkam.lincast.ir/users/login_check', {user})
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser = async (user) => {
        try {
            await axios.put('http://sadkam.lincast.ir/users', {user})
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllUsers,
        createUser,
        updateUser
    }
}
