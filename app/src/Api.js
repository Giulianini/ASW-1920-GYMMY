import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL
export let jwtToken = undefined

export const baseAxios = axios.create({
    baseURL: apiUrl
})

export const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
})

export default function checkApiEndpoint(onMessage, onError) {
    baseAxios.get("/")
        .then(res => onMessage(res.data, apiUrl))
        .catch(err => onError(err))
}
