import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import {useAuthAxiosRequest} from "../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import Header from "../components/Header.jsx";
import {Outlet} from "react-router-dom";

export default function WorkspacesPage(){
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
            {isPending ?
                <div className="min-h-screen w-full flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>:
                <>
                    <Header
                        data={data}
                        isPending={isPending}
                        update={update}
                    />
                    <Outlet context={[data, isPending, update]} />
                </>
            }
        </div>
    )
}