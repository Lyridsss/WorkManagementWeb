import {Link, Outlet, useLocation, useParams} from "react-router-dom";
import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";

export default function Workspace(){
    const { workspaceId } = useParams()
    const location = useLocation()
    const authAxiosRequest = useAuthAxiosRequest()
    const [times, setTimes] = useState(0)
    const { data, isPending, isError } = useQuery({
        queryKey: ["workspace-page", workspaceId, times],
        queryFn: () => {
            return authAxiosRequest
                .get(`/workspaces/${workspaceId}`)
                .then(res => res.data)
                .catch(error => {
                    console.log(error)
                })
        }
    })

    const update = () => {
        setTimes(prevState => prevState + 1)
    }

    return (
        <>
            {
                isPending ?
                    <div className="w-screen h-screen flex justify-center items-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div> :
                    <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-2 p-4">
                        <div className="flex md:hidden px-4">
                            <div className="drawer">
                                <input id="workspace-drawer-toggle" type="checkbox" className="drawer-toggle"/>
                                <div className="drawer-content">
                                    <label
                                        htmlFor="workspace-drawer-toggle"
                                        className="btn bg-inherit hover:btn-primary drawer-button"
                                    >
                                        <i className="fa-solid fa-list"></i>
                                    </label>
                                </div>
                                <div className="drawer-side z-50 top-[68px]">
                                    <label
                                        htmlFor="workspace-drawer-toggle"
                                        aria-label="close sidebar"
                                        className="drawer-overlay"
                                    ></label>
                                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                        <li>
                                            <Link
                                                to={`/workspaces/${data?.id}`}
                                                className="flex items-center text-[16px]"
                                            >
                                                <i className="fa-solid fa-table-columns w-6 flex justify-start"></i>
                                                <p>
                                                    Bảng
                                                </p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`/workspaces/${data?.id}/members`}
                                                className="flex items-center text-[16px]"
                                            >
                                                <i className="fa-solid fa-user-group w-6 flex justify-start"></i>
                                                <p>
                                                    Thành viên
                                                </p>
                                            </Link>
                                        </li>
                                        <li>
                                            {
                                                data?.role === "ADMIN" &&
                                                <Link
                                                    to={`/workspaces/${data?.id}/settings`}
                                                    className="flex items-center text-[16px]"
                                                >
                                                    <i className="fa-solid fa-gear w-6 flex justify-start"></i>
                                                    <p>
                                                        Cài đặt
                                                    </p>
                                                </Link>
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:col-span-2 lg:col-span-2 xl:col-span-2 md:flex md:flex-col">
                            <div className="w-full flex flex-col my-2">
                                <div className="collapse">
                                    <input type="checkbox" name="workspaces" defaultChecked={true}/>
                                    <div
                                        className="collapse-title bg-base-200 font-semibold rounded-box flex items-center"
                                    >
                                        {
                                            data?.background == null ?
                                                <div className="avatar placeholder mr-2">
                                                    <div
                                                        className="bg-info text-base-100 w-8 rounded-md"
                                                    >
                                                        <span className="text-xl">
                                                            {data?.name[0]}
                                                        </span>
                                                    </div>
                                                </div> :
                                                <div className="avatar mr-2">
                                                    <div className="w-8 rounded-md">
                                                        <img
                                                            alt="workspace-background"
                                                            src={data?.background}
                                                        />
                                                    </div>
                                                </div>
                                        }
                                        {data?.name}
                                    </div>
                                    <div className="collapse-content flex flex-col">
                                        <Link
                                            to={`/workspaces/${data?.id}`}
                                            className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 ${location.pathname === `/workspaces/${data?.id}` && "bg-base-300"}`}
                                        >
                                            <i className="fa-solid fa-table-columns text-base-content px-2 text-lg w-11 flex justify-start"></i>
                                            <p>
                                                Bảng
                                            </p>
                                        </Link>
                                        <Link
                                            to={`/workspaces/${data?.id}/members`}
                                            className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 ${location.pathname === `/workspaces/${data?.id}/members` && "bg-base-300"}`}
                                        >
                                            <i className="fa-solid fa-user-group text-base-content px-2 text-lg w-11 flex justify-start"></i>
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
                                                <i className="fa-solid fa-gear text-base-content px-2 text-lg w-11 flex justify-start"></i>
                                                <p>
                                                    Cài đặt
                                                </p>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-4 lg:col-span-5 xl:col-span-6 flex px-4">
                            <Outlet context={[data, isPending, isError, update]}/>
                        </div>
                    </div>
            }
        </>
    )
}