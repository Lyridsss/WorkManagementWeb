import axios from "axios";
import {config} from "../config/index.jsx";
import {tokenService} from "../services/tokenService.jsx";

export const axiosAuthRequest = axios.create({
    baseURL: config.server.baseUrl,
    headers: {
        "Authorization": `Bearer ${tokenService.getToken()}`
    }
})

export const axiosRequest = axios.create({
    baseURL: config.server.baseUrl
})