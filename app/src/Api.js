import axios from "axios";

export default function initEnvs() {
    const apiUrl = process.env.REACT_APP_API_URL
    console.log(apiUrl)
}

const accessToken="ciao comes tai "
const apiUrl = process.env.REACT_APP_API_URL
console.log(apiUrl)

export const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})