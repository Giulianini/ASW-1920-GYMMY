import axios from "axios";
import routes from "./components/Routes";
import {io} from "socket.io-client";

export const apiUrl = process.env.REACT_APP_API_URL

export const baseAxios = axios.create()
baseAxios.interceptors.request
    .use((config) => {
        config.baseURL = apiUrl
        config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`
        return config
    })

export const userAxios = axios.create()
userAxios.interceptors.request
    .use((config) => {
        config.baseURL = `${apiUrl}/users/${localStorage.getItem("username")}`
        config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`
        return config
    })


export default function checkApiEndpoint(onMessage, onError) {
    baseAxios.get("/")
        .then(res => onMessage(res.data, apiUrl))
        .catch(err => onError(err))
}


// Add a 401 response interceptor
userAxios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        window.location = `/${routes.login.value}`
    } else if (403 === error.response.status) {
        window.document.write('403 Forbidden')
    } else {
        return Promise.reject(error);
    }
});

export const socket = io(`${apiUrl}?username=${localStorage.getItem("username")}`)

socket.on('welcome', (msg) => {
    console.log(`socket: ${msg}`)
})

