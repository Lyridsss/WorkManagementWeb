import {Link, useLoaderData, useOutletContext} from "react-router-dom";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import MemberList from "../../components/workspace/MemberList.jsx";

export default function WorkspaceMemberLayout(){
    const [data, isPending, isError, update] = useOutletContext()
    const [times, setTimes] = useState(0)
    const account = useLoaderData()

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
                    <div
                        className="w-full flex flex-col"
                    >
                        <div className="w-full flex items-start py-2 border-b border-stone-300">
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
                            <div className="flex flex-col mx-2">
                                <Link
                                    to={`/workspaces/${data?.id}`}
                                    className="text-2xl font-bold"
                                >
                                    {data?.name}
                                </Link>
                                <p className="my-0.5 text-sm">
                                    {data?.description}
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mt-2">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex items-center font-bold">
                                    <i className="fa-solid fa-list text-lg"></i>
                                    <p className="text-lg ml-1">
                                        Thành viên
                                    </p>
                                </div>
                                {data?.role === "ADMIN" &&
                                    <div className="p-2 rounded-full hover:text-primary hover:cursor-pointer">
                                        <i className="fa-solid fa-user-plus"></i>
                                    </div>
                                }
                            </div>
                            {data?.role === "ADMIN" &&
                                <div className="w-full flex">
                                    <p>
                                    <span className="font-bold mr-2 text-error">
                                        Lưu ý:
                                    </span>
                                        Để tránh việc mất kiểm soát đối với không gian làm việc. Bạn sẽ không thể rời
                                        khỏi
                                        hay cập nhật lại quyền cho bản thân
                                        nếu bạn là quản trị viên duy nhất của không gian làm việc.
                                    </p>
                                </div>
                            }
                            <div className="w-full flex mt-2">
                                <MemberList
                                    workspace={data}
                                    updateMemberList={times}
                                    setUpdateMemberList={setTimes}
                                    account={account}
                                    updateWorkspaceFunc={update}
                                />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}