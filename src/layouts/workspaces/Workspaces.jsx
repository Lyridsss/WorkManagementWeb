import {useAuthAxiosRequest} from "../../hooks/Request.jsx";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import {useState} from "react";
import WorkspaceHomeComponent from "../../components/workspace/WorkspaceHomeComponent.jsx";

export default function Workspaces(){
    const authAxiosRequest = useAuthAxiosRequest()
    const [workspaceId, setWorkspaceId] = useState(null)
    const { data, isPending, isError } = useQuery({
        queryKey: ["workspaces"],
        queryFn: () => {
            return authAxiosRequest
                .get("/workspaces")
                .then(res => {
                    const workspaces = res.data
                    if (workspaces.length === 0){
                        setWorkspaceId(null)
                    } else {
                        setWorkspaceId(workspaces[0].id)
                    }
                    return workspaces
                })
                .catch(error => {
                    return error
                })
        }
    })

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
                                <input id="workspaces-list-drawer-toggle" type="checkbox" className="drawer-toggle"/>
                                <div className="drawer-content">
                                    <label htmlFor="workspaces-list-drawer-toggle" className="btn bg-inherit hover:btn-primary px-2 drawer-button">
                                        <div className="flex items-center text-[16px]">
                                            <i className="fa-solid fa-list mr-2"></i>
                                            <p>
                                                Danh sách không gian làm việc
                                            </p>
                                        </div>
                                    </label>
                                </div>
                                <div className="drawer-side z-50 top-[68px]">
                                    <label
                                        htmlFor="workspaces-list-drawer-toggle"
                                        aria-label="close sidebar"
                                        className="drawer-overlay"
                                    ></label>
                                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                                        {
                                            data?.map(item =>
                                                <li key={item.id}>
                                                    <button
                                                        onClick={() => {
                                                            document.getElementById("workspaces-list-drawer-toggle").checked = false
                                                            setWorkspaceId(item.id)
                                                        }}
                                                    >
                                                        {item.name}
                                                    </button>
                                                </li>
                                            )
                                        }
                                        {
                                            data?.length === 0 &&
                                            <div>
                                                Không có không gian làm việc
                                            </div>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:col-span-2 lg:col-span-2 xl:col-span-2 md:flex md:flex-col">
                            <h1 className="font-bold">
                                Các không gian làm việc
                            </h1>
                            {
                                data?.length === 0 || isError ?
                                    <h3 className="text-sm my-2">
                                        Không có không gian làm việc
                                    </h3> :
                                    <div className="w-full flex flex-col my-2">
                                        {
                                            data?.map((workspace, index) =>
                                                <div className="collapse collapse-arrow" key={workspace.id}>
                                                    {index === 0 ?
                                                        <input type="radio" name="workspaces" defaultChecked="checked"/> :
                                                        <input type="radio" name="workspaces"/>
                                                    }
                                                    <div
                                                        className="collapse-title bg-base-200 font-semibold rounded-box flex items-center"
                                                    >
                                                        {
                                                            workspace.background == null ?
                                                                <div className="avatar placeholder mr-2">
                                                                    <div
                                                                        className="bg-info text-base-100 w-8 rounded-md"
                                                                    >
                                                                        <span className="text-xl">
                                                                            {workspace.name[0]}
                                                                        </span>
                                                                    </div>
                                                                </div> :
                                                                <div className="avatar mr-2">
                                                                    <div className="w-8 rounded-md">
                                                                        <img
                                                                            alt="workspace-background"
                                                                            src={workspace.background}
                                                                        />
                                                                    </div>
                                                                </div>
                                                        }
                                                        {workspace.name}
                                                    </div>
                                                    <div className="collapse-content flex flex-col">
                                                        <button
                                                            onClick={() => {
                                                                setWorkspaceId(workspace.id)
                                                            }}
                                                            className={`flex items-center my-1 py-1 rounded-md hover:bg-base-300 ${workspaceId === workspace.id && "bg-base-300"}`}
                                                        >
                                                            <i className="fa-solid fa-house text-base-content px-2 text-lg w-11 flex justify-start"></i>
                                                            <p>
                                                                Trang chủ
                                                            </p>
                                                        </button>
                                                        <Link
                                                            to={`/workspaces/${workspace.id}`}
                                                            className="flex items-center my-1 py-1 rounded-md hover:bg-base-300"
                                                        >
                                                            <i className="fa-solid fa-table-columns text-base-content px-2 text-lg w-11 flex justify-start"></i>
                                                            <p>
                                                                Bảng
                                                            </p>
                                                        </Link>
                                                        <Link
                                                            to={`/workspaces/${workspace.id}/members`}
                                                            className="flex items-center my-1 py-1 rounded-md hover:bg-base-300"
                                                        >
                                                            <i className="fa-solid fa-user-group text-base-content px-2 text-lg w-11 flex justify-start"></i>
                                                            <p>
                                                                Thành viên
                                                            </p>
                                                        </Link>
                                                        {
                                                            workspace.role === "ADMIN" &&
                                                            <Link
                                                                to={`/workspaces/${workspace.id}/settings`}
                                                                className="flex items-center my-1 py-1 rounded-md hover:bg-base-300"
                                                            >
                                                                <i className="fa-solid fa-gear text-base-content px-2 text-lg w-11 flex justify-start"></i>
                                                                <p>
                                                                    Cài đặt
                                                                </p>
                                                            </Link>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                            }
                        </div>
                        <div className="col-span-1 md:col-span-4 lg:col-span-5 xl:col-span-6 flex px-4">
                            <WorkspaceHomeComponent workspaceId={workspaceId}/>
                        </div>
                    </div>
            }
        </>
    )
}