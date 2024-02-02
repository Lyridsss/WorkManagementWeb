import {axiosAuthRequest, axiosRequest} from "../utils/axiosRequest.js";
import {useContext} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";

export const useAxiosRequest = () => {
    return axiosRequest
}

export const useAuthAxiosRequest = () => {
    const { token } = useContext(AuthContext)
    return axiosAuthRequest(token)
}