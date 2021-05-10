import axios from "axios";

export function authService() {

    const login = async (phone) => {
        try {
            await axios.post('http://sadkam.lincast.ir/users/login', {phone})
        } catch (e) {
            console.log(e)
        }
    }

    const loginCheck = async (phone, code) => {
        try {
            await axios.post('http://sadkam.lincast.ir/users/login_check', {phone, code})
        } catch (e) {
            console.log(e)
        }
    }

    return {
        login,
        loginCheck
    }
}
