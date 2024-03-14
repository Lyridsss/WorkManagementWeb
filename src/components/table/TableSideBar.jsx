import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {Link} from "react-router-dom";
import TableList from "./TableList.jsx";

export default function TableSideBar({ workspace, tableId }){
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
                        workspace?.background == null ?
                            <div className="avatar placeholder mr-2">
                                <div
                                    className="bg-info text-base-100 w-10 rounded-md"
                                >
                                    <span className="text-xl">
                                        {workspace?.name[0]}
                                    </span>
                                </div>
                            </div> :
                            <div className="avatar mr-2">
                                <div className="w-10 rounded-md">
                                    <img
                                        alt="workspace-background"
                                        src={workspace?.background}
                                    />
                                </div>
                            </div>
                    }
                    <div className="flex justify-start items-center font-bold">
                        {workspace?.name}
                    </div>
                </div>
                <div className="flex flex-col">
                    <Link
                        to={`/workspaces/${workspace?.id}`}
                        className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 px-2 ${location.pathname === `/workspaces/${workspace?.id}` && "bg-base-300"}`}
                    >
                        <i className="fa-solid fa-table-columns text-base-content text-lg w-11 flex justify-start"></i>
                        <p>
                            Bảng
                        </p>
                    </Link>
                    <Link
                        to={`/workspaces/${workspace?.id}/members`}
                        className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 px-2 ${location.pathname === `/workspaces/${workspace?.id}/members` && "bg-base-300"}`}
                    >
                        <i className="fa-solid fa-user-group text-base-content text-lg w-11 flex justify-start"></i>
                        <p>
                            Thành viên
                        </p>
                    </Link>
                    {
                        workspace?.role === "ADMIN" &&
                        <Link
                            to={`/workspaces/${workspace?.id}/settings`}
                            className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 px-2 ${location.pathname === `/workspaces/${workspace?.id}/settings` && "bg-base-300"}`}
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
                            (workspace?.role === "ADMIN" || workspace?.role === "MEMBER") &&
                            <Link to={`/tables/form?workspace=${workspace?.id}`} className="hover:text-primary">
                                <i className="fa-solid fa-plus"></i>
                            </Link>
                        }
                    </div>
                    <TableList workspaceId={workspace?.id} tableId={tableId}/>
                </div>
            </div>
        </div>
    )
}