import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL

export const baseAxios = axios.create({
    baseURL: apiUrl
})

export const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ciao`
    }
})

export default async function checkApiEndpoint() {
    baseAxios.get("/").then((res) => {
        console.log(`Checking connection to api endpoint: ${apiUrl}\nSite response with: ${res.data}`)
    })
}
