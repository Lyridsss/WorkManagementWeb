import {useQuery} from "@tanstack/react-query";
import {axiosAuthRequest} from "../utils/axiosRequest.js";
import {useContext} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import {config} from "../config/index.jsx";


export default function HomePage(){
    const { token, logout } = useContext(AuthContext)
    const { isPending, data } = useQuery({
        queryKey: ["account"],
        queryFn: () => {
            return axiosAuthRequest(token)
                .get("/account")
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status === 401){
                        logout()
                    }
                })
        }
    })
    if (isPending){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1 className="text-red-500">
                {data.name}
            </h1>
        </div>
    )
}