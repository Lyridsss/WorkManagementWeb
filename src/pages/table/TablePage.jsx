import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthenticationContext.jsx";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import Header from "../../components/header/Header.jsx";
import {Outlet} from "react-router-dom";

export default function TablePage(){
    const { logout } = useContext(AuthContext)
    const [times, setTimes] = useState(0)
    const authAxiosRequest = useAuthAxiosRequest()
    const { isPending, data } = useQuery({
        queryKey: ["user-table-page", times],
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
        <div className="w-full bg-base-100 text-base-content">
            {isPending ?
                <div className="min-h-screen w-full flex justify-center items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>:
                <div className="w-full flex flex-col">
                    <Header
                        data={data}
                        isPending={isPending}
                        update={update}
                    />
                    <Outlet context={[data, isPending, update]} />
                </div>
            }
        </div>
    )
}