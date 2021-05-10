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
            return await axios.post('http://sadkam.lincast.ir/users/login_check', {phone, code})
        } catch (e) {
            console.log(e)
        }
    }

    const setToken = (token) => {
        window.localStorage.setItem('sadKamToken', JSON.stringify(token))
    }

    const RemoveToken = () => {
        window.localStorage.removeItem('sadKamToken')
    }

    const getToken = () => {
        window.localStorage.getItem('sadKamToken')
    }

    return {
        login,
        loginCheck,
        setToken,
        RemoveToken,
        getToken
    }
}
