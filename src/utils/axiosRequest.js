import axios from "axios";
import {config} from "../config/index.jsx";

export const axiosRequest = axios.create({
    baseURL: config.server.baseUrl
})

export const axiosAuthRequest = (token) => {
    return axios.create({
        baseURL: config.server.baseUrl,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}