import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Link} from "react-router-dom";
import TableList from "./TableList.jsx";

export default function TableSideBar({ workspaceId, tableId }){
    const authAxiosRequest = useAuthAxiosRequest()
    const { data, isPending, isError } = useQuery({
        queryKey: ["table-side-bar", workspaceId],
        queryFn: () => authAxiosRequest
            .get(`/workspaces/${workspaceId}`)
            .then(res => res.data)
            .catch(error => error.response?.data)
    })
    const [display, setDisplay] = useState(true)

    return (
        <div className={`${display ? "w-72" : "w-4"} min-h-screen hidden sm:flex flex-col border-r duration-400`}>
            <div className="relative w-full">
                <button
                    className="text-base-content bg-base-200 hover:text-primary z-10 w-8 h-8 border rounded-full absolute -right-5"
                    onClick={() => setDisplay(!display)}
                >
                    {display ?
                        <i className="fa-solid fa-chevron-left"></i> :
                        <i className="fa-solid fa-chevron-right"></i>
                    }
                </button>
            </div>
            <div className={`${display ? "flex" : "hidden"} flex-col w-full py-2 px-4 duration-500`}>
                <div className="flex flex-row">
                    {
                        data?.background == null ?
                            <div className="avatar placeholder mr-2">
                                <div
                                    className="bg-info text-base-100 w-10 rounded-md"
                                >
                                    <span className="text-xl">
                                        {data?.name[0]}
                                    </span>
                                </div>
                            </div> :
                            <div className="avatar mr-2">
                                <div className="w-10 rounded-md">
                                    <img
                                        alt="workspace-background"
                                        src={data?.background}
                                    />
                                </div>
                            </div>
                    }
                    <div className="flex justify-start items-center font-bold">
                        {data?.name}
                    </div>
                </div>
                <div className="flex flex-col pl-2">
                    <Link
                        to={`/workspaces/${data?.id}`}
                        className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 ${location.pathname === `/workspaces/${data?.id}` && "bg-base-300"}`}
                    >
                        <i className="fa-solid fa-table-columns text-base-content text-lg w-11 flex justify-start"></i>
                        <p>
                            Bảng
                        </p>
                    </Link>
                    <Link
                        to={`/workspaces/${data?.id}/members`}
                        className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 ${location.pathname === `/workspaces/${data?.id}/members` && "bg-base-300"}`}
                    >
                        <i className="fa-solid fa-user-group text-base-content text-lg w-11 flex justify-start"></i>
                        <p>
                            Thành viên
                        </p>
                    </Link>
                    {
                        data?.role === "ADMIN" &&
                        <Link
                            to={`/workspaces/${data?.id}/settings`}
                            className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 ${location.pathname === `/workspaces/${data?.id}/settings` && "bg-base-300"}`}
                        >
                            <i className="fa-solid fa-gear text-base-content text-lg w-11 flex justify-start"></i>
                            <p>
                                Cài đặt
                            </p>
                        </Link>
                    }
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold">
                            Danh sách các bảng
                        </h3>
                        {
                            (data?.role === "ADMIN" || data?.role === "MEMBER") &&
                            <Link to="/tables/form" className="hover:text-primary">
                                <i className="fa-solid fa-plus"></i>
                            </Link>
                        }
                    </div>
                    <TableList workspaceId={workspaceId} tableId={tableId}/>
                </div>
            </div>
        </div>
    )
}