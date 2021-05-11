import axios from 'axios';
import {authService} from "../service/authService";
import router from "../router";

axios.interceptors.request.use(function (config) {
    const token = authService().getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {

    if (error.response.status === 401) {
        //TODO 401 generator for test it
        authService().removeToken()
        router.push({name: 'Login'})
    }
    if (error.response.status === 404) {
        // router.push({name: 'not-found'})
    }
    if (error.response.status === 403) {
        // router.push({name: 'access-denied'})
    }

    return Promise.reject(error)
})

export default axios
