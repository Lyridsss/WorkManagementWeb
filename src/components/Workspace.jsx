import {useQuery} from "@tanstack/react-query";
import {useAuthAxiosRequest} from "../hooks/Request.jsx";
import TableList from "./TableList.jsx";
import {Link} from "react-router-dom";

export default function Workspace({ workspaceId }) {
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError} = useQuery({
        queryKey: ["workspace-home", workspaceId],
        queryFn: () => {
            return authAxiosRequest
                .get(`/workspaces/${workspaceId}`)
                .then(res => res.data)
                .catch(error => {
                    console.log(error)
                })
        }
    })

    return (
        <>
            {
                isPending ?
                    <div className="w-full flex flex-col">
                        <div className="w-full flex items-center">
                            <div className="skeleton w-16 h-16 mr-2"></div>
                            <div className="skeleton h-6 w-32"></div>
                        </div>
                    </div> :
                    <div className="w-full flex flex-col">
                        <div className="w-full flex items-center py-2 border-b border-stone-300">
                            {
                                data?.background == null ?
                                    <div className="avatar placeholder mr-2">
                                        <div
                                            className="bg-info text-base-100 w-16 rounded-md"
                                        >
                                            <span className="text-3xl">
                                                {data?.name[0]}
                                            </span>
                                        </div>
                                    </div> :
                                    <div className="avatar mr-2">
                                        <div className="w-16 rounded-md">
                                            <img
                                                alt="workspace-background"
                                                src={data?.background}
                                            />
                                        </div>
                                    </div>
                            }
                            <Link
                                to={`/workspaces/${data?.id}/tables`}
                                className="text-2xl font-bold"
                            >
                                {data?.name}
                            </Link>
                        </div>
                        <TableList workspace={data} />
                    </div>
            }
        </>

    )
}