import axios from "axios";
import {authService} from "./authService";

export function userService() {

    const token = `Bearer ${authService().getToken()}`

    const getAllUsers = async () => {
        try {
            return await axios.get('http://sadkam.lincast.ir/users', {headers: {'Authorization': token}})
        } catch (e) {
            console.log(e)
        }
    }

    const createUser = async (user) => {
        try {
            await axios.put('http://sadkam.lincast.ir/users/login_check', {user}, {headers: {'Authorization': token}})
        } catch (e) {
            console.log(e)
        }
    }

    const updateUser = async (user) => {
        try {
            await axios.post('http://sadkam.lincast.ir/users', {user}, {headers: {'Authorization': token}})
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
