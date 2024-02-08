import Header from "../components/Header.jsx";
import {useQuery} from "@tanstack/react-query";
import {useContext, useState} from "react";
import {useAuthAxiosRequest} from "../hooks/Request.jsx";
import {AuthContext} from "../context/AuthenticationContext.jsx";


export default function HomePage(){
    const { logout } = useContext(AuthContext)
    const [times, setTimes] = useState(0)
    const authAxiosRequest = useAuthAxiosRequest()
    const { isPending, data } = useQuery({
        queryKey: ["user-home-page", times],
        queryFn: () => {
            return authAxiosRequest
                .get("/account")
                .then(res => res.data)
                .catch(error => {
                    if (error.response.status === 401){
                        logout()
                    }
                })
        }
    })

    const update = () => {
        setTimes(prevState => prevState + 1)
    }

    return (
        <div className="bg-base-100 text-base-content">
            <Header
                data={data}
                isPending={isPending}
                update={update}
            />
        </div>
    )
}