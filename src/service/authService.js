import Vue from 'vue'
import jwt_decode from "jwt-decode";
import axios from '../plugins/axios'

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

    const decodeToken = (token) => {
        return jwt_decode(token);
    }

    const setToken = (token) => {
        const decodedToken = decodeToken(token)
        Vue.$cookies.set('sadKamToken', token, decodedToken['expires_in'])
    }

    const removeToken = () => {
        Vue.$cookies.remove('sadKamToken')
    }

    const getToken = () => {
        return Vue.$cookies.get('sadKamToken')
    }

    const existToken = () => {
        return Vue.$cookies.isKey('sadKamToken')
    }

    return {
        login,
        loginCheck,
        decodeToken,
        setToken,
        removeToken,
        getToken,
        existToken,
    }
}
