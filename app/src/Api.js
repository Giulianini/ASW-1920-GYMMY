import axios from "axios";
import routes from "./components/Routes";
import {io} from "socket.io-client";

export const apiUrl = process.env.REACT_APP_API_URL

export const baseAxios = axios.create({
    baseURL: apiUrl
})

export const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
})

export const userAxios = axios.create({
    baseURL: `${apiUrl}/users/${localStorage.getItem("username")}`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
})


export default function checkApiEndpoint(onMessage, onError) {
    baseAxios.get("/")
        .then(res => onMessage(res.data, apiUrl))
        .catch(err => onError(err))
}


// Add a 401 response interceptor
authAxios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error)
    if (401 === error.response.status) {
        window.location.href = `${routes.login.value}`
    } else {
        return Promise.reject(error);
    }
});

export const socket = io(`${apiUrl}?username=${localStorage.getItem("username")}`)

socket.on('welcome', (msg) => {
    console.log(`socket: ${msg}`)
})

