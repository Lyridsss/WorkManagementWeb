import {useContext} from "react";
import {AuthContext} from "../context/AuthenticationContext.jsx";
import {useAuthAxiosRequest} from "../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

export default function WorkspaceList(){
    const { logout } = useContext(AuthContext)
    const authAxiosRequest = useAuthAxiosRequest()

    const { data } = useQuery({
        queryKey: ["workspaces-nav"],
        queryFn: () => {
            return authAxiosRequest
                .get("/workspaces")
                .then(res => {
                    return res.data
                })
                .catch(error => {
                    if (error.response.status === 401){
                        logout()
                    }
                })
        }
    })
    return (
        <>
            {
                data?.length === 0 ?
                    <>
                        <li className="h-14 flex justify-center items-center">
                            Không có không gian làm việc
                        </li>
                    </> :
                    data?.map(workspace =>
                        <li key={workspace.id}>
                            <Link to={`/workspaces/${workspace.id}`}>
                                {workspace.name}
                            </Link>
                        </li>
                    )
            }
        </>
    )
}